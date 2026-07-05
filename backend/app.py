import json, re, hashlib, uuid, jwt as pyjwt, urllib.parse
from datetime import datetime, timedelta, timezone
from functools import wraps
from flask import Flask, request, jsonify, render_template, redirect, url_for, session, make_response
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config
from models import db, User, Site, Section, SEO, Theme, Payment, PageView

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, supports_credentials=True)
db.init_app(app)

# ─────────────── helpers ───────────────

def make_token(user_id):
    return pyjwt.encode({'user_id': user_id, 'exp': datetime.now(timezone.utc) + timedelta(hours=Config.JWT_EXPIRY_HOURS)}, Config.JWT_SECRET, algorithm='HS256')

def decode_token(token):
    try: return pyjwt.decode(token, Config.JWT_SECRET, algorithms=['HS256'])
    except: return None

def login_required(f):
    @wraps(f)
    def wrapper(*a, **kw):
        auth = request.headers.get('Authorization', '')
        token = auth.replace('Bearer ', '')
        data = decode_token(token)
        if not data: return jsonify({'error': 'Unauthorized'}), 401
        user = db.session.get(User, data['user_id'])
        if not user or not user.is_active: return jsonify({'error': 'Unauthorized'}), 401
        return f(user, *a, **kw)
    return wrapper

def admin_required(f):
    @wraps(f)
    def wrapper(*a, **kw):
        auth = request.headers.get('Authorization', '')
        token = auth.replace('Bearer ', '')
        data = decode_token(token)
        if not data: return jsonify({'error': 'Unauthorized'}), 401
        user = db.session.get(User, data['user_id'])
        if not user or not user.is_admin: return jsonify({'error': 'Forbidden'}), 403
        return f(user, *a, **kw)
    return wrapper

def slugify(text):
    s = text.lower().strip()
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    s = re.sub(r'[\s-]+', '-', s)
    return s[:50]

def gen_unique_slug(base):
    slug = slugify(base) or 'site'
    while Site.query.filter_by(slug=slug).first():
        slug = slugify(base) + '-' + uuid.uuid4().hex[:4]
    return slug

# ─────────────── seed admin ───────────────

def seed():
    if not User.query.filter_by(email=Config.ADMIN_EMAIL).first():
        admin = User(
            name='Admin', email=Config.ADMIN_EMAIL,
            password_hash=generate_password_hash('admin123'),
            plan='business', is_admin=True, lang='en'
        )
        db.session.add(admin)
        db.session.commit()

# ─────────────── Auth API ───────────────

@app.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name, email, password = data.get('name',''), data.get('email',''), data.get('password','')
    if not name or not email or not password:
        return jsonify({'error': 'All fields required'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 409
    user = User(name=name, email=email, password_hash=generate_password_hash(password), lang=data.get('lang','en'))
    db.session.add(user)
    db.session.commit()
    return jsonify({'token': make_token(user.id), 'user': user.to_dict()}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email','')).first()
    if not user or not check_password_hash(user.password_hash, data.get('password','')):
        return jsonify({'error': 'Invalid email or password'}), 401
    if not user.is_active:
        return jsonify({'error': 'Account disabled'}), 403
    user.updated_at = datetime.now(timezone.utc)
    db.session.commit()
    return jsonify({'token': make_token(user.id), 'user': user.to_dict()})

@app.route('/api/auth/me', methods=['GET'])
@login_required
def get_me(user):
    return jsonify(user.to_dict())

@app.route('/api/auth/update', methods=['PUT'])
@login_required
def update_profile(user):
    data = request.get_json()
    if 'name' in data: user.name = data['name']
    if 'lang' in data: user.lang = data['lang']
    if 'password' in data and data['password']:
        user.password_hash = generate_password_hash(data['password'])
    db.session.commit()
    return jsonify(user.to_dict())

# ─────────────── Sites API ───────────────

@app.route('/api/sites', methods=['GET'])
@login_required
def list_sites(user):
    sites = Site.query.filter_by(user_id=user.id).order_by(Site.updated_at.desc()).all()
    return jsonify([s.to_dict() for s in sites])

@app.route('/api/sites', methods=['POST'])
@login_required
def create_site(user):
    if not user.can_create_site():
        return jsonify({'error': 'Plan limit reached. Upgrade to create more sites.'}), 403
    data = request.get_json() or {}
    title = data.get('title', 'My Site')
    slug = gen_unique_slug(data.get('slug', title))
    site = Site(user_id=user.id, title=title, slug=slug)
    db.session.add(site)
    db.session.flush()

    # Default sections
    defaults = [
        ('hero', {'heading': 'Welcome to My Website', 'description': 'I build amazing things.', 'image': ''}),
        ('about', {'heading': 'About Me', 'content': 'A passionate creator building beautiful websites.'}),
        ('gallery', {'heading': 'My Gallery', 'images': []}),
        ('contact', {'heading': 'Get In Touch', 'email': '', 'phone': '', 'address': ''}),
    ]
    for i, (typ, dat) in enumerate(defaults):
        db.session.add(Section(site_id=site.id, type=typ, data=json.dumps(dat), sort_order=i))

    db.session.add(SEO(site_id=site.id, title=title, description=''))
    db.session.add(Theme(site_id=site.id, color='#6366f1', font='Inter'))
    db.session.commit()
    return jsonify(site.to_dict(include_sections=True)), 201

@app.route('/api/sites/<int:site_id>', methods=['GET'])
@login_required
def get_site(user, site_id):
    site = db.session.get(Site, site_id)
    if not site or site.user_id != user.id: return jsonify({'error': 'Not found'}), 404
    return jsonify(site.to_dict(include_sections=True))

@app.route('/api/sites/<int:site_id>', methods=['PUT'])
@login_required
def update_site(user, site_id):
    site = db.session.get(Site, site_id)
    if not site or site.user_id != user.id: return jsonify({'error': 'Not found'}), 404
    data = request.get_json() or {}
    if 'title' in data: site.title = data['title']
    if 'slug' in data and data['slug'] != site.slug:
        ns = slugify(data['slug']) or site.slug
        exist = Site.query.filter(Site.slug == ns, Site.id != site.id).first()
        site.slug = ns if not exist else gen_unique_slug(ns)
    if 'custom_domain' in data: site.custom_domain = data['custom_domain']
    if 'published' in data: site.published = data['published']
    # Update sections
    if 'sections' in data:
        Section.query.filter_by(site_id=site.id).delete()
        for i, s in enumerate(data['sections']):
            db.session.add(Section(site_id=site.id, type=s['type'], data=json.dumps(s.get('data',{})), sort_order=i))
    # Update SEO
    if 'seo' in data:
        seo = site.seo or SEO(site_id=site.id)
        seo.title = data['seo'].get('title', '')
        seo.description = data['seo'].get('description', '')
        if not site.seo: db.session.add(seo)
    # Update Theme
    if 'theme' in data:
        theme = site.theme or Theme(site_id=site.id)
        theme.color = data['theme'].get('color', '#6366f1')
        theme.font = data['theme'].get('font', 'Inter')
        if not site.theme: db.session.add(theme)
    db.session.commit()
    return jsonify(site.to_dict(include_sections=True))

@app.route('/api/sites/<int:site_id>', methods=['DELETE'])
@login_required
def delete_site(user, site_id):
    site = db.session.get(Site, site_id)
    if not site or site.user_id != user.id: return jsonify({'error': 'Not found'}), 404
    db.session.delete(site)
    db.session.commit()
    return jsonify({'message': 'Deleted'})

@app.route('/api/sites/<int:site_id>/publish', methods=['POST'])
@login_required
def publish_site(user, site_id):
    site = db.session.get(Site, site_id)
    if not site or site.user_id != user.id: return jsonify({'error': 'Not found'}), 404
    site.published = True
    db.session.commit()
    return jsonify(site.to_dict())

# ─────────────── Health & Sync ───────────────

@app.route('/api/health', methods=['GET'])
def health():
    try:
        db.session.execute(db.text('SELECT 1'))
        db_ok = True
    except:
        db_ok = False
    return jsonify({'ok': True, 'db': db_ok})

@app.route('/api/sites/import', methods=['POST'])
@login_required
def import_site(user):
    """Import a site from frontend (localStorage → backend). Creates or updates by slug."""
    data = request.get_json() or {}
    slug = slugify(data.get('slug', ''))
    if not slug:
        return jsonify({'error': 'Slug required'}), 400

    site = Site.query.filter_by(slug=slug).first()
    if site and site.user_id != user.id:
        # Slug taken by another user — generate new one
        slug = gen_unique_slug(slug)
        site = None

    if not site:
        site = Site(user_id=user.id, title=data.get('title', 'My Site'), slug=slug)
        db.session.add(site)
        db.session.flush()

    if 'title' in data: site.title = data['title']
    if 'published' in data: site.published = data['published']
    if 'custom_domain' in data: site.custom_domain = data['custom_domain']

    # Sections
    if 'sections' in data:
        Section.query.filter_by(site_id=site.id).delete()
        for i, s in enumerate(data['sections']):
            db.session.add(Section(site_id=site.id, type=s['type'], data=json.dumps(s.get('data',{})), sort_order=i))

    # SEO
    if 'seo' in data:
        seo = site.seo or SEO(site_id=site.id)
        seo.title = data['seo'].get('title', '')
        seo.description = data['seo'].get('description', '')
        if not site.seo: db.session.add(seo)

    # Theme
    if 'theme' in data:
        theme = site.theme or Theme(site_id=site.id)
        theme.color = data['theme'].get('color', '#6366f1')
        theme.font = data['theme'].get('font', 'Inter')
        if not site.theme: db.session.add(theme)

    db.session.commit()
    return jsonify(site.to_dict(include_sections=True)), 201

# ─────────────── Public API ───────────────

@app.route('/api/p/<slug>', methods=['GET'])
def get_public_page(slug):
    site = Site.query.filter_by(slug=slug, published=True).first()
    if not site: return jsonify({'error': 'Not found'}), 404
    site.views = (site.views or 0) + 1
    db.session.commit()
    return jsonify(site.to_dict(include_sections=True))

@app.route('/api/p/<slug>/view', methods=['POST'])
def track_view(slug):
    site = Site.query.filter_by(slug=slug, published=True).first()
    if not site: return jsonify({'error': 'Not found'}), 404
    data = request.get_json() or {}
    pv = PageView(site_id=site.id, ip=data.get('ip',''), user_agent=data.get('ua',''))
    db.session.add(pv)
    db.session.commit()
    return jsonify({'ok': True})

# ─────────────── Payments / Plans API ───────────────

@app.route('/api/plans', methods=['GET'])
def get_plans():
    return jsonify(Config.PLANS)

@app.route('/api/payments', methods=['GET'])
@login_required
def get_payments(user):
    payments = Payment.query.filter_by(user_id=user.id).order_by(Payment.created_at.desc()).all()
    return jsonify([p.to_dict() for p in payments])

@app.route('/api/payments/create', methods=['POST'])
@login_required
def create_payment(user):
    data = request.get_json() or {}
    plan = data.get('plan', 'pro')
    if plan not in Config.PLANS:
        return jsonify({'error': 'Invalid plan'}), 400
    plan_cfg = Config.PLANS[plan]
    if plan_cfg['price'] == 0:
        # Free plan - just update
        user.plan = plan
        db.session.commit()
        return jsonify({'message': 'Plan updated', 'user': user.to_dict()})

    # Mock payment session
    session_id = 'cs_mock_' + uuid.uuid4().hex[:12]
    payment = Payment(
        user_id=user.id, amount=plan_cfg['price'],
        currency=plan_cfg['currency'], plan=plan,
        status='pending', stripe_session_id=session_id
    )
    db.session.add(payment)
    db.session.commit()
    return jsonify({
        'session_id': session_id,
        'amount': plan_cfg['price'],
        'currency': plan_cfg['currency'],
        'plan': plan,
        'payment_id': payment.id
    })

@app.route('/api/payments/confirm/<int:payment_id>', methods=['POST'])
@login_required
def confirm_payment(user, payment_id):
    payment = db.session.get(Payment, payment_id)
    if not payment or payment.user_id != user.id:
        return jsonify({'error': 'Not found'}), 404
    payment.status = 'completed'
    user.plan = payment.plan
    db.session.commit()
    return jsonify({'message': 'Payment confirmed', 'user': user.to_dict()})

# ─────────────── Admin API ───────────────

@app.route('/api/admin/stats', methods=['GET'])
@admin_required
def admin_stats(admin):
    total_users = User.query.count()
    total_sites = Site.query.count()
    total_published = Site.query.filter_by(published=True).count()
    total_payments = Payment.query.filter_by(status='completed').count()
    total_revenue = db.session.query(db.func.sum(Payment.amount)).filter(Payment.status == 'completed').scalar() or 0
    recent_users = User.query.order_by(User.created_at.desc()).limit(5).all()
    return jsonify({
        'users': total_users, 'sites': total_sites, 'published': total_published,
        'payments': total_payments, 'revenue': float(total_revenue),
        'recent_users': [u.to_dict() for u in recent_users],
        'plans_breakdown': {
            p: User.query.filter_by(plan=p).count()
            for p in ['free', 'pro', 'business']
        }
    })

@app.route('/api/admin/users', methods=['GET'])
@admin_required
def admin_list_users(admin):
    users = User.query.order_by(User.created_at.desc()).all()
    return jsonify([u.to_dict() for u in users])

@app.route('/api/admin/users/<int:user_id>', methods=['PUT'])
@admin_required
def admin_update_user(admin, user_id):
    user = db.session.get(User, user_id)
    if not user: return jsonify({'error': 'Not found'}), 404
    data = request.get_json() or {}
    if 'plan' in data: user.plan = data['plan']
    if 'is_active' in data: user.is_active = data['is_active']
    if 'is_admin' in data: user.is_admin = data['is_admin']
    db.session.commit()
    return jsonify(user.to_dict())

@app.route('/api/admin/sites', methods=['GET'])
@admin_required
def admin_list_sites(admin):
    sites = Site.query.order_by(Site.updated_at.desc()).all()
    return jsonify([s.to_dict() for s in sites])

@app.route('/api/admin/payments', methods=['GET'])
@admin_required
def admin_list_payments(admin):
    payments = Payment.query.order_by(Payment.created_at.desc()).all()
    return jsonify([p.to_dict() for p in payments])

# ─────────────── i18n ───────────────

TRANSLATIONS = {
    'en': {
        'app_name': 'Site Flow', 'sign_in': 'Sign In', 'sign_up': 'Create Account',
        'dashboard': 'Dashboard', 'my_sites': 'My Sites', 'new_site': 'New Site',
        'settings': 'Settings', 'logout': 'Logout', 'publish': 'Publish',
        'preview': 'Preview', 'delete': 'Delete', 'edit': 'Edit',
        'no_sites': 'No sites yet', 'create_first': 'Create your first site',
        'upgrade': 'Upgrade', 'plan': 'Plan', 'billing': 'Billing',
    },
    'ar': {
        'app_name': 'Site Flow', 'sign_in': 'تسجيل الدخول', 'sign_up': 'إنشاء حساب',
        'dashboard': 'لوحة التحكم', 'my_sites': 'مواقعي', 'new_site': 'موقع جديد',
        'settings': 'الإعدادات', 'logout': 'تسجيل الخروج', 'publish': 'نشر',
        'preview': 'معاينة', 'delete': 'حذف', 'edit': 'تعديل',
        'no_sites': 'لا توجد مواقع بعد', 'create_first': 'أنشئ أول موقع لك',
        'upgrade': 'ترقية', 'plan': 'الخطة', 'billing': 'الفواتير',
    }
}

@app.route('/api/lang/<code>', methods=['GET'])
def get_translations(code):
    return jsonify(TRANSLATIONS.get(code, TRANSLATIONS['en']))

@app.route('/admin')
@admin_required
def admin_panel(admin):
    return render_template('admin.html', user=admin)

# ─────────────── Subdomain hosting ───────────────
# Handles *.siteflow.vexonet.online requests

MAIN_DOMAIN = Config.MAIN_DOMAIN
# Also accept www.MAIN_DOMAIN and MAIN_DOMAIN itself
_WWW_DOMAIN = 'www.' + MAIN_DOMAIN

@app.before_request
def handle_subdomain():
    host = request.headers.get('Host', '').split(':')[0]
    if request.method not in ('GET', 'HEAD', 'OPTIONS'):
        return None

    # Main domain or www — pass through to serve SPA
    if host == MAIN_DOMAIN or host == _WWW_DOMAIN:
        return None
    # Not a subdomain of our domain — pass through
    if not host.endswith('.' + MAIN_DOMAIN):
        return None

    path = request.path
    if path.startswith('/api/') or path.startswith('/admin') or path.startswith('/static/'):
        return None

    subdomain = host[: -len('.' + MAIN_DOMAIN)]
    if not subdomain or subdomain.startswith('www'):
        return None

    site = Site.query.filter_by(slug=subdomain, published=True).first()
    if not site:
        return make_response(render_template('site_page.html',
            not_found=True,
            title='Not Found', slug=subdomain,
            seo_title='404 - Site Not Found', seo_desc='',
            sections=[], theme_color='#6366f1', font='Inter',
            font_family='Inter', lang='en', dir='ltr',
            year=datetime.now().year,
            main_url=f'https://{MAIN_DOMAIN}'
        ), 404)

    site.views = (site.views or 0) + 1
    db.session.commit()

    sections = site.sections or []
    seo = site.seo
    theme = site.theme

    return make_response(render_template('site_page.html',
        title=site.title,
        slug=site.slug,
        seo_title=(seo.title if seo else site.title) or site.title,
        seo_desc=(seo.description if seo else '') or '',
        sections=[s.to_dict() for s in sections] if sections else [],
        theme_color=(theme.color if theme else '#6366f1') or '#6366f1',
        font=(theme.font if theme else 'Inter') or 'Inter',
        font_family=(theme.font if theme else 'Inter') or 'Inter',
        lang='en', dir='ltr',
        year=datetime.now().year,
        main_url=f'https://{MAIN_DOMAIN}'
    ))

@app.after_request
def add_cors(response):
    origin = request.headers.get('Origin', '')
    allowed = Config.FRONTEND_DOMAINS + ['http://localhost:5000']
    if origin:
        origin_host = origin.split('://')[-1].split(':')[0]
        if any(origin_host == d or origin_host.endswith('.' + d) for d in allowed):
            response.headers['Access-Control-Allow-Origin'] = origin
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS'
    return response

# ─────────────── Serve SPA for main domain ───────────────

import os as _os, mimetypes

_BASE = _os.path.dirname(_os.path.dirname(_os.path.abspath(__file__)))

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_spa(path):
    if path.startswith('api/') or path.startswith('admin'):
        return jsonify({'error': 'Not found'}), 404
    file_path = _os.path.join(_BASE, path)
    if _os.path.exists(file_path) and _os.path.isfile(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            resp = make_response(f.read())
            resp.content_type = mimetypes.guess_type(file_path)[0] or 'text/html'
            return resp
    # SPA fallback — serve index.html for all non-file routes
    spa_path = _os.path.join(_BASE, 'index.html')
    if _os.path.exists(spa_path):
        with open(spa_path, 'r', encoding='utf-8') as f:
            resp = make_response(f.read())
            resp.content_type = 'text/html'
            return resp
    return jsonify({'error': 'Not found'}), 404

# ─────────────── error handlers ───────────────

@app.errorhandler(404)
def not_found(e):
    host = request.headers.get('Host', '').split(':')[0]
    # If subdomain request — show nice 404 page
    if host.endswith('.' + Config.MAIN_DOMAIN) and host != Config.MAIN_DOMAIN:
        return make_response(render_template('site_page.html',
            not_found=True, title='Not Found', slug=host.split('.')[0],
            seo_title='404 - Not Found', seo_desc='',
            sections=[], theme_color='#6366f1', font='Inter',
            font_family='Inter', lang='en', dir='ltr',
            year=datetime.now().year,
            main_url=f'https://{Config.MAIN_DOMAIN}'
        ), 404)
    # API requests — return JSON
    accept = request.headers.get('Accept', '')
    if 'text/html' in accept:
        return render_template('site_page.html',
            not_found=True, title='Not Found', slug='',
            seo_title='404 - Not Found', seo_desc='',
            sections=[], theme_color='#6366f1', font='Inter',
            font_family='Inter', lang='en', dir='ltr',
            year=datetime.now().year,
            main_url=f'https://{Config.MAIN_DOMAIN}'
        ), 404
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({'error': 'Internal server error'}), 500

# ─────────────── Initialize ───────────────

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        seed()
    app.run(host='0.0.0.0', port=5000, debug=True)
