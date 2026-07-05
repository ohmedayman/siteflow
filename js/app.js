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
    else if (r==='submissions'&&pts[1]) { if(!Auth.requireAuth())return; this._submissions(pts[1]) }
    else if (r==='analytics'&&pts[1]) { if(!Auth.requireAuth())return; this._analytics(pts[1]) }
    else { this._render('landing') }
    window.scrollTo(0, 0)
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
    try {
      const s = await API.getPublicPage(slug)
      if (!s) throw new Error('404')
      if (s.published) { window.location.href = subdomainUrl(s.slug); return }
      document.title = s.seo?.title||s.title
      document.getElementById('app').innerHTML = T.publicPage(s)
      this._bindPublicContactForm(s.slug)
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
    } catch {
      app.innerHTML = T.plans({free:{name:'Free',price:0,max_sites:1,custom_domain:false,analytics:false,premium_themes:false,priority_support:false},pro:{name:'Pro',price:9,max_sites:10,custom_domain:true,analytics:true,premium_themes:true,priority_support:false},business:{name:'Business',price:29,max_sites:-1,custom_domain:true,analytics:true,premium_themes:true,priority_support:true}})
    }
    document.querySelectorAll('.plan-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!Auth.requireAuth()) return
        this._checkout(btn.dataset.plan)
      })
    })
  },

  async _checkout(planKey) {
    const plans = {free:{name:'Free',price:0},pro:{name:'Pro',price:9},business:{name:'Business',price:29}}
    try { const p = await API.getPlans(); if(p) Object.assign(plans, p) } catch {}
    const plan = plans[planKey]
    if (!plan || plan.price === 0) {
      try { await API.createPayment(planKey); await API.confirmPayment(planKey); Auth.user = await API.getMe(); Toast.show('Plan updated!','success'); Router.navigate('dashboard') }
      catch(e) { Toast.show(e.message,'error') }
      return
    }
    document.getElementById('app').innerHTML = T.checkout(plan)
    document.getElementById('confirmPaymentBtn')?.addEventListener('click', async () => {
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

  async _submissions(siteId) {
    try {
      const [site, subs] = await Promise.all([API.getSite(siteId), API.getSubmissions(siteId)])
      document.getElementById('app').innerHTML = T.submissions(site, subs||[])
      document.querySelectorAll('[data-read]').forEach(btn => {
        btn.addEventListener('click', async () => {
          await API.markSubmissionRead(siteId, btn.dataset.read)
          this._submissions(siteId)
        })
      })
      document.querySelectorAll('[data-del-sub]').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm('Delete this submission?')) return
          await API.deleteSubmission(siteId, btn.dataset.delSub)
          this._submissions(siteId)
        })
      })
    } catch(e) { Toast.show(e.message,'error'); this.navigate('dashboard') }
  },

  async _analytics(siteId) {
    try {
      const [site, analytics] = await Promise.all([API.getSite(siteId), API.getAnalytics(siteId)])
      document.getElementById('app').innerHTML = `
<div style="max-width:1000px;margin:0 auto;padding:40px 24px">
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
    <div>
      <h1 style="font-size:1.6rem">Analytics</h1>
      <p style="color:var(--gray-500);font-size:.9rem">Stats for ${site.title}</p>
    </div>
    <div style="display:flex;gap:8px">
      <a href="#/builder/${siteId}" class="btn btn-outline btn-sm">Edit</a>
      <button class="btn btn-ghost btn-sm" onclick="Router.navigate('dashboard')">← Back</button>
    </div>
  </div>
  <div class="stats-row">
    <div class="stat-card card"><div class="num">${analytics.totalViews||0}</div><div class="label">Total Views</div></div>
    <div class="stat-card card"><div class="num">${analytics.viewsLast30||0}</div><div class="label">Last 30 Days</div></div>
    <div class="stat-card card"><div class="num">${analytics.uniqueIPs||0}</div><div class="label">Unique Visitors</div></div>
    <div class="stat-card card"><div class="num">${analytics.submissionsCount||0}</div><div class="label">Submissions</div></div>
  </div>
  <div class="card" style="padding:24px;margin-bottom:20px">
    <h3 style="margin-bottom:16px">Views (Last 30 Days)</h3>
    <canvas id="viewsChart" height="250"></canvas>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
    <div class="card" style="padding:24px">
      <h3 style="margin-bottom:12px">Overview</h3>
      <div style="display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between"><span style="color:var(--gray-500)">Total Views</span><strong>${analytics.totalViews||0}</strong></div>
        <div style="display:flex;justify-content:space-between"><span style="color:var(--gray-500)">Unique Visitors</span><strong>${analytics.uniqueIPs||0}</strong></div>
        <div style="display:flex;justify-content:space-between"><span style="color:var(--gray-500)">Submissions</span><strong>${analytics.submissionsCount||0}</strong></div>
        <div style="display:flex;justify-content:space-between"><span style="color:var(--gray-500)">Unread</span><strong>${analytics.submissionsUnread||0}</strong></div>
      </div>
    </div>
    <div class="card" style="padding:24px">
      <h3 style="margin-bottom:12px">Quick Actions</h3>
      <div style="display:flex;flex-direction:column;gap:8px">
        <a href="#/builder/${siteId}" class="btn btn-primary btn-sm w-full">Edit Site</a>
        <a href="${subdomainUrl(site.slug)}" target="_blank" class="btn btn-outline btn-sm w-full">View Live</a>
        <a href="#/submissions/${siteId}" class="btn btn-outline btn-sm w-full">View Messages</a>
      </div>
    </div>
  </div>
</div>`
      const canvas = document.getElementById('viewsChart')
      if (canvas && typeof Chart !== 'undefined') {
        const viewsByDay = analytics.viewsByDay || []
        new Chart(canvas, {
          type: 'line', data: {
            labels: viewsByDay.map(d => d.date?.slice(5) || ''),
            datasets: [{ label: 'Views', data: viewsByDay.map(d => d.views || 0), borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,.1)', fill: true, tension: .4, pointRadius: 3 }]
          }, options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
        })
      }
    } catch(e) { Toast.show(e.message,'error'); this.navigate('dashboard') }
  },

  _help() { document.getElementById('app').innerHTML = T.help() },
  _about() { document.getElementById('app').innerHTML = T.about() },
  _privacy() { document.getElementById('app').innerHTML = T.privacy() },

  async _checkoutRoute(planKey) { this._checkout(planKey) },

  _bindAuth() {
    const tabs = document.querySelectorAll('.auth-tab')
    const lf=document.getElementById('loginForm'), sf=document.getElementById('signupForm'), err=document.getElementById('authError')
    document.getElementById('googleBtn')?.addEventListener('click', () => Auth.googleLogin())
    tabs.forEach(t => t.addEventListener('click',()=>{tabs.forEach(x=>x.classList.remove('active'));t.classList.add('active');lf.classList.toggle('hidden',t.dataset.tab!=='login');sf.classList.toggle('hidden',t.dataset.tab!=='signup');if(err)err.style.display='none'}))
    lf?.addEventListener('submit', async e => {
      e.preventDefault()
      const btn = lf.querySelector('button[type="submit"]'); btn.disabled=true; btn.textContent='Signing in...'
      try { await Auth.login(document.getElementById('loginEmail').value, document.getElementById('loginPassword').value); Router.navigate('dashboard') }
      catch(e) { if(err){err.textContent=e.message;err.style.display='block'} }
      finally { btn.disabled=false; btn.textContent='Sign In' }
    })
    sf?.addEventListener('submit', async e => {
      e.preventDefault()
      const btn = sf.querySelector('button[type="submit"]'); btn.disabled=true; btn.textContent='Creating account...'
      try { await Auth.signup(document.getElementById('signupName').value, document.getElementById('signupEmail').value, document.getElementById('signupPassword').value); Router.navigate('dashboard') }
      catch(e) { if(err){err.textContent=e.message;err.style.display='block'} }
      finally { btn.disabled=false; btn.textContent='Create Account' }
    })
  },

  _bindPublicContactForm(slug) {
    const btn = document.getElementById('cfSubmitBtn')
    if (!btn) return
    btn.addEventListener('click', async () => {
      const name = document.getElementById('cfName')?.value?.trim()
      const email = document.getElementById('cfEmail')?.value?.trim()
      const message = document.getElementById('cfMessage')?.value?.trim()
      const msgEl = document.getElementById('cfMsg')
      if (!name || !email || !message) {
        if (msgEl) { msgEl.style.display = 'block'; msgEl.style.color = '#dc2626'; msgEl.textContent = 'Please fill all fields' }
        return
      }
      btn.disabled = true; btn.textContent = 'Sending...'
      const res = await API.submitForm(slug, name, email, message)
      btn.disabled = false; btn.textContent = 'Send'
      if (res.ok) {
        if (msgEl) { msgEl.style.display = 'block'; msgEl.style.color = '#059669'; msgEl.textContent = 'Message sent!' }
        document.getElementById('cfName').value = ''
        document.getElementById('cfEmail').value = ''
        document.getElementById('cfMessage').value = ''
      } else {
        if (msgEl) { msgEl.style.display = 'block'; msgEl.style.color = '#dc2626'; msgEl.textContent = 'Failed to send' }
      }
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
      const drafts = sites.filter(s=>!s.published).length

      statsEl.innerHTML = `
        <div class="stats-row">
          <div class="stat-card card"><div class="num">${sites.length}</div><div class="label">Total Sites</div></div>
          <div class="stat-card card"><div class="num">${published}</div><div class="label">Published</div></div>
          <div class="stat-card card"><div class="num">${totalViews}</div><div class="label">Total Views</div></div>
          <div class="stat-card card"><div class="num">${drafts}</div><div class="label">Drafts</div></div>
        </div>`

      if (sites.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">${ICONS.wrap(ICONS.globe,48)}</div>
            <h2>No sites yet</h2>
            <p>Create your first website and publish it to the world.<br>It takes less than a minute.</p>
            <button class="btn btn-primary btn-lg" id="emptyCreateBtn">${ICONS.wrap(ICONS.plus,18)} Create Your First Site</button>
          </div>
          <div class="quick-start">
            <h3>Quick Start Templates</h3>
            <div class="quick-templates">
              ${PRESETS.filter(t=>t.id!=='blank').slice(0,4).map(t=>`
                <div class="quick-template-card" data-quick-template="${t.id}">
                  <div class="qt-icon">${t.icon}</div>
                  <div class="qt-info"><h4>${t.name}</h4><p>${t.desc}</p></div>
                  <span class="qt-arrow">→</span>
                </div>
              `).join('')}
            </div>
          </div>`
        document.getElementById('emptyCreateBtn')?.addEventListener('click',()=>Builder.createNew())
        document.querySelectorAll('[data-quick-template]').forEach(card=>{
          card.addEventListener('click',async()=>{
            try{
              const site = await API.createSite({title:card.querySelector('h4').textContent, template_type:card.dataset.quickTemplate})
              Toast.show('Site created!','success'); Router.navigate('builder/'+site.id)
            }catch(e){Toast.show(e.message,'error')}
          })
        })
        return
      }

      container.innerHTML = `
        <div class="sites-header">
          <h2>Your Sites</h2>
          <div class="sites-filter">
            <button class="filter-btn active" data-sfilter="all">All (${sites.length})</button>
            <button class="filter-btn" data-sfilter="published">Published (${published})</button>
            <button class="filter-btn" data-sfilter="draft">Drafts (${drafts})</button>
          </div>
        </div>
        <div class="sites-grid">${sites.map(p=>{
          const tc = p.theme?.color || '#6366f1'
          const siteUrl = subdomainUrl(p.slug)
          return `<div class="site-card card card-hover" data-site-status="${p.published?'published':'draft'}">
            <div class="site-card-preview" style="background:linear-gradient(135deg,${tc}88,${tc}44)">
              <span class="initial">${(p.title||'S').charAt(0).toUpperCase()}</span>
              <span class="view-badge">${ICONS.wrap(ICONS.eye,14)} ${p.views||0}</span>
            </div>
            <div class="site-card-body">
              <h3>${p.title}</h3>
              <span class="site-url">${siteUrl}</span>
              <div class="site-meta">
                <span class="status-badge ${p.published?'status-published':'status-draft'}">${p.published?'Published':'Draft'}</span>
                <span>${new Date(p.createdAt||p.created_at||p.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div class="site-card-actions">
              <a href="#/builder/${p.id}" class="btn btn-primary btn-sm">${ICONS.wrap(ICONS.pencil,14)} Edit</a>
              ${p.published?`<a href="${siteUrl}" target="_blank" class="btn btn-outline btn-sm">${ICONS.wrap(ICONS.external,14)} View</a>`:''}
              <a href="#/submissions/${p.id}" class="btn btn-ghost btn-sm" title="Submissions">${ICONS.wrap(ICONS.message,16)}</a>
              <a href="#/analytics/${p.id}" class="btn btn-ghost btn-sm" title="Analytics">${ICONS.wrap(ICONS.chart,16)}</a>
              <button class="btn btn-ghost btn-sm" onclick="Dash.remove('${p.id}')" style="color:#dc2626" title="Delete">${ICONS.wrap(ICONS.trash,16)}</button>
            </div>
          </div>`
        }).join('')}</div>`

      document.getElementById('createSiteBtn')?.addEventListener('click',()=>Builder.createNew())
      document.getElementById('upgradeBtn')?.addEventListener('click',()=>Router.navigate('plans'))

      document.querySelectorAll('[data-sfilter]').forEach(btn=>{
        btn.addEventListener('click',()=>{
          document.querySelectorAll('[data-sfilter]').forEach(b=>b.classList.remove('active'))
          btn.classList.add('active')
          const f = btn.dataset.sfilter
          document.querySelectorAll('.site-card').forEach(card=>{
            if(f==='all') card.style.display=''
            else card.style.display=card.dataset.siteStatus===f?'':'none'
          })
        })
      })
    } catch(e) { Toast.show(e.message,'error') }
  },

  async remove(id) {
    if (!confirm('Delete this site forever?')) return
    try { await API.deleteSite(id); Toast.show('Deleted','info'); Dash.render() }
    catch(e) { Toast.show(e.message,'error') }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // Detect subdomain — render public site directly
  const host = window.location.hostname
  const mainDomain = MAIN_DOMAIN
  if (host !== mainDomain && host !== 'localhost' && host.endsWith('.' + mainDomain)) {
    const slug = host.slice(0, -('.' + mainDomain).length)
    if (slug && slug !== 'www') {
      document.querySelector('.app-header')?.classList.add('hidden')
      const app = document.getElementById('app')
      if (app) app.innerHTML = T.loading()
      try {
        const site = await API.getPublicPage(slug)
        if (site && site.published) {
          document.title = site.seo?.title || site.title
          app.innerHTML = T.publicPage(site)
          Router._bindPublicContactForm(slug)
          // Track view
          try { await API._fetch('/p/' + slug + '/view', { method: 'POST', body: JSON.stringify({ ip: '', ua: navigator.userAgent }) }) } catch (e) {}
          // Also increment local views
          if (API.mode === 'local') LocalDB.incrementViews(slug)
          return
        }
      } catch {}
      app.innerHTML = T.notFound('Site Not Found', 'This site has not been published yet.')
      return
    }
  }

  const app = document.getElementById('app')
  if (app) app.innerHTML = T.loading()
  await Auth.init()
  Router.init()
})
