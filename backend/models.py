from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
import json

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    plan = db.Column(db.String(20), default='free')
    stripe_customer_id = db.Column(db.String(100))
    lang = db.Column(db.String(5), default='en')
    is_admin = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    sites = db.relationship('Site', backref='owner', lazy='dynamic', cascade='all, delete-orphan')
    payments = db.relationship('Payment', backref='user', lazy='dynamic', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id, 'name': self.name, 'email': self.email,
            'plan': self.plan, 'lang': self.lang, 'is_admin': self.is_admin,
            'is_active': self.is_active, 'created_at': self.created_at.isoformat() if self.created_at else None
        }

    def can_create_site(self):
        cfg = __import__('config', fromlist=['Config']).Config
        plan_cfg = cfg.PLANS.get(self.plan, cfg.PLANS['free'])
        max_sites = plan_cfg['max_sites']
        if max_sites == -1: return True
        return self.sites.count() < max_sites


class Site(db.Model):
    __tablename__ = 'sites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(200), default='My Site')
    slug = db.Column(db.String(100), unique=True, nullable=False)
    published = db.Column(db.Boolean, default=False)
    views = db.Column(db.Integer, default=0)
    custom_domain = db.Column(db.String(200), default='')
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    sections = db.relationship('Section', backref='site', lazy='joined', cascade='all, delete-orphan', order_by='Section.sort_order')
    seo = db.relationship('SEO', backref='site', uselist=False, lazy='joined', cascade='all, delete-orphan')
    theme = db.relationship('Theme', backref='site', uselist=False, lazy='joined', cascade='all, delete-orphan')

    def to_dict(self, include_sections=False):
        d = {
            'id': self.id, 'user_id': self.user_id, 'title': self.title,
            'slug': self.slug, 'published': self.published, 'views': self.views,
            'custom_domain': self.custom_domain,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }
        if include_sections:
            d['sections'] = [s.to_dict() for s in self.sections] if self.sections else []
            d['seo'] = self.seo.to_dict() if self.seo else {'title': '', 'description': ''}
            d['theme'] = self.theme.to_dict() if self.theme else {'color': '#6366f1', 'font': 'Inter'}
        return d


class Section(db.Model):
    __tablename__ = 'sections'
    id = db.Column(db.Integer, primary_key=True)
    site_id = db.Column(db.Integer, db.ForeignKey('sites.id'), nullable=False)
    type = db.Column(db.String(20), nullable=False)
    data = db.Column(db.Text, default='{}')
    sort_order = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {'id': self.id, 'type': self.type, 'data': json.loads(self.data or '{}'), 'sort_order': self.sort_order}


class SEO(db.Model):
    __tablename__ = 'seo'
    id = db.Column(db.Integer, primary_key=True)
    site_id = db.Column(db.Integer, db.ForeignKey('sites.id'), nullable=False, unique=True)
    title = db.Column(db.String(200), default='')
    description = db.Column(db.String(300), default='')

    def to_dict(self):
        return {'title': self.title or '', 'description': self.description or ''}


class Theme(db.Model):
    __tablename__ = 'themes'
    id = db.Column(db.Integer, primary_key=True)
    site_id = db.Column(db.Integer, db.ForeignKey('sites.id'), nullable=False, unique=True)
    color = db.Column(db.String(7), default='#6366f1')
    font = db.Column(db.String(50), default='Inter')

    def to_dict(self):
        return {'color': self.color or '#6366f1', 'font': self.font or 'Inter'}


class Payment(db.Model):
    __tablename__ = 'payments'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(3), default='USD')
    plan = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), default='pending')
    stripe_session_id = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            'id': self.id, 'user_id': self.user_id, 'amount': self.amount,
            'currency': self.currency, 'plan': self.plan, 'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class PageView(db.Model):
    __tablename__ = 'page_views'
    id = db.Column(db.Integer, primary_key=True)
    site_id = db.Column(db.Integer, db.ForeignKey('sites.id'), nullable=False)
    ip = db.Column(db.String(45))
    user_agent = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))


class FormSubmission(db.Model):
    __tablename__ = 'form_submissions'
    id = db.Column(db.Integer, primary_key=True)
    site_id = db.Column(db.Integer, db.ForeignKey('sites.id'), nullable=False)
    name = db.Column(db.String(100), default='')
    email = db.Column(db.String(120), default='')
    message = db.Column(db.Text, default='')
    read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            'id': self.id, 'site_id': self.site_id, 'name': self.name,
            'email': self.email, 'message': self.message, 'read': self.read,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
