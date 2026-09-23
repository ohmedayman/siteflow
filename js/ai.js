/**
 * SiteFlow AI — المساعد الذكي المدمج لمنصة SiteFlow
 * يدمج قدرات: بناء الصفحات، كتابة المحتوى، تحسين SEO، واقتراحات التصميم الذكي
 */

const SiteFlowAI = {
  // قواعد التصميم والألوان حسب القطاع
  INDUSTRY_PALETTES: {
    medical: { name: 'طبي / صحي', primary: '#0284c7', secondary: '#0ea5e9', bg: '#f0f9ff', font: 'Tajawal', cta: 'احجز موعدك الآن' },
    food: { name: 'مطاعم / طعام', primary: '#ea580c', secondary: '#f97316', bg: '#fff7ed', font: 'Cairo', cta: 'اطلب الآن' },
    tech: { name: 'تقني / شركات', primary: '#2563eb', secondary: '#4f46e5', bg: '#f8fafc', font: 'Inter', cta: 'ابدأ تجربتك المجانية' },
    education: { name: 'تعليم / كورسات', primary: '#0d9488', secondary: '#059669', bg: '#f0fdfa', font: 'Cairo', cta: 'سجل الآن' },
    fashion: { name: 'جمال / موضة', primary: '#9333ea', secondary: '#c026d3', bg: '#faf5ff', font: 'Tajawal', cta: 'تسوق التشكيلة' },
    legal: { name: 'قانوني / مالي', primary: '#1e293b', secondary: '#334155', bg: '#f8fafc', font: 'Cairo', cta: 'احصل على استشارة' }
  },

  // الكشف التلقائي عن نوع النشاط التجاري
  detectIndustry(prompt) {
    const p = (prompt || '').toLowerCase();
    if (/طبي|عيادة|اسنان|أسنان|طبيب|صيدلية|دكتور|علاج|مستشفى|مستوصف/i.test(p)) return 'medical';
    if (/مطعم|كافيه|أكل|طعام|وجبات|كافيه|برجر|بيتزا|حلويات|مخبز/i.test(p)) return 'food';
    if (/برمجة|تقنية|سوفتوير|تطبيق|موقع|شرك|حلول|سحابي|ذكاء/i.test(p)) return 'tech';
    if (/تعليم|كورس|مدرسة|جامعة|تدريب|معلم|اكاديمية|أكاديمية/i.test(p)) return 'education';
    if (/ملابس|موضة|ازياء|أزياء|جمال|ميكاب|عطور|اكسسوارات|بوتيك/i.test(p)) return 'fashion';
    if (/محام|قانون|محاسب|ضرائب|عقارات|استثمار|مالي/i.test(p)) return 'legal';
    return 'tech';
  },

  // توليد هيكل ومحتوى موقع احترافي متكامل بناءً على وصف المستخدم
  generateSite(userPrompt) {
    const indKey = this.detectIndustry(userPrompt);
    const pal = this.INDUSTRY_PALETTES[indKey];
    const prompt = userPrompt.trim();

    let siteTitle = prompt.length > 25 ? prompt.slice(0, 25) : prompt;
    let heroHeading = '';
    let heroDesc = '';
    let sections = [];
    let seoTitle = '';
    let seoDesc = '';

    if (indKey === 'medical') {
      siteTitle = siteTitle || 'عيادة النخبة الطبية';
      heroHeading = 'ابتسامة مشرقة ورعاية صحية متكاملة بأحدث التقنيات';
      heroDesc = 'نقدم أعلى معايير العناية الطبية بأيدي أمهر الاستشاريين، مع أحدث أجهزة التشخيص والتعقيم المعتمدة عالمياً.';
      seoTitle = `${siteTitle} | رعاية طبية متقدمة وحجز فوري`;
      seoDesc = `احجز موعدك الآن في ${siteTitle}. أفضل خدمات الرعاية الطبية مع استشاريين متخصصين وأحدث تقنيات العلاج بدون ألم.`;
      sections = [
        { type: 'hero', data: { heading: heroHeading, description: heroDesc, image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80', buttonText: pal.cta, buttonUrl: '#contact' } },
        { type: 'features', data: { heading: 'لماذا يختارنا المرضى؟', items: [{title:'فريق طبي استشاري',desc:'خبرات سريرية تزيد عن 15 عاماً في كبرى المستشفيات'},{title:'أحدث الأجهزة الرقمية',desc:'تشخيص دقيق وعلاج سريع بدون ألم أو قلق'},{title:'تعقيم فندقي متكامل',desc:'بروتوكولات مكافحة عدوى مطابقة لأعلى المعايير الدولية'}] } },
        { type: 'services', data: { heading: 'خدماتنا العلاجية', items: [{title:'طب وجراحة الأسنان',desc:'تجميل وابتسامة هوليوود وزراعة فورية'},{title:'الفحص الشامل',desc:'كشف دوري وتقييم صحي مفصل مع استشارة مجانية'},{title:'الطوارئ على مدار الساعة',desc:'استقبال الحالات الحرجة وتقديم الإسعافات الطبية الفورية'}] } },
        { type: 'testimonials', data: { heading: 'تجارب المراجعين', items: [{name:'أحمد محمود',role:'مراجع دائم',text:'تجربة استثنائية من الاستقبال وحتى انتهاء العلاج، الراحة والاحترافية في أعلى مستوى.'},{name:'سارة علي',role:'مراجعة',text:'أفضل عيادة تعاملت معها، دقة في المواعيد ونتائج علاجية مبهرة بدون أي ألم.'}] } },
        { type: 'contact', data: { heading: 'احجز موعدك اليوم', email: 'care@clinic.com', phone: '+20 100 000 0000', address: 'مصر الجديدة، القاهرة' } },
        { type: 'footer', data: { copyright: `© 2026 ${siteTitle}. جميع الحقوق محفوظة.`, text: 'مدعوم بواسطة SiteFlow AI' } }
      ];
    } else if (indKey === 'food') {
      siteTitle = siteTitle || 'مطعم ومذاق الأصالة';
      heroHeading = 'أشهى المأكولات الطازجة بنكهات لا تُنسى';
      heroDesc = 'نقدم لكم أطباقاً محضرة يومياً بأجود المكونات الطبيعية على أيدي طهاة محترفين لتستمتع بأروع اللحظات مع عائلتك.';
      seoTitle = `${siteTitle} | أشهى الأطباق وقائمة الطعام أونلاين`;
      seoDesc = `استكشف منيو ${siteTitle} واطلب أونلاين أو احجز طاولتك. توصيل سريع ومذاق فريد يناسب جميع الأذواق.`;
      sections = [
        { type: 'hero', data: { heading: heroHeading, description: heroDesc, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80', buttonText: pal.cta, buttonUrl: '#menu' } },
        { type: 'features', data: { heading: 'سر تميزنا', items: [{title:'مكونات طازجة 100%',desc:'لحوم ودواجن وخضروات بلدية طازجة تورد يومياً'},{title:'وصفات سرية مبتكرة',desc:'تتبيلات ونكهات مميزة لن تجدها في مكان آخر'},{title:'توصيل فائق السرعة',desc:'يصلك طلبك ساخناً وطازجاً في أسرع وقت'}] } },
        { type: 'menu', data: { heading: 'أبرز الأطباق الأكثر طلباً', items: [{title:'وجبة الشيف الملكية',desc:'قطع لحم مشوية مع أرز بسمتي وخضار سوتيه',price:'185 ج.م',category:'أطباق رئيسية'},{title:'سلطة البحر المتوسط',desc:'خضار طازج مع جبن فيتا وزيت زيتون بكر',price:'65 ج.م',category:'مقبلات'}] } },
        { type: 'contact', data: { heading: 'تواصل معنا أو احجز طاولتك', email: 'order@restaurant.com', phone: '+20 120 000 0000', address: 'وسط البلد، القاهرة' } },
        { type: 'footer', data: { copyright: `© 2026 ${siteTitle}. جميع الحقوق محفوظة.`, text: 'مدعوم بواسطة SiteFlow AI' } }
      ];
    } else if (indKey === 'fashion') {
      siteTitle = siteTitle || 'بوتيك الأناقة العصرية';
      heroHeading = 'تألق بأحدث صيحات الموضة والإطلالات الفاخرة';
      heroDesc = 'تشكيلات حصرية مصممة بعناية لتمنحك الثقة والجاذبية في كل مناسبة. تسوق أونلاين مع شحن سريع وضمان استبدال.';
      seoTitle = `${siteTitle} | أحدث صيحات الموضة والأزياء العصرية`;
      seoDesc = `تسوق الآن من ${siteTitle}. أرقى الملابس والإكسسوارات العصرية مع شحن سريع لجميع المحافظات ودفع عند الاستلام.`;
      sections = [
        { type: 'hero', data: { heading: heroHeading, description: heroDesc, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80', buttonText: pal.cta, buttonUrl: '#menu' } },
        { type: 'features', data: { heading: 'مميزات التسوق معنا', items: [{title:'خامات قطنية فائقة الجودة',desc:'أقمشة مريحة تدوم طويلاً مع ضمان ثبات الألوان'},{title:'دفع آمن عند الاستلام',desc:'عاين واستلم طلبك بكل ثقة قبل الدفع'},{title:'استرجاع مجاني خلال 14 يوم',desc:'مرونة كاملة في الاستبدال بدون أي تعقيد'}] } },
        { type: 'menu', data: { heading: 'التشكيلة الجديدة الأكثر مبيعاً', items: [{title:'طقم كاجوال أنيق',desc:'إطلالة يومية خفيفة بتصميم عصري راقٍ',price:'550 ج.م',category:'أزياء'},{title:'حقيبة جلدية فاخرة',desc:'تصميم عملي وأنيق يناسب كافة الإطلالات',price:'390 ج.م',category:'إكسسوارات'}] } },
        { type: 'contact', data: { heading: 'خدمة العملاء والطلبات الخاصة', email: 'fashion@boutique.com', phone: '+20 110 000 0000', address: 'سموحة، الإسكندرية' } },
        { type: 'footer', data: { copyright: `© 2026 ${siteTitle}. جميع الحقوق محفوظة.`, text: 'مدعوم بواسطة SiteFlow AI' } }
      ];
    } else {
      // Tech / Company / General
      siteTitle = siteTitle || 'شركة آفاق المستقبل';
      heroHeading = 'حلول ذكية وشاملة لتطوير أعمالك ونمو أرباحك';
      heroDesc = 'نبتكر أحدث الحلول الرقمية والخدمات الاستراتيجية المصممة لتمكين شركتك من الريادة ومضاعفة مبيعاتك بكفاءة عالية.';
      seoTitle = `${siteTitle} | حلول أعمال متطورة وخدمات احترافية`;
      seoDesc = `اكتشف حلول ${siteTitle} المبتكرة. استشارات تقنية، تطوير أعمال، وتكامل رقمي مخصص لمضاعفة نجاح مشروعك.`;
      sections = [
        { type: 'hero', data: { heading: heroHeading, description: heroDesc, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', buttonText: pal.cta, buttonUrl: '#contact' } },
        { type: 'features', data: { heading: 'حلول متكاملة تقودك نحو القمة', items: [{title:'سرعة تنفيذ استثنائية',desc:'إطلاق مشاريعك وفق جداول زمنية محددة بدقة فائقة'},{title:'أمان وموثوقية عالية',desc:'حماية بياناتك واستمرارية خدماتك على مدار الساعة'},{title:'دعم فني استشاري دائم',desc:'فريق متخصص يرافقك خطوة بخطوة لتحقيق أهدافك'}] } },
        { type: 'services', data: { heading: 'خدماتنا الرئيسية', items: [{title:'التحول الرقمي',desc:'بناء منصات ومواقع عصرية متوافقة مع كل الأجهزة'},{title:'التسويق ونمو المبيعات',desc:'استراتيجيات SEO وحملات تسويقية تستهدف عملاءك بدقة'},{title:'الاستشارات التشغيلية',desc:'تحسين كفاءة العمليات وخفض التكاليف التشغيلية'}] } },
        { type: 'testimonials', data: { heading: 'ماذا يقول عملاؤنا؟', items: [{name:'م. طارق يوسف',role:'مدير تنفيذي',text:'نقلة نوعية في سرعة أعمالنا، فريق SiteFlow متميز وملتزم بأعلى المعايير.'},{name:'نورا فهد',role:'رائدة أعمال',text:'أفضل استثمار قمنا به، الدعم المستمر والتنفيذ الدقيق ساعدنا في مضاعفة عملائنا.'}] } },
        { type: 'contact', data: { heading: 'تحدث مع خبرائنا الآن', email: 'info@enterprise.com', phone: '+20 100 123 4567', address: 'التجمع الخامس، القاهرة' } },
        { type: 'footer', data: { copyright: `© 2026 ${siteTitle}. جميع الحقوق محفوظة.`, text: 'مدعوم بواسطة SiteFlow AI' } }
      ];
    }

    return {
      title: siteTitle,
      industry: pal.name,
      theme: { color: pal.primary, font: pal.font },
      seo: { title: seoTitle, description: seoDesc },
      sections: sections
    };
  },

  // توليد نصوص تسويقية مخصصة (Copywriting)
  generateCopy(type, topic) {
    const t = (topic || 'خدماتنا').trim();
    if (type === 'hero') {
      return {
        heading: `الخيار الأول في ${t} مع نتائج مضمونة`,
        description: `نساعدك على تحقيق أهدافك بأعلى جودة وأفضل قيمة من خلال خدمات ${t} الاحترافية والمخصصة لك بالكامل.`
      };
    }
    if (type === 'about') {
      return {
        heading: `من نحن ورؤيتنا في ${t}`,
        content: `نحن فريق شغوف ومتخصص في تقديم أرقى معايير الجودة في مجال ${t}. بدأنا رحلتنا بهدف واضح: تحويل احتياجات عملائنا إلى نجاحات ملموسة عبر الابتكار، الشفافية، والالتزام بأعلى المعايير المهنية.`
      };
    }
    return {
      heading: `تواصل معنا بخصوص ${t}`,
      description: 'فريقنا جاهز للرد على كافة استفساراتكم وتقديم الدعم الفني الفوري.'
    };
  },

  // تحسين SEO الذكي (AI SEO Optimizer)
  generateSeo(page) {
    const title = page.title || 'موقعي';
    const ind = this.detectIndustry(title + ' ' + (page.sections?.map(s=>s.data?.heading||'').join(' ')));
    
    let seoTitle = `${title} | أفضل الخدمات والحلول المعتمدة`;
    if (seoTitle.length > 60) seoTitle = seoTitle.slice(0, 58) + '..';

    let seoDesc = `موقع ${title} الرسمي: نقدم لكم أرقى الخدمات المتخصصة بأعلى معايير الجودة والاحترافية. تواصل معنا اليوم واستفد من العروض الحصرية.`;
    if (seoDesc.length > 160) seoDesc = seoDesc.slice(0, 157) + '...';

    return {
      title: seoTitle,
      description: seoDesc,
      score: 96,
      keywords: ['خدمات ' + title, 'عروض ' + title, 'حجز اونلاين', 'افضل الاسعار']
    };
  },

  // الرد الذكي للـ Chatbot المدمج في الموقع للزوار
  generateChatbotResponse(page, query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) return 'مرحباً بك! كيف يمكنني مساعدتك بخصوص ' + page.title + ' اليوم؟ 😊';

    // البحث في أقسام الموقع لاستخراج الإجابة الدقيقة
    const contactSec = page.sections?.find(s => s.type === 'contact' || s.type === 'location');
    const menuSec = page.sections?.find(s => s.type === 'menu' || s.type === 'pricing');
    const servSec = page.sections?.find(s => s.type === 'services' || s.type === 'features');

    if (/سعر|اسعار|أسعار|بكام|تكلفة|اشتراك/i.test(q)) {
      if (menuSec && menuSec.data?.items?.length) {
        const topItems = menuSec.data.items.slice(0, 3).map(i => `• ${i.title}: ${i.price || 'تواصل معنا'}`).join('\n');
        return `إليك أبرز أسعارنا في ${page.title}:\n${topItems}\n\nيمكنك الطلب أو الحجز المباشر الآن!`;
      }
      return `نقدم باقات وأسعار تنافسية تبدأ من أفضل الأسعار بالسوق. يرجى التواصل معنا عبر الهاتف أو البريد للحصول على عرض سعر فوري مخصص لك.`;
    }

    if (/عنوان|مكان|فين|موقعكم|شارع|فرع/i.test(q)) {
      const addr = contactSec?.data?.address || 'مقرنا الرئيسي في القاهرة، مصر';
      return `يشرفنا زيارتكم! عنواننا:\n📍 ${addr}`;
    }

    if (/رقم|تليفون|هاتف|تواصل|موبايل|واتساب|ايميل|بريد/i.test(q)) {
      const phone = contactSec?.data?.phone || '+20 100 000 0000';
      const email = contactSec?.data?.email || 'contact@mysite.com';
      return `يمكنك التواصل معنا مباشرة عبر:\n📞 هاتف: ${phone}\n✉️ بريد: ${email}\nأو ترك رسالتك في نموذج التواصل وسنرد خلال دقائق!`;
    }

    if (/خدم|منتج|بتعملوا|ايه بتعمل|تفاصيل/i.test(q)) {
      if (servSec && servSec.data?.items?.length) {
        const servs = servSec.data.items.slice(0, 3).map(i => `• ${i.title}: ${i.desc}`).join('\n');
        return `نقدم في ${page.title} مجموعة من الخدمات الاحترافية، منها:\n${servs}`;
      }
      return `${page.title} يقدم حلولاً وخدمات متكاملة بجودة عالية تضمن لك أفضل تجربة.`;
    }

    return `أهلاً بك في ${page.title}! يسعدني الإجابة على استفساراتك حول خدماتنا، أوقات العمل، أو الأسعار. يمكنك أيضاً حجز موعدك أو طلبك مباشرة.`;
  },

  // تصدير الموقع كاملاً إلى ملف HTML قائم بذاته
  exportStandaloneHtml(page) {
    const t = page.theme || { color: '#6366f1', font: 'Cairo' };
    const renderedContent = typeof T !== 'undefined' ? T.publicPage(page) : '';

    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.seo?.title || page.title}</title>
  <meta name="description" content="${page.seo?.description || ''}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Tajawal:wght@400;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    :root { --p-color: ${t.color}; --p-font: '${t.font}', sans-serif; --gray-50: #f8fafc; --gray-100: #f1f5f9; --gray-200: #e2e8f0; --gray-400: #94a3b8; --gray-500: #64748b; --gray-800: #1e293b; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--p-font); background: #ffffff; color: var(--gray-800); line-height: 1.6; }
    .public-page { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .public-nav { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; border-bottom: 1px solid var(--gray-200); }
    .public-nav .brand { font-size: 1.5rem; font-weight: 800; color: var(--p-color); }
    .editable-section { padding: 60px 0; border-bottom: 1px solid #f1f5f9; }
    .hero-section { text-align: center; padding: 80px 20px; border-radius: 24px; margin: 30px 0; }
    .hero-section h1 { font-size: 2.5rem; margin-bottom: 16px; line-height: 1.3; }
    .hero-section p { font-size: 1.2rem; color: var(--gray-500); max-width: 680px; margin: 0 auto; }
    .services-grid, .gallery-grid, .testimonials-grid, .pricing-grid, .counters-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-top: 32px; }
    .service-card, .pricing-card, .testimonial-card, .counter-card { background: #ffffff; border: 1px solid var(--gray-200); border-radius: 16px; padding: 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
    .service-card h3 { font-size: 1.2rem; margin-bottom: 8px; color: var(--p-color); }
    .pricing-card .price { font-size: 2rem; font-weight: 800; color: var(--p-color); margin: 12px 0; }
    .btn { display: inline-block; padding: 12px 28px; border-radius: 12px; font-weight: 700; text-decoration: none; cursor: pointer; border: none; }
    .footer-section { background: #0f172a; color: #94a3b8; text-align: center; padding: 40px 20px; border-radius: 20px 20px 0 0; margin-top: 60px; }
    @media (max-width: 768px) { .hero-section h1 { font-size: 1.8rem; } }
  </style>
</head>
<body>
  ${renderedContent}
</body>
</html>`;
  }
};

window.SiteFlowAI = SiteFlowAI;
