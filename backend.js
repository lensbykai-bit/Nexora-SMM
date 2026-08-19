(function () {
  const cfg = window.NEXORA_SUPABASE_CONFIG || {};
  const configured = Boolean(
    window.supabase?.createClient &&
    cfg.url &&
    cfg.publishableKey &&
    !String(cfg.url).includes('YOUR_PROJECT_REF') &&
    !String(cfg.publishableKey).includes('YOUR_SUPABASE')
  );

  const client = configured
    ? window.supabase.createClient(cfg.url, cfg.publishableKey, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      })
    : null;

  async function authUser() {
    if (!client) return null;
    const { data, error } = await client.auth.getUser();
    if (error) return null;
    return data.user || null;
  }

  async function profileFor(user) {
    if (!client || !user) return null;
    const { data, error } = await client
      .from('profiles')
      .select('id, display_name, created_at, updated_at')
      .eq('id', user.id)
      .maybeSingle();
    if (error) return null;
    return data || null;
  }

  window.NexoraBackend = {
    mode: configured ? 'supabase' : 'demo',
    isConfigured: configured,
    client,

    async signUp({ name, email, password }) {
      if (!client) return { mode: 'demo', user: { email, displayName: name } };
      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: { data: { display_name: name } }
      });
      if (error) throw error;
      return { mode: 'supabase', user: data.user, session: data.session };
    },

    async signIn({ email, password }) {
      if (!client) return { mode: 'demo', user: { email, displayName: email.split('@')[0] } };
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { mode: 'supabase', user: data.user, session: data.session };
    },

    async signOut() {
      if (!client) return;
      const { error } = await client.auth.signOut();
      if (error) throw error;
    },

    async getIdentity() {
      if (!client) return null;
      const user = await authUser();
      if (!user) return null;
      const profile = await profileFor(user);
      return {
        id: user.id,
        email: user.email || '',
        displayName: profile?.display_name || user.user_metadata?.display_name || user.email?.split('@')[0] || 'NexoraUser'
      };
    },

    async updateProfile(displayName) {
      if (!client) return null;
      const user = await authUser();
      if (!user) throw new Error('Not signed in');
      const { data, error } = await client
        .from('profiles')
        .update({ display_name: displayName, updated_at: new Date().toISOString() })
        .eq('id', user.id)
        .select('id, display_name, updated_at')
        .single();
      if (error) throw error;
      return data;
    },

    async getWallet() {
      if (!client) return null;
      const user = await authUser();
      if (!user) return null;
      const { data, error } = await client
        .from('wallets')
        .select('balance, updated_at')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) throw error;
      return data || { balance: 0 };
    },

    async listWalletTransactions() {
      if (!client) return [];
      const { data, error } = await client
        .from('wallet_transactions')
        .select('id, amount, kind, note, created_at')
        .order('created_at', { ascending: false })
        .limit(20);
      if (error) throw error;
      return data || [];
    },

    async listOrders() {
      if (!client) return [];
      const { data, error } = await client
        .from('orders')
        .select('id, service_id, link, quantity, status, created_at')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },

    async createOrderRequest({ serviceId, link, quantity }) {
      if (!client) return null;
      const user = await authUser();
      if (!user) throw new Error('Not signed in');
      const { data, error } = await client
        .from('orders')
        .insert({ user_id: user.id, service_id: serviceId, link, quantity })
        .select('id, service_id, link, quantity, status, created_at')
        .single();
      if (error) throw error;
      return data;
    },

    async listTickets() {
      if (!client) return [];
      const { data, error } = await client
        .from('tickets')
        .select('id, subject, message, status, created_at')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },

    async createTicket({ subject, message }) {
      if (!client) return null;
      const user = await authUser();
      if (!user) throw new Error('Not signed in');
      const { data, error } = await client
        .from('tickets')
        .insert({ user_id: user.id, subject, message })
        .select('id, subject, message, status, created_at')
        .single();
      if (error) throw error;
      return data;
    }
  };
})();
