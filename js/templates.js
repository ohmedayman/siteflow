const T = {
  loading() { return `<div class="loading-screen"><div class="spinner"></div><p style="color:var(--gray-500)">Loading Site Flow...</p></div>` },
  notFound(title, msg) { return `
<div style="display:flex;align-items:center;justify-content:center;min-height:calc(100vh - 64px);padding:40px 24px">
  <div style="text-align:center;max-width:480px">
    <div style="font-size:6rem;font-weight:800;color:var(--gray-200);line-height:1;margin-bottom:8px">404</div>
    <h1 style="font-size:1.8rem;margin-bottom:8px">${title||'Page Not Found'}</h1>
    <p style="color:var(--gray-500);margin-bottom:32px">${msg||'The page you are looking for does not exist.'}</p>
    <a href="#/" class="btn btn-primary btn-lg">Go Home</a>
  </div>
</div>` },

  landing() { return `
<div class="lp-hero">
  <div class="lp-badge">${ICONS.wrap(ICONS.sparkles,14)} New Feature</div>
  <h1 class="lp-title">Create Stunning Websites.<br>Zero Code.</h1>
  <p class="lp-subtitle">Build professional, responsive sites in minutes. Customize<br>with a drag & drop editor and publish instantly.</p>
  <a href="#/login" class="btn btn-primary btn-lg lp-cta js-auth-guest">Get Started Free</a>
  <a href="#/dashboard" class="btn btn-primary btn-lg lp-cta js-auth-user hidden">Go to Dashboard</a>
  <div class="lp-social-proof">
    <div class="lp-avatars">
      <div class="lp-avatar" style="background:#6366f1">A</div>
      <div class="lp-avatar" style="background:#ec4899">M</div>
      <div class="lp-avatar" style="background:#f97316">S</div>
      <div class="lp-avatar" style="background:#06b6d4">R</div>
    </div>
    <span>Joined by <strong>10k+ creators</strong></span>
  </div>
</div>

<div class="lp-features-bento">
  <div class="bento-card bento-large">
    <div class="bento-img-wrap">
      <div class="bento-img" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);height:100%;display:flex;align-items:center;justify-content:center;border-radius:16px">
        <div style="color:#fff;text-align:center;padding:32px">
          <div style="margin-bottom:12px">${ICONS.wrap(ICONS.sparkles,48)}</div>
          <div style="font-size:1.2rem;font-weight:700">Visual Editor</div>
          <div style="font-size:.85rem;opacity:.8;margin-top:4px">Drag & Drop</div>
        </div>
      </div>
    </div>
    <h3>Visual Drag & Drop Builder.</h3>
    <p>Intuitive interface for complete control.</p>
  </div>
  <div class="bento-card bento-top-right">
    <div class="bento-img-wrap">
      <div class="bento-img" style="background:linear-gradient(135deg,#1e293b,#334155);height:100%;display:flex;align-items:center;justify-content:center;border-radius:16px">
        <div style="color:#fff;text-align:center;padding:24px">
          <div style="margin-bottom:8px">${ICONS.wrap(ICONS.folder,40)}</div>
          <div style="font-size:1rem;font-weight:700">8+ Templates</div>
        </div>
      </div>
    </div>
    <h3>Hundreds of Templates & Tools.</h3>
    <p>From portfolios to online stores.</p>
  </div>
  <div class="bento-card bento-bottom-right">
    <div class="bento-img-wrap">
      <div class="bento-img" style="background:linear-gradient(135deg,#059669,#10b981);height:100%;display:flex;align-items:center;justify-content:center;border-radius:16px">
        <div style="color:#fff;text-align:center;padding:24px">
          <div style="margin-bottom:8px">${ICONS.wrap(ICONS.dollar,40)}</div>
          <div style="font-size:1rem;font-weight:700">Payment Ready</div>
        </div>
      </div>
    </div>
    <h3>E-commerce Integration.</h3>
    <p>From portfolios to online stores.</p>
  </div>
</div>

<div class="lp-logos-bar">
  <div class="lp-logos-track">
    <span>Google</span><span>Amazon</span><span>Shopify</span><span>Stripe</span><span>WordPress</span>
    <span>Google</span><span>Amazon</span><span>Shopify</span><span>Stripe</span><span>WordPress</span>
  </div>
</div>

<section class="lp-section">
  <div class="lp-section-inner">
    <span class="lp-section-badge">How It Works</span>
    <h2 class="lp-section-title">Three Steps to Your Website</h2>
    <p class="lp-section-desc">No technical skills required. Just pick, customize, and go live.</p>
    <div class="lp-steps">
      <div class="lp-step">
        <div class="lp-step-num">1</div>
        <div class="lp-step-icon">${ICONS.wrap(ICONS.template,32)}</div>
        <h3>Choose a Template</h3>
        <p>Pick from professionally designed templates for any industry or purpose.</p>
      </div>
      <div class="lp-step">
        <div class="lp-step-num">2</div>
        <div class="lp-step-icon">${ICONS.wrap(ICONS.settings,32)}</div>
        <h3>Customize Everything</h3>
        <p>Edit text, colors, images, and layout with our visual drag & drop editor.</p>
      </div>
      <div class="lp-step">
        <div class="lp-step-num">3</div>
        <div class="lp-step-icon">${ICONS.wrap(ICONS.globe,32)}</div>
        <h3>Publish & Share</h3>
        <p>Go live instantly with a free subdomain or connect your custom domain.</p>
      </div>
    </div>
  </div>
</section>

<section class="lp-section lp-section-alt">
  <div class="lp-section-inner">
    <span class="lp-section-badge">Features</span>
    <h2 class="lp-section-title">Everything You Need</h2>
    <p class="lp-section-desc">Powerful tools to build, manage, and grow your online presence.</p>
    <div class="lp-features-grid">
      <div class="lp-feature-card">
        <div class="lp-feature-icon" style="background:#e0e7ff;color:#6366f1">${ICONS.wrap(ICONS.edit,24)}</div>
        <h3>Visual Editor</h3>
        <p>Intuitive drag & drop interface. Edit content inline, rearrange sections, and see changes in real-time.</p>
      </div>
      <div class="lp-feature-card">
        <div class="lp-feature-icon" style="background:#fce7f3;color:#ec4899">${ICONS.wrap(ICONS.smartphone,24)}</div>
        <h3>Fully Responsive</h3>
        <p>Every site looks perfect on mobile, tablet, and desktop. No extra work needed.</p>
      </div>
      <div class="lp-feature-card">
        <div class="lp-feature-icon" style="background:#d1fae5;color:#059669">${ICONS.wrap(ICONS.globe,24)}</div>
        <h3>Free Subdomain</h3>
        <p>Get a free <strong>yourname.siteflow.vexonet.online</strong> domain instantly.</p>
      </div>
      <div class="lp-feature-card">
        <div class="lp-feature-icon" style="background:#fef3c7;color:#d97706">${ICONS.wrap(ICONS.search,24)}</div>
        <h3>SEO Optimized</h3>
        <p>Built-in SEO tools. Meta tags, descriptions, and sitemap generated automatically.</p>
      </div>
      <div class="lp-feature-card">
        <div class="lp-feature-icon" style="background:#ede9fe;color:#7c3aed">${ICONS.wrap(ICONS.form,24)}</div>
        <h3>Contact Forms</h3>
        <p>Built-in contact forms with spam protection. Collect leads and messages from visitors.</p>
      </div>
      <div class="lp-feature-card">
        <div class="lp-feature-icon" style="background:#fee2e2;color:#dc2626">${ICONS.wrap(ICONS.image,24)}</div>
        <h3>Image Upload</h3>
        <p>Upload images directly to Cloudinary CDN. Fast loading, automatic optimization.</p>
      </div>
      <div class="lp-feature-card">
        <div class="lp-feature-icon" style="background:#dbeafe;color:#2563eb">${ICONS.wrap(ICONS.barChart,24)}</div>
        <h3>Analytics</h3>
        <p>Track page views, visitor stats, and form submissions. Know your audience.</p>
      </div>
      <div class="lp-feature-card">
        <div class="lp-feature-icon" style="background:#f3e8ff;color:#9333ea">${ICONS.wrap(ICONS.layout,24)}</div>
        <h3>19 Section Types</h3>
        <p>Hero, features, pricing, testimonials, gallery, menu, blog, and more.</p>
      </div>
      <div class="lp-feature-card">
        <div class="lp-feature-icon" style="background:#e0f2fe;color:#0284c7">${ICONS.wrap(ICONS.dollar,24)}</div>
        <h3>Payment Integration</h3>
        <p>Accept payments with Stripe. Sell products, services, or subscriptions.</p>
      </div>
    </div>
  </div>
</section>

<section class="lp-section">
  <div class="lp-section-inner">
    <span class="lp-section-badge">Pricing</span>
    <h2 class="lp-section-title">Simple, Transparent Pricing</h2>
    <p class="lp-section-desc">Start for free. Upgrade when you need more power.</p>
    <div class="lp-pricing-grid">
      <div class="lp-pricing-card">
        <h3>Free</h3>
        <div class="lp-price">$0<span>/mo</span></div>
        <p class="lp-pricing-desc">Perfect for getting started</p>
        <ul>
          <li>${ICONS.wrap(ICONS.check,16)} 1 website</li>
          <li>${ICONS.wrap(ICONS.check,16)} Free subdomain</li>
          <li>${ICONS.wrap(ICONS.check,16)} Basic templates</li>
          <li>${ICONS.wrap(ICONS.check,16)} Contact forms</li>
          <li>${ICONS.wrap(ICONS.check,16)} Mobile responsive</li>
        </ul>
        <a href="#/login" class="btn btn-outline btn-lg w-full js-auth-guest">Get Started</a>
        <a href="#/dashboard" class="btn btn-outline btn-lg w-full js-auth-user hidden">Current Plan</a>
      </div>
      <div class="lp-pricing-card lp-pricing-popular">
        <div class="lp-pricing-badge">Most Popular</div>
        <h3>Pro</h3>
        <div class="lp-price">$9<span>/mo</span></div>
        <p class="lp-pricing-desc">For professionals & freelancers</p>
        <ul>
          <li>${ICONS.wrap(ICONS.check,16)} 5 websites</li>
          <li>${ICONS.wrap(ICONS.check,16)} Custom domain</li>
          <li>${ICONS.wrap(ICONS.check,16)} All templates</li>
          <li>${ICONS.wrap(ICONS.check,16)} Priority support</li>
          <li>${ICONS.wrap(ICONS.check,16)} Remove branding</li>
          <li>${ICONS.wrap(ICONS.check,16)} Analytics</li>
        </ul>
        <a href="#/checkout?plan=pro" class="btn btn-primary btn-lg w-full js-auth-guest">Choose Pro</a>
        <a href="#/dashboard" class="btn btn-primary btn-lg w-full js-auth-user hidden">Current Plan</a>
      </div>
      <div class="lp-pricing-card">
        <h3>Business</h3>
        <div class="lp-price">$29<span>/mo</span></div>
        <p class="lp-pricing-desc">For teams & agencies</p>
        <ul>
          <li>${ICONS.wrap(ICONS.check,16)} Unlimited websites</li>
          <li>${ICONS.wrap(ICONS.check,16)} Multiple domains</li>
          <li>${ICONS.wrap(ICONS.check,16)} E-commerce</li>
          <li>${ICONS.wrap(ICONS.check,16)} API access</li>
          <li>${ICONS.wrap(ICONS.check,16)} White label</li>
          <li>${ICONS.wrap(ICONS.check,16)} Dedicated support</li>
        </ul>
        <a href="#/checkout?plan=business" class="btn btn-outline btn-lg w-full js-auth-guest">Choose Business</a>
        <a href="#/dashboard" class="btn btn-outline btn-lg w-full js-auth-user hidden">Current Plan</a>
      </div>
    </div>
  </div>
</section>

<section class="lp-section lp-section-alt">
  <div class="lp-section-inner">
    <span class="lp-section-badge">Testimonials</span>
    <h2 class="lp-section-title">Loved by Creators</h2>
    <p class="lp-section-desc">See what our users are saying about Site Flow.</p>
    <div class="lp-testimonials-grid">
      <div class="lp-testimonial-card">
        <div class="lp-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p>"Built my portfolio site in 15 minutes. The templates are gorgeous and the editor is so easy to use."</p>
        <div class="lp-testimonial-author">
          <div class="lp-testimonial-avatar" style="background:#6366f1">S</div>
          <div>
            <strong>Sarah Chen</strong>
            <span>Freelance Designer</span>
          </div>
        </div>
      </div>
      <div class="lp-testimonial-card">
        <div class="lp-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p>"We switched from WordPress to Site Flow. Our landing pages load 3x faster and look way better."</p>
        <div class="lp-testimonial-author">
          <div class="lp-testimonial-avatar" style="background:#ec4899">M</div>
          <div>
            <strong>Marcus Rodriguez</strong>
            <span>Startup Founder</span>
          </div>
        </div>
      </div>
      <div class="lp-testimonial-card">
        <div class="lp-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p>"The free plan is more than enough for my small business. Got my site online in minutes with a free subdomain."</p>
        <div class="lp-testimonial-author">
          <div class="lp-testimonial-avatar" style="background:#059669">A</div>
          <div>
            <strong>Aisha Patel</strong>
            <span>Local Business Owner</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="lp-section">
  <div class="lp-section-inner">
    <span class="lp-section-badge">FAQ</span>
    <h2 class="lp-section-title">Frequently Asked Questions</h2>
    <p class="lp-section-desc">Everything you need to know about Site Flow.</p>
    <div class="lp-faq-list">
      <div class="lp-faq-item">
        <h3>Is Site Flow really free?</h3>
        <p>Yes! The free plan includes 1 website, a free subdomain, and access to basic templates. No credit card required.</p>
      </div>
      <div class="lp-faq-item">
        <h3>Can I use my own domain?</h3>
        <p>Absolutely. Pro and Business plans support custom domains. Just point your domain's CNAME record to our servers.</p>
      </div>
      <div class="lp-faq-item">
        <h3>Do I need coding skills?</h3>
        <p>Not at all. Site Flow is designed for everyone. Our visual editor lets you build sites by clicking and dragging.</p>
      </div>
      <div class="lp-faq-item">
        <h3>Can I sell products on my site?</h3>
        <p>Yes! Business plan users get e-commerce integration with Stripe for secure payment processing.</p>
      </div>
      <div class="lp-faq-item">
        <h3>What happens if I cancel?</h3>
        <p>Your site stays live on the free plan. You keep all your content and can upgrade anytime.</p>
      </div>
    </div>
  </div>
</section>

<section class="lp-section lp-cta-section">
  <div class="lp-section-inner">
    <h2 class="lp-cta-title">Ready to Build Your Website?</h2>
    <p class="lp-cta-desc">Join thousands of creators who already use Site Flow. Start building for free.</p>
    <div class="cta-buttons">
      <a href="#/login" class="btn btn-primary btn-lg js-auth-guest">Get Started Free</a>
      <a href="#/dashboard" class="btn btn-primary btn-lg js-auth-user hidden">Go to Dashboard</a>
      <a href="#/plans" class="btn btn-outline btn-lg">View Pricing</a>
    </div>
  </div>
</section>

<footer class="lp-footer">
  <div class="lp-footer-inner">
    <div class="lp-footer-grid">
      <div class="lp-footer-col">
        <div class="lp-footer-brand">
          <img src="assets/sitflow.svg" alt="Site Flow" width="32" height="32">
          <strong>Site Flow</strong>
        </div>
        <p>Build professional websites without code.</p>
      </div>
      <div class="lp-footer-col">
        <h4>Product</h4>
        <a href="#/plans">Pricing</a>
        <a href="#/help">Help Center</a>
        <a href="#/about">About</a>
        <a href="#/login">Contact Us</a>
      </div>
      <div class="lp-footer-col">
        <h4>Company</h4>
        <a href="#/about">About Us</a>
        <a href="#/help">Press</a>
        <a href="#/about">Resources</a>
      </div>
      <div class="lp-footer-col">
        <h4>Resources</h4>
        <a href="#/help">About Us</a>
        <a href="#/help">Press</a>
        <a href="#/help">Resources</a>
        <a href="#/help">Accessibility</a>
      </div>
      <div class="lp-footer-col">
        <h4>Legal</h4>
        <a href="#/privacy">Privacy Policy</a>
        <a href="#/privacy">Terms of Service</a>
      </div>
      <div class="lp-footer-col">
        <h4>Contact</h4>
        <a href="mailto:support@siteflow.vexonet.online">support@siteflow.vexonet.online</a>
        <a href="#/help">Contact Us</a>
      </div>
    </div>
    <div class="lp-footer-bottom">
      <p>&copy; ${new Date().getFullYear()} Site Flow. All rights reserved.</p>
    </div>
  </div>
</footer>` },

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
    </div>
  </div>
</div>` },

  templatePicker() { return `
<div class="modal-overlay open" id="templateModal">
  <div class="modal" style="max-width:960px;padding:32px;max-height:85vh;overflow-y:auto">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <h2 style="font-size:1.5rem;font-weight:800">Choose a Template</h2>
      <button class="btn btn-ghost btn-sm" onclick="document.getElementById('templateModal').classList.remove('open')" style="font-size:1.2rem">✕</button>
    </div>
    <p style="color:var(--gray-500);margin-bottom:24px">Start with a pre-built template or a blank canvas</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px" id="templateFilters">
      <button class="btn btn-sm filter-btn active" data-filter="all">All</button>
      <button class="btn btn-sm filter-btn" data-filter="business">Business</button>
      <button class="btn btn-sm filter-btn" data-filter="personal">Personal</button>
      <button class="btn btn-sm filter-btn" data-filter="creative">Creative</button>
      <button class="btn btn-sm filter-btn" data-filter="food">Food</button>
      <button class="btn btn-sm filter-btn" data-filter="other">Other</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px" id="templateGrid">
      ${PRESETS.map(t => `
        <div class="card card-hover template-card" data-template="${t.id}" data-category="${t.category||'other'}" style="padding:24px;cursor:pointer;text-align:center;transition:all .2s;${t.id==='blank'?'border:2px dashed var(--gray-300)':''}">
          <div style="font-size:2.5rem;margin-bottom:12px">${t.icon}</div>
          <h4 style="font-size:1rem;margin-bottom:6px;font-weight:700">${t.name}</h4>
          <p style="font-size:.8rem;color:var(--gray-500);line-height:1.5">${t.desc}</p>
          <div style="margin-top:12px"><span style="background:var(--primary-light);color:var(--primary);padding:3px 10px;border-radius:12px;font-size:.72rem;font-weight:600">${(t.category||'other').charAt(0).toUpperCase()+(t.category||'other').slice(1)}</span></div>
        </div>
      `).join('')}
    </div>
  </div>
</div>` },

  dashboard() { return `
<div class="dashboard">
  <div class="dashboard-header">
    <div>
      <h1 style="font-size:1.8rem;margin-bottom:4px">Welcome back, <span class="js-user-name"></span> ${ICONS.wrap(ICONS.sparkles,24)}</h1>
      <p style="color:var(--gray-500)">Here's what's happening with your websites</p>
    </div>
    <div style="display:flex;gap:8px;align-items:center">
      <a href="#/plans" class="btn btn-outline btn-sm" id="upgradeBtn">${ICONS.wrap(ICONS.trendingUp,14)} Upgrade</a>
      <button class="btn btn-primary" id="createSiteBtn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> New Site</button>
    </div>
  </div>
  <div id="dashStats"></div>
  <div id="sitesContainer"></div>
</div>` },

  submissions(site, subs) { return `
<div style="max-width:800px;margin:0 auto;padding:40px 24px">
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
    <div>
      <h1 style="font-size:1.6rem">Form Submissions</h1>
      <p style="color:var(--gray-500);font-size:.9rem">Messages from ${site.title}</p>
    </div>
    <button class="btn btn-ghost btn-sm" onclick="Router.navigate('dashboard')">← Back</button>
  </div>
  ${subs.length===0?'<div class="card" style="text-align:center;padding:60px 24px"><p style="color:var(--gray-500)">No submissions yet.</p></div>':
  `<div style="display:flex;flex-direction:column;gap:12px">${subs.map(s=>`
    <div class="card" style="padding:20px;${!s.read?'border-left:3px solid var(--primary)':''}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div style="flex:1">
          <div style="display:flex;gap:12px;align-items:center;margin-bottom:8px">
            <strong>${s.name}</strong>
            <span style="color:var(--gray-400);font-size:.8rem">${s.email}</span>
            ${!s.read?'<span style="background:var(--primary);color:#fff;font-size:.7rem;padding:2px 8px;border-radius:10px">New</span>':''}
          </div>
          <p style="color:var(--gray-600);line-height:1.6">${s.message}</p>
          <p style="color:var(--gray-400);font-size:.78rem;margin-top:8px">${new Date(s.created_at).toLocaleString()}</p>
        </div>
        <div style="display:flex;gap:4px">
          ${!s.read?`<button class="btn btn-ghost btn-sm" data-read="${s.id}">✓</button>`:''}
          <button class="btn btn-ghost btn-sm" data-del-sub="${s.id}" style="color:#dc2626">✕</button>
        </div>
      </div>
    </div>`).join('')}</div>`}
</div>` },

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
          <li>${ICONS.wrap(ICONS.check,16)} ${p.max_sites===-1?'Unlimited sites':p.max_sites+' site'+(p.max_sites>1?'s':'')}</li>
          <li>${p.custom_domain?ICONS.wrap(ICONS.check,16):ICONS.wrap(ICONS.x,16)} Custom domains</li>
          <li>${p.analytics?ICONS.wrap(ICONS.check,16):ICONS.wrap(ICONS.x,16)} Analytics</li>
          <li>${p.premium_themes?ICONS.wrap(ICONS.check,16):ICONS.wrap(ICONS.x,16)} Premium themes</li>
          <li>${p.priority_support?ICONS.wrap(ICONS.check,16):ICONS.wrap(ICONS.x,16)} Priority support</li>
        </ul>
        <button class="btn w-full ${cur?'btn-secondary':'btn-primary'} plan-btn" data-plan="${k}">${cur?'Current Plan':p.price===0?'Get Started':'Subscribe'}</button>
      </div>`
    }).join('')}
  </div>
</div>` },

  builder(page) {
    const t=page.theme||{color:'#6366f1',font:'Inter'}
    return `<div class="builder-toolbar">
      <div class="left">
        <button class="btn btn-ghost btn-sm" onclick="Router.navigate('dashboard')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span class="truncate" style="font-weight:600;max-width:180px">${page.title}</span>
        <span class="badge-status" style="font-size:.72rem;padding:3px 10px;border-radius:20px;font-weight:600;${page.published?'background:#dcfce7;color:#16a34a':'background:#fef3c7;color:#d97706'}">${page.published?'Published':'Draft'}</span>
      </div>
      <div class="right">
        <button class="btn btn-ghost btn-sm" id="undoBtn" title="Undo (Ctrl+Z)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
        </button>
        <button class="btn btn-ghost btn-sm" id="redoBtn" title="Redo (Ctrl+Y)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
        </button>
        <div class="device-toggle" id="deviceToggle">
          <button class="device-btn active" data-device="desktop" title="Desktop">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </button>
          <button class="device-btn" data-device="mobile" title="Mobile">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          </button>
        </div>
        <button class="btn btn-outline btn-sm" id="previewBtn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          Preview
        </button>
        <button class="btn btn-ghost btn-sm" id="saveBtn" style="color:var(--gray-600)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          Save
        </button>
        <button class="btn btn-primary btn-sm" id="publishBtn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
          ${page.published?'Update':'Publish'}
        </button>
      </div>
    </div>
    <div class="builder-layout">
      <div class="builder-sidebar" id="builderSidebar">
        <div class="sidebar-tabs">
          <button class="sidebar-tab active" data-stab="sections">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Sections
          </button>
          <button class="sidebar-tab" data-stab="theme">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            Theme
          </button>
          <button class="sidebar-tab" data-stab="seo">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            SEO
          </button>
          <button class="sidebar-tab" data-stab="settings">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
            Settings
          </button>
        </div>
        <div class="sidebar-content" id="sidebarSections">
          <div class="section-list" id="sectionList"></div>
          <button class="btn btn-primary btn-sm w-full" id="addSectionBtn" style="margin-top:12px">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Section
          </button>
          <div class="sidebar-hint">Click to edit • Drag to reorder</div>
        </div>
        <div class="sidebar-content hidden" id="sidebarTheme">
          <div class="theme-option">
            <label>Primary Color</label>
            <div class="color-picker" id="colorPresets">
              ${['#6366f1','#3b82f6','#06b6d4','#059669','#d97706','#dc2626','#8b5cf6','#ec4899','#f97316','#14b8a6'].map(c=>`<div class="color-swatch ${t.color===c?'active':''}" style="background:${c}" data-color="${c}"></div>`).join('')}
            </div>
            <div class="color-input-wrap">
              <input type="color" id="customColor" value="${t.color}">
              <input class="input" id="colorHexInput" value="${t.color}">
            </div>
          </div>
          <div class="theme-option">
            <label>Font</label>
            <select class="font-select" id="fontSelect">
              ${['Inter','Arial','Georgia','Helvetica','Merriweather','Verdana','Roboto','Open Sans','Cairo','Tajawal'].map(f=>`<option value="${f}" ${t.font===f?'selected':''}>${f}</option>`).join('')}
            </select>
          </div>
          <div class="theme-option">
            <label>Background Color</label>
            <div class="color-input-wrap">
              <input type="color" id="bgColorInput" value="${t.bgColor||'#ffffff'}">
            </div>
          </div>
        </div>
        <div class="sidebar-content hidden" id="sidebarSeo">
          <div class="seo-field">
            <label>SEO Title</label>
            <input class="input" id="seoTitle" value="${page.seo?.title||''}" maxlength="60" placeholder="Page title for search engines">
            <div class="seo-preview">
              <div class="url">${page.slug||'my-site'}.${MAIN_DOMAIN}</div>
              <div class="title" id="seoTitlePreview">${page.seo?.title||page.title||'My Site'}</div>
            </div>
          </div>
          <div class="seo-field">
            <label>Meta Description</label>
            <textarea class="input textarea" id="seoDesc" maxlength="160" placeholder="Brief description for search results">${page.seo?.description||''}</textarea>
            <div class="seo-counter" id="seoDescCounter">${(page.seo?.description||'').length} / 160</div>
          </div>
        </div>
        <div class="sidebar-content hidden" id="sidebarSettings">
          <div class="settings-group">
            <label>Site Title</label>
            <input class="input" id="pageTitleInput" value="${page.title}">
          </div>
          <div class="settings-group">
            <label>Slug</label>
            <input class="input" id="pageSlugInput" value="${page.slug||''}">
            <div class="hint">URL: <span id="slugPreview" style="color:var(--primary)">${page.slug||'my-site'}.${MAIN_DOMAIN}</span></div>
          </div>
          <div class="settings-group">
            <label>Custom Domain</label>
            <input class="input" id="customDomainInput" value="${page.customDomain||page.custom_domain||''}" placeholder="yourdomain.com">
            <div class="hint">Connect your own domain (Pro+)</div>
          </div>
          <div class="settings-danger">
            <button class="btn btn-danger btn-sm w-full" id="deleteSiteBtn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
              Delete This Site
            </button>
          </div>
        </div>
      </div>
      <div class="builder-canvas" id="builderCanvas">
        <div class="canvas-frame" id="canvasFrame"></div>
      </div>
    </div>`
  },

  heroSection(d,a) { return `<div class="editable-section hero-section ${a?'editing':''}" data-section="hero"><div class="section-label">Hero</div><h1 contenteditable="true" data-field="heading" class="hero-heading">${d.heading||'Welcome'}</h1><p contenteditable="true" data-field="description" style="font-size:1.15rem;color:var(--gray-500);max-width:550px;line-height:1.7">${d.description||''}</p>${d.image?`<div class="hero-image-wrap"><img src="${d.image}"><button class="remove-img" style="position:absolute;top:6px;right:6px;z-index:2;background:#fff;border-radius:50%;width:24px;height:24px;border:none;cursor:pointer" data-hero-remove>✕</button></div>`:`<div class="hero-image-wrap" id="heroImagePlaceholder"><span>+</span></div>`}<input type="file" accept="image/*" id="heroImageInput" style="display:none"></div>` },
  aboutSection(d,a) { return `<div class="editable-section about-section ${a?'editing':''}" data-section="about"><div class="section-label">About</div><h2 contenteditable="true" data-field="heading">${d.heading||'About'}</h2><p contenteditable="true" data-field="content" style="font-size:1.05rem;line-height:1.8">${d.content||''}</p></div>` },
  gallerySection(d,a) { const im=d.images||[]; return `<div class="editable-section gallery-section ${a?'editing':''}" data-section="gallery"><div class="section-label">Gallery</div><h2 contenteditable="true" data-field="heading">${d.heading||'Gallery'}</h2><div class="gallery-grid" id="galleryGrid">${im.length===0?'<div style="grid-column:1/-1;text-align:center;color:var(--gray-400);padding:40px;border:2px dashed var(--gray-200);border-radius:8px">Click + to add images</div>':''}${im.map((img,i)=>`<div class="gallery-item" style="border-style:solid"><img src="${img}"><button class="remove-img" data-index="${i}">✕</button></div>`).join('')}<div class="gallery-item" id="addGalleryBtn" style="cursor:pointer;border:2px dashed var(--gray-300)"><span>+</span></div></div><input type="file" accept="image/*" id="galleryImageInput" style="display:none" multiple></div>` },
  contactSection(d,a) { return `<div class="editable-section contact-section ${a?'editing':''}" data-section="contact"><div class="section-label">Contact</div><h2 contenteditable="true" data-field="heading">${d.heading||'Contact'}</h2><div class="contact-form"><div class="input-group"><label>Name</label><input class="input" placeholder="Your Name" disabled style="opacity:.6"></div><div class="input-group"><label>Email</label><input class="input" placeholder="your@email.com" disabled style="opacity:.6"></div><div class="input-group"><label>Message</label><textarea class="input textarea" placeholder="Your message..." disabled style="opacity:.6"></textarea></div><button class="btn btn-primary" disabled style="opacity:.6">Send</button></div></div>` },
  servicesSection(d,a) { const items=d.items||[]; return `<div class="editable-section services-section ${a?'editing':''}" data-section="services"><div class="section-label">Services</div><h2 contenteditable="true" data-field="heading">${d.heading||'Services'}</h2><div class="services-grid">${items.map((item,i)=>`<div class="service-card"><h3 contenteditable="true" data-field="items.${i}.title">${item.title}</h3><p contenteditable="true" data-field="items.${i}.desc">${item.desc}</p></div>`).join('')}</div></div>` },
  testimonialsSection(d,a) { const items=d.items||[]; return `<div class="editable-section testimonials-section ${a?'editing':''}" data-section="testimonials"><div class="section-label">Testimonials</div><h2 contenteditable="true" data-field="heading">${d.heading||'Testimonials'}</h2><div class="testimonials-grid">${items.map((item,i)=>`<div class="testimonial-card"><p contenteditable="true" data-field="items.${i}.text">"${item.text}"</p><div class="testimonial-author"><strong contenteditable="true" data-field="items.${i}.name">${item.name}</strong><span contenteditable="true" data-field="items.${i}.role">${item.role||''}</span></div></div>`).join('')}</div></div>` },
  pricingSection(d,a) { const plans=d.plans||[]; return `<div class="editable-section pricing-section ${a?'editing':''}" data-section="pricing"><div class="section-label">Pricing</div><h2 contenteditable="true" data-field="heading">${d.heading||'Pricing'}</h2><div class="pricing-grid">${plans.map((p,i)=>`<div class="pricing-card"><h3 contenteditable="true" data-field="plans.${i}.name">${p.name}</h3><div class="price" contenteditable="true" data-field="plans.${i}.price">${p.price}</div><ul>${(p.features||[]).map((f,fi)=>`<li contenteditable="true" data-field="plans.${i}.features.${fi}">${f}</li>`).join('')}</ul></div>`).join('')}</div></div>` },
  faqSection(d,a) { const items=d.items||[]; return `<div class="editable-section faq-section ${a?'editing':''}" data-section="faq"><div class="section-label">FAQ</div><h2 contenteditable="true" data-field="heading">${d.heading||'FAQ'}</h2><div class="faq-list">${items.map((item,i)=>`<div class="faq-item"><h3 contenteditable="true" data-field="items.${i}.q">${item.q}</h3><p contenteditable="true" data-field="items.${i}.a">${item.a}</p></div>`).join('')}</div></div>` },
  teamSection(d,a) { const items=d.items||[]; return `<div class="editable-section team-section ${a?'editing':''}" data-section="team"><div class="section-label">Team</div><h2 contenteditable="true" data-field="heading">${d.heading||'Our Team'}</h2><div class="team-grid">${items.map((item,i)=>`<div class="team-card"><div class="team-avatar">${item.name?item.name.charAt(0):''}</div><h3 contenteditable="true" data-field="items.${i}.name">${item.name}</h3><p contenteditable="true" data-field="items.${i}.role">${item.role||''}</p></div>`).join('')}</div></div>` },
  footerSection(d,a) { return `<div class="editable-section footer-section ${a?'editing':''}" data-section="footer"><div class="section-label">Footer</div><div class="footer-content"><p contenteditable="true" data-field="copyright">${d.copyright||'© 2026 All rights reserved.'}</p><p contenteditable="true" data-field="text">${d.text||'Powered by Site Flow'}</p></div></div>` },

  blogSection(d,a) { const items=d.items||[]; return `<div class="editable-section blog-section ${a?'editing':''}" data-section="blog"><div class="section-label">Blog</div><h2 contenteditable="true" data-field="heading">${d.heading||'Blog'}</h2><div class="blog-grid">${items.map((item,i)=>`<div class="blog-card"><div class="blog-date">${item.date||''}</div><h3 contenteditable="true" data-field="items.${i}.title">${item.title}</h3><p contenteditable="true" data-field="items.${i}.excerpt">${item.excerpt||''}</p></div>`).join('')}</div></div>` },
  portfolioSection(d,a) { const items=d.items||[]; return `<div class="editable-section portfolio-section ${a?'editing':''}" data-section="portfolio"><div class="section-label">Portfolio</div><h2 contenteditable="true" data-field="heading">${d.heading||'Portfolio'}</h2><div class="portfolio-grid">${items.map((item,i)=>`<div class="portfolio-card"><div class="portfolio-img" style="background:var(--gray-100);height:160px;border-radius:8px;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:2rem;color:var(--gray-400)">${item.image?`<img src="${item.image}" style="width:100%;height:100%;object-fit:cover">`:ICONS.wrap(ICONS.folder,32)}</div><h3 contenteditable="true" data-field="items.${i}.title">${item.title}</h3><p contenteditable="true" data-field="items.${i}.desc">${item.desc||''}</p></div>`).join('')}${a?`<div class="portfolio-card add-card" id="addPortfolioBtn" style="cursor:pointer;border:2px dashed var(--gray-300);display:flex;align-items:center;justify-content:center;padding:40px;color:var(--gray-400)"><span>+ Add Item</span></div><input type="file" accept="image/*" id="portfolioImageInput" style="display:none" multiple>`:''}</div></div>` },
  countersSection(d,a) { const items=d.items||[]; return `<div class="editable-section counters-section ${a?'editing':''}" data-section="counters"><div class="section-label">Counters</div><h2 contenteditable="true" data-field="heading">${d.heading||'Stats'}</h2><div class="counters-grid">${items.map((item,i)=>`<div class="counter-card"><div class="counter-number" contenteditable="true" data-field="items.${i}.number">${item.number}</div><div class="counter-label" contenteditable="true" data-field="items.${i}.label">${item.label}</div></div>`).join('')}</div></div>` },
  timelineSection(d,a) { const items=d.items||[]; return `<div class="editable-section timeline-section ${a?'editing':''}" data-section="timeline"><div class="section-label">Timeline</div><h2 contenteditable="true" data-field="heading">${d.heading||'Timeline'}</h2><div class="timeline">${items.map((item,i)=>`<div class="timeline-item"><div class="timeline-dot"></div><div class="timeline-content"><div class="timeline-year" contenteditable="true" data-field="items.${i}.year">${item.year||''}</div><h3 contenteditable="true" data-field="items.${i}.title">${item.title}</h3><p contenteditable="true" data-field="items.${i}.desc">${item.desc||''}</p></div></div>`).join('')}</div></div>` },
  menuSection(d,a) { const items=d.items||[]; const cats=[...new Set(items.map(i=>i.category||'Main'))]; return `<div class="editable-section menu-section ${a?'editing':''}" data-section="menu"><div class="section-label">Menu</div><h2 contenteditable="true" data-field="heading">${d.heading||'Menu'}</h2>${cats.map(cat=>`<div class="menu-category"><h3>${cat}</h3>${items.filter(i=>(i.category||'Main')===cat).map((item,i)=>{const gi=items.indexOf(item);return `<div class="menu-item"><div class="menu-item-info"><h4 contenteditable="true" data-field="items.${gi}.title">${item.title}</h4><p contenteditable="true" data-field="items.${gi}.desc">${item.desc||''}</p></div><span class="menu-price" contenteditable="true" data-field="items.${gi}.price">${item.price||''}</span></div>`}).join('')}</div>`).join('')}</div></div>` },
  locationSection(d,a) { return `<div class="editable-section location-section ${a?'editing':''}" data-section="location"><div class="section-label">Location</div><h2 contenteditable="true" data-field="heading">${d.heading||'Location'}</h2><div class="location-info"><p>${ICONS.wrap(ICONS.mapPin,16)} <strong>Address:</strong> <span contenteditable="true" data-field="address">${d.address||''}</span></p><p>${ICONS.wrap(ICONS.phone,16)} <strong>Phone:</strong> <span contenteditable="true" data-field="phone">${d.phone||''}</span></p><p>${ICONS.wrap(ICONS.clock,16)} <strong>Hours:</strong> <span contenteditable="true" data-field="hours">${d.hours||''}</span></p></div><div class="location-map"><div style="background:var(--grey-100);padding:40px;text-align:center;border-radius:8px;color:var(--gray-500)">Map placeholder — connect Google Maps</div></div></div>` },

  publicPage(page) {
    const t=page.theme||{color:'#6366f1',font:'Inter'}
    return `<div class="public-page" style="--p-color:${t.color};--p-font:${t.font};font-family:${t.font},sans-serif">
      <div class="public-nav"><span class="brand" style="color:${t.color}">${page.title}</span><span style="font-size:.75rem;color:var(--gray-400)">Powered by Site Flow</span></div>
      <div class="public-content">${page.sections.map(s=>{switch(s.type){case'hero':return T.pubHero(s.data,t);case'about':return T.pubAbout(s.data,t);case'gallery':return T.pubGallery(s.data,t);case'contact':return T.pubContact(s.data,t);case'services':return T.pubServices(s.data,t);case'testimonials':return T.pubTestimonials(s.data,t);case'pricing':return T.pubPricing(s.data,t);case'faq':return T.pubFaq(s.data,t);case'team':return T.pubTeam(s.data,t);case'footer':return T.pubFooter(s.data,t);case'blog':return T.pubBlog(s.data,t);case'portfolio':return T.pubPortfolio(s.data,t);case'counters':return T.pubCounters(s.data,t);case'timeline':return T.pubTimeline(s.data,t);case'menu':return T.pubMenu(s.data,t);case'location':return T.pubLocation(s.data,t);case'features':return T.pubFeatures(s.data,t);case'stats':return T.pubStats(s.data,t);case'cta':return T.pubCta(s.data,t);default:return ''}}).join('')}</div>
    </div>`
  },
  pubHero(d,t) { return `<div class="editable-section hero-section" style="background:linear-gradient(135deg,${t.color}11,#fff)">${d.image?`<div style="width:120px;height:120px;border-radius:50%;overflow:hidden;margin-bottom:16px;box-shadow:0 4px 20px ${t.color}33"><img src="${d.image}" style="width:100%;height:100%;object-fit:cover"></div>`:''}<h1 style="color:${t.color}">${d.heading}</h1><p>${d.description}</p></div>` },
  pubAbout(d,t) { return `<div class="editable-section about-section"><h2 style="color:${t.color}">${d.heading}</h2><p>${d.content}</p></div>` },
  pubGallery(d,t) { const im=d.images||[]; return `<div class="editable-section gallery-section"><h2 style="color:${t.color}">${d.heading}</h2><div class="gallery-grid">${im.length===0?'<p style="grid-column:1/-1;color:var(--gray-400)">No images</p>':''}${im.map(i=>`<div class="gallery-item" style="border-style:none"><img src="${i}"></div>`).join('')}</div></div>` },
  pubContact(d,t) { return `<div class="editable-section contact-section"><h2 style="color:${t.color}">${d.heading}</h2><div class="contact-form" id="pubContactForm"><div class="input-group"><label>Name</label><input class="input" id="cfName" required></div><div class="input-group"><label>Email</label><input class="input" id="cfEmail" type="email" required></div><div class="input-group"><label>Message</label><textarea class="input textarea" id="cfMessage" required></textarea></div><button class="btn w-full" style="background:${t.color};color:#fff" id="cfSubmitBtn">Send</button><p id="cfMsg" style="font-size:.85rem;margin-top:8px;display:none"></p></div></div>` },
  pubServices(d,t) { const items=d.items||[]; return `<div class="editable-section services-section"><h2 style="color:${t.color}">${d.heading}</h2><div class="services-grid">${items.map(item=>`<div class="service-card"><h3>${item.title}</h3><p>${item.desc}</p></div>`).join('')}</div></div>` },
  pubTestimonials(d,t) { const items=d.items||[]; return `<div class="editable-section testimonials-section"><h2 style="color:${t.color}">${d.heading}</h2><div class="testimonials-grid">${items.map(item=>`<div class="testimonial-card"><p>"${item.text}"</p><div class="testimonial-author"><strong>${item.name}</strong><span>${item.role||''}</span></div></div>`).join('')}</div></div>` },
  pubPricing(d,t) { const plans=d.plans||[]; return `<div class="editable-section pricing-section"><h2 style="color:${t.color}">${d.heading}</h2><div class="pricing-grid">${plans.map(p=>`<div class="pricing-card"><h3>${p.name}</h3><div class="price">${p.price}</div><ul>${(p.features||[]).map(f=>`<li>${f}</li>`).join('')}</ul><button class="btn" style="background:${t.color};color:#fff;width:100%;margin-top:16px">Choose Plan</button></div>`).join('')}</div></div>` },
  pubFaq(d,t) { const items=d.items||[]; return `<div class="editable-section faq-section"><h2 style="color:${t.color}">${d.heading}</h2><div class="faq-list">${items.map(item=>`<div class="faq-item"><h3>${item.q}</h3><p>${item.a}</p></div>`).join('')}</div></div>` },
  pubTeam(d,t) { const items=d.items||[]; return `<div class="editable-section team-section"><h2 style="color:${t.color}">${d.heading}</h2><div class="team-grid">${items.map(item=>`<div class="team-card"><div class="team-avatar">${item.name?item.name.charAt(0):''}</div><h3>${item.name}</h3><p>${item.role||''}</p></div>`).join('')}</div></div>` },
  pubFooter(d,t) { return `<div class="editable-section footer-section" style="background:#0f172a;color:#94a3b8"><div class="footer-content"><p>${d.copyright||'© 2026 All rights reserved.'}</p><p>${d.text||'Powered by Site Flow'}</p></div></div>` },

  pubBlog(d,t) { const items=d.items||[]; return `<div class="editable-section blog-section"><h2 style="color:${t.color}">${d.heading}</h2><div class="blog-grid">${items.map(item=>`<div class="blog-card"><div class="blog-date">${item.date||''}</div><h3>${item.title}</h3><p>${item.excerpt||''}</p></div>`).join('')}</div></div>` },
  pubPortfolio(d,t) { const items=d.items||[]; return `<div class="editable-section portfolio-section"><h2 style="color:${t.color}">${d.heading}</h2><div class="portfolio-grid">${items.map(item=>`<div class="portfolio-card"><div class="portfolio-img" style="background:var(--gray-100);height:160px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--gray-400)">${item.image?`<img src="${item.image}" style="width:100%;height:100%;object-fit:cover">`:ICONS.wrap(ICONS.folder,40)}</div><h3>${item.title}</h3><p>${item.desc||''}</p></div>`).join('')}</div></div>` },
  pubCounters(d,t) { const items=d.items||[]; return `<div class="editable-section counters-section" style="background:${t.color}11"><h2 style="color:${t.color}">${d.heading}</h2><div class="counters-grid">${items.map(item=>`<div class="counter-card"><div class="counter-number" style="color:${t.color}">${item.number}</div><div class="counter-label">${item.label}</div></div>`).join('')}</div></div>` },
  pubTimeline(d,t) { const items=d.items||[]; return `<div class="editable-section timeline-section"><h2 style="color:${t.color}">${d.heading}</h2><div class="timeline">${items.map(item=>`<div class="timeline-item"><div class="timeline-dot" style="background:${t.color}"></div><div class="timeline-content"><div class="timeline-year" style="color:${t.color}">${item.year||''}</div><h3>${item.title}</h3><p>${item.desc||''}</p></div></div>`).join('')}</div></div>` },
  pubMenu(d,t) { const items=d.items||[]; const cats=[...new Set(items.map(i=>i.category||'Main'))]; return `<div class="editable-section menu-section"><h2 style="color:${t.color}">${d.heading}</h2>${cats.map(cat=>`<div class="menu-category"><h3 style="color:${t.color}">${cat}</h3>${items.filter(i=>(i.category||'Main')===cat).map(item=>`<div class="menu-item"><div class="menu-item-info"><h4>${item.title}</h4><p>${item.desc||''}</p></div><span class="menu-price" style="color:${t.color}">${item.price||''}</span></div>`).join('')}</div>`).join('')}</div></div>` },
  pubLocation(d,t) { return `<div class="editable-section location-section"><h2 style="color:${t.color}">${d.heading}</h2><div class="location-info"><p>${ICONS.wrap(ICONS.mapPin,16)} Address: ${d.address||''}</p><p>${ICONS.wrap(ICONS.phone,16)} Phone: ${d.phone||''}</p><p>${ICONS.wrap(ICONS.clock,16)} Hours: ${d.hours||''}</p></div></div>` },
  pubFeatures(d,t) { const items=d.items||[]; return `<div class="editable-section" style="padding:60px 40px"><h2 style="text-align:center;color:${t.color}">${d.heading||'Features'}</h2><div class="services-grid">${items.map(item=>`<div class="service-card"><h3>${item.title}</h3><p>${item.desc}</p></div>`).join('')}</div></div>` },
  pubStats(d,t) { const items=d.items||[]; return `<div class="editable-section" style="padding:60px 40px;text-align:center;background:${t.color}11"><h2 style="color:${t.color}">${d.heading||'Statistics'}</h2><div class="counters-grid">${items.map(item=>`<div class="counter-card"><div class="counter-number" style="color:${t.color}">${item.number}</div><div class="counter-label">${item.label}</div></div>`).join('')}</div></div>` },
  pubCta(d,t) { return `<div class="editable-section" style="text-align:center;padding:60px 40px;background:${t.color};color:#fff"><h2>${d.heading||'Call to Action'}</h2>${d.subheading?`<p style="opacity:.9;margin-top:8px">${d.subheading}</p>`:''}${d.buttonText?`<a href="${d.buttonUrl||'#'}" class="btn" style="background:#fff;color:${t.color};margin-top:16px">${d.buttonText}</a>`:''}</div></div>` },

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

  help() { return `
<div style="max-width:800px;margin:0 auto;padding:60px 24px">
  <div class="text-center mb-24">
    <div style="margin-bottom:12px">${ICONS.wrap(ICONS.helpCircle,48)}</div>
    <h1 style="font-size:2rem;margin-bottom:8px">Help Center</h1>
    <p style="color:var(--gray-500)">Everything you need to get started with Site Flow</p>
  </div>
  <div style="display:grid;gap:12px">
    ${[
      {q:'How do I create a website?',a:'Click "New Site" from your dashboard, choose a template, then customize it with our drag-and-drop editor. When ready, click Publish.'},
      {q:'Can I use my own domain?',a:'Yes! Pro and Business plans support custom domains. Go to Settings in the editor and enter your domain name.'},
      {q:'Is there a free plan?',a:'Yes! The Free plan includes 1 site with basic features. Upgrade to Pro ($9/mo) for 10 sites and custom domains.'},
      {q:'How do I edit my site after publishing?',a:'Go to your dashboard, click Edit on your published site, make changes, and click Update to republish.'},
      {q:'Can I use Google login?',a:'Yes! Click "Continue with Google" on the login page to sign in with your Google account.'},
      {q:'Is Arabic supported?',a:'Yes! Site Flow supports full Arabic interface and RTL layout. Change language in Settings.'},
      {q:'How do I add images?',a:'In the editor, click the image placeholder in Hero section or click + in Gallery to upload images from your device.'},
      {q:'What templates are available?',a:'We offer 8 templates: Personal, Business, Restaurant, Gallery, Event, Form, Blog, and Blank Canvas.'},
      {q:'How does the editor work?',a:'Click any text to edit it directly. Drag sections to reorder. Use the sidebar to change theme colors, fonts, and SEO settings.'},
      {q:'How do I publish my site?',a:'Click the Publish button in the top-right of the editor. Your site will be live at your-slug.siteflow.vexonet.online instantly.'}
    ].map(({q,a}) => `
      <div class="card" style="padding:20px;cursor:pointer" onclick="this.querySelector('.answer').classList.toggle('hidden')">
        <h3 style="font-size:.95rem;font-weight:600;display:flex;align-items:center;gap:8px"><span style="color:var(--primary)">${ICONS.wrap(ICONS.helpCircle,16)}</span>${q}</h3>
        <p class="answer hidden" style="font-size:.85rem;color:var(--gray-600);margin-top:12px;line-height:1.7">${a}</p>
      </div>
    `).join('')}
  </div>
  <div class="card text-center" style="margin-top:32px;padding:32px">
    <h3 style="margin-bottom:8px">Still need help?</h3>
    <p style="color:var(--gray-500);margin-bottom:16px">Contact our support team</p>
    <a href="mailto:support@siteflow.vexonet.online" class="btn btn-primary">Email Support</a>
  </div>
</div>` },

  about() { return `
<div style="max-width:800px;margin:0 auto;padding:60px 24px">
  <div class="text-center mb-24">
    <div style="margin-bottom:12px">${ICONS.wrap(ICONS.rocket,48)}</div>
    <h1 style="font-size:2.2rem;margin-bottom:16px">About Site Flow</h1>
    <p style="color:var(--gray-600);font-size:1.1rem;line-height:1.8;max-width:600px;margin:0 auto">Site Flow is a no-code website builder that empowers anyone to create professional websites without writing a single line of code.</p>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;margin-top:40px">
    <div class="card" style="text-align:center;padding:32px">${ICONS.wrap(ICONS.target,40)}<h3 style="margin-bottom:8px;margin-top:12px">Our Mission</h3><p style="font-size:.88rem;color:var(--gray-500);line-height:1.6">Make website creation accessible to everyone worldwide.</p></div>
    <div class="card" style="text-align:center;padding:32px">${ICONS.wrap(ICONS.eye,40)}<h3 style="margin-bottom:8px;margin-top:12px">Our Vision</h3><p style="font-size:.88rem;color:var(--gray-500);line-height:1.6">A world where anyone can build their digital presence.</p></div>
    <div class="card" style="text-align:center;padding:32px">${ICONS.wrap(ICONS.sparkles,40)}<h3 style="margin-bottom:8px;margin-top:12px">Our Values</h3><p style="font-size:.88rem;color:var(--gray-500);line-height:1.6">Simplicity, accessibility, and professional quality.</p></div>
  </div>
  <div class="card" style="margin-top:40px;padding:32px;text-align:center">
    <h3 style="margin-bottom:8px">Ready to get started?</h3>
    <p style="color:var(--gray-500);margin-bottom:16px">Join thousands of creators building their websites with Site Flow</p>
    <a href="#/login" class="btn btn-primary btn-lg">Get Started Free</a>
  </div>
</div>` },

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
    <p class="mb-16">Your data is stored securely on our servers. We implement industry-standard security measures to protect your information.</p>
    <h3 style="margin-bottom:8px;color:var(--gray-800)">4. Cookies</h3>
    <p class="mb-16">We use essential cookies for authentication and platform functionality. No tracking cookies are used.</p>
    <h3 style="margin-bottom:8px;color:var(--gray-800)">5. Contact</h3>
    <p>For privacy concerns, contact us at <a href="mailto:privacy@siteflow.vexonet.online" style="color:var(--primary)">privacy@siteflow.vexonet.online</a></p>
  </div>
</div>` },

  checkout(plan) { return `
<div style="max-width:500px;margin:60px auto;padding:40px;text-align:center">
  <div style="margin-bottom:16px">${ICONS.wrap(ICONS.dollar,48)}</div>
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
