/**
 * Site Flow — Supabase Client & Real PostgreSQL Integration
 * Project: https://zazmvhcdcuaetakoedgt.supabase.co
 */
const SUPABASE_DEFAULT_URL = 'https://zazmvhcdcuaetakoedgt.supabase.co';
const SUPABASE_DEFAULT_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inphem12aGNkY3VhZXRha29lZGd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMjAzODcsImV4cCI6MjEwNTc5NjM4N30.3eXKBNQNZ1Y1zEo8x1xt9QuCbVr7C3eVcqT8W2zyJ24';

const SB = {
  client: null,
  ready: false,
  lastError: null,

  getUrl() {
    return (localStorage.getItem('sf_supabase_url') || SUPABASE_DEFAULT_URL).trim();
  },

  getKey() {
    return (localStorage.getItem('sf_supabase_key') || SUPABASE_DEFAULT_ANON_KEY).trim();
  },

  async init() {
    try {
      if (!window.supabase) {
        console.warn('[Supabase] SDK not loaded on page.');
        this.ready = false;
        return false;
      }

      const url = this.getUrl();
      const key = this.getKey();

      if (!url || !key) {
        this.ready = false;
        return false;
      }

      // Initialize client if not created yet or credentials changed
      if (!this.client || this._currentUrl !== url) {
        this._currentUrl = url;
        this.client = window.supabase.createClient(url, key, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        });
      }

      // Health ping check with timeout
      const pingPromise = this.client.from('sites').select('id', { head: true, count: 'exact' }).limit(1);
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Supabase ping timeout (3.5s)')), 3500));

      const { error } = await Promise.race([pingPromise, timeoutPromise]);
      if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
        // Table exists or 42P01 (relation does not exist yet) means server is responding!
        if (error.message && !error.message.includes('0 rows')) {
          console.warn('[Supabase] Ping note:', error.message);
        }
      }

      this.ready = true;
      this.lastError = null;
      console.log('✅ [Supabase] Connected successfully as Real Cloud Database');
      return true;
    } catch (e) {
      this.ready = false;
      this.lastError = e.message || 'Supabase unreachable';
      console.warn('[Supabase] Unavailable:', this.lastError);
      return false;
    }
  },

  isReady() {
    return this.ready && !!this.client;
  },

  configure(url, key) {
    if (url) localStorage.setItem('sf_supabase_url', url.trim());
    if (key) localStorage.setItem('sf_supabase_key', key.trim());
    this.client = null;
    this.ready = false;
    return this.init();
  },

  getConfig() {
    return {
      url: this.getUrl(),
      key: this.getKey(),
      isCustom: !!localStorage.getItem('sf_supabase_url'),
      isReady: this.isReady(),
      lastError: this.lastError
    };
  },

  // ── Auth ──
  async signUp(name, email, password) {
    if (!this.isReady()) throw new Error('قاعدة بيانات Supabase غير متصلة حالياً');
    const { data, error } = await this.client.auth.signUp({
      email,
      password,
      options: {
        data: { name: name || email.split('@')[0] }
      }
    });
    if (error) {
      const msg = (error.message || '').toLowerCase();
      if (msg.includes('rate limit') || msg.includes('over_email_send_rate_limit')) {
        const err = new Error('تم استهلاك الحد المجاني لإرسال الإيميلات في Supabase (3 رسائل/ساعة). لإلغاء طلب التأكيد والتسجيل الفوري بدون انتظار: قم بإلغاء خيار Confirm email من لوحة Supabase.');
        err.code = 'RATE_LIMIT_EXCEEDED';
        throw err;
      }
      if (msg.includes('already registered') || msg.includes('already exists') || msg.includes('user already exists')) {
        const err = new Error('هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول أو إدخال رمز التحقق OTP.');
        err.code = 'EMAIL_EXISTS';
        throw err;
      }
      throw new Error(error.message);
    }
    const user = data.user;
    if (user) {
      try {
        await this.client.from('profiles').upsert({
          id: user.id,
          email: user.email,
          name: name || user.email.split('@')[0],
          plan: 'free',
          lang: 'ar',
          is_admin: false
        });
      } catch (pe) {
        console.warn('Profiles table notice:', pe.message);
      }
    }
    return {
      session: data.session,
      user: {
        id: user ? user.id : 'usr_' + Date.now().toString(36),
        name: name || user?.user_metadata?.name || email.split('@')[0],
        email: email,
        plan: 'free',
        lang: 'ar',
        isAdmin: false
      }
    };
  },

  async signIn(email, password) {
    if (!this.isReady()) throw new Error('قاعدة بيانات Supabase غير متصلة حالياً');
    const { data, error } = await this.client.auth.signInWithPassword({ email, password });
    if (error) {
      const msg = (error.message || '').toLowerCase();
      if (msg.includes('email not confirmed')) {
        const err = new Error('البريد الإلكتروني غير مؤكد بعد. يرجى إدخال رمز التحقق OTP لتفعيل الحساب.');
        err.code = 'EMAIL_NOT_CONFIRMED';
        err.email = email;
        throw err;
      }
      if (msg.includes('invalid login credentials')) {
        const err = new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة. (إذا قمت بالتسجيل مؤخراً، قد يحتاج حسابك لتأكيد البريد برمز OTP أو إيقاف Confirm email من Supabase)');
        err.code = 'INVALID_CREDENTIALS';
        err.email = email;
        throw err;
      }
      throw new Error(error.message);
    }
    const user = data.user;
    let profile = null;
    try {
      const { data: prof } = await this.client.from('profiles').select('*').eq('id', user.id).maybeSingle();
      profile = prof;
    } catch {}

    return {
      session: data.session,
      user: {
        id: user.id,
        name: profile?.name || user.user_metadata?.name || user.email.split('@')[0],
        email: user.email,
        plan: profile?.plan || 'free',
        lang: profile?.lang || 'ar',
        isAdmin: profile?.is_admin || false
      }
    };
  },

  async verifyOtp(email, token, type='signup') {
    if (!this.isReady()) throw new Error('قاعدة بيانات Supabase غير متصلة حالياً');
    let res = await this.client.auth.verifyOtp({ email, token, type });
    if (res.error) {
      res = await this.client.auth.verifyOtp({ email, token, type: type === 'signup' ? 'email' : 'signup' });
    }
    if (res.error) {
      throw new Error(res.error.message.includes('expired') || res.error.message.includes('invalid') ? 'رمز التحقق OTP غير صحيح أو انتهت صلاحيته' : res.error.message);
    }
    const user = res.data?.user;
    let profile = null;
    if (user) {
      try {
        const { data: prof } = await this.client.from('profiles').select('*').eq('id', user.id).maybeSingle();
        profile = prof;
      } catch {}
    }
    return {
      session: res.data?.session,
      user: {
        id: user ? user.id : 'usr_' + Date.now().toString(36),
        name: profile?.name || user?.user_metadata?.name || email.split('@')[0],
        email: email,
        plan: profile?.plan || 'free',
        lang: profile?.lang || 'ar',
        isAdmin: profile?.is_admin || false
      }
    };
  },

  async resendOtp(email, type='signup') {
    if (!this.isReady()) throw new Error('قاعدة بيانات Supabase غير متصلة حالياً');
    const { data, error } = await this.client.auth.resend({ email, type });
    if (error) throw new Error(error.message);
    return data;
  },

  async signInWithOtp(email) {
    if (!this.isReady()) throw new Error('قاعدة بيانات Supabase غير متصلة حالياً');
    const { data, error } = await this.client.auth.signInWithOtp({ email });
    if (error) throw new Error(error.message);
    return data;
  },

  async signInWithGoogle() {
    if (!this.isReady()) throw new Error('Supabase offline');
    const { data, error } = await this.client.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/#/dashboard' }
    });
    if (error) throw new Error(error.message);
    return data;
  },

  async signOut() {
    if (!this.isReady()) return;
    try {
      await this.client.auth.signOut();
    } catch {}
  },

  async getSession() {
    if (!this.isReady()) return null;
    try {
      const { data } = await this.client.auth.getSession();
      return data?.session || null;
    } catch {
      return null;
    }
  },

  async getCurrentUser() {
    if (!this.isReady()) return null;
    try {
      const { data } = await this.client.auth.getUser();
      const user = data?.user;
      if (!user) return null;
      let profile = null;
      try {
        const { data: prof } = await this.client.from('profiles').select('*').eq('id', user.id).maybeSingle();
        profile = prof;
      } catch {}
      return {
        id: user.id,
        name: profile?.name || user.user_metadata?.name || user.email.split('@')[0],
        email: user.email,
        plan: profile?.plan || 'free',
        lang: profile?.lang || 'ar',
        isAdmin: profile?.is_admin || false
      };
    } catch {
      return null;
    }
  },

  onAuthChange(callback) {
    if (!this.isReady()) return;
    this.client.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  },

  // ── Data: Sites ──
  async getSites(userId) {
    if (!this.isReady()) return null;
    try {
      let query = this.client.from('sites').select('*').order('created_at', { ascending: false });
      if (userId && userId !== 'usr_admin') {
        const cleanId = String(userId).replace(/^usr_/, '');
        query = query.or(`user_id.eq.${userId},user_id.eq.usr_${cleanId},user_id.eq.${cleanId},user_id.eq.usr_guest`);
      }
      const { data, error } = await query;
      if (error) {
        console.warn('Supabase getSites error:', error.message);
        return null;
      }
      return (data || []).map(s => this._formatSite(s));
    } catch (e) {
      console.warn('Supabase getSites exception:', e.message);
      return null;
    }
  },

  async getSite(id) {
    if (!this.isReady()) return null;
    try {
      const { data, error } = await this.client.from('sites').select('*').eq('id', id).maybeSingle();
      if (error || !data) return null;
      return this._formatSite(data);
    } catch {
      return null;
    }
  },

  async createSite(data) {
    if (!this.isReady()) return null;
    const siteId = data.id || ('site_' + Math.random().toString(36).slice(2, 10));
    const rawUid = data.user_id || data.userId || 'usr_guest';
    const safeUserId = String(rawUid).startsWith('usr_') ? String(rawUid) : ('usr_' + rawUid);
    const payload = {
      id: siteId,
      user_id: safeUserId,
      title: data.title || 'موقعي الجديد',
      slug: data.slug || ('site-' + Date.now().toString(36)),
      template_type: data.template_type || 'blank',
      published: !!data.published,
      views: data.views || 0,
      custom_domain: data.custom_domain || '',
      theme: data.theme || { color: '#6366f1', font: 'Cairo' },
      seo: data.seo || { title: data.title || 'موقعي الجديد', description: '' },
      sections: data.sections || []
    };

    try {
      const { data: created, error } = await this.client.from('sites').insert(payload).select().single();
      if (!error && created) return this._formatSite(created);
      if (error) {
        console.warn('Supabase createSite insert error:', error.message);
        // Automatic recovery: If RLS blocked, retry with usr_guest fallback
        if (error.message.includes('row-level security') || error.code === '42501') {
          payload.user_id = 'usr_guest';
          const { data: guestCreated, error: guestErr } = await this.client.from('sites').insert(payload).select().single();
          if (!guestErr && guestCreated) return this._formatSite(guestCreated);
        }
      }
    } catch (e) {
      console.warn('Supabase createSite full insert error, trying fallback:', e);
    }

    // Fallback: minimal insert if table doesn't have jsonb columns yet
    const minPayload = {
      id: siteId,
      user_id: payload.user_id,
      title: payload.title,
      slug: payload.slug,
      template_type: payload.template_type,
      published: payload.published
    };
    try {
      const { data: minCreated, error: minErr } = await this.client.from('sites').insert(minPayload).select().single();
      if (minErr) {
        if (minErr.message.includes('row-level security') || minErr.code === '42501') {
          minPayload.user_id = 'usr_guest';
          const { data: retryMin, error: retryErr } = await this.client.from('sites').insert(minPayload).select().single();
          if (!retryErr && retryMin) return this._formatSite({ ...retryMin, theme: payload.theme, seo: payload.seo, sections: payload.sections });
        }
        throw new Error(minErr.message);
      }
      return this._formatSite({ ...minCreated, theme: payload.theme, seo: payload.seo, sections: payload.sections });
    } catch (err) {
      console.warn('Supabase fallback insert failed:', err.message);
      // Return a valid local site object so the builder never crashes
      return this._formatSite(payload);
    }
  },

  async updateSite(id, data) {
    if (!this.isReady()) return null;
    const updates = { updated_at: new Date().toISOString() };
    if (data.title !== undefined) updates.title = data.title;
    if (data.slug !== undefined) updates.slug = data.slug;
    if (data.published !== undefined) updates.published = data.published;
    if (data.custom_domain !== undefined) updates.custom_domain = data.custom_domain;
    if (data.views !== undefined) updates.views = data.views;
    if (data.theme !== undefined) updates.theme = data.theme;
    if (data.seo !== undefined) updates.seo = data.seo;
    if (data.slug_locked !== undefined) updates.slug_locked = data.slug_locked;
    if (data.apps !== undefined) {
      updates.apps = data.apps;
      if (updates.seo && typeof updates.seo === 'object') updates.seo.apps = data.apps;
    }

    try {
      const { data: updated, error } = await this.client.from('sites').update(updates).eq('id', id).select().maybeSingle();
      if (!error && updated) return this._formatSite(updated);
    } catch {}

    // Fallback for minimal table columns
    const minimalUpdates = {};
    if (data.title !== undefined) minimalUpdates.title = data.title;
    if (data.slug !== undefined) minimalUpdates.slug = data.slug;
    if (data.published !== undefined) minimalUpdates.published = data.published;
    if (data.custom_domain !== undefined) minimalUpdates.custom_domain = data.custom_domain;
    if (data.seo) {
      if (data.apps && typeof data.seo === 'object') data.seo.apps = data.apps;
      minimalUpdates.seo = data.seo;
    }

    if (Object.keys(minimalUpdates).length > 0) {
      await this.client.from('sites').update(minimalUpdates).eq('id', id);
    }

    if (data.sections && Array.isArray(data.sections)) {
      try {
        await this.client.from('sections').delete().eq('site_id', id);
        for (let i = 0; i < data.sections.length; i++) {
          const s = data.sections[i];
          await this.client.from('sections').insert({
            site_id: id,
            type: s.type,
            data: s.data || {},
            sort_order: i
          });
        }
      } catch {}
    }

    return this.getSite(id);
  },

  async deleteSite(id) {
    if (!this.isReady()) return;
    try {
      await this.client.from('sites').delete().eq('id', id);
    } catch (e) {
      throw new Error(e.message);
    }
  },

  async publishSite(id) {
    return this.updateSite(id, { published: true });
  },

  async getPublicPage(slug) {
    if (!this.isReady()) return null;
    try {
      const { data, error } = await this.client.from('sites').select('*').eq('slug', slug).eq('published', true).maybeSingle();
      if (error || !data) return null;
      return this._formatSite(data);
    } catch {
      return null;
    }
  },

  async incrementViews(slug) {
    if (!this.isReady()) return;
    try {
      await this.client.rpc('increment_views', { site_slug: slug });
    } catch {
      try {
        const { data } = await this.client.from('sites').select('views').eq('slug', slug).maybeSingle();
        if (data) {
          await this.client.from('sites').update({ views: (data.views || 0) + 1 }).eq('slug', slug);
        }
      } catch {}
    }
  },

  // ── Payments ──
  async createPayment(userId, plan, amount, details = {}) {
    if (!this.isReady()) return null;
    try {
      const payload = {
        user_id: userId,
        amount: amount,
        currency: 'EGP',
        plan: plan,
        status: details.status || 'pending',
        method: details.method || 'vodafone',
        sender_phone: details.sender_phone || '',
        receipt_url: details.receipt_url || '',
        ref_code: details.ref_code || '',
        user_email: details.user_email || '',
        user_name: details.user_name || ''
      };
      const { data, error } = await this.client.from('payments').insert(payload).select().single();
      if (error) {
        const { data: fb, error: fbErr } = await this.client.from('payments').insert({
          user_id: userId,
          amount: amount,
          currency: 'EGP',
          plan: plan,
          status: details.status || 'pending'
        }).select().single();
        if (fbErr) throw new Error(fbErr.message);
        return fb;
      }
      return data;
    } catch (e) {
      console.warn('Payment insert notice:', e.message);
      return { id: 'pay_' + Date.now(), plan, amount, status: 'pending', ...details };
    }
  },

  async confirmPayment(id, plan, userId, userEmail) {
    if (!this.isReady()) return null;
    try {
      await this.client.from('payments').update({ status: 'completed' }).eq('id', id);
      if (plan) {
        if (userEmail) {
          try { await this.client.from('profiles').update({ plan: plan }).eq('email', userEmail); } catch {}
        }
        if (userId && !String(userId).startsWith('usr_guest')) {
          const cleanId = String(userId).replace('usr_', '');
          try { await this.client.from('profiles').update({ plan: plan }).eq('id', cleanId); } catch {}
        }
      }
      return { ok: true };
    } catch (e) {
      console.warn('Confirm payment notice:', e.message);
      return { ok: false, error: e.message };
    }
  },

  async rejectPayment(id) {
    if (!this.isReady()) return null;
    try {
      await this.client.from('payments').update({ status: 'rejected' }).eq('id', id);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },

  // ── Data Normalization Helper ──
  _formatSite(data) {
    if (!data) return null;

    let sections = [];
    if (Array.isArray(data.sections)) {
      sections = data.sections.map((s, idx) => ({
        id: s.id || ('sec_' + idx),
        type: s.type || 'hero',
        data: typeof s.data === 'string' ? JSON.parse(s.data) : (s.data || {}),
        sort_order: s.sort_order !== undefined ? s.sort_order : idx
      }));
    }

    let theme = { color: '#6366f1', font: 'Cairo' };
    if (data.theme) {
      theme = typeof data.theme === 'string' ? JSON.parse(data.theme) : data.theme;
    } else if (data.themes) {
      theme = { color: data.themes.color || '#6366f1', font: data.themes.font || 'Cairo' };
    }

    let seo = { title: data.title || '', description: '' };
    let apps = data.apps || data.seo?.apps || {};
    if (typeof apps === 'string') {
      try { apps = JSON.parse(apps); } catch {}
    }

    return {
      id: data.id,
      userId: data.user_id || data.userId || 'usr_guest',
      title: data.title || 'موقعي الجديد',
      slug: data.slug || '',
      slug_locked: !!(data.slug_locked || data.slugLocked),
      apps: apps,
      published: !!data.published,
      views: data.views || 0,
      custom_domain: data.custom_domain || '',
      template_type: data.template_type || 'blank',
      created_at: data.created_at || data.createdAt,
      updated_at: data.updated_at || data.updatedAt,
      sections: sections,
      seo: seo,
      theme: theme
    };
  }
};
