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
    const descs = { hero: 'Header & intro', about: 'About text', gallery: 'Image gallery', contact: 'Contact form', services: 'What you offer', testimonials: 'Client reviews', pricing: 'Price plans', faq: 'FAQ questions', team: 'Team members', footer: 'Page footer', cta: 'Call to action', features: 'Feature list', stats: 'Statistics', menu: 'Menu items', location: 'Map & address', hours: 'Business hours' }

    list.innerHTML = this.page.sections.map((s, i) => `
      <div class="section-item ${i === this.editingIdx ? 'active' : ''}" data-index="${i}" draggable="true" data-type="${s.type}">
        <div class="drag-handle" title="Drag to reorder">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="8" cy="6" r="1"/><circle cx="16" cy="6" r="1"/><circle cx="8" cy="12" r="1"/><circle cx="16" cy="12" r="1"/><circle cx="8" cy="18" r="1"/><circle cx="16" cy="18" r="1"/></svg>
        </div>
        <div class="section-item-icon" style="background:${i === this.editingIdx ? 'var(--primary-light)' : 'var(--gray-100)'}">${icons[s.type] || ICONS.file}</div>
        <div class="section-item-info">
          <h4>${s.type.charAt(0).toUpperCase() + s.type.slice(1)}</h4>
          <p>${descs[s.type] || 'Custom section'}</p>
        </div>
        <div class="section-item-actions">
          <button class="move-up-btn" data-up="${i}" title="Move up" ${i === 0 ? 'disabled' : ''}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
          </button>
          <button class="move-down-btn" data-down="${i}" title="Move down" ${i === this.page.sections.length - 1 ? 'disabled' : ''}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <button class="dup-section" data-dup="${i}" title="Duplicate section">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          </button>
          <button class="del-section" data-del="${i}" title="Delete section">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
          </button>
        </div>
      </div>`).join('')
  },

  _renderCanvas() {
    const frame = document.getElementById('canvasFrame')
    if (!frame) return
    frame.classList.toggle('mobile', this.mobileMode)
    frame.innerHTML = '<div class="canvas-sections">' + this.page.sections.map((s, i) => {
      const isActive = i === this.editingIdx
      const wrapper = `<div class="canvas-section-wrapper ${isActive ? 'editing' : ''}" data-cidx="${i}">
        <div class="canvas-section-overlay"><span>${s.type.charAt(0).toUpperCase() + s.type.slice(1)}</span></div>
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

    // Click on canvas section to select it
    frame.querySelectorAll('.canvas-section-wrapper').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('input, textarea, select, a, button')) return
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
    switch (s.type) {
      case 'hero': return T.heroSection(s.data, i === this.editingIdx)
      case 'about': return T.aboutSection(s.data, i === this.editingIdx)
      case 'gallery': return T.gallerySection(s.data, i === this.editingIdx)
      case 'contact': return T.contactSection(s.data, i === this.editingIdx)
      case 'services': return T.servicesSection(s.data, i === this.editingIdx)
      case 'testimonials': return T.testimonialsSection(s.data, i === this.editingIdx)
      case 'pricing': return T.pricingSection(s.data, i === this.editingIdx)
      case 'faq': return T.faqSection(s.data, i === this.editingIdx)
      case 'team': return T.teamSection(s.data, i === this.editingIdx)
      case 'footer': return T.footerSection(s.data, i === this.editingIdx)
      case 'blog': return T.blogSection(s.data, i === this.editingIdx)
      case 'portfolio': return T.portfolioSection(s.data, i === this.editingIdx)
      case 'counters': return T.countersSection(s.data, i === this.editingIdx)
      case 'timeline': return T.timelineSection(s.data, i === this.editingIdx)
      case 'menu': return T.menuSection(s.data, i === this.editingIdx)
      case 'location': return T.locationSection(s.data, i === this.editingIdx)
      case 'cta': return `<div class="editable-section" style="text-align:center;padding:60px 40px;background:var(--p-color,#6366f1);color:#fff"><h2>${s.data.heading || 'Call to Action'}</h2><p>${s.data.subheading || ''}</p></div>`
      case 'features': return `<div class="editable-section" style="padding:60px 40px"><h2 style="text-align:center">${s.data.heading || 'Features'}</h2></div>`
      case 'stats': return `<div class="editable-section" style="padding:60px 40px;text-align:center;background:#f8fafc"><h2>${s.data.heading || 'Statistics'}</h2></div>`
      default: return `<div class="editable-section" style="padding:40px;text-align:center;color:#999">Unknown section type: ${s.type}</div>`
    }
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
    this._bindSettings()
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
    document.getElementById('publishBtn')?.addEventListener('click', () => this._publish())
    document.getElementById('saveBtn')?.addEventListener('click', () => { this._saveNow(); Toast.show('Saved!', 'success') })
    document.getElementById('deviceToggle')?.addEventListener('click', e => {
      const btn = e.target.closest('.device-btn'); if (!btn) return
      document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active')
      this.mobileMode = btn.dataset.device === 'mobile'
      document.getElementById('canvasFrame')?.classList.toggle('mobile', this.mobileMode)
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
      const item = e.target.closest('.section-item')

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
      el.addEventListener('blur', () => {
        const s = this.page.sections[this.editingIdx]; if (!s) return
        const f = el.dataset.field; if (!f) return
        const parts = f.split('.')
        if (parts.length === 3) {
          const [arr, idx, prop] = parts
          if (s.data[arr] && s.data[arr][parseInt(idx)]) s.data[arr][parseInt(idx)][prop] = el.innerText
        } else if (parts.length === 2) {
          const [arr, idx] = parts
          if (s.data[arr]) s.data[arr][parseInt(idx)] = el.innerText
        } else {
          s.data[f] = el.innerText
        }
        this._saveLater()
      })
      el.addEventListener('focus', () => { el.classList.add('editing') })
      el.addEventListener('blur', () => { el.classList.remove('editing') })
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); document.execCommand('insertLineBreak') }
      })
    })

    document.querySelectorAll('.section-editor-input').forEach(el => {
      el.addEventListener('input', () => {
        const s = this.page.sections[this.editingIdx]; if (!s) return
        const f = el.dataset.field; if (!f) return
        const parts = f.split('.')
        if (parts.length === 3) {
          const [arr, idx, prop] = parts
          if (s.data[arr] && s.data[arr][parseInt(idx)]) s.data[arr][parseInt(idx)][prop] = el.value
        } else if (parts.length === 2) {
          const [arr, idx] = parts
          if (s.data[arr]) s.data[arr][parseInt(idx)] = el.value
        } else {
          s.data[f] = el.value
        }
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
      for (const file of files) {
        const url = await API.uploadImage(file)
        s.data.items.push({ title: 'New Item', desc: 'Description', image: url })
      }
      this._saveNow(); this._render()
    })
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
  },

  _bindSettings() {
    document.getElementById('pageTitleInput')?.addEventListener('input', e => { this.page.title = e.target.value; this._saveLater(); const tb = document.querySelector('.builder-toolbar .truncate'); if (tb) tb.textContent = e.target.value })
    document.getElementById('pageSlugInput')?.addEventListener('input', e => {
      this.page.slug = e.target.value.replace(/[^a-z0-9-]/g, '').toLowerCase(); const p = document.getElementById('slugPreview')
      if (p) p.textContent = this.page.slug + '.' + MAIN_DOMAIN; this._saveLater()
    })
    document.getElementById('customDomainInput')?.addEventListener('input', e => { this.page.customDomain = e.target.value; this._saveLater() })
    document.getElementById('deleteSiteBtn')?.addEventListener('click', () => this._deleteSite())
  },

  _updateSeoPreview() {
    const p = document.getElementById('seoTitlePreview'), c = document.getElementById('seoDescCounter')
    if (p && this.page.seo) p.textContent = this.page.seo.title || this.page.title || 'My Site'
    if (c && this.page.seo) c.textContent = (this.page.seo.description || '').length + '/160'
  },

  _saveLater() {
    clearTimeout(this.autoSaveTimer)
    this.autoSaveTimer = setTimeout(() => this._saveNow(), 800)
  },

  async _saveNow() {
    try {
      this.page = await API.updateSite(this.page.id, {
        title: this.page.title, slug: this.page.slug, sections: this.page.sections,
        seo: this.page.seo, theme: this.page.theme, customDomain: this.page.customDomain
      })
    } catch (e) { console.error('Save failed:', e) }
  },

  async _publish() {
    try {
      await this._saveNow()
      this.page = await API.publishSite(this.page.id)
      Toast.show('Published! Visit ' + subdomainUrl(this.page.slug), 'success')
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
    if (!confirm('Delete this site forever? This cannot be undone.')) return
    try { await API.deleteSite(this.page.id); Toast.show('Site deleted', 'info'); Router.navigate('dashboard') }
    catch (e) { Toast.show(e.message, 'error') }
  }
}
