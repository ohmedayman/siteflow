/** Site Flow — Main Application */

const Toast = {
  show(msg, type='info', title='') {
    let c = document.querySelector('.toast-container')
    if (!c) {
      c = document.createElement('div')
      c.className = 'toast-container'
      document.body.appendChild(c)
    }
    const t = document.createElement('div')
    t.className = 'toast ' + type

    const iconSvg = {
      success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
      error: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
      warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
      info: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`
    }[type] || `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`

    t.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-content">
        ${title ? `<strong class="toast-title">${title}</strong>` : ''}
        <div class="toast-text">${msg}</div>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()" title="إغلاق">✕</button>
    `
    c.appendChild(t)
    setTimeout(() => {
      t.style.opacity = '0'
      t.style.transform = 'translateY(16px) scale(0.96)'
      setTimeout(() => t.remove(), 300)
    }, 4200)
  }
}

const Notif = {
  items: [],
  initialized: false,

  _getDefaults() {
    return [
      {
        id: 'n_supa',
        title: 'قاعدة بيانات Supabase متصلة',
        desc: 'تم ربط مشروعك السحابي PostgreSQL بنجاح. كافة المواقع والبيانات محفوظة ومؤمنة سحابياً.',
        type: 'success',
        time: 'الآن',
        unread: true
      },
      {
        id: 'n_welcome',
        title: 'مرحباً بك في SiteFlow',
        desc: 'ابدأ بإنشاء أول موقع إلكتروني لك من قسم القوالب الجاهزة أو من الصفر في ثوانٍ.',
        type: 'info',
        time: 'منذ قليل',
        unread: true
      },
      {
        id: 'n_ai',
        title: 'مساعد الذكاء الاصطناعي جاهز',
        desc: 'يمكنك استخدام الذكاء الاصطناعي لكتابة النصوص، تحسين SEO، وإنشاء الأقسام بضغطة زر.',
        type: 'ai',
        time: 'اليوم',
        unread: false
      }
    ]
  },

  init() {
    try {
      const stored = localStorage.getItem('sf_notifications')
      this.items = stored ? JSON.parse(stored) : this._getDefaults()
    } catch {
      this.items = this._getDefaults()
    }

    this.render()
    if (!this.initialized) {
      this.bindEvents()
      this.initialized = true
    }
  },

  add(notif) {
    const item = {
      id: 'n_' + Date.now().toString(36),
      title: notif.title || 'إشعار جديد',
      desc: notif.desc || '',
      type: notif.type || 'info',
      time: 'الآن',
      unread: true
    }
    this.items.unshift(item)
    if (this.items.length > 20) this.items.pop()
    this._save()
    this.render()
    Toast.show(item.desc || item.title, item.type, item.title)
  },

  _save() {
    try {
      localStorage.setItem('sf_notifications', JSON.stringify(this.items))
    } catch {}
  },

  markAllRead() {
    this.items.forEach(x => { x.unread = false })
    this._save()
    this.render()
  },

  render() {
    const badge = document.getElementById('notifBadge')
    const pill = document.getElementById('notifCountPill')
    const list = document.getElementById('notifList')
    if (!badge || !list) return

    const unreadCount = this.items.filter(x => x.unread).length
    if (unreadCount > 0) {
      badge.textContent = unreadCount > 9 ? '9+' : unreadCount
      badge.style.display = 'flex'
      if (pill) pill.textContent = unreadCount + ' جديد'
    } else {
      badge.style.display = 'none'
      if (pill) pill.textContent = 'لا توجد إشعارات جديدة'
    }

    if (this.items.length === 0) {
      list.innerHTML = `<div class="notif-empty"><p>لا توجد إشعارات حالياً.</p></div>`
      return
    }

    list.innerHTML = this.items.map(item => {
      const iconSvg = {
        success: `<div class="notif-item-icon success"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>`,
        error: `<div class="notif-item-icon error"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>`,
        ai: `<div class="notif-item-icon ai"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg></div>`,
        info: `<div class="notif-item-icon info"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></div>`
      }[item.type] || `<div class="notif-item-icon info"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></div>`

      return `
        <div class="notif-item ${item.unread ? 'unread' : ''}" data-id="${item.id}">
          ${iconSvg}
          <div class="notif-item-content">
            <div class="notif-item-header">
              <span class="notif-item-title">${item.title}</span>
              <span class="notif-item-time">${item.time}</span>
            </div>
            <p class="notif-item-desc">${item.desc}</p>
          </div>
          ${item.unread ? '<span class="notif-unread-dot"></span>' : ''}
        </div>
      `
    }).join('')
  },

  bindEvents() {
    const bellBtn = document.getElementById('notifBellBtn')
    const dropdown = document.getElementById('notifDropdown')
    const markAllBtn = document.getElementById('notifMarkAllReadBtn')
    const userBtn = document.getElementById('userAvatarBtn')
    const userDropdown = document.getElementById('userDropdown')

    if (bellBtn && dropdown) {
      bellBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        if (userDropdown) userDropdown.classList.remove('open')
        dropdown.classList.toggle('open')
      })
    }

    if (userBtn && userDropdown) {
      userBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        if (dropdown) dropdown.classList.remove('open')
        userDropdown.classList.toggle('open')
      })
    }

    if (markAllBtn) {
      markAllBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        this.markAllRead()
        Toast.show('تم تحديد جميع الإشعارات كمقروءة', 'info')
      })
    }

    document.addEventListener('click', (e) => {
      if (dropdown && !dropdown.contains(e.target) && e.target !== bellBtn) {
        dropdown.classList.remove('open')
      }
      if (userDropdown && !userDropdown.contains(e.target) && e.target !== userBtn) {
        userDropdown.classList.remove('open')
      }
    })
  }
}

const Router = {
  init() { window.addEventListener('hashchange',()=>this.handle()); this.handle() },
  navigate(path) { window.location.hash = '#/'+path },

  handle() {
    const hash = window.location.hash.slice(1) || '/'
    const pts = hash.split('/').filter(Boolean); const r = pts[0]||''

    // Update active nav tab
    document.querySelectorAll('.nav-link-app').forEach(el => el.classList.remove('active'))
    if (r === 'dashboard') document.getElementById('navLinkDashboard')?.classList.add('active')
    else if (r === 'templates') document.getElementById('navLinkTemplates')?.classList.add('active')
    else if (r === 'plans') document.getElementById('navLinkPlans')?.classList.add('active')
    else if (r === 'settings') document.getElementById('navLinkSettings')?.classList.add('active')

    if (r==='login') { if(Auth.isLoggedIn()){this.navigate('dashboard');return}; this._render('login') }
    else if (r==='dashboard') { if(!Auth.requireAuth())return; Dash.render() }
    else if (r==='templates') { if(!Auth.requireAuth())return; Dash.render(); setTimeout(() => Builder.createNew(), 120) }
    else if (r==='builder'&&pts[1]) { Builder.load(pts[1]) }
    else if (r==='preview'&&pts[1]) { this._preview(pts[1]) }
    else if (r==='p'&&pts[1]) { this._public(pts[1]) }
    else if (r==='plans') { this._plans() }
    else if (r==='billing') { if(!Auth.requireAuth())return; this._billing() }
    else if (r==='settings') { if(!Auth.requireAuth())return; this._settings() }
    else if (r==='help') { this._help() }
    else if (r==='about') { this._about() }
    else if (r==='privacy') { this._privacy() }
    else if (r==='showcase') { this._showcase() }
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
      this._bindPublicAiChat(s)
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

    // Save profile settings
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
        Toast.show('تم حفظ التغييرات الشخصية بنجاح!', 'success')
      } catch(e) { Toast.show(e.message, 'error') }
    })

    // Supabase Config Save & Test
    document.getElementById('saveSbConfigBtn')?.addEventListener('click', async () => {
      const url = (document.getElementById('sbProjectUrl')?.value || '').trim()
      const key = (document.getElementById('sbAnonKey')?.value || '').trim()
      if (!url || !key) {
        Toast.show('يرجى إدخال رابط المشروع والمفتاح العام لـ Supabase', 'error')
        return
      }
      Toast.show('جاري فحص الاتصال بقاعدة بيانات Supabase...', 'info')
      try {
        const ok = await SB.configure(url, key)
        if (ok) {
          API.mode = 'supabase'
          Toast.show('✅ تم الاتصال بنجاح بقاعدة بيانات Supabase السحابية!', 'success')
        } else {
          Toast.show('⚠️ لم نتمكن من الوصول للمشروع: ' + (SB.lastError || 'تحقق من تفعيل المشروع على Supabase'), 'error')
        }
        this._settings()
      } catch (err) {
        Toast.show('فشل الاتصال: ' + err.message, 'error')
      }
    })

    // Copy SQL Schema
    document.getElementById('copySqlSchemaBtn')?.addEventListener('click', async () => {
      try {
        const res = await fetch('supabase_schema.sql')
        if (!res.ok) throw new Error('File not found')
        const sql = await res.text()
        await navigator.clipboard.writeText(sql)
        Toast.show('تم نسخ كود SQL إلى الحافظة! الصقه في Supabase SQL Editor', 'success')
      } catch {
        Toast.show('يمكنك نسخ محتوى ملف supabase_schema.sql مباشرة من المشروع.', 'info')
      }
    })

    // Sync Local Sites to Supabase
    document.getElementById('syncToSbBtn')?.addEventListener('click', async () => {
      if (!SB.isReady()) {
        Toast.show('قاعدة بيانات Supabase غير متصلة حالياً. اضغط "حفظ واختبار الاتصال" أولاً.', 'error')
        return
      }
      Toast.show('جاري مزامنة المواقع إلى Supabase...', 'info')
      try {
        const localPages = LocalDB.pages.get() || []
        let count = 0
        const currentUser = await SB.getCurrentUser()
        for (const p of localPages) {
          await SB.createSite({
            id: p.id,
            user_id: currentUser?.id || 'usr_guest',
            title: p.title,
            slug: p.slug,
            template_type: p.template_type,
            published: p.published,
            theme: p.theme,
            seo: p.seo,
            sections: p.sections
          })
          count++
        }
        Toast.show(`تمت مزامنة ${count} موقع بنجاح إلى قاعدة بيانات Supabase!`, 'success')
      } catch (err) {
        Toast.show('خطأ أثناء المزامنة: ' + err.message, 'error')
      }
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
  _showcase() { document.getElementById('app').innerHTML = T.showcase() },

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
    const authTabsWrap = document.querySelector('.auth-tabs')
    const lf = document.getElementById('loginForm')
    const sf = document.getElementById('signupForm')
    const otpSection = document.getElementById('otpSection')
    const otpForm = document.getElementById('otpForm')
    const otpEmailDisplay = document.getElementById('otpEmailDisplay')
    const otpCodeInput = document.getElementById('otpCodeInput')
    const resendOtpBtn = document.getElementById('resendOtpBtn')
    const backToLoginBtn = document.getElementById('backToLoginBtn')
    const err = document.getElementById('authError')

    let currentVerificationEmail = ''

    function showOtp(email) {
      currentVerificationEmail = email
      if (authTabsWrap) authTabsWrap.classList.add('hidden')
      if (lf) lf.classList.add('hidden')
      if (sf) sf.classList.add('hidden')
      if (otpSection) {
        otpSection.classList.remove('hidden')
        if (otpEmailDisplay) otpEmailDisplay.textContent = email
        if (otpCodeInput) {
          otpCodeInput.value = ''
          setTimeout(() => otpCodeInput.focus(), 150)
        }
      }
      if (err) err.style.display = 'none'
    }

    function showLogin() {
      if (authTabsWrap) authTabsWrap.classList.remove('hidden')
      if (otpSection) otpSection.classList.add('hidden')
      tabs.forEach(x => x.classList.toggle('active', x.dataset.tab === 'login'))
      if (lf) lf.classList.remove('hidden')
      if (sf) sf.classList.add('hidden')
      if (err) err.style.display = 'none'
    }

    tabs.forEach(t => t.addEventListener('click', () => {
      tabs.forEach(x => x.classList.remove('active'))
      t.classList.add('active')
      if (lf) lf.classList.toggle('hidden', t.dataset.tab !== 'login')
      if (sf) sf.classList.toggle('hidden', t.dataset.tab !== 'signup')
      if (otpSection) otpSection.classList.add('hidden')
      if (err) err.style.display = 'none'
    }))

    backToLoginBtn?.addEventListener('click', () => showLogin())

    resendOtpBtn?.addEventListener('click', async () => {
      if (!currentVerificationEmail) return
      resendOtpBtn.disabled = true
      resendOtpBtn.textContent = 'جاري الإرسال...'
      try {
        await Auth.resendOtp(currentVerificationEmail)
        Toast.show('تم إعادة إرسال رمز التحقق OTP إلى بريدك بنجاح 📩', 'info')
      } catch (e) {
        Toast.show(e.message || 'فشل إعادة الإرسال', 'error')
      } finally {
        setTimeout(() => {
          resendOtpBtn.disabled = false
          resendOtpBtn.textContent = 'إعادة إرسال الرمز'
        }, 5000)
      }
    })

    otpForm?.addEventListener('submit', async e => {
      e.preventDefault()
      const btn = document.getElementById('otpSubmitBtn')
      const token = (otpCodeInput?.value || '').trim()
      if (!token) {
        Toast.show('يرجى إدخال رمز التحقق المكون من 6 أرقام', 'error')
        return
      }
      btn.disabled = true
      btn.textContent = 'جاري التحقق والتفعيل...'
      if (err) err.style.display = 'none'

      try {
        await Auth.verifyOtp(currentVerificationEmail, token)
        Toast.show('تم تفعيل بريدك الإلكتروني بنجاح! مرحباً بك 🚀', 'success')
        Router.navigate('dashboard')
      } catch (e) {
        if (err) {
          err.textContent = e.message || 'رمز التحقق غير صحيح أو انتهت صلاحيته'
          err.style.display = 'block'
        }
      } finally {
        btn.disabled = false
        btn.textContent = 'تأكيد وتفعيل الحساب 🚀'
      }
    })

    lf?.addEventListener('submit', async e => {
      e.preventDefault()
      const btn = lf.querySelector('button[type="submit"]')
      const email = document.getElementById('loginEmail').value.trim()
      const password = document.getElementById('loginPassword').value
      btn.disabled = true; btn.textContent = 'جاري تسجيل الدخول...'
      if (err) err.style.display = 'none'

      try {
        await Auth.login(email, password)
        Toast.show('مرحباً بك! تم تسجيل الدخول بنجاح 🚀', 'success')
        Router.navigate('dashboard')
      } catch (e) {
        if (e.code === 'EMAIL_NOT_CONFIRMED' || (e.message && e.message.includes('غير مؤكد'))) {
          showOtp(email)
          Toast.show('بريدك الإلكتروني غير مؤكد بعد. يرجى إدخال رمز التحقق لتفعيل حسابك.', 'warning')
          return
        }
        if (err) {
          const msg = e.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة.'
          const isCredErr = e.code === 'INVALID_CREDENTIALS' || msg.includes('غير صحيحة')
          err.innerHTML = `
            <div style="line-height:1.5">${msg}</div>
            ${isCredErr ? `
              <div style="margin-top:8px;display:flex;gap:8px;align-items:center">
                <button type="button" class="btn btn-sm" style="font-size:0.8rem;padding:4px 10px;background:#fff;border:1px solid #f87171;color:#b91c1c;border-radius:6px;cursor:pointer" id="btnGoOtp">
                  🔑 إدخال رمز تفعيل OTP
                </button>
              </div>
            ` : ''}
          `
          err.style.display = 'block'
          document.getElementById('btnGoOtp')?.addEventListener('click', () => {
            showOtp(email)
          })
        }
      } finally {
        btn.disabled = false; btn.textContent = 'تسجيل الدخول'
      }
    })

    sf?.addEventListener('submit', async e => {
      e.preventDefault()
      const btn = sf.querySelector('button[type="submit"]')
      const name = document.getElementById('signupName').value.trim()
      const email = document.getElementById('signupEmail').value.trim()
      const password = document.getElementById('signupPassword').value
      const passwordConfirm = document.getElementById('signupPasswordConfirm')?.value

      if (passwordConfirm && password !== passwordConfirm) {
        if (err) {
          err.innerHTML = 'كلمات المرور غير متطابقة! يرجى إعادة كتابتها بدقة.'
          err.style.display = 'block'
        }
        return
      }

      btn.disabled = true; btn.textContent = 'جاري إنشاء الحساب...'
      if (err) err.style.display = 'none'

      try {
        const res = await Auth.signup(name, email, password)
        if (res && res.requiresVerification) {
          showOtp(email)
          Toast.show('تم إنشاء الحساب! أرسلنا رمز التحقق OTP إلى بريدك الإلكتروني.', 'info')
          return
        }
        Toast.show('تم إنشاء حسابك بنجاح! مرحباً بك في SiteFlow 🎉', 'success')
        Router.navigate('dashboard')
      } catch (e) {
        if (err) {
          const rawMsg = e.message || ''
          const isRateLimit = e.code === 'RATE_LIMIT_EXCEEDED' || rawMsg.toLowerCase().includes('rate limit') || rawMsg.includes('استهلاك الحد')
          const isEmailExists = e.code === 'EMAIL_EXISTS' || rawMsg.toLowerCase().includes('already') || rawMsg.includes('مسجل بالفعل')
          
          if (isRateLimit) {
            err.innerHTML = `
              <div style="text-align:right;line-height:1.5">
                <div style="font-weight:700;margin-bottom:4px;display:flex;align-items:center;gap:6px">
                  <span>⚠️</span> تم استهلاك الحد المجاني لإرسال الإيميلات في Supabase
                </div>
                <div style="font-size:0.83rem;margin-bottom:8px;color:#991b1b">
                  المشروع المجاني في Supabase يحدد 3-4 إيميلات فقط في الساعة لتجنب السبام.
                </div>
                <div style="background:#fff;padding:8px 12px;border-radius:8px;border:1px solid #fecaca;font-size:0.82rem;color:#1e293b;margin-bottom:8px;line-height:1.6">
                  <strong>💡 الحل الفوري (دون انتظار الساعة):</strong><br>
                  من لوحة Supabase > <code>Authentication</code> > <code>Providers</code> > <code>Email</code>:<br>
                  قم بإلغاء تفعيل <strong>Confirm email</strong> وحفظ التغييرات.
                </div>
                <div style="display:flex;gap:8px">
                  <button type="button" class="btn btn-sm" id="btnGoOtpFromRate" style="font-size:0.8rem;padding:4px 10px;background:#fff;border:1px solid #cbd5e1;color:#0f172a;border-radius:6px;cursor:pointer">
                    🔑 معي رمز OTP لتفعيل حسابي
                  </button>
                </div>
              </div>
            `
            document.getElementById('btnGoOtpFromRate')?.addEventListener('click', () => {
              showOtp(email)
            })
          } else if (isEmailExists) {
            err.innerHTML = `
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
                <span>هذا البريد مسجل بالفعل في النظام.</span>
                <button type="button" class="btn btn-sm" id="btnSwitchToLogin" style="font-size:0.8rem;padding:4px 10px;background:#fff;border:1px solid #f87171;color:#b91c1c;border-radius:6px;cursor:pointer">
                  تسجيل الدخول الآن ←
                </button>
              </div>
            `
            document.getElementById('btnSwitchToLogin')?.addEventListener('click', () => {
              document.querySelector('.auth-tab[data-tab="login"]')?.click()
              const le = document.getElementById('loginEmail')
              if (le) le.value = email
            })
          } else {
            err.innerHTML = e.message || 'فشل إنشاء الحساب. يرجى المحاولة لاحقاً.'
          }
          err.style.display = 'block'
        }
      } finally {
        btn.disabled = false; btn.textContent = 'إنشاء الحساب الآن'
      }
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
  },

  _bindPublicAiChat(site) {
    const toggleBtn = document.getElementById('sfAiChatToggle')
    const closeBtn = document.getElementById('sfAiChatClose')
    const box = document.getElementById('sfAiChatBox')
    const sendBtn = document.getElementById('sfAiChatSend')
    const input = document.getElementById('sfAiChatInput')
    const messages = document.getElementById('sfAiChatMessages')

    if (!toggleBtn || !box) return

    toggleBtn.addEventListener('click', () => {
      const isVisible = box.style.display === 'flex'
      box.style.display = isVisible ? 'none' : 'flex'
      if (!isVisible && input) setTimeout(() => input.focus(), 100)
    })

    closeBtn?.addEventListener('click', () => {
      box.style.display = 'none'
    })

    const doSend = () => {
      const q = input?.value?.trim()
      if (!q || !messages) return

      const userBubble = document.createElement('div')
      userBubble.style.cssText = 'background:var(--p-color, #6366f1);color:#fff;border-radius:12px 12px 0 12px;padding:10px 14px;max-width:85%;align-self:flex-end;word-break:break-word;'
      userBubble.textContent = q
      messages.appendChild(userBubble)
      input.value = ''
      messages.scrollTop = messages.scrollHeight

      const typing = document.createElement('div')
      typing.style.cssText = 'background:#fff;border:1px solid #e2e8f0;border-radius:12px 12px 12px 0;padding:8px 12px;max-width:85%;align-self:flex-start;color:var(--gray-500);font-size:.78rem;'
      typing.textContent = 'جاري التفكير...'
      messages.appendChild(typing)
      messages.scrollTop = messages.scrollHeight

      setTimeout(() => {
        typing.remove()
        const botReply = typeof SiteFlowAI !== 'undefined' ? SiteFlowAI.generateChatbotResponse(site, q) : 'شكراً لتواصلك معنا!'
        const botBubble = document.createElement('div')
        botBubble.style.cssText = 'background:#fff;border:1px solid #e2e8f0;border-radius:12px 12px 12px 0;padding:10px 14px;max-width:85%;align-self:flex-start;white-space:pre-line;line-height:1.5;'
        botBubble.textContent = botReply
        messages.appendChild(botBubble)
        messages.scrollTop = messages.scrollHeight
      }, 500)
    }

    sendBtn?.addEventListener('click', doSend)
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); doSend() }
    })
  }
}

const Dash = {
  async render() {
    const isAr = (typeof Auth !== 'undefined' ? Auth.lang : 'ar') === 'ar'
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
        <div class="stats-row-clean">
          <div class="stat-card-clean">
            <div class="stat-clean-header">
              <span class="stat-clean-label">${isAr ? 'إجمالي المواقع' : 'Total Sites'}</span>
              <div class="stat-clean-icon" style="background:#e0e7ff;color:#4f46e5">${ICONS.wrap(ICONS.globe,18)}</div>
            </div>
            <div class="stat-clean-num">${sites.length}</div>
          </div>
          <div class="stat-card-clean">
            <div class="stat-clean-header">
              <span class="stat-clean-label">${isAr ? 'المواقع المنشورة' : 'Published Sites'}</span>
              <div class="stat-clean-icon" style="background:#dcfce7;color:#16a34a">${ICONS.wrap(ICONS.published,18)}</div>
            </div>
            <div class="stat-clean-num">${published}</div>
          </div>
          <div class="stat-card-clean">
            <div class="stat-clean-header">
              <span class="stat-clean-label">${isAr ? 'إجمالي الزيارات' : 'Total Views'}</span>
              <div class="stat-clean-icon" style="background:#fef3c7;color:#d97706">${ICONS.wrap(ICONS.eye,18)}</div>
            </div>
            <div class="stat-clean-num">${totalViews}</div>
          </div>
          <div class="stat-card-clean">
            <div class="stat-clean-header">
              <span class="stat-clean-label">${isAr ? 'المسودات' : 'Drafts'}</span>
              <div class="stat-clean-icon" style="background:#f1f5f9;color:#64748b">${ICONS.wrap(ICONS.pencil,18)}</div>
            </div>
            <div class="stat-clean-num">${drafts}</div>
          </div>
        </div>`

      if (sites.length === 0) {
        container.innerHTML = `
          <div class="empty-state-clean">
            <div class="empty-icon-clean">${ICONS.wrap(ICONS.globe,36)}</div>
            <h2>${isAr ? 'لا توجد لديك مواقع بعد' : 'No Websites Yet'}</h2>
            <p>${isAr ? 'أنشئ موقعك الإلكتروني الأول وشاركه مع العالم في دقائق معدودة.<br>اختر قالباً جاهزاً أو ابدأ من الصفر.' : 'Create your first website and publish it to the world in minutes.<br>Pick a template or start from scratch.'}</p>
            <button class="btn btn-primary btn-lg" id="emptyCreateBtn" style="font-weight:700;border-radius:12px">
              ${ICONS.wrap(ICONS.plus,18)} <span>${isAr ? 'إنشاء موقعك الأول الآن' : 'Create Your First Site'}</span>
            </button>
          </div>
          <div class="quick-start-clean">
            <h3>${isAr ? 'قوالب مقترحة للبدء السريع' : 'Recommended Quick-Start Templates'}</h3>
            <div class="quick-templates-grid">
              ${PRESETS.filter(t=>t.id!=='blank').slice(0,4).map(t=>`
                <div class="quick-template-card-clean" data-quick-template="${t.id}">
                  <div class="qt-icon-clean">${t.icon}</div>
                  <div class="qt-info-clean">
                    <h4>${t.name}</h4>
                    <p>${t.desc}</p>
                  </div>
                  <span class="qt-arrow-clean">${isAr ? '←' : '→'}</span>
                </div>
              `).join('')}
            </div>
          </div>`
        document.getElementById('emptyCreateBtn')?.addEventListener('click',()=>Builder.createNew())
        document.querySelectorAll('[data-quick-template]').forEach(card=>{
          card.addEventListener('click',async()=>{
            try{
              const site = await API.createSite({title:card.querySelector('h4').textContent, template_type:card.dataset.quickTemplate})
              Toast.show(isAr ? 'تم إنشاء الموقع بنجاح! جاري فتح المحرر...' : 'Site created successfully! Opening editor...','success'); Router.navigate('builder/'+site.id)
            }catch(e){Toast.show(e.message,'error')}
          })
        })
        return
      }

      container.innerHTML = `
        <div class="sites-header-clean">
          <h2>${isAr ? 'مواقعي الإلكترونية' : 'My Websites'}</h2>
          <div class="sites-filter-clean">
            <button class="filter-btn active" data-sfilter="all">${isAr ? 'الكل' : 'All'} (${sites.length})</button>
            <button class="filter-btn" data-sfilter="published">${isAr ? 'المنشورة' : 'Published'} (${published})</button>
            <button class="filter-btn" data-sfilter="draft">${isAr ? 'المسودات' : 'Drafts'} (${drafts})</button>
          </div>
        </div>
        <div class="sites-grid">${sites.map(p=>{
          const tc = p.theme?.color || '#6366f1'
          const siteUrl = subdomainUrl(p.slug)
          const daysLeft = getDaysLeft(p, Auth.user?.plan || 'free')
          const expired = isExpired(p, Auth.user?.plan || 'free')
          return `<div class="site-card card" data-site-status="${p.published?'published':'draft'}">
            <div class="site-card-preview" style="background:linear-gradient(135deg,${tc}cc,${tc}66)">
              <span class="initial">${(p.title||'S').charAt(0).toUpperCase()}</span>
              <span class="view-badge">${ICONS.wrap(ICONS.eye,13)} ${p.views||0}</span>
              ${(Auth.user?.plan||'free')==='free'?`<span class="view-badge" style="${expired?'background:#dc2626;color:#fff':'background:#f59e0b;color:#fff'};right:auto;left:12px">${expired?'منتهي ⏳':`متبقي ${daysLeft} يوم`}</span>`:''}
            </div>
            <div class="site-card-body">
              <h3>${p.title}</h3>
              <span class="site-url">${siteUrl}</span>
              <div class="site-meta">
                <span class="status-badge ${p.published?'status-published':'status-draft'}">${p.published?(isAr?'منشور':'Published'):(isAr?'مسودة':'Draft')}</span>
                <span style="font-size:.78rem;color:var(--gray-400)">${new Date(p.createdAt||p.created_at||p.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div class="site-card-actions">
              <a href="#/builder/${p.id}" class="btn btn-primary btn-sm">${ICONS.wrap(ICONS.pencil,14)} ${isAr ? 'تعديل' : 'Edit'}</a>
              ${p.published?`<a href="${siteUrl}" target="_blank" class="btn btn-outline btn-sm">${ICONS.wrap(ICONS.external,14)} ${isAr ? 'معاينة' : 'View'}</a>`:''}
              <a href="#/submissions/${p.id}" class="btn btn-ghost btn-sm" title="${isAr ? 'الرسائل' : 'Submissions'}">${ICONS.wrap(ICONS.message,15)}</a>
              <a href="#/analytics/${p.id}" class="btn btn-ghost btn-sm" title="${isAr ? 'الإحصائيات' : 'Analytics'}">${ICONS.wrap(ICONS.chart,15)}</a>
              <button class="btn btn-ghost btn-sm" onclick="Dash.remove('${p.id}')" style="color:#dc2626" title="${isAr ? 'حذف' : 'Delete'}">${ICONS.wrap(ICONS.trash,15)}</button>
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
  // Detect subdomain — render public site directly ONLY for explicit subdomains
  const host = window.location.hostname.toLowerCase()
  const mainDomain = (window.MAIN_DOMAIN || 'siteflow.vexonet.online').toLowerCase()
  let isSubdomain = false
  let targetSlug = ''

  if (host !== mainDomain && host.endsWith('.' + mainDomain)) {
    isSubdomain = true
    targetSlug = sanitizeSlug(host.slice(0, -(mainDomain.length + 1)).replace(/^www\./, ''))
  } else if (host !== 'siteflow.app' && host.endsWith('.siteflow.app')) {
    isSubdomain = true
    targetSlug = sanitizeSlug(host.slice(0, -('.siteflow.app'.length)).replace(/^www\./, ''))
  }

  if (isSubdomain && targetSlug) {
    if (isReservedSlug(targetSlug)) {
      // Reserved subdomain — redirect to main platform domain
      window.location.href = `https://${mainDomain}/`
      return
    }

    document.querySelector('.app-header')?.classList.add('hidden')
    const app = document.getElementById('app')
    if (app) app.innerHTML = T.loading()
    try {
      const site = await API.getPublicPage(targetSlug)
      if (site && site.published) {
        document.title = site.seo?.title || site.title
        app.innerHTML = T.publicPage(site)
        Router._bindPublicContactForm(targetSlug)
        Router._bindPublicAiChat(site)
        if (API.mode !== 'local') {
          try { await API._fetch('/p/' + targetSlug + '/view', { method: 'POST', body: JSON.stringify({ ip: '', ua: navigator.userAgent }) }) } catch (e) {}
        }
        LocalDB.incrementViews(targetSlug)
        return
      }
    } catch {}
    if (app) app.innerHTML = T.notFound('الموقع غير منشور بعد', 'تأكد من كتابة رابط الموقع الصحيح أو نشر الموقع من لوحة التحكم.')
    return
  }

  const app = document.getElementById('app')
  if (app) app.innerHTML = T.loading()
  await Auth.init()
  Router.init()
  if (typeof Notif !== 'undefined') Notif.init()

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
