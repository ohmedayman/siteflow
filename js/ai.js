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
  }
};

window.SiteFlowAI = SiteFlowAI;
