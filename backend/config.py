import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'siteflow-secret-key-change-in-production')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///siteflow.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET = os.environ.get('JWT_SECRET', 'jwt-secret-change-me')
    JWT_EXPIRY_HOURS = 24
    SITE_URL = os.environ.get('SITE_URL', 'https://siteflow.vexonet.online')
    MAIN_DOMAIN = os.environ.get('MAIN_DOMAIN', 'siteflow.vexonet.online')
    FRONTEND_DOMAINS = ['siteflow.vexonet.online', 'siteflow.app', 'localhost']
    ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@siteflow.app')

    # Plans
    PLANS = {
        'free': {
            'name': 'Free', 'price': 0, 'currency': 'USD',
            'max_sites': 1, 'custom_domain': False, 'analytics': False,
            'premium_themes': False, 'priority_support': False
        },
        'pro': {
            'name': 'Pro', 'price': 9, 'currency': 'USD',
            'max_sites': 10, 'custom_domain': True, 'analytics': True,
            'premium_themes': True, 'priority_support': False
        },
        'business': {
            'name': 'Business', 'price': 29, 'currency': 'USD',
            'max_sites': -1, 'custom_domain': True, 'analytics': True,
            'premium_themes': True, 'priority_support': True
        }
    }

    # Stripe (mock)
    STRIPE_PUBLIC_KEY = os.environ.get('STRIPE_PUBLIC_KEY', 'pk_test_mock')
    STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY', 'sk_test_mock')

    # Cloudinary
    CLOUDINARY_CLOUD_NAME = os.environ.get('CLOUDINARY_CLOUD_NAME', 'reqe54ky')
    CLOUDINARY_API_KEY = os.environ.get('CLOUDINARY_API_KEY', '433413431167268')
    CLOUDINARY_API_SECRET = os.environ.get('CLOUDINARY_API_SECRET', '_HKYCJFA0ICqgaFgu9v8JPEih94')
    CLOUDINARY_URL = os.environ.get('CLOUDINARY_URL', 'cloudinary://433413431167268:_HKYCJFA0ICqgaFgu9v8JPEih94@reqe54ky')
