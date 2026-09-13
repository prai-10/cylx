'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { Button } from '@/components/ui/Button';
import { AdminTable } from '@/components/admin/AdminTable';
import { createClient } from '@/lib/supabase/client';
import { CREATORS } from '@/lib/data/creators';
import { CmsCreator, ContentStatus } from '@/types/cms';

export default function AdminCreatorsPage() {
  const [creators, setCreators] = useState<CmsCreator[]>([]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [deleteCandidate, setDeleteCandidate] = useState<CmsCreator | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCreators = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        const fallback: CmsCreator[] = CREATORS.map((c, idx) => ({
          id: c.id,
          name: c.name,
          handle: c.handle,
          platform: c.platform,
          category: c.category,
          followers: c.followers,
          averageEngagement: c.averageEngagement,
          specialty: c.specialty,
          whitelistingReady: c.whitelistingReady,
          status: 'published',
          sortOrder: idx,
          createdAt: new Date().toISOString(),
        }));
        setCreators(fallback);
      } else {
        setCreators(
          data.map((c: Record<string, unknown>) => ({
            id: String(c.id),
            name: String(c.name),
            handle: String(c.handle),
            platform: c.platform as CmsCreator['platform'],
            category: c.category as CmsCreator['category'],
            followers: String(c.followers),
            averageEngagement: String(c.average_engagement),
            specialty: String(c.specialty),
            whitelistingReady: Boolean(c.whitelisting_ready),
            status: c.status as ContentStatus,
            sortOrder: Number(c.sort_order) || 0,
            createdAt: String(c.created_at || new Date().toISOString()),
          }))
        );
      }
    } catch {
      setCreators([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  const handleToggleStatus = async (creator: CmsCreator) => {
    const newStatus: ContentStatus = creator.status === 'published' ? 'draft' : 'published';
    try {
      const supabase = createClient();
      await supabase
        .from('creators')
        .update({ status: newStatus })
        .eq('handle', creator.handle);

      setCreators((prev) =>
        prev.map((c) => (c.handle === creator.handle ? { ...c, status: newStatus } : c))
      );

      fetch('/api/admin/revalidate', {
        method: 'POST',
        body: JSON.stringify({ paths: ['/', '/creators'] }),
      });
    } catch (err) {
      console.error('Failed to toggle creator status:', err);
    }
  };

  const handleDelete = async () => {
    if (!deleteCandidate) return;
    try {
      const supabase = createClient();
      await supabase.from('creators').delete().eq('handle', deleteCandidate.handle);
      setCreators((prev) => prev.filter((c) => c.handle !== deleteCandidate.handle));
      setDeleteCandidate(null);
      fetch('/api/admin/revalidate', {
        method: 'POST',
        body: JSON.stringify({ paths: ['/', '/creators'] }),
      });
    } catch (err) {
      console.error('Failed to delete creator:', err);
    }
  };

  const filtered = filterCategory === 'All'
    ? creators
    : creators.filter((c) => c.category === filterCategory);

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#fbfcfc] tracking-tight">Creator Network Management</h2>
          <p className="text-xs text-[#9aaecf]">Manage whitelisted creator roster, metrics, platforms, and publishing status</p>
        </div>
        <Button href="/admin/creators/new" variant="primary" size="sm">
          + Add Creator
        </Button>
      </div>

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

      <AdminTable isEmpty={filtered.length === 0} emptyMessage={isLoading ? 'Loading creators...' : 'No creators found.'}>
        <thead className="border-b border-[rgba(251,252,252,0.08)] bg-[#111835]/50 text-[11px] font-mono text-[#62759e] uppercase">
          <tr>
            <th className="py-3 px-4">Creator</th>
            <th className="py-3 px-4">Platform &amp; Category</th>
            <th className="py-3 px-4">Followers</th>
            <th className="py-3 px-4">Engagement</th>
            <th className="py-3 px-4">Whitelisting</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[rgba(251,252,252,0.06)]">
          {filtered.map((c) => (
            <tr key={c.handle} className="hover:bg-[#18224b]/40 transition-colors">
              <td className="py-3.5 px-4">
                <span className="font-bold text-[#fbfcfc] block">{c.name}</span>
                <span className="text-xs text-[#62759e] font-mono">{c.handle}</span>
              </td>
              <td className="py-3.5 px-4 font-mono text-xs text-[#9aaecf]">
                <span className="text-[#f8d613]">{c.platform}</span> • {c.category}
              </td>
              <td className="py-3.5 px-4 font-mono text-[#fbfcfc] font-bold">{c.followers}</td>
              <td className="py-3.5 px-4 font-mono text-emerald-400">{c.averageEngagement}</td>
              <td className="py-3.5 px-4">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                  {c.whitelistingReady ? 'Verified Ready' : 'Pending'}
                </span>
              </td>
              <td className="py-3.5 px-4">
                <StatusBadge status={c.status} />
              </td>
              <td className="py-3.5 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleToggleStatus(c)}
                    className="text-xs px-2.5 py-1 rounded bg-[#18224b] hover:bg-[#0248c1]/30 text-[#9aaecf] hover:text-[#fbfcfc] border border-[rgba(251,252,252,0.1)] transition-colors"
                  >
                    {c.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>
                  <Link
                    href={`/admin/creators/${encodeURIComponent(c.handle.replace('@', ''))}`}
                    className="text-xs px-2.5 py-1 rounded bg-[#18224b] hover:bg-[#0248c1] text-[#fbfcfc] border border-[rgba(251,252,252,0.1)] transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setDeleteCandidate(c)}
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
        title="Remove Creator from Network"
        message={`Are you sure you want to delete "${deleteCandidate?.name}" (${deleteCandidate?.handle})? This action cannot be undone.`}
        confirmText="Delete Creator"
      />
    </div>
  );
}
