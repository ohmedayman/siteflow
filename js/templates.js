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

  landing() {
    const isAr = (typeof Auth !== 'undefined' ? Auth.lang : 'ar') === 'ar'
    return `
<div class="lp-clean" dir="${isAr?'rtl':'ltr'}">
  <!-- 1. Hero Section -->
  <section class="lp-hero-clean">
    <div class="lp-hero-container">
      <div class="lp-pill-badge">
        <span class="lp-pill-dot"></span>
        <span>${isAr ? 'الجيل الجديد لصناع المواقع والمتاجر 2.0' : 'Next-Generation Visual Website Builder 2.0'}</span>
      </div>

      <h1 class="lp-hero-title">
        ${isAr
          ? 'ابنِ موقعك الإلكتروني باحترافية<br><span class="lp-title-highlight">بدون كتابة سطر كود واحد</span>'
          : 'Build Stunning Modern Websites<br><span class="lp-title-highlight">Without Writing Any Code</span>'}
      </h1>

      <p class="lp-hero-subtitle">
        ${isAr
          ? 'أسهل وأسرع محرر مرئي بالسحب والإفلات. اختر قالباً عصرياً، عدل النصوص والصور في دقائق، وانشر موقعك فوراً مع استضافة سحابية فائقة ودعم الدفع المحلي.'
          : 'The fastest visual drag-and-drop website platform. Choose a modern template, customize in minutes, and publish with cloud hosting and local payments.'}
      </p>

      <div class="lp-hero-actions">
        <a href="#/login" class="btn btn-primary btn-lg js-auth-guest lp-btn-hero">
          ${isAr ? 'ابدأ مجاناً الآن — بدون بطاقة بنكية 🚀' : 'Start Free Today — No Credit Card 🚀'}
        </a>
        <a href="#/dashboard" class="btn btn-primary btn-lg js-auth-user hidden lp-btn-hero">
          ${isAr ? 'الانتقال إلى لوحة التحكم' : 'Go to Dashboard'}
        </a>
        <a href="#/showcase" class="btn btn-outline btn-lg lp-btn-secondary">
          ${isAr ? 'استعرض معرض المواقع والقوالب' : 'Explore Showcase & Templates'}
        </a>
      </div>

      <div class="lp-hero-social">
        <div class="lp-stars-line">★★★★★</div>
        <span>${isAr ? 'تقييم <strong>4.9/5</strong> من أكثر من <strong>12,000 مبدع ومتجر</strong> في الشرق الأوسط' : 'Rated <strong>4.9/5</strong> by over <strong>12,000+ creators & stores</strong>'}</span>
      </div>

      <!-- Minimalist Product Mockup Window -->
      <div class="lp-mockup-frame">
        <div class="lp-mockup-topbar">
          <div class="lp-mockup-dots">
            <span class="lp-dot-red"></span>
            <span class="lp-dot-yellow"></span>
            <span class="lp-dot-green"></span>
          </div>
          <div class="lp-mockup-address">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>mysite.siteflow.vexonet.online</span>
          </div>
          <div class="lp-mockup-tag">
            <span>⚡ ${isAr ? 'محرر حي ومباشر' : 'Live Visual Editor'}</span>
          </div>
        </div>

        <div class="lp-mockup-screen">
          <div class="lp-mockup-sidebar">
            <div class="lp-sidebar-heading">${isAr ? 'أقسام الموقع' : 'Site Sections'}</div>
            <div class="lp-sidebar-item active">
              ${ICONS.wrap(ICONS.home, 14)} <span>${isAr ? 'الرئيسية (Hero)' : 'Hero Banner'}</span>
            </div>
            <div class="lp-sidebar-item">
              ${ICONS.wrap(ICONS.briefcase, 14)} <span>${isAr ? 'الخدمات والمنتجات' : 'Products & Services'}</span>
            </div>
            <div class="lp-sidebar-item">
              ${ICONS.wrap(ICONS.image, 14)} <span>${isAr ? 'معرض الصور' : 'Photo Gallery'}</span>
            </div>
            <div class="lp-sidebar-item">
              ${ICONS.wrap(ICONS.message, 14)} <span>${isAr ? 'آراء العملاء' : 'Customer Reviews'}</span>
            </div>
            <div class="lp-sidebar-item">
              ${ICONS.wrap(ICONS.mail, 14)} <span>${isAr ? 'نموذج التواصل' : 'Contact Form'}</span>
            </div>
          </div>
          <div class="lp-mockup-content">
            <div class="lp-mock-banner">
              <h2>${isAr ? 'مرحباً بك في متجرنا العصري' : 'Welcome to Our Modern Store'}</h2>
              <p>${isAr ? 'أفضل المنتجات عالية الجودة مع شحن سريع وتصفح فائق السلاسة' : 'Premium curated products with fast delivery and seamless checkout.'}</p>
              <div class="lp-mock-btn">${isAr ? 'تسوق المنتجات الآن' : 'Shop Now'}</div>
            </div>
            <div class="lp-mock-cards">
              <div class="lp-mock-card">
                <div class="lp-mock-card-icon">⚡</div>
                <strong>${isAr ? 'شحن فوري' : 'Fast Shipping'}</strong>
              </div>
              <div class="lp-mock-card">
                <div class="lp-mock-card-icon">💎</div>
                <strong>${isAr ? 'جودة مضمونة' : 'Top Quality'}</strong>
              </div>
              <div class="lp-mock-card">
                <div class="lp-mock-card-icon">📱</div>
                <strong>${isAr ? 'دفع ميسر' : 'Easy Payment'}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 2. Clean Stats Row -->
  <section class="lp-stats-clean">
    <div class="lp-container">
      <div class="lp-stats-grid-clean">
        <div class="lp-stat-box">
          <div class="lp-stat-val">+12,000</div>
          <div class="lp-stat-lbl">${isAr ? 'موقع ومتجر نشط' : 'Active Websites'}</div>
        </div>
        <div class="lp-stat-box">
          <div class="lp-stat-val">&lt; 0.3s</div>
          <div class="lp-stat-lbl">${isAr ? 'سرعة استجابة فائقة' : 'Page Load Speed'}</div>
        </div>
        <div class="lp-stat-box">
          <div class="lp-stat-val">99.9%</div>
          <div class="lp-stat-lbl">${isAr ? 'استقرار سحابي دائم' : 'Uptime Guarantee'}</div>
        </div>
        <div class="lp-stat-box">
          <div class="lp-stat-val">100%</div>
          <div class="lp-stat-lbl">${isAr ? 'توافق مع الجوال والتابلت' : 'Mobile Responsive'}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. Features Section (6 Clean Cards) -->
  <section class="lp-section-clean">
    <div class="lp-container">
      <div class="lp-section-header">
        <span class="lp-section-pill">${isAr ? 'مميزات المنصة' : 'Core Features'}</span>
        <h2 class="lp-section-heading">
          ${isAr ? 'كل ما تحتاجه لإطلاق موقع احترافي متكامل' : 'Everything You Need to Succeed Online'}
        </h2>
        <p class="lp-section-subheading">
          ${isAr ? 'أدوات قوية، واجهة مبسطة، وتكامل تام مع بوابات الدفع والسيو بدون أي تعقيد تقني.' : 'Powerful tools, intuitive interface, and seamless payments without technical headaches.'}
        </p>
      </div>

      <div class="lp-features-grid-clean">
        <div class="lp-feature-card-clean">
          <div class="lp-f-icon" style="background:#e0e7ff;color:#4f46e5">${ICONS.wrap(ICONS.edit, 22)}</div>
          <h3>${isAr ? 'محرر مرئي بالسحب والإفلات' : 'Visual Drag & Drop Builder'}</h3>
          <p>${isAr ? 'تحكم كامل وبديهي في كل نص، زر، صورة ولون مع معاينة مباشرة وتعديل فوري.' : 'Intuitive visual controls for every text, button, image, and color with real-time editing.'}</p>
        </div>

        <div class="lp-feature-card-clean">
          <div class="lp-f-icon" style="background:#dcfce7;color:#16a34a">${ICONS.wrap(ICONS.globe, 22)}</div>
          <h3>${isAr ? 'دومين فرعي مجاني واستضافة فائقة' : 'Free Subdomain & Cloud CDN'}</h3>
          <p>${isAr ? 'احصل فوراً على رابط خاص بموقعك yourname.siteflow.vexonet.online مع شهادة SSL مجانية.' : 'Get an instant live subdomain with free SSL and worldwide fast CDN hosting.'}</p>
        </div>

        <div class="lp-feature-card-clean">
          <div class="lp-f-icon" style="background:#fef3c7;color:#d97706">${ICONS.wrap(ICONS.dollar, 22)}</div>
          <h3>${isAr ? 'دعم الدفع الإلكتروني المحلي' : 'Local Payments Integration'}</h3>
          <p>${isAr ? 'استقبل مدفوعات متجرك بسهولة عبر إنستاباي، فودافون كاش، وفوري بالإضافة للبطاقات البنكية.' : 'Accept customer payments smoothly via InstaPay, mobile wallets, Fawry, and cards.'}</p>
        </div>

        <div class="lp-feature-card-clean">
          <div class="lp-f-icon" style="background:#fce7f3;color:#ec4899">${ICONS.wrap(ICONS.search, 22)}</div>
          <h3>${isAr ? 'متوافق تلقائياً مع محركات البحث SEO' : 'Built-in SEO & Rich Meta'}</h3>
          <p>${isAr ? 'تهيئة تلقائية لوسوم الميتا وخريطة الموقع وسرعة التحميل لمساعدتك على تصدر نتائج Google.' : 'Automatic meta tags, sitemaps, and fast speeds to help your site rank higher on Google.'}</p>
        </div>

        <div class="lp-feature-card-clean">
          <div class="lp-f-icon" style="background:#ede9fe;color:#7c3aed">${ICONS.wrap(ICONS.sparkles, 22)}</div>
          <h3>${isAr ? 'مساعد الذكاء الاصطناعي لكتابة المحتوى' : 'AI Content Assistant'}</h3>
          <p>${isAr ? 'أنشئ نصوصاً تسويقية جذابة، عناوين قوية، ووصفاً لمنتجاتك بضغطة زر واحدة.' : 'Generate compelling copy, catchy headlines, and product descriptions with AI.'}</p>
        </div>

        <div class="lp-feature-card-clean">
          <div class="lp-f-icon" style="background:#fee2e2;color:#dc2626">${ICONS.wrap(ICONS.form, 22)}</div>
          <h3>${isAr ? 'نماذج استفسارات وإدارة الطلبات' : 'Lead Forms & Order Management'}</h3>
          <p>${isAr ? 'استقبل رسائل العملاء وطلبات المتجر فوراً في لوحة تحكمك مع إشعارات فورية.' : 'Capture customer leads and store orders instantly with real-time dashboard notifications.'}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. How it works (3 Steps) -->
  <section class="lp-section-clean lp-section-bg">
    <div class="lp-container">
      <div class="lp-section-header">
        <span class="lp-section-pill">${isAr ? 'خطوات بسيطة' : 'How It Works'}</span>
        <h2 class="lp-section-heading">${isAr ? '3 خطوات بسيطة لإطلاق موقعك للعالم' : '3 Simple Steps to Launch Your Site'}</h2>
        <p class="lp-section-subheading">${isAr ? 'لا تحتاج لأي خبرة برمجية أو تصميم مسبق. ابدأ الآن وانشر في دقائق.' : 'No coding or design skills needed. Start now and go live in minutes.'}</p>
      </div>

      <div class="lp-steps-clean">
        <div class="lp-step-card-clean">
          <div class="lp-step-number">1</div>
          <h3>${isAr ? 'اختر القالب المناسب' : 'Pick a Template'}</h3>
          <p>${isAr ? 'انتقِ قالباً مصمماً باحترافية يناسب مجال عملك، سواء كان متجراً، شركة، مطعماً، أو بورتفوليو.' : 'Select a sleek, industry-tailored template designed for high conversion.'}</p>
        </div>

        <div class="lp-step-card-clean">
          <div class="lp-step-number">2</div>
          <h3>${isAr ? 'خصّص المحتوى والألوان' : 'Customize Content'}</h3>
          <p>${isAr ? 'غيّر النصوص والصور والألوان بنقرة واحدة عبر المحرر المرئي التفاعلي والسلس.' : 'Edit text, swap images, and adjust colors with zero friction.'}</p>
        </div>

        <div class="lp-step-card-clean">
          <div class="lp-step-number">3</div>
          <h3>${isAr ? 'انشر موقعك فوراً' : 'Publish Instantly'}</h3>
          <p>${isAr ? 'احصل على دومين فرعي مجاني أو اربط دومينك الخاص وانشر موقعك لعملائك بنقرة زر.' : 'Go live with a free subdomain or connect your custom domain with one click.'}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. Templates Preview Section -->
  <section class="lp-section-clean" id="templatesSection">
    <div class="lp-container">
      <div class="lp-section-header">
        <span class="lp-section-pill">${isAr ? 'قوالب جاهزة' : 'Featured Templates'}</span>
        <h2 class="lp-section-heading">${isAr ? 'تصاميم حديثة تناسب كل الأنشطة التجارية' : 'Modern Templates for Every Business'}</h2>
        <p class="lp-section-subheading">${isAr ? 'أكثر من 40 قالباً مجهزاً باللغتين العربية والإنجليزية لزيادة مبيعاتك وتفاعلك.' : 'Over 40 responsive templates in Arabic and English ready to customize.'}</p>
      </div>

      <div class="lp-templates-grid">
        <div class="lp-template-card">
          <div class="lp-template-thumb" style="background:#f1f5f9;font-size:3.5rem">🛍️</div>
          <div class="lp-template-info">
            <span class="lp-template-badge">${isAr ? 'متجر إلكتروني' : 'E-Commerce'}</span>
            <h4>${isAr ? 'متجر أزياء وإكسسوارات' : 'Fashion Store'}</h4>
            <p>${isAr ? 'عرض منتجات، سلة مشتريات، ودفع محلي ميسر.' : 'Product catalog, shopping cart, and local checkout.'}</p>
            <a href="#/login" class="btn btn-outline btn-sm w-full">${isAr ? 'استخدم هذا القالب' : 'Use Template'}</a>
          </div>
        </div>

        <div class="lp-template-card">
          <div class="lp-template-thumb" style="background:#f1f5f9;font-size:3.5rem">☕</div>
          <div class="lp-template-info">
            <span class="lp-template-badge">${isAr ? 'مطاعم وكافيهات' : 'Food & Cafe'}</span>
            <h4>${isAr ? 'كافيه ومخبوزات أرتيزان' : 'Artisan Cafe'}</h4>
            <p>${isAr ? 'قائمة طعام تفاعلية، حجز طاولات، وموقع على الخريطة.' : 'Interactive digital menu and table reservations.'}</p>
            <a href="#/login" class="btn btn-outline btn-sm w-full">${isAr ? 'استخدم هذا القالب' : 'Use Template'}</a>
          </div>
        </div>

        <div class="lp-template-card">
          <div class="lp-template-thumb" style="background:#f1f5f9;font-size:3.5rem">🚀</div>
          <div class="lp-template-info">
            <span class="lp-template-badge">${isAr ? 'شركات وتقنية' : 'Tech & SaaS'}</span>
            <h4>${isAr ? 'شركة برمجيات وخدمات' : 'Software Agency'}</h4>
            <p>${isAr ? 'عرض المزايا، الأسعار، واستمارة طلب العروض.' : 'Feature highlights, pricing tiers, and lead form.'}</p>
            <a href="#/login" class="btn btn-outline btn-sm w-full">${isAr ? 'استخدم هذا القالب' : 'Use Template'}</a>
          </div>
        </div>

        <div class="lp-template-card">
          <div class="lp-template-thumb" style="background:#f1f5f9;font-size:3.5rem">🎨</div>
          <div class="lp-template-info">
            <span class="lp-template-badge">${isAr ? 'بورتفوليو' : 'Portfolio'}</span>
            <h4>${isAr ? 'معرض أعمال شخصي' : 'Creative Portfolio'}</h4>
            <p>${isAr ? 'عرض الأعمال الإبداعية ونموذج اتصال سريع للمستقلين.' : 'Portfolio showcase and instant contact for creators.'}</p>
            <a href="#/login" class="btn btn-outline btn-sm w-full">${isAr ? 'استخدم هذا القالب' : 'Use Template'}</a>
          </div>
        </div>
      </div>

      <div style="text-align:center;margin-top:32px">
        <a href="#/showcase" class="btn btn-outline btn-lg" style="border-radius:12px;font-weight:700">
          ${isAr ? 'عرض كافة القوالب والمعرض (40+ قالب) ←' : 'Browse All Templates & Showcase (40+) →'}
        </a>
      </div>
    </div>
  </section>

  <!-- 6. Pricing Preview Section -->
  <section class="lp-section-clean lp-section-bg">
    <div class="lp-container">
      <div class="lp-section-header">
        <span class="lp-section-pill">${isAr ? 'الأسعار والباقات' : 'Transparent Pricing'}</span>
        <h2 class="lp-section-heading">${isAr ? 'خطط بسيطة ومرنة تناسب الجميع' : 'Simple Plans That Grow With You'}</h2>
        <p class="lp-section-subheading">${isAr ? 'ابدأ مجاناً وجرب كل شيء. يمكنك الترقية في أي وقت.' : 'Start for free and upgrade whenever you are ready.'}</p>
      </div>

      <div class="lp-pricing-grid-clean">
        <div class="lp-p-card">
          <h3>${isAr ? 'مجاني (14 يوماً)' : 'Free Trial'}</h3>
          <div class="lp-p-price">0 <span>${isAr ? 'ج.م / 14 يوم' : 'EGP / 14 days'}</span></div>
          <p class="lp-p-desc">${isAr ? 'لتجربة المحرر وإنشاء موقعك الأول' : 'To build and launch your first website'}</p>
          <ul class="lp-p-list">
            <li>${ICONS.wrap(ICONS.check, 16)} ${isAr ? 'دومين فرعي مجاني' : 'Free fast subdomain'}</li>
            <li>${ICONS.wrap(ICONS.check, 16)} ${isAr ? 'موقع إلكتروني واحد' : '1 complete website'}</li>
            <li>${ICONS.wrap(ICONS.check, 16)} ${isAr ? 'محرر مرئي سريع' : 'Drag-and-drop editor'}</li>
            <li>${ICONS.wrap(ICONS.check, 16)} ${isAr ? 'استضافة سحابية فائقة' : 'Fast cloud hosting'}</li>
          </ul>
          <a href="#/login" class="btn btn-outline btn-lg w-full">${isAr ? 'ابدأ مجاناً' : 'Start Free'}</a>
        </div>

        <div class="lp-p-card lp-p-popular">
          <div class="lp-p-badge">${isAr ? 'الأكثر اختياراً 🔥' : 'Most Popular 🔥'}</div>
          <h3>${isAr ? 'احترافي (Pro)' : 'Pro Plan'}</h3>
          <div class="lp-p-price">299 <span>${isAr ? 'ج.م / شهرياً' : 'EGP / mo'}</span></div>
          <p class="lp-p-desc">${isAr ? 'لأصحاب الأعمال والشركات والمتاجر' : 'For businesses, online stores & startups'}</p>
          <ul class="lp-p-list">
            <li>${ICONS.wrap(ICONS.check, 16)} ${isAr ? 'مواقع وصفحات غير محدودة' : 'Unlimited sites & pages'}</li>
            <li>${ICONS.wrap(ICONS.check, 16)} ${isAr ? 'ربط دومين خاص (.com)' : 'Custom domain support'}</li>
            <li>${ICONS.wrap(ICONS.check, 16)} ${isAr ? 'دفع إلكتروني (إنستاباي وفودافون كاش)' : 'InstaPay & Vodafone Cash'}</li>
            <li>${ICONS.wrap(ICONS.check, 16)} ${isAr ? 'مساعد الذكاء الاصطناعي وتحسين SEO' : 'AI Assistant & SEO suite'}</li>
            <li>${ICONS.wrap(ICONS.check, 16)} ${isAr ? 'دعم فني فوري وأولوية' : 'Priority support'}</li>
          </ul>
          <a href="#/login" class="btn btn-primary btn-lg w-full">${isAr ? 'اشترك في الاحترافي' : 'Choose Pro'}</a>
        </div>

        <div class="lp-p-card">
          <h3>${isAr ? 'بيزنس (Business)' : 'Business'}</h3>
          <div class="lp-p-price">599 <span>${isAr ? 'ج.م / شهرياً' : 'EGP / mo'}</span></div>
          <p class="lp-p-desc">${isAr ? 'للمؤسسات والشركات الكبيرة' : 'For large enterprises & scaling stores'}</p>
          <ul class="lp-p-list">
            <li>${ICONS.wrap(ICONS.check, 16)} ${isAr ? 'متجر إلكتروني متقدم وإدارة المخزون' : 'Advanced store & inventory'}</li>
            <li>${ICONS.wrap(ICONS.check, 16)} ${isAr ? 'تقارير مبيعات وتحليلات زوار حية' : 'Sales & traffic analytics'}</li>
            <li>${ICONS.wrap(ICONS.check, 16)} ${isAr ? 'مدير حساب مخصص 24/7' : 'Dedicated account manager'}</li>
            <li>${ICONS.wrap(ICONS.check, 16)} ${isAr ? 'بدون أي علامة تجارية نهائياً' : 'Zero platform branding'}</li>
          </ul>
          <a href="#/login" class="btn btn-outline btn-lg w-full">${isAr ? 'اشترك في بيزنس' : 'Choose Business'}</a>
        </div>
      </div>

      <div style="text-align:center;margin-top:24px">
        <a href="#/plans" style="font-size:.92rem;font-weight:600;color:var(--primary)">
          ${isAr ? 'عرض مقارنة الخطط والتفاصيل الكاملة ←' : 'Compare all plans and features →'}
        </a>
      </div>
    </div>
  </section>

  <!-- 7. Testimonials -->
  <section class="lp-section-clean">
    <div class="lp-container">
      <div class="lp-section-header">
        <span class="lp-section-pill">${isAr ? 'آراء العملاء' : 'Testimonials'}</span>
        <h2 class="lp-section-heading">${isAr ? 'يثق بنا آلاف المبدعين وأصحاب المتاجر' : 'Loved by Thousands of Creators'}</h2>
        <p class="lp-section-subheading">${isAr ? 'تجارب حقيقية لأشخاص طوروا أعمالهم ورفعوا مبيعاتهم باستخدام SiteFlow.' : 'Hear how creators and businesses launch and grow with SiteFlow.'}</p>
      </div>

      <div class="lp-testimonials-grid-clean">
        <div class="lp-t-card">
          <div class="lp-t-stars">★★★★★</div>
          <p>${isAr ? '«أنشأت موقع متجري للملابس في نصف ساعة وربطت رقم إنستاباي. في أول أسبوع استقبلت أكثر من 40 طلباً بدون أي وسيط!»' : '"Launched my fashion store in 30 minutes with InstaPay checkout. Got over 40 orders in the very first week!"'}</p>
          <div class="lp-t-author">
            <div class="lp-t-avatar" style="background:#4f46e5">أ</div>
            <div>
              <strong>${isAr ? 'أحمد الشريف' : 'Ahmed El-Sharif'}</strong>
              <span>${isAr ? 'مؤسس متجر أزياء' : 'Founder, Apparel Store'}</span>
            </div>
          </div>
        </div>

        <div class="lp-t-card">
          <div class="lp-t-stars">★★★★★</div>
          <p>${isAr ? '«كنت أستخدم وردبريس وكان بطيئاً ومعقداً ويحتاج لمطور كل أسبوع. مع SiteFlow أعدل أي شيء بنفسي في ثوانٍ والسرعة خيالية.»' : '"Switched from slow, bloated WordPress. With SiteFlow, I update my site in seconds and page speed is lightning fast."'} </p>
          <div class="lp-t-author">
            <div class="lp-t-avatar" style="background:#059669">س</div>
            <div>
              <strong>${isAr ? 'سارة المنشاوي' : 'Sarah Manshawi'}</strong>
              <span>${isAr ? 'مصممة جرافيك مستقلة' : 'Freelance Designer'}</span>
            </div>
          </div>
        </div>

        <div class="lp-t-card">
          <div class="lp-t-stars">★★★★★</div>
          <p>${isAr ? '«الدعم الفني ممتاز وسريع جداً، وتوافق الموقع مع الهواتف الذكية بنسبة 100% ساعدنا كثيراً في حملات إعلانات تيك توك وإنستجرام.»' : '"Great support, and 100% mobile responsiveness made our TikTok & Instagram ad campaigns convert significantly higher."'} </p>
          <div class="lp-t-author">
            <div class="lp-t-avatar" style="background:#d97706">م</div>
            <div>
              <strong>${isAr ? 'محمد عبد الله' : 'Mohamed Abdullah'}</strong>
              <span>${isAr ? 'مدير تسويق رقمي' : 'Digital Marketing Lead'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 8. FAQ Accordion -->
  <section class="lp-section-clean lp-section-bg">
    <div class="lp-container" style="max-width:800px">
      <div class="lp-section-header">
        <span class="lp-section-pill">${isAr ? 'الأسئلة الشائعة' : 'FAQ'}</span>
        <h2 class="lp-section-heading">${isAr ? 'إجابات على أكثر الأسئلة تكراراً' : 'Frequently Asked Questions'}</h2>
      </div>

      <div class="lp-faq-list">
        <div class="lp-faq-item active" onclick="this.classList.toggle('active')">
          <h3>${isAr ? 'هل التجربة المجانية مجانية بالفعل بدون شروط؟' : 'Is the free trial really free?'}</h3>
          <p>${isAr ? 'نعم، يمكنك إنشاء حسابك واستخدام المحرر ونشر موقعك على دومين فرعي مجاناً وبدون إدخال أي بطاقة دفع.' : 'Yes! You can design, customize, and publish your site with a free subdomain with zero credit card required.'}</p>
        </div>
        <div class="lp-faq-item" onclick="this.classList.toggle('active')">
          <h3>${isAr ? 'هل يمكنني ربط دوميني الخاص بي مثل (myname.com)؟' : 'Can I connect a custom domain (.com)?'}</h3>
          <p>${isAr ? 'نعم، تدعم باقات Pro و Business ربط أي دومين خاص تملكه مع شهادة SSL مجانية وتوجيه تلقائي.' : 'Yes, Pro and Business plans support custom domains with free automatic SSL certificates.'}</p>
        </div>
        <div class="lp-faq-item" onclick="this.classList.toggle('active')">
          <h3>${isAr ? 'كيف يتم استقبال المدفوعات والطلبات؟' : 'How are payments and orders received?'}</h3>
          <p>${isAr ? 'يمكنك ربط حسابك في إنستاباي أو فودافون كاش أو فوري، ليستقبل متجرك إشعارات التحويل والطلبات مباشرة في لوحة التحكم.' : 'Connect your InstaPay or mobile wallets to receive order notifications and payment confirmations directly in your dashboard.'}</p>
        </div>
        <div class="lp-faq-item" onclick="this.classList.toggle('active')">
          <h3>${isAr ? 'هل أحتاج لأي خبرة سابقة في البرمجة؟' : 'Do I need any coding knowledge?'}</h3>
          <p>${isAr ? 'إطلاقاً! المنصة مبنية لتكون بديهية 100% مع واجهة مرئية بنظام السحب والإفلات وتعديل النصوص مباشرة.' : 'Not at all! The platform is 100% visual with drag-and-drop ease and instant text editing.'}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 9. Minimalist Bottom CTA -->
  <section class="lp-bottom-cta">
    <div class="lp-container" style="text-align:center">
      <h2 style="font-size:2.2rem;font-weight:900;color:#fff;margin-bottom:12px">
        ${isAr ? 'جاهز لإطلاق موقعك الإلكتروني اليوم؟' : 'Ready to Launch Your Website Today?'}
      </h2>
      <p style="color:var(--gray-300);font-size:1.05rem;max-width:560px;margin:0 auto 28px;line-height:1.6">
        ${isAr ? 'انضم إلى آلاف المستخدمين الذين يثقون بمنصة SiteFlow لبناء حضورهم الرقمي وتنمية أعمالهم.' : 'Join thousands of creators using SiteFlow to grow their digital presence.'}
      </p>
      <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap">
        <a href="#/login" class="btn btn-primary btn-lg js-auth-guest" style="border-radius:12px;font-weight:700;padding:16px 36px">
          ${isAr ? 'ابدأ مجاناً الآن 🚀' : 'Start Free Now 🚀'}
        </a>
        <a href="#/dashboard" class="btn btn-primary btn-lg js-auth-user hidden" style="border-radius:12px;font-weight:700;padding:16px 36px">
          ${isAr ? 'الانتقال للوحة التحكم' : 'Go to Dashboard'}
        </a>
        <a href="#/plans" class="btn btn-outline btn-lg" style="border-radius:12px;border-color:var(--gray-700);color:#fff">
          ${isAr ? 'استعراض خطط الأسعار' : 'View Pricing Plans'}
        </a>
      </div>
    </div>
  </section>

  <!-- 10. Clean Minimalist Footer -->
  <footer class="lp-clean-footer">
    <div class="lp-container">
      <div class="lp-footer-top">
        <div class="lp-footer-brand-col">
          <div class="logo" style="margin-bottom:10px">
            <img src="assets/sitflow.svg" alt="Site Flow" width="36" height="36">
            <span>SiteFlow</span>
          </div>
          <p style="color:var(--gray-500);font-size:.86rem;line-height:1.6;max-width:280px">
            ${isAr ? 'المنصة العربية الأولى لبناء المواقع والمتاجر السحابية بدون كود.' : 'The modern visual website builder for creators and businesses.'}
          </p>
          <div style="margin-top:14px">
            <button class="lang-switcher-btn" onclick="Auth.toggleLang()" style="font-size:.8rem">
              🌐 ${isAr ? 'Switch to English' : 'التحويل للعربية'}
            </button>
          </div>
        </div>

        <div class="lp-footer-links-col">
          <h5>${isAr ? 'المنتج' : 'Product'}</h5>
          <a href="#/plans">${isAr ? 'باقات الأسعار' : 'Pricing'}</a>
          <a href="#/showcase">${isAr ? 'معرض المواقع' : 'Showcase'}</a>
          <a href="#/templates">${isAr ? 'القوالب الجاهزة' : 'Templates'}</a>
        </div>

        <div class="lp-footer-links-col">
          <h5>${isAr ? 'الشركة' : 'Company'}</h5>
          <a href="#/about">${isAr ? 'من نحن' : 'About Us'}</a>
          <a href="#/help">${isAr ? 'المساعدة والدعم' : 'Help Center'}</a>
        </div>

        <div class="lp-footer-links-col">
          <h5>${isAr ? 'القانوني' : 'Legal'}</h5>
          <a href="#/privacy">${isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</a>
          <a href="#/privacy">${isAr ? 'شروط الاستخدام' : 'Terms of Service'}</a>
        </div>
      </div>

      <div class="lp-footer-bottom-clean">
        <p>&copy; ${new Date().getFullYear()} Site Flow Inc. ${isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
        <p style="color:var(--gray-400);font-size:.8rem">${isAr ? 'مدعوم بقاعدة بيانات Supabase PostgreSQL السحابية' : 'Powered by Supabase Cloud'}</p>
      </div>
    </div>
  </footer>
</div>` },

  login() { return `
<div class="auth-page" dir="rtl">
  <div class="auth-left">
    <div class="auth-left-content">
      <div style="margin-bottom:32px;opacity:.9">${ICONS.wrap(ICONS.sparkles,48)}</div>
      <h1 style="font-size:2.2rem;font-weight:800;color:#fff;line-height:1.3;margin-bottom:16px">
        ابنِ موقعك الإلكتروني<br>الاحترافي في دقائق
      </h1>
      <p style="font-size:1.05rem;color:rgba(255,255,255,.8);line-height:1.7;margin-bottom:32px">
        المنصة السحابية الأولى لبناء وإطلاق المواقع والمتاجر الإلكترونية المتكاملة بدون كود.
      </p>
      <div style="margin-top:40px;display:flex;flex-direction:column;gap:16px">
        <div style="display:flex;align-items:center;gap:12px;font-size:1rem;color:#fff">
          <span style="width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center">${ICONS.wrap(ICONS.check,16)}</span>
          محرر مرئي تفاعلي فائق السرعة
        </div>
        <div style="display:flex;align-items:center;gap:12px;font-size:1rem;color:#fff">
          <span style="width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center">${ICONS.wrap(ICONS.check,16)}</span>
          مكتبة قوالب عربية جاهزة ومجهزة لأفضل المبيعات
        </div>
        <div style="display:flex;align-items:center;gap:12px;font-size:1rem;color:#fff">
          <span style="width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center">${ICONS.wrap(ICONS.check,16)}</span>
          استضافة سحابية سريعة ودومين مجاني
        </div>
      </div>
    </div>
  </div>
  <div class="auth-right">
    <div class="auth-form" style="max-width:440px;width:100%">
      <h2 style="font-size:1.8rem;font-weight:800;color:#0f172a;margin-bottom:6px">مرحباً بك في SiteFlow</h2>
      <p class="subtitle" style="color:var(--gray-500);margin-bottom:24px">سجل دخولك أو أنشئ حسابك لإدارة مواقعك ومبيعاتك</p>

      <div class="auth-tabs" style="margin-bottom:20px">
        <button class="auth-tab active" data-tab="login" style="font-weight:700">تسجيل الدخول</button>
        <button class="auth-tab" data-tab="signup" style="font-weight:700">إنشاء حساب جديد</button>
      </div>

      <div class="auth-error" id="authError" style="display:none;padding:12px 16px;border-radius:10px;background:#fee2e2;color:#dc2626;font-size:.9rem;margin-bottom:16px;font-weight:600"></div>

      <form id="loginForm">
        <div class="input-group">
          <label style="font-weight:600;margin-bottom:6px">البريد الإلكتروني</label>
          <input type="email" class="input" id="loginEmail" placeholder="name@example.com" required style="direction:ltr;text-align:right">
        </div>
        <div class="input-group">
          <label style="font-weight:600;margin-bottom:6px">كلمة المرور</label>
          <input type="password" class="input" id="loginPassword" placeholder="أدخل كلمة المرور" required style="direction:ltr;text-align:right">
        </div>
        <button type="submit" class="btn btn-primary btn-lg w-full" style="font-weight:700;margin-top:8px">تسجيل الدخول</button>
      </form>

      <form id="signupForm" class="hidden">
        <div class="input-group">
          <label style="font-weight:600;margin-bottom:6px">الاسم الكامل</label>
          <input type="text" class="input" id="signupName" placeholder="مثال: أحمد محمد" required>
        </div>
        <div class="input-group">
          <label style="font-weight:600;margin-bottom:6px">البريد الإلكتروني</label>
          <input type="email" class="input" id="signupEmail" placeholder="name@example.com" required style="direction:ltr;text-align:right">
        </div>
        <div class="input-group">
          <label style="font-weight:600;margin-bottom:6px">كلمة المرور (6 أحرف على الأقل)</label>
          <input type="password" class="input" id="signupPassword" placeholder="••••••••" minlength="6" required style="direction:ltr;text-align:right">
        </div>
        <div class="input-group">
          <label style="font-weight:600;margin-bottom:6px">تأكيد كلمة المرور</label>
          <input type="password" class="input" id="signupPasswordConfirm" placeholder="••••••••" minlength="6" required style="direction:ltr;text-align:right">
        </div>
        <button type="submit" class="btn btn-primary btn-lg w-full" style="font-weight:700;margin-top:8px">إنشاء الحساب الآن</button>
      </form>

      <!-- 3. OTP Email Verification Form -->
      <div id="otpSection" class="hidden" style="text-align:center;padding:10px 0">
        <div style="width:60px;height:60px;border-radius:18px;background:rgba(99,102,241,0.1);color:var(--primary);display:flex;align-items:center;justify-content:center;margin:0 auto 16px">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </div>
        <h3 style="font-size:1.4rem;font-weight:800;color:#0f172a;margin-bottom:6px">تأكيد البريد الإلكتروني (OTP)</h3>
        <p style="color:var(--gray-500);font-size:.88rem;margin-bottom:20px;line-height:1.6">
          تم إرسال رمز التحقق أو رابط التفعيل إلى بريدك:<br>
          <strong id="otpEmailDisplay" style="color:var(--gray-900);font-family:monospace;direction:ltr;display:inline-block;margin-top:4px"></strong>
        </p>

        <form id="otpForm">
          <div class="input-group">
            <label style="font-weight:600;margin-bottom:8px">أدخل رمز التحقق (OTP)</label>
            <input type="text" class="input" id="otpCodeInput" placeholder="123456" maxlength="8" required style="font-size:1.6rem;letter-spacing:6px;text-align:center;font-weight:800;font-family:monospace;direction:ltr">
          </div>
          <button type="submit" class="btn btn-primary btn-lg w-full" id="otpSubmitBtn" style="font-weight:700;margin-top:12px">
            تأكيد وتفعيل الحساب 🚀
          </button>
        </form>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:20px;font-size:.85rem">
          <button type="button" class="btn btn-ghost btn-sm" id="resendOtpBtn" style="color:var(--primary)">
            إعادة إرسال الرمز
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="backToLoginBtn">
            ← العودة لتسجيل الدخول
          </button>
        </div>
      </div>
    </div>
  </div>
</div>` },

  templatePicker() { return `
<div class="modal-overlay open" id="templateModal">
  <div class="modal" style="max-width:1000px;padding:32px;max-height:90vh;overflow-y:auto">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <h2 style="font-size:1.5rem;font-weight:800">Choose a Template</h2>
      <button class="btn btn-ghost btn-sm" onclick="document.getElementById('templateModal').classList.remove('open')" style="font-size:1.2rem">✕</button>
    </div>
    <p style="color:var(--gray-500);margin-bottom:20px">Start with a pre-built template or a blank canvas</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px" id="templateFilters">
      <button class="btn btn-sm filter-btn active" data-filter="all">All</button>
      <button class="btn btn-sm filter-btn" data-filter="business">Business</button>
      <button class="btn btn-sm filter-btn" data-filter="food">Food & Drink</button>
      <button class="btn btn-sm filter-btn" data-filter="ar">عربي</button>
      <button class="btn btn-sm filter-btn" data-filter="health">Health</button>
      <button class="btn btn-sm filter-btn" data-filter="fitness">Fitness</button>
      <button class="btn btn-sm filter-btn" data-filter="beauty">Beauty</button>
      <button class="btn btn-sm filter-btn" data-filter="realestate">Real Estate</button>
      <button class="btn btn-sm filter-btn" data-filter="tech">Technology</button>
      <button class="btn btn-sm filter-btn" data-filter="education">Education</button>
      <button class="btn btn-sm filter-btn" data-filter="travel">Travel</button>
      <button class="btn btn-sm filter-btn" data-filter="creative">Creative</button>
      <button class="btn btn-sm filter-btn" data-filter="legal">Legal & Finance</button>
      <button class="btn btn-sm filter-btn" data-filter="automotive">Automotive</button>
      <button class="btn btn-sm filter-btn" data-filter="home">Home</button>
      <button class="btn btn-sm filter-btn" data-filter="events">Events</button>
      <button class="btn btn-sm filter-btn" data-filter="retail">Retail</button>
      <button class="btn btn-sm filter-btn" data-filter="media">Media</button>
      <button class="btn btn-sm filter-btn" data-filter="nonprofit">Nonprofit</button>
      <button class="btn btn-sm filter-btn" data-filter="luxury">Luxury</button>
      <button class="btn btn-sm filter-btn" data-filter="kids">Kids</button>
      <button class="btn btn-sm filter-btn" data-filter="pet">Pet</button>
      <button class="btn btn-sm filter-btn" data-filter="music">Music</button>
      <button class="btn btn-sm filter-btn" data-filter="photography">Photo</button>
      <button class="btn btn-sm filter-btn" data-filter="agriculture">Agriculture</button>
    </div>
    <div style="position:relative;margin-bottom:16px">
      <input type="text" id="tplSearchInput" placeholder="Search templates..." style="width:100%;padding:10px 14px 10px 36px;border:2px solid var(--gray-200);border-radius:var(--radius-sm);font-size:.85rem;font-family:inherit;transition:var(--transition)">
      <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--gray-400)">${ICONS.wrap(ICONS.search,16)}</span>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <span id="tplCount" style="font-size:.82rem;color:var(--gray-500)"></span>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px" id="templateGrid"></div>
    <div style="display:flex;justify-content:center;gap:8px;margin-top:20px" id="tplPagination"></div>
  </div>
</div>` },

  dashboard() { return `
<div class="dashboard">
  <div class="dashboard-header">
    <div>
      <h1>أهلاً بك، <span class="js-user-name"></span> ${ICONS.wrap(ICONS.sparkles,22)}</h1>
      <p>إليك ملخص وإحصائيات مواقعك الإلكترونية</p>
    </div>
    <div class="header-actions">
      ${Auth.isAdmin()?'<a href="#/admin" class="btn btn-ghost btn-sm" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">لوحة المشرف</a>':''}
      <a href="#/settings" class="btn btn-outline btn-sm" title="إعدادات قاعدة البيانات">${ICONS.wrap(ICONS.settings,14)} قاعدة البيانات (Supabase)</a>
      <a href="#/plans" class="btn btn-outline btn-sm" id="upgradeBtn">${ICONS.wrap(ICONS.trendingUp,14)} ترقية الخطة</a>
      <button class="btn btn-primary btn-sm" id="createSiteBtn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        إنشاء موقع جديد
      </button>
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
<div style="max-width:1200px;margin:0 auto;padding:60px 24px">
  <div class="text-center mb-24">
    <h1 style="font-size:2.2rem;margin-bottom:8px">أسعار مناسبة للسوق المصري</h1>
    <p style="color:var(--gray-500)">ابدأ مجاناً وطَوِّر حسب احتياجك — ادفع بالجنيه المصري</p>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px">
    ${Object.entries(plans).map(([k,p])=>{
      const cur=Auth.user?.plan===k
      const isPopular=k==='pro'
      const priceStr=p.price===0?'مجاني':'ج.م '+p.price
      return `<div class="card" style="padding:28px;position:relative;${cur?'border:2px solid var(--primary);box-shadow:var(--shadow-md)':''}${isPopular&&!cur?'border:2px solid var(--primary);':''}">
        ${cur?'<div style="position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:var(--primary);color:#fff;padding:4px 16px;border-radius:20px;font-size:.72rem;font-weight:700">الخطة الحالية</div>':''}
        ${isPopular&&!cur?'<div style="position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:#059669;color:#fff;padding:4px 16px;border-radius:20px;font-size:.72rem;font-weight:700">الأكثر شعبية</div>':''}
        <h3 style="font-size:1.3rem;margin-bottom:4px">${p.name}</h3>
        <div style="font-size:2.2rem;font-weight:800;color:var(--primary);margin-bottom:4px">${priceStr}<span style="font-size:.85rem;color:var(--gray-500);font-weight:400">${p.price>0?'/شهرياً':''}</span></div>
        ${p.yearly_price?`<p style="font-size:.75rem;color:var(--gray-400);margin-bottom:16px">أو ج.م ${p.yearly_price.toLocaleString()}/سنوياً</p>`:'<div style="height:16px"></div>'}
        <ul style="list-style:none;padding:0;margin-bottom:20px;display:flex;flex-direction:column;gap:8px">
          ${(p.features||[]).map(f=>`<li style="display:flex;align-items:start;gap:8px;font-size:.85rem;color:var(--gray-600)">${ICONS.wrap(ICONS.check,14)} ${f}</li>`).join('')}
        </ul>
        <button class="btn w-full ${cur?'btn-secondary':'btn-primary'} plan-btn" data-plan="${k}" style="font-size:.9rem;padding:12px">${cur?'الخطة الحالية':p.price===0?'ابدأ مجاناً':'اشترك الآن'}</button>
      </div>`
    }).join('')}
  </div>
</div>` },

  builder(page) {
    const t=page.theme||{color:'#6366f1',font:'Inter'}
    return `<div class="builder-toolbar">
      <div class="left">
        <button class="btn btn-ghost btn-sm" onclick="Router.navigate('dashboard')" title="Back to Dashboard" style="padding:6px 10px">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span style="width:1px;height:24px;background:var(--gray-200);margin:0 4px"></span>
        <span class="truncate" style="font-weight:700;font-size:.92rem;color:var(--gray-800);max-width:200px">${page.title}</span>
        <span style="font-size:.7rem;padding:3px 10px;border-radius:20px;font-weight:600;${page.published?'background:#dcfce7;color:#16a34a':'background:#fef3c7;color:#d97706'};letter-spacing:.02em">${page.published?'Published':'Draft'}</span>
      </div>
      <div class="right">
        <button class="btn btn-ghost btn-sm" id="undoBtn" title="Undo (Ctrl+Z)" style="padding:6px 8px">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
        </button>
        <button class="btn btn-ghost btn-sm" id="redoBtn" title="Redo (Ctrl+Y)" style="padding:6px 8px">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
        </button>
        <span style="width:1px;height:24px;background:var(--gray-200);margin:0 4px"></span>
        <div class="device-toggle" id="deviceToggle">
          <button class="device-btn active" data-device="desktop" title="Desktop view">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </button>
          <button class="device-btn" data-device="mobile" title="Mobile view">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          </button>
        </div>
        <span style="width:1px;height:24px;background:var(--gray-200);margin:0 4px"></span>
        <button class="btn btn-ghost btn-sm" id="previewBtn" title="Preview in new tab">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          Preview
        </button>
        <button class="btn btn-ghost btn-sm" id="exportBtn" title="تصدير كود HTML كامل للموقع">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          تصدير HTML
        </button>
        <button class="btn btn-ghost btn-sm" id="saveBtn" title="Save (Ctrl+S)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          Save
        </button>
        <button class="btn btn-primary btn-sm" id="publishBtn" style="padding:8px 18px;font-weight:700">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
          ${page.published?'Update':'Publish'}
        </button>
      </div>
    </div>
    <div class="builder-layout">
      <div class="builder-sidebar" id="builderSidebar">
        <div class="sidebar-tabs">
          <button class="sidebar-tab active" data-stab="sections">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Sections
          </button>
          <button class="sidebar-tab" data-stab="theme">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            Theme
          </button>
          <button class="sidebar-tab" data-stab="seo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            SEO
          </button>
          <button class="sidebar-tab" data-stab="settings">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
            Settings
          </button>
          <button class="sidebar-tab" data-stab="ai" style="color:var(--primary);font-weight:700">
            <span style="font-size:1rem;margin-left:2px">🤖</span>
            SiteFlow AI
          </button>
        </div>
        <div class="sidebar-content" id="sidebarSections">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <span style="font-size:.78rem;font-weight:700;color:var(--gray-500);text-transform:uppercase;letter-spacing:.05em">Sections</span>
            <span style="font-size:.72rem;color:var(--gray-400)">${page.sections.length} items</span>
          </div>
          <div class="section-list" id="sectionList"></div>
          <button class="btn btn-primary btn-sm w-full" id="addSectionBtn" style="margin-top:14px;padding:10px;border-radius:10px;font-weight:700">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Section
          </button>
          <div class="sidebar-hint">Click a section to edit • Drag to reorder</div>
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
          <div style="background:linear-gradient(135deg,#ecfdf5,#f0fdf4);border:1px solid #a7f3d0;padding:12px;border-radius:10px;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between">
            <div>
              <div style="font-weight:700;font-size:.85rem;color:#065f46">🎯 فحص صحة الـ SEO</div>
              <div style="font-size:.75rem;color:#047857" id="seoScoreLabel">جاهز للفحص والتسريع</div>
            </div>
            <button class="btn btn-sm" id="aiOptimizeSeoBtn" style="background:#059669;color:#fff;font-weight:700;border-radius:8px">✨ تحسين تلقائي بالـ AI</button>
          </div>
          <div class="seo-field">
            <label>عنوان محركات البحث (SEO Title - 55-60 حرف)</label>
            <input class="input" id="seoTitle" value="${page.seo?.title||''}" maxlength="70" placeholder="عنوان جذاب لمحركات البحث Google">
            <div class="seo-preview" style="margin-top:8px">
              <div class="url">${page.slug||'my-site'}.${MAIN_DOMAIN}</div>
              <div class="title" id="seoTitlePreview">${page.seo?.title||page.title||'My Site'}</div>
            </div>
          </div>
          <div class="seo-field">
            <label>الوصف التعريفي (Meta Description - 150-160 حرف)</label>
            <textarea class="input textarea" id="seoDesc" maxlength="170" placeholder="وصف تسويقي يلخص نشاطك ويحفز الزوار على النقر">${page.seo?.description||''}</textarea>
            <div class="seo-counter" id="seoDescCounter">${(page.seo?.description||'').length} / 160</div>
          </div>
        </div>
        <div class="sidebar-content hidden" id="sidebarSettings">
          <div class="settings-group">
            <label>Site Title</label>
            <input class="input" id="pageTitleInput" value="${page.title}">
          </div>
          <div class="settings-group">
            <label>رابط الدومين الفرعي (Subdomain)</label>
            <div style="display:flex;align-items:center;direction:ltr;background:var(--gray-50);border:1px solid var(--gray-200);border-radius:8px;padding:0 8px">
              <span style="color:var(--gray-400);font-size:.85rem;user-select:none">https://</span>
              <input class="input" id="pageSlugInput" value="${page.slug||''}" style="border:none;background:transparent;padding:8px 4px;font-weight:600;color:var(--primary)" placeholder="my-brand">
              <span style="color:var(--gray-500);font-size:.85rem;user-select:none">.${MAIN_DOMAIN}</span>
            </div>
            <div id="slugWarning" style="color:#dc2626;font-size:0.8rem;margin-top:4px;display:none;font-weight:600"></div>
            <div class="hint" style="margin-top:6px">الرابط المباشر: <a id="slugPreview" href="${subdomainUrl(page.slug||'site')}" target="_blank" style="color:var(--primary);direction:ltr;display:inline-block">${page.slug||'my-site'}.${MAIN_DOMAIN}</a> 🔒 SSL مفعل</div>
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
        <div class="sidebar-content hidden" id="sidebarAi">
          <div style="background:linear-gradient(135deg,#eef2ff,#faf5ff);border:1px solid #c7d2fe;padding:14px;border-radius:12px;margin-bottom:14px">
            <div style="font-weight:800;color:var(--primary);margin-bottom:4px;display:flex;align-items:center;gap:6px">
              <span>✨</span>
              <span>SiteFlow AI — المساعد الذكي</span>
            </div>
            <p style="font-size:.78rem;color:var(--gray-600);line-height:1.5;margin:0">صف نشاطك التجاري أو فكرتك وسيقوم الذكاء الاصطناعي ببناء الهيكل والمحتوى واقتراح الألوان فوراً.</p>
          </div>
          <div class="settings-group">
            <label style="font-weight:700">وصف النشاط أو فكرة الموقع</label>
            <textarea class="input textarea" id="aiPromptInput" rows="3" placeholder="مثال: عيادة أسنان في القاهرة، متجر أزياء وإكسسوارات، مطعم برجر..."></textarea>
          </div>
          <button class="btn btn-primary w-full" id="aiGenerateBtn" style="font-weight:700;padding:10px;border-radius:10px;background:linear-gradient(135deg,var(--primary),#8b5cf6)">
            <span>🚀</span>
            توليد الموقع الذكي بالكامل
          </button>
          <div id="aiResultArea" style="margin-top:14px;display:none;background:var(--gray-50);border:1px solid var(--gray-200);border-radius:10px;padding:12px">
            <div style="font-size:.82rem;font-weight:700;color:var(--gray-800);margin-bottom:8px" id="aiResultSummary"></div>
            <div style="display:flex;flex-direction:column;gap:8px">
              <button class="btn btn-success btn-sm w-full" id="aiApplyAllBtn">تطبيق التصميم والأقسام فوراً</button>
              <button class="btn btn-outline btn-sm w-full" id="aiApplyThemeBtn">تطبيق الألوان والخطوط فقط</button>
            </div>
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
  featuresSection(d,a) { const items=d.items||[]; return `<div class="editable-section features-section ${a?'editing':''}" data-section="features"><div class="section-label">Features</div><h2 contenteditable="true" data-field="heading">${d.heading||' المميزات'}</h2><div class="services-grid">${items.map((item,i)=>`<div class="service-card"><h3 contenteditable="true" data-field="items.${i}.title">${item.title}</h3><p contenteditable="true" data-field="items.${i}.desc">${item.desc}</p></div>`).join('')}</div></div>` },
  statsSection(d,a) { const items=d.items||[]; return `<div class="editable-section stats-section ${a?'editing':''}" data-section="stats"><div class="section-label">Stats</div><h2 contenteditable="true" data-field="heading">${d.heading||'الإحصائيات'}</h2><div class="counters-grid">${items.map((item,i)=>`<div class="counter-card"><div class="counter-number" contenteditable="true" data-field="items.${i}.number">${item.number}</div><div class="counter-label" contenteditable="true" data-field="items.${i}.label">${item.label}</div></div>`).join('')}</div></div>` },
  ctaSection(d,a) { return `<div class="editable-section cta-section ${a?'editing':''}" data-section="cta" style="text-align:center;padding:60px 40px;background:var(--p-color,#6366f1);color:#fff;border-radius:16px"><div class="section-label">CTA</div><h2 contenteditable="true" data-field="heading" style="color:#fff">${d.heading||'ابدأ الآن'}</h2><p contenteditable="true" data-field="subheading" style="opacity:.9;margin-top:8px">${d.subheading||d.description||''}</p><a href="${d.buttonUrl||'#'}" class="btn" style="background:#fff;color:var(--p-color,#6366f1);margin-top:16px;font-weight:700" contenteditable="true" data-field="buttonText">${d.buttonText||'تواصل معنا'}</a></div>` },

  publicPage(page) {
    const userPlan = page.userPlan || Auth.user?.plan || 'free'
    if (isExpired(page, userPlan)) {
      return `
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px 24px;background:#f8fafc;font-family:'Cairo','Tajawal',sans-serif" dir="rtl">
        <div style="max-width:540px;background:#fff;border-radius:24px;padding:48px 36px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.08);border:1px solid #e2e8f0">
          <div style="width:72px;height:72px;background:#fee2e2;color:#dc2626;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:2rem">⏳</div>
          <h1 style="font-size:1.6rem;font-weight:800;color:#0f172a;margin-bottom:12px">انتهت الفترة التجريبية المجانية (14 يوماً)</h1>
          <p style="color:#64748b;line-height:1.7;margin-bottom:28px">انتهت مهلة الـ 14 يوماً للموقع <strong>${page.title}</strong>. لتشغيل الموقع وإعادة تفعيل الدومين الفرعي فوراً، يرجى ترقية الاشتراك.</p>
          <a href="#/plans" class="btn btn-primary btn-lg" style="width:100%;border-radius:12px;font-weight:700">ترقية الاشتراك الآن وإعادة التفعيل</a>
        </div>
      </div>`
    }

    const t = page.theme || { color: '#6366f1', font: 'Cairo' }
    const siteUrl = subdomainUrl(page.slug || 'site')
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": page.seo?.title || page.title,
      "url": siteUrl,
      "description": page.seo?.description || page.title,
      "inLanguage": "ar",
      "publisher": {
        "@type": "Organization",
        "name": "SiteFlow Platform",
        "url": "https://siteflow.vexonet.online"
      }
    }

    return `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    <div class="public-page" style="--p-color:${t.color};--p-font:${t.font};font-family:${t.font},sans-serif">
      <div class="public-nav"><span class="brand" style="color:${t.color}">${page.title}</span><span style="font-size:.75rem;color:var(--gray-400)">مطور بواسطة SiteFlow</span></div>
      <div class="public-content">${page.sections.map(s => { switch(s.type){ case'hero':return T.pubHero(s.data,t); case'about':return T.pubAbout(s.data,t); case'gallery':return T.pubGallery(s.data,t); case'contact':return T.pubContact(s.data,t); case'services':return T.pubServices(s.data,t); case'testimonials':return T.pubTestimonials(s.data,t); case'pricing':return T.pubPricing(s.data,t); case'faq':return T.pubFaq(s.data,t); case'team':return T.pubTeam(s.data,t); case'footer':return T.pubFooter(s.data,t); case'blog':return T.pubBlog(s.data,t); case'portfolio':return T.pubPortfolio(s.data,t); case'counters':return T.pubCounters(s.data,t); case'timeline':return T.pubTimeline(s.data,t); case'menu':return T.pubMenu(s.data,t); case'location':return T.pubLocation(s.data,t); case'features':return T.pubFeatures(s.data,t); case'stats':return T.pubStats(s.data,t); case'cta':return T.pubCta(s.data,t); default:return ''} }).join('')}</div>
      
      <!-- Floating AI Chatbot Widget for Visitors -->
      <div id="sfAiChatWidget" style="position:fixed;bottom:24px;left:24px;z-index:9999;font-family:inherit" dir="rtl">
        <button id="sfAiChatToggle" style="background:${t.color};color:#fff;border:none;border-radius:50px;padding:12px 20px;font-weight:700;box-shadow:0 8px 25px rgba(0,0,0,0.18);cursor:pointer;display:flex;align-items:center;gap:8px;font-size:.9rem">
          <span>🤖</span>
          <span>مساعد ${page.title} الذكي</span>
        </button>
        <div id="sfAiChatBox" style="display:none;position:absolute;bottom:60px;left:0;width:340px;height:450px;background:#fff;border-radius:20px;box-shadow:0 12px 40px rgba(0,0,0,0.18);border:1px solid #e2e8f0;flex-direction:column;overflow:hidden">
          <div style="background:${t.color};color:#fff;padding:14px 18px;display:flex;justify-content:space-between;align-items:center">
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:1.2rem">🤖</span>
              <div>
                <div style="font-weight:700;font-size:.9rem">${page.title}</div>
                <div style="font-size:.72rem;opacity:.9">مساعد ذكي مباشر للرد على الاستفسارات</div>
              </div>
            </div>
            <button id="sfAiChatClose" style="background:none;border:none;color:#fff;font-size:1.2rem;cursor:pointer">✕</button>
          </div>
          <div id="sfAiChatMessages" style="flex:1;padding:14px;overflow-y:auto;display:flex;flex-direction:column;gap:10px;font-size:.85rem;background:#f8fafc">
            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px 12px 12px 0;padding:10px 14px;max-width:85%;align-self:flex-start">
              مرحباً بك في <strong>${page.title}</strong>! كيف يمكنني مساعدتك اليوم؟ يمكنك سؤالي عن الأسعار، الخدمات، أو كيفية التواصل. 😊
            </div>
          </div>
          <div style="padding:10px 14px;border-top:1px solid #e2e8f0;display:flex;gap:8px;background:#fff">
            <input type="text" id="sfAiChatInput" placeholder="اكتب سؤالك هنا..." style="flex:1;border:1px solid #e2e8f0;border-radius:10px;padding:8px 12px;font-size:.85rem;outline:none">
            <button id="sfAiChatSend" style="background:${t.color};color:#fff;border:none;border-radius:10px;padding:8px 14px;font-weight:700;cursor:pointer">إرسال</button>
          </div>
        </div>
      </div>
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
  pubMenu(d,t) { const items=d.items||[]; const cats=[...new Set(items.map(i=>i.category||'Main'))]; return `<div class="editable-section menu-section"><h2 style="color:${t.color}">${d.heading}</h2>${cats.map(cat=>`<div class="menu-category"><h3 style="color:${t.color}">${cat}</h3>${items.filter(i=>(i.category||'Main')===cat).map(item=>`<div class="menu-item"><div class="menu-item-info"><h4>${item.title}</h4><p>${item.desc||''}</p></div><div style="display:flex;align-items:center;gap:12px"><span class="menu-price" style="color:${t.color};font-weight:700">${item.price||''}</span><a href="https://wa.me/?text=${encodeURIComponent('مرحباً، أود طلب: ' + item.title + (item.price ? ' بسعر ' + item.price : ''))}" target="_blank" class="btn btn-sm" style="background:#25d366;color:#fff;border-radius:8px;padding:6px 12px;font-size:.78rem;font-weight:700;display:inline-flex;align-items:center;gap:4px">طلب عبر واتساب 💬</a></div></div>`).join('')}</div>`).join('')}</div></div>` },
  pubLocation(d,t) { return `<div class="editable-section location-section"><h2 style="color:${t.color}">${d.heading}</h2><div class="location-info"><p>${ICONS.wrap(ICONS.mapPin,16)} Address: ${d.address||''}</p><p>${ICONS.wrap(ICONS.phone,16)} Phone: ${d.phone||''}</p><p>${ICONS.wrap(ICONS.clock,16)} Hours: ${d.hours||''}</p></div></div>` },
  pubFeatures(d,t) { const items=d.items||[]; return `<div class="editable-section" style="padding:60px 40px"><h2 style="text-align:center;color:${t.color}">${d.heading||'Features'}</h2><div class="services-grid">${items.map(item=>`<div class="service-card"><h3>${item.title}</h3><p>${item.desc}</p></div>`).join('')}</div></div>` },
  pubStats(d,t) { const items=d.items||[]; return `<div class="editable-section" style="padding:60px 40px;text-align:center;background:${t.color}11"><h2 style="color:${t.color}">${d.heading||'Statistics'}</h2><div class="counters-grid">${items.map(item=>`<div class="counter-card"><div class="counter-number" style="color:${t.color}">${item.number}</div><div class="counter-label">${item.label}</div></div>`).join('')}</div></div>` },
  pubCta(d,t) { return `<div class="editable-section" style="text-align:center;padding:60px 40px;background:${t.color};color:#fff"><h2>${d.heading||'Call to Action'}</h2>${d.subheading?`<p style="opacity:.9;margin-top:8px">${d.subheading}</p>`:''}${d.buttonText?`<a href="${d.buttonUrl||'#'}" class="btn" style="background:#fff;color:${t.color};margin-top:16px">${d.buttonText}</a>`:''}</div></div>` },

  settings(user) {
    const sbConfig = typeof SB !== 'undefined' ? SB.getConfig() : { url: '', key: '', isReady: false };
    return `
<div style="max-width:700px;margin:0 auto;padding:40px 24px">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
    <h1 style="font-size:1.8rem;margin:0">إعدادات الحساب وقاعدة البيانات</h1>
    <button class="btn btn-ghost btn-sm" onclick="Router.navigate('dashboard')">← العودة للوحة التحكم</button>
  </div>

  <div class="card mb-24">
    <h3 style="margin-bottom:16px;display:flex;align-items:center;gap:8px">
      ${ICONS.wrap(ICONS.sparkles, 18)} البيانات الشخصية
    </h3>
    <div class="input-group"><label>الاسم</label><input class="input" id="settingsName" value="${user?.name||''}"></div>
    <div class="input-group"><label>اللغة</label><select class="input" id="settingsLang"><option value="ar" ${(user?.lang||'ar')==='ar'?'selected':''}>العربية</option><option value="en" ${(user?.lang||'ar')==='en'?'selected':''}>English</option></select></div>
    <div class="input-group"><label>كلمة المرور الجديدة (اختياري)</label><input class="input" id="settingsPassword" type="password" placeholder="اترك الحقل فارغاً للاحتفاظ بكلمة المرور الحالية"></div>
    <button class="btn btn-primary" id="saveSettingsBtn">حفظ التغييرات الشخصية</button>
  </div>

  <!-- Real Cloud Database (Supabase) Card -->
  <div class="card">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;flex-wrap:wrap;gap:10px">
      <div>
        <h3 style="margin:0 0 6px 0;display:flex;align-items:center;gap:8px">
          ${ICONS.wrap(ICONS.settings, 18)} قاعدة البيانات السحابية الحقيقية (Supabase PostgreSQL)
        </h3>
        <p style="margin:0;font-size:0.85rem;color:var(--gray-500)">
          ربط المنصة مباشرة مع قاعدة بيانات PostgreSQL سحابية لتخزين المواقع والمستخدمين بشكل حقيقي ودائم.
        </p>
      </div>
      <div>
        ${sbConfig.isReady
          ? '<span class="badge" style="background:#dcfce7;color:#166534;padding:4px 10px;border-radius:20px;font-size:0.82rem;font-weight:600">🟢 متصل بنجاح مع Supabase</span>'
          : '<span class="badge" style="background:#fee2e2;color:#991b1b;padding:4px 10px;border-radius:20px;font-size:0.82rem;font-weight:600">⚠️ غير متصل (تحقق من الرابط أو تفعيل المشروع)</span>'
        }
      </div>
    </div>

    <div class="input-group">
      <label>رابط مشروع Supabase (Project URL)</label>
      <input class="input" id="sbProjectUrl" value="${sbConfig.url||''}" placeholder="https://xyzcompany.supabase.co" dir="ltr" style="font-family:monospace;font-size:0.88rem">
    </div>

    <div class="input-group">
      <label>المفتاح العام (Supabase Anon Key)</label>
      <input class="input" id="sbAnonKey" type="password" value="${sbConfig.key||''}" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..." dir="ltr" style="font-family:monospace;font-size:0.88rem">
    </div>

    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
      <button class="btn btn-primary" id="saveSbConfigBtn">
        ${ICONS.wrap(ICONS.check, 16)} حفظ واختبار الاتصال
      </button>
      <button class="btn btn-outline" id="copySqlSchemaBtn">
        ${ICONS.wrap(ICONS.code, 16)} نسخ كود إنشاء الجداول (SQL Schema)
      </button>
      <button class="btn btn-ghost" id="syncToSbBtn">
        ${ICONS.wrap(ICONS.refresh, 16)} مزامنة المواقع الحالية إلى Supabase
      </button>
    </div>

    <div style="background:var(--gray-50);border:1px solid var(--gray-200);border-radius:8px;padding:12px 16px;margin-top:16px;font-size:0.82rem;color:var(--gray-600);line-height:1.6">
      💡 <strong>ملاحظة هامة:</strong> إذا كان مشروعك على Supabase في الخطة المجانية ولم يتم استخدامه لمدة 7 أيام، تقوم Supabase بإيقافه مؤقتاً (Paused). يمكنك فتح لوحة تحكم Supabase والضغط على <strong>Restore Project</strong> لإعادة تشغيله فوراً، أو إدخال بيانات مشروع جديد أعلاه.
    </div>
  </div>
</div>` },

  billing(payments, plans, user) { return `
<div style="max-width:800px;margin:0 auto;padding:40px 24px">
  <h1 style="font-size:1.8rem;margin-bottom:24px">الفواتير</h1>
  <div class="card mb-24">
    <h3 style="margin-bottom:8px">الخطة الحالية: <span style="color:var(--primary)">${plans[user?.plan]?.name||user?.plan||'مجاني'}</span></h3>
    <p style="color:var(--gray-500);margin-bottom:16px">إدارة اشتراكك وسجل المدفوعات.</p>
    <a href="#/plans" class="btn btn-primary">تغيير الخطة</a>
  </div>
  <div class="card">
    <h3 style="margin-bottom:16px">سجل المدفوعات</h3>
    ${payments.length===0?'<p style="color:var(--gray-500)">لا توجد مدفوعات بعد.</p>':
    `<table style="width:100%;border-collapse:collapse"><thead><tr style="border-bottom:1px solid var(--gray-200)"><th style="text-align:right;padding:8px;font-size:.85rem">التاريخ</th><th style="text-align:right;padding:8px;font-size:.85rem">الخطة</th><th style="text-align:right;padding:8px;font-size:.85rem">المبلغ</th><th style="text-align:right;padding:8px;font-size:.85rem">الحالة</th></tr></thead><tbody>${payments.map(p=>`<tr style="border-bottom:1px solid var(--gray-100)"><td style="padding:8px">${new Date(p.created_at||p.createdAt).toLocaleDateString('ar-EG')}</td><td style="padding:8px">${plans[p.plan]?.name||p.plan}</td><td style="padding:8px">ج.م ${p.amount}</td><td style="padding:8px"><span style="background:${p.status==='completed'?'#d1fae5;color:#065f46':'#fef3c7;color:#92400e'};padding:2px 10px;border-radius:12px;font-size:.78rem">${p.status==='completed'?'مكتمل':p.status||'مكتمل'}</span></td></tr>`).join('')}</tbody></table>`}
  </div>
</div>` },

  plans(plansData) {
    const isAr = (typeof Auth !== 'undefined' ? Auth.lang : 'ar') === 'ar'
    const plans = plansData || {
      free:{name:'مجاني',name_en:'Free',price:0,features:['دومين فرعي مجاني','موقع إلكتروني واحد','محرر مرئي سريع','استضافة سحابية']},
      basic:{name:'أساسي',name_en:'Basic',price:129,yearly_price:999,features:['دومين خاص بك (.com)','10 صفحات كاملة','إزالة علامة المنصة','شهادة أمان SSL مجانية']},
      pro:{name:'احترافي',name_en:'Pro',price:299,yearly_price:2499,features:['مواقع وصفحات غير محدودة','استقبال الدفع (إنستاباي/فودافون كاش)','متجر إلكتروني وقبول الطلبات','دعم فني أولوية عبر واتساب','مساعد الذكاء الاصطناعي']},
      business:{name:'بيزنس',name_en:'Business',price:599,yearly_price:4999,features:['متجر إلكتروني متقدم غير محدود','تقارير وتحليلات مبيعات مفصلة','نطاقات فرعية غير محدودة','مدير حساب مخصص 24/7']}
    }

    return `
<div class="plans-page" style="max-width:1160px;margin:0 auto;padding:50px 24px 80px" dir="${isAr?'rtl':'ltr'}">
  <div style="text-align:center;max-width:680px;margin:0 auto 40px">
    <span class="badge" style="background:var(--primary-light);color:var(--primary-dark);padding:6px 16px;border-radius:20px;font-size:.85rem;font-weight:700;display:inline-block;margin-bottom:12px">
      ${isAr ? 'خطط أسعار واضحة ومرنة' : 'Simple, Transparent Pricing'}
    </span>
    <h1 style="font-size:2.4rem;font-weight:800;color:var(--gray-900);line-height:1.25;margin-bottom:12px">
      ${isAr ? 'اختر الخطة المثالية لإطلاق وتنمية موقعك' : 'Choose the Perfect Plan for Your Website'}
    </h1>
    <p style="color:var(--gray-500);font-size:1.05rem;line-height:1.6">
      ${isAr ? 'ابدأ مجاناً وجرب كل المزايا. يمكنك الترقية أو إلغاء الاشتراك في أي وقت بدون أي رسوم خفية.' : 'Start free and explore all features. Upgrade or cancel anytime with zero hidden fees.'}
    </p>
  </div>

  <div class="plans-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px;margin-bottom:50px">
    <!-- Free Plan -->
    <div class="card" style="padding:32px 24px;border-radius:18px;display:flex;flex-direction:column;border:1px solid var(--gray-200);background:#fff;transition:transform .2s">
      <div style="font-size:1.1rem;font-weight:700;color:var(--gray-700);margin-bottom:6px">${isAr ? 'مجاني (تجريبي)' : 'Free Trial'}</div>
      <div style="font-size:2.4rem;font-weight:900;color:var(--gray-900);line-height:1;margin-bottom:4px">
        0 <span style="font-size:.9rem;font-weight:600;color:var(--gray-400)">${isAr ? 'ج.م / 14 يوم' : 'EGP / 14 days'}</span>
      </div>
      <p style="font-size:.84rem;color:var(--gray-500);margin-bottom:20px">${isAr ? 'لتجربة المحرر وإنشاء أول موقع ونشره فوراً' : 'Try the visual builder and publish your first site.'}</p>
      <div style="height:1px;background:var(--gray-100);margin-bottom:20px"></div>
      <ul style="list-style:none;padding:0;margin:0 0 24px;display:flex;flex-direction:column;gap:10px;flex:1">
        <li style="font-size:.88rem;color:var(--gray-700);display:flex;align-items:center;gap:8px">${ICONS.wrap(ICONS.check,16)} ${isAr ? 'دومين فرعي مجاني سريع' : 'Free fast subdomain'}</li>
        <li style="font-size:.88rem;color:var(--gray-700);display:flex;align-items:center;gap:8px">${ICONS.wrap(ICONS.check,16)} ${isAr ? 'موقع إلكتروني كامل' : '1 complete website'}</li>
        <li style="font-size:.88rem;color:var(--gray-700);display:flex;align-items:center;gap:8px">${ICONS.wrap(ICONS.check,16)} ${isAr ? 'محرر سحب وإفلات مرئي' : 'Drag-and-drop editor'}</li>
        <li style="font-size:.88rem;color:var(--gray-700);display:flex;align-items:center;gap:8px">${ICONS.wrap(ICONS.check,16)} ${isAr ? 'شهادة SSL واستضافة فائقة' : 'SSL certificate & cloud hosting'}</li>
      </ul>
      <a href="#/login" class="btn btn-outline btn-lg w-full js-auth-guest" style="border-radius:12px;font-weight:700">${isAr ? 'ابدأ مجاناً' : 'Start Free'}</a>
      <button class="btn btn-outline btn-lg w-full js-auth-user hidden plan-btn" data-plan="free" style="border-radius:12px;font-weight:700">${isAr ? 'الخطة الحالية' : 'Current Plan'}</button>
    </div>

    <!-- Basic Plan -->
    <div class="card" style="padding:32px 24px;border-radius:18px;display:flex;flex-direction:column;border:1px solid var(--gray-200);background:#fff">
      <div style="font-size:1.1rem;font-weight:700;color:var(--gray-700);margin-bottom:6px">${isAr ? 'أساسي (Basic)' : 'Basic'}</div>
      <div style="font-size:2.4rem;font-weight:900;color:var(--gray-900);line-height:1;margin-bottom:4px">
        129 <span style="font-size:.9rem;font-weight:600;color:var(--gray-400)">${isAr ? 'ج.م / شهرياً' : 'EGP / mo'}</span>
      </div>
      <p style="font-size:.84rem;color:var(--gray-500);margin-bottom:20px">${isAr ? 'للأعمال المستقلة والمواقع التعريفية الاحترافية' : 'For freelancers and modern portfolio sites.'}</p>
      <div style="height:1px;background:var(--gray-100);margin-bottom:20px"></div>
      <ul style="list-style:none;padding:0;margin:0 0 24px;display:flex;flex-direction:column;gap:10px;flex:1">
        <li style="font-size:.88rem;color:var(--gray-700);display:flex;align-items:center;gap:8px">${ICONS.wrap(ICONS.check,16)} ${isAr ? 'ربط دومين خاص (.com)' : 'Custom domain support (.com)'}</li>
        <li style="font-size:.88rem;color:var(--gray-700);display:flex;align-items:center;gap:8px">${ICONS.wrap(ICONS.check,16)} ${isAr ? 'حتى 10 صفحات للموقع' : 'Up to 10 pages'}</li>
        <li style="font-size:.88rem;color:var(--gray-700);display:flex;align-items:center;gap:8px">${ICONS.wrap(ICONS.check,16)} ${isAr ? 'إزالة علامة الموقع التجارية' : 'Remove SiteFlow branding'}</li>
        <li style="font-size:.88rem;color:var(--gray-700);display:flex;align-items:center;gap:8px">${ICONS.wrap(ICONS.check,16)} ${isAr ? 'نماذج استفسار وتواصل فورية' : 'Lead generation & contact forms'}</li>
      </ul>
      <a href="#/login" class="btn btn-outline btn-lg w-full js-auth-guest" style="border-radius:12px;font-weight:700">${isAr ? 'اشترك الآن' : 'Subscribe'}</a>
      <button class="btn btn-outline btn-lg w-full js-auth-user hidden plan-btn" data-plan="basic" style="border-radius:12px;font-weight:700">${isAr ? 'ترقية للأساسي' : 'Upgrade'}</button>
    </div>

    <!-- Pro Plan (Most Popular) -->
    <div class="card" style="padding:32px 24px;border-radius:18px;display:flex;flex-direction:column;border:2px solid var(--primary);background:#fff;position:relative;box-shadow:0 12px 30px rgba(99,102,241,0.15)">
      <div style="position:absolute;top:-12px;right:24px;background:var(--primary);color:#fff;font-size:.72rem;font-weight:800;padding:4px 12px;border-radius:20px">
        ${isAr ? 'الأكثر اختياراً 🔥' : 'Most Popular 🔥'}
      </div>
      <div style="font-size:1.1rem;font-weight:700;color:var(--primary);margin-bottom:6px">${isAr ? 'احترافي (Pro)' : 'Pro'}</div>
      <div style="font-size:2.4rem;font-weight:900;color:var(--gray-900);line-height:1;margin-bottom:4px">
        299 <span style="font-size:.9rem;font-weight:600;color:var(--gray-400)">${isAr ? 'ج.م / شهرياً' : 'EGP / mo'}</span>
      </div>
      <p style="font-size:.84rem;color:var(--gray-500);margin-bottom:20px">${isAr ? 'للتجار والشركات الناشئة والمتاجر النشطة' : 'For businesses, active e-commerce and startups.'}</p>
      <div style="height:1px;background:var(--gray-100);margin-bottom:20px"></div>
      <ul style="list-style:none;padding:0;margin:0 0 24px;display:flex;flex-direction:column;gap:10px;flex:1">
        <li style="font-size:.88rem;color:var(--gray-900);font-weight:600;display:flex;align-items:center;gap:8px">${ICONS.wrap(ICONS.check,16)} ${isAr ? 'مواقع وصفحات غير محدودة' : 'Unlimited sites & pages'}</li>
        <li style="font-size:.88rem;color:var(--gray-900);font-weight:600;display:flex;align-items:center;gap:8px">${ICONS.wrap(ICONS.check,16)} ${isAr ? 'متجر إلكتروني واستقبال طلبات' : 'Online store & order management'}</li>
        <li style="font-size:.88rem;color:var(--gray-900);font-weight:600;display:flex;align-items:center;gap:8px">${ICONS.wrap(ICONS.check,16)} ${isAr ? 'دفع فوري / إنستاباي / فودافون كاش' : 'InstaPay, Vodafone Cash & Fawry'}</li>
        <li style="font-size:.88rem;color:var(--gray-700);display:flex;align-items:center;gap:8px">${ICONS.wrap(ICONS.check,16)} ${isAr ? 'مساعد الذكاء الاصطناعي وتحسين SEO' : 'AI Content Assistant & Full SEO'}</li>
        <li style="font-size:.88rem;color:var(--gray-700);display:flex;align-items:center;gap:8px">${ICONS.wrap(ICONS.check,16)} ${isAr ? 'دعم فني فوري وأولوية على واتساب' : 'Priority WhatsApp support'}</li>
      </ul>
      <a href="#/login" class="btn btn-primary btn-lg w-full js-auth-guest" style="border-radius:12px;font-weight:700">${isAr ? 'اشترك في الاحترافي' : 'Choose Pro'}</a>
      <button class="btn btn-primary btn-lg w-full js-auth-user hidden plan-btn" data-plan="pro" style="border-radius:12px;font-weight:700">${isAr ? 'ترقية إلى Pro' : 'Upgrade to Pro'}</button>
    </div>

    <!-- Business Plan -->
    <div class="card" style="padding:32px 24px;border-radius:18px;display:flex;flex-direction:column;border:1px solid var(--gray-200);background:#fff">
      <div style="font-size:1.1rem;font-weight:700;color:var(--gray-700);margin-bottom:6px">${isAr ? 'بيزنس (Business)' : 'Business'}</div>
      <div style="font-size:2.4rem;font-weight:900;color:var(--gray-900);line-height:1;margin-bottom:4px">
        599 <span style="font-size:.9rem;font-weight:600;color:var(--gray-400)">${isAr ? 'ج.م / شهرياً' : 'EGP / mo'}</span>
      </div>
      <p style="font-size:.84rem;color:var(--gray-500);margin-bottom:20px">${isAr ? 'للمؤسسات والشركات الكبيرة مع متجر متكامل' : 'For large enterprises, chains and stores.'}</p>
      <div style="height:1px;background:var(--gray-100);margin-bottom:20px"></div>
      <ul style="list-style:none;padding:0;margin:0 0 24px;display:flex;flex-direction:column;gap:10px;flex:1">
        <li style="font-size:.88rem;color:var(--gray-700);display:flex;align-items:center;gap:8px">${ICONS.wrap(ICONS.check,16)} ${isAr ? 'متجر متكامل وإدارة المخزون' : 'Advanced store & inventory'}</li>
        <li style="font-size:.88rem;color:var(--gray-700);display:flex;align-items:center;gap:8px">${ICONS.wrap(ICONS.check,16)} ${isAr ? 'تقارير مبيعات وتحليلات زوار حية' : 'Live sales & analytics reports'}</li>
        <li style="font-size:.88rem;color:var(--gray-700);display:flex;align-items:center;gap:8px">${ICONS.wrap(ICONS.check,16)} ${isAr ? 'مدير حساب ودعم فني مخصص 24/7' : 'Dedicated 24/7 account manager'}</li>
        <li style="font-size:.88rem;color:var(--gray-700);display:flex;align-items:center;gap:8px">${ICONS.wrap(ICONS.check,16)} ${isAr ? 'تخصيص الكود وإمكانية حقن السكربتات' : 'Custom scripts & code injection'}</li>
      </ul>
      <a href="#/login" class="btn btn-outline btn-lg w-full js-auth-guest" style="border-radius:12px;font-weight:700">${isAr ? 'اشترك في بيزنس' : 'Choose Business'}</a>
      <button class="btn btn-outline btn-lg w-full js-auth-user hidden plan-btn" data-plan="business" style="border-radius:12px;font-weight:700">${isAr ? 'ترقية إلى بيزنس' : 'Upgrade to Business'}</button>
    </div>
  </div>

  <!-- Local Payment Badges -->
  <div class="card" style="padding:28px;text-align:center;border-radius:16px;background:#f8fafc;border:1px solid var(--gray-200);margin-bottom:40px">
    <h3 style="font-size:1.15rem;font-weight:700;color:var(--gray-800);margin-bottom:8px">
      ${isAr ? '💳 طرق الدفع المحلية المدعومة 100%' : '💳 100% Local & Secure Payment Methods'}
    </h3>
    <p style="color:var(--gray-500);font-size:.9rem;margin-bottom:16px">
      ${isAr ? 'ادفع بسهولة وأمان عبر طرق الدفع المألوفة في مصر والشرق الأوسط بدون الحاجة لبطاقات دولية' : 'Pay easily with local payment methods across the Middle East without foreign currency hassles.'}
    </p>
    <div style="display:flex;justify-content:center;gap:20px;flex-wrap:wrap;font-weight:700;color:var(--gray-700);font-size:.95rem">
      <span style="background:#fff;padding:8px 18px;border-radius:10px;border:1px solid var(--gray-200);box-shadow:var(--shadow-sm)">⚡ إنستاباي (InstaPay)</span>
      <span style="background:#fff;padding:8px 18px;border-radius:10px;border:1px solid var(--gray-200);box-shadow:var(--shadow-sm)">📱 فودافون كاش / محافظ المحمول</span>
      <span style="background:#fff;padding:8px 18px;border-radius:10px;border:1px solid var(--gray-200);box-shadow:var(--shadow-sm)">🏦 فوري (Fawry Pay)</span>
      <span style="background:#fff;padding:8px 18px;border-radius:10px;border:1px solid var(--gray-200);box-shadow:var(--shadow-sm)">💳 فيزا / ماستركارد / ميزة</span>
    </div>
  </div>

  <!-- FAQ Accordion in Plans -->
  <div style="max-width:800px;margin:0 auto">
    <h3 style="font-size:1.4rem;font-weight:800;color:var(--gray-900);text-align:center;margin-bottom:24px">
      ${isAr ? 'الأسئلة الشائعة حول الأسعار' : 'Pricing Frequently Asked Questions'}
    </h3>
    <div class="lp-faq-list">
      <div class="lp-faq-item" onclick="this.classList.toggle('active')">
        <h3>${isAr ? 'هل التجربة المجانية تتطلب بطاقة دفع بنكية؟' : 'Does the free trial require a credit card?'}</h3>
        <p>${isAr ? 'لا على الإطلاق! يمكنك التسجيل وبناء موقعك وتجربة كافة الميزات ونشره فوراً بدون إدخال أي بيانات بنكية.' : 'No credit card is required. You can build and publish your site completely free.'}</p>
      </div>
      <div class="lp-faq-item" onclick="this.classList.toggle('active')">
        <h3>${isAr ? 'هل يمكنني تغيير خطتي أو إلغاؤها في أي وقت؟' : 'Can I change or cancel my plan anytime?'}</h3>
        <p>${isAr ? 'نعم، يمكنك الترقية إلى باقة أعلى أو التراجع عن الاشتراك في أي وقت من لوحة التحكم بنقرة واحدة.' : 'Yes, you can upgrade, downgrade, or cancel anytime directly from your dashboard.'}</p>
      </div>
      <div class="lp-faq-item" onclick="this.classList.toggle('active')">
        <h3>${isAr ? 'هل أحتاج لشراء استضافة سحابية خارجية؟' : 'Do I need to buy separate hosting?'}</h3>
        <p>${isAr ? 'لا. جميع الخطط تأتي مع استضافة سحابية فائقة السرعة على شبكة CDN العالمية وشهادات أمان SSL مجانية مشمولة.' : 'No. All plans include ultra-fast cloud hosting on global CDN with free SSL certificates.'}</p>
      </div>
    </div>
  </div>
</div>`
  },

  about() {
    const isAr = (typeof Auth !== 'undefined' ? Auth.lang : 'ar') === 'ar'
    return `
<div class="about-page" style="max-width:1000px;margin:0 auto;padding:60px 24px 80px" dir="${isAr?'rtl':'ltr'}">
  <div style="text-align:center;max-width:720px;margin:0 auto 50px">
    <div style="width:64px;height:64px;border-radius:20px;background:var(--primary-light);color:var(--primary);display:flex;align-items:center;justify-content:center;margin:0 auto 16px">
      ${ICONS.wrap(ICONS.sparkles, 32)}
    </div>
    <h1 style="font-size:2.5rem;font-weight:900;color:var(--gray-900);line-height:1.2;margin-bottom:14px">
      ${isAr ? 'نبني مستقبل الويب العربي بدون كود' : 'Empowering the Next Generation of Creators'}
    </h1>
    <p style="font-size:1.15rem;color:var(--gray-600);line-height:1.7">
      ${isAr
        ? 'منصة SiteFlow ولدت لتمنح كل صاحب عمل، متجر، أو صانع محتوى القدرة على إطلاق موقع احترافي متكامل فائق السرعة خلال دقائق وبدون كتابة كود.'
        : 'SiteFlow empowers entrepreneurs, businesses, and creators to build high-converting, professional websites in minutes without code.'}
    </p>
  </div>

  <!-- Stats Grid -->
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin-bottom:50px">
    <div class="card" style="padding:28px;text-align:center;border-radius:16px">
      <div style="font-size:2.6rem;font-weight:900;color:var(--primary);line-height:1">+12,000</div>
      <div style="font-size:.88rem;color:var(--gray-500);margin-top:6px">${isAr ? 'موقع تم إنشاؤه' : 'Websites Created'}</div>
    </div>
    <div class="card" style="padding:28px;text-align:center;border-radius:16px">
      <div style="font-size:2.6rem;font-weight:900;color:var(--primary);line-height:1">&lt; 0.3s</div>
      <div style="font-size:.88rem;color:var(--gray-500);margin-top:6px">${isAr ? 'زمن تحميل واستجابة فائق' : 'Page Load Speed'}</div>
    </div>
    <div class="card" style="padding:28px;text-align:center;border-radius:16px">
      <div style="font-size:2.6rem;font-weight:900;color:var(--primary);line-height:1">99.9%</div>
      <div style="font-size:.88rem;color:var(--gray-500);margin-top:6px">${isAr ? 'جاهزية واستقرار سحابي' : 'Uptime Guarantee'}</div>
    </div>
    <div class="card" style="padding:28px;text-align:center;border-radius:16px">
      <div style="font-size:2.6rem;font-weight:900;color:var(--primary);line-height:1">40+</div>
      <div style="font-size:.88rem;color:var(--gray-500);margin-top:6px">${isAr ? 'قالب عربي وإنجليزي جاهز' : 'Ready Templates'}</div>
    </div>
  </div>

  <!-- Mission & Story -->
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-bottom:50px">
    <div class="card" style="padding:32px;border-radius:16px">
      <div style="width:44px;height:44px;border-radius:12px;background:#e0e7ff;color:var(--primary);display:flex;align-items:center;justify-content:center;margin-bottom:16px">
        ${ICONS.wrap(ICONS.target, 22)}
      </div>
      <h3 style="font-size:1.3rem;font-weight:800;color:var(--gray-900);margin-bottom:10px">${isAr ? 'مهمتنا' : 'Our Mission'}</h3>
      <p style="font-size:.92rem;color:var(--gray-600);line-height:1.7">
        ${isAr
          ? 'إزالة الحواجز التقنية والمالية المعقدة أمام الأفراد والشركات في الشرق الأوسط، وتوفير أداة سريعة، بديهية، ومصممة خصيصاً لمتطلبات السوق المحلي من اللغة إلى بوابات الدفع.'
          : 'Eliminating technical and financial barriers for businesses in the region by delivering a fast, intuitive visual platform tailored to local market needs and payment gateways.'}
      </p>
    </div>

    <div class="card" style="padding:32px;border-radius:16px">
      <div style="width:44px;height:44px;border-radius:12px;background:#fce7f3;color:#ec4899;display:flex;align-items:center;justify-content:center;margin-bottom:16px">
        ${ICONS.wrap(ICONS.eye, 22)}
      </div>
      <h3 style="font-size:1.3rem;font-weight:800;color:var(--gray-900);margin-bottom:10px">${isAr ? 'رؤيتنا' : 'Our Vision'}</h3>
      <p style="font-size:.92rem;color:var(--gray-600);line-height:1.7">
        ${isAr
          ? 'أن نكون المنصة الأولى والخيار الأسهل لكل من يرغب في تحويل فكرته أو مشروعه إلى موقع أو متجر إلكتروني ناجح عالمياً خلال دقائق معدودة.'
          : 'To be the premier, simplest platform for anyone aiming to turn an idea or business into a thriving global online presence in minutes.'}
      </p>
    </div>

    <div class="card" style="padding:32px;border-radius:16px">
      <div style="width:44px;height:44px;border-radius:12px;background:#d1fae5;color:#059669;display:flex;align-items:center;justify-content:center;margin-bottom:16px">
        ${ICONS.wrap(ICONS.shield, 22)}
      </div>
      <h3 style="font-size:1.3rem;font-weight:800;color:var(--gray-900);margin-bottom:10px">${isAr ? 'قيمنا وأولوياتنا' : 'Our Core Values'}</h3>
      <p style="font-size:.92rem;color:var(--gray-600);line-height:1.7">
        ${isAr
          ? 'البساطة القصوى بدون تعقيد، سرعة الأداء الفائقة، أمان البيانات الصارم عبر قواعد بيانات Supabase السحابية، وتقديم دعم فني إنساني حقيقي.'
          : 'Utmost simplicity without clutter, lightning-fast performance, stringent PostgreSQL cloud security, and dedicated human support.'}
      </p>
    </div>
  </div>

  <!-- Tech Stack & Infrastructure -->
  <div class="card" style="padding:36px;border-radius:18px;background:#f8fafc;border:1px solid var(--gray-200);text-align:center">
    <h3 style="font-size:1.3rem;font-weight:800;color:var(--gray-900);margin-bottom:8px">
      ${isAr ? 'بنية تحتية سحابية موثوقة' : 'Built on World-Class Cloud Infrastructure'}
    </h3>
    <p style="color:var(--gray-500);font-size:.9rem;max-width:600px;margin:0 auto 24px;line-height:1.6">
      ${isAr
        ? 'نستخدم أحدث تقنيات الويب السحابية بما في ذلك Supabase PostgreSQL لتخزين البيانات، شبكة Cloudflare CDN العالمية لتوزيع المحتوى، وتشفير تام لكافة الاتصالات.'
        : 'Powered by Supabase PostgreSQL for cloud persistence, global edge CDN distribution, and end-to-end SSL encryption.'}
    </p>
    <a href="#/login" class="btn btn-primary btn-lg" style="border-radius:12px;font-weight:700">
      ${isAr ? 'ابدأ رحلتك الرقمية الآن مجاناً 🚀' : 'Start Your Digital Journey Free 🚀'}
    </a>
  </div>
</div>`
  },

  help() {
    const isAr = (typeof Auth !== 'undefined' ? Auth.lang : 'ar') === 'ar'
    return `
<div class="help-page" style="max-width:960px;margin:0 auto;padding:50px 24px 80px" dir="${isAr?'rtl':'ltr'}">
  <div style="text-align:center;max-width:640px;margin:0 auto 40px">
    <div style="width:60px;height:60px;border-radius:18px;background:var(--primary-light);color:var(--primary);display:flex;align-items:center;justify-content:center;margin:0 auto 16px">
      ${ICONS.wrap(ICONS.helpCircle, 30)}
    </div>
    <h1 style="font-size:2.3rem;font-weight:900;color:var(--gray-900);margin-bottom:10px">
      ${isAr ? 'مركز المساعدة والدعم الفني' : 'Help & Documentation Center'}
    </h1>
    <p style="font-size:1.05rem;color:var(--gray-500);line-height:1.6">
      ${isAr ? 'كل ما تحتاج لمعرفته لإطلاق موقعك، تخصيص القوالب، وربط بوابات الدفع والدومين.' : 'Everything you need to build, customize, publish, and grow your website.'}
    </p>
  </div>

  <!-- 4 Action Cards -->
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:40px">
    <div class="card" style="padding:22px;border-radius:14px;cursor:pointer;border:1px solid var(--gray-200);transition:all .2s" onclick="document.getElementById('helpFaq').scrollIntoView({behavior:'smooth'})">
      <div style="color:var(--primary);margin-bottom:8px">${ICONS.wrap(ICONS.sparkles, 24)}</div>
      <h4 style="font-size:1rem;font-weight:700;margin-bottom:4px">${isAr ? 'البداية السريعة' : 'Quick Start'}</h4>
      <p style="font-size:.82rem;color:var(--gray-500)">${isAr ? 'كيف تنشئ أول موقع في 5 دقائق' : 'Build a site in under 5 minutes'}</p>
    </div>
    <div class="card" style="padding:22px;border-radius:14px;cursor:pointer;border:1px solid var(--gray-200);transition:all .2s" onclick="document.getElementById('helpFaq').scrollIntoView({behavior:'smooth'})">
      <div style="color:#059669;margin-bottom:8px">${ICONS.wrap(ICONS.globe, 24)}</div>
      <h4 style="font-size:1rem;font-weight:700;margin-bottom:4px">${isAr ? 'الدومين والاستضافة' : 'Domains & Hosting'}</h4>
      <p style="font-size:.82rem;color:var(--gray-500)">${isAr ? 'ربط دومينك الخاص والشهادة' : 'Custom domain setup & SSL'}</p>
    </div>
    <div class="card" style="padding:22px;border-radius:14px;cursor:pointer;border:1px solid var(--gray-200);transition:all .2s" onclick="document.getElementById('helpFaq').scrollIntoView({behavior:'smooth'})">
      <div style="color:#d97706;margin-bottom:8px">${ICONS.wrap(ICONS.dollar, 24)}</div>
      <h4 style="font-size:1rem;font-weight:700;margin-bottom:4px">${isAr ? 'المتاجر والدفع' : 'Stores & Payments'}</h4>
      <p style="font-size:.82rem;color:var(--gray-500)">${isAr ? 'إنستاباي وفودافون كاش وفوري' : 'Payment gateway integration'}</p>
    </div>
    <div class="card" style="padding:22px;border-radius:14px;cursor:pointer;border:1px solid var(--gray-200);transition:all .2s" onclick="window.location.href='mailto:support@siteflow.vexonet.online'">
      <div style="color:#ec4899;margin-bottom:8px">${ICONS.wrap(ICONS.mail, 24)}</div>
      <h4 style="font-size:1rem;font-weight:700;margin-bottom:4px">${isAr ? 'تواصل مع الدعم' : 'Contact Support'}</h4>
      <p style="font-size:.82rem;color:var(--gray-500)">${isAr ? 'فريق الدعم الفني جاهز 24/7' : 'Support team ready 24/7'}</p>
    </div>
  </div>

  <!-- FAQ Accordion List -->
  <div id="helpFaq" class="card" style="padding:32px;border-radius:18px;margin-bottom:40px">
    <h3 style="font-size:1.3rem;font-weight:800;color:var(--gray-900);margin-bottom:20px">
      ${isAr ? 'الأسئلة الشائعة والأدلة التفصيلية' : 'Frequently Asked Questions & Guides'}
    </h3>
    <div class="lp-faq-list">
      <div class="lp-faq-item active" onclick="this.classList.toggle('active')">
        <h3>${isAr ? 'كيف أقوم بإنشاء موقعي ونشره على الإنترنت؟' : 'How do I create and publish a website?'}</h3>
        <p>${isAr ? '1. ادخل إلى لوحة التحكم واضغط "موقع جديد".<br>2. اختر قالباً يناسب نشاطك أو ابدأ من الصفر.<br>3. استخدم المحرر المرئي لتعديل النصوص والصور والألوان بنقرة واحدة.<br>4. اضغط على زر "نشر الموقع" في أعلى المحرر وسيكون موقعك متاحاً فوراً على الإنترنت.' : '1. Open Dashboard and click "New Site".<br>2. Select a template or start blank.<br>3. Edit text, images, and colors visually.<br>4. Click "Publish" at the top right to go live instantly.'}</p>
      </div>
      <div class="lp-faq-item" onclick="this.classList.toggle('active')">
        <h3>${isAr ? 'كيف أربط دوميني الخاص بي (مثال: mycompany.com)؟' : 'How do I connect a custom domain (.com)?'}</h3>
        <p>${isAr ? 'في باقات Pro و Business، افتح إعدادات الموقع داخل المحرر المرئي، أدخل اسم الدومين الخاص بك، ثم أضف سجل CNAME أو A Record الموضح في لوحة التحكم إلى مزود الدومين الخاص بك (مثل Namecheap أو GoDaddy أو Cloudflare).' : 'In Pro & Business plans, go to Site Settings in the editor, enter your custom domain, and point your DNS CNAME/A records as guided.'}</p>
      </div>
      <div class="lp-faq-item" onclick="this.classList.toggle('active')">
        <h3>${isAr ? 'كيف أستقبل مدفوعات العملاء عبر إنستاباي وفودافون كاش؟' : 'How do I accept payments via InstaPay & Vodafone Cash?'}</h3>
        <p>${isAr ? 'يمكنك تفعيل قسم المتجر من المحرر وإضافة رقم محفظتك أو حساب إنستاباي، ليتمكن العميل من إرسال إيصال التحويل مباشرة وتأكيد الطلب بنقرة واحدة في لوحة تحكمك.' : 'Enable store payments in the editor, add your InstaPay handle or mobile wallet number, and manage receipts in your dashboard.'}</p>
      </div>
      <div class="lp-faq-item" onclick="this.classList.toggle('active')">
        <h3>${isAr ? 'أين تُحفظ بياناتي ومواقعي وهل هي آمنة سحابياً؟' : 'Where is my data stored and is it secure?'}</h3>
        <p>${isAr ? 'يتم حفظ كافة المواقع والبيانات في قاعدة بيانات Supabase PostgreSQL السحابية المؤمنة بتشفير كامل، مع نسخ احتياطي دائم لضمان عدم ضياع أي معلومة.' : 'All sites and data are securely stored in Supabase PostgreSQL cloud with automated backups and encryption.'}</p>
      </div>
    </div>
  </div>

  <!-- Direct Contact Card -->
  <div class="card" style="padding:32px;text-align:center;border-radius:18px;background:var(--gray-900);color:#fff">
    <h3 style="font-size:1.4rem;font-weight:800;margin-bottom:8px">${isAr ? 'لم تجد إجابة لسؤالك؟' : 'Still need assistance?'}</h3>
    <p style="color:var(--gray-400);font-size:.92rem;margin-bottom:20px">${isAr ? 'فريق الدعم الفني جاهز لمساعدتك في أي استفسار أو مشكلة تقنية.' : 'Our support engineering team is here to assist you 24/7.'}</p>
    <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap">
      <a href="mailto:support@siteflow.vexonet.online" class="btn btn-primary" style="border-radius:10px;font-weight:700">
        ${isAr ? 'مراسلة الدعم عبر البريد الإلكتروني' : 'Email Support Team'}
      </a>
      <a href="#/dashboard" class="btn btn-outline" style="border-radius:10px;border-color:var(--gray-700);color:#fff">
        ${isAr ? 'العودة للوحة التحكم' : 'Back to Dashboard'}
      </a>
    </div>
  </div>
</div>`
  },

  privacy() {
    const isAr = (typeof Auth !== 'undefined' ? Auth.lang : 'ar') === 'ar'
    return `
<div class="privacy-page" style="max-width:820px;margin:0 auto;padding:60px 24px 80px" dir="${isAr?'rtl':'ltr'}">
  <div style="margin-bottom:32px">
    <span class="badge" style="background:var(--gray-200);color:var(--gray-700);padding:4px 12px;border-radius:20px;font-size:.78rem;font-weight:700">
      ${isAr ? 'آخر تحديث: سبتمبر 2026' : 'Last updated: September 2026'}
    </span>
    <h1 style="font-size:2.2rem;font-weight:900;color:var(--gray-900);margin:12px 0 8px">
      ${isAr ? 'سياسة الخصوصية وشروط الاستخدام' : 'Privacy Policy & Terms of Service'}
    </h1>
    <p style="color:var(--gray-500);font-size:.95rem">
      ${isAr ? 'نلتزم في منصة SiteFlow بأعلى معايير حماية وخصوصية بيانات المستخدمين والزوار.' : 'At SiteFlow, we prioritize the protection and privacy of user and visitor data.'}
    </p>
  </div>

  <div class="card" style="padding:36px;border-radius:18px;line-height:1.8;color:var(--gray-700);display:flex;flex-direction:column;gap:24px">
    <div>
      <h3 style="font-size:1.15rem;font-weight:800;color:var(--gray-900);margin-bottom:8px">
        ${isAr ? '1. البيانات التي نجمعها' : '1. Information We Collect'}
      </h3>
      <p style="font-size:.92rem;margin:0">
        ${isAr
          ? 'نقوم بجمع المعلومات الأساسية اللازمة لتقديم الخدمة: اسم المستخدم، البريد الإلكتروني، والمحتوى الذي تقوم برفعه لإنشاء صفحات موقعك (النصوص، الصور، وبيانات التواصل).'
          : 'We collect essential information required to deliver our platform: name, email address, and site assets uploaded for your pages.'}
      </p>
    </div>

    <div>
      <h3 style="font-size:1.15rem;font-weight:800;color:var(--gray-900);margin-bottom:8px">
        ${isAr ? '2. كيف نستخدم معلوماتك' : '2. How We Use Information'}
      </h3>
      <p style="font-size:.92rem;margin:0">
        ${isAr
          ? 'نستخدم بياناتك لتشغيل وتطوير المنصة، وتأكيد هويتك عبر رسائل التحقق (OTP)، واستضافة صفحات موقعك سحابياً. نحن لا نبيع ولا نشارك أي بيانات شخصية مع أي جهات خارجية لأغراض إعلانية.'
          : 'We use your data to maintain the platform, authenticate via OTP, and host your pages. We never sell personal data to third parties.'}
      </p>
    </div>

    <div>
      <h3 style="font-size:1.15rem;font-weight:800;color:var(--gray-900);margin-bottom:8px">
        ${isAr ? '3. الأمان وتخزين البيانات' : '3. Data Security & Storage'}
      </h3>
      <p style="font-size:.92rem;margin:0">
        ${isAr
          ? 'تُحفظ كافة البيانات في قاعدة بيانات PostgreSQL سحابية مؤمنة عبر Supabase، مع تشفير تام لكافة الاتصالات باستخدام بروتوكول SSL/HTTPS القياسي عالمياً.'
          : 'Data is persisted in secure Supabase PostgreSQL cloud database clusters, protected with TLS/SSL encryption.'}
      </p>
    </div>

    <div>
      <h3 style="font-size:1.15rem;font-weight:800;color:var(--gray-900);margin-bottom:8px">
        ${isAr ? '4. ملكية المحتوى' : '4. Content Ownership'}
      </h3>
      <p style="font-size:.92rem;margin:0">
        ${isAr
          ? 'أنت المالك الوحيد والكامل لكافة المحتويات، الصور، والنصوص التي ترفعها أو تنشرها عبر موقعك على المنصة، وتتحمل المسؤولية القانونية الكاملة عن صحتها ومشروعيتها.'
          : 'You retain full ownership and copyright of all content, media, and text published through your SiteFlow sites.'}
      </p>
    </div>

    <div>
      <h3 style="font-size:1.15rem;font-weight:800;color:var(--gray-900);margin-bottom:8px">
        ${isAr ? '5. التواصل والاستفسارات' : '5. Inquiries'}
      </h3>
      <p style="font-size:.92rem;margin:0">
        ${isAr
          ? 'لأي استفسار يخص خصوصية بياناتك أو طلب حذف حسابك، تواصل معنا عبر: <a href="mailto:privacy@siteflow.vexonet.online" style="color:var(--primary);font-weight:600">privacy@siteflow.vexonet.online</a>'
          : 'For any privacy concerns or data removal requests, contact us at: <a href="mailto:privacy@siteflow.vexonet.online" style="color:var(--primary);font-weight:600">privacy@siteflow.vexonet.online</a>'}
      </p>
    </div>
  </div>
</div>`
  },

  showcase() {
    const isAr = (typeof Auth !== 'undefined' ? Auth.lang : 'ar') === 'ar'
    const samples = [
      {title: isAr ? 'بوتيك أزياء وموضة' : 'Modern Fashion Boutique', cat: isAr ? 'متجر إلكتروني' : 'E-Commerce', desc: isAr ? 'متجر متكامل لعرض المنتجات واستقبال الطلبات عبر إنستاباي' : 'Fashion apparel store with online catalog and local checkout', icon: '🛍️'},
      {title: isAr ? 'مقهى ومخبوزات أرتيزان' : 'Artisan Bakery & Cafe', cat: isAr ? 'مطاعم وكافيهات' : 'Food & Cafe', desc: isAr ? 'قائمة طعام تفاعلية مع حجز طاولات وتوصيل سريع' : 'Interactive digital menu, booking, and table orders', icon: '☕'},
      {title: isAr ? 'شركة تقنية ناشئة' : 'SaaS Startup Platform', cat: isAr ? 'شركات وأعمال' : 'Business', desc: isAr ? 'صفحة هبوط تسويقية فائقة السرعة مع نموذج طلب العروض' : 'High-converting SaaS landing page with lead collection', icon: '⚡'},
      {title: isAr ? 'معرض أعمال مصمم' : 'Creative Design Portfolio', cat: isAr ? 'بورتفوليو' : 'Portfolio', desc: isAr ? 'معرض أعمال تفاعلي جذاب لعرض المشاريع والتواصل' : 'Stunning creative showcase for designers and freelancers', icon: '🎨'},
      {title: isAr ? 'عيادة واستشارات طبية' : 'Healthcare & Clinic', cat: isAr ? 'صحة وطب' : 'Healthcare', desc: isAr ? 'صفحة خدمات طبية مع نموذج حجز مواعيد مباشر' : 'Medical clinic website with online appointment booking', icon: '🩺'},
      {title: isAr ? 'تسويق عقاري فاخر' : 'Prime Real Estate', cat: isAr ? 'عقارات' : 'Real Estate', desc: isAr ? 'كتالوج وحدات عقارية مع جولات افتراضية واتصال سريع' : 'Luxury property catalog with direct agent contact', icon: '🏢'}
    ]

    return `
<div class="showcase-page" style="max-width:1100px;margin:0 auto;padding:50px 24px 80px" dir="${isAr?'rtl':'ltr'}">
  <div style="text-align:center;max-width:680px;margin:0 auto 40px">
    <span class="badge" style="background:var(--primary-light);color:var(--primary-dark);padding:6px 16px;border-radius:20px;font-size:.85rem;font-weight:700;display:inline-block;margin-bottom:12px">
      ${isAr ? 'معرض إبداعات SiteFlow' : 'SiteFlow Showcase Gallery'}
    </span>
    <h1 style="font-size:2.4rem;font-weight:900;color:var(--gray-900);line-height:1.25;margin-bottom:12px">
      ${isAr ? 'مواقع حقيقية تم بناؤها بالكامل بدون كود' : 'Inspiring Websites Built Entirely Without Code'}
    </h1>
    <p style="color:var(--gray-500);font-size:1.05rem;line-height:1.6">
      ${isAr ? 'استلهم أفكاراً لموقعك القادم من بين مئات المواقع والمتاجر التي أطلقها عملاؤنا بنجاح.' : 'Get inspired by hundreds of live websites and online stores launched on SiteFlow.'}
    </p>
  </div>

  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;margin-bottom:50px">
    ${samples.map(s => `
      <div class="card" style="border-radius:18px;overflow:hidden;border:1px solid var(--gray-200);transition:transform .2s,box-shadow .2s;display:flex;flex-direction:column">
        <div style="height:180px;background:linear-gradient(135deg,#f8fafc,#e2e8f0);display:flex;align-items:center;justify-content:center;position:relative">
          <div style="font-size:3.5rem">${s.icon}</div>
          <span style="position:absolute;top:12px;right:12px;background:rgba(15,23,42,0.8);color:#fff;backdrop-filter:blur(8px);padding:3px 10px;border-radius:20px;font-size:.72rem;font-weight:700">${s.cat}</span>
        </div>
        <div style="padding:22px;flex:1;display:flex;flex-direction:column">
          <h3 style="font-size:1.15rem;font-weight:800;color:var(--gray-900);margin-bottom:6px">${s.title}</h3>
          <p style="font-size:.86rem;color:var(--gray-500);line-height:1.5;margin-bottom:20px;flex:1">${s.desc}</p>
          <div style="display:flex;gap:8px">
            <a href="#/templates" class="btn btn-primary btn-sm w-full" style="border-radius:10px;font-weight:700">
              ${isAr ? 'استخدم هذا التصميم' : 'Use Template'}
            </a>
          </div>
        </div>
      </div>
    `).join('')}
  </div>

  <div class="card" style="padding:36px;border-radius:18px;text-align:center;background:#f8fafc;border:1px solid var(--gray-200)">
    <h3 style="font-size:1.35rem;font-weight:800;color:var(--gray-900);margin-bottom:8px">
      ${isAr ? 'هل أنشأت موقعاً مميزاً عبر SiteFlow؟' : 'Built an awesome site on SiteFlow?'}
    </h3>
    <p style="color:var(--gray-500);font-size:.9rem;max-width:560px;margin:0 auto 20px">
      ${isAr ? 'يسعدنا نشر موقعك في معرض الإلهام ليحصل على زيارات واهتمام أكبر من مجتمع المبدعين.' : 'Submit your site to get featured in our showcase and reach new audiences.'}
    </p>
    <a href="mailto:showcase@siteflow.vexonet.online" class="btn btn-outline" style="border-radius:12px;font-weight:700">
      ${isAr ? 'أرسل موقعك للنشر في المعرض' : 'Submit Your Website'}
    </a>
  </div>
</div>`
  },

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
