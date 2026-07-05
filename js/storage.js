/**
 * Site Flow — Data Layer
 * Primary: Supabase | Fallback: LocalStorage
 */
const IS_LOCAL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
const API_BASE = IS_LOCAL ? 'http://localhost:5000/api' : '/api'
const BACKEND_URL = IS_LOCAL ? 'http://localhost:5000' : ''
const MAIN_DOMAIN = 'siteflow.vexonet.online'
function subdomainUrl(slug) { return `${window.location.protocol}//${slug}.${MAIN_DOMAIN}` }
function getDaysLeft() { return 999 }
function isExpired() { return false }

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
  getPageBySlug(slug) { return this.pages.get().find(p => p.slug === slug && p.published) || null },
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

// ── API Client (mode: Flask Backend → Supabase → LocalStorage) ──
const API = {
  token: localStorage.getItem('sf_token') || '',
  mode: null, // null | 'flask' | 'supabase' | 'local'
  _saveToken(t) { this.token=t||''; if(t) localStorage.setItem('sf_token',t); else localStorage.removeItem('sf_token') },

  // Try backends in order: Flask → Supabase → LocalStorage
  async _init() {
    if (this.mode) return this.mode
    // In production, skip backend attempts — use LocalStorage directly
    if (!IS_LOCAL) { this.mode = 'local'; return 'local' }
    // Try Flask backend
    try {
      const r = await fetch(API_BASE + '/health', { signal: AbortSignal.timeout(2000) })
      if (r.ok) { this.mode = 'flask'; return 'flask' }
    } catch {}
    // Try Supabase (only on localhost)
    try {
      await SB.init()
      if (SB.isReady()) { this.mode = 'supabase'; return 'supabase' }
    } catch {}
    this.mode = 'local'; return 'local'
  },

  async _fetch(path, opts={}) {
    if (this.mode === 'local') return { ok: false, status: 404, json: async () => ({}) }
    const headers = {'Content-Type': 'application/json'}
    if (this.token) headers['Authorization'] = 'Bearer ' + this.token
    try {
      const r = await fetch(API_BASE + path, {...opts, headers})
      if (r.status === 401) { this._saveToken(null); this.mode = null }
      return r
    } catch {
      return { ok: false, status: 503, json: async () => ({}) }
    }
  },

  // ── Auth (Supabase first, then Flask, then localStorage) ──
  async login(email, password) {
    const mode = await this._init()
    // Supabase auth (only if Supabase is the detected mode)
    if (mode === 'supabase') {
      try {
        await SB.init()
        if (SB.isReady()) {
          const d = await SB.signIn(email, password)
          this._saveToken(d.session.access_token)
          this.mode = 'supabase'
          return {user:{id:d.user.id,name:d.user.email,email:d.user.email,plan:'free',lang:'en',isAdmin:false}}
        }
      } catch(e) {}
    }
    // Flask fallback
    if (mode === 'flask') {
      const r = await this._fetch('/auth/login', {method:'POST', body:JSON.stringify({email,password})})
      if (r.ok) { const d = await r.json(); this._saveToken(d.token); return {user: d.user} }
    }
    // localStorage fallback
    const users=LocalDB.users.get(); const u=users.find(x=>x.email===email&&x.password===password)
    if (!u) throw new Error('Invalid email or password')
    this._saveToken('local_'+u.id); this.mode = 'local'
    return {user:{id:u.id,name:u.name,email:u.email,plan:u.plan,lang:u.lang,isAdmin:u.isAdmin||false}}
  },

  async signup(name, email, password) {
    const mode = await this._init()
    // Supabase signup (only if Supabase is the detected mode)
    if (mode === 'supabase') {
      try {
        await SB.init()
        if (SB.isReady()) {
          const d = await SB.signUp(email, password)
          this.mode = 'supabase'
          if (d.session?.access_token) this._saveToken(d.session.access_token)
          return {user:{id:d.user.id,name,email,plan:'free',lang:'en',isAdmin:false}}
        }
      } catch(e) { if (e.message.includes('already')) throw new Error('Email already registered') }
    }
    // Flask fallback
    if (mode === 'flask') {
      const r = await this._fetch('/auth/signup', {method:'POST', body:JSON.stringify({name,email,password})})
      if (r.ok) { const d = await r.json(); this._saveToken(d.token); return {user: d.user} }
      if (r.status === 409) throw new Error('Email already registered')
    }
    // localStorage fallback
    const users=LocalDB.users.get()
    if (users.find(x=>x.email===email)) throw new Error('Email already registered')
    const u={id:LocalDB.genId(),name,email,password,plan:'free',lang:'en',isAdmin:false}
    LocalDB.users.save([...users,u]); this._saveToken('local_'+u.id); this.mode = 'local'
    return {user:{id:u.id,name:u.name,email:u.email,plan:'free',lang:'en',isAdmin:false}}
  },

  async googleLogin() {
    const mode = await this._init()
    if (mode === 'supabase') {
      try {
        await SB.init()
        if (SB.isReady()) {
          await SB.signInWithGoogle()
          return true
        }
      } catch {}
    }
    return this.login('demo@siteflow.app', 'demo123')
  },

  async getMe() {
    const mode = await this._init()
    // If local mode, skip network calls entirely
    if (mode === 'local') {
      const uid=(this.token||'').replace('local_','')
      const u=LocalDB.users.get().find(x=>x.id===uid)
      if (!u) throw new Error('Not logged in')
      return {id:u.id,name:u.name,email:u.email,plan:u.plan,lang:u.lang,isAdmin:u.isAdmin||false}
    }
    // Supabase session first
    try {
      await SB.init()
      if (SB.isReady()) {
        const s = SB.getSession()
        if (s?.data?.session) {
          const uid = s.data.session.user.id
          this.mode = 'supabase'
          return {id:uid,name:s.data.session.user.email,email:s.data.session.user.email,plan:'free',lang:'en',isAdmin:false}
        }
      }
    } catch {}
    // Flask fallback
    if (mode === 'flask') {
      const r = await this._fetch('/auth/me')
      if (r.ok) return (await r.json())
    }
    // localStorage fallback
    const uid=(this.token||'').replace('local_','')
    const u=LocalDB.users.get().find(x=>x.id===uid)
    if (!u) throw new Error('Not logged in')
    return {id:u.id,name:u.name,email:u.email,plan:u.plan,lang:u.lang,isAdmin:u.isAdmin||false}
  },

  logout() {
    this._saveToken(null); this.mode = null
    if (SB.isReady()) SB.signOut()
  },

  async updateProfile(data) {
    const mode = await this._init()
    if (mode === 'flask') {
      const r = await this._fetch('/auth/update', {method:'PUT', body:JSON.stringify(data)})
      if (r.ok) return (await r.json())
    }
    if (mode === 'supabase') { return {name:data.name,email:'',plan:'free',lang:data.lang||'en'} }
    const uid=(this.token||'').replace('local_',''); const users=LocalDB.users.get(); const u=users.find(x=>x.id===uid)
    if (!u) throw new Error('Not found')
    if(data.name)u.name=data.name; if(data.password)u.password=data.password; u.lang=data.lang||u.lang
    LocalDB.users.save(users); return {id:u.id,name:u.name,email:u.email,plan:u.plan,lang:u.lang}
  },

  // ── Sites ──
  async getSites() {
    const mode = await this._init()
    if (mode === 'flask') {
      const r = await this._fetch('/sites')
      if (r.ok) return (await r.json())
    }
    if (mode === 'supabase') {
      try { const uid=SB.getSession()?.data?.session?.user?.id; if(uid) return await SB.getSites(uid) } catch {}
    }
    const uid=(this.token||'').replace('local_',''); return LocalDB.getUserPages(uid)
  },

  async getSite(id) {
    const mode = await this._init()
    if (mode === 'flask') {
      const r = await this._fetch('/sites/'+id)
      if (r.ok) return (await r.json())
    }
    if (mode === 'supabase') { try { const s=await SB.getSite(id); if(s) return s } catch {} }
    return LocalDB.getPage(id)
  },

  async createSite(data) {
    const templateId = data.template_type || 'blank'
    const allPresets = typeof ALL_PRESETS !== 'undefined' ? ALL_PRESETS : PRESETS
    const template = allPresets.find(p => p.id === templateId) || PRESETS[0]
    const mode = await this._init()
    if (mode === 'flask') {
      const r = await this._fetch('/sites', {method:'POST', body:JSON.stringify({title: data.title, slug: data.slug, template_type: templateId})})
      if (r.ok) return (await r.json())
    }
    if (mode === 'supabase') {
      try { const uid=SB.getSession()?.data?.session?.user?.id; if(uid) return await SB.createSite({...data, user_id: uid, sections: template.sections, title: data.title || template.name}) } catch {}
    }
    const uid=(this.token||'').replace('local_','')
    const pageData = LocalDB.defaultPage(data.title || template.name, template)
    pageData.userId = uid
    return LocalDB.addPage(pageData)
  },

  async updateSite(id, data) {
    const mode = await this._init()
    if (mode === 'flask') {
      const r = await this._fetch('/sites/'+id, {method:'PUT', body:JSON.stringify(data)})
      if (r.ok) return (await r.json())
      // If 404, site exists locally but not in backend — import it
      if (r.status === 404) {
        const local = LocalDB.getPage ? LocalDB.getPage(id) : null
        if (local) {
          const importR = await this._fetch('/sites/import', {method:'POST', body:JSON.stringify({...local, ...data})})
          if (importR.ok) return (await importR.json())
        }
      }
    }
    if (mode === 'supabase') { try { return await SB.updateSite(id, data) } catch {} }
    return LocalDB.updatePage(id, data)
  },

  async deleteSite(id) {
    const mode = await this._init()
    if (mode === 'flask') { await this._fetch('/sites/'+id, {method:'DELETE'}); return }
    if (mode === 'supabase') { try { await SB.deleteSite(id); return } catch {} }
    LocalDB.deletePage(id)
  },

  async publishSite(id) {
    const mode = await this._init()
    if (mode === 'flask') {
      const r = await this._fetch('/sites/'+id+'/publish', {method:'POST'})
      if (r.ok) return (await r.json())
    }
    if (mode === 'supabase') { try { return await SB.publishSite(id) } catch {} }
    return LocalDB.updatePage(id, {published:true})
  },

  async getPublicPage(slug) {
    const mode = await this._init()
    if (mode === 'flask') {
      const r = await this._fetch('/p/'+slug)
      if (r.ok) return (await r.json())
    }
    if (mode === 'supabase') { try { const s=await SB.getPublicPage(slug); if(s) return s } catch {} }
    return LocalDB.getPageBySlug(slug)
  },

  async getPlans() { return {free:{name:'Free',price:0,max_sites:1,custom_domain:false,analytics:false,premium_themes:false,priority_support:false},pro:{name:'Pro',price:9,max_sites:10,custom_domain:true,analytics:true,premium_themes:true,priority_support:false},business:{name:'Business',price:29,max_sites:-1,custom_domain:true,analytics:true,premium_themes:true,priority_support:true}} },

  async createPayment(planKey) {
    const mode = await this._init()
    if (mode === 'flask') {
      const r = await this._fetch('/payments/create', {method:'POST', body:JSON.stringify({plan:planKey})})
      if (r.ok) return (await r.json())
    }
    if (mode === 'supabase') { try { const uid=SB.getSession()?.data?.session?.user?.id; if(uid) return await SB.createPayment(uid, planKey, planKey==='pro'?9:29) } catch {} }
    return {payment_id:'local_'+LocalDB.genId(),plan:planKey}
  },

  async confirmPayment(id) {
    const mode = await this._init()
    if (mode === 'flask') {
      const r = await this._fetch('/payments/confirm/'+id, {method:'POST'})
      if (r.ok) { const d=await r.json(); return d }
    }
    if (mode === 'supabase') { try { await SB.confirmPayment(id); return } catch {} }
    // local mode — upgrade user plan
    const uid=(this.token||'').replace('local_',''); const users=LocalDB.users.get(); const u=users.find(x=>x.id===uid)
    if (u) { u.plan='pro'; LocalDB.users.save(users) }
    return {ok: true}
  },

  async getPayments() {
    const mode = await this._init()
    if (mode === 'flask') {
      const r = await this._fetch('/payments')
      if (r.ok) return (await r.json())
    }
    if (mode === 'supabase') { try { const r = await SB.client.from('payments').select('*').order('created_at',{ascending:false}); if(r.data) return r.data } catch {} }
    return []
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
        const r = await fetch(API_BASE + '/upload', {
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
