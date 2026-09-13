/**
 * Supabase Server Client (App Router SSR ready)
 * Reads and writes session cookies securely in Server Components, Server Actions & Route Handlers.
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { ContactSubmission, CareerApplication } from '@/types';

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing user sessions.
        }
      },
    },
  });
}

/**
 * Check if the currently authenticated user has an active admin session
 */
export async function getAdminSession() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // In dev mode without configured Supabase, allow demo access flag if explicitly enabled
    return null;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) return null;

    // Check admin role in admin_users table
    const { data: adminRecord } = await supabase
      .from('admin_users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!adminRecord && user.email !== process.env.INITIAL_ADMIN_EMAIL) {
      return null;
    }

    return { user, role: adminRecord?.role || 'admin' };
  } catch (err) {
    console.error('[getAdminSession] Error checking auth:', err);
    return null;
  }
}

/**
 * Public Contact Submission insertion
 */
export async function insertContactSubmission(submission: ContactSubmission): Promise<{ success: boolean; id?: string }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey || !url.startsWith('http')) {
    return { success: true, id: `mock_contact_${Date.now()}` };
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert({
        name: submission.name,
        email: submission.email,
        company: submission.company || null,
        phone: submission.phone || null,
        service: submission.service,
        budget: submission.budget || null,
        message: submission.message,
        status: 'New'
      })
      .select('id')
      .single();

    if (error) {
      console.error('[insertContactSubmission] Error:', error);
      return { success: false };
    }

    return { success: true, id: data?.id };
  } catch (err) {
    console.error('[insertContactSubmission] Network error:', err);
    return { success: false };
  }
}

/**
 * Public Career Application insertion
 */
export async function insertCareerApplication(application: CareerApplication): Promise<{ success: boolean; id?: string }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey || !url.startsWith('http')) {
    return { success: true, id: `mock_app_${Date.now()}` };
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('career_applications')
      .insert({
        name: application.name,
        email: application.email,
        phone: application.phone || null,
        role: application.role,
        portfolio_url: application.portfolioUrl || null,
        linkedin_url: application.linkedinUrl || null,
        resume_url: application.resumeUrl || null,
        message: application.message || null,
        status: 'New'
      })
      .select('id')
      .single();

    if (error) {
      console.error('[insertCareerApplication] Error:', error);
      return { success: false };
    }

    return { success: true, id: data?.id };
  } catch (err) {
    console.error('[insertCareerApplication] Network error:', err);
    return { success: false };
  }
}
