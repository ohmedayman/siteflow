/**
 * Site Flow — Data Layer
 * Primary: Supabase | Fallback: LocalStorage
 */
const API_BASE = 'https://siteflow.vexonet.online/api'
const MAIN_DOMAIN = (typeof SITE_DOMAIN !== 'undefined' ? SITE_DOMAIN : 'siteflow.vexonet.online')
function subdomainUrl(slug) { return `https://${slug}.${MAIN_DOMAIN}` }
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
    const t = template || PRESETS.find(p => p.id === 'blank') || PRESETS[0]
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
}

// ── API Client (dual mode: Supabase → LocalStorage) ──
const API = {
  token: localStorage.getItem('sf_token') || '',
  _saveToken(t) { this.token=t; if(t) localStorage.setItem('sf_token',t); else localStorage.removeItem('sf_token') },

  async _ready() { await SB.init(); return SB.isReady() },

  // ── Auth ──
  async login(email, password) {
    if (await this._ready()) {
      try { const d=await SB.signIn(email,password); this._saveToken(d.session.access_token); return {user:{id:d.user.id,name:d.user.email,email:d.user.email,plan:'free',lang:'en',isAdmin:false}} } catch {}
    }
    // Fallback
    const users=LocalDB.users.get(); const u=users.find(x=>x.email===email&&x.password===password)
    if (!u) throw new Error('Invalid email or password')
    this._saveToken('local_'+u.id)
    return {user:{id:u.id,name:u.name,email:u.email,plan:u.plan,lang:u.lang,isAdmin:u.isAdmin||false}}
  },

  async signup(name, email, password) {
    if (await this._ready()) {
      try { const d=await SB.signUp(email,password); this._saveToken(d.session.access_token); return {user:{id:d.user.id,name,email,plan:'free',lang:'en',isAdmin:false}} } catch(e) { if(e.message.includes('already')) throw new Error('Email already registered') }
    }
    const users=LocalDB.users.get()
    if (users.find(x=>x.email===email)) throw new Error('Email already registered')
    const u={id:LocalDB.genId(),name,email,password,plan:'free',lang:'en',isAdmin:false}
    LocalDB.users.save([...users,u]); this._saveToken('local_'+u.id)
    return {user:{id:u.id,name:u.name,email:u.email,plan:'free',lang:'en',isAdmin:false}}
  },

  async googleLogin() {
    if (await this._ready()) {
      try { await SB.signInWithGoogle(); return true } catch { return false }
    }
    // Fallback: login with demo Google account
    return this.login('demo@siteflow.app', 'demo123')
  },

  async getMe() {
    if (await this._ready()) {
      try { const s=SB.getSession(); if(s?.data?.session){const uid=s.data.session.user.id; return {id:uid,name:s.data.session.user.email,email:s.data.session.user.email,plan:'free',lang:'en',isAdmin:false}} } catch {}
    }
    const uid=(this.token||'').replace('local_','')
    const u=LocalDB.users.get().find(x=>x.id===uid)
    if (!u) throw new Error('Not logged in')
    return {id:u.id,name:u.name,email:u.email,plan:u.plan,lang:u.lang,isAdmin:u.isAdmin||false}
  },

  logout() { this._saveToken(''); if(SB.isReady()) SB.signOut() },

  async updateProfile(data) {
    if (await this._ready()) { return {name:data.name,email:'',plan:'free',lang:data.lang||'en'} }
    const uid=(this.token||'').replace('local_',''); const users=LocalDB.users.get(); const u=users.find(x=>x.id===uid)
    if (!u) throw new Error('Not found')
    if(data.name)u.name=data.name; if(data.password)u.password=data.password; u.lang=data.lang||u.lang
    LocalDB.users.save(users); return {id:u.id,name:u.name,email:u.email,plan:u.plan,lang:u.lang}
  },

  // ── Sites ──
  async getSites() {
    if (await this._ready()) {
      try { const uid=SB.getSession()?.data?.session?.user?.id; if(uid) return await SB.getSites(uid) } catch {}
    }
    const uid=(this.token||'').replace('local_',''); return LocalDB.getUserPages(uid)
  },

  async getSite(id) {
    if (await this._ready()) { try { const s=await SB.getSite(id); if(s) return s } catch {} }
    return LocalDB.getPage(id)
  },

  async createSite(data) {
    const templateId = data.template_type || 'blank'
    const template = PRESETS.find(p => p.id === templateId) || PRESETS[0]

    if (await this._ready()) {
      try {
        const uid=SB.getSession()?.data?.session?.user?.id
        if (uid) return await SB.createSite({...data, user_id: uid, sections: template.sections, title: data.title || template.name})
      } catch {}
    }
    const uid=(this.token||'').replace('local_','')
    const pageData = LocalDB.defaultPage(data.title || template.name, template)
    pageData.userId = uid
    return LocalDB.addPage(pageData)
  },

  async updateSite(id, data) {
    if (await this._ready()) { try { return await SB.updateSite(id, data) } catch {} }
    return LocalDB.updatePage(id, data)
  },

  async deleteSite(id) {
    if (await this._ready()) { try { await SB.deleteSite(id); return } catch {} }
    LocalDB.deletePage(id)
  },

  async publishSite(id) {
    if (await this._ready()) { try { return await SB.publishSite(id) } catch {} }
    return LocalDB.updatePage(id, {published:true})
  },

  async getPublicPage(slug) {
    if (await this._ready()) { try { const s=await SB.getPublicPage(slug); if(s) return s } catch {} }
    return LocalDB.getPageBySlug(slug)
  },

  async getPlans() { return {free:{name:'Free',price:0,max_sites:1,custom_domain:false,analytics:false,premium_themes:false,priority_support:false},pro:{name:'Pro',price:9,max_sites:10,custom_domain:true,analytics:true,premium_themes:true,priority_support:false},business:{name:'Business',price:29,max_sites:-1,custom_domain:true,analytics:true,premium_themes:true,priority_support:true}} },

  async createPayment(planKey) {
    if (await this._ready()) {
      try { const uid=SB.getSession()?.data?.session?.user?.id; if(uid) return await SB.createPayment(uid, planKey, planKey==='pro'?9:29) } catch {}
    }
    return {payment_id:'local_'+LocalDB.genId(),plan:planKey}
  },

  async confirmPayment(id) {
    if (await this._ready()) { try { await SB.confirmPayment(id); return } catch {} }
    const uid=(this.token||'').replace('local_',''); const users=LocalDB.users.get(); const u=users.find(x=>x.id===uid)
    if (u) { u.plan='pro'; LocalDB.users.save(users) }
  },

  async getPayments() {
    if (await this._ready()) { try { return await SB.client.from('payments').select('*').order('created_at',{ascending:false}) } catch {} }
    return []
  }
}
