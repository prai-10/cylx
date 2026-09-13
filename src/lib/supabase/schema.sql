-- ============================================================
-- CLYX Media — Production PostgreSQL Schema & RLS Policies
-- Execute in Supabase SQL Editor to initialize full database
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------
-- 1. Admin Users & Roles
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
    full_name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin users read own record or service role"
ON public.admin_users
FOR SELECT
TO authenticated, service_role
USING (auth.uid() = id OR (SELECT auth.jwt()->>'role') = 'service_role');

-- ------------------------------------------------------------
-- 2. Portfolio Projects
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    client TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Fashion', 'Beauty', 'Food', 'Tech')),
    year TEXT NOT NULL DEFAULT '2025',
    description TEXT NOT NULL,
    services TEXT[] NOT NULL DEFAULT '{}',
    thumbnail TEXT NOT NULL DEFAULT '/textures/project-thumb.jpg',
    hero_media TEXT NOT NULL DEFAULT '/textures/project-hero.jpg',
    gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
    overview TEXT NOT NULL,
    challenge TEXT NOT NULL,
    approach TEXT NOT NULL,
    execution TEXT NOT NULL,
    results JSONB NOT NULL DEFAULT '[]'::jsonb,
    tags TEXT[] NOT NULL DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    is_featured BOOLEAN NOT NULL DEFAULT false,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON public.portfolio_projects(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_status ON public.portfolio_projects(status);

ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Public can only see published projects
CREATE POLICY "Public read published portfolio"
ON public.portfolio_projects
FOR SELECT
TO anon, authenticated
USING (status = 'published');

-- Admins have full access
CREATE POLICY "Admins full access portfolio"
ON public.portfolio_projects
FOR ALL
TO authenticated, service_role
USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()) 
    OR (SELECT auth.jwt()->>'role') = 'service_role'
);

-- ------------------------------------------------------------
-- 3. Case Studies
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.case_studies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    client TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Fashion', 'Beauty', 'Food', 'Tech')),
    ad_spend_managed TEXT NOT NULL DEFAULT '₹1Cr+',
    roas_lift TEXT NOT NULL DEFAULT '3.0x',
    creator_handle TEXT NOT NULL,
    whitelisted_format TEXT NOT NULL,
    summary TEXT NOT NULL,
    challenge TEXT NOT NULL,
    whitelisting_strategy TEXT NOT NULL,
    scaling_data TEXT NOT NULL,
    results JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    is_featured BOOLEAN NOT NULL DEFAULT false,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON public.case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_status ON public.case_studies(status);

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published case studies"
ON public.case_studies
FOR SELECT
TO anon, authenticated
USING (status = 'published');

CREATE POLICY "Admins full access case studies"
ON public.case_studies
FOR ALL
TO authenticated, service_role
USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()) 
    OR (SELECT auth.jwt()->>'role') = 'service_role'
);

-- ------------------------------------------------------------
-- 4. Creators
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.creators (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    handle TEXT NOT NULL UNIQUE,
    platform TEXT NOT NULL DEFAULT 'Instagram' CHECK (platform IN ('Instagram', 'TikTok', 'YouTube')),
    category TEXT NOT NULL CHECK (category IN ('Fashion', 'Beauty', 'Food', 'Tech')),
    followers TEXT NOT NULL,
    average_engagement TEXT NOT NULL,
    specialty TEXT NOT NULL,
    whitelisting_ready BOOLEAN NOT NULL DEFAULT true,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.creators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published creators"
ON public.creators
FOR SELECT
TO anon, authenticated
USING (status = 'published');

CREATE POLICY "Admins full access creators"
ON public.creators
FOR ALL
TO authenticated, service_role
USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()) 
    OR (SELECT auth.jwt()->>'role') = 'service_role'
);

-- ------------------------------------------------------------
-- 5. Blog Posts
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    date TEXT NOT NULL,
    read_time TEXT NOT NULL DEFAULT '4 min read',
    category TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'CLYX Growth Team',
    cover_image TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published blog posts"
ON public.blog_posts
FOR SELECT
TO anon, authenticated
USING (status = 'published');

CREATE POLICY "Admins full access blog posts"
ON public.blog_posts
FOR ALL
TO authenticated, service_role
USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()) 
    OR (SELECT auth.jwt()->>'role') = 'service_role'
);

-- ------------------------------------------------------------
-- 6. Services (Six Disciplines)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    long_description TEXT NOT NULL,
    capabilities TEXT[] NOT NULL DEFAULT '{}',
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active services"
ON public.services
FOR SELECT
TO anon, authenticated
USING (is_active = true);

CREATE POLICY "Admins full access services"
ON public.services
FOR ALL
TO authenticated, service_role
USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()) 
    OR (SELECT auth.jwt()->>'role') = 'service_role'
);

-- ------------------------------------------------------------
-- 7. Job Openings
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.job_openings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL DEFAULT 'Remote',
    type TEXT NOT NULL DEFAULT 'Full-time',
    description TEXT NOT NULL,
    responsibilities TEXT[] NOT NULL DEFAULT '{}',
    requirements TEXT[] NOT NULL DEFAULT '{}',
    nice_to_have TEXT[] NOT NULL DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed')),
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.job_openings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read open jobs"
ON public.job_openings
FOR SELECT
TO anon, authenticated
USING (status = 'open');

CREATE POLICY "Admins full access job openings"
ON public.job_openings
FOR ALL
TO authenticated, service_role
USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()) 
    OR (SELECT auth.jwt()->>'role') = 'service_role'
);

-- ------------------------------------------------------------
-- 8. Career Applications (PRIVATE)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.career_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL,
    portfolio_url TEXT,
    linkedin_url TEXT,
    resume_url TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Reviewing', 'Shortlisted', 'Rejected', 'Hired')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_career_applications_created ON public.career_applications(created_at DESC);

ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an application
CREATE POLICY "Public insert career application"
ON public.career_applications
FOR INSERT
TO anon, authenticated, service_role
WITH CHECK (true);

-- ONLY admins can view or modify applications (CRUCIAL PRIVACY RULE)
CREATE POLICY "Admins view and edit applications"
ON public.career_applications
FOR ALL
TO authenticated, service_role
USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()) 
    OR (SELECT auth.jwt()->>'role') = 'service_role'
);

-- ------------------------------------------------------------
-- 9. Contact Submissions (PRIVATE)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    service TEXT NOT NULL,
    budget TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created ON public.contact_submissions(created_at DESC);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit inquiry
CREATE POLICY "Public insert contact submission"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated, service_role
WITH CHECK (true);

-- ONLY admins can view or modify contact submissions
CREATE POLICY "Admins view and edit contact submissions"
ON public.contact_submissions
FOR ALL
TO authenticated, service_role
USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()) 
    OR (SELECT auth.jwt()->>'role') = 'service_role'
);

-- ------------------------------------------------------------
-- 10. Site Settings
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site settings"
ON public.site_settings
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins edit site settings"
ON public.site_settings
FOR ALL
TO authenticated, service_role
USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()) 
    OR (SELECT auth.jwt()->>'role') = 'service_role'
);
