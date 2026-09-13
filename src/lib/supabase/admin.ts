/**
 * Supabase Privileged Admin Client
 * ONLY used on the server for admin verification, migrations, and service-role tasks.
 * NEVER import this file into client components.
 */

import { createClient } from '@supabase/supabase-js';

export function getAdminSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!url || !serviceKey) {
    return null;
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
