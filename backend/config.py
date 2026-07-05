import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'siteflow-secret-key-change-in-production')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///siteflow.db')
    if SQLALCHEMY_DATABASE_URI and SQLALCHEMY_DATABASE_URI.startswith('postgres://'):
        SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI.replace('postgres://', 'postgresql://', 1)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET = os.environ.get('JWT_SECRET', 'jwt-secret-change-me')
    JWT_EXPIRY_HOURS = 24
    SITE_URL = os.environ.get('SITE_URL', 'https://siteflow.vexonet.online')
    MAIN_DOMAIN = os.environ.get('MAIN_DOMAIN', 'siteflow.vexonet.online')
    FRONTEND_DOMAINS = ['siteflow.vexonet.online', 'siteflow-roan.vercel.app', 'siteflow-api.onrender.com', 'siteflow.app', 'localhost', '127.0.0.1']
    ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@siteflow.app')

    # Plans — Egyptian Market Pricing (EGP)
    PLANS = {
        'free': {
            'name': 'مجاني', 'name_en': 'Free', 'price': 0, 'currency': 'EGP',
            'max_sites': 1, 'pages': 2, 'custom_domain': False, 'analytics': False,
            'premium_themes': False, 'priority_support': False, 'remove_branding': False,
            'ecommerce': False, 'payment_gateway': False, 'whatsapp_support': False,
            'features': ['دومين فرعي', 'صفحتين', 'علامة Made with Site Flow', 'استضافة مجانية']
        },
        'basic': {
            'name': 'أساسي', 'name_en': 'Basic', 'price': 129, 'yearly_price': 999, 'currency': 'EGP',
            'max_sites': 3, 'pages': 10, 'custom_domain': True, 'analytics': True,
            'premium_themes': False, 'priority_support': False, 'remove_branding': True,
            'ecommerce': False, 'payment_gateway': False, 'whatsapp_support': False,
            'features': ['دومين خاص (.com)', '10 صفحات', 'إزالة العلامة', 'SSL مجاني', 'تحليلات أساسية']
        },
        'pro': {
            'name': 'احترافي', 'name_en': 'Pro', 'price': 299, 'yearly_price': 2499, 'currency': 'EGP',
            'max_sites': -1, 'pages': -1, 'custom_domain': True, 'analytics': True,
            'premium_themes': True, 'priority_support': True, 'remove_branding': True,
            'ecommerce': True, 'payment_gateway': True, 'whatsapp_support': True,
            'features': ['صفحات غير محدودة', 'ربط فوري/إنستاباي/فودافون كاش', 'متجر بسيط (50 منتج)', 'دعم واتساب', 'بكسل فيسبوك/إنستجرام', 'جميع القوالب']
        },
        'business': {
            'name': 'بيزنس', 'name_en': 'Business', 'price': 599, 'yearly_price': 4999, 'currency': 'EGP',
            'max_sites': -1, 'pages': -1, 'custom_domain': True, 'analytics': True,
            'premium_themes': True, 'priority_support': True, 'remove_branding': True,
            'ecommerce': True, 'payment_gateway': True, 'whatsapp_support': True,
            'features': ['متجر كامل بدون حدود', 'تكامل شحن محلي', 'تقارير مبيعات', 'دعم مخصص', 'API доступ', ':white label']
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
