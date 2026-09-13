import React from 'react';
import Link from 'next/link';
import { getAdminSupabaseClient } from '@/lib/supabase/admin';
import { PROJECTS } from '@/lib/data/projects';
import { CASE_STUDIES } from '@/lib/data/caseStudies';
import { CREATORS } from '@/lib/data/creators';
import { BLOG_POSTS } from '@/lib/data/blog';
import { JOBS } from '@/lib/data/jobs';
import { Button } from '@/components/ui/Button';

export default async function AdminDashboardPage() {
  let projectCount = PROJECTS.length;
  let caseStudyCount = CASE_STUDIES.length;
  let creatorCount = CREATORS.length;
  let blogCount = BLOG_POSTS.length;
  let jobCount = JOBS.length;
  let newContactCount = 0;
  let newApplicationCount = 0;
  let recentContacts: { id: string; name: string; email: string; service: string; created_at: string; status: string }[] = [];

  const supabase = getAdminSupabaseClient();
  if (supabase) {
    try {
      const [
        { count: pc },
        { count: csc },
        { count: cc },
        { count: bc },
        { count: jc },
        { count: ncc },
        { count: nac },
        { data: rc },
      ] = await Promise.all([
        supabase.from('portfolio_projects').select('*', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('case_studies').select('*', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('creators').select('*', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('job_openings').select('*', { count: 'exact', head: true }).eq('status', 'open'),
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('status', 'New'),
        supabase.from('career_applications').select('*', { count: 'exact', head: true }).eq('status', 'New'),
        supabase.from('contact_submissions').select('id, name, email, service, created_at, status').order('created_at', { ascending: false }).limit(5),
      ]);

      if (pc !== null && pc > 0) projectCount = pc;
      if (csc !== null && csc > 0) caseStudyCount = csc;
      if (cc !== null && cc > 0) creatorCount = cc;
      if (bc !== null && bc > 0) blogCount = bc;
      if (jc !== null && jc > 0) jobCount = jc;
      if (ncc !== null) newContactCount = ncc;
      if (nac !== null) newApplicationCount = nac;
      if (rc && rc.length > 0) recentContacts = rc as typeof recentContacts;
    } catch (err) {
      console.warn('[AdminDashboard] Query error, using baseline counts:', err);
    }
  }

  const statCards = [
    { label: 'Published Projects', count: projectCount, href: '/admin/portfolio', icon: '📁' },
    { label: 'Published Case Studies', count: caseStudyCount, href: '/admin/case-studies', icon: '📈' },
    { label: 'Active Creators', count: creatorCount, href: '/admin/creators', icon: '✨' },
    { label: 'Published Articles', count: blogCount, href: '/admin/blog', icon: '✍️' },
    { label: 'Open Job Positions', count: jobCount, href: '/admin/careers', icon: '💼' },
    { label: 'New Inquiries', count: newContactCount, href: '/admin/contact-submissions', icon: '📬', highlight: newContactCount > 0 },
    { label: 'New Applications', count: newApplicationCount, href: '/admin/applications', icon: '👥', highlight: newApplicationCount > 0 },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-7xl">
      {/* Top Banner / Quick Actions */}
      <div className="p-8 rounded-3xl bg-[#162048] border border-[rgba(251,252,252,0.08)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#f8d613] block mb-2">
            Overview &amp; Telemetry
          </span>
          <h2 className="text-2xl font-bold text-[#fbfcfc]">
            CLYX Content &amp; Lead Command Center
          </h2>
          <p className="text-xs text-[#9aaecf] mt-1">
            Real-time status of published portfolio items, whitelisting case studies, and inbound submissions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button href="/admin/portfolio/new" variant="primary" size="sm">
            + New Project
          </Button>
          <Button href="/admin/case-studies/new" variant="secondary" size="sm">
            + New Case Study
          </Button>
          <Button href="/admin/blog/new" variant="outline" size="sm">
            + New Article
          </Button>
        </div>
      </div>

      {/* Real Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`p-6 rounded-2xl bg-[#162048] border transition-all hover:translate-y-[-2px] flex flex-col justify-between ${
              card.highlight
                ? 'border-[#f8d613]/60 shadow-[0_0_15px_rgba(248,214,19,0.1)]'
                : 'border-[rgba(251,252,252,0.08)] hover:border-[#0248c1]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl">{card.icon}</span>
              <span className="text-xs font-mono text-[#62759e]">View →</span>
            </div>
            <div>
              <span className="text-3xl font-black font-mono text-[#fbfcfc] block">
                {card.count}
              </span>
              <span className="text-xs font-medium text-[#9aaecf] mt-1 block">
                {card.label}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity Table */}
      <div className="p-8 rounded-3xl bg-[#162048] border border-[rgba(251,252,252,0.08)] flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#fbfcfc]">Recent Client Inquiries</h3>
            <p className="text-xs text-[#9aaecf]">Latest submissions from the public website</p>
          </div>
          <Link href="/admin/contact-submissions" className="text-xs font-mono text-[#f8d613] hover:underline">
            View all inquiries →
          </Link>
        </div>

        {recentContacts.length === 0 ? (
          <div className="py-10 text-center text-xs text-[#9aaecf] bg-[#111835] rounded-2xl border border-[rgba(251,252,252,0.06)]">
            No live contact submissions in database yet. New inquiries submitted through /contact will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#9aaecf]">
              <thead className="border-b border-[rgba(251,252,252,0.08)] text-[11px] font-mono text-[#62759e] uppercase">
                <tr>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Discipline</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(251,252,252,0.06)]">
                {recentContacts.map((c) => (
                  <tr key={c.id} className="hover:bg-[#18224b]/50">
                    <td className="py-3 px-4 font-bold text-[#fbfcfc]">{c.name}</td>
                    <td className="py-3 px-4 font-mono">{c.email}</td>
                    <td className="py-3 px-4">{c.service}</td>
                    <td className="py-3 px-4 font-mono text-xs text-[#f8d613]">{c.status}</td>
                    <td className="py-3 px-4 text-[#62759e]">
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
