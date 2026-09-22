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
  }
];
