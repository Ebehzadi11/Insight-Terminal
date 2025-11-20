import { createClient } from '@supabase/supabase-js';

// Import Database type if available (generated via npm run types:supabase)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Database type may not exist until types are generated
import type { Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY)'
  );
}

/**
 * Browser-side Supabase client
 * Use this in React components and client-side code
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * Helper function to get the Supabase client
 * Useful if you need to recreate the client or access it dynamically
 */
export function getSupabaseClient() {
  return supabase;
}

