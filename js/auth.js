/**
 * Site Flow — Auth + i18n
 */
const Auth = {
  user: null,
  lang: 'ar',

  async init() {
    this.lang = localStorage.getItem('sf_lang') || (navigator.language.startsWith('ar') ? 'ar' : 'en')
    // Check URL for OAuth redirect (if Supabase session in URL)
    const hash = window.location.hash
    if (hash.includes('access_token') || hash.includes('type=signup') || hash.includes('type=recovery')) {
      if (typeof SB !== 'undefined') {
        await SB.init()
        setTimeout(() => { window.location.hash = '#/dashboard'; window.location.reload() }, 1000)
      }
      return
    }
    if (API.token) {
      try { this.user = await API.getMe() } catch { this.user = null }
    }
    this._ui()
  },

  async login(email, password) {
    const r = await API.login(email, password)
    this.user = r.user
    this._ui()
    API.syncToBackend()
    return r
  },

  async signup(name, email, password) {
    const r = await API.signup(name, email, password)
    if (!r.requiresVerification) {
      this.user = r.user
      this._ui()
      API.syncToBackend()
    }
    return r
  },

  async verifyOtp(email, token) {
    const r = await API.verifyOtp(email, token)
    this.user = r.user
    this._ui()
    API.syncToBackend()
    return r
  },

  async resendOtp(email) {
    return await API.resendOtp(email)
  },

  async googleLogin() {
    try {
      await API.googleLogin()
      // For OAuth redirect, page will reload
      if (SB.isReady()) {
        // Check if already have session after redirect
        const s = SB.getSession()
        if (s?.data?.session) {
          this.user = { id: s.data.session.user.id, name: s.data.session.user.email, email: s.data.session.user.email, plan: 'free', lang: 'en', isAdmin: false }
          this._ui()
          Router.navigate('dashboard')
          return
        }
      }
      // Fallback for localStorage mode
      Toast.show('Signed in with Google (demo)', 'success')
      Router.navigate('dashboard')
    } catch(e) { Toast.show(e.message, 'error') }
  },

  logout() {
    API.logout(); this.user = null; this._ui();
    Toast.show('تم تسجيل الخروج بنجاح', 'info');
    Router.navigate('');
  },

  isLoggedIn() { return !!this.user },
  isAdmin() { return this.user?.isAdmin || false },

  requireAuth() {
    if (!this.isLoggedIn()) {
      Toast.show('يرجى تسجيل الدخول أو إنشاء حساب للوصول إلى لوحة التحكم', 'info');
      Router.navigate('login');
      return false;
    }
    return true;
  },

  setLang(code) { this.lang = code; localStorage.setItem('sf_lang', code) },

  t(key, fallback) {
    const dict = {
      en: {
        my_sites:'My Sites', new_site:'New Site', logout:'Logout', publish:'Publish',
        preview:'Preview', delete:'Delete', edit:'Edit', no_sites:'No sites yet',
        create_first:'Create your first website and publish it to the world.',
        upgrade:'Upgrade', settings:'Settings', save:'Save Changes', cancel:'Cancel',
        published:'Published', draft:'Draft', views:'Views', total_sites:'Total Sites',
        billing:'Billing', plans:'Pricing', help:'Help Center', about:'About Us',
        privacy:'Privacy Policy', pricing:'Pricing', login:'Sign In', signup:'Create Account',
        google:'Continue with Google', choose_template:'Choose a Template',
        start_blank:'Start Blank', templates:'Templates', editor:'Editor',
        free:'Free', basic:'Basic', pro:'Pro', business:'Business',
        monthly:'/mo', yearly:'/year', subscribe:'Subscribe', current_plan:'Current Plan'
      },
      ar: {
        my_sites:'مواقعي', new_site:'موقع جديد', logout:'تسجيل الخروج', publish:'نشر',
        preview:'معاينة', delete:'حذف', edit:'تعديل', no_sites:'لا توجد مواقع بعد',
        create_first:'أنشئ موقعك الأول وانشره للعالم.',
        upgrade:'ترقية', settings:'الإعدادات', save:'حفظ التغييرات', cancel:'إلغاء',
        published:'منشور', draft:'مسودة', views:'مشاهدات', total_sites:'إجمالي المواقع',
        billing:'الفواتير', plans:'الأسعار', help:'مركز المساعدة', about:'من نحن',
        privacy:'سياسة الخصوصية', pricing:'الأسعار', login:'تسجيل الدخول', signup:'إنشاء حساب',
        google:'متابعة بجوجل', choose_template:'اختر قالبًا', start_blank:'ابدأ من الصفر',
        templates:'القوالب', editor:'المحرر',
        free:'مجاني', basic:'أساسي', pro:'احترافي', business:'بيزنس',
        monthly:'/شهرياً', yearly:'/سنوياً', subscribe:'اشترك', current_plan:'الخطة الحالية'
      }
    }
    return (dict[this.lang]||dict.en)[key] || fallback || key
  },

  dir() { return this.lang === 'ar' ? 'rtl' : 'ltr' },

  _ui() {
    const isLogged = !!this.user
    document.querySelectorAll('.js-auth-user').forEach(el => el.classList.toggle('hidden', !isLogged))
    document.querySelectorAll('.js-auth-guest').forEach(el => el.classList.toggle('hidden', isLogged))

    if (this.user) {
      const name = this.user.name || this.user.email?.split('@')[0] || 'المستخدم'
      const initial = (name.trim()[0] || 'م').toUpperCase()
      const email = this.user.email || ''
      const planName = (this.user.plan === 'pro' ? 'باقة احترافية' : (this.user.plan === 'business' ? 'باقة بيزنس' : 'باقة مجانية'))

      document.querySelectorAll('.js-user-name').forEach(el => { el.textContent = name })
      document.querySelectorAll('.js-user-email').forEach(el => { el.textContent = email })
      document.querySelectorAll('.js-user-initial').forEach(el => { el.textContent = initial })
      document.querySelectorAll('.js-user-plan').forEach(el => { el.textContent = planName })

      if (typeof Notif !== 'undefined') {
        Notif.init()
      }
    }

    document.documentElement.dir = this.dir()
    document.documentElement.lang = this.lang
  }
}
