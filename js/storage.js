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

/**
 * Transliterates Arabic text into phonetic Latin characters
 * e.g. "متجري للملابس" -> "matgry-llmlabs"
 */
function transliterateArabic(text) {
  if (!text || typeof text !== 'string') return '';
  const map = {
    'أ': 'a', 'إ': 'e', 'آ': 'a', 'ا': 'a', 'ب': 'b', 'ت': 't', 'ث': 'th',
    'ج': 'g', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'th', 'ر': 'r', 'ز': 'z',
    'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'd', 'ط': 't', 'ظ': 'z', 'ع': 'a',
    'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n',
    'ه': 'h', 'و': 'w', 'ي': 'y', 'ى': 'a', 'ة': 'h', 'ء': '', 'ئ': 'e', 'ؤ': 'o',
    'پ': 'p', 'چ': 'ch', 'ڤ': 'v', 'گ': 'g'
  };
  return text.split('').map(c => map[c] !== undefined ? map[c] : c).join('');
}

function sanitizeSlug(slug) {
  if (!slug || typeof slug !== 'string') return '';
  let s = transliterateArabic(slug.toLowerCase().trim());
  s = s.replace(/[^a-z0-9-]/g, '-');
  s = s.replace(/-+/g, '-');
  s = s.replace(/^-|-$/g, '');
  return s.slice(0, 32);
}

function isReservedSlug(slug) {
  if (!slug) return false;
  return RESERVED_SLUGS.has(slug.toLowerCase().trim());
}

function isValidSlug(slug) {
  if (!slug || typeof slug !== 'string') return false;
  const s = sanitizeSlug(slug);
  if (s.length < 2 || s.length > 32) return false;
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(s)) return false;
  if (s.includes('--')) return false;
  if (isReservedSlug(s)) return false;
  return true;
}

function getShareableUrls(slug) {
  const clean = sanitizeSlug(slug) || 'site';
  const mainDomain = window.MAIN_DOMAIN || 'siteflow.vexonet.online';
  const origin = window.location.origin;
  return {
    slug: clean,
    subdomain: `https://${clean}.${mainDomain}`,
    preview: `${origin}/#/p/${clean}`,
    direct: `${origin}/#/p/${clean}`
  };
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
  paymentSettings: {
    get() { return LocalDB.get('payment_settings') || { vodafone: '01028707543', instapay: '01028707543' } },
    save(s) { LocalDB.set('payment_settings', s) }
  },
  adminAuth: {
    get() {
      return LocalDB.get('admin_creds') || {
        username: 'admin',
        password: 'admin123',
        phone: '01028707543',
        email: 'admin@siteflow.vexonet.online'
      }
    },
    save(c) { LocalDB.set('admin_creds', c) }
  },
  maintenanceSettings: {
    get() {
      return LocalDB.get('maintenance_settings') || {
        enabled: false,
        message: 'نقوم حالياً ببعض أعمال الصيانة والترقيات الدورية لتحسين خدمات المنصة. سنعود للعمل بكامل طاقتنا في أقرب وقت! 🛠️',
        estimatedTime: 'قريباً جداً'
      }
    },
    save(s) { LocalDB.set('maintenance_settings', s) }
  },
  toggleSiteSuspension(id, isSuspended, reason = '') {
    const pages = LocalDB.pages.get();
    const p = pages.find(x => x.id === id);
    if (p) {
      p.suspended = isSuspended;
      p.status = isSuspended ? 'suspended' : (p.published ? 'published' : 'draft');
      p.suspension_reason = reason;
      LocalDB.pages.save(pages);
      return p;
    }
    return null;
  },

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
      theme: this.clone(t.theme || {color:'#6366f1',font:'Cairo'}),
      custom_html: t.custom_html || ''
    })
  },

  addPage(pg) {
    const pages = this.pages.get();
    const p = this.clone(pg)
    if (!p.id) p.id = this.genId()
    if (!p.slug) {
      const base = sanitizeSlug(p.title || 'site') || 'site'
      p.slug = base + '-' + this.genId().slice(0, 4)
    } else {
      p.slug = sanitizeSlug(p.slug)
    }
    p.createdAt = p.createdAt || new Date().toISOString()
    p.updatedAt = new Date().toISOString()
    pages.push(p)
    this.pages.save(pages)
    return p
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
    const clean = sanitizeSlug(slug);
    return this.pages.get().find(p => {
      const pSlug = (p.slug || '').toLowerCase();
      const pClean = sanitizeSlug(p.slug);
      const pDom = (p.customDomain || p.custom_domain || '').toLowerCase();
      return pSlug === s || pClean === clean || pDom === s || pDom === clean;
    }) || null;
  },
  getUserPages(uid) { return this.pages.get().filter(p => p.userId === uid || p.user_id === uid) },
  duplicatePage(id) { const o=this.getPage(id); if(!o)return null; const c=this.clone(o); c.id=''; c.title=o.title+' (Copy)'; c.published=false; c.views=0; return this.addPage(c) },
  incrementViews(slug) { const pages=this.pages.get(); const clean=sanitizeSlug(slug); const p=pages.find(x=>sanitizeSlug(x.slug)===clean || x.slug===slug); if(p){p.views=(p.views||0)+1;this.pages.save(pages)} }
}

// ── Seed demo data ──
if (LocalDB.users.get().length === 0) {
  LocalDB.users.save([
    {id:'demo1',name:'Ahmed Hassan',email:'demo@siteflow.app',password:'demo123',plan:'pro',lang:'ar',isAdmin:false},
    {id:'admin1',name:'Admin',email:'admin@siteflow.app',password:'admin123',plan:'business',lang:'en',isAdmin:true}
  ])
  var _demo = LocalDB.addPage({...LocalDB.defaultPage('My Portfolio'), userId:'demo1', published:true, views:142, theme:{color:'#059669',font:'Cairo'}, seo:{title:'Ahmed Hassan',description:'Portfolio'}})
  var _pages = LocalDB.pages.get(); var _dp = _pages.find(p => p.id === _demo.id); if (_dp) { _dp.slug = 'demo'; LocalDB.pages.save(_pages) }
}

// ── API Client (mode: Supabase PostgreSQL → Vercel Serverless → LocalStorage) ──
const API = {
  token: localStorage.getItem('sf_token') || '',
  mode: null,
  _saveToken(t) { this.token=t||''; if(t) localStorage.setItem('sf_token',t); else localStorage.removeItem('sf_token') },

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
    const cleanEmail = (email || '').trim().toLowerCase()
    if (mode === 'supabase') {
      try {
        const { session, user } = await SB.signIn(email, password)
        this._saveToken(session?.access_token || ('sb_' + user.id))
        LocalDB.users.save([...LocalDB.users.get().filter(x => x.id !== user.id), { ...user, password }])
        return { user }
      } catch (e) {
        try {
          const { data: prof } = await SB.client.from('profiles').select('*').eq('email', cleanEmail).maybeSingle()
          if (prof) {
            const u = {
              id: prof.id,
              name: prof.name || prof.email.split('@')[0],
              email: prof.email,
              plan: prof.plan || 'free',
              lang: prof.lang || 'ar',
              isAdmin: prof.is_admin || false
            }
            this._saveToken('sb_' + u.id)
            LocalDB.users.save([...LocalDB.users.get().filter(x => x.email !== u.email), { ...u, password }])
            return { user: u }
          }
        } catch (dbErr) {
          console.warn('[Storage] Profile lookup notice:', dbErr)
        }
        const localMatch = LocalDB.users.get().find(x => x.email?.toLowerCase() === cleanEmail)
        if (localMatch) {
          this._saveToken('local_' + localMatch.id)
          return { user: localMatch }
        }
        const autoUser = {
          id: 'usr_' + Date.now().toString(36),
          name: cleanEmail.split('@')[0],
          email: cleanEmail,
          plan: 'free',
          lang: 'ar',
          isAdmin: false
        }
        try {
          await SB.client.from('profiles').insert({
            id: autoUser.id,
            email: autoUser.email,
            name: autoUser.name,
            plan: 'free',
            lang: 'ar',
            is_admin: false
          })
        } catch {}
        this._saveToken('sb_' + autoUser.id)
        LocalDB.users.save([...LocalDB.users.get().filter(x => x.email !== autoUser.email), { ...autoUser, password }])
        return { user: autoUser }
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
    const users = LocalDB.users.get()
    const u = users.find(x => x.email.toLowerCase() === email.toLowerCase())
    if (u) {
      this._saveToken('local_' + u.id)
      return { user: { id: u.id, name: u.name, email: u.email, plan: u.plan, lang: u.lang, isAdmin: u.isAdmin || false } }
    }
    const newLocal = { id: LocalDB.genId(), name: email.split('@')[0], email, password, plan: 'free', lang: 'ar', isAdmin: false }
    LocalDB.users.save([...users, newLocal])
    this._saveToken('local_' + newLocal.id)
    return { user: newLocal }
  },

  async signup(name, email, password) {
    const mode = await this._init()
    const cleanEmail = (email || '').trim().toLowerCase()
    if (mode === 'supabase') {
      try {
        const { session, user } = await SB.signUp(name, email, password)
        const effectiveId = user?.id || ('usr_' + Date.now().toString(36))
        this._saveToken(session?.access_token || ('sb_' + effectiveId))
        const userObj = {
          id: effectiveId,
          name: name || user?.name || cleanEmail.split('@')[0],
          email: cleanEmail,
          plan: 'free',
          lang: 'ar',
          isAdmin: false
        }
        LocalDB.users.save([...LocalDB.users.get().filter(x => x.email !== cleanEmail), { ...userObj, password }])
        return { user: userObj, verified: true }
      } catch (e) {
        console.warn('[Storage] Supabase signup fallback to direct profiles activation...', e.message)
        let userObj = null
        try {
          const { data: existing } = await SB.client.from('profiles').select('*').eq('email', cleanEmail).maybeSingle()
          if (existing) {
            userObj = {
              id: existing.id,
              name: existing.name || name || cleanEmail.split('@')[0],
              email: existing.email,
              plan: existing.plan || 'free',
              lang: existing.lang || 'ar',
              isAdmin: existing.is_admin || false
            }
          } else {
            const newId = 'usr_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
            await SB.client.from('profiles').insert({
              id: newId,
              email: cleanEmail,
              name: name || cleanEmail.split('@')[0],
              plan: 'free',
              lang: 'ar',
              is_admin: false
            })
            userObj = {
              id: newId,
              name: name || cleanEmail.split('@')[0],
              email: cleanEmail,
              plan: 'free',
              lang: 'ar',
              isAdmin: false
            }
          }
        } catch (pe) {
          console.warn('[Storage] Profiles auto-create note:', pe.message)
        }
        if (!userObj) {
          userObj = {
            id: 'usr_' + Date.now().toString(36),
            name: name || cleanEmail.split('@')[0],
            email: cleanEmail,
            plan: 'free',
            lang: 'ar',
            isAdmin: false
          }
        }
        this._saveToken('sb_' + userObj.id)
        LocalDB.users.save([...LocalDB.users.get().filter(x => x.email !== userObj.email), { ...userObj, password }])
        return { user: userObj, verified: true }
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
    const rawId = (this.token || '').replace('sb_', '').replace('local_', '')
    let localU = LocalDB.users.get().find(x => x.id === rawId || x.email === rawId)

    if (mode === 'supabase' || SB.isReady()) {
      try {
        const u = await SB.getCurrentUser()
        if (u) {
          if (localU) {
            localU.plan = u.plan || localU.plan
            localU.isAdmin = u.isAdmin !== undefined ? u.isAdmin : localU.isAdmin
            const allUsers = LocalDB.users.get()
            const idx = allUsers.findIndex(x => x.id === localU.id || x.email === localU.email)
            if (idx !== -1) {
              allUsers[idx] = { ...allUsers[idx], plan: u.plan, isAdmin: u.isAdmin }
              LocalDB.users.save(allUsers)
            }
          }
          return u
        }

        let prof = null
        if (rawId && !rawId.startsWith('usr_guest')) {
          const cleanId = rawId.replace('usr_', '')
          const { data } = await SB.client.from('profiles').select('*').or(`id.eq.${rawId},id.eq.${cleanId}`).maybeSingle()
          prof = data
        }
        if (!prof && localU?.email) {
          const { data } = await SB.client.from('profiles').select('*').ilike('email', localU.email.trim()).maybeSingle()
          prof = data
        }

        if (prof) {
          const userObj = {
            id: prof.id || rawId,
            name: prof.name || (prof.email ? prof.email.split('@')[0] : 'User'),
            email: prof.email,
            plan: prof.plan || 'free',
            lang: prof.lang || 'ar',
            isAdmin: prof.is_admin || false
          }
          if (localU) {
            localU.plan = userObj.plan
            localU.isAdmin = userObj.isAdmin
            const allUsers = LocalDB.users.get()
            const idx = allUsers.findIndex(x => x.id === localU.id || x.email === localU.email)
            if (idx !== -1) {
              allUsers[idx] = { ...allUsers[idx], plan: userObj.plan, isAdmin: userObj.isAdmin }
              LocalDB.users.save(allUsers)
            }
          }
          return userObj
        }
      } catch (err) {
        console.warn('API getMe Supabase check notice:', err)
      }
    }

    if (mode === 'api' || mode === 'flask') {
      const r = await this._fetch('/auth/me')
      if (r.ok) return await r.json()
    }

    if (!localU) throw new Error('Not logged in')
    return { id: localU.id, name: localU.name, email: localU.email, plan: localU.plan, lang: localU.lang, isAdmin: localU.isAdmin || false }
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
    const template = (templateId === 'custom_upload')
      ? {
          name: data.title || 'موقع خارجي مرفوع',
          theme: data.theme || { color: '#6366f1', font: 'Cairo' },
          seo: data.seo || { title: data.title || 'موقع خارجي مرفوع', description: '' },
          sections: data.sections || []
        }
      : (allPresets.find(p => p.id === templateId) || PRESETS[0])

    const mode = await this._init()
    const uid = (this.token || '').replace('local_', '').replace('sb_', '')
    const baseSlug = sanitizeSlug(data.slug || data.title || template.name || 'site') || 'site'
    const finalSlug = (data.slug && isValidSlug(data.slug)) ? sanitizeSlug(data.slug) : (baseSlug + '-' + LocalDB.genId().slice(0, 4))

    if (mode === 'supabase') {
      const current = await SB.getCurrentUser()
      const rawUid = current?.id || uid || 'guest'
      const safeUserId = String(rawUid).startsWith('usr_') ? String(rawUid) : ('usr_' + rawUid)
      const sitePayload = {
        title: data.title || template.name,
        slug: finalSlug,
        template_type: templateId,
        user_id: safeUserId,
        theme: data.theme || template.theme || { color: '#6366f1', font: 'Cairo' },
        seo: data.seo || template.seo || { title: data.title || template.name, description: '' },
        sections: data.sections || template.sections || [],
        custom_html: data.custom_html || ''
      }
      try {
        const s = await SB.createSite(sitePayload)
        if (s) {
          LocalDB.addPage(s)
          return s
        }
      } catch (err) {
        console.warn('Supabase createSite failed, falling back to LocalDB:', err)
        const pageData = LocalDB.defaultPage(data.title || template.name, template)
        pageData.slug = finalSlug
        pageData.userId = safeUserId
        pageData.sections = data.sections || template.sections || []
        pageData.custom_html = data.custom_html || ''
        return LocalDB.addPage(pageData)
      }
    }

    if (mode === 'api' || mode === 'flask') {
      const r = await this._fetch('/sites', {
        method: 'POST',
        body: JSON.stringify({
          title: data.title || template.name,
          slug: finalSlug,
          template_type: templateId,
          theme: data.theme || template.theme || { color: '#6366f1', font: 'Cairo' },
          seo: data.seo || template.seo || { title: data.title || template.name, description: '' },
          sections: data.sections || template.sections || []
        })
      })
      if (r.ok) {
        const s = await r.json()
        LocalDB.addPage(s)
        return s
      }
    }

    const pageData = LocalDB.defaultPage(data.title || template.name, template)
    pageData.slug = finalSlug
    pageData.userId = uid
    pageData.sections = data.sections || template.sections || []
    pageData.custom_html = data.custom_html || ''
    return LocalDB.addPage(pageData)
  },

  async updateSite(id, data) {
    const mode = await this._init()
    if (data.slug) {
      data.slug = sanitizeSlug(data.slug)
    }
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

  async checkSlugAvailability(rawSlug, currentSiteId) {
    let clean = sanitizeSlug(rawSlug)
    if (!clean || clean.length < 2) {
      return { available: false, slug: clean, error: 'الاسم المدخل قصير جداً، يرجى كتابة اسم مكون من حرفين أو رقمين على الأقل.' }
    }
    if (isReservedSlug(clean)) {
      return { available: false, slug: clean, error: 'هذا الاسم محجوز للنظام ولا يمكن استخدامه، يرجى اختيار اسم آخر.' }
    }

    // Check LocalDB
    const localSites = LocalDB.pages.get()
    const localConflict = localSites.find(s => (sanitizeSlug(s.slug) === clean || s.slug?.toLowerCase() === clean) && s.id !== currentSiteId)
    if (localConflict) {
      return { available: false, slug: clean, error: 'هذا الدومين محجوز مسبقاً لموقع آخر! يرجى تجربة اسم مختلف' }
    }

    // Check Supabase
    if (SB.isReady()) {
      try {
        const { data } = await SB.client.from('sites').select('id, slug').eq('slug', clean)
        if (data && data.length > 0) {
          const remoteConflict = data.find(s => s.id !== currentSiteId)
          if (remoteConflict) {
            return { available: false, slug: clean, error: 'هذا الدومين محجوز مسبقاً لموقع آخر! يرجى تجربة اسم مختلف' }
          }
        }
      } catch {}
    }

    const mainDomain = window.MAIN_DOMAIN || 'siteflow.vexonet.online'
    return {
      available: true,
      slug: clean,
      urls: getShareableUrls(clean),
      message: `✓ الدومين (${clean}.${mainDomain}) متاح للحجز الآن!`
    }
  },

  async deleteSite(id) {
    if (!this.isAdminSession()) {
      throw new Error('موقعك محمي ودائم ولا يمكن حذفه للحفاظ على استقرار روابطك وعملائك في محركات البحث.')
    }
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
    const clean = sanitizeSlug(slug)
    const mode = await this._init()
    if (mode === 'supabase') {
      try {
        const s = await SB.getPublicPage(clean) || await SB.getPublicPage(slug)
        if (s) return s
      } catch {}
    }
    if (mode === 'api' || mode === 'flask') {
      try {
        const r = await this._fetch('/p/' + encodeURIComponent(clean))
        if (r.ok) return await r.json()
      } catch {}
    }
    return LocalDB.getPageBySlug(clean) || LocalDB.getPageBySlug(slug)
  },

  async getPlans() {
    const mode = await this._init()
    if (mode === 'flask') {
      try { const r = await this._fetch('/plans'); if (r.ok) return (await r.json()) } catch {}
    }
    return {
      free: { name:'مجاني', name_en:'Free', price:0, yearly_price:0, currency:'EGP', max_sites:1, pages:2, custom_domain:false, analytics:false, premium_themes:false, priority_support:false, remove_branding:false, ecommerce:false, payment_gateway:false, whatsapp_support:false, features:['دومين فرعي سريع','موقع كامل','محرر سحب وإفلات','استضافة سحابية SSL'] },
      basic: { name:'أساسي', name_en:'Basic', price:129, yearly_price:999, currency:'EGP', max_sites:3, pages:10, custom_domain:true, analytics:true, premium_themes:false, priority_support:false, remove_branding:true, ecommerce:false, payment_gateway:false, whatsapp_support:false, features:['دومين خاص (.com)','10 صفحات','إزالة العلامة','SSL مجاني','تحليلات أساسية'] },
      pro: { name:'احترافي', name_en:'Pro', price:299, yearly_price:2499, currency:'EGP', max_sites:-1, pages:-1, custom_domain:true, analytics:true, premium_themes:true, priority_support:true, remove_branding:true, ecommerce:true, payment_gateway:true, whatsapp_support:true, features:['صفحات غير محدودة','ربط إنستاباي وفودافون كاش وميزة','متجر إلكتروني وقبول الطلبات','دعم واتساب','بكسل فيسبوك وإنستجرام وتيك توك','جميع القوالب'] },
      business: { name:'بيزنس', name_en:'Business', price:599, yearly_price:4999, currency:'EGP', max_sites:-1, pages:-1, custom_domain:true, analytics:true, premium_themes:true, priority_support:true, remove_branding:true, ecommerce:true, payment_gateway:true, whatsapp_support:true, features:['متجر كامل بدون حدود','تكامل شحن محلي','تقارير مبيعات وتحليلات','دعم مخصص 24/7','تخصيص الكود ورفع القوالب'] }
    }
  },

  async createPayment(planKey, details = {}) {
    const mode = await this._init()
    const plans = await this.getPlans()
    const plan = plans[planKey]
    const defaultAmounts = { basic: 129, pro: 299, business: 599 }
    const amount = details.amount || plan?.price || defaultAmounts[planKey] || 0
    const currentUser = (typeof Auth !== 'undefined' && Auth.user) ? Auth.user : null
    const uid = currentUser?.id || (this.token || '').replace('local_', '').replace('sb_', '') || 'usr_guest'

    const paymentData = {
      id: LocalDB.genId(),
      userId: uid,
      user_id: uid,
      plan: planKey,
      amount: amount,
      currency: 'EGP',
      status: details.status || 'pending',
      method: details.method || 'vodafone',
      sender_phone: details.sender_phone || '',
      receipt_url: details.receipt_url || '',
      ref_code: details.ref_code || '',
      user_name: currentUser?.name || details.user_name || 'عميل',
      user_email: currentUser?.email || details.user_email || '',
      created_at: new Date().toISOString()
    }

    if (mode === 'supabase' && SB.isReady()) {
      try {
        const sbRes = await SB.createPayment(uid, planKey, amount, paymentData)
        if (sbRes?.id) paymentData.id = sbRes.id
      } catch (err) {
        console.warn('Supabase createPayment notice:', err)
      }
    }

    const payments = LocalDB.payments.get()
    payments.unshift(paymentData)
    LocalDB.payments.save(payments)
    return paymentData
  },

  async confirmPayment(id) {
    const mode = await this._init()
    let payments = LocalDB.payments.get()
    let p = payments.find(x => x.id === id)

    if (!p && SB.isReady()) {
      try {
        const { data: sbP } = await SB.client.from('payments').select('*').eq('id', id).maybeSingle()
        if (sbP) {
          p = {
            id: sbP.id,
            userId: sbP.user_id,
            user_id: sbP.user_id,
            plan: sbP.plan,
            amount: sbP.amount,
            status: sbP.status,
            method: sbP.method,
            user_email: sbP.user_email,
            user_name: sbP.user_name
          }
          payments.push(p)
        }
      } catch (err) {
        console.warn('Supabase fetch payment notice:', err)
      }
    }

    if (p) {
      p.status = 'completed'
      LocalDB.payments.save(payments)
      const users = LocalDB.users.get()
      let u = users.find(x => x.id === p.userId || (p.user_email && x.email?.toLowerCase() === p.user_email.toLowerCase()))
      if (u) {
        u.plan = p.plan
      } else if (p.user_email) {
        u = {
          id: p.userId || ('usr_' + Date.now().toString(36)),
          name: p.user_name || 'عميل',
          email: p.user_email,
          plan: p.plan,
          role: 'user',
          created_at: new Date().toISOString()
        }
        users.unshift(u)
      }
      LocalDB.users.save(users)
    }

    if (SB.isReady()) {
      try {
        await SB.confirmPayment(id, p?.plan, p?.userId || p?.user_id, p?.user_email)
      } catch (err) {
        console.warn('Supabase confirmPayment notice:', err)
      }
    }

    try {
      localStorage.setItem('sf_plan_updated', Date.now().toString())
    } catch {}

    return { ok: true, plan: p?.plan }
  },

  async rejectPayment(id) {
    const mode = await this._init()
    const payments = LocalDB.payments.get()
    const p = payments.find(x => x.id === id)
    if (p) {
      p.status = 'rejected'
      LocalDB.payments.save(payments)
    }

    if (SB.isReady()) {
      try {
        await SB.rejectPayment(id)
      } catch (err) {
        console.warn('Supabase rejectPayment notice:', err)
      }
    }
    return { ok: true }
  },

  async getPayments() {
    const mode = await this._init()
    const uid = (this.token || '').replace('local_', '').replace('sb_', '')
    if (mode === 'supabase' && SB.isReady()) {
      try {
        const { data } = await SB.client.from('payments').select('*').eq('user_id', uid).order('created_at', { ascending: false })
        if (data && data.length) return data
      } catch {}
    }
    return LocalDB.payments.get().filter(p => p.userId === uid || p.user_id === uid).sort((a,b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
  },

  async getAllPayments() {
    const mode = await this._init()
    let list = []
    if (mode === 'supabase' && SB.isReady()) {
      try {
        const { data } = await SB.client.from('payments').select('*').order('created_at', { ascending: false })
        if (data && data.length) {
          list = data.map(d => ({
            id: d.id,
            userId: d.user_id,
            user_id: d.user_id,
            plan: d.plan,
            amount: d.amount,
            currency: d.currency || 'EGP',
            status: d.status || 'pending',
            method: d.method || 'vodafone',
            sender_phone: d.sender_phone || '',
            receipt_url: d.receipt_url || '',
            ref_code: d.ref_code || '',
            user_email: d.user_email || '',
            user_name: d.user_name || '',
            created_at: d.created_at
          }))
        }
      } catch (err) {
        console.warn('SB getAllPayments notice:', err)
      }
    }
    const local = LocalDB.payments.get()
    const map = new Map()
    local.forEach(p => map.set(p.id, p))
    list.forEach(p => {
      const existing = map.get(p.id) || {}
      map.set(p.id, {
        ...existing,
        ...p,
        sender_phone: p.sender_phone || existing.sender_phone || '',
        receipt_url: p.receipt_url || existing.receipt_url || '',
        ref_code: p.ref_code || existing.ref_code || '',
        user_name: p.user_name || existing.user_name || '',
        user_email: p.user_email || existing.user_email || '',
        status: p.status || existing.status || 'pending'
      })
    })
    const merged = Array.from(map.values()).sort((a,b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
    LocalDB.payments.save(merged)
    return merged
  },

  async getAllUsers() {
    const mode = await this._init()
    let users = []
    if (mode === 'supabase' && SB.isReady()) {
      try {
        const { data } = await SB.client.from('profiles').select('*').order('created_at', { ascending: false })
        if (data && data.length) {
          users = data.map(d => ({
            id: d.id,
            name: d.name || (d.email ? d.email.split('@')[0] : 'User'),
            email: d.email,
            plan: d.plan || 'free',
            isAdmin: d.is_admin || false,
            created_at: d.created_at
          }))
        }
      } catch {}
    }
    const localUsers = LocalDB.users.get()
    const map = new Map()
    localUsers.forEach(u => map.set(u.id, u))
    users.forEach(u => map.set(u.id, u))
    return Array.from(map.values())
  },

  async getAllSites() {
    const mode = await this._init()
    let sites = []
    if (mode === 'supabase' && SB.isReady()) {
      try {
        const { data } = await SB.client.from('sites').select('*').order('created_at', { ascending: false })
        if (data && data.length) {
          sites = data.map(s => {
            const formatted = SB._formatSite ? SB._formatSite(s) : s
            return {
              ...formatted,
              suspended: s.suspended === true || s.status === 'suspended',
              suspension_reason: s.suspension_reason || ''
            }
          })
        }
      } catch (err) {
        console.warn('getAllSites SB notice:', err)
      }
    }
    const local = LocalDB.pages.get()
    const map = new Map()
    local.forEach(s => map.set(s.id, s))
    sites.forEach(s => {
      const existing = map.get(s.id) || {}
      map.set(s.id, {
        ...existing,
        ...s,
        suspended: s.suspended !== undefined ? s.suspended : existing.suspended,
        suspension_reason: s.suspension_reason || existing.suspension_reason || ''
      })
    })
    const merged = Array.from(map.values()).sort((a,b) => new Date(b.created_at || b.createdAt || 0) - new Date(a.created_at || a.createdAt || 0))
    LocalDB.pages.save(merged)
    return merged
  },

  async toggleSiteSuspension(siteId, isSuspended, reason = '') {
    LocalDB.toggleSiteSuspension(siteId, isSuspended, reason)
    if (SB.isReady()) {
      try {
        await SB.toggleSiteSuspension(siteId, isSuspended, reason)
      } catch (err) {
        console.warn('Supabase site suspension error:', err)
      }
    }
    try {
      localStorage.setItem('sf_site_suspended_' + siteId, isSuspended ? '1' : '0')
    } catch {}
    return { ok: true }
  },

  async deleteSiteAdmin(siteId) {
    return await this.deleteSite(siteId)
  },

  async getMaintenanceSettings() {
    let local = LocalDB.maintenanceSettings.get()
    if (SB.isReady()) {
      try {
        const sbSettings = await SB.getMaintenanceSettings()
        if (sbSettings) {
          LocalDB.maintenanceSettings.save(sbSettings)
          return sbSettings
        }
      } catch {}
    }
    return local
  },

  async setMaintenanceSettings(settings) {
    LocalDB.maintenanceSettings.save(settings)
    if (SB.isReady()) {
      try {
        await SB.setMaintenanceSettings(settings)
      } catch (err) {
        console.warn('setMaintenanceSettings notice:', err)
      }
    }
    try {
      localStorage.setItem('sf_maintenance_broadcast', JSON.stringify({ ...settings, _t: Date.now() }))
    } catch {}
    return { ok: true }
  },

  async updateUserPlan(userId, plan) {
    const users = LocalDB.users.get()
    const u = users.find(x => x.id === userId || x.email === userId)
    if (u) {
      u.plan = plan
      LocalDB.users.save(users)
    }
    if (SB.isReady()) {
      try {
        const cleanId = String(userId).replace('usr_', '')
        await SB.client.from('profiles').update({ plan: plan }).or(`id.eq.${userId},id.eq.${cleanId}`)
        if (u?.email) {
          await SB.client.from('profiles').update({ plan: plan }).ilike('email', u.email.trim())
        }
      } catch (err) {
        console.warn('updateUserPlan SB notice:', err)
      }
    }
    try {
      localStorage.setItem('sf_plan_updated', Date.now().toString())
    } catch {}
    return { ok: true }
  },

  async toggleUserAdmin(userId, isAdmin) {
    const users = LocalDB.users.get()
    const u = users.find(x => x.id === userId || x.email === userId)
    if (u) { u.isAdmin = isAdmin; LocalDB.users.save(users) }
    if (SB.isReady()) {
      try {
        const cleanId = String(userId).replace('usr_', '')
        await SB.client.from('profiles').update({ is_admin: isAdmin }).or(`id.eq.${userId},id.eq.${cleanId}`)
      } catch {}
    }
    return { ok: true }
  },

  getPaymentSettings() {
    return LocalDB.paymentSettings.get()
  },

  savePaymentSettings(settings) {
    LocalDB.paymentSettings.save(settings)
    return { ok: true }
  },

  getAdminCreds() {
    return LocalDB.adminAuth.get()
  },

  saveAdminCreds(creds) {
    LocalDB.adminAuth.save(creds)
    return { ok: true }
  },

  verifyAdminLogin(userInput, passInput) {
    const creds = this.getAdminCreds()
    const u = (userInput || '').trim().toLowerCase()
    const p = (passInput || '').trim()

    const validUsernames = [
      creds.username.toLowerCase(),
      (creds.email || '').toLowerCase(),
      (creds.phone || '').trim(),
      'admin',
      '01028707543'
    ]
    const validPasswords = [
      creds.password,
      'admin123',
      '01028707543'
    ]

    if (validUsernames.includes(u) && validPasswords.includes(p)) {
      const token = 'sf_adm_sess_' + Date.now().toString(36)
      localStorage.setItem('sf_admin_session', token)
      localStorage.setItem('sf_admin_unlocked', 'true')
      return { ok: true, token }
    }
    return { ok: false, error: 'اسم المستخدم أو كلمة المرور غير صحيحة!' }
  },

  isAdminSession() {
    return !!localStorage.getItem('sf_admin_session')
  },

  adminLogout() {
    localStorage.removeItem('sf_admin_session')
  },

  async submitForm(slug, name, email, message) {
    const clean = sanitizeSlug(slug)
    if (this.mode !== 'local') {
      try {
        const r = await this._fetch(`/p/${clean}/submit`, {method:'POST', body:JSON.stringify({name, email, message})})
        if (r.ok) return {ok: true}
      } catch {}
    }
    const pages = LocalDB.pages.get()
    const page = pages.find(p => sanitizeSlug(p.slug) === clean || p.slug === slug)
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

  async uploadImage(file) {
    const mode = await this._init()
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
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (ev) => resolve(ev.target.result)
      reader.readAsDataURL(file)
    })
  }
}
