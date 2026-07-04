/**
 * Site Flow — Supabase Client
 * https://yrcdrdxdhcmeraqxcevo.supabase.co
 */
const SUPABASE_URL = 'https://yrcdrdxdhcmeraqxcevo.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyY2RyZHhkaGNtZXJhcXhjZXZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxODcyMzUsImV4cCI6MjA5ODc2MzIzNX0.SJEYXFdMvvGWJyH3hWvxQw2Kgk9XzzR8UJ4sweCyLn0'

const SB = {
  client: null,
  ready: false,

  async init() {
    try {
      if (window.supabase) {
        this.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
          auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
        })
        // Test connection
        const { data, error } = await this.client.from('sites').select('count', { count: 'exact', head: true })
        if (error && error.code !== 'PGRST116') throw error
        this.ready = true
        console.log('Supabase connected')
      } else {
        console.warn('Supabase SDK not loaded, using localStorage fallback')
      }
    } catch (e) {
      console.warn('Supabase unavailable:', e.message)
    }
  },

  isReady() { return this.ready && !!this.client },

  // ── Auth ──
  async signUp(email, password) {
    if (!this.isReady()) throw new Error('Supabase offline')
    const { data, error } = await this.client.auth.signUp({ email, password })
    if (error) throw new Error(error.message)
    return data
  },

  async signIn(email, password) {
    if (!this.isReady()) throw new Error('Supabase offline')
    const { data, error } = await this.client.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)
    return data
  },

  async signInWithGoogle() {
    if (!this.isReady()) throw new Error('Supabase offline')
    const { data, error } = await this.client.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/#/dashboard' }
    })
    if (error) throw new Error(error.message)
    return data
  },

  async signOut() {
    if (!this.isReady()) return
    await this.client.auth.signOut()
  },

  getSession() {
    if (!this.isReady()) return null
    return this.client.auth.getSession()
  },

  onAuthChange(callback) {
    if (!this.isReady()) return
    this.client.auth.onAuthStateChange((event, session) => {
      callback(event, session)
    })
  },

  // ── Data: Sites ──
  async getSites(userId) {
    if (!this.isReady()) return null
    const { data, error } = await this.client.from('sites').select('*').eq('user_id', userId).order('updated_at', { ascending: false })
    if (error) throw new Error(error.message)
    return data
  },

  async getSite(id) {
    if (!this.isReady()) return null
    const { data, error } = await this.client.from('sites').select('*, sections(*), seo(*), themes(*)').eq('id', id).single()
    if (error) throw new Error(error.message)
    return this._formatSite(data)
  },

  async createSite(data) {
    if (!this.isReady()) return null
    const { data: site, error } = await this.client.from('sites').insert({
      user_id: data.user_id, title: data.title, slug: data.slug,
      template_type: data.template_type || 'blank'
    }).select().single()
    if (error) throw new Error(error.message)

    // Create default sections
    const defaults = data.sections || [
      { type: 'hero', data: { heading: 'Welcome', description: 'My awesome site', image: '' }, sort_order: 0 },
      { type: 'about', data: { heading: 'About', content: 'About me...' }, sort_order: 1 },
      { type: 'contact', data: { heading: 'Contact', email: '' }, sort_order: 2 }
    ]
    for (const s of defaults) {
      await this.client.from('sections').insert({ site_id: site.id, type: s.type, data: s.data, sort_order: s.sort_order || 0 })
    }
    await this.client.from('seo').insert({ site_id: site.id, title: data.title || 'My Site', description: '' })
    await this.client.from('themes').insert({ site_id: site.id, color: '#6366f1', font: 'Inter' })
    return this.getSite(site.id)
  },

  async updateSite(id, data) {
    if (!this.isReady()) return null
    const updates = {}
    if (data.title !== undefined) updates.title = data.title
    if (data.slug !== undefined) updates.slug = data.slug
    if (data.published !== undefined) updates.published = data.published
    if (data.custom_domain !== undefined) updates.custom_domain = data.custom_domain
    if (Object.keys(updates).length > 0) {
      const { error } = await this.client.from('sites').update(updates).eq('id', id)
      if (error) throw new Error(error.message)
    }
    // Update sections
    if (data.sections) {
      await this.client.from('sections').delete().eq('site_id', id)
      for (let i = 0; i < data.sections.length; i++) {
        const s = data.sections[i]
        await this.client.from('sections').insert({ site_id: id, type: s.type, data: s.data, sort_order: i })
      }
    }
    // Update SEO
    if (data.seo) {
      await this.client.from('seo').upsert({ site_id: id, title: data.seo.title || '', description: data.seo.description || '' }, { onConflict: 'site_id' })
    }
    // Update Theme
    if (data.theme) {
      await this.client.from('themes').upsert({ site_id: id, color: data.theme.color || '#6366f1', font: data.theme.font || 'Inter' }, { onConflict: 'site_id' })
    }
    return this.getSite(id)
  },

  async deleteSite(id) {
    if (!this.isReady()) return
    const { error } = await this.client.from('sites').delete().eq('id', id)
    if (error) throw new Error(error.message)
  },

  async publishSite(id) {
    return this.updateSite(id, { published: true })
  },

  async getPublicPage(slug) {
    if (!this.isReady()) return null
    const { data, error } = await this.client.from('sites').select('*, sections(*), seo(*), themes(*)').eq('slug', slug).eq('published', true).single()
    if (error) return null
    return this._formatSite(data)
  },

  async incrementViews(slug) {
    if (!this.isReady()) return
    await this.client.rpc('increment_views', { site_slug: slug })
  },

  // ── Payments ──
  async createPayment(userId, plan, amount) {
    if (!this.isReady()) return null
    const { data, error } = await this.client.from('payments').insert({
      user_id: userId, amount: amount, currency: 'USD', plan: plan, status: 'pending'
    }).select().single()
    if (error) throw new Error(error.message)
    return data
  },

  async confirmPayment(id) {
    if (!this.isReady()) return
    await this.client.from('payments').update({ status: 'completed' }).eq('id', id)
  },

  // ── Helpers ──
  _formatSite(data) {
    if (!data) return null
    return {
      id: data.id, user_id: data.user_id, title: data.title, slug: data.slug,
      published: data.published, views: data.views || 0, custom_domain: data.custom_domain || '',
      template_type: data.template_type || 'blank',
      created_at: data.created_at, updated_at: data.updated_at,
      sections: (data.sections || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)).map(s => ({
        type: s.type, data: typeof s.data === 'string' ? JSON.parse(s.data) : (s.data || {}), id: s.id
      })),
      seo: data.seo ? { title: data.seo.title || '', description: data.seo.description || '' } : { title: '', description: '' },
      theme: data.themes ? { color: data.themes.color || '#6366f1', font: data.themes.font || 'Inter' } : { color: '#6366f1', font: 'Inter' }
    }
  }
}
