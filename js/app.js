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
    else if (r==='admin') { if(!Auth.requireAuth()||!Auth.isAdmin())return; this._admin() }
    else if (r==='admin-payments') { if(!Auth.requireAuth()||!Auth.isAdmin())return; this._adminPayments() }
    else if (r==='checkout'&&pts[1]) { if(!Auth.requireAuth())return; this._checkoutRoute(pts[1]) }
    else if (r==='pay') { if(!Auth.requireAuth())return; this._pay() }
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
      app.innerHTML = T.plans({
        free:{name:'مجاني',name_en:'Free',price:0,currency:'EGP',features:['دومين فرعي','صفحتين','علامة Made with Site Flow']},
        basic:{name:'أساسي',name_en:'Basic',price:129,yearly_price:999,currency:'EGP',features:['دومين خاص (.com)','10 صفحات','إزالة العلامة','SSL مجاني']},
        pro:{name:'احترافي',name_en:'Pro',price:299,yearly_price:2499,currency:'EGP',features:['صفحات غير محدودة','ربط فوري/إنستاباي/فودافون كاش','متجر بسيط','دعم واتساب']},
        business:{name:'بيزنس',name_en:'Business',price:599,yearly_price:4999,currency:'EGP',features:['متجر كامل','شحن محلي','تقارير مبيعات','دعم مخصص']}
      })
    }
    document.querySelectorAll('.plan-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!Auth.requireAuth()) return
        this._checkout(btn.dataset.plan)
      })
    })
  },

  async _checkout(planKey) {
    const allPlans = await API.getPlans()
    const plan = allPlans[planKey]
    if (!plan || plan.price === 0) {
      try { const p = await API.createPayment(planKey); await API.confirmPayment(p.id); Auth.user = await API.getMe(); Toast.show('تم الترقية!','success'); Router.navigate('dashboard') }
      catch(e) { Toast.show(e.message,'error') }
      return
    }
    document.getElementById('app').innerHTML = `
<div style="max-width:600px;margin:40px auto;padding:0 24px">
  <div class="card" style="padding:40px;text-align:center">
    <div style="margin-bottom:24px">
      <div style="width:64px;height:64px;border-radius:16px;background:var(--primary-light);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;color:var(--primary)">${ICONS.wrap(ICONS.dollar,32)}</div>
      <h2 style="font-size:1.5rem;margin-bottom:4px">اشتراك ${plan.name}</h2>
      <p style="color:var(--gray-500)">خطة ${plan.name_en} — ج.م ${plan.price}/شهرياً</p>
    </div>
    <div style="background:var(--gray-50);border-radius:12px;padding:20px;margin-bottom:24px;text-align:right">
      <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="color:var(--gray-500)">الخطة</span><strong>${plan.name}</strong></div>
      <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="color:var(--gray-500)">السعر</span><strong>ج.م ${plan.price}/شهر</strong></div>
      ${plan.yearly_price ? `<div style="display:flex;justify-content:space-between;padding-top:8px;border-top:1px dashed var(--gray-200)"><span style="color:var(--gray-500)">السعر السنوي</span><strong style="color:var(--primary)">ج.م ${plan.yearly_price.toLocaleString()}/سنة (خصم ${Math.round((1 - plan.yearly_price/(plan.price*12))*100)}%)</strong></div>` : ''}
    </div>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px;margin-bottom:24px;text-align:right">
      <p style="font-size:.88rem;color:#166534;font-weight:600;margin-bottom:4px">طرق الدفع المتاحة:</p>
      <p style="font-size:.82rem;color:#166534">فوري • إنستاباي • فودافون كاش • فيزا/ماستركارد</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px">
      <button class="btn btn-primary btn-lg w-full" onclick="API.createPayment('${planKey}').then(()=>Router.navigate('pay'))" style="font-size:1.05rem;padding:16px">
        اختار طريقة الدفع
      </button>
      <a href="#/plans" class="btn btn-ghost" style="font-size:.88rem">رجوع للأسعار</a>
    </div>
  </div>
</div>`
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

  async _pay() {
    const plans = await API.getPlans()
    const planKeys = Object.keys(plans).filter(k => plans[k].price > 0)
    document.getElementById('app').innerHTML = `
<div style="max-width:800px;margin:0 auto;padding:40px 24px">
  <div style="text-align:center;margin-bottom:32px">
    <h1 style="font-size:1.8rem;margin-bottom:8px">اختار طريقة الدفع</h1>
    <p style="color:var(--gray-500)">ادفع بأي طريقة تناسبك — بدون فيزا دولية</p>
  </div>

  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:32px">
    <div class="card" style="padding:24px;text-align:center;cursor:pointer;border:2px solid var(--primary)" onclick="Router._showPaymentMethod('fawry')">
      <div style="font-size:2.5rem;margin-bottom:8px">🏦</div>
      <h3 style="font-size:1rem;margin-bottom:4px">فوري</h3>
      <p style="font-size:.82rem;color:var(--gray-500)">ادفع من أي فرع فوري أو أونلاين</p>
    </div>
    <div class="card" style="padding:24px;text-align:center;cursor:pointer;border:2px solid var(--primary)" onclick="Router._showPaymentMethod('instapay')">
      <div style="font-size:2.5rem;margin-bottom:8px">📱</div>
      <h3 style="font-size:1rem;margin-bottom:4px">إنستاباي</h3>
      <p style="font-size:.82rem;color:var(--gray-500)">تحويل مباشر من بنكك</p>
    </div>
    <div class="card" style="padding:24px;text-align:center;cursor:pointer;border:2px solid var(--primary)" onclick="Router._showPaymentMethod('vodafone')">
      <div style="font-size:2.5rem;margin-bottom:8px">💚</div>
      <h3 style="font-size:1rem;margin-bottom:4px">فودافون كاش</h3>
      <p style="font-size:.82rem;color:var(--gray-500)">ادفع من محفظتك الإلكترونية</p>
    </div>
  </div>

  <div id="paymentDetails" class="card" style="padding:32px;display:none">
  </div>
</div>`
  },

  _showPaymentMethod(method) {
    const el = document.getElementById('paymentDetails')
    if (!el) return
    el.style.display = 'block'
    const methods = {
      fawry: {
        title: 'الدفع عبر فوري',
        icon: '🏦',
        steps: [
          'روّح لأي فرع فوري قريب منك',
          'قولهم عايز تدفع لـ Site Flow',
          'ادفع المبلغ المطلوب',
          'احتفظ بالرقم المرجعي',
          'ابعتلنا الرقم المرجعي على واتساب: 01012345678',
          'هنتأكد ونشغّل اشتراكك خلال ساعة'
        ],
        note: 'ممكن كمان تدفع أونلاين من fawry.com'
      },
      instapay: {
        title: 'الدفع عبر إنستاباي',
        icon: '📱',
        steps: [
          'افتح تطبيق البنك بتاعك',
          'اختار إنستاباي (InstaPay)',
          'ابعت المبلغ لـ: 01012345678',
          'في الملاحظات اكتب: اسمك + الخطة (مثلاً: أحمد - احترافي)',
          'ابعتلنا سcreenshot التحويل على واتساب',
          'هنتأكد ونشغّل اشتراكك خلال ساعة'
        ],
        note: 'متوفر في: CIB، الأهلي، بنك مصر، QNB، وباقي البنوك'
      },
      vodafone: {
        title: 'الدفع عبر فودافون كاش',
        icon: '💚',
        steps: [
          'افتح فودافون كاش',
          'اختار "دفع فواتير" أو "تحويل"',
          'ادفع لـ: 01012345678',
          'ادفع المبلغ المطلوب',
          'احتفظ بالرقم المرجعي',
          'ابعتلنا الرقم على واتساب: 01012345678'
        ],
        note: 'ممكن كمان تستخدم فودافون كاش من أي فرع فودافون'
      }
    }
    const m = methods[method]
    el.innerHTML = `
      <div style="text-align:center;margin-bottom:24px">
        <div style="font-size:3rem;margin-bottom:8px">${m.icon}</div>
        <h2 style="font-size:1.4rem;margin-bottom:4px">${m.title}</h2>
      </div>
      <div style="background:var(--gray-50);border-radius:12px;padding:24px;margin-bottom:20px">
        <ol style="list-style:none;counter-reset:step;padding:0;display:flex;flex-direction:column;gap:12px">
          ${m.steps.map((s,i)=>`<li style="display:flex;align-items:start;gap:12px;font-size:.92rem">
            <span style="min-width:28px;height:28px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:.78rem;font-weight:700">${i+1}</span>
            ${s}
          </li>`).join('')}
        </ol>
      </div>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:16px;font-size:.88rem;color:#166534">
        <strong>ملاحظة:</strong> ${m.note}
      </div>
      <div style="text-align:center;margin-top:20px">
        <p style="color:var(--gray-500);font-size:.85rem">بعد الدفع، ابعتلنا الإثبات على واتساب</p>
        <a href="https://wa.me/201012345678" target="_blank" class="btn btn-success btn-lg" style="margin-top:8px">
          📱 ابعت على واتساب
        </a>
      </div>
    `
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  },

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
          <div class="stat-card">
            <div class="stat-icon">${ICONS.wrap(ICONS.globe,22)}</div>
            <div class="num">${sites.length}</div>
            <div class="label">Total Sites</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">${ICONS.wrap(ICONS.published,22)}</div>
            <div class="num">${published}</div>
            <div class="label">Published</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">${ICONS.wrap(ICONS.eye,22)}</div>
            <div class="num">${totalViews}</div>
            <div class="label">Total Views</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">${ICONS.wrap(ICONS.pencil,22)}</div>
            <div class="num">${drafts}</div>
            <div class="label">Drafts</div>
          </div>
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
          return `<div class="site-card card" data-site-status="${p.published?'published':'draft'}">
            <div class="site-card-preview" style="background:linear-gradient(135deg,${tc}cc,${tc}66)">
              <span class="initial">${(p.title||'S').charAt(0).toUpperCase()}</span>
              <span class="view-badge">${ICONS.wrap(ICONS.eye,13)} ${p.views||0}</span>
            </div>
            <div class="site-card-body">
              <h3>${p.title}</h3>
              <span class="site-url">${siteUrl}</span>
              <div class="site-meta">
                <span class="status-badge ${p.published?'status-published':'status-draft'}">${p.published?'Published':'Draft'}</span>
                <span style="font-size:.78rem;color:var(--gray-400)">${new Date(p.createdAt||p.created_at||p.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div class="site-card-actions">
              <a href="#/builder/${p.id}" class="btn btn-primary btn-sm">${ICONS.wrap(ICONS.pencil,14)} Edit</a>
              ${p.published?`<a href="${siteUrl}" target="_blank" class="btn btn-outline btn-sm">${ICONS.wrap(ICONS.external,14)} View</a>`:''}
              <a href="#/submissions/${p.id}" class="btn btn-ghost btn-sm" title="Submissions">${ICONS.wrap(ICONS.message,15)}</a>
              <a href="#/analytics/${p.id}" class="btn btn-ghost btn-sm" title="Analytics">${ICONS.wrap(ICONS.chart,15)}</a>
              <button class="btn btn-ghost btn-sm" onclick="Dash.remove('${p.id}')" style="color:#dc2626" title="Delete">${ICONS.wrap(ICONS.trash,15)}</button>
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
  const isSubdomain = (host !== mainDomain && host !== 'localhost' && host !== '127.0.0.1' && host.endsWith('.' + mainDomain)) ||
                      (host !== mainDomain && host.endsWith('.vercel.app') && host.split('.').length > 2 && !host.startsWith('www'))
  if (isSubdomain) {
    const slug = host.endsWith('.' + mainDomain)
      ? host.slice(0, -('.' + mainDomain).length)
      : host.split('.')[0]
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
          if (API.mode !== 'local') {
            try { await API._fetch('/p/' + slug + '/view', { method: 'POST', body: JSON.stringify({ ip: '', ua: navigator.userAgent }) }) } catch (e) {}
          }
          // Also increment local views
          LocalDB.incrementViews(slug)
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

  // Entrance animations via Intersection Observer
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        animateOnScroll.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  function initAnimations() {
    document.querySelectorAll('.lp-section, .lp-features-bento, .lp-logos-bar, .lp-hero, .lp-cta-section').forEach(el => animateOnScroll.observe(el))
    // Stagger children
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.querySelectorAll('.lp-step, .lp-feature-card, .lp-pricing-card, .lp-testimonial-card')
          children.forEach((child, i) => {
            setTimeout(() => child.classList.add('visible'), i * 80)
          })
          staggerObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.lp-steps, .lp-features-grid, .lp-pricing-grid, .lp-testimonials-grid').forEach(el => staggerObserver.observe(el))
  }

  // Re-init animations after route changes
  const origRender = Router._render.bind(Router)
  Router._render = function(page) {
    origRender(page)
    setTimeout(initAnimations, 50)
  }
  // Also re-init after Dash.render
  const origDashRender = Dash.render.bind(Dash)
  Dash.render = async function() {
    await origDashRender()
    setTimeout(initAnimations, 50)
  }

  setTimeout(initAnimations, 100)
})

// ── Admin Dashboard ──
Router._admin = async function() {
  const users = LocalDB.users.get()
  const pages = LocalDB.pages.get()
  const payments = LocalDB.payments ? LocalDB.payments.get() : []
  document.getElementById('app').innerHTML = `
<div style="max-width:1200px;margin:0 auto;padding:40px 24px">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:32px">
    <div>
      <h1 style="font-size:1.8rem">لوحة التحكم الإدارية</h1>
      <p style="color:var(--gray-500)">إدارة المستخدمين والمواقع والمدفوعات</p>
    </div>
    <div style="display:flex;gap:8px">
      <a href="#/admin-payments" class="btn btn-primary">المدفوعات</a>
      <a href="#/dashboard" class="btn btn-ghost">الوحة العادية</a>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:32px">
    <div class="card" style="padding:20px;text-align:center">
      <div style="font-size:2rem;font-weight:800;color:var(--primary)">${users.length}</div>
      <div style="color:var(--gray-500);font-size:.85rem">المستخدمين</div>
    </div>
    <div class="card" style="padding:20px;text-align:center">
      <div style="font-size:2rem;font-weight:800;color:#059669">${pages.length}</div>
      <div style="color:var(--gray-500);font-size:.85rem">المواقع</div>
    </div>
    <div class="card" style="padding:20px;text-align:center">
      <div style="font-size:2rem;font-weight:800;color:#d97706">${pages.filter(p=>p.published).length}</div>
      <div style="color:var(--gray-500);font-size:.85rem">منشورة</div>
    </div>
    <div class="card" style="padding:20px;text-align:center">
      <div style="font-size:2rem;font-weight:800;color:#dc2626">${payments.length}</div>
      <div style="color:var(--gray-500);font-size:.85rem">المدفوعات</div>
    </div>
  </div>
  <div class="card" style="padding:24px">
    <h3 style="margin-bottom:16px">المستخدمين</h3>
    <table style="width:100%;border-collapse:collapse">
      <thead><tr style="border-bottom:2px solid var(--gray-200)">
        <th style="text-align:right;padding:10px;font-size:.85rem">الاسم</th>
        <th style="text-align:right;padding:10px;font-size:.85rem">الإيميل</th>
        <th style="text-align:right;padding:10px;font-size:.85rem">الخطة</th>
        <th style="text-align:right;padding:10px;font-size:.85rem">المواقع</th>
        <th style="text-align:right;padding:10px;font-size:.85rem">الدور</th>
      </tr></thead>
      <tbody>${users.map(u=>{
        const userPages = pages.filter(p=>p.userId===u.id)
        const planNames = {free:'مجاني',basic:'أساسي',pro:'احترافي',business:'بيزنس'}
        return `<tr style="border-bottom:1px solid var(--gray-100)">
          <td style="padding:10px;font-weight:600">${u.name}</td>
          <td style="padding:10px;color:var(--gray-500)">${u.email}</td>
          <td style="padding:10px"><span style="background:var(--primary-light);color:var(--primary-dark);padding:3px 10px;border-radius:8px;font-size:.78rem;font-weight:600">${planNames[u.plan]||u.plan}</span></td>
          <td style="padding:10px">${userPages.length}</td>
          <td style="padding:10px">${u.isAdmin?'<span style="background:#fef3c7;color:#92400e;padding:3px 10px;border-radius:8px;font-size:.78rem">admin</span>':'—'}</td>
        </tr>`
      }).join('')}</tbody>
    </table>
  </div>
</div>`
}

Router._adminPayments = async function() {
  const payments = LocalDB.payments ? LocalDB.payments.get() : []
  const users = LocalDB.users.get()
  document.getElementById('app').innerHTML = `
<div style="max-width:1000px;margin:0 auto;padding:40px 24px">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:32px">
    <div>
      <h1 style="font-size:1.8rem">المدفوعات</h1>
      <p style="color:var(--gray-500)">إدارة طلبات الاشتراك والمدفوعات</p>
    </div>
    <a href="#/admin" class="btn btn-ghost">رجوع</a>
  </div>
  ${payments.length === 0 ? `
  <div class="card" style="padding:60px 24px;text-align:center">
    <div style="font-size:3rem;margin-bottom:16px">💰</div>
    <h3 style="margin-bottom:8px">لا توجد مدفوعات بعد</h3>
    <p style="color:var(--gray-500)">هتظهر هنا أول ما عملاء يشتركوا في خطط مدفوعة</p>
  </div>` : `
  <div class="card" style="padding:24px">
    <table style="width:100%;border-collapse:collapse">
      <thead><tr style="border-bottom:2px solid var(--gray-200)">
        <th style="text-align:right;padding:10px;font-size:.85rem">التاريخ</th>
        <th style="text-align:right;padding:10px;font-size:.85rem">المستخدم</th>
        <th style="text-align:right;padding:10px;font-size:.85rem">الخطة</th>
        <th style="text-align:right;padding:10px;font-size:.85rem">المبلغ</th>
        <th style="text-align:right;padding:10px;font-size:.85rem">الحالة</th>
        <th style="text-align:right;padding:10px;font-size:.85rem">إجراءات</th>
      </tr></thead>
      <tbody>${payments.map(p=>{
        const user = users.find(u=>u.id===p.userId)
        return `<tr style="border-bottom:1px solid var(--gray-100)">
          <td style="padding:10px">${new Date(p.created_at||p.createdAt).toLocaleDateString('ar-EG')}</td>
          <td style="padding:10px">${user?.name||p.userId}</td>
          <td style="padding:10px">${p.plan}</td>
          <td style="padding:10px;font-weight:700">ج.م ${p.amount}</td>
          <td style="padding:10px"><span style="background:${p.status==='completed'?'#d1fae5;color:#065f46':'#fef3c7;color:#92400e'};padding:3px 10px;border-radius:8px;font-size:.78rem">${p.status==='completed'?'مكتمل':p.status||'معلق'}</span></td>
          <td style="padding:10px">${p.status!=='completed'?`<button class="btn btn-success btn-sm" onclick="Router._confirmPayment('${p.id}')">تأكيد</button>`:'—'}</td>
        </tr>`
      }).join('')}</tbody>
    </table>
  </div>`}
</div>`
}

Router._confirmPayment = function(paymentId) {
  const payments = LocalDB.payments.get()
  const p = payments.find(x=>x.id===paymentId)
  if (p) {
    p.status = 'completed'
    LocalDB.payments.save(payments)
    const users = LocalDB.users.get()
    const u = users.find(x=>x.id===p.userId)
    if (u) { u.plan = p.plan; LocalDB.users.save(users) }
    Toast.show('تم تأكيد الدفع!','success')
    Router._adminPayments()
  }
}
