'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { Button } from '@/components/ui/Button';
import { AdminTable } from '@/components/admin/AdminTable';
import { createClient } from '@/lib/supabase/client';
import { CASE_STUDIES } from '@/lib/data/caseStudies';
import { CmsCaseStudy, ContentStatus } from '@/types/cms';

export default function AdminCaseStudiesPage() {
  const [studies, setStudies] = useState<CmsCaseStudy[]>([]);
  const [deleteCandidate, setDeleteCandidate] = useState<CmsCaseStudy | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCaseStudies = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        const fallback: CmsCaseStudy[] = CASE_STUDIES.map((c, idx) => ({
          id: c.slug,
          slug: c.slug,
          title: c.title,
          client: c.client,
          category: c.category,
          adSpendManaged: c.adSpendManaged,
          roasLift: c.roasLift,
          creatorHandle: c.creatorHandle,
          whitelistedFormat: c.whitelistedFormat,
          summary: c.summary,
          challenge: c.challenge,
          whitelistingStrategy: c.whitelistingStrategy,
          scalingData: c.scalingData,
          results: c.results,
          status: 'published',
          isFeatured: idx === 0,
          sortOrder: idx,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }));
        setStudies(fallback);
      } else {
        setStudies(data as CmsCaseStudy[]);
      }
    } catch {
      setStudies([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const handleToggleStatus = async (study: CmsCaseStudy) => {
    const newStatus: ContentStatus = study.status === 'published' ? 'draft' : 'published';
    try {
      const supabase = createClient();
      await supabase
        .from('case_studies')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('slug', study.slug);

      setStudies((prev) =>
        prev.map((s) => (s.slug === study.slug ? { ...s, status: newStatus } : s))
      );
      fetch('/api/admin/revalidate', {
        method: 'POST',
        body: JSON.stringify({ paths: ['/', '/case-studies', `/case-studies/${study.slug}`] }),
      });
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  const handleDelete = async () => {
    if (!deleteCandidate) return;
    try {
      const supabase = createClient();
      await supabase.from('case_studies').delete().eq('slug', deleteCandidate.slug);
      setStudies((prev) => prev.filter((s) => s.slug !== deleteCandidate.slug));
      setDeleteCandidate(null);
      fetch('/api/admin/revalidate', {
        method: 'POST',
        body: JSON.stringify({ paths: ['/', '/case-studies'] }),
      });
    } catch (err) {
      console.error('Failed to delete case study:', err);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#fbfcfc] tracking-tight">Case Studies Management</h2>
          <p className="text-xs text-[#9aaecf]">Manage creator whitelisting data, ROAS metrics, handles, and ad spend records</p>
        </div>
        <Button href="/admin/case-studies/new" variant="primary" size="sm">
          + Create New Case Study
        </Button>
      </div>

      <AdminTable isEmpty={studies.length === 0} emptyMessage={isLoading ? 'Loading case studies...' : 'No case studies found.'}>
        <thead className="border-b border-[rgba(251,252,252,0.08)] bg-[#111835]/50 text-[11px] font-mono text-[#62759e] uppercase">
          <tr>
            <th className="py-3 px-4">Title &amp; Client</th>
            <th className="py-3 px-4">Creator Handle</th>
            <th className="py-3 px-4">ROAS Lift</th>
            <th className="py-3 px-4">Ad Spend</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[rgba(251,252,252,0.06)]">
          {studies.map((s) => (
            <tr key={s.slug} className="hover:bg-[#18224b]/40 transition-colors">
              <td className="py-3.5 px-4">
                <span className="font-bold text-[#fbfcfc] block">{s.title}</span>
                <span className="text-xs text-[#62759e] font-mono">{s.client} • /{s.slug}</span>
              </td>
              <td className="py-3.5 px-4 font-mono text-[#f8d613]">{s.creatorHandle}</td>
              <td className="py-3.5 px-4 font-mono font-bold text-[#fbfcfc]">{s.roasLift}</td>
              <td className="py-3.5 px-4 font-mono text-xs">{s.adSpendManaged}</td>
              <td className="py-3.5 px-4">
                <StatusBadge status={s.status} />
              </td>
              <td className="py-3.5 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleToggleStatus(s)}
                    className="text-xs px-2.5 py-1 rounded bg-[#18224b] hover:bg-[#0248c1]/30 text-[#9aaecf] hover:text-[#fbfcfc] border border-[rgba(251,252,252,0.1)] transition-colors"
                  >
                    {s.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>
                  <Link
                    href={`/admin/case-studies/${s.slug}`}
                    className="text-xs px-2.5 py-1 rounded bg-[#18224b] hover:bg-[#0248c1] text-[#fbfcfc] border border-[rgba(251,252,252,0.1)] transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setDeleteCandidate(s)}
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
        title="Delete Case Study"
        message={`Are you sure you want to delete case study "${deleteCandidate?.title}"?`}
        confirmText="Delete Case Study"
      />
    </div>
  );
}
