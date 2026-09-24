/**
 * Site Flow — Data Layer
 * Primary: Supabase | Fallback: LocalStorage
 */
var MAIN_DOMAIN = window.MAIN_DOMAIN = 'siteflow.vexonet.online';
var IS_LOCAL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
var API_BASE = IS_LOCAL ? 'http://localhost:5000/api' : '/api';
var PROD_API = 'https://siteflow-api.onrender.com/api';
var BACKEND_URL = IS_LOCAL ? 'http://localhost:5000' : 'https://siteflow-api.onrender.com';
var RESERVED_SLUGS = new Set([
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

function subdomainUrl(slug) {
  if (!slug) return '';
  const clean = sanitizeSlug(slug);
  return `https://${clean}.${window.MAIN_DOMAIN || 'siteflow.vexonet.online'}`;
}

function subdomainHostUrl(slug) {
  return subdomainUrl(slug);
}

function internalPreviewUrl(slug) {
  return `${window.location.origin}/#/p/${sanitizeSlug(slug)}`;
}
function getDaysLeft(item, plan = 'free') {
  if (plan && plan !== 'free') return 999;
  const createdStr = item?.createdAt || item?.created_at;
  if (!createdStr) return 14;
  const created = new Date(createdStr);
  const now = new Date();
  const diffMs = now - created;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(0, 14 - diffDays);
}

function isExpired(item, plan = 'free') {
  if (plan && plan !== 'free') return false;
  return getDaysLeft(item, plan) <= 0;
}

// ── LocalStorage DB ──
const LocalDB = {
  get(k) { try { return JSON.parse(localStorage.getItem('sf_'+k)) } catch { return null } },
  set(k, v) { localStorage.setItem('sf_'+k, JSON.stringify(v)) },
  users: { get() { return LocalDB.get('users')||[] }, save(u) { LocalDB.set('users', u) } },
  pages: { get() { return LocalDB.get('pages')||[] }, save(p) { LocalDB.set('pages', p) } },
  session: { get() { return LocalDB.get('session') }, set(u) { LocalDB.set('session', u) }, clear() { localStorage.removeItem('sf_session') } },
  payments: { get() { return LocalDB.get('payments')||[] }, save(p) { LocalDB.set('payments', p) } },

  genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2,7) },
  clone(o) { return JSON.parse(JSON.stringify(o)) },

  defaultPage(title, template) {
    const allPresets = typeof ALL_PRESETS !== 'undefined' ? ALL_PRESETS : PRESETS
    const t = template || allPresets.find(p => p.id === 'blank') || PRESETS[0]
    return this.clone({
      id:'', slug:'', userId:'', title:title||t.name||'My Site',
      published:false, createdAt:'', updatedAt:'', views:0, customDomain:'',
      template_type: t.id || 'blank',
      sections: this.clone(t.sections || []),
      seo: this.clone(t.seo || {title:'',description:''}),
      theme: this.clone(t.theme || {color:'#6366f1',font:'Inter'})
    })
  },

  addPage(pg) {
    const pages = this.pages.get(); const p = this.clone(pg)
    p.id = this.genId()
    p.slug = (p.title||'site').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,30) || 'site'
    p.slug += '-' + this.genId().slice(0,4)
    p.createdAt = new Date().toISOString(); p.updatedAt = new Date().toISOString()
    pages.push(p); this.pages.save(pages); return p
  },

  updatePage(id, data) {
    const pages = this.pages.get(); const idx = pages.findIndex(p => p.id === id)
    if (idx === -1) return null
    pages[idx] = { ...pages[idx], ...this.clone(data), updatedAt: new Date().toISOString() }
    this.pages.save(pages); return pages[idx]
  },

  deletePage(id) { this.pages.save(this.pages.get().filter(p => p.id !== id)) },
  getPage(id) { return this.pages.get().find(p => p.id === id) || null },
  getPageBySlug(slug) {
    const s = (slug || '').toLowerCase();
    return this.pages.get().find(p => (p.slug?.toLowerCase() === s || p.customDomain?.toLowerCase() === s || p.custom_domain?.toLowerCase() === s)) || null
  },
  getUserPages(uid) { return this.pages.get().filter(p => p.userId === uid) },
  duplicatePage(id) { const o=this.getPage(id); if(!o)return null; const c=this.clone(o); c.id=''; c.title=o.title+' (Copy)'; c.published=false; c.views=0; return this.addPage(c) },
  incrementViews(slug) { const pages=this.pages.get(); const p=pages.find(x=>x.slug===slug); if(p){p.views=(p.views||0)+1;this.pages.save(pages)} }
}

// ── Seed demo data ──
if (LocalDB.users.get().length === 0) {
  LocalDB.users.save([
    {id:'demo1',name:'Ahmed Hassan',email:'demo@siteflow.app',password:'demo123',plan:'pro',lang:'ar',isAdmin:false},
    {id:'admin1',name:'Admin',email:'admin@siteflow.app',password:'admin123',plan:'business',lang:'en',isAdmin:true}
  ])
  var _demo = LocalDB.addPage({...LocalDB.defaultPage('My Portfolio'), userId:'demo1', published:true, views:142, theme:{color:'#059669',font:'Inter'}, seo:{title:'Ahmed Hassan',description:'Portfolio'}})
  // Ensure known slug for demo
  var _pages = LocalDB.pages.get(); var _dp = _pages.find(p => p.id === _demo.id); if (_dp) { _dp.slug = 'demo'; LocalDB.pages.save(_pages) }
}

// ── API Client (mode: Vercel Serverless API → LocalStorage) ──
const API = {
  token: localStorage.getItem('sf_token') || '',
  mode: null, // null | 'supabase' | 'api' | 'flask' | 'local'
  _saveToken(t) { this.token=t||''; if(t) localStorage.setItem('sf_token',t); else localStorage.removeItem('sf_token') },

  // Try backends in order: Supabase (Real Postgres) → Vercel Serverless /api → LocalStorage
  async _init() {
    if (this.mode) return this.mode;

    // 1. Try Supabase as PRIMARY Real Cloud Database
    try {
      if (typeof SB !== 'undefined') {
        const sbReady = await SB.init();
        if (sbReady && SB.isReady()) {
          this.mode = 'supabase';
          console.log('[Storage] Active Mode: Supabase (Cloud PostgreSQL)');
          return 'supabase';
        }
      }
    } catch (e) {
      console.warn('[Storage] Supabase check notice:', e?.message);
    }

    // 2. Try Vercel Serverless /api
    try {
      const r = await fetch('/api/health', { signal: AbortSignal.timeout(2000) });
      if (r.ok) {
        this.mode = 'api';
        console.log('[Storage] Active Mode: Vercel Serverless API');
        return 'api';
      }
    } catch {}

    // 3. Fallback: LocalStorage
    this.mode = 'local';
    console.log('[Storage] Active Mode: LocalStorage Fallback');
    return 'local';
  },

  async _fetch(path, opts={}) {
    const headers = {'Content-Type': 'application/json'}
    if (this.token) headers['Authorization'] = 'Bearer ' + this.token
    try {
      const r = await fetch('/api' + path, {...opts, headers})
      if (r.status === 401) { this._saveToken(null); }
      return r
    } catch {
      return { ok: false, status: 503, json: async () => ({ error: 'Service Unavailable' }) }
    }
  },

  // ── Auth ──
  async login(email, password) {
    const mode = await this._init()
    if (mode === 'supabase') {
      try {
        const { session, user } = await SB.signIn(email, password)
        this._saveToken(session?.access_token || ('sb_' + user.id))
        LocalDB.users.save([...LocalDB.users.get().filter(x => x.id !== user.id), user])
        return { user }
      } catch (e) {
        throw new Error(e.message || 'فشل تسجيل الدخول عبر Supabase')
      }
    }
    if (mode === 'api' || mode === 'flask') {
      const r = await this._fetch('/auth/login', {method:'POST', body:JSON.stringify({email, password})})
      if (r.ok) {
        const d = await r.json()
        this._saveToken(d.token)
        return { user: d.user }
      } else {
        const err = await r.json().catch(() => ({}))
        throw new Error(err.error || 'البريد الإلكتروني أو كلمة المرور غير صحيحة')
      }
    }
    // localStorage fallback
    const users = LocalDB.users.get()
    const u = users.find(x => x.email.toLowerCase() === email.toLowerCase() && (x.password === password || x.password_hash === password))
    if (!u) throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة')
    this._saveToken('local_' + u.id)
    return { user: { id: u.id, name: u.name, email: u.email, plan: u.plan, lang: u.lang, isAdmin: u.isAdmin || false } }
  },

  async signup(name, email, password) {
    const mode = await this._init()
    if (mode === 'supabase') {
      try {
        const { session, user } = await SB.signUp(name, email, password)
        if (session) {
          this._saveToken(session.access_token)
          LocalDB.users.save([...LocalDB.users.get().filter(x => x.id !== user.id), user])
          return { user, verified: true }
        } else {
          // Email confirmation is required by Supabase!
          return { user, requiresVerification: true, email }
        }
      } catch (e) {
        throw new Error(e.message || 'فشل إنشاء الحساب عبر Supabase')
      }
    }
    if (mode === 'api' || mode === 'flask') {
      const r = await this._fetch('/auth/signup', {method:'POST', body:JSON.stringify({name, email, password})})
      if (r.ok) {
        const d = await r.json()
        this._saveToken(d.token)
        return { user: d.user }
      } else {
        const err = await r.json().catch(() => ({}))
        throw new Error(err.error || 'فشل إنشاء الحساب')
      }
    }
    // localStorage fallback
    const users = LocalDB.users.get()
    if (users.find(x => x.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول.')
    }
    const u = { id: LocalDB.genId(), name, email, password, plan: 'free', lang: 'ar', isAdmin: false }
    LocalDB.users.save([...users, u])
    this._saveToken('local_' + u.id)
    return { user: { id: u.id, name: u.name, email: u.email, plan: 'free', lang: 'ar', isAdmin: false } }
  },

  async verifyOtp(email, token, type='signup') {
    const mode = await this._init()
    if (mode === 'supabase') {
      const { session, user } = await SB.verifyOtp(email, token, type)
      if (session) this._saveToken(session.access_token)
      else this._saveToken('sb_' + user.id)
      LocalDB.users.save([...LocalDB.users.get().filter(x => x.id !== user.id), user])
      return { user }
    }
    throw new Error('التحقق برمز OTP متاح عبر قاعدة بيانات Supabase')
  },

  async resendOtp(email, type='signup') {
    const mode = await this._init()
    if (mode === 'supabase') {
      return await SB.resendOtp(email, type)
    }
  },

  async loginWithOtp(email) {
    const mode = await this._init()
    if (mode === 'supabase') {
      return await SB.signInWithOtp(email)
    }
  },

  async googleLogin() {
    if (SB.isReady()) {
      return SB.signInWithGoogle()
    }
    Toast.show('يرجى التسجيل المباشر بالبريد الإلكتروني وكلمة المرور لتأمين حسابك', 'info')
  },

  async getMe() {
    const mode = await this._init()
    if (mode === 'supabase') {
      const u = await SB.getCurrentUser()
      if (u) return u
    }
    if (mode === 'api' || mode === 'flask') {
      const r = await this._fetch('/auth/me')
      if (r.ok) return await r.json()
    }
    const uid = (this.token || '').replace('local_', '').replace('sb_', '')
    const u = LocalDB.users.get().find(x => x.id === uid)
    if (!u) throw new Error('Not logged in')
    return { id: u.id, name: u.name, email: u.email, plan: u.plan, lang: u.lang, isAdmin: u.isAdmin || false }
  },

  logout() {
    this._saveToken(null)
    this.mode = null
    if (SB.isReady()) SB.signOut()
  },

  async updateProfile(data) {
    const mode = await this._init()
    if (mode === 'api' || mode === 'flask') {
      const r = await this._fetch('/auth/update', {method:'PUT', body:JSON.stringify(data)})
      if (r.ok) return await r.json()
    }
    const uid = (this.token || '').replace('local_', '').replace('sb_', '')
    const users = LocalDB.users.get()
    const u = users.find(x => x.id === uid)
    if (!u) throw new Error('Not found')
    if (data.name) u.name = data.name
    if (data.password) u.password = data.password
    u.lang = data.lang || u.lang
    LocalDB.users.save(users)
    return { id: u.id, name: u.name, email: u.email, plan: u.plan, lang: u.lang }
  },

  // ── Sites ──
  async getSites() {
    const mode = await this._init()
    if (mode === 'supabase') {
      const current = await SB.getCurrentUser()
      const sbSites = await SB.getSites(current?.id)
      if (Array.isArray(sbSites)) {
        LocalDB.pages.save(sbSites)
        return sbSites
      }
    }
    if (mode === 'api' || mode === 'flask') {
      const r = await this._fetch('/sites')
      if (r.ok) {
        const sites = await r.json()
        if (Array.isArray(sites)) return sites
      }
    }
    const uid = (this.token || '').replace('local_', '').replace('sb_', '')
    return LocalDB.getUserPages(uid)
  },

  async getSite(id) {
    const mode = await this._init()
    if (mode === 'supabase') {
      const s = await SB.getSite(id)
      if (s) {
        LocalDB.updatePage(id, s)
        return s
      }
    }
    if (mode === 'api' || mode === 'flask') {
      const r = await this._fetch('/sites/' + id)
      if (r.ok) return await r.json()
    }
    return LocalDB.getPage(id)
  },

  async createSite(data) {
    const templateId = data.template_type || 'blank'
    const allPresets = typeof ALL_PRESETS !== 'undefined' ? ALL_PRESETS : PRESETS
    const template = allPresets.find(p => p.id === templateId) || PRESETS[0]
    const mode = await this._init()
    const uid = (this.token || '').replace('local_', '').replace('sb_', '')

    if (mode === 'supabase') {
      const current = await SB.getCurrentUser()
      const sitePayload = {
        title: data.title || template.name,
        slug: data.slug,
        template_type: templateId,
        user_id: current?.id || uid || 'usr_guest',
        theme: template.theme || { color: '#6366f1', font: 'Cairo' },
        seo: template.seo || { title: data.title || template.name, description: '' },
        sections: template.sections || []
      }
      const s = await SB.createSite(sitePayload)
      if (s) {
        LocalDB.addPage(s)
        return s
      }
    }

    if (mode === 'api' || mode === 'flask') {
      const r = await this._fetch('/sites', {
        method: 'POST',
        body: JSON.stringify({
          title: data.title || template.name,
          slug: data.slug,
          template_type: templateId,
          theme: template.theme || { color: '#6366f1', font: 'Cairo' },
          seo: template.seo || { title: data.title || template.name, description: '' },
          sections: template.sections || []
        })
      })
      if (r.ok) {
        const s = await r.json()
        LocalDB.addPage(s)
        return s
      }
    }

    const pageData = LocalDB.defaultPage(data.title || template.name, template)
    pageData.userId = uid
    return LocalDB.addPage(pageData)
  },

  async updateSite(id, data) {
    const mode = await this._init()
    if (mode === 'supabase') {
      const s = await SB.updateSite(id, data)
      if (s) {
        LocalDB.updatePage(id, s)
        return s
      }
    }
    if (mode === 'api' || mode === 'flask') {
      const r = await this._fetch('/sites/' + id, {method:'PUT', body:JSON.stringify(data)})
      if (r.ok) {
        const s = await r.json()
        LocalDB.updatePage(id, data)
        return s
      }
    }
    return LocalDB.updatePage(id, data)
  },

  async deleteSite(id) {
    const mode = await this._init()
    if (mode === 'supabase') {
      await SB.deleteSite(id)
    }
    if (mode === 'api' || mode === 'flask') {
      await this._fetch('/sites/' + id, {method:'DELETE'})
    }
    LocalDB.deletePage(id)
  },

  async publishSite(id) {
    const mode = await this._init()
    if (mode === 'supabase') {
      const s = await SB.publishSite(id)
      if (s) {
        LocalDB.updatePage(id, {published:true})
        return s
      }
    }
    if (mode === 'api' || mode === 'flask') {
      const r = await this._fetch('/sites/' + id + '/publish', {method:'POST'})
      if (r.ok) {
        const s = await r.json()
        LocalDB.updatePage(id, {published:true})
        return s
      }
    }
    return LocalDB.updatePage(id, {published:true})
  },

  async getPublicPage(slug) {
    const mode = await this._init()
    if (mode === 'supabase') {
      try {
        const s = await SB.getPublicPage(slug)
        if (s) return s
      } catch {}
    }
    if (mode === 'api' || mode === 'flask') {
      try {
        const r = await this._fetch('/p/' + encodeURIComponent(slug))
        if (r.ok) return await r.json()
      } catch {}
    }
    return LocalDB.getPageBySlug(slug)
  },

  async getPlans() {
    const mode = await this._init()
    if (mode === 'flask') {
      try { const r = await this._fetch('/plans'); if (r.ok) return (await r.json()) } catch {}
    }
    return {
      free: { name:'مجاني', name_en:'Free', price:0, yearly_price:0, currency:'EGP', max_sites:1, pages:2, custom_domain:false, analytics:false, premium_themes:false, priority_support:false, remove_branding:false, ecommerce:false, payment_gateway:false, whatsapp_support:false, features:['دومين فرعي','صفحتين','علامة Made with Site Flow','استضافة مجانية'] },
      basic: { name:'أساسي', name_en:'Basic', price:129, yearly_price:999, currency:'EGP', max_sites:3, pages:10, custom_domain:true, analytics:true, premium_themes:false, priority_support:false, remove_branding:true, ecommerce:false, payment_gateway:false, whatsapp_support:false, features:['دومين خاص (.com)','10 صفحات','إزالة العلامة','SSL مجاني','تحليلات أساسية'] },
      pro: { name:'احترافي', name_en:'Pro', price:299, yearly_price:2499, currency:'EGP', max_sites:-1, pages:-1, custom_domain:true, analytics:true, premium_themes:true, priority_support:true, remove_branding:true, ecommerce:true, payment_gateway:true, whatsapp_support:true, features:['صفحات غير محدودة','ربط فوري/إنستاباي/فودافون كاش','متجر بسيط (50 منتج)','دعم واتساب','بكسل فيسبوك/إنستجرام','جميع القوالب'] },
      business: { name:'بيزنس', name_en:'Business', price:599, yearly_price:4999, currency:'EGP', max_sites:-1, pages:-1, custom_domain:true, analytics:true, premium_themes:true, priority_support:true, remove_branding:true, ecommerce:true, payment_gateway:true, whatsapp_support:true, features:['متجر كامل بدون حدود','تكامل شحن محلي','تقارير مبيعات','دعم مخصص','API доступ','White Label'] }
    }
  },

  async createPayment(planKey) {
    const mode = await this._init()
    if (mode === 'flask') {
      const r = await this._fetch('/payments/create', {method:'POST', body:JSON.stringify({plan:planKey})})
      if (r.ok) return (await r.json())
    }
    if (mode === 'supabase') { try { const uid=SB.getSession()?.data?.session?.user?.id; if(uid) return await SB.createPayment(uid, planKey, planKey==='pro'?9:29) } catch {} }
    // local mode — save payment request
    const plans = await this.getPlans()
    const plan = plans[planKey]
    const uid=(this.token||'').replace('local_','')
    const payment = {id:LocalDB.genId(), userId:uid, plan:planKey, amount:plan?.price||0, status:'pending', currency:'EGP', created_at:new Date().toISOString()}
    const payments = LocalDB.payments.get()
    payments.push(payment)
    LocalDB.payments.save(payments)
    return payment
  },

  async confirmPayment(id) {
    const mode = await this._init()
    if (mode === 'flask') {
      const r = await this._fetch('/payments/confirm/'+id, {method:'POST'})
      if (r.ok) { const d=await r.json(); return d }
    }
    if (mode === 'supabase') { try { await SB.confirmPayment(id); return } catch {} }
    // local mode — find payment and upgrade user plan
    const payments = LocalDB.payments.get()
    const p = payments.find(x=>x.id===id)
    if (p) { p.status='completed'; LocalDB.payments.save(payments); const uid=(this.token||'').replace('local_',''); const users=LocalDB.users.get(); const u=users.find(x=>x.id===uid); if(u){u.plan=p.plan;LocalDB.users.save(users)} }
    return {ok: true}
  },

  async getPayments() {
    const mode = await this._init()
    if (mode === 'flask') {
      const r = await this._fetch('/payments')
      if (r.ok) return (await r.json())
    }
    if (mode === 'supabase') { try { const r = await SB.client.from('payments').select('*').order('created_at',{ascending:false}); if(r.data) return r.data } catch {} }
    // local mode — return user's payments
    const uid=(this.token||'').replace('local_','')
    return LocalDB.payments.get().filter(p=>p.userId===uid).sort((a,b)=>new Date(b.created_at)-new Date(a.created_at))
  },

  async submitForm(slug, name, email, message) {
    if (this.mode !== 'local') {
      try {
        const r = await this._fetch(`/p/${slug}/submit`, {method:'POST', body:JSON.stringify({name, email, message})})
        if (r.ok) return {ok: true}
      } catch {}
    }
    // LocalDB fallback
    const pages = LocalDB.pages.get()
    const page = pages.find(p => p.slug === slug)
    if (page) {
      if (!page.submissions) page.submissions = []
      page.submissions.push({id: Date.now(), name, email, message, read: false, created_at: new Date().toISOString()})
      LocalDB.pages.save(pages)
      return {ok: true}
    }
    return {ok: false}
  },

  async getSubmissions(siteId) {
    try {
      if (!IS_LOCAL) {
        const r = await this._fetch(`/sites/${siteId}/submissions`)
        if (r.ok) return await r.json()
      }
    } catch {}
    // LocalDB fallback
    const page = LocalDB.getPage(siteId)
    return (page && page.submissions) ? page.submissions.sort((a,b)=>b.id-a.id) : []
  },

  async markSubmissionRead(siteId, subId) {
    if (IS_LOCAL) {
      const pages = LocalDB.pages.get()
      const page = pages.find(p => p.id === siteId)
      if (page && page.submissions) {
        const sub = page.submissions.find(s => s.id == subId)
        if (sub) sub.read = true
        LocalDB.pages.save(pages)
      }
      return {ok: true}
    }
    try {
      const r = await this._fetch(`/sites/${siteId}/submissions/${subId}/read`, {method:'POST'})
      if (r.ok) return {ok: true}
    } catch {}
    return {ok: true}
  },

  async deleteSubmission(siteId, subId) {
    if (IS_LOCAL) {
      const pages = LocalDB.pages.get()
      const page = pages.find(p => p.id === siteId)
      if (page && page.submissions) {
        page.submissions = page.submissions.filter(s => s.id != subId)
        LocalDB.pages.save(pages)
      }
      return {ok: true}
    }
    try {
      const r = await this._fetch(`/sites/${siteId}/submissions/${subId}`, {method:'DELETE'})
      if (r.ok) return {ok: true}
    } catch {}
    return {ok: true}
  },

  async getAnalytics(siteId) {
    if (IS_LOCAL) {
      const page = LocalDB.getPage(siteId)
      return {
        totalViews: page ? (page.views || 0) : 0,
        viewsByDay: [],
        uniqueIPs: 0,
        submissionsCount: page && page.submissions ? page.submissions.length : 0
      }
    }
    try {
      const r = await this._fetch(`/sites/${siteId}/analytics`)
      if (r.ok) return await r.json()
    } catch {}
    return {totalViews: 0, viewsByDay: [], uniqueIPs: 0}
  },

  // ── Sync local sites to Flask backend ──
  async syncToBackend() {
    const mode = await this._init()
    if (mode !== 'flask') return
    const uid=(this.token||'').replace('local_','')
    const locals = LocalDB.users.get().find(u => u.id === uid)
    if (!locals) return
    const pages = LocalDB.pages.get().filter(p => p.userId === uid)
    for (const page of pages) {
      try {
        const r = await this._fetch('/sites/import', {method:'POST', body:JSON.stringify(page)})
        if (r.ok) {
          const imported = await r.json()
          Object.assign(page, imported)
          LocalDB.pages.save(LocalDB.pages.get().map(p => p.id === page.id ? page : p))
        }
      } catch {}
    }
  },

  // ── Cloudinary Upload ──
  async uploadImage(file) {
    const mode = await this._init()
    // Try Flask backend with Cloudinary
    if (mode === 'flask') {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const r = await fetch(IS_LOCAL ? API_BASE : PROD_API + '/upload', {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + this.token },
          body: formData
        })
        if (r.ok) return (await r.json()).url
      } catch {}
    }
    // Fallback: direct base64 (works offline)
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (ev) => resolve(ev.target.result)
      reader.readAsDataURL(file)
    })
  }
}
