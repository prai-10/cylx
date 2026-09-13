'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { Button } from '@/components/ui/Button';
import { AdminTable } from '@/components/admin/AdminTable';
import { createClient } from '@/lib/supabase/client';
import { PROJECTS } from '@/lib/data/projects';
import { CmsProject, ContentStatus } from '@/types/cms';

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<CmsProject[]>([]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [deleteCandidate, setDeleteCandidate] = useState<CmsProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        // Map baseline projects to CMS format
        const fallback: CmsProject[] = PROJECTS.map((p, idx) => ({
          id: p.slug,
          slug: p.slug,
          title: p.title,
          client: p.client,
          category: p.category,
          year: p.year,
          description: p.description,
          services: p.services,
          thumbnail: p.thumbnail,
          heroMedia: p.heroMedia,
          gallery: p.gallery,
          overview: p.overview,
          challenge: p.challenge,
          approach: p.approach,
          execution: p.execution,
          results: p.results,
          tags: p.tags,
          status: 'published',
          isFeatured: idx === 0,
          sortOrder: idx,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }));
        setProjects(fallback);
      } else {
        setProjects(data as CmsProject[]);
      }
    } catch {
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleToggleStatus = async (project: CmsProject) => {
    const newStatus: ContentStatus = project.status === 'published' ? 'draft' : 'published';
    try {
      const supabase = createClient();
      await supabase
        .from('portfolio_projects')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('slug', project.slug);

      setProjects((prev) =>
        prev.map((p) => (p.slug === project.slug ? { ...p, status: newStatus } : p))
      );
      // Trigger cache revalidation
      fetch('/api/admin/revalidate', {
        method: 'POST',
        body: JSON.stringify({ paths: ['/', '/portfolio', `/portfolio/${project.slug}`] }),
      });
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  const handleDelete = async () => {
    if (!deleteCandidate) return;
    try {
      const supabase = createClient();
      await supabase.from('portfolio_projects').delete().eq('slug', deleteCandidate.slug);
      setProjects((prev) => prev.filter((p) => p.slug !== deleteCandidate.slug));
      setDeleteCandidate(null);
      fetch('/api/admin/revalidate', {
        method: 'POST',
        body: JSON.stringify({ paths: ['/', '/portfolio'] }),
      });
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  const filtered = filterCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === filterCategory);

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#fbfcfc] tracking-tight">Portfolio Management</h2>
          <p className="text-xs text-[#9aaecf]">Manage client campaigns, category tags, media, and publishing status</p>
        </div>
        <Button href="/admin/portfolio/new" variant="primary" size="sm">
          + Create New Project
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['All', 'Fashion', 'Beauty', 'Food', 'Tech'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              filterCategory === cat
                ? 'bg-[#f8d613] text-[#111835] font-bold'
                : 'bg-[#18224b] text-[#9aaecf] hover:text-[#fbfcfc]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <AdminTable isEmpty={filtered.length === 0} emptyMessage={isLoading ? 'Loading portfolio...' : 'No projects found.'}>
        <thead className="border-b border-[rgba(251,252,252,0.08)] bg-[#111835]/50 text-[11px] font-mono text-[#62759e] uppercase">
          <tr>
            <th className="py-3 px-4">Title &amp; Client</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Year</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[rgba(251,252,252,0.06)]">
          {filtered.map((p) => (
            <tr key={p.slug} className="hover:bg-[#18224b]/40 transition-colors">
              <td className="py-3.5 px-4">
                <span className="font-bold text-[#fbfcfc] block">{p.title}</span>
                <span className="text-xs text-[#62759e] font-mono">{p.client} • /{p.slug}</span>
              </td>
              <td className="py-3.5 px-4 font-mono text-[#f8d613]">{p.category}</td>
              <td className="py-3.5 px-4 font-mono">{p.year}</td>
              <td className="py-3.5 px-4">
                <StatusBadge status={p.status} />
              </td>
              <td className="py-3.5 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleToggleStatus(p)}
                    className="text-xs px-2.5 py-1 rounded bg-[#18224b] hover:bg-[#0248c1]/30 text-[#9aaecf] hover:text-[#fbfcfc] border border-[rgba(251,252,252,0.1)] transition-colors"
                  >
                    {p.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>
                  <Link
                    href={`/admin/portfolio/${p.slug}`}
                    className="text-xs px-2.5 py-1 rounded bg-[#18224b] hover:bg-[#0248c1] text-[#fbfcfc] border border-[rgba(251,252,252,0.1)] transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setDeleteCandidate(p)}
                    className="text-xs px-2.5 py-1 rounded bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/20 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>

      <ConfirmModal
        isOpen={Boolean(deleteCandidate)}
        onClose={() => setDeleteCandidate(null)}
        onConfirm={handleDelete}
        title="Delete Portfolio Project"
        message={`Are you sure you want to permanently delete "${deleteCandidate?.title}"? This action cannot be undone.`}
        confirmText="Delete Project"
      />
    </div>
  );
}
