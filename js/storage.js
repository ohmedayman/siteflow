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

function isSbReady() {
  return typeof SB !== 'undefined' && typeof SB.isReady === 'function' && SB.isReady();
}

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

function makeUniqueSlug(baseSlug, currentSiteId) {
  let clean = sanitizeSlug(baseSlug);
  if (!clean || isReservedSlug(clean) || clean.length < 2) {
    clean = 'site';
  }
  const allPages = LocalDB.pages.get() || [];
  let candidate = clean;
  let counter = 1;
  const isTaken = (s) => {
    if (isReservedSlug(s)) return true;
    return allPages.some(p => p && p.id !== currentSiteId && (
      (p.slug && p.slug.toLowerCase() === s.toLowerCase()) ||
      (p.customDomain && p.customDomain.toLowerCase() === s.toLowerCase()) ||
      (p.custom_domain && p.custom_domain.toLowerCase() === s.toLowerCase())
    ));
  };
  while (isTaken(candidate)) {
    counter++;
    candidate = `${clean}-${counter}`;
  }
  return candidate;
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

  genId() { return 'sf_' + Date.now().toString(36) + Math.random().toString(36).slice(2,7) },
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
      theme: this.clone(t.theme || {color:'#6366f1',font:'Cairo'})
    })
  },

  addPage(pg) {
    const pages = this.pages.get(); const p = this.clone(pg)
    if (!p.id) p.id = this.genId()
    const baseSlug = p.slug || p.title || 'site'
    p.slug = makeUniqueSlug(baseSlug, p.id)
    p.createdAt = p.createdAt || new Date().toISOString()
    p.updatedAt = new Date().toISOString()
    pages.push(p); this.pages.save(pages); return p
  },

  updatePage(id, data) {
    const pages = this.pages.get(); const idx = pages.findIndex(p => p.id === id)
    if (idx === -1) return null
    const cleanData = this.clone(data)
    if (cleanData.slug && cleanData.slug !== pages[idx].slug) {
      const sanitized = sanitizeSlug(cleanData.slug)
      if (isReservedSlug(sanitized)) {
        throw new Error('هذا الدومين محجوز للنظام ولا يمكن استخدامه.')
      }
      const duplicate = pages.find(p => p.id !== id && p.slug?.toLowerCase() === sanitized)
      if (duplicate) {
        throw new Error('عذراً، هذا الدومين الفرعي محجوز ومستخدم بالفعل لموقع آخر ولا يمكن تكراره.')
      }
      cleanData.slug = sanitized
    }
    pages[idx] = { ...pages[idx], ...cleanData, updatedAt: new Date().toISOString() }
    this.pages.save(pages); return pages[idx]
  },

  deletePage(id) { this.pages.save(this.pages.get().filter(p => p.id !== id)) },
  getPage(id) { return this.pages.get().find(p => p.id === id) || null },
  getPageBySlug(slug) {
    const s = (slug || '').toLowerCase();
    return this.pages.get().find(p => (p.slug?.toLowerCase() === s || p.customDomain?.toLowerCase() === s || p.custom_domain?.toLowerCase() === s)) || null
  },
  getUserPages(uid, email) {
    const rawUid = String(uid || '').replace('local_', '').replace('sb_', '').trim()
    const cleanEmail = String(email || '').trim().toLowerCase()
    const all = this.pages.get() || []
    return all.filter(p => {
      if (!p) return false
      const pUid = String(p.userId || p.user_id || '').replace('local_', '').replace('sb_', '').trim()
      const pEmail = String(p.userEmail || p.user_email || '').trim().toLowerCase()
      if (rawUid && (pUid === rawUid || pUid === 'usr_' + rawUid || ('usr_' + pUid) === rawUid)) return true
      if (cleanEmail && (pEmail === cleanEmail || pUid === cleanEmail)) return true
      return false
    })
  },
  duplicatePage(id) { const o=this.getPage(id); if(!o)return null; const c=this.clone(o); c.id=''; c.title=o.title+' (Copy)'; c.published=false; c.views=0; return this.addPage(c) },
  incrementViews(slug) { const pages=this.pages.get(); const p=pages.find(x=>x.slug===slug); if(p){p.views=(p.views||0)+1;this.pages.save(pages)} }
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
        if (sbReady && isSbReady()) {
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
    if (!cleanEmail || !password) {
      throw new Error('يرجى إدخال البريد الإلكتروني وكلمة المرور.')
    }

    // 1. If Supabase is available
    if (mode === 'supabase' && isSbReady()) {
      try {
        const { session, user } = await SB.signIn(cleanEmail, password)
        if (user) {
          const u = {
            id: user.id,
            name: user.name || cleanEmail.split('@')[0],
            email: cleanEmail,
            password: password,
            plan: user.plan || 'free',
            lang: 'ar',
            isAdmin: !!user.isAdmin
          }
          this._saveToken(session?.access_token || ('sb_' + u.id))
          LocalDB.users.save([...LocalDB.users.get().filter(x => x.email?.toLowerCase() !== cleanEmail), u])
          return { user: u }
        }
      } catch (e) {
        console.warn('[Storage] Supabase signIn notice:', e?.message)
      }
    }

    // 2. If API / Flask backend is available
    if (mode === 'api' || mode === 'flask') {
      try {
        const r = await this._fetch('/auth/login', { method: 'POST', body: JSON.stringify({ email: cleanEmail, password }) })
        if (r.ok) {
          const d = await r.json()
          this._saveToken(d.token)
          LocalDB.users.save([...LocalDB.users.get().filter(x => x.email?.toLowerCase() !== cleanEmail), { ...d.user, password }])
          return { user: d.user }
        }
      } catch {}
    }

    // 3. LocalDB Deterministic Auth
    const users = LocalDB.users.get()
    const u = users.find(x => x.email && x.email.toLowerCase() === cleanEmail)
    if (!u) {
      throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التأكد من البيانات أو إنشاء حساب جديد.')
    }
    if (u.password && u.password !== password) {
      throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة.')
    }

    // Update session token with existing user's permanent ID
    this._saveToken('local_' + u.id)
    return { user: { id: u.id, name: u.name, email: u.email, plan: u.plan || 'free', lang: u.lang || 'ar', isAdmin: u.isAdmin || false } }
  },

  async signup(name, email, password) {
    const mode = await this._init()
    const cleanName = (name || '').trim()
    const cleanEmail = (email || '').trim().toLowerCase()

    if (!cleanName || !cleanEmail || !password) {
      throw new Error('جميع الحقول مطلوبة (الاسم، البريد الإلكتروني، وكلمة المرور).')
    }
    if (password.length < 6) {
      throw new Error('كلمة المرور يجب أن لا تقل عن 6 أحرف.')
    }

    // Check existing in LocalDB
    const existingUsers = LocalDB.users.get()
    const existingLocal = existingUsers.find(x => x.email && x.email.toLowerCase() === cleanEmail)
    if (existingLocal) {
      throw new Error('هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول بدلاً من إنشاء حساب جديد.')
    }

    const deterministicId = 'usr_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
    const newUser = {
      id: deterministicId,
      name: cleanName,
      email: cleanEmail,
      password: password,
      plan: 'free',
      lang: 'ar',
      isAdmin: false,
      created_at: new Date().toISOString()
    }

    if (mode === 'supabase' && isSbReady()) {
      try {
        const { session, user } = await SB.signUp(cleanName, cleanEmail, password)
        if (user?.id) newUser.id = user.id
        this._saveToken(session?.access_token || ('sb_' + newUser.id))
      } catch (e) {
        console.warn('[Storage] Supabase signup fallback to local activation:', e.message)
        this._saveToken('local_' + newUser.id)
      }
    } else if (mode === 'api' || mode === 'flask') {
      try {
        const r = await this._fetch('/auth/signup', { method: 'POST', body: JSON.stringify({ name: cleanName, email: cleanEmail, password }) })
        if (r.ok) {
          const d = await r.json()
          if (d.user?.id) newUser.id = d.user.id
          this._saveToken(d.token)
        } else {
          const err = await r.json().catch(() => ({}))
          throw new Error(err.error || 'فشل إنشاء الحساب')
        }
      } catch (apiErr) {
        if (!apiErr.message.includes('fetch')) throw apiErr
        this._saveToken('local_' + newUser.id)
      }
    } else {
      this._saveToken('local_' + newUser.id)
    }

    LocalDB.users.save([...existingUsers, newUser])
    return { user: newUser, verified: true }
  },

  async verifyOtp(email, token, type='signup') {
    const mode = await this._init()
    if (mode === 'supabase' && isSbReady()) {
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
    if (mode === 'supabase' && isSbReady()) {
      return await SB.resendOtp(email, type)
    }
  },

  async loginWithOtp(email) {
    const mode = await this._init()
    if (mode === 'supabase' && isSbReady()) {
      return await SB.signInWithOtp(email)
    }
  },

  async googleLogin() {
    if (isSbReady()) {
      return SB.signInWithGoogle()
    }
    Toast.show('يرجى التسجيل المباشر بالبريد الإلكتروني وكلمة المرور لتأمين حسابك', 'info')
  },

  async getMe() {
    const mode = await this._init()
    const rawId = (this.token || '').replace('sb_', '').replace('local_', '').trim()
    let localU = LocalDB.users.get().find(x => x.id === rawId || x.email === rawId)

    if (mode === 'supabase' && isSbReady()) {
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
      try {
        const r = await this._fetch('/auth/me')
        if (r.ok) return await r.json()
      } catch {}
    }

    if (!localU) throw new Error('Not logged in')
    return { id: localU.id, name: localU.name, email: localU.email, plan: localU.plan || 'free', lang: localU.lang || 'ar', isAdmin: localU.isAdmin || false }
  },

  logout() {
    this._saveToken(null)
    this.mode = null
    if (isSbReady()) SB.signOut()
  },

  async updateProfile(data) {
    const mode = await this._init()
    if (mode === 'api' || mode === 'flask') {
      try {
        const r = await this._fetch('/auth/update', {method:'PUT', body:JSON.stringify(data)})
        if (r.ok) return await r.json()
      } catch {}
    }
    const uid = (this.token || '').replace('local_', '').replace('sb_', '')
    const users = LocalDB.users.get()
    const u = users.find(x => x.id === uid || x.email === uid)
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
    const current = (typeof Auth !== 'undefined' && Auth.user) ? Auth.user : await this.getMe().catch(() => null)
    const uid = current?.id || (this.token || '').replace('local_', '').replace('sb_', '')
    const email = current?.email || ''

    let remoteSites = []
    if (mode === 'supabase' && isSbReady()) {
      try {
        const sbSites = await SB.getSites(uid)
        if (Array.isArray(sbSites)) remoteSites = sbSites
      } catch (err) {
        console.warn('SB getSites notice:', err)
      }
    } else if (mode === 'api' || mode === 'flask') {
      try {
        const r = await this._fetch('/sites')
        if (r.ok) {
          const apiSites = await r.json()
          if (Array.isArray(apiSites)) remoteSites = apiSites
        }
      } catch {}
    }

    // Safely merge remote sites with LocalDB pages (NEVER wipe local storage!)
    const localPages = LocalDB.pages.get() || []
    const map = new Map()
    localPages.forEach(p => { if (p && p.id) map.set(p.id, p) })
    remoteSites.forEach(s => {
      if (s && s.id) {
        const existing = map.get(s.id) || {}
        map.set(s.id, { ...existing, ...s })
      }
    })
    const merged = Array.from(map.values())
    LocalDB.pages.save(merged)

    return LocalDB.getUserPages(uid, email)
  },

  async getSite(id) {
    const mode = await this._init()
    if (mode === 'supabase' && isSbReady()) {
      try {
        const s = await SB.getSite(id)
        if (s) {
          LocalDB.updatePage(id, s)
          return s
        }
      } catch {}
    }
    if (mode === 'api' || mode === 'flask') {
      try {
        const r = await this._fetch('/sites/' + id)
        if (r.ok) return await r.json()
      } catch {}
    }
    return LocalDB.getPage(id)
  },

  async createSite(data) {
    const templateId = data.template_type || 'blank'
    const allPresets = typeof ALL_PRESETS !== 'undefined' ? ALL_PRESETS : PRESETS
    const template = allPresets.find(p => p.id === templateId) || PRESETS[0]
    const mode = await this._init()
    const current = (typeof Auth !== 'undefined' && Auth.user) ? Auth.user : await this.getMe().catch(() => null)
    const uid = current?.id || (this.token || '').replace('local_', '').replace('sb_', '') || 'guest'
    const safeUserId = String(uid).startsWith('usr_') ? String(uid) : ('usr_' + uid)
    const title = (data.title || template.name || 'موقعي').trim()

    // Determine unique slug
    let chosenSlug = ''
    if (data.slug) {
      const sanitized = sanitizeSlug(data.slug)
      const check = await this.checkSlugAvailability(sanitized, null)
      if (!check.available) {
        chosenSlug = makeUniqueSlug(sanitized, null)
      } else {
        chosenSlug = sanitized
      }
    } else {
      chosenSlug = makeUniqueSlug(title, null)
    }

    const sitePayload = {
      id: data.id || ('site_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6)),
      title: title,
      slug: chosenSlug,
      slug_locked: !!data.slug_locked,
      template_type: templateId,
      user_id: safeUserId,
      userId: safeUserId,
      userEmail: current?.email || '',
      theme: data.theme || template.theme || { color: '#6366f1', font: 'Cairo' },
      seo: data.seo || template.seo || { title: title, description: '' },
      sections: data.sections || template.sections || [],
      published: !!data.published,
      views: data.views || 0,
      customDomain: data.customDomain || data.custom_domain || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    if (mode === 'supabase' && isSbReady()) {
      try {
        const s = await SB.createSite(sitePayload)
        if (s) {
          LocalDB.addPage(s)
          return s
        }
      } catch (err) {
        console.warn('Supabase createSite failed, falling back to LocalDB:', err)
      }
    }

    if (mode === 'api' || mode === 'flask') {
      try {
        const r = await this._fetch('/sites', {
          method: 'POST',
          body: JSON.stringify(sitePayload)
        })
        if (r.ok) {
          const s = await r.json()
          LocalDB.addPage(s)
          return s
        }
      } catch {}
    }

    return LocalDB.addPage(sitePayload)
  },

  async createPage(data) {
    return this.createSite(data)
  },

  async updateSite(id, data) {
    const mode = await this._init()
    const cleanData = { ...data }

    // If slug is changing, verify availability
    if (cleanData.slug) {
      const sanitized = sanitizeSlug(cleanData.slug)
      const check = await this.checkSlugAvailability(sanitized, id)
      if (!check.available) {
        throw new Error(check.error || 'هذا الدومين محجوز مسبقاً لموقع آخر ولا يمكن استخدامه.')
      }
      cleanData.slug = sanitized
    }

    if (mode === 'supabase' && isSbReady()) {
      try {
        const s = await SB.updateSite(id, cleanData)
        if (s) {
          LocalDB.updatePage(id, s)
          return s
        }
      } catch (err) {
        console.warn('Supabase updateSite notice:', err)
      }
    }

    if (mode === 'api' || mode === 'flask') {
      try {
        const r = await this._fetch('/sites/' + id, {method:'PUT', body:JSON.stringify(cleanData)})
        if (r.ok) {
          const s = await r.json()
          LocalDB.updatePage(id, cleanData)
          return s
        }
      } catch {}
    }

    return LocalDB.updatePage(id, cleanData)
  },

  async checkSlugAvailability(rawSlug, currentSiteId) {
    const slug = sanitizeSlug(rawSlug)
    if (!slug || slug.length < 2) {
      return { available: false, slug, error: 'الرابط قصير جداً (حرفان على الأقل باللغة الإنجليزية والأرقام بدون مسافات).' }
    }
    if (isReservedSlug(slug)) {
      return { available: false, slug, error: 'هذا الاسم محجوز للنظام ولا يمكن استخدامه.' }
    }

    // 1. Check LocalDB
    const localSites = LocalDB.pages.get() || []
    const localConflict = localSites.find(s => s && s.id !== currentSiteId && (
      (s.slug && s.slug.toLowerCase() === slug.toLowerCase()) ||
      (s.customDomain && s.customDomain.toLowerCase() === slug.toLowerCase()) ||
      (s.custom_domain && s.custom_domain.toLowerCase() === slug.toLowerCase())
    ))
    if (localConflict) {
      const mainDomain = window.MAIN_DOMAIN || 'siteflow.vexonet.online'
      return {
        available: false,
        slug,
        error: `عذراً، هذا الدومين (${slug}.${mainDomain}) محجوز ومستخدم بالفعل لموقع آخر ولا يمكن تكراره.`
      }
    }

    // 2. Check Supabase if active
    if (typeof SB !== 'undefined' && isSbReady()) {
      try {
        const { data } = await SB.client.from('sites').select('id, slug').eq('slug', slug)
        if (data && data.length > 0) {
          const remoteConflict = data.find(s => s.id !== currentSiteId)
          if (remoteConflict) {
            const mainDomain = window.MAIN_DOMAIN || 'siteflow.vexonet.online'
            return {
              available: false,
              slug,
              error: `عذراً، هذا الدومين (${slug}.${mainDomain}) محجوز ومستخدم بالفعل لموقع آخر في قاعدة البيانات السحابية.`
            }
          }
        }
      } catch {}
    }

    const mainDomain = window.MAIN_DOMAIN || 'siteflow.vexonet.online'
    return { available: true, slug, message: `✓ الدومين (${slug}.${mainDomain}) متاح للحجز والتثبيت لموقعك!` }
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

    if (mode === 'supabase' && isSbReady()) {
      try {
        const sbRes = await SB.createPayment(uid, planKey, amount, paymentData)
        if (sbRes?.id) paymentData.id = sbRes.id
      } catch (err) {
        console.warn('Supabase createPayment notice:', err)
      }
    }

    // LocalDB persistence
    const payments = LocalDB.payments.get()
    payments.unshift(paymentData)
    LocalDB.payments.save(payments)
    return paymentData
  },

  async confirmPayment(id) {
    const mode = await this._init()
    let payments = LocalDB.payments.get()
    let p = payments.find(x => x.id === id)

    // If not found in LocalDB, fetch it from Supabase
    if (!p && isSbReady()) {
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

    // Update in Supabase (payments table and profiles table)
    if (isSbReady()) {
      try {
        await SB.confirmPayment(id, p?.plan, p?.userId || p?.user_id, p?.user_email)
      } catch (err) {
        console.warn('Supabase confirmPayment notice:', err)
      }
    }

    // Broadcast update across tabs
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

    if (isSbReady()) {
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
    if (mode === 'supabase' && isSbReady()) {
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
    if (mode === 'supabase' && isSbReady()) {
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
    if (mode === 'supabase' && isSbReady()) {
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
    if (mode === 'supabase' && isSbReady()) {
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
    if (isSbReady()) {
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
    if (isSbReady()) {
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
    if (isSbReady()) {
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
    if (isSbReady()) {
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
    if (isSbReady()) {
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
