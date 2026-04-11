import { createClient } from '@/utils/supabase/client';

export const authService = {
  /**
   * Sign up a new user (email/password)
   */
  async signUp(email, password, name, role = 'developer') {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, full_name: name, role },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/role`,
      },
    });
    if (error) throw error;
    return data;
  },

  /**
   * Sign in with email/password
   */
  async signIn(email, password) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  /**
   * Sign in with Google OAuth
   */
  async signInWithGoogle() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/role`,
      },
    });
    if (error) throw error;
    return data;
  },

  /**
   * Sign out current user
   */
  async signOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Get currently authenticated user
   */
  async getCurrentUser() {
    const supabase = createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) return null;
    return user;
  },

  /**
   * Get profile by userId
   */
  async getProfile(userId) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * Update current user's profile
   */
  async updateProfile(profileUpdates) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    const { data, error } = await supabase
      .from('profiles')
      .update(profileUpdates)
      .eq('id', user.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
