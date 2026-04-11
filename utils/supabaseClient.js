import { createBrowserClient } from '@supabase/ssr';

// Next.js-compatible Supabase client (replaces old Vite-based supabaseClient.js)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase URL or Anon Key is missing. Check your .env file.');
}

// Singleton browser client
let supabaseClient = null;

export const getSupabase = () => {
  if (!supabaseClient) {
    supabaseClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseClient;
};

// Named export for backward compatibility
export const supabase = {
  get auth() {
    return getSupabase().auth;
  },
  from: (...args) => getSupabase().from(...args),
  storage: {
    get from() {
      return (...args) => getSupabase().storage.from(...args);
    },
  },
};
