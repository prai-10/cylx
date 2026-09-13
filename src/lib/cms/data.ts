/**
 * Unified CMS Data Access Layer
 * Queries Supabase PostgreSQL for published content and falls back gracefully
 * to verified client baseline data when Supabase is unconfigured or tables are empty.
 */

import { PROJECTS, getProjectBySlug as getStaticProjectBySlug } from '@/lib/data/projects';
import { CASE_STUDIES, getCaseStudyBySlug as getStaticCaseStudyBySlug } from '@/lib/data/caseStudies';
import { CREATORS } from '@/lib/data/creators';
import { BLOG_POSTS, getBlogPostBySlug as getStaticBlogPostBySlug } from '@/lib/data/blog';
import { SERVICES } from '@/lib/data/services';
import { JOBS, getJobBySlug as getStaticJobBySlug } from '@/lib/data/jobs';
import { Project, CaseStudy, Creator, BlogPost, Service, Job } from '@/types';
import { getAdminSupabaseClient } from '@/lib/supabase/admin';

/* -------------------------------------------------------------
 * 1. Portfolio Projects
 * ------------------------------------------------------------- */
export async function getCmsProjects(): Promise<Project[]> {
  try {
    const supabase = getAdminSupabaseClient();
    if (!supabase) return PROJECTS;

    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return PROJECTS;
    }

    return data.map((item: Record<string, unknown>) => ({
      slug: String(item.slug),
      title: String(item.title),
      client: String(item.client),
      category: item.category as Project['category'],
      year: String(item.year),
      description: String(item.description),
      services: (item.services as string[]) || [],
      thumbnail: String(item.thumbnail),
      heroMedia: String(item.hero_media || item.thumbnail),
      gallery: (item.gallery as Project['gallery']) || [],
      overview: String(item.overview),
      challenge: String(item.challenge),
      approach: String(item.approach),
      execution: String(item.execution),
      results: (item.results as Project['results']) || [],
      tags: (item.tags as string[]) || [],
    }));
  } catch (err) {
    console.error('[getCmsProjects] Fallback to static:', err);
    return PROJECTS;
  }
}

export async function getCmsProjectBySlug(slug: string): Promise<Project | undefined> {
  try {
    const supabase = getAdminSupabaseClient();
    if (!supabase) return getStaticProjectBySlug(slug);

    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !data) {
      return getStaticProjectBySlug(slug);
    }

    return {
      slug: String(data.slug),
      title: String(data.title),
      client: String(data.client),
      category: data.category as Project['category'],
      year: String(data.year),
      description: String(data.description),
      services: (data.services as string[]) || [],
      thumbnail: String(data.thumbnail),
      heroMedia: String(data.hero_media || data.thumbnail),
      gallery: (data.gallery as Project['gallery']) || [],
      overview: String(data.overview),
      challenge: String(data.challenge),
      approach: String(data.approach),
      execution: String(data.execution),
      results: (data.results as Project['results']) || [],
      tags: (data.tags as string[]) || [],
    };
  } catch (err) {
    console.error('[getCmsProjectBySlug] Fallback to static:', err);
    return getStaticProjectBySlug(slug);
  }
}

/* -------------------------------------------------------------
 * 2. Case Studies
 * ------------------------------------------------------------- */
export async function getCmsCaseStudies(): Promise<CaseStudy[]> {
  try {
    const supabase = getAdminSupabaseClient();
    if (!supabase) return CASE_STUDIES;

    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return CASE_STUDIES;
    }

    return data.map((item: Record<string, unknown>) => ({
      slug: String(item.slug),
      title: String(item.title),
      client: String(item.client),
      category: item.category as CaseStudy['category'],
      adSpendManaged: String(item.ad_spend_managed),
      roasLift: String(item.roas_lift),
      creatorHandle: String(item.creator_handle),
      whitelistedFormat: String(item.whitelisted_format),
      summary: String(item.summary),
      challenge: String(item.challenge),
      whitelistingStrategy: String(item.whitelisting_strategy),
      scalingData: String(item.scaling_data),
      results: (item.results as CaseStudy['results']) || [],
    }));
  } catch (err) {
    console.error('[getCmsCaseStudies] Fallback to static:', err);
    return CASE_STUDIES;
  }
}

export async function getCmsCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  try {
    const supabase = getAdminSupabaseClient();
    if (!supabase) return getStaticCaseStudyBySlug(slug);

    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !data) {
      return getStaticCaseStudyBySlug(slug);
    }

    return {
      slug: String(data.slug),
      title: String(data.title),
      client: String(data.client),
      category: data.category as CaseStudy['category'],
      adSpendManaged: String(data.ad_spend_managed),
      roasLift: String(data.roas_lift),
      creatorHandle: String(data.creator_handle),
      whitelistedFormat: String(data.whitelisted_format),
      summary: String(data.summary),
      challenge: String(data.challenge),
      whitelistingStrategy: String(data.whitelisting_strategy),
      scalingData: String(data.scaling_data),
      results: (data.results as CaseStudy['results']) || [],
    };
  } catch (err) {
    console.error('[getCmsCaseStudyBySlug] Fallback to static:', err);
    return getStaticCaseStudyBySlug(slug);
  }
}

/* -------------------------------------------------------------
 * 3. Creators
 * ------------------------------------------------------------- */
export async function getCmsCreators(): Promise<Creator[]> {
  try {
    const supabase = getAdminSupabaseClient();
    if (!supabase) return CREATORS;

    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return CREATORS;
    }

    return data.map((item: Record<string, unknown>) => ({
      id: String(item.id),
      name: String(item.name),
      handle: String(item.handle),
      platform: item.platform as Creator['platform'],
      category: item.category as Creator['category'],
      followers: String(item.followers),
      averageEngagement: String(item.average_engagement),
      specialty: String(item.specialty),
      whitelistingReady: Boolean(item.whitelisting_ready),
    }));
  } catch (err) {
    console.error('[getCmsCreators] Fallback to static:', err);
    return CREATORS;
  }
}

/* -------------------------------------------------------------
 * 4. Blog Posts
 * ------------------------------------------------------------- */
export async function getCmsBlogPosts(): Promise<BlogPost[]> {
  try {
    const supabase = getAdminSupabaseClient();
    if (!supabase) return BLOG_POSTS;

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return BLOG_POSTS;
    }

    return data.map((item: Record<string, unknown>) => ({
      slug: String(item.slug),
      title: String(item.title),
      excerpt: String(item.excerpt),
      content: String(item.content),
      date: String(item.date),
      readTime: String(item.read_time),
      category: String(item.category),
      author: String(item.author),
    }));
  } catch (err) {
    console.error('[getCmsBlogPosts] Fallback to static:', err);
    return BLOG_POSTS;
  }
}

export async function getCmsBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const supabase = getAdminSupabaseClient();
    if (!supabase) return getStaticBlogPostBySlug(slug);

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !data) {
      return getStaticBlogPostBySlug(slug);
    }

    return {
      slug: String(data.slug),
      title: String(data.title),
      excerpt: String(data.excerpt),
      content: String(data.content),
      date: String(data.date),
      readTime: String(data.read_time),
      category: String(data.category),
      author: String(data.author),
    };
  } catch (err) {
    console.error('[getCmsBlogPostBySlug] Fallback to static:', err);
    return getStaticBlogPostBySlug(slug);
  }
}

/* -------------------------------------------------------------
 * 5. Services (Six Disciplines)
 * ------------------------------------------------------------- */
export async function getCmsServices(): Promise<Service[]> {
  try {
    const supabase = getAdminSupabaseClient();
    if (!supabase) return SERVICES;

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return SERVICES;
    }

    return data.map((item: Record<string, unknown>) => ({
      id: String(item.id),
      title: String(item.title),
      shortDescription: String(item.short_description),
      longDescription: String(item.long_description),
      capabilities: (item.capabilities as string[]) || [],
    }));
  } catch (err) {
    console.error('[getCmsServices] Fallback to static:', err);
    return SERVICES;
  }
}

/* -------------------------------------------------------------
 * 6. Careers / Job Openings
 * ------------------------------------------------------------- */
export async function getCmsJobs(): Promise<Job[]> {
  try {
    const supabase = getAdminSupabaseClient();
    if (!supabase) return JOBS;

    const { data, error } = await supabase
      .from('job_openings')
      .select('*')
      .eq('status', 'open')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return JOBS;
    }

    return data.map((item: Record<string, unknown>) => ({
      id: String(item.id),
      slug: String(item.slug),
      title: String(item.title),
      department: String(item.department),
      location: String(item.location),
      type: String(item.type),
      description: String(item.description),
      responsibilities: (item.responsibilities as string[]) || [],
      requirements: (item.requirements as string[]) || [],
      niceToHave: (item.nice_to_have as string[]) || [],
      status: item.status as Job['status'],
    }));
  } catch (err) {
    console.error('[getCmsJobs] Fallback to static:', err);
    return JOBS;
  }
}

export async function getCmsJobBySlug(slug: string): Promise<Job | undefined> {
  try {
    const supabase = getAdminSupabaseClient();
    if (!supabase) return getStaticJobBySlug(slug);

    const { data, error } = await supabase
      .from('job_openings')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'open')
      .single();

    if (error || !data) {
      return getStaticJobBySlug(slug);
    }

    return {
      id: String(data.id),
      slug: String(data.slug),
      title: String(data.title),
      department: String(data.department),
      location: String(data.location),
      type: String(data.type),
      description: String(data.description),
      responsibilities: (data.responsibilities as string[]) || [],
      requirements: (data.requirements as string[]) || [],
      niceToHave: (data.nice_to_have as string[]) || [],
      status: data.status as Job['status'],
    };
  } catch (err) {
    console.error('[getCmsJobBySlug] Fallback to static:', err);
    return getStaticJobBySlug(slug);
  }
}
