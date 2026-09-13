import React from 'react';
import { ContentStatus, ApplicationStatus, ContactStatus } from '@/types/cms';

interface StatusBadgeProps {
  status: ContentStatus | ApplicationStatus | ContactStatus | 'open' | 'closed';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles: Record<string, string> = {
    // Content status
    published: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    draft: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    open: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    closed: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
    // Applications & Contacts
    New: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    Reviewing: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    Shortlisted: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    Rejected: 'bg-red-500/15 text-red-400 border-red-500/30',
    Hired: 'bg-[#f8d613]/15 text-[#f8d613] border-[#f8d613]/30',
    Contacted: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    Closed: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
  };

  const styleClass = styles[status] || 'bg-slate-500/15 text-slate-400 border-slate-500/30';

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${styleClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      <span className="capitalize">{status}</span>
    </span>
  );
};
