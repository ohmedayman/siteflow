const T = {
  loading() { return `<div class="loading-screen"><div class="spinner"></div><p style="color:var(--gray-500)">Loading Site Flow...</p></div>` },
  notFound(title, msg) { return `
<div style="display:flex;align-items:center;justify-content:center;min-height:calc(100vh - 64px);padding:40px 24px">
  <div style="text-align:center;max-width:480px">
    <div style="font-size:6rem;font-weight:800;color:var(--gray-200);line-height:1;margin-bottom:8px">404</div>
    <h1 style="font-size:1.8rem;margin-bottom:8px">${title||'Page Not Found'}</h1>
    <p style="color:var(--gray-500);margin-bottom:32px">${msg||'The page you are looking for does not exist or has been moved.'}</p>
    <a href="/" class="btn btn-primary btn-lg" onclick="Router.navigate('')">Go Home</a>
  </div>
</div>` },

  // ── Landing ──
  landing() { return `
<div class="landing-hero">
  <div class="badge">🚀 No-Code Website Builder</div>
  <h1>Create Professional Websites<br>Without Writing Code</h1>
  <p>Site Flow lets you build stunning, SEO-optimized websites in minutes. Choose from professional templates, customize with drag & drop, and publish instantly.</p>
  <div class="cta-buttons">
    <a href="#/login" class="btn btn-primary btn-lg js-auth-guest">Get Started Free</a>
    <a href="#/dashboard" class="btn btn-primary btn-lg js-auth-user hidden">Go to Dashboard</a>
    <a href="#/plans" class="btn btn-outline btn-lg">See Plans</a>
  </div>
  <div style="margin-top:48px;display:flex;gap:16px;justify-content:center;flex-wrap:wrap;color:var(--gray-400);font-size:.85rem">
    <span>✅ No coding</span><span>🎨 8+ Templates</span><span>🔗 Custom domain</span><span>📱 Responsive</span><span>🌐 RTL Support</span>
  </div>
</div>
<div class="features-grid">
  ${[
    ['🎨','Visual Builder','Drag-and-drop with real-time inline editing. No coding required.'],
    ['📚','8+ Templates','Choose from Portfolio, Business, Restaurant, Blog, Gallery, and more.'],
    ['🔍','SEO Optimized','Custom titles, meta descriptions, clean HTML. Your sites rank higher.'],
    ['📱','Responsive','Every site looks perfect on mobile, tablet, and desktop.'],
    ['🔗','Custom Domains','Connect your own domain for a professional presence.'],
    ['💰','Free to Start','Start free, upgrade as you grow. Pro $9/mo, Business $29/mo.'],
    ['📊','Analytics','Track views and visitors for all your published sites.'],
    ['🌐','Arabic Support','Full Arabic interface and RTL support for your audience.']
  ].map(([i,t,d]) => `<div class="feature-card card card-hover"><div class="icon" style="background:var(--primary-light);color:var(--primary)">${i}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}
</div>` },

  // ── Login ──
  login() { return `
<div class="auth-page">
  <div class="auth-left">
    <div class="auth-left-content">
      <h1>Build Your<br>Dream Website</h1>
      <p>Join thousands of creators using Site Flow. Choose a template, customize, and publish in minutes.</p>
    </div>
  </div>
  <div class="auth-right">
    <div class="auth-form">
      <h2>Welcome to Site Flow</h2>
      <p class="subtitle">Sign in or create your account</p>
      <button class="btn btn-outline btn-lg w-full" id="googleBtn" style="margin-bottom:16px;justify-content:center;gap:12px">
        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Continue with Google
      </button>
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px"><div style="flex:1;height:1px;background:var(--gray-200)"></div><span style="color:var(--gray-400);font-size:.85rem">or</span><div style="flex:1;height:1px;background:var(--gray-200)"></div></div>
      <div class="auth-tabs">
        <button class="auth-tab active" data-tab="login">Sign In</button>
        <button class="auth-tab" data-tab="signup">Create Account</button>
      </div>
      <div class="auth-error" id="authError"></div>
      <form id="loginForm">
        <div class="input-group"><label>Email</label><input type="email" class="input" id="loginEmail" placeholder="you@example.com" required></div>
        <div class="input-group"><label>Password</label><input type="password" class="input" id="loginPassword" placeholder="Enter password" required></div>
        <button type="submit" class="btn btn-primary btn-lg w-full">Sign In</button>
      </form>
      <form id="signupForm" class="hidden">
        <div class="input-group"><label>Full Name</label><input type="text" class="input" id="signupName" placeholder="Your Name" required></div>
        <div class="input-group"><label>Email</label><input type="email" class="input" id="signupEmail" placeholder="you@example.com" required></div>
        <div class="input-group"><label>Password</label><input type="password" class="input" id="signupPassword" placeholder="Create a password" required></div>
        <button type="submit" class="btn btn-primary btn-lg w-full">Create Account</button>
      </form>
      <div class="auth-demo">
        <strong>🔑 Demo Accounts</strong>
        User: <code>demo@siteflow.app</code> / <code>demo123</code><br>
        Admin: <code>admin@siteflow.app</code> / <code>admin123</code>
      </div>
    </div>
  </div>
</div>` },

  // ── Template Picker Modal ──
  templatePicker() { return `
<div class="modal-overlay open" id="templateModal">
  <div class="modal" style="max-width:900px;padding:24px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
      <h3 style="font-size:1.3rem">Choose a Template</h3>
      <button class="btn btn-ghost btn-sm" onclick="document.getElementById('templateModal').classList.remove('open')">✕</button>
    </div>
    <p style="color:var(--gray-500);margin-bottom:20px">Start with a pre-built template or a blank canvas</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px">
      ${PRESETS.map(t => `
        <div class="card card-hover template-card" data-template="${t.id}" style="padding:20px;cursor:pointer;text-align:center;${t.id==='blank'?'border:2px dashed var(--gray-300)':''}">
          <div style="font-size:2.5rem;margin-bottom:8px">${t.icon}</div>
          <h4 style="font-size:.95rem;margin-bottom:4px">${t.name}</h4>
          <p style="font-size:.78rem;color:var(--gray-500)">${t.desc}</p>
        </div>
      `).join('')}
    </div>
  </div>
</div>` },

  // ── Dashboard ──
  dashboard() { return `
<div class="dashboard">
  <div class="dashboard-header">
    <div><h1>My Sites</h1><p>Manage your websites</p></div>
    <div style="display:flex;gap:8px;align-items:center">
      <span class="js-user-name" style="font-size:.85rem;color:var(--gray-500)"></span>
      <a href="#/plans" class="btn btn-outline btn-sm" id="upgradeBtn">Upgrade</a>
      <button class="btn btn-primary" id="createSiteBtn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> New Site</button>
    </div>
  </div>
  <div id="dashStats"></div>
  <div id="sitesContainer"></div>
</div>` },

  // ── Plans / Pricing ──
  plans(plans) { return `
<div style="max-width:1100px;margin:0 auto;padding:60px 24px">
  <div class="text-center mb-24">
    <h1 style="font-size:2.2rem;margin-bottom:8px">Simple, Transparent Pricing</h1>
    <p style="color:var(--gray-500)">Start free, upgrade when you need more features</p>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px">
    ${Object.entries(plans).map(([k,p])=>{
      const cur=Auth.user?.plan===k
      return `<div class="card" style="padding:32px;position:relative;${cur?'border:2px solid var(--primary);box-shadow:var(--shadow-md)':''}${k==='pro'?'border:2px solid var(--primary);':''}">
        ${cur?'<div style="position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:var(--primary);color:#fff;padding:4px 16px;border-radius:20px;font-size:.75rem;font-weight:700">CURRENT</div>':''}
        ${k==='pro'&&!cur?'<div style="position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:#059669;color:#fff;padding:4px 16px;border-radius:20px;font-size:.75rem;font-weight:700">POPULAR</div>':''}
        <h3 style="font-size:1.5rem;margin-bottom:4px">${p.name}</h3>
        <div style="font-size:2.5rem;font-weight:800;color:var(--primary);margin-bottom:20px">${p.price===0?'Free':'$'+p.price}<span style="font-size:1rem;color:var(--gray-500);font-weight:400">${p.price>0?'/mo':''}</span></div>
        <ul style="list-style:none;padding:0;margin-bottom:24px;display:flex;flex-direction:column;gap:10px">
          <li>✅ ${p.max_sites===-1?'Unlimited sites':p.max_sites+' site'+(p.max_sites>1?'s':'')}</li>
          <li>${p.custom_domain?'✅':'❌'} Custom domains</li>
          <li>${p.analytics?'✅':'❌'} Analytics</li>
          <li>${p.premium_themes?'✅':'❌'} Premium themes</li>
          <li>${p.priority_support?'✅':'❌'} Priority support</li>
        </ul>
        <button class="btn w-full ${cur?'btn-secondary':'btn-primary'} plan-btn" data-plan="${k}">${cur?'Current Plan':p.price===0?'Get Started':'Subscribe'}</button>
      </div>`
    }).join('')}
  </div>
</div>` },

  // ── Builder ──
  builder(page) {
    const t=page.theme||{color:'#6366f1',font:'Inter'}
    return `<div class="builder-toolbar">
      <div class="left">
        <button class="btn btn-ghost btn-sm" onclick="Router.navigate('dashboard')"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg> Back</button>
        <span class="truncate" style="font-weight:600;margin-left:4px;max-width:160px">${page.title}</span>
        <span class="badge-status" style="font-size:.72rem;padding:3px 10px;border-radius:20px;font-weight:600;${page.published?'background:#d1fae5;color:#065f46':'background:#fef3c7;color:#92400e'}">${page.published?'Published':'Draft'}</span>
      </div>
      <div class="right">
        <button class="btn btn-ghost btn-sm" id="undoBtn" title="Undo">↩</button>
        <button class="btn btn-ghost btn-sm" id="redoBtn" title="Redo">↪</button>
        <div class="device-toggle" id="deviceToggle">
          <button class="device-btn active" data-device="desktop" title="Desktop">🖥</button>
          <button class="device-btn" data-device="mobile" title="Mobile">📱</button>
          <button class="device-btn" data-device="tablet" title="Tablet">📟</button>
        </div>
        <button class="btn btn-outline btn-sm" id="saveBtn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Save</button>
        <button class="btn btn-outline btn-sm" id="previewBtn">Preview</button>
        <button class="btn btn-primary btn-sm" id="publishBtn">${page.published?'Update':'Publish'}</button>
      </div>
    </div>
    <div class="builder-layout">
      <div class="builder-sidebar">
        <div class="sidebar-tabs">
          <button class="sidebar-tab active" data-stab="sections">Sections</button>
          <button class="sidebar-tab" data-stab="theme">Theme</button>
          <button class="sidebar-tab" data-stab="seo">SEO</button>
          <button class="sidebar-tab" data-stab="settings">Settings</button>
        </div>
        <div class="sidebar-content" id="sidebarSections">
          <div class="section-list" id="sectionList"></div>
          <button class="btn btn-secondary btn-sm w-full mt-8" id="addSectionBtn">+ Add Section</button>
          <div style="margin-top:12px;padding:12px;background:var(--gray-50);border-radius:8px;font-size:.78rem;color:var(--gray-500);text-align:center">Drag sections to reorder. Click to edit.</div>
        </div>
        <div class="sidebar-content hidden" id="sidebarTheme">
          <div class="theme-option"><label>Primary Color</label><div class="color-picker" id="colorPresets">${['#6366f1','#3b82f6','#06b6d4','#059669','#d97706','#dc2626','#8b5cf6','#ec4899','#f97316','#14b8a6'].map(c=>`<div class="color-swatch ${t.color===c?'active':''}" style="background:${c}" data-color="${c}"></div>`).join('')}</div><div class="color-input-wrap"><input type="color" id="customColor" value="${t.color}"><input class="input" id="colorHexInput" value="${t.color}"></div></div>
          <div class="theme-option"><label>Font</label><select class="font-select" id="fontSelect">${['Inter','Arial','Georgia','Helvetica','Merriweather','Times New Roman','Verdana','Roboto','Open Sans','Cairo','Tajawal'].map(f=>`<option value="${f}" ${t.font===f?'selected':''}>${f}</option>`).join('')}</select></div>
          <div class="theme-option"><label>Background</label><div style="display:flex;gap:8px"><input type="color" id="bgColor" value="#ffffff" class="color-swatch" style="border-radius:8px;width:44px;height:44px;padding:0;border:2px solid var(--gray-200)"><input class="input" id="bgColorInput" value="#ffffff" placeholder="#ffffff"></div></div>
        </div>
        <div class="sidebar-content hidden" id="sidebarSeo">
          <div class="seo-field"><label>SEO Title</label><input class="input" id="seoTitle" value="${page.seo?.title||''}" maxlength="60"><div class="seo-preview"><div class="url">${page.slug||'my-site'}.siteflow.app</div><div class="title" id="seoTitlePreview">${page.seo?.title||'My Site'}</div></div></div>
          <div class="seo-field"><label>Meta Description</label><textarea class="input textarea" id="seoDesc" maxlength="160">${page.seo?.description||''}</textarea><div class="seo-preview" id="seoDescCounter">0 / 160</div></div>
        </div>
        <div class="sidebar-content hidden" id="sidebarSettings">
          <div class="settings-group"><label>Site Title</label><input class="input" id="pageTitleInput" value="${page.title}"></div>
          <div class="settings-group"><label>Slug</label><input class="input" id="pageSlugInput" value="${page.slug||''}"><div class="hint">URL: <span id="slugPreview" style="color:var(--primary)">${page.slug||'my-site'}.${MAIN_DOMAIN}</span></div></div>
          <div class="settings-group"><label>Custom Domain</label><input class="input" id="customDomainInput" value="${page.customDomain||page.custom_domain||''}" placeholder="yourdomain.com"><div class="hint">Connect your own domain (Pro+ plans)</div></div>
          <div style="padding-top:12px;border-top:1px solid var(--gray-200)"><label style="font-size:.82rem;font-weight:600;color:var(--gray-700);display:block;margin-bottom:8px">Danger Zone</label><button class="btn btn-danger btn-sm w-full" id="deleteSiteBtn">Delete This Site</button></div>
        </div>
      </div>
      <div class="builder-canvas" id="builderCanvas"><div class="canvas-frame" id="canvasFrame"></div></div>
    </div>`
  },

  // ── Sections ──
  heroSection(d,a) { return `<div class="editable-section hero-section ${a?'editing':''}" data-section="hero"><div class="section-label">Hero</div><h1 contenteditable="true" data-field="heading" class="hero-heading">${d.heading||'Welcome'}</h1><p contenteditable="true" data-field="description" style="font-size:1.15rem;color:var(--gray-500);max-width:550px;line-height:1.7">${d.description||''}</p>${d.image?`<div class="hero-image-wrap"><img src="${d.image}"><button class="remove-img" style="position:absolute;top:6px;right:6px;z-index:2" data-hero-remove>✕</button></div>`:`<div class="hero-image-wrap" id="heroImagePlaceholder"><span>+</span></div>`}<input type="file" accept="image/*" id="heroImageInput" style="display:none"></div>` },
  aboutSection(d,a) { return `<div class="editable-section about-section ${a?'editing':''}" data-section="about"><div class="section-label">About</div><h2 contenteditable="true" data-field="heading">${d.heading||'About'}</h2><p contenteditable="true" data-field="content" style="font-size:1.05rem;line-height:1.8">${d.content||''}</p></div>` },
  gallerySection(d,a) { const im=d.images||[]; return `<div class="editable-section gallery-section ${a?'editing':''}" data-section="gallery"><div class="section-label">Gallery</div><h2 contenteditable="true" data-field="heading">${d.heading||'Gallery'}</h2><div class="gallery-grid" id="galleryGrid">${im.length===0?'<div style="grid-column:1/-1;text-align:center;color:var(--gray-400);padding:40px">Click + to add images</div>':''}${im.map((img,i)=>`<div class="gallery-item" style="border-style:solid"><img src="${img}"><button class="remove-img" data-index="${i}">✕</button></div>`).join('')}<div class="gallery-item" id="addGalleryBtn" style="cursor:pointer"><span>+</span></div></div><input type="file" accept="image/*" id="galleryImageInput" style="display:none" multiple></div>` },
  contactSection(d,a) { return `<div class="editable-section contact-section ${a?'editing':''}" data-section="contact"><div class="section-label">Contact</div><h2 contenteditable="true" data-field="heading">${d.heading||'Contact'}</h2><div class="contact-form"><div class="input-group"><label>Name</label><input class="input" placeholder="Your Name" disabled style="opacity:.6"></div><div class="input-group"><label>Email</label><input class="input" placeholder="your@email.com" disabled style="opacity:.6"></div><div class="input-group"><label>Message</label><textarea class="input textarea" placeholder="Your message..." disabled style="opacity:.6"></textarea></div><button class="btn btn-primary" disabled style="opacity:.6">Send</button></div></div>` },

  servicesSection(d,a) { const items=d.items||[]; return `<div class="editable-section services-section ${a?'editing':''}" data-section="services"><div class="section-label">Services</div><h2 contenteditable="true" data-field="heading">${d.heading||'Services'}</h2><div class="services-grid">${items.map((item,i)=>`<div class="service-card"><h3 contenteditable="true" data-field="items.${i}.title">${item.title}</h3><p contenteditable="true" data-field="items.${i}.desc">${item.desc}</p></div>`).join('')}<div class="service-card add-card" data-add-item="services" style="cursor:pointer;border:2px dashed var(--gray-300)"><span>+</span></div></div></div>` },

  testimonialsSection(d,a) { const items=d.items||[]; return `<div class="editable-section testimonials-section ${a?'editing':''}" data-section="testimonials"><div class="section-label">Testimonials</div><h2 contenteditable="true" data-field="heading">${d.heading||'Testimonials'}</h2><div class="testimonials-grid">${items.map((item,i)=>`<div class="testimonial-card"><p contenteditable="true" data-field="items.${i}.text">"${item.text}"</p><div class="testimonial-author"><strong contenteditable="true" data-field="items.${i}.name">${item.name}</strong><span contenteditable="true" data-field="items.${i}.role">${item.role||''}</span></div></div>`).join('')}<div class="testimonial-card add-card" data-add-item="testimonials" style="cursor:pointer;border:2px dashed var(--gray-300)"><span>+</span></div></div></div>` },

  pricingSection(d,a) { const plans=d.plans||[]; return `<div class="editable-section pricing-section ${a?'editing':''}" data-section="pricing"><div class="section-label">Pricing</div><h2 contenteditable="true" data-field="heading">${d.heading||'Pricing'}</h2><div class="pricing-grid">${plans.map((p,i)=>`<div class="pricing-card"><h3 contenteditable="true" data-field="plans.${i}.name">${p.name}</h3><div class="price" contenteditable="true" data-field="plans.${i}.price">${p.price}</div><ul>${(p.features||[]).map((f,fi)=>`<li contenteditable="true" data-field="plans.${i}.features.${fi}">${f}</li>`).join('')}</ul></div>`).join('')}<div class="pricing-card add-card" data-add-item="pricing" style="cursor:pointer;border:2px dashed var(--gray-300)"><span>+</span></div></div></div>` },

  faqSection(d,a) { const items=d.items||[]; return `<div class="editable-section faq-section ${a?'editing':''}" data-section="faq"><div class="section-label">FAQ</div><h2 contenteditable="true" data-field="heading">${d.heading||'FAQ'}</h2><div class="faq-list">${items.map((item,i)=>`<div class="faq-item"><h3 contenteditable="true" data-field="items.${i}.q">${item.q}</h3><p contenteditable="true" data-field="items.${i}.a">${item.a}</p></div>`).join('')}<div class="faq-item add-card" data-add-item="faq" style="cursor:pointer;border:2px dashed var(--gray-300);border-radius:8px"><span>+</span></div></div></div>` },

  teamSection(d,a) { const items=d.items||[]; return `<div class="editable-section team-section ${a?'editing':''}" data-section="team"><div class="section-label">Team</div><h2 contenteditable="true" data-field="heading">${d.heading||'Our Team'}</h2><div class="team-grid">${items.map((item,i)=>`<div class="team-card"><div class="team-avatar">${item.name?item.name.charAt(0):''}</div><h3 contenteditable="true" data-field="items.${i}.name">${item.name}</h3><p contenteditable="true" data-field="items.${i}.role">${item.role||''}</p></div>`).join('')}<div class="team-card add-card" data-add-item="team" style="cursor:pointer;border:2px dashed var(--gray-300)"><span>+</span></div></div></div>` },

  footerSection(d,a) { return `<div class="editable-section footer-section ${a?'editing':''}" data-section="footer"><div class="section-label">Footer</div><div class="footer-content"><p contenteditable="true" data-field="copyright">${d.copyright||'© 2026 All rights reserved.'}</p><p contenteditable="true" data-field="text">${d.text||'Powered by Site Flow'}</p></div></div>` },

  // ── Public page ──
  publicPage(page) {
    const t=page.theme||{color:'#6366f1',font:'Inter'}
    return `<div class="public-page" style="--p-color:${t.color};--p-font:${t.font};font-family:${t.font},sans-serif">
      <div class="public-nav"><span class="brand" style="color:${t.color}">${page.title}</span><span style="font-size:.75rem;color:var(--gray-400)">Powered by Site Flow</span></div>
      <div class="public-content">${page.sections.map(s=>{switch(s.type){case'hero':return T.pubHero(s.data,t);case'about':return T.pubAbout(s.data,t);case'gallery':return T.pubGallery(s.data,t);case'contact':return T.pubContact(s.data,t);case'services':return T.pubServices(s.data,t);case'testimonials':return T.pubTestimonials(s.data,t);case'pricing':return T.pubPricing(s.data,t);case'faq':return T.pubFaq(s.data,t);case'team':return T.pubTeam(s.data,t);case'footer':return T.pubFooter(s.data,t);default:return ''}}).join('')}</div>
      <footer>&copy; ${new Date().getFullYear()} ${page.title}. All rights reserved.</footer>
    </div>`
  },
  pubHero(d,t) { return `<div class="editable-section hero-section" style="background:linear-gradient(135deg,${t.color}11,#fff)">${d.image?`<div style="width:120px;height:120px;border-radius:50%;overflow:hidden;margin-bottom:16px;box-shadow:0 4px 20px ${t.color}33"><img src="${d.image}" style="width:100%;height:100%;object-fit:cover"></div>`:''}<h1 style="color:${t.color}">${d.heading}</h1><p>${d.description}</p></div>` },
  pubAbout(d,t) { return `<div class="editable-section about-section"><h2 style="color:${t.color}">${d.heading}</h2><p>${d.content}</p></div>` },
  pubGallery(d,t) { const im=d.images||[]; return `<div class="editable-section gallery-section"><h2 style="color:${t.color}">${d.heading}</h2><div class="gallery-grid">${im.length===0?'<p style="grid-column:1/-1;color:var(--gray-400)">No images</p>':''}${im.map(i=>`<div class="gallery-item" style="border-style:none"><img src="${i}"></div>`).join('')}</div></div>` },
  pubContact(d,t) { return `<div class="editable-section contact-section"><h2 style="color:${t.color}">${d.heading}</h2><div class="contact-form"><div class="input-group"><label>Name</label><input class="input"></div><div class="input-group"><label>Email</label><input class="input" type="email"></div><div class="input-group"><label>Message</label><textarea class="input textarea"></textarea></div><button class="btn w-full" style="background:${t.color};color:#fff">Send</button></div></div>` },

  pubServices(d,t) { const items=d.items||[]; return `<div class="editable-section services-section"><h2 style="color:${t.color}">${d.heading}</h2><div class="services-grid">${items.map(item=>`<div class="service-card"><h3>${item.title}</h3><p>${item.desc}</p></div>`).join('')}</div></div>` },

  pubTestimonials(d,t) { const items=d.items||[]; return `<div class="editable-section testimonials-section"><h2 style="color:${t.color}">${d.heading}</h2><div class="testimonials-grid">${items.map(item=>`<div class="testimonial-card"><p>"${item.text}"</p><div class="testimonial-author"><strong>${item.name}</strong><span>${item.role||''}</span></div></div>`).join('')}</div></div>` },

  pubPricing(d,t) { const plans=d.plans||[]; return `<div class="editable-section pricing-section"><h2 style="color:${t.color}">${d.heading}</h2><div class="pricing-grid">${plans.map(p=>`<div class="pricing-card"><h3>${p.name}</h3><div class="price">${p.price}</div><ul>${(p.features||[]).map(f=>`<li>${f}</li>`).join('')}</ul><button class="btn" style="background:${t.color};color:#fff;width:100%;margin-top:16px">Choose Plan</button></div>`).join('')}</div></div>` },

  pubFaq(d,t) { const items=d.items||[]; return `<div class="editable-section faq-section"><h2 style="color:${t.color}">${d.heading}</h2><div class="faq-list">${items.map(item=>`<div class="faq-item"><h3>${item.q}</h3><p>${item.a}</p></div>`).join('')}</div></div>` },

  pubTeam(d,t) { const items=d.items||[]; return `<div class="editable-section team-section"><h2 style="color:${t.color}">${d.heading}</h2><div class="team-grid">${items.map(item=>`<div class="team-card"><div class="team-avatar">${item.name?item.name.charAt(0):''}</div><h3>${item.name}</h3><p>${item.role||''}</p></div>`).join('')}</div></div>` },

  pubFooter(d,t) { return `<div class="editable-section footer-section" style="background:#0f172a;color:#94a3b8"><div class="footer-content"><p>${d.copyright||'© 2026 All rights reserved.'}</p><p>${d.text||'Powered by Site Flow'}</p></div></div>` },

  // ── Settings ──
  settings(user) { return `
<div style="max-width:600px;margin:0 auto;padding:40px 24px">
  <h1 style="font-size:1.8rem;margin-bottom:24px">Settings</h1>
  <div class="card">
    <div class="input-group"><label>Name</label><input class="input" id="settingsName" value="${user?.name||''}"></div>
    <div class="input-group"><label>Language</label><select class="input" id="settingsLang"><option value="en">English</option><option value="ar" ${(user?.lang||'en')==='ar'?'selected':''}>العربية</option></select></div>
    <div class="input-group"><label>New Password (optional)</label><input class="input" id="settingsPassword" type="password" placeholder="Leave blank to keep current"></div>
    <button class="btn btn-primary" id="saveSettingsBtn">Save Changes</button>
  </div>
</div>` },

  // ── Billing ──
  billing(payments, plans, user) { return `
<div style="max-width:800px;margin:0 auto;padding:40px 24px">
  <h1 style="font-size:1.8rem;margin-bottom:24px">Billing</h1>
  <div class="card mb-24">
    <h3 style="margin-bottom:8px">Current Plan: <span style="color:var(--primary)">${user?.plan||'Free'}</span></h3>
    <p style="color:var(--gray-500);margin-bottom:16px">Manage your subscription and payment history.</p>
    <a href="#/plans" class="btn btn-primary">Change Plan</a>
  </div>
  <div class="card">
    <h3 style="margin-bottom:16px">Payment History</h3>
    ${payments.length===0?'<p style="color:var(--gray-500)">No payments yet.</p>':
    `<table style="width:100%;border-collapse:collapse"><thead><tr style="border-bottom:1px solid var(--gray-200)"><th style="text-align:left;padding:8px;font-size:.85rem">Date</th><th style="text-align:left;padding:8px;font-size:.85rem">Plan</th><th style="text-align:left;padding:8px;font-size:.85rem">Amount</th><th style="text-align:left;padding:8px;font-size:.85rem">Status</th></tr></thead><tbody>${payments.map(p=>`<tr style="border-bottom:1px solid var(--gray-100)"><td style="padding:8px">${new Date(p.created_at||p.createdAt).toLocaleDateString()}</td><td style="padding:8px">${p.plan}</td><td style="padding:8px">$${p.amount}</td><td style="padding:8px"><span style="background:${p.status==='completed'?'#d1fae5;color:#065f46':'#fef3c7;color:#92400e'};padding:2px 10px;border-radius:12px;font-size:.78rem">${p.status||'completed'}</span></td></tr>`).join('')}</tbody></table>`}
  </div>
</div>` },

  // ── Help Center ──
  help() { return `
<div style="max-width:800px;margin:0 auto;padding:60px 24px">
  <h1 style="font-size:2rem;margin-bottom:8px">Help Center</h1>
  <p style="color:var(--gray-500);margin-bottom:40px">Everything you need to get started with Site Flow</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px">
    ${[
      {q:'How do I create a website?',a:'Click "New Site" from your dashboard, choose a template, then customize it with our drag-and-drop editor. When ready, click Publish.'},
      {q:'Can I use my own domain?',a:'Yes! Pro and Business plans support custom domains. Go to Settings in the editor and enter your domain name.'},
      {q:'Is there a free plan?',a:'Yes! The Free plan includes 1 site with basic features. Upgrade to Pro ($9/mo) for 10 sites and custom domains.'},
      {q:'How do I edit my site after publishing?',a:'Go to your dashboard, click Edit on your published site, make changes, and click Update to republish.'},
      {q:'Can I use Google login?',a:'Yes! Click "Continue with Google" on the login page to sign in with your Google account.'},
      {q:'Is Arabic supported?',a:'Yes! Site Flow supports full Arabic interface and RTL layout. Change language in Settings.'},
      {q:'How do I add images?',a:'In the editor, click the image placeholder in Hero section or click + in Gallery to upload images from your device.'},
      {q:'What templates are available?',a:'We offer 8 templates: Personal, Business, Restaurant, Gallery, Event, Form, Blog, and Blank Canvas.'}
    ].map(({q,a}) => `
      <div class="card card-hover" style="padding:20px;cursor:pointer" onclick="this.querySelector('.answer').classList.toggle('hidden')">
        <h3 style="font-size:.95rem;margin-bottom:6px;display:flex;align-items:center;gap:8px"><span style="color:var(--primary)">❓</span>${q}</h3>
        <p class="answer hidden" style="font-size:.85rem;color:var(--gray-600);margin-top:8px">${a}</p>
      </div>
    `).join('')}
  </div>
</div>` },

  // ── About Us ──
  about() { return `
<div style="max-width:700px;margin:0 auto;padding:60px 24px;text-align:center">
  <div style="font-size:4rem;margin-bottom:16px">🚀</div>
  <h1 style="font-size:2.2rem;margin-bottom:16px">About Site Flow</h1>
  <p style="color:var(--gray-600);font-size:1.1rem;line-height:1.8;margin-bottom:32px">Site Flow is a no-code website builder that empowers anyone to create professional websites without writing a single line of code. We believe that everyone deserves a beautiful online presence, regardless of technical skill.</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin-top:40px">
    <div class="card"><div style="font-size:2rem;color:var(--primary);margin-bottom:8px">🎯</div><h3>Our Mission</h3><p style="font-size:.88rem;color:var(--gray-500)">Make website creation accessible to everyone worldwide.</p></div>
    <div class="card"><div style="font-size:2rem;color:var(--primary);margin-bottom:8px">👁️</div><h3>Our Vision</h3><p style="font-size:.88rem;color:var(--gray-500)">A world where anyone can build their digital presence.</p></div>
    <div class="card"><div style="font-size:2rem;color:var(--primary);margin-bottom:8px">💪</div><h3>Our Values</h3><p style="font-size:.88rem;color:var(--gray-500)">Simplicity, accessibility, and professional quality.</p></div>
  </div>
</div>` },

  // ── Privacy Policy ──
  privacy() { return `
<div style="max-width:700px;margin:0 auto;padding:60px 24px">
  <h1 style="font-size:2rem;margin-bottom:24px">Privacy Policy</h1>
  <div style="color:var(--gray-600);line-height:1.8">
    <p class="mb-24"><strong>Last updated:</strong> July 2026</p>
    <h3 style="margin-bottom:8px;color:var(--gray-800)">1. Information We Collect</h3>
    <p class="mb-16">We collect information you provide when creating an account, including your name, email address, and any content you upload to build your website.</p>
    <h3 style="margin-bottom:8px;color:var(--gray-800)">2. How We Use Your Information</h3>
    <p class="mb-16">We use your information to provide and improve our services, communicate with you, and ensure platform security. We never sell your personal data.</p>
    <h3 style="margin-bottom:8px;color:var(--gray-800)">3. Data Storage</h3>
    <p class="mb-16">Your data is stored securely on Supabase servers. We implement industry-standard security measures to protect your information.</p>
    <h3 style="margin-bottom:8px;color:var(--gray-800)">4. Cookies</h3>
    <p class="mb-16">We use essential cookies for authentication and platform functionality. No tracking cookies are used.</p>
    <h3 style="margin-bottom:8px;color:var(--gray-800)">5. Contact</h3>
    <p>For privacy concerns, contact us at <a href="mailto:privacy@siteflow.app" style="color:var(--primary)">privacy@siteflow.app</a></p>
  </div>
</div>` },

  // ── Checkout / Payment ──
  checkout(plan) { return `
<div style="max-width:500px;margin:60px auto;padding:40px;text-align:center">
  <div style="font-size:3rem;margin-bottom:16px">💳</div>
  <h2 style="margin-bottom:8px">${plan.name} Plan — $${plan.price}/mo</h2>
  <p style="color:var(--gray-500);margin-bottom:32px">Demo payment — click confirm to simulate.</p>
  <div style="background:var(--gray-50);border:1px solid var(--gray-200);border-radius:12px;padding:24px;margin-bottom:24px;text-align:left">
    <div style="margin-bottom:12px"><strong>Card</strong><div style="color:var(--gray-500)">4242 4242 4242 4242</div></div>
    <div style="margin-bottom:12px"><strong>Expiry</strong><div style="color:var(--gray-500)">12/28</div></div>
    <div style="margin-bottom:12px"><strong>CVC</strong><div style="color:var(--gray-500)">123</div></div>
    <div><strong>Name</strong><div style="color:var(--gray-500)">Card Holder</div></div>
  </div>
  <div style="display:flex;gap:8px;justify-content:center">
    <button class="btn btn-outline" onclick="Router.navigate('plans')">Cancel</button>
    <button class="btn btn-primary btn-lg" id="confirmPaymentBtn">Pay $${plan.price} — Upgrade Now</button>
  </div>
</div>` }
}
