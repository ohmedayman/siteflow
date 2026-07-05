/** Site Flow — Page Builder */

const Builder = {
  page: null, editingIdx: 0, mobileMode: false, siteId: null,
  undoStack: [], redoStack: [],
  _pushUndo() { this.undoStack.push(JSON.parse(JSON.stringify(this.page.sections))); this.redoStack = [] },
  _undo() {
    if (!this.undoStack.length) return
    this.redoStack.push(JSON.parse(JSON.stringify(this.page.sections)))
    this.page.sections = this.undoStack.pop()
    if (this.editingIdx >= this.page.sections.length) this.editingIdx = Math.max(0, this.page.sections.length - 1)
    this._saveNow(); this._renderSections(); this._renderCanvas(); this.bindAll()
  },
  _redo() {
    if (!this.redoStack.length) return
    this.undoStack.push(JSON.parse(JSON.stringify(this.page.sections)))
    this.page.sections = this.redoStack.pop()
    if (this.editingIdx >= this.page.sections.length) this.editingIdx = Math.max(0, this.page.sections.length - 1)
    this._saveNow(); this._renderSections(); this._renderCanvas(); this.bindAll()
  },

  async load(id) {
    if (!Auth.requireAuth()) return
    this.siteId = id
    try {
      this.page = await API.getSite(id)
      if (!this.page) throw new Error('Site not found')
      this.editingIdx = 0; this.mobileMode = false; this.undoStack = []; this.redoStack = []
      this.render(); this.bindAll()
    } catch(e) { Toast.show(e.message,'error'); Router.navigate('dashboard') }
  },

  render() {
    document.getElementById('app').innerHTML = T.builder(this.page)
    this._renderSections(); this._renderCanvas(); this._updateSeoPreview()
  },

  _renderSections() {
    const list = document.getElementById('sectionList')
    if (!list) return
    const icons = { hero:'🏠', about:'👤', gallery:'🖼️', contact:'📧', services:'💼', testimonials:'💬', pricing:'💰', faq:'❓', team:'👥', footer:'📋' }
    const descs = { hero:'Header & intro',about:'About text',gallery:'Image gallery',contact:'Contact form',services:'What you offer',testimonials:'Client reviews',pricing:'Price plans',faq:'FAQ questions',team:'Team members',footer:'Page footer' }
    list.innerHTML = this.page.sections.map((s,i) =>
      `<div class="section-item ${i===this.editingIdx?'active':''}" data-index="${i}" draggable="true">
        <span class="drag-handle">⠿</span>
        <div class="section-item-icon" style="background:${i===this.editingIdx?'var(--primary-light)':'var(--gray-100)'}">${icons[s.type]||'📄'}</div>
        <div class="section-item-info"><h4>${s.type.charAt(0).toUpperCase()+s.type.slice(1)}</h4><p>${descs[s.type]||''}</p></div>
        <button class="dup-section" data-dup="${i}" title="Duplicate">⧉</button>
        <button class="del-section" data-del="${i}" title="Delete">✕</button>
      </div>`).join('')
    this._initDrag()
  },

  _renderCanvas() {
    const frame = document.getElementById('canvasFrame')
    if (!frame) return
    frame.classList.toggle('mobile', this.mobileMode)
    frame.innerHTML = '<div style="padding:0">' + this.page.sections.map((s,i) => {
      switch(s.type) {
        case 'hero': return T.heroSection(s.data, i===this.editingIdx)
        case 'about': return T.aboutSection(s.data, i===this.editingIdx)
        case 'gallery': return T.gallerySection(s.data, i===this.editingIdx)
        case 'contact': return T.contactSection(s.data, i===this.editingIdx)
        case 'services': return T.servicesSection(s.data, i===this.editingIdx)
        case 'testimonials': return T.testimonialsSection(s.data, i===this.editingIdx)
        case 'pricing': return T.pricingSection(s.data, i===this.editingIdx)
        case 'faq': return T.faqSection(s.data, i===this.editingIdx)
        case 'team': return T.teamSection(s.data, i===this.editingIdx)
        case 'footer': return T.footerSection(s.data, i===this.editingIdx)
        default: return ''
      }
    }).join('') + '</div>'
    this._applyTheme()
  },

  _applyTheme() {
    const f=document.getElementById('canvasFrame')
    if (!f) return
    const t=this.page.theme||{color:'#6366f1',font:'Inter'}
    f.style.setProperty('--p-color',t.color); f.style.setProperty('--p-font',t.font)
    f.style.fontFamily=`${t.font},sans-serif`
    f.querySelectorAll('.hero-heading').forEach(el=>el.style.color=t.color)
  },

  bindAll() {
    this._bindToolbar(); this._bindTabs(); this._bindSectionList(); this._bindEditing(); this._bindTheme(); this._bindSeo(); this._bindSettings()
  },

  _bindToolbar() {
    document.getElementById('undoBtn')?.addEventListener('click',()=>this._undo())
    document.getElementById('redoBtn')?.addEventListener('click',()=>this._redo())
    document.addEventListener('keydown', e => { if ((e.ctrlKey||e.metaKey) && e.key==='z') { e.preventDefault(); if (e.shiftKey) this._redo(); else this._undo() } if ((e.ctrlKey||e.metaKey) && e.key==='y') { e.preventDefault(); this._redo() } })
    document.getElementById('previewBtn')?.addEventListener('click',()=>{this._saveNow();window.open('#/preview/'+this.page.id,'_blank')})
    document.getElementById('publishBtn')?.addEventListener('click',()=>this._publish())
    document.getElementById('saveBtn')?.addEventListener('click',()=>{this._saveNow();Toast.show('Saved!','success')})
    document.getElementById('deviceToggle')?.addEventListener('click',e=>{
      const btn=e.target.closest('.device-btn'); if(!btn) return
      document.querySelectorAll('.device-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active')
      this.mobileMode=btn.dataset.device==='mobile'
      document.getElementById('canvasFrame')?.classList.toggle('mobile',this.mobileMode)
    })
  },

  _bindTabs() {
    document.querySelectorAll('[data-stab]').forEach(tab=>{
      tab.addEventListener('click',()=>{
        document.querySelectorAll('.sidebar-tab').forEach(t=>t.classList.remove('active')); tab.classList.add('active')
        document.querySelectorAll('.sidebar-content').forEach(c=>c.classList.add('hidden'))
        const id='sidebar'+tab.dataset.stab.charAt(0).toUpperCase()+tab.dataset.stab.slice(1)
        document.getElementById(id)?.classList.remove('hidden')
      })
    })
  },

  _bindSectionList() {
    const list = document.getElementById('sectionList')
    list?.addEventListener('click',e=>{
      const item=e.target.closest('.section-item'), del=e.target.closest('.del-section'), dup=e.target.closest('.dup-section')
      if (del) {
        const idx=parseInt(del.dataset.del); this._pushUndo(); this.page.sections.splice(idx,1)
        if (this.editingIdx>=this.page.sections.length) this.editingIdx=Math.max(0,this.page.sections.length-1)
        this._saveNow(); this._renderSections(); this._renderCanvas(); this.bindAll(); Toast.show('Section deleted','info'); return
      }
      if (dup) {
        const idx=parseInt(dup.dataset.dup); this._pushUndo()
        const copy=JSON.parse(JSON.stringify(this.page.sections[idx]))
        this.page.sections.splice(idx+1,0,copy)
        this.editingIdx=idx+1; this._saveNow(); this._renderSections(); this._renderCanvas(); this.bindAll(); Toast.show('Section duplicated','info'); return
      }
      if (!item) return
      this.editingIdx=parseInt(item.dataset.index); this._renderSections(); this._renderCanvas(); this.bindAll()
    })
    document.getElementById('addSectionBtn')?.addEventListener('click',()=>this._addSection())
  },

  _initDrag() {
    let dragged=null
    document.querySelectorAll('.section-item[draggable]').forEach(el=>{
      el.addEventListener('dragstart',e=>{dragged=parseInt(el.dataset.index);el.classList.add('dragging');e.dataTransfer.effectAllowed='move'})
      el.addEventListener('dragend',()=>el.classList.remove('dragging'))
      el.addEventListener('dragover',e=>{e.preventDefault();el.classList.add('drag-over')})
      el.addEventListener('dragleave',()=>el.classList.remove('drag-over'))
      el.addEventListener('drop',e=>{
        e.preventDefault(); el.classList.remove('drag-over')
        const target=parseInt(el.dataset.index)
        if (dragged===null||dragged===target) return
        this._pushUndo(); const items=this.page.sections; const [removed]=items.splice(dragged,1); items.splice(target,0,removed)
        this.editingIdx=target; this._saveNow(); this._renderSections(); this._renderCanvas(); this.bindAll(); dragged=null
      })
    })
  },

  _bindEditing() {
    document.querySelectorAll('[contenteditable]').forEach(el=>{
      el.addEventListener('blur',()=>{
        const s=this.page.sections[this.editingIdx]; if(!s) return
        const f=el.dataset.field; if(!f) return
        const parts=f.split('.')
        if (parts.length===3) {
          const [arr,idx,prop]=parts
          if(s.data[arr]&&s.data[arr][parseInt(idx)]) s.data[arr][parseInt(idx)][prop]=el.innerText
        } else if (parts.length===2) {
          const [arr,idx]=parts
          if(s.data[arr]) s.data[arr][parseInt(idx)]=el.innerText
        } else {
          s.data[f]=el.innerText
        }
        this._saveNow()
      })
      el.addEventListener('keydown',e=>{
        if (e.key==='Enter'&&!e.shiftKey){e.preventDefault();document.execCommand('insertLineBreak')}
      })
    })
    document.getElementById('heroImagePlaceholder')?.addEventListener('click',()=>document.getElementById('heroImageInput')?.click())
    document.getElementById('heroImageInput')?.addEventListener('change',e=>{
      const file=e.target.files[0]; if(!file) return
      const reader=new FileReader()
      reader.onload=ev=>{const s=this.page.sections.find(x=>x.type==='hero'); if(s){s.data.image=ev.target.result;this._saveNow();this._renderCanvas();this.bindAll()}}
      reader.readAsDataURL(file)
    })
    document.querySelector('[data-hero-remove]')?.addEventListener('click',()=>{
      const s=this.page.sections.find(x=>x.type==='hero'); if(s){s.data.image='';this._saveNow();this._renderCanvas();this.bindAll()}
    })
    document.getElementById('galleryGrid')?.addEventListener('click',e=>{
      if (e.target.closest('#addGalleryBtn')) document.getElementById('galleryImageInput')?.click()
      const rm=e.target.closest('.remove-img')
      if (rm&&rm.dataset.index!==undefined){const s=this.page.sections.find(x=>x.type==='gallery');if(s){s.data.images.splice(parseInt(rm.dataset.index),1);this._saveNow();this._renderCanvas();this.bindAll()}}
    })
    document.getElementById('galleryImageInput')?.addEventListener('change',e=>{
      const files=Array.from(e.target.files); if(!files.length) return
      const s=this.page.sections.find(x=>x.type==='gallery'); if(!s) return
      let loaded=0
      files.forEach(file=>{const r=new FileReader(); r.onload=ev=>{s.data.images.push(ev.target.result);loaded++;if(loaded===files.length){this._saveNow();this._renderCanvas();this.bindAll()}}; r.readAsDataURL(file)})
    })
  },

  _bindTheme() {
    document.querySelectorAll('.color-swatch').forEach(el=>{
      el.addEventListener('click',()=>{
        document.querySelectorAll('.color-swatch').forEach(s=>s.classList.remove('active')); el.classList.add('active')
        this.page.theme.color=el.dataset.color; document.getElementById('customColor').value=el.dataset.color; document.getElementById('colorHexInput').value=el.dataset.color
        this._saveNow(); this._renderCanvas(); this.bindAll()
      })
    })
    document.getElementById('customColor')?.addEventListener('input',e=>{
      this.page.theme.color=e.target.value; document.getElementById('colorHexInput').value=e.target.value
      document.querySelectorAll('.color-swatch').forEach(s=>s.classList.remove('active')); this._saveNow(); this._renderCanvas(); this.bindAll()
    })
    document.getElementById('colorHexInput')?.addEventListener('input',e=>{
      if(/^#[0-9a-f]{6}$/i.test(e.target.value)){this.page.theme.color=e.target.value;document.getElementById('customColor').value=e.target.value;document.querySelectorAll('.color-swatch').forEach(s=>s.classList.remove('active'));this._saveNow();this._renderCanvas();this.bindAll()}
    })
    document.getElementById('fontSelect')?.addEventListener('change',e=>{this.page.theme.font=e.target.value;this._saveNow();this._renderCanvas();this.bindAll()})
  },

  _bindSeo() {
    const st=document.getElementById('seoTitle'), sd=document.getElementById('seoDesc')
    st?.addEventListener('input',()=>{if(!this.page.seo)this.page.seo={title:'',description:''};this.page.seo.title=st.value;const p=document.getElementById('seoTitlePreview');if(p)p.textContent=st.value||'My Site';this._saveNow()})
    sd?.addEventListener('input',()=>{if(!this.page.seo)this.page.seo={title:'',description:''};this.page.seo.description=sd.value;const c=document.getElementById('seoDescCounter');if(c)c.textContent=sd.value.length+'/160';this._saveNow()})
  },

  _bindSettings() {
    document.getElementById('pageTitleInput')?.addEventListener('input',e=>{this.page.title=e.target.value;this._saveNow();const tb=document.querySelector('.builder-toolbar .truncate');if(tb)tb.textContent=e.target.value})
    document.getElementById('pageSlugInput')?.addEventListener('input',e=>{
      this.page.slug=e.target.value.replace(/[^a-z0-9-]/g,'').toLowerCase(); const p=document.getElementById('slugPreview')
      if(p)p.textContent=this.page.slug+'.'+MAIN_DOMAIN; this._saveNow()
    })
    document.getElementById('customDomainInput')?.addEventListener('input',e=>{this.page.customDomain=e.target.value;this._saveNow()})
    document.getElementById('deleteSiteBtn')?.addEventListener('click',()=>this._deleteSite())
  },

  _updateSeoPreview() {
    const p=document.getElementById('seoTitlePreview'), c=document.getElementById('seoDescCounter')
    if (p&&this.page.seo) p.textContent=this.page.seo.title||'My Site'
    if (c&&this.page.seo) c.textContent=(this.page.seo.description||'').length+'/160'
  },

  async _saveNow() {
    try {
      this.page = await API.updateSite(this.page.id, { title:this.page.title, slug:this.page.slug, sections:this.page.sections, seo:this.page.seo, theme:this.page.theme, customDomain:this.page.customDomain })
    } catch(e) { console.error('Save failed:',e) }
  },

  async _publish() {
    try {
      await this._saveNow()
      this.page = await API.publishSite(this.page.id)
      Toast.show('Published successfully!','success')
      const b=document.querySelector('.badge-status'); if(b){b.textContent='Published';b.style.background='#d1fae5';b.style.color='#065f46'}
      const btn=document.getElementById('publishBtn'); if(btn)btn.textContent='Update'
    } catch(e) { Toast.show(e.message,'error') }
  },

  async createNew() {
    if(!Auth.requireAuth()) return
    const existing = document.getElementById('templateModal')
    if (existing) existing.closest('.modal-overlay')?.remove()
    const div = document.createElement('div'); div.id='templateModalWrap'
    div.innerHTML = T.templatePicker()
    document.body.appendChild(div)

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'))
        btn.classList.add('active')
        const filter = btn.dataset.filter
        document.querySelectorAll('.template-card').forEach(card => {
          card.style.display = (filter==='all' || card.dataset.category===filter) ? '' : 'none'
        })
      })
    })

    // Template selection
    document.querySelectorAll('.template-card').forEach(card => {
      card.addEventListener('click', async () => {
        const templateId = card.dataset.template
        try {
          div.remove()
          const site = await API.createSite({title:'My New Site', template_type: templateId})
          Toast.show('Site created!','success'); Router.navigate('builder/'+site.id)
        } catch(e) { Toast.show(e.message,'error') }
      })
    })

    // Close on overlay click
    div.querySelector('.modal-overlay')?.addEventListener('click', e => {
      if (e.target.classList.contains('modal-overlay')) div.remove()
    })
  },

  _addSection() {
    const types=['hero','about','services','testimonials','pricing','gallery','faq','team','contact','footer']
    const next=types[(types.indexOf(this.page.sections[this.editingIdx]?.type)+1)%types.length]
    const defs={hero:{heading:'New Section',description:'Add your content here...',image:''},about:{heading:'About',content:'Write about yourself...'},services:{heading:'Our Services',items:[{title:'Service 1',desc:'Description'},{title:'Service 2',desc:'Description'}]},testimonials:{heading:'Testimonials',items:[{name:'Client',text:'Great work!',role:'CEO'}]},pricing:{heading:'Pricing',plans:[{name:'Basic',price:'$9/mo',features:['Feature 1','Feature 2']}]},gallery:{heading:'Gallery',images:[]},faq:{heading:'FAQ',items:[{q:'Question here?',a:'Answer here'}]},team:{heading:'Our Team',items:[{name:'Team Member',role:'Role'}]},contact:{heading:'Contact',email:'',phone:'',address:''},footer:{copyright:'© 2026 All rights reserved.',text:'Powered by Site Flow'}}
    this._pushUndo(); this.page.sections.push({type:next,data:defs[next]}); this.editingIdx=this.page.sections.length-1
    this._saveNow(); this._renderSections(); this._renderCanvas(); this.bindAll()
  },

  async _deleteSite() {
    if (!confirm('Delete this site forever?')) return
    try { await API.deleteSite(this.page.id); Toast.show('Deleted','info'); Router.navigate('dashboard') }
    catch(e) { Toast.show(e.message,'error') }
  }
}
