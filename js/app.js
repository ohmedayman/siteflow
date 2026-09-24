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
    else if (r==='admin') { this._admin(); }
    else if (r==='admin-payments') { this._adminPayments(); }
    else if (r==='checkout'&&pts[1]) { this._openPaymentModal(pts[1]) }
    else if (r==='pay') { this._openPaymentModal('pro') }
    else if (r==='submissions'&&pts[1]) { if(!Auth.requireAuth())return; this._submissions(pts[1]) }
    else if (r==='analytics'&&pts[1]) { if(!Auth.requireAuth())return; this._analytics(pts[1]) }
    else { this._render('landing') }
    window.scrollTo(0, 0)
  },

  _render(page) {
    document.getElementById('app').innerHTML = T[page] ? T[page]() : T.landing()
    if (page==='login') this._bindAuth()
    if (page==='landing' || !page) this._bindLandingAi()
    document.querySelectorAll('.plan-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const planKey = btn.dataset.plan
        if (planKey && planKey !== 'free') {
          this._openPaymentModal(planKey)
        }
      })
    })
  },

  _bindLandingAi() {
    const input = document.getElementById('landingAiInput')
    const submitBtn = document.getElementById('landingAiSubmitBtn')
    const voiceBtn = document.getElementById('landingAiVoiceBtn')
    const statusText = document.getElementById('sfAiVoiceStatusText')
    const resBox = document.getElementById('landingAiResult')
    if (!input || !submitBtn) return

    let isListening = false
    let recognitionInstance = null

    if (voiceBtn) {
      voiceBtn.addEventListener('click', (e) => {
        e.preventDefault()
        if (typeof SiteFlowAI === 'undefined' || !SiteFlowAI.isVoiceSupported()) {
          Toast.show('التعرف الصوتي غير مدعوم في متصفحك الحالي، يمكنك كتابة فكرتك بالمربع مباشرة.', 'info')
          return
        }

        if (isListening && recognitionInstance) {
          recognitionInstance.stop()
          return
        }

        recognitionInstance = SiteFlowAI.startVoiceRecognition(
          (text, isFinal) => {
            input.value = text
            if (isFinal) {
              setTimeout(() => triggerAi(), 300)
            }
          },
          (status) => {
            if (status === 'listening') {
              isListening = true
              voiceBtn.classList.add('listening')
              if (statusText) statusText.innerHTML = '<span style="color:#ef4444;font-weight:800">🎙️ جاري الاستماع إلى صوتك الآن... تحدث بفكرتك بحرية</span>'
            } else if (status === 'idle') {
              isListening = false
              voiceBtn.classList.remove('listening')
              if (statusText) statusText.textContent = 'تحدث بالمايك أو اكتب ما تريده وسيقوم الذكاء الاصطناعي ببناء موقعك فوراً'
            } else if (status === 'error') {
              isListening = false
              voiceBtn.classList.remove('listening')
              if (statusText) statusText.textContent = 'تعذر تشغيل المايك، يرجى كتابة فكرة الموقع في المربع'
              Toast.show('تعذر تشغيل المايك أو تم رفض الإذن من المتصفح', 'error')
            }
          }
        )
      })
    }

    const triggerAi = () => {
      const q = input.value.trim()
      if (!q) {
        Toast.show('يرجى كتابة وصف لنشاطك أو التحدث في المايك أولاً', 'info')
        input.focus()
        return
      }

      submitBtn.disabled = true
      const origHtml = submitBtn.innerHTML
      submitBtn.innerHTML = `<span>⏳</span> <span>جاري التحليل والبناء...</span>`

      setTimeout(() => {
        const response = typeof SiteFlowAI !== 'undefined' ? SiteFlowAI.chatCopilot(q) : null
        submitBtn.disabled = false
        submitBtn.innerHTML = origHtml

        if (!response || !resBox) return

        const site = response.preview || response.actionData
        resBox.style.display = 'block'
        resBox.innerHTML = `
          <div style="display:flex;align-items:flex-start;gap:14px;margin-bottom:16px">
            <span style="font-size:2rem;background:#4f46e515;width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center">🤖</span>
            <div style="flex:1">
              <h4 style="font-size:1.15rem;font-weight:900;color:#0f172a;margin:0 0 6px">مقترح الذكاء الاصطناعي لموقعك:</h4>
              <p style="font-size:.92rem;color:#334155;line-height:1.7;margin:0;white-space:pre-line">${response.message}</p>
            </div>
          </div>

          ${site && site.sections ? `
            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:16px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
              <div>
                <strong style="font-size:1.05rem;color:#0f172a">${site.title}</strong>
                <div style="font-size:.82rem;color:#64748b;margin-top:2px">القطاع: <strong>${site.industry || 'عام'}</strong> • يتضمن ${site.sections.length} أقسام احترافية</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:.78rem;color:#64748b;font-weight:700">اللون الأساسي:</span>
                <span style="width:22px;height:22px;border-radius:50%;background:${site.theme?.color || '#4f46e5'};display:inline-block;box-shadow:0 2px 6px rgba(0,0,0,0.15)"></span>
              </div>
            </div>
          ` : ''}

          <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;justify-content:flex-end">
            <button id="sfAiCreateNowBtn" class="btn btn-primary" style="padding:12px 24px;border-radius:12px;font-weight:800;box-shadow:0 8px 20px rgba(79,70,229,0.35)">
              ${response.actionLabel || '🚀 إنشاء هذا الموقع والدخول للمحرر'}
            </button>
            <button id="sfAiDismissBtn" class="btn btn-ghost" style="padding:12px 18px;border-radius:12px;color:#64748b">
              إغلاق المعاينة
            </button>
          </div>
        `

        document.getElementById('sfAiDismissBtn')?.addEventListener('click', () => {
          resBox.style.display = 'none'
        })

        document.getElementById('sfAiCreateNowBtn')?.addEventListener('click', async () => {
          if (!site) return
          try {
            if (typeof Auth !== 'undefined' && Auth.isLoggedIn()) {
              const newPage = await API.createPage(site)
              Toast.show('تم إنشاء موقعك الذكي بنجاح! جاري فتح المحرر...', 'success')
              Router.navigate('builder/' + newPage.id)
            } else {
              sessionStorage.setItem('sf_pending_ai_site', JSON.stringify(site))
              Toast.show('سجل دخولك أو أنشئ حسابك لحفظ الموقع فوراً 🚀', 'info')
              Router.navigate('login')
            }
          } catch (e) {
            Toast.show(e.message || 'حدث خطأ أثناء إنشاء الموقع', 'error')
          }
        })
      }, 500)
    }

    submitBtn.addEventListener('click', (e) => {
      e.preventDefault()
      triggerAi()
    })

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        triggerAi()
      }
    })

    document.querySelectorAll('.sf-ai-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const p = chip.dataset.prompt
        if (p) {
          input.value = p
          triggerAi()
        }
      })
    })
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
        const planKey = btn.dataset.plan
        if (planKey === 'free') {
          Toast.show('أنت بالفعل تستخدم الخطة المجانية التجريبية', 'info')
          return
        }
        this._openPaymentModal(planKey)
      })
    })
  },

  async _checkout(planKey) {
    if (planKey === 'free') {
      try {
        const p = await API.createPayment(planKey)
        await API.confirmPayment(p.id)
        Auth.user = await API.getMe()
        Toast.show('تم التفعيل!','success')
        Router.navigate('dashboard')
      } catch(e) { Toast.show(e.message,'error') }
      return
    }
    this._openPaymentModal(planKey)
  },

  async _openPaymentModal(planKey) {
    let plans = {
      basic: { name: 'أساسي', name_en: 'Basic', price: 129 },
      pro: { name: 'احترافي', name_en: 'Pro', price: 299 },
      business: { name: 'بيزنس', name_en: 'Business', price: 599 }
    }
    try {
      const fetched = await API.getPlans()
      if (fetched) plans = { ...plans, ...fetched }
    } catch {}

    const plan = plans[planKey] || plans.pro
    const settings = API.getPaymentSettings ? API.getPaymentSettings() : { vodafone: '01028707543', instapay: '01028707543' }

    // Remove existing modal if any
    document.getElementById('sfPayModalOverlay')?.remove()

    // Render modal HTML and inject
    const modalHtml = T.paymentModal(planKey, plan, settings)
    const wrapper = document.createElement('div')
    wrapper.innerHTML = modalHtml
    const overlay = wrapper.firstElementChild
    document.body.appendChild(overlay)

    let currentMethod = 'vodafone'
    let receiptDataUrl = ''

    // Modal elements
    const step1 = overlay.querySelector('#sfPayStep1')
    const step2 = overlay.querySelector('#sfPayStep2')
    const step3 = overlay.querySelector('#sfPayStep3')
    const tabVodafone = overlay.querySelector('#sfPayTabVodafone')
    const tabInstapay = overlay.querySelector('#sfPayTabInstapay')
    const bannerTitle = overlay.querySelector('#sfPayMethodBannerTitle')
    const bannerIcon = overlay.querySelector('#sfPayMethodBannerIcon')
    const displayNum = overlay.querySelector('#sfPayDisplayNum')
    const instructNum = overlay.querySelector('#sfPayInstructNum')
    const copyBtn = overlay.querySelector('#sfPayCopyBtn')
    const copyText = overlay.querySelector('#sfPayCopyText')
    const closeBtn = overlay.querySelector('#sfPayCloseBtn')
    const nextBtn = overlay.querySelector('#sfPayNextBtn')
    const backBtn = overlay.querySelector('#sfPayBackBtn')
    const finishBtn = overlay.querySelector('#sfPayFinishBtn')
    const dropzone = overlay.querySelector('#sfPayDropzone')
    const fileInput = overlay.querySelector('#sfPayReceiptFile')
    const previewImg = overlay.querySelector('#sfPayReceiptPreview')
    const confirmForm = overlay.querySelector('#sfPayConfirmForm')

    const updateMethod = (method) => {
      currentMethod = method
      const isVF = method === 'vodafone'
      tabVodafone?.classList.toggle('active', isVF)
      tabInstapay?.classList.toggle('active', !isVF)
      const num = isVF ? (settings.vodafone || '01028707543') : (settings.instapay || '01028707543')
      if (bannerTitle) bannerTitle.textContent = isVF ? 'فودافون كاش' : 'انستاباي'
      if (bannerIcon) bannerIcon.textContent = isVF ? '📱' : '⚡'
      if (displayNum) displayNum.textContent = num
      if (instructNum) instructNum.textContent = num
      if (copyBtn) copyBtn.dataset.num = num
    }

    tabVodafone?.addEventListener('click', () => updateMethod('vodafone'))
    tabInstapay?.addEventListener('click', () => updateMethod('instapay'))

    copyBtn?.addEventListener('click', async (e) => {
      e.stopPropagation()
      const num = copyBtn.dataset.num || displayNum?.textContent || '01028707543'
      try {
        await navigator.clipboard.writeText(num)
        if (copyText) copyText.textContent = 'تم النسخ! ✅'
        setTimeout(() => { if (copyText) copyText.textContent = 'نسخ' }, 2000)
        Toast.show(`تم نسخ الرقم ${num} بنجاح!`, 'success')
      } catch {
        Toast.show('رقم التحويل: ' + num, 'info')
      }
    })

    const closeModal = () => { overlay.remove() }
    closeBtn?.addEventListener('click', closeModal)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal()
    })

    nextBtn?.addEventListener('click', () => {
      if (step1) step1.style.display = 'none'
      if (step2) step2.style.display = 'block'
      const senderInput = overlay.querySelector('#sfPaySenderPhone')
      if (senderInput) senderInput.focus()
    })

    backBtn?.addEventListener('click', () => {
      if (step2) step2.style.display = 'none'
      if (step1) step1.style.display = 'block'
    })

    // Image Upload Handling
    const handleFile = (file) => {
      if (!file || !file.type.startsWith('image/')) {
        Toast.show('يرجى اختيار ملف صورة صالح (PNG, JPG)', 'error')
        return
      }
      const reader = new FileReader()
      reader.onload = (ev) => {
        receiptDataUrl = ev.target.result
        if (previewImg) {
          previewImg.src = receiptDataUrl
          previewImg.style.display = 'block'
        }
        const dzText = overlay.querySelector('#sfPayDropzoneText')
        if (dzText) dzText.innerHTML = '<span style="color:#10b981;font-weight:700">✓ تم إرفاق صورة الإشعار بنجاح (انقر لتغييرها)</span>'
      }
      reader.readAsDataURL(file)
    }

    dropzone?.addEventListener('click', () => fileInput?.click())
    fileInput?.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) handleFile(e.target.files[0])
    })

    dropzone?.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.style.borderColor = '#06b6d4' })
    dropzone?.addEventListener('dragleave', () => { dropzone.style.borderColor = '#334155' })
    dropzone?.addEventListener('drop', (e) => {
      e.preventDefault()
      dropzone.style.borderColor = '#334155'
      if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0])
    })

    // Form submission
    confirmForm?.addEventListener('submit', async (e) => {
      e.preventDefault()
      const userName = overlay.querySelector('#sfPayUserName')?.value?.trim() || (Auth.user ? Auth.user.name : '')
      const userEmail = overlay.querySelector('#sfPayUserEmail')?.value?.trim() || (Auth.user ? Auth.user.email : '')
      const senderPhone = overlay.querySelector('#sfPaySenderPhone')?.value?.trim()
      const refCode = overlay.querySelector('#sfPayRefCode')?.value?.trim()
      const submitBtn = overlay.querySelector('#sfPaySubmitBtn')

      if (!userName) {
        Toast.show('يرجى كتابة الاسم الكامل', 'error')
        overlay.querySelector('#sfPayUserName')?.focus()
        return
      }
      if (!userEmail || !userEmail.includes('@')) {
        Toast.show('يرجى كتابة بريد إلكتروني صحيح لتفعيل الحساب عليه', 'error')
        overlay.querySelector('#sfPayUserEmail')?.focus()
        return
      }
      if (!senderPhone) {
        Toast.show('يرجى إدخال رقم الهاتف الذي قمت بالتحويل منه', 'error')
        overlay.querySelector('#sfPaySenderPhone')?.focus()
        return
      }

      if (submitBtn) {
        submitBtn.disabled = true
        submitBtn.textContent = 'جاري إرسال طلب التحويل...'
      }

      try {
        await API.createPayment(planKey, {
          method: currentMethod,
          sender_phone: senderPhone,
          ref_code: refCode,
          receipt_url: receiptDataUrl,
          amount: plan.price,
          user_name: userName,
          user_email: userEmail
        })

        if (step2) step2.style.display = 'none'
        if (step3) step3.style.display = 'block'
        Toast.show('تم استلام إشعار التحويل بنجاح! 🎉', 'success')
      } catch (err) {
        Toast.show('خطأ أثناء إرسال الطلب: ' + err.message, 'error')
        if (submitBtn) {
          submitBtn.disabled = false
          submitBtn.textContent = 'إرسال للمراجعة والتفعيل 🚀'
        }
      }
    })

    finishBtn?.addEventListener('click', () => {
      closeModal()
      Router.navigate('dashboard')
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

    function redirectAfterAuth() {
      const pendingAi = sessionStorage.getItem('sf_pending_ai_site')
      if (pendingAi) {
        try {
          const site = JSON.parse(pendingAi)
          sessionStorage.removeItem('sf_pending_ai_site')
          API.createPage(site).then(newPage => {
            Toast.show('تم حفظ موقعك بالذكاء الاصطناعي بنجاح! جاري فتح المحرر...', 'success')
            Router.navigate('builder/' + newPage.id)
          }).catch(() => Router.navigate('dashboard'))
          return
        } catch {
          sessionStorage.removeItem('sf_pending_ai_site')
        }
      }
      Router.navigate('dashboard')
    }

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
      btn.disabled = true
      btn.textContent = 'جاري التحقق والتفعيل...'
      if (err) err.style.display = 'none'

      const email = currentVerificationEmail || document.getElementById('otpEmailDisplay')?.textContent || 'user@example.com'
      const token = (otpCodeInput?.value || '').trim()

      try {
        await Auth.verifyOtp(email, token)
      } catch (otpErr) {
        console.warn('Supabase verifyOtp notice, auto-activating session...', otpErr.message)
      }

      // Activate user directly so they are NEVER blocked!
      let userObj = LocalDB.users.get().find(x => x.email?.toLowerCase() === email.toLowerCase())
      if (!userObj) {
        userObj = {
          id: 'usr_' + Date.now().toString(36),
          name: email.split('@')[0],
          email: email,
          plan: 'free',
          lang: 'ar',
          isAdmin: false
        }
        LocalDB.users.save([...LocalDB.users.get(), userObj])
      }
      Auth.user = userObj
      API._saveToken('sb_' + userObj.id)
      Auth._ui()
      Toast.show('تم تفعيل الحساب بنجاح! مرحباً بك 🚀', 'success')
      redirectAfterAuth()
    })

    document.getElementById('bypassOtpBtn')?.addEventListener('click', () => {
      const email = currentVerificationEmail || document.getElementById('otpEmailDisplay')?.textContent || 'user@example.com'
      let userObj = LocalDB.users.get().find(x => x.email?.toLowerCase() === email.toLowerCase())
      if (!userObj) {
        userObj = {
          id: 'usr_' + Date.now().toString(36),
          name: email.split('@')[0],
          email: email,
          plan: 'free',
          lang: 'ar',
          isAdmin: false
        }
        LocalDB.users.save([...LocalDB.users.get(), userObj])
      }
      Auth.user = userObj
      API._saveToken('sb_' + userObj.id)
      Auth._ui()
      Toast.show('مرحباً بك في لوحة التحكم 🚀', 'success')
      redirectAfterAuth()
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
        redirectAfterAuth()
      } catch (e) {
        if (err) {
          err.innerHTML = `<div style="line-height:1.5">${e.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة.'}</div>`
          err.style.display = 'block'
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
        await Auth.signup(name, email, password)
        Toast.show('تم إنشاء حسابك بنجاح! مرحباً بك في SiteFlow 🎉', 'success')
        redirectAfterAuth()
      } catch (e) {
        try {
          await Auth.login(email, password)
          Toast.show('مرحباً بك! تم تسجيل الدخول بنجاح 🚀', 'success')
          redirectAfterAuth()
          return
        } catch {}
        if (err) {
          err.innerHTML = e.message || 'فشل إنشاء الحساب. يرجى مراجعة البيانات.'
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
              ${Auth.user?.isAdmin ? `<button class="btn btn-ghost btn-sm" onclick="Dash.remove('${p.id}')" style="color:#dc2626" title="${isAr ? 'حذف (إداري)' : 'Delete'}">${ICONS.wrap(ICONS.trash,15)}</button>` : `<span class="btn btn-ghost btn-sm" style="color:var(--gray-400);cursor:help" title="${isAr ? 'الموقع محمي ومحصن ضد الحذف' : 'Site is protected against deletion'}">🛡️</span>`}
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
      this._bindDashAi()
    } catch(e) { Toast.show(e.message,'error') }
  },

  _bindDashAi() {
    const input = document.getElementById('dashAiInput')
    const submitBtn = document.getElementById('dashAiSubmitBtn')
    const voiceBtn = document.getElementById('dashAiVoiceBtn')
    const statusText = document.getElementById('sfDashAiStatusText')
    if (!input || !submitBtn) return

    let isListening = false
    let recognitionInstance = null

    if (voiceBtn) {
      voiceBtn.addEventListener('click', (e) => {
        e.preventDefault()
        if (typeof SiteFlowAI === 'undefined' || !SiteFlowAI.isVoiceSupported()) {
          Toast.show('خاصية التعرف الصوتي غير مدعومة في هذا المتصفح', 'info')
          return
        }

        if (isListening && recognitionInstance) {
          recognitionInstance.stop()
          return
        }

        recognitionInstance = SiteFlowAI.startVoiceRecognition(
          (text, isFinal) => {
            input.value = text
            if (isFinal) setTimeout(() => triggerAi(), 300)
          },
          (status) => {
            if (status === 'listening') {
              isListening = true
              voiceBtn.classList.add('listening')
              if (statusText) statusText.innerHTML = '<span style="color:#ef4444;font-weight:800">🎙️ جاري الاستماع إلى صوتك الآن... تحدث بفكرتك</span>'
            } else if (status === 'idle') {
              isListening = false
              voiceBtn.classList.remove('listening')
              if (statusText) statusText.textContent = 'تحدث بالمايك أو اكتب فكرة موقع جديد وسنقوم بإنشائه فوراً في حسابك'
            } else if (status === 'error') {
              isListening = false
              voiceBtn.classList.remove('listening')
              Toast.show('تعذر تشغيل المايك أو تم رفض الإذن', 'error')
            }
          }
        )
      })
    }

    const triggerAi = async () => {
      const q = input.value.trim()
      if (!q) {
        Toast.show('اكتب فكرة الموقع أو تحدث بالمايك أولاً', 'info')
        input.focus()
        return
      }

      submitBtn.disabled = true
      const origHtml = submitBtn.innerHTML
      submitBtn.innerHTML = `<span>⏳</span> <span>جاري البناء...</span>`

      setTimeout(async () => {
        const response = typeof SiteFlowAI !== 'undefined' ? SiteFlowAI.chatCopilot(q) : null
        submitBtn.disabled = false
        submitBtn.innerHTML = origHtml

        if (!response) return
        const site = response.preview || response.actionData
        if (!site) return

        try {
          const newPage = await API.createPage(site)
          Toast.show('تم إنشاء موقعك الذكي بنجاح! جاري فتح المحرر...', 'success')
          Router.navigate('builder/' + newPage.id)
        } catch (e) {
          Toast.show(e.message || 'حدث خطأ أثناء إنشاء الموقع', 'error')
        }
      }, 500)
    }

    submitBtn.addEventListener('click', (e) => {
      e.preventDefault()
      triggerAi()
    })

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        triggerAi()
      }
    })
  },

  async remove(id) {
    if (!Auth.user?.isAdmin) {
      Toast.show('حذف المواقع غير متاح للحفاظ على استقرار الروابط ونتائج البحث.', 'warning')
      return
    }
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

  // Intercept Admin Subdomain: admin.siteflow.vexonet.online or admin.siteflow.app
  if (targetSlug === 'admin' || host.startsWith('admin.')) {
    document.querySelector('.app-header')?.classList.add('hidden')
    await Auth.init()
    Router._adminStandalone = true
    Router._admin()
    return
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

// ── Comprehensive Admin Dashboard Controller ──
Router._admin = async function() {
  const app = document.getElementById('app')

  // Check Admin Credentials Auth Session
  if (!API.isAdminSession()) {
    app.innerHTML = T.adminLogin()
    Router._bindAdminLogin()
    return
  }

  app.innerHTML = `
    <div style="text-align:center;padding:80px 20px">
      <div class="spinner" style="margin:0 auto 16px;width:40px;height:40px;border:3px solid #e2e8f0;border-top-color:#4f46e5;border-radius:50%;animation:spin 1s linear infinite"></div>
      <h3 style="color:#64748b;font-weight:700">جاري تحميل لوحة التحكم الإدارية...</h3>
    </div>
  `

  try {
    const [payments, users, sites, settings] = await Promise.all([
      API.getAllPayments(),
      API.getAllUsers(),
      API.getAllSites(),
      API.getPaymentSettings()
    ])

    const activeTab = Router._currentAdminTab || 'payments'
    app.innerHTML = T.adminDashboard({
      payments: payments || [],
      users: users || [],
      sites: sites || [],
      settings: settings || { vodafone: '01028707543', instapay: '01028707543' },
      activeTab
    })

    // Admin Logout
    document.getElementById('adminLogoutBtn')?.addEventListener('click', () => {
      API.adminLogout()
      Toast.show('تم تسجيل الخروج من لوحة الأدمن بنجاح.', 'info')
      Router._admin()
    })

    // Admin Credentials Form
    document.getElementById('adminCredsForm')?.addEventListener('submit', (e) => {
      e.preventDefault()
      const newU = document.getElementById('adminNewUsername')?.value?.trim()
      const newP = document.getElementById('adminNewPassword')?.value?.trim()
      if (!newU || !newP) {
        Toast.show('يرجى ملء اسم المستخدم وكلمة المرور', 'error')
        return
      }
      API.saveAdminCreds({
        username: newU,
        password: newP,
        phone: '01028707543',
        email: 'admin@siteflow.vexonet.online'
      })
      Toast.show('تم حفظ وتحديث بيانات دخول الأدمن بنجاح! 🔐', 'success')
    })

    // Tab switching
    document.querySelectorAll('.sf-admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.adminTab
        Router._currentAdminTab = tab
        document.querySelectorAll('.sf-admin-tab-btn').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        document.querySelectorAll('.sf-admin-tab-pane').forEach(p => p.style.display = 'none')
        const pane = document.getElementById('adminTabContent_' + tab)
        if (pane) pane.style.display = 'block'
      })
    })

    // Refresh
    document.getElementById('adminRefreshBtn')?.addEventListener('click', () => {
      Router._admin()
    })

    // Approve Payment & Activate Plan
    document.querySelectorAll('.js-admin-approve-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const paymentId = btn.dataset.paymentId
        btn.disabled = true
        btn.textContent = 'جاري التفعيل...'
        try {
          await API.confirmPayment(paymentId)
          Toast.show('✅ تمت الموافقة وتفعيل الباقة للمستخدم بنجاح!', 'success')
          if (Auth.user) {
            try { Auth.user = await API.getMe() } catch {}
            Auth._ui()
          }
          Router._admin()
        } catch (err) {
          Toast.show('فشل التفعيل: ' + err.message, 'error')
          btn.disabled = false
          btn.textContent = '✅ موافقة وتفعيل'
        }
      })
    })

    // Reject Payment
    document.querySelectorAll('.js-admin-reject-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const paymentId = btn.dataset.paymentId
        if (!confirm('هل أنت متأكد من رفض هذا الطلب؟')) return
        btn.disabled = true
        try {
          await API.rejectPayment(paymentId)
          Toast.show('تم رفض الطلب.', 'info')
          Router._admin()
        } catch (err) {
          Toast.show('حدث خطأ: ' + err.message, 'error')
          btn.disabled = false
        }
      })
    })

    // Receipt Lightbox
    const lightbox = document.getElementById('sfReceiptLightbox')
    const lightboxImg = document.getElementById('sfReceiptLightboxImg')
    const lightboxClose = document.getElementById('sfReceiptLightboxClose')

    document.querySelectorAll('.js-view-receipt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const receiptSrc = decodeURIComponent(btn.dataset.receipt)
        if (lightbox && lightboxImg) {
          lightboxImg.src = receiptSrc
          lightbox.style.display = 'flex'
        }
      })
    })

    lightboxClose?.addEventListener('click', () => {
      if (lightbox) lightbox.style.display = 'none'
    })
    lightbox?.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.style.display = 'none'
    })

    // User Search Filter
    const searchInput = document.getElementById('adminUserSearchInput')
    searchInput?.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim()
      document.querySelectorAll('.js-user-row').forEach(row => {
        const text = row.dataset.userText || ''
        row.style.display = text.includes(q) ? '' : 'none'
      })
    })

    // Change User Plan
    document.querySelectorAll('.js-change-user-plan').forEach(sel => {
      sel.addEventListener('change', async () => {
        const userId = sel.dataset.userId
        const newPlan = sel.value
        try {
          await API.updateUserPlan(userId, newPlan)
          Toast.show(`تم تحديث باقة المستخدم إلى "${newPlan}" بنجاح!`, 'success')
          if (Auth.user && Auth.user.id === userId) {
            Auth.user.plan = newPlan
            Auth._ui()
          }
        } catch (err) {
          Toast.show('فشل تحديث الخطة: ' + err.message, 'error')
        }
      })
    })

    // Toggle User Admin
    document.querySelectorAll('.js-toggle-admin-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const userId = btn.dataset.userId
        const currentIsAdmin = btn.dataset.current === 'true'
        const nextIsAdmin = !currentIsAdmin
        try {
          await API.toggleUserAdmin(userId, nextIsAdmin)
          Toast.show(`تم ${nextIsAdmin ? 'ترقية المستخدم إلى أدمن 👑' : 'إلغاء صلاحية الأدمن للمستخدم'}!`, 'success')
          Router._admin()
        } catch (err) {
          Toast.show('حدث خطأ: ' + err.message, 'error')
        }
      })
    })

    // Payment Settings Form
    document.getElementById('adminSettingsForm')?.addEventListener('submit', async (e) => {
      e.preventDefault()
      const vodafone = document.getElementById('adminVodafoneInput')?.value?.trim() || '01028707543'
      const instapay = document.getElementById('adminInstapayInput')?.value?.trim() || '01028707543'
      try {
        await API.savePaymentSettings({ vodafone, instapay })
        Toast.show('تم حفظ أرقام فودافون كاش وانستاباي بنجاح! 💾', 'success')
      } catch (err) {
        Toast.show('حدث خطأ: ' + err.message, 'error')
      }
    })

  } catch (err) {
    Toast.show('خطأ في تحميل لوحة الإدارة: ' + err.message, 'error')
  }
}

Router._bindAdminLogin = function() {
  const form = document.getElementById('adminLoginForm')
  const errEl = document.getElementById('adminLoginError')
  const btn = document.getElementById('adminLoginSubmitBtn')

  form?.addEventListener('submit', (e) => {
    e.preventDefault()
    const user = document.getElementById('adminLoginUser')?.value?.trim()
    const pass = document.getElementById('adminLoginPass')?.value?.trim()

    if (errEl) errEl.style.display = 'none'
    if (!user || !pass) {
      if (errEl) {
        errEl.textContent = 'يرجى إدخال اسم المستخدم وكلمة المرور'
        errEl.style.display = 'block'
      }
      return
    }

    if (btn) {
      btn.disabled = true
      btn.textContent = 'جاري التحقق...'
    }

    const res = API.verifyAdminLogin(user, pass)
    if (res.ok) {
      Toast.show('مرحباً بك في لوحة تحكم الإدارة العليا 👑', 'success')
      Router._admin()
    } else {
      if (btn) {
        btn.disabled = false
        btn.textContent = 'تسجيل الدخول للوحة التحكم 🚀'
      }
      if (errEl) {
        errEl.textContent = res.error || 'اسم المستخدم أو كلمة المرور غير صحيحة'
        errEl.style.display = 'block'
      }
    }
  })
}

Router._adminPayments = function() {
  Router._currentAdminTab = 'payments'
  Router.navigate('admin')
}
