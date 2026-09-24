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
          <button type="button" class="btn btn-outline btn-lg w-full" id="bypassOtpBtn" style="font-weight:700;margin-top:10px;background:#f8fafc;border-color:#cbd5e1;color:#1e293b">
            الدخول المباشر إلى لوحة التحكم فوراً 🚀
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

  dashboard() {
    const isAr = (typeof Auth !== 'undefined' ? Auth.lang : 'ar') === 'ar'
    return `
<div class="dashboard-clean" dir="${isAr?'rtl':'ltr'}">
  <!-- Minimalist Clean Dashboard Header -->
  <div class="dash-header-clean">
    <div class="dash-header-info">
      <div class="dash-title-row">
        <h1>${isAr ? 'أهلاً بك،' : 'Welcome,'} <span class="js-user-name"></span></h1>
        <span class="dash-status-badge">🟢 ${isAr ? 'Supabase متصل' : 'Cloud Connected'}</span>
      </div>
      <p class="dash-subtitle">${isAr ? 'إدارة ومتابعة أداء وتفاعل مواقعك ومتاجرك الإلكترونية' : 'Manage and monitor your websites, stores, and analytics'}</p>
    </div>
    <div class="dash-header-actions">
      ${Auth.isAdmin() ? `<a href="#/admin" class="btn btn-ghost btn-sm" style="background:#fef3c7;color:#92400e;border:1px solid #fcd34d">${isAr ? 'لوحة المشرف' : 'Admin Panel'}</a>` : ''}
      <a href="#/settings" class="btn btn-outline btn-sm dash-btn-outline" title="${isAr ? 'إعدادات قاعدة البيانات' : 'Database Settings'}">
        ${ICONS.wrap(ICONS.settings, 14)} <span>${isAr ? 'قاعدة البيانات' : 'Cloud DB'}</span>
      </a>
      <a href="#/plans" class="btn btn-outline btn-sm dash-btn-outline" id="upgradeBtn">
        ${ICONS.wrap(ICONS.trendingUp, 14)} <span>${isAr ? 'ترقية الخطة' : 'Upgrade Plan'}</span>
      </a>
      <button class="btn btn-primary btn-sm dash-btn-primary" id="createSiteBtn">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        <span>${isAr ? 'إنشاء موقع جديد' : 'New Website'}</span>
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
    const t = page.theme || { color: '#6366f1', font: 'Cairo' }
    const siteUrl = subdomainUrl(page.slug || 'site')
    return `<div class="builder-toolbar builder-toolbar-clean">
      <div class="left" style="display:flex;align-items:center;gap:12px">
        <button class="btn btn-ghost btn-sm" onclick="Router.navigate('dashboard')" title="Back to Dashboard" style="padding:6px 10px">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span style="width:1px;height:24px;background:var(--gray-200);margin:0 2px"></span>
        <div style="display:flex;flex-direction:column;line-height:1.2">
          <span class="truncate" style="font-weight:700;font-size:.92rem;color:var(--gray-800);max-width:200px">${page.title}</span>
          <a href="${siteUrl}" target="_blank" style="font-size:0.75rem;color:var(--primary);text-decoration:none;direction:ltr;display:inline-flex;align-items:center;gap:4px">
            <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#10b981"></span>
            ${page.slug || 'site'}.${MAIN_DOMAIN} ↗
          </a>
        </div>
        <span style="font-size:.7rem;padding:3px 10px;border-radius:20px;font-weight:600;${page.published ? 'background:#dcfce7;color:#16a34a' : 'background:#fef3c7;color:#d97706'};letter-spacing:.02em">${page.published ? 'منشور (Live)' : 'مسودة (Draft)'}</span>
      </div>
      <div class="center" style="display:flex;align-items:center;gap:8px">
        <div class="device-toggle" id="deviceToggle" style="background:#f1f5f9;padding:3px;border-radius:10px;display:flex;gap:4px">
          <button class="device-btn active" data-device="desktop" title="شاشة الكمبيوتر (Desktop)" style="padding:6px 12px;border:none;background:transparent;border-radius:8px;cursor:pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </button>
          <button class="device-btn" data-device="tablet" title="جهاز لوحي (Tablet)" style="padding:6px 12px;border:none;background:transparent;border-radius:8px;cursor:pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          </button>
          <button class="device-btn" data-device="mobile" title="هاتف ذكي (Mobile)" style="padding:6px 12px;border:none;background:transparent;border-radius:8px;cursor:pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          </button>
        </div>
      </div>
      <div class="right" style="display:flex;align-items:center;gap:8px">
        <span id="saveStatusIndicator" style="font-size:0.75rem;color:var(--gray-400);margin-left:4px">✓ محفوظة</span>
        <button class="btn btn-ghost btn-sm" id="undoBtn" title="تراجع (Ctrl+Z)" style="padding:6px 8px">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
        </button>
        <button class="btn btn-ghost btn-sm" id="redoBtn" title="إعادة (Ctrl+Y)" style="padding:6px 8px">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
        </button>
        <span style="width:1px;height:24px;background:var(--gray-200);margin:0 4px"></span>
        <button class="btn btn-ghost btn-sm" id="previewBtn" title="معاينة في تبويب جديد">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          معاينة
        </button>
        <button class="btn btn-ghost btn-sm" id="exportBtn" title="تصدير كود HTML كامل للموقع">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          تصدير HTML
        </button>
        <button class="btn btn-ghost btn-sm" id="saveBtn" title="حفظ (Ctrl+S)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          حفظ
        </button>
        <button class="btn btn-primary btn-sm" id="publishBtn" style="padding:8px 18px;font-weight:700">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
          ${page.published ? 'تحديث النشر' : 'نشر الموقع'}
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

  renderSection(s, isEditing = false, theme = {}) {
    const t = theme || { color: '#6366f1', font: 'Cairo' }
    const pColor = t.color || '#6366f1'
    const d = s.data || {}
    const a = !!isEditing
    const type = s.type || 'hero'

    switch (type) {
      case 'hero': {
        const heading = d.heading || 'أهلاً بكم في موقعنا المميز'
        const desc = d.description || 'نقدم لكم أرقى الخدمات وأفضل العروض بأعلى معايير الجودة والاحترافية والابتكار المستمر.'
        const btnText = d.buttonText || d.ctaText || 'تواصل معنا الآن'
        const btnUrl = d.buttonUrl || '#contact'
        const hasImg = !!d.image
        return `
        <section class="sf-section sf-hero hero-section editable-section ${a ? 'editing' : ''}" data-section="hero" style="--p-color:${pColor};padding:80px 24px;background:linear-gradient(135deg, ${pColor}0d 0%, #ffffff 100%);text-align:center;position:relative">
          ${a ? '<div class="section-label">Hero / البانر الرئيسي</div>' : ''}
          <div style="max-width:900px;margin:0 auto;display:flex;flex-direction:column;align-items:center">
            ${hasImg ? `
              <div class="sf-hero-img-wrap" style="position:relative;width:100%;max-width:680px;height:320px;border-radius:20px;overflow:hidden;margin-bottom:28px;box-shadow:0 20px 40px rgba(0,0,0,0.08);border:1px solid #e2e8f0">
                <img src="${d.image}" alt="Hero Image" style="width:100%;height:100%;object-fit:cover;display:block">
                ${a ? '<button class="remove-img" style="position:absolute;top:12px;right:12px;z-index:10;background:rgba(255,255,255,0.9);border-radius:50%;width:32px;height:32px;border:none;cursor:pointer;font-size:14px;box-shadow:0 4px 10px rgba(0,0,0,0.15)" data-hero-remove title="حذف الصورة">✕</button>' : ''}
              </div>
            ` : a ? `
              <div class="sf-hero-img-wrap" id="heroImagePlaceholder" style="width:100%;max-width:680px;height:180px;border-radius:20px;border:2px dashed #cbd5e1;background:#f8fafc;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;cursor:pointer;margin-bottom:28px;color:#64748b;transition:all .2s">
                <span style="font-size:1.8rem;background:#fff;width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.06)">+</span>
                <span style="font-size:.85rem;font-weight:600">انقر هنا لرفع صورة البانر الرئيسي</span>
              </div>
            ` : ''}
            <input type="file" accept="image/*" id="heroImageInput" style="display:none">
            <h1 ${a ? 'contenteditable="true" data-field="heading"' : ''} style="font-size:clamp(2rem, 5vw, 3.2rem);font-weight:900;color:#0f172a;line-height:1.25;margin-bottom:16px;max-width:800px;letter-spacing:-0.02em">
              ${heading}
            </h1>
            <p ${a ? 'contenteditable="true" data-field="description"' : ''} style="font-size:1.15rem;color:#475569;line-height:1.8;max-width:620px;margin-bottom:32px">
              ${desc}
            </p>
            <div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center">
              <a href="${btnUrl}" ${a ? 'contenteditable="true" data-field="buttonText"' : ''} class="btn sf-btn-primary" style="background:${pColor};color:#fff;padding:14px 32px;font-size:1.05rem;font-weight:700;border-radius:14px;box-shadow:0 8px 20px ${pColor}40;text-decoration:none;display:inline-flex;align-items:center;gap:8px">
                ${btnText}
              </a>
            </div>
          </div>
        </section>`
      }

      case 'about': {
        const heading = d.heading || 'من نحن'
        const content = d.content || d.description || 'نحن فريق شغوف نسعى لتقديم حلول مبتكرة وخدمات متكاملة ترتقي بتجربة عملائنا وتلبي تطلعاتهم بأعلى معايير الدقة والإتقان.'
        return `
        <section class="sf-section sf-about about-section editable-section ${a ? 'editing' : ''}" data-section="about" style="--p-color:${pColor};padding:80px 24px;background:#ffffff">
          ${a ? '<div class="section-label">About / من نحن</div>' : ''}
          <div style="max-width:800px;margin:0 auto;text-align:center">
            <h2 ${a ? 'contenteditable="true" data-field="heading"' : ''} style="font-size:2.2rem;font-weight:800;color:#0f172a;margin-bottom:20px">
              ${heading}
            </h2>
            <div style="width:48px;height:4px;background:${pColor};border-radius:2px;margin:0 auto 28px"></div>
            <p ${a ? 'contenteditable="true" data-field="content"' : ''} style="font-size:1.1rem;line-height:1.9;color:#334155;white-space:pre-line">
              ${content}
            </p>
          </div>
        </section>`
      }

      case 'services':
      case 'features': {
        const isFeat = type === 'features'
        const heading = d.heading || (isFeat ? 'مميزاتنا الاستثنائية' : 'خدماتنا المتميزة')
        const items = Array.isArray(d.items) && d.items.length ? d.items : [
          { title: 'جودة فائقة', desc: 'نلتزم بأعلى معايير الجودة في جميع خدماتنا ومنتجاتنا.' },
          { title: 'دعم فني مستمر', desc: 'فريق عمل متواجد دائماً لتقديم المساعدة والاستشارات.' },
          { title: 'سرعة ودقة', desc: 'إنجاز فوري ودقة متناهية تلبي كافة احتياجاتكم.' }
        ]
        return `
        <section class="sf-section sf-services services-section editable-section ${a ? 'editing' : ''}" data-section="${type}" style="--p-color:${pColor};padding:80px 24px;background:#f8fafc">
          ${a ? `<div class="section-label">${isFeat ? 'Features / المميزات' : 'Services / الخدمات'}</div>` : ''}
          <div style="max-width:1100px;margin:0 auto">
            <div style="text-align:center;margin-bottom:50px">
              <h2 ${a ? 'contenteditable="true" data-field="heading"' : ''} style="font-size:2.2rem;font-weight:800;color:#0f172a;margin-bottom:12px">
                ${heading}
              </h2>
              <div style="width:48px;height:4px;background:${pColor};border-radius:2px;margin:0 auto"></div>
            </div>
            <div class="services-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px">
              ${items.map((it, i) => `
                <div class="service-card" style="background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:32px 24px;box-shadow:0 4px 20px rgba(0,0,0,0.04);transition:all .3s">
                  <div style="width:48px;height:48px;border-radius:12px;background:${pColor}15;color:${pColor};display:flex;align-items:center;justify-content:center;font-size:1.4rem;font-weight:800;margin-bottom:20px">
                    ${i + 1}
                  </div>
                  <h3 ${a ? `contenteditable="true" data-field="items.${i}.title"` : ''} style="font-size:1.25rem;font-weight:700;color:#0f172a;margin-bottom:10px">
                    ${it.title || 'عنوان الخدمة'}
                  </h3>
                  <p ${a ? `contenteditable="true" data-field="items.${i}.desc"` : ''} style="font-size:.95rem;color:#64748b;line-height:1.7">
                    ${it.desc || 'وصف مختصر ومبسط للخدمة يوضح الفائدة التي يحصل عليها العميل.'}
                  </p>
                </div>
              `).join('')}
            </div>
          </div>
        </section>`
      }

      case 'menu': {
        const heading = d.heading || 'قائمة الطعام والأسعار'
        const items = Array.isArray(d.items) && d.items.length ? d.items : [
          { title: 'وجبة مميزة 1', desc: 'مكونات طازجة مع لمستنا الخاصة اللذيذة', price: '75 ج.م', category: 'الأطباق الرئيسية' },
          { title: 'وجبة مميزة 2', desc: 'تتبيلة شهية مع صوص جانبي مقرمش', price: '95 ج.م', category: 'الأطباق الرئيسية' },
          { title: 'مشروب منعش', desc: 'عصير طبيعي مثلج وطازج', price: '30 ج.م', category: 'المشروبات' }
        ]
        const cats = [...new Set(items.map(it => it.category || 'عام'))]
        return `
        <section class="sf-section sf-menu menu-section editable-section ${a ? 'editing' : ''}" data-section="menu" style="--p-color:${pColor};padding:80px 24px;background:#ffffff">
          ${a ? '<div class="section-label">Menu / قائمة الطعام والمنتجات</div>' : ''}
          <div style="max-width:960px;margin:0 auto">
            <div style="text-align:center;margin-bottom:40px">
              <h2 ${a ? 'contenteditable="true" data-field="heading"' : ''} style="font-size:2.2rem;font-weight:800;color:#0f172a;margin-bottom:12px">
                ${heading}
              </h2>
              <div style="width:48px;height:4px;background:${pColor};border-radius:2px;margin:0 auto"></div>
            </div>
            ${cats.map(cat => `
              <div class="menu-category" style="margin-bottom:36px">
                <h3 style="font-size:1.3rem;font-weight:800;color:${pColor};border-bottom:2px solid ${pColor}30;padding-bottom:8px;margin-bottom:18px">${cat}</h3>
                <div style="display:flex;flex-direction:column;gap:14px">
                  ${items.filter(it => (it.category || 'عام') === cat).map(item => {
                    const gi = items.indexOf(item)
                    const waText = encodeURIComponent(`مرحباً، أود طلب: ${item.title}${item.price ? ' بسعر ' + item.price : ''}`)
                    return `
                    <div class="menu-item" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
                      <div class="menu-item-info" style="flex:1;min-width:200px">
                        <h4 ${a ? `contenteditable="true" data-field="items.${gi}.title"` : ''} style="font-size:1.1rem;font-weight:700;color:#0f172a;margin-bottom:4px">
                          ${item.title}
                        </h4>
                        <p ${a ? `contenteditable="true" data-field="items.${gi}.desc"` : ''} style="font-size:.85rem;color:#64748b;margin:0">
                          ${item.desc || ''}
                        </p>
                      </div>
                      <div style="display:flex;align-items:center;gap:14px">
                        <span ${a ? `contenteditable="true" data-field="items.${gi}.price"` : ''} class="menu-price" style="font-size:1.15rem;font-weight:800;color:${pColor};background:${pColor}12;padding:6px 14px;border-radius:10px">
                          ${item.price || ''}
                        </span>
                        <a href="https://wa.me/?text=${waText}" target="_blank" class="sf-whatsapp-btn" style="background:#25d366;color:#fff;border-radius:10px;padding:8px 16px;font-size:.85rem;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;gap:6px;box-shadow:0 4px 12px rgba(37,211,102,0.25)">
                          طلب عبر واتساب 💬
                        </a>
                      </div>
                    </div>`
                  }).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </section>`
      }

      case 'testimonials': {
        const heading = d.heading || 'آراء وتجارب عملائنا'
        const items = Array.isArray(d.items) && d.items.length ? d.items : [
          { name: 'أحمد محمود', role: 'عميل مميز', text: 'تجربة رائعة وتعامل راقي جداً، أنصح الجميع بالتعامل معهم دون تردد!' },
          { name: 'سارة علي', role: 'مديرة تسويق', text: 'خدمة سريعة واحترافية فائقة، فاقوا كل توقعاتي في الجودة والمواعيد.' }
        ]
        return `
        <section class="sf-section sf-testimonials testimonials-section editable-section ${a ? 'editing' : ''}" data-section="testimonials" style="--p-color:${pColor};padding:80px 24px;background:#f8fafc">
          ${a ? '<div class="section-label">Testimonials / آراء العملاء</div>' : ''}
          <div style="max-width:1000px;margin:0 auto">
            <div style="text-align:center;margin-bottom:48px">
              <h2 ${a ? 'contenteditable="true" data-field="heading"' : ''} style="font-size:2.2rem;font-weight:800;color:#0f172a;margin-bottom:12px">
                ${heading}
              </h2>
              <div style="width:48px;height:4px;background:${pColor};border-radius:2px;margin:0 auto"></div>
            </div>
            <div class="testimonials-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px">
              ${items.map((it, i) => `
                <div class="testimonial-card" style="background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:28px;box-shadow:0 4px 20px rgba(0,0,0,0.04);display:flex;flex-direction:column;justify-content:space-between">
                  <p ${a ? `contenteditable="true" data-field="items.${i}.text"` : ''} style="font-size:1.05rem;line-height:1.8;color:#334155;margin-bottom:20px;font-style:italic">
                    "${it.text}"
                  </p>
                  <div class="testimonial-author" style="display:flex;align-items:center;gap:12px;border-top:1px solid #f1f5f9;padding-top:16px">
                    <div style="width:42px;height:42px;border-radius:50%;background:${pColor};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1rem">
                      ${it.name ? it.name.charAt(0) : '👤'}
                    </div>
                    <div>
                      <strong ${a ? `contenteditable="true" data-field="items.${i}.name"` : ''} style="display:block;color:#0f172a;font-size:.95rem">
                        ${it.name}
                      </strong>
                      <span ${a ? `contenteditable="true" data-field="items.${i}.role"` : ''} style="font-size:.8rem;color:#64748b">
                        ${it.role || ''}
                      </span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>`
      }

      case 'pricing': {
        const heading = d.heading || 'باقات الأسعار والاشتراكات'
        const plans = Array.isArray(d.plans) && d.plans.length ? d.plans : [
          { name: 'الباقة الأساسية', price: '199 ج.م', features: ['ميزة رقم 1', 'ميزة رقم 2', 'دعم فني قياسي'] },
          { name: 'الباقة الاحترافية', price: '399 ج.م', features: ['كافة ميزات الأساسية', 'ميزة إضافية حصرية', 'أولوية في الدعم'] }
        ]
        return `
        <section class="sf-section sf-pricing pricing-section editable-section ${a ? 'editing' : ''}" data-section="pricing" style="--p-color:${pColor};padding:80px 24px;background:#ffffff">
          ${a ? '<div class="section-label">Pricing / باقات الأسعار</div>' : ''}
          <div style="max-width:1000px;margin:0 auto">
            <div style="text-align:center;margin-bottom:48px">
              <h2 ${a ? 'contenteditable="true" data-field="heading"' : ''} style="font-size:2.2rem;font-weight:800;color:#0f172a;margin-bottom:12px">
                ${heading}
              </h2>
              <div style="width:48px;height:4px;background:${pColor};border-radius:2px;margin:0 auto"></div>
            </div>
            <div class="pricing-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px">
              ${plans.map((p, i) => `
                <div class="pricing-card" style="background:#fff;border:2px solid #e2e8f0;border-radius:20px;padding:36px 28px;text-align:center;box-shadow:0 8px 30px rgba(0,0,0,0.04);display:flex;flex-direction:column;justify-content:space-between">
                  <div>
                    <h3 ${a ? `contenteditable="true" data-field="plans.${i}.name"` : ''} style="font-size:1.35rem;font-weight:800;color:#0f172a;margin-bottom:12px">
                      ${p.name}
                    </h3>
                    <div ${a ? `contenteditable="true" data-field="plans.${i}.price"` : ''} class="price" style="font-size:2.4rem;font-weight:900;color:${pColor};margin-bottom:24px">
                      ${p.price}
                    </div>
                    <ul style="list-style:none;padding:0;margin:0 0 28px;display:flex;flex-direction:column;gap:10px;text-align:right">
                      ${(p.features || []).map((f, fi) => `
                        <li ${a ? `contenteditable="true" data-field="plans.${i}.features.${fi}"` : ''} style="font-size:.95rem;color:#475569;display:flex;align-items:center;gap:8px">
                          <span style="color:#10b981;font-weight:800">✓</span> ${f}
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                  <a href="#contact" class="btn" style="background:${pColor};color:#fff;padding:12px;border-radius:12px;font-weight:700;text-decoration:none;display:block">
                    اختيار هذه الخطة
                  </a>
                </div>
              `).join('')}
            </div>
          </div>
        </section>`
      }

      case 'gallery': {
        const heading = d.heading || 'معرض الصور'
        const im = Array.isArray(d.images) ? d.images : []
        return `
        <section class="sf-section sf-gallery gallery-section editable-section ${a ? 'editing' : ''}" data-section="gallery" style="--p-color:${pColor};padding:80px 24px;background:#f8fafc">
          ${a ? '<div class="section-label">Gallery / معرض الصور</div>' : ''}
          <div style="max-width:1100px;margin:0 auto">
            <div style="text-align:center;margin-bottom:48px">
              <h2 ${a ? 'contenteditable="true" data-field="heading"' : ''} style="font-size:2.2rem;font-weight:800;color:#0f172a;margin-bottom:12px">
                ${heading}
              </h2>
              <div style="width:48px;height:4px;background:${pColor};border-radius:2px;margin:0 auto"></div>
            </div>
            <div class="gallery-grid" id="galleryGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px">
              ${im.length === 0 && !a ? '<p style="grid-column:1/-1;text-align:center;color:#94a3b8;padding:40px">لا توجد صور بعد في المعرض.</p>' : ''}
              ${im.length === 0 && a ? '<div style="grid-column:1/-1;text-align:center;color:#64748b;padding:40px;border:2px dashed #cbd5e1;border-radius:14px;background:#fff">انقر على زر + بالأسفل لإضافة صورك إلى المعرض</div>' : ''}
              ${im.map((img, i) => `
                <div class="gallery-item" style="position:relative;border-radius:14px;overflow:hidden;height:180px;box-shadow:0 4px 15px rgba(0,0,0,0.06)">
                  <img src="${img}" alt="Gallery item" style="width:100%;height:100%;object-fit:cover;display:block">
                  ${a ? `<button class="remove-img" data-index="${i}" style="position:absolute;top:8px;right:8px;background:rgba(255,255,255,0.9);border:none;border-radius:50%;width:28px;height:28px;cursor:pointer;font-weight:700" title="حذف">✕</button>` : ''}
                </div>
              `).join('')}
              ${a ? `
                <div class="gallery-item" id="addGalleryBtn" style="cursor:pointer;border:2px dashed #94a3b8;border-radius:14px;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;height:180px;color:#64748b;font-weight:700">
                  <span style="font-size:2rem">+</span>
                  <span style="font-size:.8rem">إضافة صورة</span>
                </div>
                <input type="file" accept="image/*" id="galleryImageInput" style="display:none" multiple>
              ` : ''}
            </div>
          </div>
        </section>`
      }

      case 'faq': {
        const heading = d.heading || 'الأسئلة الشائعة والأجوبة'
        const items = Array.isArray(d.items) && d.items.length ? d.items : [
          { q: 'كيف يمكنني التواصل والطلب؟', a: 'يمكنك التواصل معنا مباشرة عبر زر الواتساب أو ملء نموذج التواصل أسفل الصفحة.' },
          { q: 'ما هي مواعيد العمل لديكم؟', a: 'نعمل يومياً من الساعة 9 صباحاً حتى الساعة 10 مساءً لخدمتكم بأفضل صورة.' }
        ]
        return `
        <section class="sf-section sf-faq faq-section editable-section ${a ? 'editing' : ''}" data-section="faq" style="--p-color:${pColor};padding:80px 24px;background:#ffffff">
          ${a ? '<div class="section-label">FAQ / الأسئلة الشائعة</div>' : ''}
          <div style="max-width:800px;margin:0 auto">
            <div style="text-align:center;margin-bottom:48px">
              <h2 ${a ? 'contenteditable="true" data-field="heading"' : ''} style="font-size:2.2rem;font-weight:800;color:#0f172a;margin-bottom:12px">
                ${heading}
              </h2>
              <div style="width:48px;height:4px;background:${pColor};border-radius:2px;margin:0 auto"></div>
            </div>
            <div class="faq-list" style="display:flex;flex-direction:column;gap:16px">
              ${items.map((it, i) => `
                <div class="faq-item" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:20px 24px">
                  <h3 ${a ? `contenteditable="true" data-field="items.${i}.q"` : ''} style="font-size:1.15rem;font-weight:700;color:#0f172a;margin-bottom:8px">
                    ${it.q}
                  </h3>
                  <p ${a ? `contenteditable="true" data-field="items.${i}.a"` : ''} style="font-size:.95rem;color:#475569;line-height:1.7;margin:0">
                    ${it.a}
                  </p>
                </div>
              `).join('')}
            </div>
          </div>
        </section>`
      }

      case 'counters':
      case 'stats': {
        const heading = d.heading || 'إحصائيات وأرقام قياسية'
        const items = Array.isArray(d.items) && d.items.length ? d.items : [
          { number: '+1500', label: 'عميل سعيد' },
          { number: '+99%', label: 'نسبة الرضا' },
          { number: '24/7', label: 'دعم متواصل' }
        ]
        return `
        <section class="sf-section sf-counters counters-section editable-section ${a ? 'editing' : ''}" data-section="${type}" style="--p-color:${pColor};padding:70px 24px;background:linear-gradient(135deg, ${pColor}12 0%, #ffffff 100%)">
          ${a ? '<div class="section-label">Counters / الإحصائيات</div>' : ''}
          <div style="max-width:1000px;margin:0 auto">
            <h2 ${a ? 'contenteditable="true" data-field="heading"' : ''} style="text-align:center;font-size:2rem;font-weight:800;color:#0f172a;margin-bottom:40px">
              ${heading}
            </h2>
            <div class="counters-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:24px;text-align:center">
              ${items.map((it, i) => `
                <div class="counter-card" style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:28px 20px;box-shadow:0 4px 15px rgba(0,0,0,0.03)">
                  <div ${a ? `contenteditable="true" data-field="items.${i}.number"` : ''} class="counter-number" style="font-size:2.5rem;font-weight:900;color:${pColor};margin-bottom:6px">
                    ${it.number}
                  </div>
                  <div ${a ? `contenteditable="true" data-field="items.${i}.label"` : ''} class="counter-label" style="font-size:1rem;font-weight:700;color:#475569">
                    ${it.label}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>`
      }

      case 'team': {
        const heading = d.heading || 'فريق العمل'
        const items = Array.isArray(d.items) && d.items.length ? d.items : [
          { name: 'محمد أحمد', role: 'المؤسس والمدير التنفيذي' },
          { name: 'كريم خالد', role: 'مسؤول العمليات والخدمات' }
        ]
        return `
        <section class="sf-section sf-team team-section editable-section ${a ? 'editing' : ''}" data-section="team" style="--p-color:${pColor};padding:80px 24px;background:#ffffff">
          ${a ? '<div class="section-label">Team / فريق العمل</div>' : ''}
          <div style="max-width:1000px;margin:0 auto">
            <div style="text-align:center;margin-bottom:48px">
              <h2 ${a ? 'contenteditable="true" data-field="heading"' : ''} style="font-size:2.2rem;font-weight:800;color:#0f172a;margin-bottom:12px">
                ${heading}
              </h2>
              <div style="width:48px;height:4px;background:${pColor};border-radius:2px;margin:0 auto"></div>
            </div>
            <div class="team-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px">
              ${items.map((it, i) => `
                <div class="team-card" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:18px;padding:32px 20px;text-align:center">
                  <div class="team-avatar" style="width:72px;height:72px;border-radius:50%;background:${pColor};color:#fff;font-size:1.8rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;box-shadow:0 6px 16px ${pColor}33">
                    ${it.name ? it.name.charAt(0) : '👤'}
                  </div>
                  <h3 ${a ? `contenteditable="true" data-field="items.${i}.name"` : ''} style="font-size:1.2rem;font-weight:700;color:#0f172a;margin-bottom:6px">
                    ${it.name}
                  </h3>
                  <p ${a ? `contenteditable="true" data-field="items.${i}.role"` : ''} style="font-size:.9rem;color:#64748b;margin:0">
                    ${it.role || ''}
                  </p>
                </div>
              `).join('')}
            </div>
          </div>
        </section>`
      }

      case 'portfolio': {
        const heading = d.heading || 'معرض أعمالنا'
        const items = Array.isArray(d.items) && d.items.length ? d.items : [
          { title: 'مشروع مميز 1', desc: 'تصميم وتنفيذ متكامل يلبي كافة الاحتياجات' },
          { title: 'مشروع مميز 2', desc: 'حلول ذكية ومبتكرة ذات أثر ملموس' }
        ]
        return `
        <section class="sf-section sf-portfolio portfolio-section editable-section ${a ? 'editing' : ''}" data-section="portfolio" style="--p-color:${pColor};padding:80px 24px;background:#f8fafc">
          ${a ? '<div class="section-label">Portfolio / معرض الأعمال</div>' : ''}
          <div style="max-width:1100px;margin:0 auto">
            <div style="text-align:center;margin-bottom:48px">
              <h2 ${a ? 'contenteditable="true" data-field="heading"' : ''} style="font-size:2.2rem;font-weight:800;color:#0f172a;margin-bottom:12px">
                ${heading}
              </h2>
              <div style="width:48px;height:4px;background:${pColor};border-radius:2px;margin:0 auto"></div>
            </div>
            <div class="portfolio-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px">
              ${items.map((it, i) => `
                <div class="portfolio-card" style="background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.04)">
                  <div class="portfolio-img" style="background:#e2e8f0;height:180px;display:flex;align-items:center;justify-content:center;color:#94a3b8;font-size:2.5rem">
                    ${it.image ? `<img src="${it.image}" alt="Portfolio item" style="width:100%;height:100%;object-fit:cover">` : '📁'}
                  </div>
                  <div style="padding:20px">
                    <h3 ${a ? `contenteditable="true" data-field="items.${i}.title"` : ''} style="font-size:1.2rem;font-weight:700;color:#0f172a;margin-bottom:6px">
                      ${it.title}
                    </h3>
                    <p ${a ? `contenteditable="true" data-field="items.${i}.desc"` : ''} style="font-size:.9rem;color:#64748b;margin:0;line-height:1.6">
                      ${it.desc || ''}
                    </p>
                  </div>
                </div>
              `).join('')}
              ${a ? `
                <div class="portfolio-card add-card" id="addPortfolioBtn" style="cursor:pointer;border:2px dashed #cbd5e1;border-radius:18px;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:240px;color:#64748b;background:#fff">
                  <span style="font-size:2rem">+</span>
                  <span style="font-size:.85rem;font-weight:700">إضافة عنصر جديد</span>
                </div>
                <input type="file" accept="image/*" id="portfolioImageInput" style="display:none" multiple>
              ` : ''}
            </div>
          </div>
        </section>`
      }

      case 'timeline': {
        const heading = d.heading || 'مسيرة تطورنا'
        const items = Array.isArray(d.items) && d.items.length ? d.items : [
          { year: '2024', title: 'الانطلاقة الأولى', desc: 'بدء العمل وتقديم أولى الخدمات لعملائنا.' },
          { year: '2026', title: 'التوسع والريادة', desc: 'توسيع نطاق الخدمات وتطوير البنية التقنية.' }
        ]
        return `
        <section class="sf-section sf-timeline timeline-section editable-section ${a ? 'editing' : ''}" data-section="timeline" style="--p-color:${pColor};padding:80px 24px;background:#ffffff">
          ${a ? '<div class="section-label">Timeline / الجدول الزمني</div>' : ''}
          <div style="max-width:800px;margin:0 auto">
            <h2 ${a ? 'contenteditable="true" data-field="heading"' : ''} style="text-align:center;font-size:2.2rem;font-weight:800;color:#0f172a;margin-bottom:48px">
              ${heading}
            </h2>
            <div class="timeline" style="display:flex;flex-direction:column;gap:24px;position:relative;border-right:3px solid ${pColor}30;padding-right:24px;margin-right:20px">
              ${items.map((it, i) => `
                <div class="timeline-item" style="position:relative">
                  <div class="timeline-dot" style="position:absolute;right:-31px;top:6px;width:15px;height:15px;border-radius:50%;background:${pColor};box-shadow:0 0 0 4px ${pColor}20"></div>
                  <div class="timeline-content" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:20px 24px">
                    <div ${a ? `contenteditable="true" data-field="items.${i}.year"` : ''} class="timeline-year" style="font-size:1.1rem;font-weight:900;color:${pColor};margin-bottom:6px">
                      ${it.year || ''}
                    </div>
                    <h3 ${a ? `contenteditable="true" data-field="items.${i}.title"` : ''} style="font-size:1.2rem;font-weight:700;color:#0f172a;margin-bottom:6px">
                      ${it.title}
                    </h3>
                    <p ${a ? `contenteditable="true" data-field="items.${i}.desc"` : ''} style="font-size:.95rem;color:#64748b;margin:0;line-height:1.7">
                      ${it.desc || ''}
                    </p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>`
      }

      case 'blog': {
        const heading = d.heading || 'أحدث المقالات والأخبار'
        const items = Array.isArray(d.items) && d.items.length ? d.items : [
          { date: '2026-03-24', title: 'مقال حصري رقم 1', excerpt: 'نظرة معمقة وتفاصيل شيقة حول أحدث التطورات والنصائح.' }
        ]
        return `
        <section class="sf-section sf-blog blog-section editable-section ${a ? 'editing' : ''}" data-section="blog" style="--p-color:${pColor};padding:80px 24px;background:#f8fafc">
          ${a ? '<div class="section-label">Blog / المدونة</div>' : ''}
          <div style="max-width:1000px;margin:0 auto">
            <h2 ${a ? 'contenteditable="true" data-field="heading"' : ''} style="text-align:center;font-size:2.2rem;font-weight:800;color:#0f172a;margin-bottom:48px">
              ${heading}
            </h2>
            <div class="blog-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px">
              ${items.map((it, i) => `
                <div class="blog-card" style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:28px 24px;box-shadow:0 4px 15px rgba(0,0,0,0.03)">
                  <div class="blog-date" style="font-size:.8rem;font-weight:700;color:${pColor};margin-bottom:8px">
                    ${it.date || ''}
                  </div>
                  <h3 ${a ? `contenteditable="true" data-field="items.${i}.title"` : ''} style="font-size:1.25rem;font-weight:700;color:#0f172a;margin-bottom:10px">
                    ${it.title}
                  </h3>
                  <p ${a ? `contenteditable="true" data-field="items.${i}.excerpt"` : ''} style="font-size:.95rem;color:#64748b;line-height:1.7;margin:0">
                    ${it.excerpt || ''}
                  </p>
                </div>
              `).join('')}
            </div>
          </div>
        </section>`
      }

      case 'location': {
        const heading = d.heading || 'موقعنا وساعات العمل'
        return `
        <section class="sf-section sf-location location-section editable-section ${a ? 'editing' : ''}" data-section="location" style="--p-color:${pColor};padding:80px 24px;background:#ffffff">
          ${a ? '<div class="section-label">Location / العنوان والموقع</div>' : ''}
          <div style="max-width:800px;margin:0 auto">
            <div style="text-align:center;margin-bottom:40px">
              <h2 ${a ? 'contenteditable="true" data-field="heading"' : ''} style="font-size:2.2rem;font-weight:800;color:#0f172a;margin-bottom:12px">
                ${heading}
              </h2>
              <div style="width:48px;height:4px;background:${pColor};border-radius:2px;margin:0 auto"></div>
            </div>
            <div class="location-info" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:18px;padding:32px 28px;display:flex;flex-direction:column;gap:16px">
              <p style="font-size:1.05rem;color:#334155;margin:0;display:flex;align-items:center;gap:10px">
                📍 <strong>العنوان:</strong> <span ${a ? 'contenteditable="true" data-field="address"' : ''}>${d.address || 'القاهرة، مصر'}</span>
              </p>
              <p style="font-size:1.05rem;color:#334155;margin:0;display:flex;align-items:center;gap:10px">
                📞 <strong>الهاتف:</strong> <span ${a ? 'contenteditable="true" data-field="phone"' : ''}>${d.phone || '+20 100 000 0000'}</span>
              </p>
              <p style="font-size:1.05rem;color:#334155;margin:0;display:flex;align-items:center;gap:10px">
                ⏰ <strong>ساعات العمل:</strong> <span ${a ? 'contenteditable="true" data-field="hours"' : ''}>${d.hours || 'السبت - الخميس: 9:00 ص - 10:00 م'}</span>
              </p>
            </div>
          </div>
        </section>`
      }

      case 'contact': {
        const heading = d.heading || 'تواصل معنا'
        return `
        <section class="sf-section sf-contact contact-section editable-section ${a ? 'editing' : ''}" data-section="contact" id="contact" style="--p-color:${pColor};padding:80px 24px;background:#f8fafc">
          ${a ? '<div class="section-label">Contact / نموذج التواصل</div>' : ''}
          <div style="max-width:680px;margin:0 auto">
            <div style="text-align:center;margin-bottom:40px">
              <h2 ${a ? 'contenteditable="true" data-field="heading"' : ''} style="font-size:2.2rem;font-weight:800;color:#0f172a;margin-bottom:12px">
                ${heading}
              </h2>
              <div style="width:48px;height:4px;background:${pColor};border-radius:2px;margin:0 auto"></div>
            </div>
            <div class="contact-form" id="pubContactForm" style="background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:36px 32px;box-shadow:0 8px 30px rgba(0,0,0,0.04)">
              <div class="input-group" style="margin-bottom:18px">
                <label style="display:block;font-size:.9rem;font-weight:700;color:#334155;margin-bottom:6px">الاسم بالكامل</label>
                <input class="input" id="cfName" placeholder="اكتب اسمك..." style="width:100%;border:1px solid #cbd5e1;border-radius:10px;padding:12px;font-size:.95rem" ${a ? 'disabled' : 'required'}>
              </div>
              <div class="input-group" style="margin-bottom:18px">
                <label style="display:block;font-size:.9rem;font-weight:700;color:#334155;margin-bottom:6px">البريد الإلكتروني أو الهاتف</label>
                <input class="input" id="cfEmail" placeholder="your@email.com / 01xxxxxxxxx" style="width:100%;border:1px solid #cbd5e1;border-radius:10px;padding:12px;font-size:.95rem" ${a ? 'disabled' : 'required'}>
              </div>
              <div class="input-group" style="margin-bottom:24px">
                <label style="display:block;font-size:.9rem;font-weight:700;color:#334155;margin-bottom:6px">رسالتك أو استفسارك</label>
                <textarea class="input textarea" id="cfMessage" rows="4" placeholder="كيف يمكننا مساعدتك؟" style="width:100%;border:1px solid #cbd5e1;border-radius:10px;padding:12px;font-size:.95rem" ${a ? 'disabled' : 'required'}></textarea>
              </div>
              <button class="btn sf-btn-primary" id="cfSubmitBtn" style="background:${pColor};color:#fff;width:100%;padding:14px;border-radius:12px;font-size:1.05rem;font-weight:800;border:none;cursor:pointer;box-shadow:0 6px 18px ${pColor}33" ${a ? 'disabled' : ''}>
                إرسال الرسالة الآن 🚀
              </button>
              <p id="cfMsg" style="font-size:.9rem;margin-top:12px;text-align:center;display:none;font-weight:700"></p>
            </div>
          </div>
        </section>`
      }

      case 'cta': {
        const heading = d.heading || 'جاهز للبدء وتطوير أعمالك معنا؟'
        const subheading = d.subheading || d.description || 'انضم إلى نخبة عملائنا المميزين اليوم واستفد من عروضنا الحصرية.'
        const btnText = d.buttonText || 'تواصل معنا الآن'
        const btnUrl = d.buttonUrl || '#contact'
        return `
        <section class="sf-section sf-cta cta-section editable-section ${a ? 'editing' : ''}" data-section="cta" style="--p-color:${pColor};padding:80px 24px;background:${pColor};color:#ffffff;text-align:center">
          ${a ? '<div class="section-label">CTA / تحفيز التواصل</div>' : ''}
          <div style="max-width:800px;margin:0 auto">
            <h2 ${a ? 'contenteditable="true" data-field="heading"' : ''} style="font-size:clamp(1.8rem, 4vw, 2.8rem);font-weight:900;color:#fff;margin-bottom:14px;line-height:1.3">
              ${heading}
            </h2>
            <p ${a ? 'contenteditable="true" data-field="subheading"' : ''} style="font-size:1.15rem;opacity:.92;line-height:1.7;max-width:600px;margin:0 auto 28px">
              ${subheading}
            </p>
            <a href="${btnUrl}" ${a ? 'contenteditable="true" data-field="buttonText"' : ''} class="btn" style="background:#ffffff;color:${pColor};padding:14px 36px;font-size:1.05rem;font-weight:800;border-radius:14px;text-decoration:none;display:inline-block;box-shadow:0 10px 25px rgba(0,0,0,0.15)">
              ${btnText}
            </a>
          </div>
        </section>`
      }

      case 'footer': {
        const copyright = d.copyright || `© ${new Date().getFullYear()} جميع الحقوق محفوظة.`
        const text = d.text || 'مدعوم بواسطة SiteFlow Platform'
        return `
        <footer class="sf-section sf-footer footer-section editable-section ${a ? 'editing' : ''}" data-section="footer" style="padding:48px 24px;background:#0f172a;color:#94a3b8;text-align:center">
          ${a ? '<div class="section-label">Footer / التذييل</div>' : ''}
          <div style="max-width:800px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:10px">
            <p ${a ? 'contenteditable="true" data-field="copyright"' : ''} style="font-size:.95rem;margin:0;color:#cbd5e1">
              ${copyright}
            </p>
            <p ${a ? 'contenteditable="true" data-field="text"' : ''} style="font-size:.85rem;margin:0;color:#64748b">
              ${text}
            </p>
          </div>
        </footer>`
      }

      default: {
        return `<section class="sf-section editable-section ${a ? 'editing' : ''}" style="padding:40px;text-align:center;color:#94a3b8">قسم: ${type}</section>`
      }
    }
  },

  heroSection(d, a, t) { return this.renderSection({ type: 'hero', data: d }, a, t) },
  aboutSection(d, a, t) { return this.renderSection({ type: 'about', data: d }, a, t) },
  gallerySection(d, a, t) { return this.renderSection({ type: 'gallery', data: d }, a, t) },
  contactSection(d, a, t) { return this.renderSection({ type: 'contact', data: d }, a, t) },
  servicesSection(d, a, t) { return this.renderSection({ type: 'services', data: d }, a, t) },
  testimonialsSection(d, a, t) { return this.renderSection({ type: 'testimonials', data: d }, a, t) },
  pricingSection(d, a, t) { return this.renderSection({ type: 'pricing', data: d }, a, t) },
  faqSection(d, a, t) { return this.renderSection({ type: 'faq', data: d }, a, t) },
  teamSection(d, a, t) { return this.renderSection({ type: 'team', data: d }, a, t) },
  footerSection(d, a, t) { return this.renderSection({ type: 'footer', data: d }, a, t) },
  blogSection(d, a, t) { return this.renderSection({ type: 'blog', data: d }, a, t) },
  portfolioSection(d, a, t) { return this.renderSection({ type: 'portfolio', data: d }, a, t) },
  countersSection(d, a, t) { return this.renderSection({ type: 'counters', data: d }, a, t) },
  timelineSection(d, a, t) { return this.renderSection({ type: 'timeline', data: d }, a, t) },
  menuSection(d, a, t) { return this.renderSection({ type: 'menu', data: d }, a, t) },
  locationSection(d, a, t) { return this.renderSection({ type: 'location', data: d }, a, t) },
  featuresSection(d, a, t) { return this.renderSection({ type: 'features', data: d }, a, t) },
  statsSection(d, a, t) { return this.renderSection({ type: 'stats', data: d }, a, t) },
  ctaSection(d, a, t) { return this.renderSection({ type: 'cta', data: d }, a, t) },

  pubHero(d, t) { return this.renderSection({ type: 'hero', data: d }, false, t) },
  pubAbout(d, t) { return this.renderSection({ type: 'about', data: d }, false, t) },
  pubGallery(d, t) { return this.renderSection({ type: 'gallery', data: d }, false, t) },
  pubContact(d, t) { return this.renderSection({ type: 'contact', data: d }, false, t) },
  pubServices(d, t) { return this.renderSection({ type: 'services', data: d }, false, t) },
  pubTestimonials(d, t) { return this.renderSection({ type: 'testimonials', data: d }, false, t) },
  pubPricing(d, t) { return this.renderSection({ type: 'pricing', data: d }, false, t) },
  pubFaq(d, t) { return this.renderSection({ type: 'faq', data: d }, false, t) },
  pubTeam(d, t) { return this.renderSection({ type: 'team', data: d }, false, t) },
  pubFooter(d, t) { return this.renderSection({ type: 'footer', data: d }, false, t) },
  pubBlog(d, t) { return this.renderSection({ type: 'blog', data: d }, false, t) },
  pubPortfolio(d, t) { return this.renderSection({ type: 'portfolio', data: d }, false, t) },
  pubCounters(d, t) { return this.renderSection({ type: 'counters', data: d }, false, t) },
  pubTimeline(d, t) { return this.renderSection({ type: 'timeline', data: d }, false, t) },
  pubMenu(d, t) { return this.renderSection({ type: 'menu', data: d }, false, t) },
  pubLocation(d, t) { return this.renderSection({ type: 'location', data: d }, false, t) },
  pubFeatures(d, t) { return this.renderSection({ type: 'features', data: d }, false, t) },
  pubStats(d, t) { return this.renderSection({ type: 'stats', data: d }, false, t) },
  pubCta(d, t) { return this.renderSection({ type: 'cta', data: d }, false, t) },

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
      <div class="public-content">${page.sections.map(s => this.renderSection(s, false, t)).join('')}</div>
      
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
