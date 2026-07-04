/** Site Flow — Main Application */

const Toast = {
  show(msg, type='info') {
    let c = document.querySelector('.toast-container')
    if (!c) { c = document.createElement('div'); c.className='toast-container'; document.body.appendChild(c) }
    const t = document.createElement('div'); t.className='toast '+type; t.innerHTML=msg; c.appendChild(t)
    setTimeout(() => { t.style.opacity='0'; t.style.transform='translateX(100px)'; setTimeout(()=>t.remove(),300) }, 3500)
  }
}

const Router = {
  init() { window.addEventListener('hashchange',()=>this.handle()); this.handle() },
  navigate(path) { window.location.hash = '#/'+path },

  handle() {
    const hash = window.location.hash.slice(1) || '/'
    const pts = hash.split('/').filter(Boolean); const r = pts[0]||''
    if (r==='login') { if(Auth.isLoggedIn()){this.navigate('dashboard');return}; this._render('login') }
    else if (r==='dashboard') { if(!Auth.requireAuth())return; Dash.render() }
    else if (r==='builder'&&pts[1]) { Builder.load(pts[1]) }
    else if (r==='preview'&&pts[1]) { this._preview(pts[1]) }
    else if (r==='p'&&pts[1]) { this._public(pts[1]) }
    else if (r==='plans') { this._plans() }
    else if (r==='billing') { if(!Auth.requireAuth())return; this._billing() }
    else if (r==='settings') { if(!Auth.requireAuth())return; this._settings() }
    else if (r==='help') { this._help() }
    else if (r==='about') { this._about() }
    else if (r==='privacy') { this._privacy() }
    else if (r==='checkout'&&pts[1]) { if(!Auth.requireAuth())return; this._checkoutRoute(pts[1]) }
    else { this._render('landing') }
  },

  _render(page) {
    document.getElementById('app').innerHTML = T[page] ? T[page]() : T.landing()
    if (page==='login') this._bindAuth()
  },

  async _preview(id) {
    try {
      const s = await API.getSite(id)
      document.getElementById('app').innerHTML =
        `<div class="preview-bar"><span>Preview: ${s.title}</span><div class="actions"><a href="${subdomainUrl(s.slug)}" target="_blank" class="btn btn-outline btn-sm">Open Live</a><button class="btn btn-outline btn-sm" onclick="window.close()">Close</button><a href="#/builder/${s.id}" class="btn btn-primary btn-sm">Back to Editor</a></div></div><div style="margin-top:60px">${T.publicPage(s)}</div>`
    } catch(e) { Toast.show(e.message,'error'); this.navigate('dashboard') }
  },

  async _public(slug) {
    // Redirect to subdomain URL for published sites
    try {
      const s = await API.getPublicPage(slug)
      if (!s) throw new Error('404')
      if (s.published) {
        window.location.href = subdomainUrl(s.slug)
        return
      }
      document.title = s.seo?.title||s.title
      document.getElementById('app').innerHTML = T.publicPage(s)
      const m = document.querySelector('meta[name="description"]')
      if (m) m.content = s.seo?.description||''
    } catch(e) {
      document.getElementById('app').innerHTML = T.notFound('Not Published', 'This site has not been published yet.')
    }
  },

  async _plans() {
    const app = document.getElementById('app')
    try {
      const plans = await API.getPlans()
      if (!plans) throw new Error('No plans')
      app.innerHTML = T.plans(plans)
      document.querySelectorAll('.plan-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (!Auth.requireAuth()) return
          this._checkout(btn.dataset.plan, plans[btn.dataset.plan])
        })
      })
    } catch {
      // Fallback: show hardcoded plans
      app.innerHTML = T.plans({free:{name:'Free',price:0,max_sites:1,custom_domain:false,analytics:false,premium_themes:false,priority_support:false},pro:{name:'Pro',price:9,max_sites:10,custom_domain:true,analytics:true,premium_themes:true,priority_support:false},business:{name:'Business',price:29,max_sites:-1,custom_domain:true,analytics:true,premium_themes:true,priority_support:true}})
      document.querySelectorAll('.plan-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (!Auth.requireAuth()) return
          const plans = {free:{name:'Free',price:0},pro:{name:'Pro',price:9},business:{name:'Business',price:29}}
          this._checkout(btn.dataset.plan, plans[btn.dataset.plan])
        })
      })
    }
  },

  async _checkout(planKey, plan) {
    if (plan.price === 0) {
      try { await API.createPayment(planKey); await API.confirmPayment(planKey); Auth.user = await API.getMe(); Toast.show('Switched to Free plan!','success'); Router.navigate('dashboard') }
      catch(e) { Toast.show(e.message,'error') }
      return
    }
    document.getElementById('app').innerHTML = T.checkout(plan)
    document.getElementById('confirmPaymentBtn').addEventListener('click', async () => {
      try { await API.createPayment(planKey); await API.confirmPayment(planKey); Auth.user = await API.getMe(); Toast.show(`Upgraded to ${plan.name}!`,'success'); Router.navigate('dashboard') }
      catch(e) { Toast.show(e.message,'error') }
    })
  },

  async _billing() {
    try {
      const [payments, plans] = await Promise.all([API.getPayments(), API.getPlans()])
      document.getElementById('app').innerHTML = T.billing(payments||[], plans||{}, Auth.user)
    } catch {
      document.getElementById('app').innerHTML = T.billing([], {free:{name:'Free',price:0},pro:{name:'Pro',price:9},business:{name:'Business',price:29}}, Auth.user)
    }
  },

  async _settings() {
    document.getElementById('app').innerHTML = T.settings(Auth.user)
    document.getElementById('saveSettingsBtn')?.addEventListener('click', async () => {
      try {
        await API.updateProfile({
          name: document.getElementById('settingsName').value,
          lang: document.getElementById('settingsLang').value,
          password: document.getElementById('settingsPassword').value
        })
        Auth.setLang(document.getElementById('settingsLang').value)
        Auth.user = await API.getMe()
        Auth._ui()
        Toast.show('Settings saved!','success'); Router.navigate('dashboard')
      } catch(e) { Toast.show(e.message,'error') }
    })
  },

  _help() { document.getElementById('app').innerHTML = T.help() },
  _about() { document.getElementById('app').innerHTML = T.about() },
  _privacy() { document.getElementById('app').innerHTML = T.privacy() },

  async _checkoutRoute(planKey) {
    const plans = {free:{name:'Free',price:0},pro:{name:'Pro',price:9},business:{name:'Business',price:29}}
    try { const p = await API.getPlans(); Object.assign(plans, p) } catch {}
    const plan = plans[planKey]
    if (!plan) { Toast.show('Invalid plan','error'); Router.navigate('plans'); return }
    if (plan.price === 0) {
      try { await API.createPayment(planKey); await API.confirmPayment(planKey); Auth.user = await API.getMe(); Toast.show('Switched to Free plan!','success'); Router.navigate('dashboard') }
      catch(e) { Toast.show(e.message,'error') }
      return
    }
    document.getElementById('app').innerHTML = T.checkout(plan)
    document.getElementById('confirmPaymentBtn')?.addEventListener('click', async () => {
      try { await API.createPayment(planKey); await API.confirmPayment(planKey); Auth.user = await API.getMe(); Toast.show(`Upgraded to ${plan.name}!`,'success'); Router.navigate('dashboard') }
      catch(e) { Toast.show(e.message,'error') }
    })
  },

  _bindAuth() {
    const tabs = document.querySelectorAll('.auth-tab')
    const lf=document.getElementById('loginForm'), sf=document.getElementById('signupForm'), err=document.getElementById('authError')
    document.getElementById('googleBtn')?.addEventListener('click', () => Auth.googleLogin())
    tabs.forEach(t => t.addEventListener('click',()=>{tabs.forEach(x=>x.classList.remove('active'));t.classList.add('active');lf.classList.toggle('hidden',t.dataset.tab!=='login');sf.classList.toggle('hidden',t.dataset.tab!=='signup');if(err)err.style.display='none'}))
    lf?.addEventListener('submit', async e => {
      e.preventDefault()
      try { await Auth.login(document.getElementById('loginEmail').value, document.getElementById('loginPassword').value); Router.navigate('dashboard') }
      catch(e) { if(err){err.textContent=e.message;err.style.display='block'} }
    })
    sf?.addEventListener('submit', async e => {
      e.preventDefault()
      try { await Auth.signup(document.getElementById('signupName').value, document.getElementById('signupEmail').value, document.getElementById('signupPassword').value); Router.navigate('dashboard') }
      catch(e) { if(err){err.textContent=e.message;err.style.display='block'} }
    })
  }
}

const Dash = {
  async render() {
    const app = document.getElementById('app')
    app.innerHTML = T.dashboard()
    try {
      const sites = await API.getSites() || []
      const statsEl = document.getElementById('dashStats')
      const container = document.getElementById('sitesContainer')
      const published = sites.filter(s=>s.published).length
      const totalViews = sites.reduce((s,p)=>s+(p.views||0),0)
      statsEl.innerHTML = `<div class="stats-row"><div class="stat-card card"><div class="num">${sites.length}</div><div class="label">Total Sites</div></div><div class="stat-card card"><div class="num">${published}</div><div class="label">Published</div></div><div class="stat-card card"><div class="num">${totalViews}</div><div class="label">Views</div></div><div class="stat-card card"><div class="num">${sites.filter(s=>!s.published).length}</div><div class="label">Drafts</div></div></div>`

      if (sites.length === 0) {
        container.innerHTML = `<div class="empty-state"><div class="icon-wrap">🌐</div><h2>No sites yet</h2><p>Create your first website and publish it to the world.</p><button class="btn btn-primary btn-lg" id="emptyCreateBtn">Create Your First Site</button></div>`
        document.getElementById('emptyCreateBtn')?.addEventListener('click',()=>Builder.createNew())
        return
      }
      container.innerHTML = `<div class="sites-grid">${sites.map(p=>{
        const tc = p.theme?.color || '#6366f1'
        const siteUrl = subdomainUrl(p.slug)
        return `<div class="site-card card card-hover">
          <div class="site-card-preview" style="background:linear-gradient(135deg,${tc}88,${tc}44)"><span class="initial">${(p.title||'S').charAt(0).toUpperCase()}</span><span class="view-badge">👁 ${p.views||0}</span></div>
          <h3>${p.title}</h3>
          <span class="site-url">${siteUrl}</span>
          <div class="site-meta"><span>${p.published?'✅ Published':'📝 Draft'}</span><span>${new Date(p.createdAt||p.created_at||p.updatedAt).toLocaleDateString()}</span></div>
          <div class="site-card-actions">
            <a href="#/builder/${p.id}" class="btn btn-primary btn-sm">Edit</a>
            ${p.published?`<a href="${siteUrl}" target="_blank" class="btn btn-outline btn-sm">View</a>`:''}
            <button class="btn btn-ghost btn-sm" onclick="Dash.remove('${p.id}')">Delete</button>
          </div>
        </div>`
      }).join('')}</div>`
      document.getElementById('createSiteBtn')?.addEventListener('click',()=>Builder.createNew())
      document.getElementById('upgradeBtn')?.addEventListener('click',()=>Router.navigate('plans'))
    } catch(e) { Toast.show(e.message,'error') }
  },

  async remove(id) {
    if (!confirm('Delete this site forever?')) return
    try { await API.deleteSite(id); Toast.show('Deleted','info'); Dash.render() }
    catch(e) { Toast.show(e.message,'error') }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const app = document.getElementById('app')
  if (app) app.innerHTML = T.loading()
  await Auth.init()
  Router.init()
})
