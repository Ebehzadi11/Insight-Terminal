import { createClient } from '@supabase/supabase-js';

// Import Database type if available (generated via npm run types:supabase)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Database type may not exist until types are generated
import type { Database } from '@/types/supabase';

// Support both Vite (import.meta.env) and Node.js/Next.js (process.env) environments
const getEnvVar = (viteKey: string, nodeKey: string, nextKey?: string): string | undefined => {
  // Node.js/Server environment (Express, Next.js)
  // dotenv loads all vars into process.env, so VITE_* vars are also available
  if (typeof process !== 'undefined' && process.env) {
    if (nextKey && process.env[nextKey]) return process.env[nextKey];
    if (process.env[viteKey]) return process.env[viteKey]; // Check VITE_* vars in Node.js too
    if (process.env[nodeKey]) return process.env[nodeKey];
  }
  // Vite/Browser environment
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[viteKey] || (nextKey ? import.meta.env[nextKey] : undefined);
  }
  return undefined;
};

const supabaseUrl = 
  getEnvVar('VITE_SUPABASE_URL', 'SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL');

const supabaseServiceRoleKey = 
  getEnvVar('VITE_SUPABASE_SERVICE_ROLE_KEY', 'SUPABASE_SERVICE_ROLE_KEY');

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    'Missing Supabase admin environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY). ' +
    'Note: Service role key should only be used in server-side code and never exposed to the browser.'
  );
}

/**
 * Server-side Supabase admin client
 * 
 * WARNING: This client uses the service role key which bypasses Row Level Security (RLS).
 * Only use this in:
 * - Server-side API routes
 * - Server components (Next.js)
 * - Background jobs
 * - Admin operations
 * 
 * NEVER expose this client or its key to the browser.
 */
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Helper function to get the Supabase admin client
 */
export function getSupabaseAdmin() {
  return supabaseAdmin;
}

