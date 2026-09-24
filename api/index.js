/**
 * Site Flow — Vercel Serverless Function API
 * Zero-dependency Node.js microservice for Auth, Sites, Publishing & Storage
 */

const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET || 'siteflow-jwt-super-secret-key-2026';
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://zazmvhcdcuaetakoedgt.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inphem12aGNkY3VhZXRha29lZGd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMjAzODcsImV4cCI6MjEwNTc5NjM4N30.3eXKBNQNZ1Y1zEo8x1xt9QuCbVr7C3eVcqT8W2zyJ24';

// ── In-Memory / Global Cache (Persists across hot serverless invocations) ──
if (!global._sf_db) {
  global._sf_db = {
    users: [
      {
        id: 'usr_admin',
        name: 'مدير المنصة (Admin)',
        email: 'admin@siteflow.app',
        password_hash: hashPassword('admin123'),
        plan: 'business',
        lang: 'ar',
        isAdmin: true,
        created_at: new Date('2026-01-01').toISOString()
      }
    ],
    sites: [
      {
        id: 'site_showcase_1',
        userId: 'usr_admin',
        title: 'متجر الأناقة العصري',
        slug: 'modern-store',
        published: true,
        views: 342,
        template_type: 'arabic_store',
        createdAt: new Date('2026-01-01').toISOString(),
        updatedAt: new Date().toISOString(),
        theme: { color: '#6366f1', font: 'Cairo' },
        seo: { title: 'متجر الأناقة العصري | أحدث المنتجات', description: 'متجر إلكتروني شامل للدفع عند الاستلام والتوصيل السريع.' },
        sections: [
          { type: 'hero', data: { heading: 'أحدث التشكيلات العصرية بين يديك', description: 'تسوق أفضل المنتجات عالية الجودة مع شحن سريع لجميع المحافظات والدفع عند الاستلام.', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80', buttonText: 'تسوق الآن', buttonUrl: '#menu' } },
          { type: 'features', data: { heading: 'لماذا تشتري من متجرنا؟', items: [{title:'شحن سريع ومضمون',desc:'توصيل خلال 24-48 ساعة لكل المدن'},{title:'دفع عند الاستلام',desc:'ادفع بعد معاينة واستلام طلبك بنفسك'},{title:'ضمان الاستبدال',desc:'إرجاع واستبدال مجاني خلال 14 يوماً'}] } },
          { type: 'menu', data: { heading: 'أبرز المنتجات الأكثر مبيعاً', items: [{title:'ساعة ذكية مقاومة للماء',desc:'شاشة AMOLED مع تتبع النبض والأنشطة',price:'899 ج.م',category:'إلكترونيات'},{title:'سماعات لاسلكية عازلة للصوت',desc:'بطارية تدوم 30 ساعة صوت نقي جدًا',price:'650 ج.م',category:'إلكترونيات'}] } },
          { type: 'contact', data: { heading: 'طلب خاص أو استفسار؟', email: 'sales@mystore.com', phone: '+20 100 123 4567', address: 'القاهرة، مصر' } },
          { type: 'footer', data: { copyright: '© 2026 جميع الحقوق محفوظة لمتجرنا.', text: 'صنع بحب عبر SiteFlow' } }
        ]
      }
    ],
    submissions: []
  };
}

const DB = global._sf_db;

// ── Security Helpers ──
function hashPassword(password) {
  return crypto.createHmac('sha256', JWT_SECRET).update(password).digest('hex');
}

function createToken(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    isAdmin: user.isAdmin || false,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
  };
  const b64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', JWT_SECRET).update(b64).digest('base64url');
  return `${b64}.${sig}`;
}

function verifyToken(token) {
  if (!token) return null;
  try {
    const [b64, sig] = token.split('.');
    if (!b64 || !sig) return null;
    const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(b64).digest('base64url');
    if (sig !== expectedSig) return null;
    const payload = JSON.parse(Buffer.from(b64, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

function getAuthUser(req) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const payload = verifyToken(token);
  if (!payload) return null;
  return DB.users.find(u => u.id === payload.userId) || null;
}

function genId(prefix = 'sf') {
  return `${prefix}_${Date.now().toString(36)}_${crypto.randomBytes(4).toString('hex')}`;
}

// ── URL & Subdomain Security ──
const RESERVED_SLUGS = new Set([
  'admin', 'administrator', 'root', 'super', 'superuser',
  'api', 'rest', 'graphql', 'webhook', 'webhooks',
  'www', 'app', 'dashboard', 'panel', 'cpanel', 'whm',
  'login', 'logout', 'signin', 'signout', 'signup', 'register', 'auth', 'oauth',
  'mail', 'email', 'smtp', 'pop', 'imap', 'webmail', 'mx',
  'ssl', 'cert', 'tls', 'autoconfig', 'autodiscover',
  'support', 'help', 'status', 'billing', 'pay', 'checkout', 'cart',
  'test', 'demo', 'staging', 'dev', 'development', 'preview',
  'static', 'assets', 'cdn', 'media', 'files', 'upload', 'uploads',
  'ns1', 'ns2', 'dns', 'ftp', 'ssh', 'git', 'svn',
  'siteflow', 'vexonet', 'builder', 'editor', 'pages', 'settings',
  'null', 'undefined', 'true', 'false', 'constructor', 'prototype', '__proto__'
]);

function sanitizeSlug(slug) {
  if (!slug || typeof slug !== 'string') return '';
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 32);
}

function isReservedSlug(slug) {
  if (!slug) return false;
  return RESERVED_SLUGS.has(slug.toLowerCase().trim());
}

function isValidSlug(slug) {
  if (!slug || typeof slug !== 'string') return false;
  const s = slug.toLowerCase().trim();
  if (s.length < 2 || s.length > 32) return false;
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(s)) return false;
  if (s.includes('--')) return false;
  if (isReservedSlug(s)) return false;
  return true;
}

// ── Read JSON body from incoming request ──
async function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try { resolve(JSON.parse(data || '{}')); } catch { resolve({}); }
    });
  });
}

// ── Plans Definition ──
const PLANS = {
  free: { name: 'مجاني', name_en: 'Free', price: 0, currency: 'EGP', max_sites: 1, features: ['دومين فرعي', 'صفحتين', 'علامة Made with Site Flow', 'استضافة مجانية'] },
  basic: { name: 'أساسي', name_en: 'Basic', price: 129, yearly_price: 999, currency: 'EGP', max_sites: 3, features: ['دومين خاص (.com)', '10 صفحات', 'إزالة العلامة', 'SSL مجاني', 'تحليلات أساسية'] },
  pro: { name: 'احترافي', name_en: 'Pro', price: 299, yearly_price: 2499, currency: 'EGP', max_sites: -1, features: ['صفحات غير محدودة', 'ربط فوري/إنستاباي/فودافون كاش', 'متجر بسيط', 'دعم واتساب'] },
  business: { name: 'بيزنس', name_en: 'Business', price: 599, yearly_price: 4999, currency: 'EGP', max_sites: -1, features: ['متجر كامل بدون حدود', 'تكامل شحن محلي', 'تقارير مبيعات', 'دعم مخصص'] }
};

// ── Main Serverless Handler ──
module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // Parse path
  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let path = urlObj.pathname.replace(/^\/api/, '');
  if (!path.startsWith('/')) path = '/' + path;

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  try {
    // ── Health ──
    if (path === '/health' || path === '') {
      res.statusCode = 200;
      return res.end(JSON.stringify({ status: 'ok', server: 'vercel_serverless', timestamp: new Date().toISOString() }));
    }

    // ── Plans ──
    if (path === '/plans' && req.method === 'GET') {
      res.statusCode = 200;
      return res.end(JSON.stringify(PLANS));
    }

    // ── Auth: Signup ──
    if (path === '/auth/signup' && req.method === 'POST') {
      const body = await parseBody(req);
      const name = (body.name || '').trim();
      const email = (body.email || '').trim().toLowerCase();
      const password = (body.password || '');

      if (!name || !email || !password) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: 'جميع الحقول مطلوبة (الاسم، البريد الإلكتروني، وكلمة المرور).' }));
      }
      if (password.length < 6) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: 'كلمة المرور يجب أن لا تقل عن 6 أحرف.' }));
      }
      if (DB.users.find(u => u.email === email)) {
        res.statusCode = 409;
        return res.end(JSON.stringify({ error: 'هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول.' }));
      }

      const user = {
        id: genId('usr'),
        name,
        email,
        password_hash: hashPassword(password),
        plan: 'free',
        lang: body.lang || 'ar',
        isAdmin: false,
        created_at: new Date().toISOString()
      };
      DB.users.push(user);

      const token = createToken(user);
      res.statusCode = 201;
      return res.end(JSON.stringify({
        token,
        user: { id: user.id, name: user.name, email: user.email, plan: user.plan, lang: user.lang, isAdmin: user.isAdmin }
      }));
    }

    // ── Auth: Login ──
    if (path === '/auth/login' && req.method === 'POST') {
      const body = await parseBody(req);
      const email = (body.email || '').trim().toLowerCase();
      const password = (body.password || '');

      const user = DB.users.find(u => u.email === email);
      if (!user || user.password_hash !== hashPassword(password)) {
        res.statusCode = 401;
        return res.end(JSON.stringify({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' }));
      }

      const token = createToken(user);
      res.statusCode = 200;
      return res.end(JSON.stringify({
        token,
        user: { id: user.id, name: user.name, email: user.email, plan: user.plan, lang: user.lang, isAdmin: user.isAdmin || false }
      }));
    }

    // ── Auth: Me ──
    if (path === '/auth/me' && req.method === 'GET') {
      const user = getAuthUser(req);
      if (!user) {
        res.statusCode = 401;
        return res.end(JSON.stringify({ error: 'غير مسجل الدخول' }));
      }
      res.statusCode = 200;
      return res.end(JSON.stringify({
        id: user.id, name: user.name, email: user.email, plan: user.plan, lang: user.lang, isAdmin: user.isAdmin || false
      }));
    }

    // ── Sites: List & Create ──
    if (path === '/sites') {
      const user = getAuthUser(req);
      if (!user) {
        res.statusCode = 401;
        return res.end(JSON.stringify({ error: 'Unauthorized' }));
      }

      if (req.method === 'GET') {
        const userSites = DB.sites.filter(s => s.userId === user.id);
        res.statusCode = 200;
        return res.end(JSON.stringify(userSites));
      }

      if (req.method === 'POST') {
        const body = await parseBody(req);
        const title = (body.title || 'موقعي الجديد').trim();
        let slug;

        if (body.slug) {
          const reqSlug = sanitizeSlug(body.slug);
          if (!isValidSlug(reqSlug)) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ error: 'اسم الرابط غير متاح أو محجوز للنظام. يرجى اختيار اسم مكون من 2-32 حرفاً أو رقماً إنجليزياً (مثال: my-store).' }));
          }
          if (DB.sites.some(s => s.slug === reqSlug)) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ error: 'هذا الرابط مستخدم بالفعل، يرجى اختيار رابط آخر.' }));
          }
          slug = reqSlug;
        } else {
          let baseSlug = sanitizeSlug(title) || 'site';
          if (isReservedSlug(baseSlug) || baseSlug.length < 2) baseSlug = 'site';
          slug = baseSlug;
          while (DB.sites.find(s => s.slug === slug)) {
            slug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;
          }
        }

        const newSite = {
          id: genId('site'),
          userId: user.id,
          title,
          slug,
          published: false,
          views: 0,
          customDomain: '',
          template_type: body.template_type || 'blank',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          theme: body.theme || { color: '#6366f1', font: 'Cairo' },
          seo: body.seo || { title, description: '' },
          sections: body.sections || [
            { type: 'hero', data: { heading: title, description: 'أهلاً بك في موقعنا الإلكتروني.', image: '' } },
            { type: 'about', data: { heading: 'من نحن', content: 'نبذة تعريفية عن شركتنا وخدماتنا.' } },
            { type: 'contact', data: { heading: 'تواصل معنا', email: user.email } },
            { type: 'footer', data: { copyright: `© 2026 ${title}`, text: 'مدعوم بواسطة SiteFlow' } }
          ]
        };
        DB.sites.push(newSite);
        res.statusCode = 201;
        return res.end(JSON.stringify(newSite));
      }
    }

    // ── Sites: Site Operations (:id) ──
    const siteMatch = path.match(/^\/sites\/([^\/]+)$/);
    if (siteMatch) {
      const siteId = siteMatch[1];
      const user = getAuthUser(req);
      if (!user) {
        res.statusCode = 401;
        return res.end(JSON.stringify({ error: 'Unauthorized' }));
      }

      const siteIdx = DB.sites.findIndex(s => s.id === siteId && (s.userId === user.id || user.isAdmin));
      if (siteIdx === -1) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ error: 'Site not found' }));
      }

      if (req.method === 'GET') {
        res.statusCode = 200;
        return res.end(JSON.stringify(DB.sites[siteIdx]));
      }

      if (req.method === 'PUT') {
        const body = await parseBody(req);
        let updatedSlug = DB.sites[siteIdx].slug;
        if (body.slug && body.slug !== DB.sites[siteIdx].slug) {
          const reqSlug = sanitizeSlug(body.slug);
          if (!isValidSlug(reqSlug)) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ error: 'اسم الرابط غير متاح أو محجوز للنظام. يجب أن يتكون من 2 إلى 32 حرفاً أو رقماً إنجليزياً.' }));
          }
          const duplicate = DB.sites.find(s => s.id !== siteId && s.slug === reqSlug);
          if (duplicate) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ error: 'هذا الرابط مستخدم بالفعل من قبل موقع آخر.' }));
          }
          updatedSlug = reqSlug;
        }

        DB.sites[siteIdx] = {
          ...DB.sites[siteIdx],
          ...body,
          slug: updatedSlug,
          updatedAt: new Date().toISOString()
        };
        res.statusCode = 200;
        return res.end(JSON.stringify(DB.sites[siteIdx]));
      }

      if (req.method === 'DELETE') {
        DB.sites.splice(siteIdx, 1);
        res.statusCode = 200;
        return res.end(JSON.stringify({ ok: true, deleted: siteId }));
      }
    }

    // ── Sites: Publish ──
    const publishMatch = path.match(/^\/sites\/([^\/]+)\/publish$/);
    if (publishMatch && req.method === 'POST') {
      const siteId = publishMatch[1];
      const user = getAuthUser(req);
      if (!user) {
        res.statusCode = 401;
        return res.end(JSON.stringify({ error: 'Unauthorized' }));
      }
      const site = DB.sites.find(s => s.id === siteId && (s.userId === user.id || user.isAdmin));
      if (!site) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ error: 'Site not found' }));
      }
      site.published = true;
      site.updatedAt = new Date().toISOString();
      res.statusCode = 200;
      return res.end(JSON.stringify(site));
    }

    // ── Public Site Fetch (/p/:slug) ──
    const publicMatch = path.match(/^\/p\/([^\/]+)$/);
    if (publicMatch && req.method === 'GET') {
      const rawSlug = decodeURIComponent(publicMatch[1]).toLowerCase();
      const slug = sanitizeSlug(rawSlug);
      const site = DB.sites.find(s => (s.slug.toLowerCase() === slug || (s.customDomain && s.customDomain.toLowerCase() === rawSlug)));
      if (!site || !site.published) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ error: 'Site not found or not published' }));
      }
      site.views = (site.views || 0) + 1;
      res.statusCode = 200;
      return res.end(JSON.stringify(site));
    }

    // ── Form Submissions ──
    const submitMatch = path.match(/^\/p\/([^\/]+)\/submit$/);
    if (submitMatch && req.method === 'POST') {
      const slug = decodeURIComponent(submitMatch[1]).toLowerCase();
      const site = DB.sites.find(s => s.slug.toLowerCase() === slug);
      if (!site) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ error: 'Site not found' }));
      }
      const body = await parseBody(req);
      const sub = {
        id: genId('sub'),
        siteId: site.id,
        name: body.name || '',
        email: body.email || '',
        message: body.message || '',
        created_at: new Date().toISOString()
      };
      DB.submissions.push(sub);
      res.statusCode = 200;
      return res.end(JSON.stringify({ ok: true, submission: sub }));
    }

    // ── 404 Fallback ──
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Route not found', path }));
  } catch (err) {
    console.error('API Error:', err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Internal Server Error', message: err.message }));
  }
};
