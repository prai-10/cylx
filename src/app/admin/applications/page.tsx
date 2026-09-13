'use client';

import React, { useState, useEffect } from 'react';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { AdminTable } from '@/components/admin/AdminTable';
import { createClient } from '@/lib/supabase/client';
import { CmsApplication, ApplicationStatus } from '@/types/cms';

const MOCK_APPLICATIONS: CmsApplication[] = [
  {
    id: 'app-01',
    name: 'Aarav Mehta',
    email: 'aarav.m@gmail.com',
    phone: '+91 98201 23456',
    role: 'Senior Creative Strategist',
    portfolioUrl: 'https://aarav.design',
    linkedinUrl: 'https://linkedin.com/in/aaravmehta',
    resumeUrl: 'https://aarav.design/resume.pdf',
    message: 'Obsessed with Clyx’s creator whitelisting approach. Ran creative strategy at a D2C beverage brand scaling from ₹0 to ₹10Cr.',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'app-02',
    name: 'Chloe Rivera',
    email: 'chloe.r.motion@gmail.com',
    role: 'Lead Motion & 3D Designer',
    portfolioUrl: 'https://chloe-motion.work',
    linkedinUrl: 'https://linkedin.com/in/chloerivera',
    message: 'Check out my latest Blender / Three.js kinetic simulations. Would love to elevate Clyx’s brand world.',
    status: 'Reviewing',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'app-03',
    name: 'Devin Scott',
    email: 'devin@frontend.dev',
    role: 'Creative Frontend Engineer',
    portfolioUrl: 'https://devinscott.io',
    message: 'Specialist in WebGL, GSAP ScrollTrigger, and sub-second Next.js e-commerce architectures.',
    status: 'Shortlisted',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<CmsApplication[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedApp, setSelectedApp] = useState<CmsApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('career_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        setApplications(MOCK_APPLICATIONS);
      } else {
        setApplications(
          data.map((item: Record<string, unknown>) => ({
            id: String(item.id),
            name: String(item.name),
            email: String(item.email),
            phone: item.phone ? String(item.phone) : undefined,
            role: String(item.role),
            portfolioUrl: item.portfolio_url ? String(item.portfolio_url) : undefined,
            linkedinUrl: item.linkedin_url ? String(item.linkedin_url) : undefined,
            resumeUrl: item.resume_url ? String(item.resume_url) : undefined,
            message: item.message ? String(item.message) : undefined,
            status: item.status as ApplicationStatus,
            createdAt: String(item.created_at),
          }))
        );
      }
    } catch {
      setApplications(MOCK_APPLICATIONS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: ApplicationStatus) => {
    try {
      const supabase = createClient();
      await supabase
        .from('career_applications')
        .update({ status: newStatus })
        .eq('id', id);

      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );

      if (selectedApp && selectedApp.id === id) {
        setSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      console.error('Failed to update application status:', err);
    }
  };

  const statuses: (ApplicationStatus | 'All')[] = [
    'All',
    'New',
    'Reviewing',
    'Shortlisted',
    'Rejected',
    'Hired',
  ];

  const filtered = filterStatus === 'All'
    ? applications
    : applications.filter((a) => a.status === filterStatus);

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-black text-[#fbfcfc] tracking-tight">Career Applications</h2>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/60 text-amber-300 border border-amber-500/30">
            CONFIDENTIAL · ADMIN ONLY
          </span>
        </div>
        <p className="text-xs text-[#9aaecf]">
          Review talent candidates, evaluate portfolios, and manage the candidate evaluation pipeline
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
            {s} ({s === 'All' ? applications.length : applications.filter((a) => a.status === s).length})
          </button>
        ))}
      </div>

      {/* Table */}
      <AdminTable isEmpty={filtered.length === 0} emptyMessage={isLoading ? 'Loading candidates...' : 'No applications found.'}>
        <thead className="border-b border-[rgba(251,252,252,0.08)] bg-[#111835]/50 text-[11px] font-mono text-[#62759e] uppercase">
          <tr>
            <th className="py-3 px-4">Candidate &amp; Role</th>
            <th className="py-3 px-4">Contact</th>
            <th className="py-3 px-4">Links</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Applied</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[rgba(251,252,252,0.06)]">
          {filtered.map((app) => (
            <tr key={app.id} className="hover:bg-[#18224b]/40 transition-colors">
              <td className="py-3.5 px-4">
                <span className="font-bold text-[#fbfcfc] block">{app.name}</span>
                <span className="text-xs text-[#f8d613] font-mono">{app.role}</span>
              </td>
              <td className="py-3.5 px-4 text-xs font-mono text-[#9aaecf]">
                <div>{app.email}</div>
                {app.phone && <div className="text-[11px] text-[#62759e]">{app.phone}</div>}
              </td>
              <td className="py-3.5 px-4 text-xs">
                <div className="flex items-center gap-2">
                  {app.portfolioUrl && (
                    <a
                      href={app.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9aaecf] hover:text-[#f8d613] font-mono underline text-[11px]"
                    >
                      Portfolio ↗
                    </a>
                  )}
                  {app.linkedinUrl && (
                    <a
                      href={app.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9aaecf] hover:text-[#f8d613] font-mono underline text-[11px]"
                    >
                      LinkedIn ↗
                    </a>
                  )}
                </div>
              </td>
              <td className="py-3.5 px-4">
                <StatusBadge status={app.status} />
              </td>
              <td className="py-3.5 px-4 text-xs font-mono text-[#62759e]">
                {new Date(app.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3.5 px-4 text-right">
                <button
                  onClick={() => setSelectedApp(app)}
                  className="text-xs px-2.5 py-1 rounded bg-[#18224b] hover:bg-[#0248c1] text-[#fbfcfc] border border-[rgba(251,252,252,0.1)] transition-colors"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>

      {/* Candidate Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0f24]/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-[#162048] border border-[rgba(251,252,252,0.1)] rounded-3xl p-6 shadow-2xl flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-[rgba(251,252,252,0.08)] pb-4">
              <div>
                <h3 className="text-xl font-bold text-[#fbfcfc]">{selectedApp.name}</h3>
                <p className="text-xs font-mono text-[#f8d613]">{selectedApp.role}</p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-[#9aaecf] hover:text-[#fbfcfc] text-lg font-mono"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#62759e] block font-mono uppercase">Email</span>
                <a href={`mailto:${selectedApp.email}`} className="text-[#fbfcfc] font-mono hover:text-[#f8d613]">
                  {selectedApp.email}
                </a>
              </div>
              <div>
                <span className="text-[#62759e] block font-mono uppercase">Phone</span>
                <span className="text-[#fbfcfc] font-mono">{selectedApp.phone || 'Not provided'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              {selectedApp.portfolioUrl && (
                <a
                  href={selectedApp.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-lg bg-[#18224b] hover:bg-[#0248c1] text-[#fbfcfc] border border-[rgba(251,252,252,0.1)] font-mono"
                >
                  View Portfolio Website ↗
                </a>
              )}
              {selectedApp.linkedinUrl && (
                <a
                  href={selectedApp.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-lg bg-[#18224b] hover:bg-[#0248c1] text-[#fbfcfc] border border-[rgba(251,252,252,0.1)] font-mono"
                >
                  LinkedIn Profile ↗
                </a>
              )}
            </div>

            {selectedApp.message && (
              <div className="p-4 rounded-xl bg-[#111835] border border-[rgba(251,252,252,0.06)]">
                <span className="text-[11px] font-mono text-[#62759e] uppercase block mb-1">Candidate Statement</span>
                <p className="text-xs text-[#9aaecf] leading-relaxed whitespace-pre-line">{selectedApp.message}</p>
              </div>
            )}

            <div className="flex flex-col gap-2 pt-2 border-t border-[rgba(251,252,252,0.08)]">
              <label className="text-xs font-mono text-[#9aaecf] uppercase">Update Application Status</label>
              <div className="flex items-center gap-2 flex-wrap">
                {(['New', 'Reviewing', 'Shortlisted', 'Rejected', 'Hired'] as ApplicationStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedApp.id, st)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-mono transition-all ${
                      selectedApp.status === st
                        ? 'bg-[#f8d613] text-[#111835] font-bold'
                        : 'bg-[#18224b] text-[#9aaecf] hover:text-[#fbfcfc]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                onClick={() => setSelectedApp(null)}
                className="text-xs px-4 py-2 rounded-xl bg-[#18224b] text-[#fbfcfc] hover:bg-[#0248c1]"
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
