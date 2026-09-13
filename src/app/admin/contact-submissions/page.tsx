'use client';

import React, { useState, useEffect } from 'react';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { AdminTable } from '@/components/admin/AdminTable';
import { createClient } from '@/lib/supabase/client';
import { CmsContactSubmission, ContactStatus } from '@/types/cms';

const MOCK_CONTACTS: CmsContactSubmission[] = [
  {
    id: 'inq-01',
    name: 'Vikram Singhania',
    email: 'vikram@nu-apparel.com',
    company: 'NU Apparel Group',
    phone: '+91 99887 76655',
    service: 'Performance Marketing',
    budget: '₹5L - ₹15L / month',
    message: 'Looking to scale Meta ad spend for our autumn drop from ₹10L to ₹50L/mo. Current ROAS has stalled at 1.8x. Need creator whitelisting support.',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'inq-02',
    name: 'Natasha Bose',
    email: 'natasha@velvetgleam.in',
    company: 'Velvet Gleam Cosmetics',
    service: 'Influencer Marketing',
    budget: '₹2L - ₹5L / month',
    message: 'We have 4 clean beauty SKUs launching next month. We need 15 category-vetted creators with dark-posting rights.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: 'inq-03',
    name: 'Karan Mehra',
    email: 'karan@voltbytes.io',
    company: 'VoltBytes Tech',
    service: 'Website Development',
    budget: '₹15L+ / project',
    message: 'Need an award-winning Next.js 3D web flagship for our direct-to-consumer hardware brand launch.',
    status: 'Closed',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
  },
];

export default function AdminContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<CmsContactSubmission[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedInquiry, setSelectedInquiry] = useState<CmsContactSubmission | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        setSubmissions(MOCK_CONTACTS);
      } else {
        setSubmissions(
          data.map((item: Record<string, unknown>) => ({
            id: String(item.id),
            name: String(item.name),
            email: String(item.email),
            company: item.company ? String(item.company) : undefined,
            phone: item.phone ? String(item.phone) : undefined,
            service: String(item.service),
            budget: item.budget ? String(item.budget) : undefined,
            message: String(item.message),
            status: item.status as ContactStatus,
            createdAt: String(item.created_at),
          }))
        );
      }
    } catch {
      setSubmissions(MOCK_CONTACTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: ContactStatus) => {
    try {
      const supabase = createClient();
      await supabase
        .from('contact_submissions')
        .update({ status: newStatus })
        .eq('id', id);

      setSubmissions((prev) =>
        prev.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub))
      );

      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      console.error('Failed to update submission status:', err);
    }
  };

  const statuses: (ContactStatus | 'All')[] = ['All', 'New', 'Contacted', 'Closed'];

  const filtered = filterStatus === 'All'
    ? submissions
    : submissions.filter((s) => s.status === filterStatus);

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-black text-[#fbfcfc] tracking-tight">Contact Submissions</h2>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/60 text-amber-300 border border-amber-500/30">
            CONFIDENTIAL · ADMIN ONLY
          </span>
        </div>
        <p className="text-xs text-[#9aaecf]">
          Manage incoming brand growth leads, project inquiries, and sales pipeline statuses
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              filterStatus === s
                ? 'bg-[#f8d613] text-[#111835] font-bold'
                : 'bg-[#18224b] text-[#9aaecf] hover:text-[#fbfcfc]'
            }`}
          >
            {s} ({s === 'All' ? submissions.length : submissions.filter((sub) => sub.status === s).length})
          </button>
        ))}
      </div>

      {/* Table */}
      <AdminTable isEmpty={filtered.length === 0} emptyMessage={isLoading ? 'Loading inquiries...' : 'No inquiries found.'}>
        <thead className="border-b border-[rgba(251,252,252,0.08)] bg-[#111835]/50 text-[11px] font-mono text-[#62759e] uppercase">
          <tr>
            <th className="py-3 px-4">Brand &amp; Contact</th>
            <th className="py-3 px-4">Service</th>
            <th className="py-3 px-4">Budget Range</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Received</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[rgba(251,252,252,0.06)]">
          {filtered.map((sub) => (
            <tr key={sub.id} className="hover:bg-[#18224b]/40 transition-colors">
              <td className="py-3.5 px-4">
                <span className="font-bold text-[#fbfcfc] block">{sub.name}</span>
                <span className="text-xs text-[#62759e] font-mono">
                  {sub.company ? `${sub.company} • ` : ''}{sub.email}
                </span>
              </td>
              <td className="py-3.5 px-4 font-mono text-xs text-[#f8d613]">{sub.service}</td>
              <td className="py-3.5 px-4 font-mono text-xs text-[#9aaecf]">{sub.budget || 'Custom'}</td>
              <td className="py-3.5 px-4">
                <StatusBadge status={sub.status} />
              </td>
              <td className="py-3.5 px-4 text-xs font-mono text-[#62759e]">
                {new Date(sub.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3.5 px-4 text-right">
                <button
                  onClick={() => setSelectedInquiry(sub)}
                  className="text-xs px-2.5 py-1 rounded bg-[#18224b] hover:bg-[#0248c1] text-[#fbfcfc] border border-[rgba(251,252,252,0.1)] transition-colors"
                >
                  View Inquiry
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0f24]/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-[#162048] border border-[rgba(251,252,252,0.1)] rounded-3xl p-6 shadow-2xl flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-[rgba(251,252,252,0.08)] pb-4">
              <div>
                <h3 className="text-xl font-bold text-[#fbfcfc]">{selectedInquiry.name}</h3>
                <p className="text-xs font-mono text-[#f8d613]">
                  {selectedInquiry.company ? `${selectedInquiry.company} · ` : ''}{selectedInquiry.service}
                </p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-[#9aaecf] hover:text-[#fbfcfc] text-lg font-mono"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#62759e] block font-mono uppercase">Email</span>
                <a href={`mailto:${selectedInquiry.email}`} className="text-[#fbfcfc] font-mono hover:text-[#f8d613]">
                  {selectedInquiry.email}
                </a>
              </div>
              <div>
                <span className="text-[#62759e] block font-mono uppercase">Phone</span>
                <span className="text-[#fbfcfc] font-mono">{selectedInquiry.phone || 'Not provided'}</span>
              </div>
              <div>
                <span className="text-[#62759e] block font-mono uppercase">Selected Service</span>
                <span className="text-[#fbfcfc] font-medium">{selectedInquiry.service}</span>
              </div>
              <div>
                <span className="text-[#62759e] block font-mono uppercase">Target Monthly Spend / Budget</span>
                <span className="text-[#f8d613] font-mono">{selectedInquiry.budget || 'Custom discussion'}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#111835] border border-[rgba(251,252,252,0.06)]">
              <span className="text-[11px] font-mono text-[#62759e] uppercase block mb-1">Brand Message / Brief</span>
              <p className="text-xs text-[#9aaecf] leading-relaxed whitespace-pre-line">{selectedInquiry.message}</p>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-[rgba(251,252,252,0.08)]">
              <label className="text-xs font-mono text-[#9aaecf] uppercase">Update Inquiry Status</label>
              <div className="flex items-center gap-2">
                {(['New', 'Contacted', 'Closed'] as ContactStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedInquiry.id, st)}
                    className={`text-xs px-3.5 py-1.5 rounded-lg font-mono transition-all ${
                      selectedInquiry.status === st
                        ? 'bg-[#f8d613] text-[#111835] font-bold'
                        : 'bg-[#18224b] text-[#9aaecf] hover:text-[#fbfcfc]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 flex justify-between items-center">
              <a
                href={`mailto:${selectedInquiry.email}?subject=CLYX Media — Re: Your Growth Inquiry`}
                className="text-xs px-4 py-2 rounded-xl bg-[#0248c1] text-[#fbfcfc] hover:bg-[#0248c1]/80 font-bold"
              >
                Reply via Email ↗
              </a>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-xs px-4 py-2 rounded-xl bg-[#18224b] text-[#fbfcfc] hover:bg-[#18224b]/80"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
