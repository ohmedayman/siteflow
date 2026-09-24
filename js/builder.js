const Builder = {
  page: null, editingIdx: 0, mobileMode: false, siteId: null,
  undoStack: [], redoStack: [], dragSrc: null, dragOver: null, autoSaveTimer: null,

  _pushUndo() {
    this.undoStack.push(JSON.parse(JSON.stringify(this.page.sections)))
    this.redoStack = []
    if (this.undoStack.length > 50) this.undoStack.shift()
  },
  _undo() {
    if (!this.undoStack.length) return
    this.redoStack.push(JSON.parse(JSON.stringify(this.page.sections)))
    this.page.sections = this.undoStack.pop()
    if (this.editingIdx >= this.page.sections.length) this.editingIdx = Math.max(0, this.page.sections.length - 1)
    this._render(); Toast.show('Undo','info')
  },
  _redo() {
    if (!this.redoStack.length) return
    this.undoStack.push(JSON.parse(JSON.stringify(this.page.sections)))
    this.page.sections = this.redoStack.pop()
    if (this.editingIdx >= this.page.sections.length) this.editingIdx = Math.max(0, this.page.sections.length - 1)
    this._render(); Toast.show('Redo','info')
  },

  async load(id) {
    if (!Auth.requireAuth()) return
    this.siteId = id
    try {
      this.page = await API.getSite(id)
      if (!this.page) throw new Error('Site not found')
      if (!this.page.theme) this.page.theme = { color: '#6366f1', font: 'Inter', bgColor: '#ffffff', textColor: '#111827' }
      if (!this.page.seo) this.page.seo = { title: '', description: '', keywords: '' }
      if (!this.page.apps) this.page.apps = (this.page.seo?.apps || {})
      this.editingIdx = 0; this.mobileMode = false; this.undoStack = []; this.redoStack = []
      this.render()
    } catch (e) { Toast.show(e.message, 'error'); Router.navigate('dashboard') }
  },

  render() {
    document.getElementById('app').innerHTML = T.builder(this.page)
    this._render()
  },

  _render() {
    this._renderSections()
    this._renderCanvas()
    this._updateSeoPreview()
    this._initDrag()
    this.bindAll()
  },

  _renderSections() {
    const list = document.getElementById('sectionList')
    if (!list) return
    const icons = { hero: ICONS.home, about: ICONS.user, gallery: ICONS.image, contact: ICONS.mail, services: ICONS.briefcase, testimonials: ICONS.message, pricing: ICONS.dollar, faq: ICONS.helpCircle, team: ICONS.users, footer: ICONS.file, cta: ICONS.target, features: ICONS.sparkles, stats: ICONS.chart, menu: ICONS.utensils, location: ICONS.mapPin, hours: ICONS.clock, blog: ICONS.pen, portfolio: ICONS.folder, counters: ICONS.chart, timeline: ICONS.calendar }
    const names = { hero: 'الواجهة الرئيسية (Hero)', about: 'من نحن (About)', gallery: 'معرض الصور', contact: 'تواصل معنا', services: 'الخدمات والمنتجات', testimonials: 'آراء العملاء', pricing: 'خطط الأسعار', faq: 'الأسئلة الشائعة', team: 'فريق العمل', footer: 'التذييل (Footer)', cta: 'دعوة لاتخاذ إجراء (CTA)', features: 'المميزات الرئيسية', stats: 'الإحصائيات بالأرقام', menu: 'قائمة الطعام / المنتجات', location: 'الموقع والخريطة', hours: 'ساعات العمل', blog: 'المقالات والأخبار', portfolio: 'معرض الأعمال', counters: 'عدادات الأرقام', timeline: 'مسيرة الشركة' }
    const descs = { hero: 'العنوان الرئيسي والصورة والزر التفاعلي', about: 'نبذة عن شركتك ورسالتكم', gallery: 'شبكة صور عالية الجودة', contact: 'نموذج اتصل بنا ومعلومات التواصل', services: 'عروض خدماتك بطريقة جذابة', testimonials: 'تقييمات وآراء مشجعيك', pricing: 'باقات وأسعار اشتراكاتك', faq: 'إجابات على أسئلة العملاء', team: 'أعضاء ومؤسسي المشروع', footer: 'حقوق النشر والروابط السريعة', cta: 'زر قوي لزيادة التحويلات', features: 'أبرز نقاط قوة منتجك', stats: 'أرقام وإنجازات موثقة', menu: 'عرض الأطباق والأسعار', location: 'موقعك التجاري وهاتفك', hours: 'مواعيد الاستقبال والدوام' }

    list.innerHTML = this.page.sections.map((s, i) => `
      <div class="section-item ${i === this.editingIdx ? 'active' : ''}" data-index="${i}" draggable="true" data-type="${s.type}">
        <div class="drag-handle" title="اسحب لإعادة الترتيب">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="8" cy="6" r="1"/><circle cx="16" cy="6" r="1"/><circle cx="8" cy="12" r="1"/><circle cx="16" cy="12" r="1"/><circle cx="8" cy="18" r="1"/><circle cx="16" cy="18" r="1"/></svg>
        </div>
        <div class="section-item-icon" style="background:${i === this.editingIdx ? 'var(--primary-light)' : 'var(--gray-100)'}">${icons[s.type] || ICONS.file}</div>
        <div class="section-item-info">
          <h4>${names[s.type] || s.type}</h4>
          <p>${descs[s.type] || 'قسم مخصص'}</p>
          <div style="margin-top:5px">
            <button class="sec-layout-pill" data-layout-idx="${i}" title="انقر لتغيير شكل وتصميم القسم" style="background:var(--primary-light, #eef2ff);color:var(--primary, #4f46e5);border:1px solid rgba(99,102,241,0.3);border-radius:12px;padding:2px 8px;font-size:.72rem;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:4px">
              🎨 ${this._getLayoutName(s.type, s.data?.layout)}
            </button>
          </div>
        </div>
        <div class="section-item-actions">
          <button class="move-up-btn" data-up="${i}" title="تحريك لأعلى" ${i === 0 ? 'disabled' : ''}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
          </button>
          <button class="move-down-btn" data-down="${i}" title="تحريك لأسفل" ${i === this.page.sections.length - 1 ? 'disabled' : ''}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <button class="dup-section" data-dup="${i}" title="مضاعفة القسم">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          </button>
          <button class="del-section" data-del="${i}" title="حذف القسم">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
          </button>
        </div>
      </div>`).join('')
  },

  _getLayoutsForType(type) {
    const layoutMap = {
      hero: [
        { id: 'centered', name: 'متمركز كلاسيكي' },
        { id: 'split', name: 'عمودين تفاعلي' },
        { id: 'dark-luxury', name: 'ليلي فخم ومضيء' },
        { id: 'minimal', name: 'هادئ وبسيط' }
      ],
      about: [
        { id: 'classic', name: 'كلاسيكي' },
        { id: 'split', name: 'قصتنا والرؤية' },
        { id: 'cards', name: 'أعمدة وبطاقات تفاعلية' }
      ],
      services: [
        { id: 'grid', name: 'شبكة بطاقات' },
        { id: 'bento', name: 'بينتو جريد حديث' },
        { id: 'list', name: 'قوائم أفقية' }
      ],
      features: [
        { id: 'grid', name: 'شبكة بطاقات' },
        { id: 'bento', name: 'بينتو جريد حديث' },
        { id: 'list', name: 'قوائم أفقية' }
      ],
      menu: [
        { id: 'list', name: 'قائمة طعام تفصيلية' },
        { id: 'cards', name: 'بطاقات الأطباق المصورة' }
      ],
      testimonials: [
        { id: 'grid', name: 'شبكة كلاسيكية' },
        { id: 'stars', name: 'تقييمات خمس نجوم' },
        { id: 'spotlight', name: 'رأي بارز ومميز' }
      ],
      pricing: [
        { id: 'cards', name: 'باقات متساوية' },
        { id: 'featured', name: 'تمييز الباقة الأكثر طلباً' }
      ],
      faq: [
        { id: 'cards', name: 'بطاقات أسئلة' },
        { id: 'accordion', name: 'أكورديون تفاعلي' },
        { id: 'split', name: 'عمودين مع مساعدة فورية' }
      ],
      contact: [
        { id: 'form', name: 'نموذج مباشر' },
        { id: 'split', name: 'عمودين (بيانات ونموذج)' },
        { id: 'direct', name: 'أزرار واتصال سريع' }
      ],
      cta: [
        { id: 'solid', name: 'خلفية ملونة كاملة' },
        { id: 'dark-glow', name: 'ليلي فخم ومضيء' },
        { id: 'boxed', name: 'كارت عائم منفصل' }
      ],
      footer: [
        { id: 'classic', name: 'كلاسيكي متمركز' },
        { id: 'columns', name: 'أعمدة وروابط متعددة' },
        { id: 'minimal', name: 'شريط سفلي بسيط' }
      ]
    }
    return layoutMap[type] || [{ id: 'default', name: 'افتراضي' }]
  },

  _getLayoutName(type, currentId) {
    const list = this._getLayoutsForType(type)
    const match = list.find(l => l.id === currentId)
    return match ? match.name : list[0].name
  },

  _cycleLayout(idx) {
    const s = this.page.sections[idx]
    if (!s) return
    const layouts = this._getLayoutsForType(s.type)
    if (layouts.length <= 1) {
      Toast.show('هذا القسم متوفر بنمط موحد حالياً', 'info')
      return
    }
    if (!s.data) s.data = {}
    const curId = s.data.layout || layouts[0].id
    let curIdx = layouts.findIndex(l => l.id === curId)
    if (curIdx === -1) curIdx = 0
    const nextIdx = (curIdx + 1) % layouts.length
    const nextLayout = layouts[nextIdx]
    this._pushUndo()
    s.data.layout = nextLayout.id
    this.editingIdx = idx
    this._saveNow()
    this._render()
    Toast.show(`تم تبديل شكل وتصميم القسم إلى: "${nextLayout.name}" 🎨✨`, 'success')
  },

  _renderCanvas() {
    const frame = document.getElementById('canvasFrame')
    if (!frame) return
    frame.innerHTML = '<div class="canvas-sections">' + this.page.sections.map((s, i) => {
      const isActive = i === this.editingIdx
      const wrapper = `<div class="canvas-section-wrapper ${isActive ? 'editing' : ''}" data-cidx="${i}">
        <div class="sec-quick-bar">
          <button class="sqb-btn sqb-layout" data-sqb="layout" data-idx="${i}" title="تغيير شكل ونمط القسم" style="font-size:.78rem;padding:4px 10px;font-weight:800;color:var(--primary,#4f46e5);background:#ffffff;border:1px solid #c7d2fe;border-radius:6px;margin-left:4px;display:flex;align-items:center;gap:4px">
            🎨 الشكل: ${this._getLayoutName(s.type, s.data?.layout)}
          </button>
          <button class="sqb-btn" data-sqb="up" data-idx="${i}" title="تحريك لأعلى" ${i === 0 ? 'disabled' : ''}>↑</button>
          <button class="sqb-btn" data-sqb="down" data-idx="${i}" title="تحريك لأسفل" ${i === this.page.sections.length - 1 ? 'disabled' : ''}>↓</button>
          <button class="sqb-btn" data-sqb="dup" data-idx="${i}" title="مضاعفة القسم">📋</button>
          <button class="sqb-btn sqb-del" data-sqb="del" data-idx="${i}" title="حذف القسم">🗑️</button>
        </div>
        ${this._renderSection(s, i)}
      </div>`
      return wrapper
    }).join('') + `
      <div class="canvas-add-section" id="canvasAddSection">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        <span>Add Section</span>
      </div>
    </div>`
    this._applyTheme()

    // Quick bar buttons
    frame.querySelectorAll('.sqb-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation()
        const idx = parseInt(btn.dataset.idx)
        const act = btn.dataset.sqb
        if (act === 'layout') this._cycleLayout(idx)
        else if (act === 'up') this._moveSection(idx, -1)
        else if (act === 'down') this._moveSection(idx, 1)
        else if (act === 'dup') this._duplicateSection(idx)
        else if (act === 'del') this._deleteSection(idx)
      })
    })

    // Click on canvas section to select it
    frame.querySelectorAll('.canvas-section-wrapper').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('input, textarea, select, a, button, .sqb-btn')) return
        this.editingIdx = parseInt(el.dataset.cidx)
        this._renderSections()
        frame.querySelectorAll('.canvas-section-wrapper').forEach(w => w.classList.remove('editing'))
        el.classList.add('editing')
        this.bindAll()
      })
    })

    // Canvas add section button
    document.getElementById('canvasAddSection')?.addEventListener('click', () => this._showAddSectionPanel())
  },

  _renderSection(s, i) {
    if (typeof T !== 'undefined' && T.renderSection) {
      return T.renderSection(s, i === this.editingIdx, this.page.theme)
    }
    return `<div class="editable-section" style="padding:40px;text-align:center;color:#999">Section: ${s.type}</div>`
  },

  _moveSection(idx, dir) {
    const target = idx + dir
    if (target < 0 || target >= this.page.sections.length) return
    this._pushUndo()
    const [item] = this.page.sections.splice(idx, 1)
    this.page.sections.splice(target, 0, item)
    this.editingIdx = target
    this._saveNow()
    this._render()
    Toast.show('تم تحريك القسم', 'info')
  },

  _duplicateSection(idx) {
    this._pushUndo()
    const copy = JSON.parse(JSON.stringify(this.page.sections[idx]))
    this.page.sections.splice(idx + 1, 0, copy)
    this.editingIdx = idx + 1
    this._saveNow()
    this._render()
    Toast.show('تمت مضاعفة القسم بنجاح', 'success')
  },

  _deleteSection(idx) {
    if (this.page.sections.length <= 1) {
      Toast.show('لا يمكن حذف القسم الأخير بالموقع', 'error')
      return
    }
    this._pushUndo()
    this.page.sections.splice(idx, 1)
    if (this.editingIdx >= this.page.sections.length) {
      this.editingIdx = Math.max(0, this.page.sections.length - 1)
    }
    this._saveNow()
    this._render()
    Toast.show('تم حذف القسم', 'info')
  },

  _setField(obj, path, val) {
    const parts = path.split('.')
    let cur = obj
    for (let i = 0; i < parts.length - 1; i++) {
      const p = parts[i]
      if (cur[p] === undefined) cur[p] = isNaN(parts[i + 1]) ? {} : []
      cur = cur[p]
    }
    cur[parts[parts.length - 1]] = val
  },

  _applyTheme() {
    const f = document.getElementById('canvasFrame')
    if (!f) return
    const t = this.page.theme || {}
    f.style.setProperty('--p-color', t.color || '#6366f1')
    f.style.fontFamily = `${t.font || 'Inter'},sans-serif`
  },

  _initDrag() {
    const list = document.getElementById('sectionList')
    if (!list) return

    list.querySelectorAll('.section-item[draggable]').forEach(el => {
      el.addEventListener('dragstart', (e) => {
        this.dragSrc = parseInt(el.dataset.index)
        el.classList.add('dragging')
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', el.dataset.index)
        // Ghost element
        const ghost = el.cloneNode(true)
        ghost.style.opacity = '0.7'
        ghost.style.position = 'absolute'
        ghost.style.top = '-9999px'
        document.body.appendChild(ghost)
        e.dataTransfer.setDragImage(ghost, 0, 0)
        setTimeout(() => ghost.remove(), 0)
      })

      el.addEventListener('dragend', () => {
        el.classList.remove('dragging')
        list.querySelectorAll('.section-item').forEach(item => item.classList.remove('drag-over', 'drag-above', 'drag-below'))
        this.dragSrc = null
      })

      el.addEventListener('dragover', (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
        const rect = el.getBoundingClientRect()
        const midY = rect.top + rect.height / 2
        el.classList.remove('drag-above', 'drag-below')
        if (e.clientY < midY) {
          el.classList.add('drag-above')
        } else {
          el.classList.add('drag-below')
        }
      })

      el.addEventListener('dragleave', () => {
        el.classList.remove('drag-above', 'drag-below')
      })

      el.addEventListener('drop', (e) => {
        e.preventDefault()
        el.classList.remove('drag-above', 'drag-below')
        if (this.dragSrc === null) return

        const target = parseInt(el.dataset.index)
        if (this.dragSrc === target) return

        const rect = el.getBoundingClientRect()
        const midY = rect.top + rect.height / 2
        const insertBefore = e.clientY < midY

        this._pushUndo()
        const items = this.page.sections
        const [removed] = items.splice(this.dragSrc, 1)
        let insertIdx = insertBefore ? target : target + 1
        if (this.dragSrc < target) insertIdx--
        items.splice(insertIdx, 0, removed)
        this.editingIdx = insertIdx
        this._saveNow()
        this._renderSections()
        this._renderCanvas()
        this.bindAll()
        this.dragSrc = null
      })
    })
  },

  bindAll() {
    this._bindToolbar()
    this._bindTabs()
    this._bindSectionList()
    this._bindEditing()
    this._bindTheme()
    this._bindSeo()
    this._bindApps()
    this._bindSettings()
    this._bindAi()
  },

  _bindToolbar() {
    document.getElementById('undoBtn')?.addEventListener('click', () => this._undo())
    document.getElementById('redoBtn')?.addEventListener('click', () => this._redo())
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); if (e.shiftKey) this._redo(); else this._undo() }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') { e.preventDefault(); this._redo() }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); this._saveNow(); Toast.show('Saved!', 'success') }
    })
    document.getElementById('previewBtn')?.addEventListener('click', () => { this._saveNow(); window.open('#/preview/' + this.page.id, '_blank') })
    document.getElementById('exportBtn')?.addEventListener('click', () => this._exportHtml())
    document.getElementById('publishBtn')?.addEventListener('click', () => this._publish())
    document.getElementById('saveBtn')?.addEventListener('click', () => { this._saveNow(); Toast.show('تم الحفظ بنجاح!', 'success') })
    document.getElementById('deviceToggle')?.addEventListener('click', e => {
      const btn = e.target.closest('.device-btn'); if (!btn) return
      document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active')
      const dev = btn.dataset.device
      const frame = document.getElementById('canvasFrame')
      if (frame) {
        frame.classList.remove('tablet', 'mobile')
        if (dev === 'tablet') frame.classList.add('tablet')
        else if (dev === 'mobile') frame.classList.add('mobile')
      }
    })
  },

  _bindTabs() {
    document.querySelectorAll('[data-stab]').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.sidebar-tab').forEach(t => t.classList.remove('active')); tab.classList.add('active')
        document.querySelectorAll('.sidebar-content').forEach(c => c.classList.add('hidden'))
        const id = 'sidebar' + tab.dataset.stab.charAt(0).toUpperCase() + tab.dataset.stab.slice(1)
        document.getElementById(id)?.classList.remove('hidden')
      })
    })
  },

  _bindSectionList() {
    const list = document.getElementById('sectionList')
    list?.addEventListener('click', e => {
      const del = e.target.closest('.del-section')
      const dup = e.target.closest('.dup-section')
      const upBtn = e.target.closest('.move-up-btn')
      const downBtn = e.target.closest('.move-down-btn')
      const layoutBtn = e.target.closest('.sec-layout-pill')
      const item = e.target.closest('.section-item')

      if (layoutBtn) {
        const idx = parseInt(layoutBtn.dataset.layoutIdx)
        this._cycleLayout(idx)
        return
      }
      if (del) {
        const idx = parseInt(del.dataset.del)
        if (this.page.sections.length <= 1) { Toast.show('Cannot delete the last section', 'error'); return }
        this._pushUndo(); this.page.sections.splice(idx, 1)
        if (this.editingIdx >= this.page.sections.length) this.editingIdx = Math.max(0, this.page.sections.length - 1)
        this._saveNow(); this._render(); Toast.show('Section deleted', 'info'); return
      }
      if (dup) {
        const idx = parseInt(dup.dataset.dup); this._pushUndo()
        const copy = JSON.parse(JSON.stringify(this.page.sections[idx]))
        this.page.sections.splice(idx + 1, 0, copy)
        this.editingIdx = idx + 1; this._saveNow(); this._render(); Toast.show('Section duplicated', 'info'); return
      }
      if (upBtn) {
        const idx = parseInt(upBtn.dataset.up); if (idx <= 0) return
        this._pushUndo()
        const [item] = this.page.sections.splice(idx, 1)
        this.page.sections.splice(idx - 1, 0, item)
        this.editingIdx = idx - 1; this._saveNow(); this._render(); return
      }
      if (downBtn) {
        const idx = parseInt(downBtn.dataset.down); if (idx >= this.page.sections.length - 1) return
        this._pushUndo()
        const [item] = this.page.sections.splice(idx, 1)
        this.page.sections.splice(idx + 1, 0, item)
        this.editingIdx = idx + 1; this._saveNow(); this._render(); return
      }
      if (item && !del && !dup && !upBtn && !downBtn) {
        this.editingIdx = parseInt(item.dataset.index)
        this._renderSections(); this._renderCanvas(); this.bindAll()
      }
    })
    document.getElementById('addSectionBtn')?.addEventListener('click', () => this._showAddSectionPanel())
  },

  _showAddSectionPanel() {
    const types = [
      { type: 'hero', icon: ICONS.home, name: 'Hero', desc: 'Big header with image', cat: 'Content' },
      { type: 'about', icon: ICONS.user, name: 'About', desc: 'About text block', cat: 'Content' },
      { type: 'services', icon: ICONS.briefcase, name: 'Services', desc: 'Service cards', cat: 'Content' },
      { type: 'features', icon: ICONS.sparkles, name: 'Features', desc: 'Feature highlights', cat: 'Content' },
      { type: 'pricing', icon: ICONS.dollar, name: 'Pricing', desc: 'Price plans', cat: 'Content' },
      { type: 'testimonials', icon: ICONS.message, name: 'Testimonials', desc: 'Client reviews', cat: 'Content' },
      { type: 'gallery', icon: ICONS.image, name: 'Gallery', desc: 'Image grid', cat: 'Media' },
      { type: 'faq', icon: ICONS.helpCircle, name: 'FAQ', desc: 'Questions & answers', cat: 'Content' },
      { type: 'team', icon: ICONS.users, name: 'Team', desc: 'Team members', cat: 'Content' },
      { type: 'blog', icon: ICONS.pen, name: 'Blog', desc: 'Blog posts', cat: 'Content' },
      { type: 'portfolio', icon: ICONS.folder, name: 'Portfolio', desc: 'Work showcase', cat: 'Media' },
      { type: 'counters', icon: ICONS.chart, name: 'Counters', desc: 'Statistics numbers', cat: 'Data' },
      { type: 'stats', icon: ICONS.chart, name: 'Stats', desc: 'Stat bars', cat: 'Data' },
      { type: 'timeline', icon: ICONS.calendar, name: 'Timeline', desc: 'History timeline', cat: 'Content' },
      { type: 'menu', icon: ICONS.utensils, name: 'Menu', desc: 'Restaurant menu', cat: 'Content' },
      { type: 'location', icon: ICONS.mapPin, name: 'Location', desc: 'Map & address', cat: 'Contact' },
      { type: 'cta', icon: ICONS.target, name: 'Call to Action', desc: 'Action button section', cat: 'Conversion' },
      { type: 'contact', icon: ICONS.mail, name: 'Contact', desc: 'Contact form', cat: 'Contact' },
      { type: 'footer', icon: ICONS.file, name: 'Footer', desc: 'Page footer', cat: 'Layout' },
    ]

    const existing = document.getElementById('addSectionPanel')
    if (existing) { existing.remove(); return }

    const panel = document.createElement('div')
    panel.id = 'addSectionPanel'
    panel.className = 'add-section-panel'
    const categories = [...new Set(types.map(t => t.cat))]
    panel.innerHTML = `
      <div class="asp-header">
        <h3>Add Section</h3>
        <button class="asp-close" id="closeAddPanel">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="asp-search">
        <input type="text" placeholder="Search sections..." id="sectionSearchInput" />
      </div>
      <div class="asp-grid" id="aspGrid">
        ${categories.map(cat => `
          <div style="grid-column:1/-1;margin-top:8px">
            <div style="font-size:.7rem;font-weight:700;color:var(--gray-400);text-transform:uppercase;letter-spacing:.06em;padding:0 4px;margin-bottom:6px">${cat}</div>
          </div>
          ${types.filter(t => t.cat === cat).map(t => `
            <div class="asp-card" data-type="${t.type}">
              <span class="asp-icon">${t.icon}</span>
              <h4>${t.name}</h4>
              <p>${t.desc}</p>
            </div>
          `).join('')}
        `).join('')}
      </div>
    `
    document.body.appendChild(panel)

    document.getElementById('closeAddPanel')?.addEventListener('click', () => panel.remove())
    panel.addEventListener('click', e => { if (e.target === panel) panel.remove() })

    document.getElementById('sectionSearchInput')?.addEventListener('input', e => {
      const q = e.target.value.toLowerCase()
      panel.querySelectorAll('.asp-card').forEach(card => {
        card.style.display = card.dataset.type.includes(q) || card.querySelector('h4').textContent.toLowerCase().includes(q) ? '' : 'none'
      })
    })

    panel.querySelectorAll('.asp-card').forEach(card => {
      card.addEventListener('click', () => {
        const type = card.dataset.type
        const defs = {
          hero: { heading: 'Welcome to Our Site', description: 'We build amazing things', buttonText: 'Get Started', image: '' },
          about: { heading: 'About Us', content: 'We are a creative team passionate about building great products.' },
          services: { heading: 'Our Services', items: [{ title: 'Web Design', desc: 'Beautiful, responsive websites' }, { title: 'Development', desc: 'Fast, reliable code' }, { title: 'SEO', desc: 'Rank higher on Google' }] },
          features: { heading: 'Why Choose Us', items: [{ title: 'Fast', desc: 'Lightning quick performance' }, { title: 'Secure', desc: 'Enterprise-grade security' }, { title: 'Easy', desc: 'Simple to use' }] },
          pricing: { heading: 'Pricing Plans', plans: [{ name: 'Starter', price: '$9/mo', features: ['5 Pages', 'Basic Support', 'Analytics'] }, { name: 'Pro', price: '$29/mo', features: ['Unlimited Pages', 'Priority Support', 'Advanced Analytics', 'Custom Domain'] }] },
          testimonials: { heading: 'What Our Clients Say', items: [{ name: 'Sarah Johnson', text: 'Amazing service! Highly recommended.', role: 'CEO, TechCo' }, { name: 'Mike Chen', text: 'Best experience working with this team.', role: 'Founder, StartupX' }] },
          gallery: { heading: 'Our Work', images: [] },
          faq: { heading: 'Frequently Asked Questions', items: [{ q: 'How do I get started?', a: 'Simply sign up and choose a template!' }, { q: 'Can I cancel anytime?', a: 'Yes, no long-term contracts.' }] },
          team: { heading: 'Meet Our Team', items: [{ name: 'John Doe', role: 'CEO & Founder' }, { name: 'Jane Smith', role: 'Lead Designer' }] },
          stats: { heading: 'By the Numbers', items: [{ number: '10K+', label: 'Happy Clients' }, { number: '500+', label: 'Projects Done' }, { number: '99%', label: 'Satisfaction' }] },
          cta: { heading: 'Ready to Get Started?', subheading: 'Join thousands of satisfied customers today.', buttonText: 'Start Free Trial' },
          contact: { heading: 'Get In Touch', email: '', phone: '', address: '' },
          footer: { copyright: '© 2026 Your Company. All rights reserved.', text: 'Built with SiteFlow' },
          blog: { heading: 'Latest Posts', items: [{ title: 'Post Title', excerpt: 'Post excerpt goes here...', date: 'Jan 2026' }, { title: 'Another Post', excerpt: 'Another exciting post...', date: 'Feb 2026' }] },
          portfolio: { heading: 'Our Work', items: [{ title: 'Project One', desc: 'Description of project', image: '' }, { title: 'Project Two', desc: 'Description of project', image: '' }, { title: 'Project Three', desc: 'Description of project', image: '' }] },
          counters: { heading: 'By the Numbers', items: [{ number: '100+', label: 'Clients' }, { number: '500+', label: 'Projects' }, { number: '50+', label: 'Team' }] },
          timeline: { heading: 'Our Journey', items: [{ title: 'Founded', desc: 'Company started', year: '2024' }, { title: 'Milestone', desc: 'Key achievement', year: '2025' }, { title: 'Growth', desc: 'Expanded globally', year: '2026' }] },
          menu: { heading: 'Our Menu', items: [{ title: 'Item Name', desc: 'Description', price: '$15', category: 'Main' }, { title: 'Another Item', desc: 'Description', price: '$12', category: 'Main' }] },
          location: { heading: 'Find Us', address: '123 Main St, City', phone: '+1 555-0000', hours: 'Mon-Fri 9AM-5PM' },
        }
        this._pushUndo()
        this.page.sections.push({ type, data: defs[type] || {} })
        this.editingIdx = this.page.sections.length - 1
        this._saveNow(); this._render(); panel.remove()
        Toast.show(`${type.charAt(0).toUpperCase() + type.slice(1)} section added`, 'success')
      })
    })
  },

  _bindEditing() {
    document.querySelectorAll('[contenteditable]').forEach(el => {
      el.addEventListener('focus', () => {
        el.classList.add('editing')
        const wrapper = el.closest('.canvas-section-wrapper')
        if (wrapper && wrapper.dataset.cidx !== undefined) {
          const idx = parseInt(wrapper.dataset.cidx)
          if (this.editingIdx !== idx) {
            this.editingIdx = idx
            document.querySelectorAll('.canvas-section-wrapper').forEach(w => w.classList.remove('editing'))
            wrapper.classList.add('editing')
            this._renderSections()
          }
        }
      })

      el.addEventListener('blur', () => {
        el.classList.remove('editing')
        const wrapper = el.closest('.canvas-section-wrapper')
        const secIdx = wrapper && wrapper.dataset.cidx !== undefined ? parseInt(wrapper.dataset.cidx) : this.editingIdx
        const s = this.page.sections[secIdx]
        if (!s) return
        const f = el.dataset.field
        if (!f) return
        this._setField(s.data, f, el.innerText.trim())
        this._saveLater()
      })

      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          document.execCommand('insertLineBreak')
        }
      })
    })

    document.querySelectorAll('.section-editor-input').forEach(el => {
      el.addEventListener('input', () => {
        const s = this.page.sections[this.editingIdx]; if (!s) return
        const f = el.dataset.field; if (!f) return
        this._setField(s.data, f, el.value)
        this._saveLater()
      })
    })

    document.getElementById('heroImagePlaceholder')?.addEventListener('click', () => document.getElementById('heroImageInput')?.click())
    document.getElementById('heroImageInput')?.addEventListener('change', async e => {
      const file = e.target.files[0]; if (!file) return
      const url = await API.uploadImage(file)
      const s = this.page.sections[this.editingIdx]; if (s) { s.data.image = url; this._saveNow(); this._render() }
    })
    document.querySelector('[data-hero-remove]')?.addEventListener('click', () => {
      const s = this.page.sections[this.editingIdx]; if (s) { s.data.image = ''; this._saveNow(); this._render() }
    })
    document.getElementById('galleryGrid')?.addEventListener('click', e => {
      if (e.target.closest('#addGalleryBtn')) document.getElementById('galleryImageInput')?.click()
      const rm = e.target.closest('.remove-img')
      if (rm && rm.dataset.index !== undefined) { const s = this.page.sections[this.editingIdx]; if (s) { s.data.images.splice(parseInt(rm.dataset.index), 1); this._saveNow(); this._render() } }
    })
    document.getElementById('galleryImageInput')?.addEventListener('change', async e => {
      const files = Array.from(e.target.files); if (!files.length) return
      const s = this.page.sections[this.editingIdx]; if (!s) return
      if (!Array.isArray(s.data.images)) s.data.images = []
      let loaded = 0
      for (const file of files) {
        const url = await API.uploadImage(file)
        s.data.images.push(url); loaded++
        if (loaded === files.length) { this._saveNow(); this._render() }
      }
    })
    // Portfolio image upload
    document.getElementById('portfolioImageInput')?.addEventListener('change', async e => {
      const files = Array.from(e.target.files); if (!files.length) return
      const s = this.page.sections[this.editingIdx]; if (!s) return
      if (!Array.isArray(s.data.items)) s.data.items = []
      for (const file of files) {
        const url = await API.uploadImage(file)
        s.data.items.push({ title: 'New Item', desc: 'Description', image: url })
      }
      this._saveNow(); this._render()
    })
    document.getElementById('addPortfolioBtn')?.addEventListener('click', () => document.getElementById('portfolioImageInput')?.click())
  },

  _bindTheme() {
    document.querySelectorAll('.color-swatch').forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active')); el.classList.add('active')
        this.page.theme.color = el.dataset.color; document.getElementById('customColor').value = el.dataset.color; document.getElementById('colorHexInput').value = el.dataset.color
        this._saveLater(); this._renderCanvas()
      })
    })
    document.getElementById('customColor')?.addEventListener('input', e => {
      this.page.theme.color = e.target.value; document.getElementById('colorHexInput').value = e.target.value
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active')); this._saveLater(); this._renderCanvas()
    })
    document.getElementById('colorHexInput')?.addEventListener('input', e => {
      if (/^#[0-9a-f]{6}$/i.test(e.target.value)) { this.page.theme.color = e.target.value; document.getElementById('customColor').value = e.target.value; document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active')); this._saveLater(); this._renderCanvas() }
    })
    document.getElementById('fontSelect')?.addEventListener('change', e => { this.page.theme.font = e.target.value; this._saveLater(); this._renderCanvas() })
    document.getElementById('bgColorInput')?.addEventListener('input', e => { this.page.theme.bgColor = e.target.value; this._saveLater(); this._renderCanvas() })
  },

  _bindSeo() {
    const st = document.getElementById('seoTitle'), sd = document.getElementById('seoDesc')
    st?.addEventListener('input', () => { if (!this.page.seo) this.page.seo = {}; this.page.seo.title = st.value; const p = document.getElementById('seoTitlePreview'); if (p) p.textContent = st.value || 'My Site'; this._saveLater() })
    sd?.addEventListener('input', () => { if (!this.page.seo) this.page.seo = {}; this.page.seo.description = sd.value; const c = document.getElementById('seoDescCounter'); if (c) c.textContent = sd.value.length + '/160'; this._saveLater() })

    document.getElementById('aiOptimizeSeoBtn')?.addEventListener('click', () => {
      if (typeof SiteFlowAI === 'undefined') return
      const opt = SiteFlowAI.generateSeo(this.page)
      if (!this.page.seo) this.page.seo = {}
      this.page.seo.title = opt.title
      this.page.seo.description = opt.description
      if (st) st.value = opt.title
      if (sd) sd.value = opt.description
      const p = document.getElementById('seoTitlePreview')
      if (p) p.textContent = opt.title
      const c = document.getElementById('seoDescCounter')
      if (c) c.textContent = opt.description.length + ' / 160'
      const score = document.getElementById('seoScoreLabel')
      if (score) score.textContent = `صحة الـ SEO: ${opt.score}% ممتازة 🚀`
      this._saveLater()
      Toast.show('تم تحسين عناوين ووصف الـ SEO بالذكاء الاصطناعي بنجاح! 🎯', 'success')
    })
  },

  _exportHtml() {
    if (!this.page || typeof SiteFlowAI === 'undefined') return
    const html = SiteFlowAI.exportStandaloneHtml(this.page)
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${this.page.slug || 'site'}.html`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    Toast.show('تم تصدير كود HTML الكامل للموقع بنجاح! 📦', 'success')
  },

  _bindApps() {
    if (!this.page.apps) this.page.apps = (this.page.seo?.apps || {})

    // Toggle switch listeners to show/hide app configuration bodies
    const toggles = [
      { switchId: 'appGscEnabled', bodyId: 'appGscBody' },
      { switchId: 'appMetaPixelEnabled', bodyId: 'appMetaPixelBody' },
      { switchId: 'appGaEnabled', bodyId: 'appGaBody' },
      { switchId: 'appGtmEnabled', bodyId: 'appGtmBody' },
      { switchId: 'appTiktokEnabled', bodyId: 'appTiktokBody' },
      { switchId: 'appWaEnabled', bodyId: 'appWaBody' }
    ]

    toggles.forEach(({ switchId, bodyId }) => {
      const sw = document.getElementById(switchId)
      const bd = document.getElementById(bodyId)
      if (sw && bd) {
        sw.addEventListener('change', () => {
          bd.style.display = sw.checked ? '' : 'none'
        })
      }
    })

    // Save Apps button handler
    document.getElementById('saveAppsBtn')?.addEventListener('click', async () => {
      const saveBtn = document.getElementById('saveAppsBtn')
      if (saveBtn) {
        saveBtn.disabled = true
        saveBtn.innerHTML = '<span>⏳</span> جاري الحفظ والتفعيل...'
      }

      this.page.apps = {
        google_search_console_enabled: !!document.getElementById('appGscEnabled')?.checked,
        google_search_console_code: document.getElementById('appGscCode')?.value?.trim() || '',
        meta_pixel_enabled: !!document.getElementById('appMetaPixelEnabled')?.checked,
        meta_pixel_id: document.getElementById('appMetaPixelId')?.value?.trim() || '',
        google_analytics_enabled: !!document.getElementById('appGaEnabled')?.checked,
        google_analytics_id: document.getElementById('appGaId')?.value?.trim() || '',
        gtm_enabled: !!document.getElementById('appGtmEnabled')?.checked,
        gtm_id: document.getElementById('appGtmId')?.value?.trim() || '',
        tiktok_pixel_enabled: !!document.getElementById('appTiktokEnabled')?.checked,
        tiktok_pixel_id: document.getElementById('appTiktokId')?.value?.trim() || '',
        whatsapp_enabled: !!document.getElementById('appWaEnabled')?.checked,
        whatsapp_number: document.getElementById('appWaNumber')?.value?.trim() || '',
        whatsapp_message: document.getElementById('appWaMessage')?.value?.trim() || '',
        custom_head_code: document.getElementById('appCustomHead')?.value || '',
        custom_body_code: document.getElementById('appCustomBody')?.value || ''
      }

      // Synchronize to seo.apps for resilient persistence across storage engines
      if (!this.page.seo) this.page.seo = {}
      this.page.seo.apps = this.page.apps

      await this._saveNow()
      if (saveBtn) {
        saveBtn.disabled = false
        saveBtn.innerHTML = '<span>💾</span> حفظ وتفعيل التطبيقات'
      }
      Toast.show('تم حفظ وتفعيل إعدادات التطبيقات والربط بنجاح! 🚀', 'success')
    })
  },

  _bindSettings() {
    document.getElementById('pageTitleInput')?.addEventListener('input', e => {
      this.page.title = e.target.value
      this._saveLater()
      const tb = document.querySelector('.builder-toolbar .truncate')
      if (tb) tb.textContent = e.target.value
    })

    document.getElementById('customDomainInput')?.addEventListener('input', e => {
      this.page.customDomain = e.target.value
      this._saveLater()
    })

    // Subdomain Availability Search & Claim Handler
    const searchInput = document.getElementById('domainSearchInput')
    const checkBtn = document.getElementById('domainCheckBtn')
    const resultBox = document.getElementById('domainCheckResult')
    const mainDomain = window.MAIN_DOMAIN || 'siteflow.vexonet.online'

    const runDomainCheck = async () => {
      if (!searchInput || !resultBox) return
      const raw = searchInput.value.trim()
      if (!raw) {
        resultBox.style.display = 'block'
        resultBox.innerHTML = `
          <div style="background:#fef2f2;border:1px solid #fecaca;padding:10px 12px;border-radius:10px;color:#991b1b;font-size:.8rem;font-weight:600">
            ⚠️ يرجى كتابة اسم الدومين المراد فحصه
          </div>`
        return
      }

      resultBox.style.display = 'block'
      resultBox.innerHTML = `
        <div style="background:#f0f9ff;border:1px solid #bae6fd;padding:10px 12px;border-radius:10px;color:#0369a1;font-size:.8rem;font-weight:600;display:flex;align-items:center;gap:8px">
          <span>⏳</span> جاري فحص توفر الدومين في قاعدة البيانات السحابية...
        </div>`

      try {
        const res = await API.checkSlugAvailability(raw, this.page.id)
        if (res.available) {
          resultBox.innerHTML = `
            <div style="background:#ecfdf5;border:1px solid #a7f3d0;padding:12px;border-radius:10px;color:#065f46">
              <div style="font-weight:800;font-size:.85rem;display:flex;align-items:center;gap:6px;margin-bottom:4px">
                <span>✅</span>
                <span>تهانينا! الدومين متاح للحجز:</span>
              </div>
              <div style="font-family:monospace;direction:ltr;text-align:right;font-weight:800;color:#047857;margin-bottom:8px">
                https://${res.slug}.${mainDomain}
              </div>
              <button id="claimDomainBtn" data-slug="${res.slug}" class="btn btn-primary btn-sm w-full" style="background:#059669;border-color:#059669;font-weight:800;border-radius:8px;padding:8px">
                🔒 حجز وتثبيت الدومين نهائياً لموقعك
              </button>
            </div>`

          document.getElementById('claimDomainBtn')?.addEventListener('click', async (e) => {
            const chosenSlug = e.currentTarget.dataset.slug
            if (!confirm(`هل أنت متأكد من حجز وتثبيت الدومين (${chosenSlug}.${mainDomain})؟\n\nتنبيه: سيتم قفل الدومين نهائياً لضمان استقرار روابط موقعك وفهرسة Google.`)) return

            this.page.slug = chosenSlug
            this.page.slug_locked = true
            await this._saveNow()
            Toast.show('تم حجز وتثبيت الدومين بنجاح! 🔒', 'success')
            this.render()
          })
        } else {
          resultBox.innerHTML = `
            <div style="background:#fef2f2;border:1px solid #fecaca;padding:12px;border-radius:10px;color:#991b1b">
              <div style="font-weight:800;font-size:.85rem;margin-bottom:4px;display:flex;align-items:center;gap:6px">
                <span>❌</span>
                <span>${res.error || res.message || 'الدومين غير متاح أو محجوز مسبقاً'}</span>
              </div>
              <div style="font-size:.76rem;color:#7f1d1d">
                جرب اسماً آخر أو أضف كلمة تميز نشاطك (مثل: brand-shop).
              </div>
            </div>`
        }
      } catch (err) {
        resultBox.innerHTML = `
          <div style="background:#fef2f2;border:1px solid #fecaca;padding:10px 12px;border-radius:10px;color:#991b1b;font-size:.8rem">
            ⚠️ حدث خطأ أثناء الفحص: ${err.message}
          </div>`
      }
    }

    checkBtn?.addEventListener('click', runDomainCheck)
    searchInput?.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault()
        runDomainCheck()
      }
    })
  },

  _bindAi() {
    let generatedData = null

    // Voice Speech Recognition
    const voiceBtn = document.getElementById('builderAiVoiceBtn')
    const voiceText = document.getElementById('builderAiVoiceText')
    const promptInput = document.getElementById('aiPromptInput')
    let isListening = false
    let currentRec = null

    if (voiceBtn) {
      if (typeof SiteFlowAI !== 'undefined' && !SiteFlowAI.isVoiceSupported()) {
        voiceBtn.style.display = 'none'
      } else {
        voiceBtn.addEventListener('click', () => {
          if (isListening && currentRec) {
            try { currentRec.stop() } catch {}
            return
          }
          currentRec = SiteFlowAI.startVoiceRecognition(
            (text, isFinal) => {
              if (promptInput) {
                promptInput.value = text
              }
              if (isFinal) {
                Toast.show('تم التقاط صوتك بنجاح!', 'info')
              }
            },
            (status, err) => {
              if (status === 'listening') {
                isListening = true
                if (voiceText) voiceText.textContent = 'أستمع لك...'
                voiceBtn.style.background = '#fee2e2'
                voiceBtn.style.borderColor = '#f87171'
                voiceBtn.style.color = '#dc2626'
              } else {
                isListening = false
                if (voiceText) voiceText.textContent = 'تحدث بالصوت'
                voiceBtn.style.background = '#f1f5f9'
                voiceBtn.style.borderColor = '#cbd5e1'
                voiceBtn.style.color = 'var(--gray-700)'
                if (err && err !== 'no-speech') {
                  Toast.show('تعذر تشغيل المايك: ' + err, 'error')
                }
              }
            }
          )
        })
      }
    }

    document.getElementById('aiGenerateBtn')?.addEventListener('click', () => {
      const prompt = document.getElementById('aiPromptInput')?.value.trim()
      if (!prompt) { Toast.show('يرجى كتابة وصف لنشاطك التجاري أو فكرة الموقع أولاً', 'error'); return }

      const btn = document.getElementById('aiGenerateBtn')
      if (btn) { btn.disabled = true; btn.textContent = '⏳ جاري التحليل والتصميم الذكي...' }

      setTimeout(() => {
        generatedData = typeof SiteFlowAI !== 'undefined' ? SiteFlowAI.generateSite(prompt) : null
        if (btn) { btn.disabled = false; btn.innerHTML = '<span>🚀</span> توليد الموقع الذكي بالكامل' }
        if (!generatedData) return

        const resArea = document.getElementById('aiResultArea')
        const summary = document.getElementById('aiResultSummary')
        if (resArea && summary) {
          summary.innerHTML = `تم ابتكار: <strong>${generatedData.title}</strong> (${generatedData.industry}) بـ ${generatedData.sections.length} أقسام متكاملة ومحتوى كامل!`
          resArea.style.display = 'block'
        }
        Toast.show('تم التوليد بنجاح! يمكنك تطبيق التصميم فوراً على موقعك.', 'success')
      }, 600)
    })

    document.getElementById('aiApplyAllBtn')?.addEventListener('click', () => {
      if (!generatedData) return
      this._pushUndo()
      this.page.title = generatedData.title
      this.page.theme = generatedData.theme
      this.page.seo = generatedData.seo
      this.page.sections = generatedData.sections
      this._saveNow()
      this._render()
      Toast.show('تم تطبيق موقع SiteFlow الذكي بنجاح! 🎉', 'success')
    })

    document.getElementById('aiApplyThemeBtn')?.addEventListener('click', () => {
      if (!generatedData) return
      this._pushUndo()
      this.page.theme = generatedData.theme
      this._saveNow()
      this._render()
      Toast.show('تم تطبيق ألوان وخطوط القطاع بنجاح!', 'success')
    })
  },

  _updateSeoPreview() {
    const p = document.getElementById('seoTitlePreview'), c = document.getElementById('seoDescCounter')
    if (p && this.page.seo) p.textContent = this.page.seo.title || this.page.title || 'My Site'
    if (c && this.page.seo) c.textContent = (this.page.seo.description || '').length + '/160'
  },

  _saveLater() {
    const ind = document.getElementById('saveStatusIndicator')
    if (ind) { ind.textContent = '⏳ جاري الحفظ...'; ind.style.color = 'var(--primary)' }
    clearTimeout(this.autoSaveTimer)
    this.autoSaveTimer = setTimeout(() => this._saveNow(), 800)
  },

  async _saveNow() {
    const ind = document.getElementById('saveStatusIndicator')
    try {
      this.page = await API.updateSite(this.page.id, {
        title: this.page.title,
        slug: this.page.slug,
        slug_locked: !!this.page.slug_locked,
        sections: this.page.sections,
        seo: this.page.seo,
        apps: this.page.apps,
        theme: this.page.theme,
        customDomain: this.page.customDomain
      })
      if (ind) { ind.textContent = '✓ محفوظة'; ind.style.color = 'var(--gray-400)' }
    } catch (e) {
      console.error('Save failed:', e)
      if (ind) { ind.textContent = '⚠️ فشل الحفظ'; ind.style.color = '#dc2626' }
    }
  },

  async _publish() {
    if (!isValidSlug(this.page.slug) || isReservedSlug(this.page.slug)) {
      Toast.show('اسم الرابط غير متاح أو محجوز للنظام. يرجى تعديله في إعدادات الموقع قبل النشر.', 'error')
      return
    }
    try {
      await this._saveNow()
      this.page = await API.publishSite(this.page.id)
      const liveUrl = subdomainUrl(this.page.slug)
      Toast.show(`تم نشر موقعك بنجاح! 🚀 رابط الموقع: <a href="${liveUrl}" target="_blank" style="color:#fff;text-decoration:underline;font-weight:700">${liveUrl}</a>`, 'success')
      const b = document.querySelector('.badge-status'); if (b) { b.textContent = 'Published'; b.style.background = '#d1fae5'; b.style.color = '#065f46' }
      const btn = document.getElementById('publishBtn'); if (btn) btn.textContent = 'Update'
    } catch (e) { Toast.show(e.message, 'error') }
  },

  async createNew() {
    if (!Auth.requireAuth()) return
    const existing = document.getElementById('templateModal')
    if (existing) existing.closest('.modal-overlay')?.remove()
    const div = document.createElement('div'); div.id = 'templateModalWrap'
    div.innerHTML = T.templatePicker()
    document.body.appendChild(div)

    const allTemplates = typeof ALL_PRESETS !== 'undefined' ? ALL_PRESETS : PRESETS
    const ITEMS_PER_PAGE = 24
    let currentPage = 1
    let currentFilter = 'all'
    let searchQuery = ''

    function getFiltered() {
      return allTemplates.filter(t => {
        const matchFilter = currentFilter === 'all' || t.category === currentFilter || (currentFilter === 'ar' && t.arabic)
        const matchSearch = !searchQuery || t.name.toLowerCase().includes(searchQuery) || t.desc.toLowerCase().includes(searchQuery)
        return matchFilter && matchSearch
      })
    }

    function renderTemplates() {
      const filtered = getFiltered()
      const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
      if (currentPage > totalPages) currentPage = 1
      const start = (currentPage - 1) * ITEMS_PER_PAGE
      const items = filtered.slice(start, start + ITEMS_PER_PAGE)

      const countEl = document.getElementById('tplCount')
      const gridEl = document.getElementById('templateGrid')
      const pagEl = document.getElementById('tplPagination')

      countEl.textContent = `${filtered.length} template${filtered.length !== 1 ? 's' : ''} found`

      gridEl.innerHTML = items.map(t => {
        const iconSvg = t.icon && t.icon.includes('<svg') ? t.icon : (ICONS[t.theme?.icon] || ICONS.globe)
        const color = t.theme?.color || 'var(--primary)'
        return `
        <div class="card card-hover template-card" data-template="${t.id}" data-category="${t.category || 'other'}" style="padding:20px;cursor:pointer;text-align:center;transition:all .2s">
          <div style="font-size:2rem;margin-bottom:10px;color:${color}">${ICONS.wrap(iconSvg, 32)}</div>
          <h4 style="font-size:.88rem;margin-bottom:4px;font-weight:700">${t.name}</h4>
          <p style="font-size:.75rem;color:var(--gray-500);line-height:1.4">${t.desc}</p>
        </div>`
      }).join('')

      if (totalPages > 1) {
        let pag = ''
        if (currentPage > 1) pag += `<button class="btn btn-ghost btn-sm tpl-page" data-page="${currentPage - 1}">← Prev</button>`
        for (let i = 1; i <= totalPages; i++) {
          if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 2) {
            pag += `<button class="btn btn-sm tpl-page ${i === currentPage ? 'btn-primary' : 'btn-ghost'}" data-page="${i}">${i}</button>`
          } else if (Math.abs(i - currentPage) === 3) {
            pag += `<span style="color:var(--gray-400)">...</span>`
          }
        }
        if (currentPage < totalPages) pag += `<button class="btn btn-ghost btn-sm tpl-page" data-page="${currentPage + 1}">Next →</button>`
        pagEl.innerHTML = pag
        pagEl.querySelectorAll('.tpl-page').forEach(b => b.addEventListener('click', () => { currentPage = parseInt(b.dataset.page); renderTemplates() }))
      } else {
        pagEl.innerHTML = ''
      }

      gridEl.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', async () => {
          try {
            div.remove()
            const site = await API.createSite({ title: card.querySelector('h4')?.textContent || 'My New Site', template_type: card.dataset.template })
            Toast.show('Site created!', 'success'); Router.navigate('builder/' + site.id)
          } catch (e) { Toast.show(e.message, 'error') }
        })
      })
    }

    document.querySelectorAll('#templateFilters .filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#templateFilters .filter-btn').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        currentFilter = btn.dataset.filter
        currentPage = 1
        renderTemplates()
      })
    })

    const searchInput = document.getElementById('tplSearchInput')
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchQuery = searchInput.value.toLowerCase().trim()
        currentPage = 1
        renderTemplates()
      })
    }

    renderTemplates()
    div.querySelector('.modal-overlay')?.addEventListener('click', e => { if (e.target.classList.contains('modal-overlay')) div.remove() })
  },

  async _deleteSite() {
    Toast.show('حذف المواقع غير متاح للحفاظ على استقرار الروابط ونتائج البحث.', 'warning')
  }
}
