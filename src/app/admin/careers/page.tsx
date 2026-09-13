'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { Button } from '@/components/ui/Button';
import { AdminTable } from '@/components/admin/AdminTable';
import { createClient } from '@/lib/supabase/client';
import { JOBS } from '@/lib/data/jobs';
import { CmsJob } from '@/types/cms';

export default function AdminCareersPage() {
  const [jobs, setJobs] = useState<CmsJob[]>([]);
  const [deleteCandidate, setDeleteCandidate] = useState<CmsJob | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('job_openings')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        const fallback: CmsJob[] = JOBS.map((j, idx) => ({
          id: j.id,
          slug: j.slug,
          title: j.title,
          department: j.department,
          location: j.location,
          type: j.type,
          description: j.description,
          responsibilities: j.responsibilities,
          requirements: j.requirements,
          niceToHave: j.niceToHave,
          status: j.status,
          sortOrder: idx,
          createdAt: new Date().toISOString(),
        }));
        setJobs(fallback);
      } else {
        setJobs(
          data.map((item: Record<string, unknown>) => ({
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
            status: item.status as 'open' | 'closed',
            sortOrder: Number(item.sort_order) || 0,
            createdAt: String(item.created_at || new Date().toISOString()),
          }))
        );
      }
    } catch {
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleToggleStatus = async (job: CmsJob) => {
    const newStatus: 'open' | 'closed' = job.status === 'open' ? 'closed' : 'open';
    try {
      const supabase = createClient();
      await supabase
        .from('job_openings')
        .update({ status: newStatus })
        .eq('slug', job.slug);

      setJobs((prev) =>
        prev.map((j) => (j.slug === job.slug ? { ...j, status: newStatus } : j))
      );

      fetch('/api/admin/revalidate', {
        method: 'POST',
        body: JSON.stringify({ paths: ['/careers', `/careers/${job.slug}`] }),
      });
    } catch (err) {
      console.error('Failed to toggle job status:', err);
    }
  };

  const handleDelete = async () => {
    if (!deleteCandidate) return;
    try {
      const supabase = createClient();
      await supabase.from('job_openings').delete().eq('slug', deleteCandidate.slug);
      setJobs((prev) => prev.filter((j) => j.slug !== deleteCandidate.slug));
      setDeleteCandidate(null);
      fetch('/api/admin/revalidate', {
        method: 'POST',
        body: JSON.stringify({ paths: ['/careers'] }),
      });
    } catch (err) {
      console.error('Failed to delete job:', err);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#fbfcfc] tracking-tight">Job Openings Management</h2>
          <p className="text-xs text-[#9aaecf]">Manage open roles, descriptions, requirements, and hiring status</p>
        </div>
        <div className="flex items-center gap-3">
          <Button href="/admin/applications" variant="secondary" size="sm">
            View Applications →
          </Button>
          <Button href="/admin/careers/new" variant="primary" size="sm">
            + Post New Role
          </Button>
        </div>
      </div>

      <AdminTable isEmpty={jobs.length === 0} emptyMessage={isLoading ? 'Loading roles...' : 'No job openings found.'}>
        <thead className="border-b border-[rgba(251,252,252,0.08)] bg-[#111835]/50 text-[11px] font-mono text-[#62759e] uppercase">
          <tr>
            <th className="py-3 px-4">Role Title &amp; Department</th>
            <th className="py-3 px-4">Location</th>
            <th className="py-3 px-4">Type</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[rgba(251,252,252,0.06)]">
          {jobs.map((j) => (
            <tr key={j.slug} className="hover:bg-[#18224b]/40 transition-colors">
              <td className="py-3.5 px-4">
                <span className="font-bold text-[#fbfcfc] block">{j.title}</span>
                <span className="text-xs text-[#62759e] font-mono">{j.department} • /{j.slug}</span>
              </td>
              <td className="py-3.5 px-4 font-mono text-xs text-[#9aaecf]">{j.location}</td>
              <td className="py-3.5 px-4 font-mono text-xs text-[#f8d613]">{j.type}</td>
              <td className="py-3.5 px-4">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    j.status === 'open'
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-600/30'
                  }`}
                >
                  {j.status === 'open' ? 'Open for Apps' : 'Closed'}
                </span>
              </td>
              <td className="py-3.5 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleToggleStatus(j)}
                    className="text-xs px-2.5 py-1 rounded bg-[#18224b] hover:bg-[#0248c1]/30 text-[#9aaecf] hover:text-[#fbfcfc] border border-[rgba(251,252,252,0.1)] transition-colors"
                  >
                    {j.status === 'open' ? 'Close Role' : 'Reopen'}
                  </button>
                  <Link
                    href={`/admin/careers/${j.slug}`}
                    className="text-xs px-2.5 py-1 rounded bg-[#18224b] hover:bg-[#0248c1] text-[#fbfcfc] border border-[rgba(251,252,252,0.1)] transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setDeleteCandidate(j)}
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
        title="Delete Job Opening"
        message={`Are you sure you want to permanently delete "${deleteCandidate?.title}"?`}
        confirmText="Delete Role"
      />
    </div>
  );
}
