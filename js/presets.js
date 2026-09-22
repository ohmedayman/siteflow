/**
 * Site Flow — Templates & Presets for site creation wizard (Arabic & English)
 */
const PRESETS = [
  {
    id: 'arabic_store', name: 'متجر إلكتروني حديث', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="40" height="40"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>', category: 'business',
    desc: 'موقع متجر متكامل لعرض المنتجات واستقبال الطلبات فوراً',
    sections: [
      { type: 'hero', data: { heading: 'أحدث التشكيلات العصرية بين يديك', description: 'تسوق أفضل المنتجات عالية الجودة مع شحن سريع لجميع المحافظات والدفع عند الاستلام.', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80', buttonText: 'تسوق الآن', buttonUrl: '#menu' } },
      { type: 'features', data: { heading: 'لماذا تشتري من متجرنا؟', items: [{title:'شحن سريع ومضمون',desc:'توصيل خلال 24-48 ساعة لكل المدن'},{title:'دفع عند الاستلام',desc:'ادفع بعد معاينة واستلام طلبك بنفسك'},{title:'ضمان الاستبدال',desc:'إرجاع واستبدال مجاني خلال 14 يوماً'}] } },
      { type: 'menu', data: { heading: 'أبرز المنتجات الأكثر مبيعاً', items: [{title:'ساعة ذكية مقاومة للماء',desc:'شاشة AMOLED مع تتبع النبض والأنشطة',price:'899 ج.م',category:'إلكترونيات'},{title:'سماعات لاسلكية عازلة للصوت',desc:'بطارية تدوم 30 ساعة صوت نقي جدًا',price:'650 ج.م',category:'إلكترونيات'},{title:'حقيبة ظهر فاخرة للمحمول',desc:'خامة عالية الجودة مقاومة للماء',price:'450 ج.م',category:'إكسسوارات'},{title:'نظارة شمسية كلاسيكية',desc:'حماية 100% من الأشعة فوق البنفسجية',price:'320 ج.م',category:'إكسسوارات'}] } },
      { type: 'testimonials', data: { heading: 'ماذا يقول عملاؤنا؟', items: [{name:'محمد العبدالله',text:'سرعة في التوصيل والجودة ممتازة جداً مثل الصور تماماً.',role:'عميل موثق'},{name:'سارة سعيد',text:'خدمة عملاء راقية واستبدال سريع، تجربة شراء رائعة!',role:'عميل موثق'}] } },
      { type: 'contact', data: { heading: 'طلب خاص أو استفسار؟', email: 'sales@mystore.com', phone: '+20 100 123 4567', address: 'القاهرة، مصر' } },
      { type: 'footer', data: { copyright: '© 2026 جميع الحقوق محفوظة لمتجرنا.', text: 'صنع بحب عبر SiteFlow' } }
    ],
    theme: { color: '#6366f1', font: 'Cairo' },
    seo: { title: 'متجرنا الإلكتروني | أفضل المنتجات العصرية', description: 'متجر إلكتروني شامل يوفر أحدث المنتجات وشحن سريع لجميع المدن.' }
  },
  {
    id: 'arabic_company', name: 'شركة أو مؤسسة تجارية', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="40" height="40"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="10" y2="6"/><line x1="14" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/></svg>', category: 'business',
    desc: 'موقع تعريفي احترافي للشركات واستعراض الخدمات والمشروعات',
    sections: [
      { type: 'hero', data: { heading: 'نبتكر الحلول الرقمية لتنمية أعمالك', description: 'نساعد الشركات والمؤسسات على التحول الرقمي وزيادة الأرباح باحترافية عالية.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', buttonText: 'تواصل معنا الآن', buttonUrl: '#contact' } },
      { type: 'about', data: { heading: 'من نحن', content: 'نحن شركة رائدة في تقديم الاستشارات والحلول البرمجية منذ أكثر من 8 سنوات. نبتكر استراتيجيات حديثة تساعد المؤسسات على تحقيق النمو المستدام.' } },
      { type: 'services', data: { heading: 'خدماتنا المتميزة', items: [{title:'تطوير البرمجيات',desc:'تطبيقات ومواقع مخصصة تناسب احتياج عملك'},{title:'التسويق الرقمي',desc:'حمّلات إعلانية موجهة تحقق أعلى عائد استثمار'},{title:'الاستشارات الإدارية',desc:'تحسين كفاءة العمليات وهيكلة المؤسسات'}] } },
      { type: 'counters', data: { heading: 'إنجازاتنا بالأرقام', items: [{number:'+350',label:'مشروع مكتمل'},{number:'+120',label:'عميل سعيد'},{number:'+10',label:'سنوات خبرة'},{number:'99%',label:'نسبة الرضا'}] } },
      { type: 'testimonials', data: { heading: 'آراء شركاء النجاح', items: [{name:'م. خالد المنصور',text:'تعامل راقٍ ونتائج ملموسة أثرت بشكل مباشر في أرباح شركتنا.',role:'الرئيس التنفيذي، شركة أفق'},{name:'د. رانيا فهمي',text:'فريق احترافي يلتزم بالمواعيد ويقدم حلول مبتكرة فعلاً.',role:'مديرة التسويق، جروب نكسست'}] } },
      { type: 'contact', data: { heading: 'احجز جلسة استشارية مجانية', email: 'info@company.com', phone: '+20 102 987 6543', address: 'الرياض / القاهرة' } },
      { type: 'footer', data: { copyright: '© 2026 جميع الحقوق محفوظة.', text: 'تم التطوير بواسطة SiteFlow' } }
    ],
    theme: { color: '#059669', font: 'Tajawal' },
    seo: { title: 'شركة الحلول الرقمية | نمو وتطوير الأعمال', description: 'نقدم استشارات وتطوير برمجيات وتسويق رقمي للشركات.' }
  },
  {
    id: 'arabic_portfolio', name: 'معرض أعمال شخصي (Portfolio)', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="40" height="40"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>', category: 'personal',
    desc: 'صفحة شخصية لاستعراض المهارات والسيرة الذاتية والأعمال',
    sections: [
      { type: 'hero', data: { heading: 'أهلاً بك، أنا أحمد أيمن', description: 'مصمم ومطور تطبيقات ومواقع جافاسكربت وUI/UX. أصمم تجارب مستخدم مميزة وتفاعلية.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', buttonText: 'شاهد أعمالي', buttonUrl: '#portfolio' } },
      { type: 'about', data: { heading: 'نبذة عني', content: 'مطور واجهات ومصمم تجربة مستخدم بخبرة تتجاوز 5 سنوات في بناء المنصات والتطبيقات الحديثة. شغوف بالتفاصيل والتصاميم الراقية.' } },
      { type: 'services', data: { heading: 'ماذا أقدم؟', items: [{title:'تصميم مواقع وتطبيقات',desc:'تصاميم واجهة مستخدم ناعمة وسريعة التجاوب'},{title:'برمجة Frontend',desc:'كود نظيف باستخدام React و Vue و Vanilla JS'},{title:'تحسين أداء المواقع',desc:'تسريع التحميل وصديق لمحركات البحث SEO'}] } },
      { type: 'portfolio', data: { heading: 'معرض الأعمال السابقة', items: [{title:'منصة متجر إلكتروني',desc:'تصميم وتطوير موقع متكامل',image:''},{title:'تطبيق حجز عيادات',desc:'واجهة مستخدم عصرية وسلسة',image:''},{title:'موقع شركة مقاولات',desc:'تصميم هادئ وجذاب مع لوحة تحكم',image:''}] } },
      { type: 'contact', data: { heading: 'تواصل معي للعمل معاً', email: 'ahmed@domain.com', phone: '+20 111 222 3333', address: 'مصر' } },
      { type: 'footer', data: { copyright: '© 2026 أحمد أيمن.', text: 'مدعوم بواسطة SiteFlow' } }
    ],
    theme: { color: '#8b5cf6', font: 'Cairo' },
    seo: { title: 'أحمد أيمن | مصمم ومطور مواقع', description: 'معرض الأعمال الشخصية والسيرة الذاتية للمطور أحمد أيمن.' }
  },
  {
    id: 'arabic_restaurant', name: 'مطعم أو كافيه (Menu & Delivery)', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="40" height="40"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>', category: 'food',
    desc: 'منيو إلكتروني جذاب للمأكولات وحجز الطاولات',
    sections: [
      { type: 'hero', data: { heading: 'طعم أصيل وتجربة لا تُنسى', description: 'أشهى المأكولات المشوية والأطباق الغربية بإعداد أمهر الطهاة ومكونات طازجة يومياً.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80', buttonText: 'استعرض المنيو', buttonUrl: '#menu' } },
      { type: 'about', data: { heading: 'قصتنا', content: 'بدأنا عام 2018 بتقديم وصفات عائلية مميزة. نضمن لك جودة عالية في كل طبق وتجربة طعام دافئة وممتعة.' } },
      { type: 'menu', data: { heading: 'منيو الطعام والمشروبات', items: [{title:'ستيك ريب آي مشوي',desc:'قطعة لحم بقر طازجة مع صوص المشروم',price:'380 ج.م',category:'الأطباق الرئيسية'},{title:'برجر دبل تشيز مكسيكي',desc:'لحم بلدي مع جبنة شيدر وصوص حار',price:'180 ج.م',category:'الأطباق الرئيسية'},{title:'سلطة سيزر بالدجاج',desc:'خس طازج، جبن بارميزان وقطع دجاج',price:'110 ج.م',category:'المقبلات'},{title:'مولتن كيك مع أيس كريم',desc:'شوكولاتة سائلة مع فانيليا طازجة',price:'95 ج.م',category:'الحلويات'}] } },
      { type: 'location', data: { heading: 'زورونا في موقعنا', address: 'شارع التحرير، الدقي، الجيزة', phone: '+20 123 456 7890', hours: 'يومياً من 12 ظهراً حتى 12 منتصف الليل' } },
      { type: 'contact', data: { heading: 'حجز طاولة أو توصيل طلبات', email: 'orders@restaurant.com', phone: '+20 123 456 7890', address: 'الجيزة' } },
      { type: 'footer', data: { copyright: '© 2026 جميع الحقوق محفوظة للمطعم.', text: 'SiteFlow' } }
    ],
    theme: { color: '#dc2626', font: 'Cairo' },
    seo: { title: 'مطعم المذاق الشهي | أفضل الوجبات والمنيو', description: 'منيو طعام طازج ولذيذ مع خدمة التوصيل وحجز الطاولات.' }
  },
  {
    id: 'arabic_clinic', name: 'عيادة طبية ومجمع تجميل', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="40" height="40"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>', category: 'health',
    desc: 'موقع متكامل للأطباء والمراكز الطبية مع خدمة الكشف وحجز المواعيد',
    sections: [
      { type: 'hero', data: { heading: 'رعايتك الصحية والجمالية بأعلى معايير الأمان', description: 'أحدث التقنيات الطبية وأبرز الاستشاريين المتخصصين لتقديم أفضل تجربة علاج وتجميل.', image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80', buttonText: 'احجز موعد كشف', buttonUrl: '#contact' } },
      { type: 'features', data: { heading: 'لماذا تختار مركزنا؟', items: [{title:'استشاريون متكافئون',desc:'نخبة من أطباء الجامعات والزمالة الدولية'},{title:'تعقيم وتجهيز متطور',desc:'أحدث الأجهزة الألمانية والأمريكية المعتمدة'},{title:'مواعيد دقيقة',desc:'بدون انتظار طويل مع متابعة دورية'}] } },
      { type: 'services', data: { heading: 'الأقسام والخدمات التخصصية', items: [{title:'جلدية وتجميل بالليزر',desc:'شد الوجه وعلاج البشرة بأحدث التقنيات'},{title:'زراعة وتجميل الأسنان',desc:'ابتسامة هوليود وتبييض وتنظيف الأسنان'},{title:'الفحوصات الطبية الشاملة',desc:'تحاليل كاملة وتشخيص دقيق تحت إشراف طبي'}] } },
      { type: 'counters', data: { heading: 'أرقام وإنجازات', items: [{number:'+15,000',label:'حالة ناجحة'},{number:'25+',label:'طبيب طبيب استشاري'},{number:'100%',label:'معايير تعقيم'}] } },
      { type: 'contact', data: { heading: 'احجز كشفك الآن بسهولة', email: 'clinic@care.com', phone: '+20 100 888 9999', address: 'القاهرة / الشيخ زايد' } },
      { type: 'footer', data: { copyright: '© 2026 جميع الحقوق محفوظة للعيادة الطبية.', text: 'SiteFlow Health' } }
    ],
    theme: { color: '#0284c7', font: 'Tajawal' },
    seo: { title: 'المركز الطبي التخصصي | رعاية وتجميل', description: 'أفضل مركز طبي وتجميلي لتقديم خدمات علاجية وفحوصات شاملة.' }
  },
  {
    id: 'arabic_realestate', name: 'شركة تطوير عقاري واستثمار', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="40" height="40"><path d="M3 21h18"/><path d="M5 21V7l8-4 8 4v14"/><path d="M9 18h2v-4H9v4z"/></svg>', category: 'realestate',
    desc: 'موقع استثمار عقاري فاخر للشركات والمطورين واستعراض المشروعات',
    sections: [
      { type: 'hero', data: { heading: 'امتلك وحدتك الفاخرة في أرقى المجمعات السكنية', description: 'شقق وفلل ومكاتب إدارية في أفضل المواقع الاستراتيجية بأسهل أنظمة سداد حتى 10 سنوات.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', buttonText: 'استكشف مشاريعنا', buttonUrl: '#portfolio' } },
      { type: 'features', data: { heading: 'مزايا الاستثمار معنا', items: [{title:'مواقع استراتيجية',desc:'بالقرب من أهم المحاور والخدمات الرئيسية'},{title:'أنظمة سداد ميسرة',desc:'مقدم 10% وأقساط مريحة تصل إلى 120 شهراً'},{title:'تشطيبات سوبر لوكس',desc:'تصاميم معمارية حديثة بأعلى خامات الجودة'}] } },
      { type: 'portfolio', data: { heading: 'أبرز المشاريع الحالية', items: [{title:'كمبوند الفخامة السكني',desc:'فلل وشقق مطلة على مساحات خضراء',image:''},{title:'برج العاصمة الإداري',desc:'مكاتب ومحلات تجارية بقلب المنطقة المركزية',image:''},{title:'منتجع الساحل الذهبي',desc:'شاليهات صف أول على البحر مباشرة',image:''}] } },
      { type: 'contact', data: { heading: 'تواصل مع مستشار عقاري الآن', email: 'invest@realestate.com', phone: '+20 120 777 6666', address: 'القاهرة الجديدة، مصر' } },
      { type: 'footer', data: { copyright: '© 2026 جميع الحقوق محفوظة لشركة التطوير العقاري.', text: 'SiteFlow Real Estate' } }
    ],
    theme: { color: '#0f766e', font: 'Cairo' },
    seo: { title: 'مجموعة التطوير العقاري | وحدات سكنية وتجارية', description: 'استثمر في أرقى الشقق والفلل والمكاتب الإدارية بأفضل أنظمة سداد.' }
  },
  {
    id: 'arabic_lawyer', name: 'مكتب محاماة واستشارات قانونية', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="40" height="40"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/></svg>', category: 'legal',
    desc: 'موقع رسمي للمحامين والمكاتب القانونية وحجز الاستشارات',
    sections: [
      { type: 'hero', data: { heading: 'حماية حقوقك ودعم مصالحك بأعلى احترافية', description: 'خبرة طويلة في القضايا التجارية، الاستثمارية، وصياغة العقود وتأسيس الشركات.', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80', buttonText: 'طلب استشارة قانونية', buttonUrl: '#contact' } },
      { type: 'services', data: { heading: 'مجالات الاختصاص', items: [{title:'القضايا التجارية والاستثمار',desc:'تأسيس الشركات وحل النزاعات المالية والعقود'},{title:'صياغة وتوثيق العقود',desc:'مراجعة العقود المحلية والدولية لضمان حقوقك'},{title:'المحاماة والترافع',desc:'تمثيل قانوني قوي أمام كافة المحاكم والجهات'}] } },
      { type: 'counters', data: { heading: 'خبرة وقوة قانونية', items: [{number:'+18',label:'عاما من الخبرة'},{number:'98%',label:'نسبة نجاح القضايا'},{number:'+500',label:'شركة ومؤسسة'}] } },
      { type: 'contact', data: { heading: 'حجز موعد استشارة سرية', email: 'law@lawyer.com', phone: '+20 101 112 2334', address: 'وسط البلد، القاهرة' } },
      { type: 'footer', data: { copyright: '© 2026 جميع الحقوق محفوظة لمكتب الاستشارات القانونية.', text: 'SiteFlow Legal' } }
    ],
    theme: { color: '#1e293b', font: 'Tajawal' },
    seo: { title: 'مكتب الاستشارات القانونية | محامون متخصصون', description: 'نقدم استشارات قانونية متميزة في كافة القضايا وتأسيس الشركات.' }
  },
  {
    id: 'arabic_gym', name: 'مركز لياقة بدنية وجيم (FitGym)', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="40" height="40"><path d="M6 5v14M18 5v14M3 8h18M3 16h18"/></svg>', category: 'fitness',
    desc: 'صفحة رياضية عصرية للاشتراكات والتدريب الشخصي',
    sections: [
      { type: 'hero', data: { heading: 'غير جسمك وحياتك مع أفضل المدربين', description: 'أجهزة حديثة، برامج تغذية مخصصة، وجو حماسي يضمن لك الوصول لهدفك الرياضي.', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80', buttonText: 'اشترك الآن بخصم 30%', buttonUrl: '#pricing' } },
      { type: 'services', data: { heading: 'البرامج التدريبية', items: [{title:'تدريب شخصي VIP',desc:'مدرب خاص يتابع تمرينك ونظامك الغذائي يومياً'},{title:'كلاسات الكروس فيت',desc:'تمارين لياقة عالية الشدة لحرق الدهون الكلية'},{title:'قسم الاستشفاء والسبا',desc:'سونا وجاكوزي ومساج مخصص للاستشفاء العضلي'}] } },
      { type: 'pricing', data: { heading: 'اشتراكات النادي', plans: [{name:'الاشتراك الشهري',price:'600 ج.م',features:['دخول كلي الصالة','حصة تدريب مجانية','مواعيد مفتوحة']},{name:'اشتراك 6 أشهر',price:'2,800 ج.م',features:['خصم 20%','إنودي قياس دهون شهري','مرافق مجاني 3 مرات']},{name:'الاشتراك السنوي',price:'4,500 ج.م',features:['خصم 40%','دخول سونا وتأهيل','تجميد اشتراك 60 يوماً']}] } },
      { type: 'contact', data: { heading: 'احجز حصة تجريبية مجاناً', email: 'fit@gym.com', phone: '+20 115 444 3333', address: 'المعادي، القاهرة' } },
      { type: 'footer', data: { copyright: '© 2026 جميع الحقوق محفوظة لـ FitGym.', text: 'SiteFlow Fitness' } }
    ],
    theme: { color: '#ea580c', font: 'Cairo' },
    seo: { title: 'نادي FitGym | أفضل جيم ولياقة بدنية', description: 'اشترك الآن في أحدث جيم مع مدربين محترفين وأحدث الأجهزة.' }
  },
  {
    id: 'arabic_academy', name: 'أكاديمية تدريب وكورسات', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="40" height="40"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>', category: 'education',
    desc: 'منصة تعليمية لعرض الكورسات والدبلومات والتسجيل فيها',
    sections: [
      { type: 'hero', data: { heading: 'تعلم مهارات المطلوبة واستعد لسوق العمل', description: 'دورات تدريبية تطبيقية في البرمجة والتصميم والتسويق مع شهادات معتمدة.', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80', buttonText: 'تصفح الكورسات', buttonUrl: '#services' } },
      { type: 'services', data: { heading: 'أبرز الدبلومات المتاحة', items: [{title:'دبلومة البرمجة والذكاء الاصطناعي',desc:'تعلم Full-Stack وبناء تطبيقات الذكاء الاصطناعي'},{title:'التسويق الرقمي والتجارة الإلكترونية',desc:'إدارة الحملات الإعلانية ومتاجر Shopify وWoocommerce'},{title:'تصميم الواجهات UI/UX',desc:'احتراف Figma وبناء منصات وسلسلة تجارب مستخدم'}] } },
      { type: 'counters', data: { heading: 'أكاديميتنا بالأرقام', items: [{number:'+12,000',label:'طالب ومتدرب'},{number:'45+',label:'كورس ودبلومة'},{number:'95%',label:'نسبة توظيف المخرجات'}] } },
      { type: 'contact', data: { heading: 'سجل بياناتك للتواصل والالتحاق', email: 'learn@academy.com', phone: '+20 106 555 4444', address: 'مدينة نصر، القاهرة' } },
      { type: 'footer', data: { copyright: '© 2026 جميع الحقوق محفوظة للأكاديمية.', text: 'SiteFlow Academy' } }
    ],
    theme: { color: '#2563eb', font: 'Tajawal' },
    seo: { title: 'أكاديمية التدريب | دورات وبرمجة وتسويق', description: 'احصل على شهادات معتمدة وتدريب عملي في مجالات التكنولوجيا والأعمال.' }
  },
  {
    id: 'arabic_saas', name: 'منصة وتطبيق ذكي (SaaS Startup)', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="40" height="40"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>', category: 'tech',
    desc: 'موقع تعريفي لتطبيق إلكتروني أو منصة سحابية مع خطط الاشتراك',
    sections: [
      { type: 'hero', data: { heading: 'أدر أعمالك ومبيعاتك التلقائية في مكان واحد', description: 'منصة سحابية متكاملة لربط المبيعات وتتبع الطلبات وإدارة الفواتير بذكاء اصطناعي.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', buttonText: 'جرب المنصة مجاناً', buttonUrl: '#pricing' } },
      { type: 'features', data: { heading: 'مزايا البرامج', items: [{title:'ربط فوري وحظي',desc:'مزامنة تلقائية مع جميع منصات الدفع والتوصيل'},{title:'تحليلات وتقارير ذكية',desc:'لوحة تحكم تبين أرباحك وتوقعات نمو العمل'},{title:'دعم فني 24/7',desc:'فريق متخصص لمساعدتك في التكافؤ والضبط'}] } },
      { type: 'pricing', data: { heading: 'خطط الاشتراك السحابي', plans: [{name:'الخطة الأساسية',price:'199 ج.م / شهر',features:['حتى 500 طلب','مستخدم واحد','دعم عبر البريد']},{name:'خطة المحترفين',price:'499 ج.م / شهر',features:['طلبات غير محدودة','5 مستخدمين','تكامل واتساب ودفع']},{name:'خطة المؤسسات',price:'999 ج.م / شهر',features:['سيرفر مخصص','مستخدمين بلا حدود','مدير حساب مخصص']}] } },
      { type: 'contact', data: { heading: 'طلب عرض تجريبي خاص (Demo)', email: 'saas@tech.com', phone: '+20 100 000 1111', address: 'القاهرة' } },
      { type: 'footer', data: { copyright: '© 2026 جميع الحقوق محفوظة للمنصة.', text: 'SiteFlow SaaS' } }
    ],
    theme: { color: '#6366f1', font: 'Cairo' },
    seo: { title: 'المنصة السحابية الذكية | إدارة المبيعات والأعمال', description: 'منصة سحابية لأتمتة أعمالك وإدارة الطلبات والعملاء بكل سهولة.' }
  }
];
