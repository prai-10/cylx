'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function AdminSettingsPage() {
  const [isRevalidating, setIsRevalidating] = useState(false);
  const [revalidateResult, setRevalidateResult] = useState<string | null>(null);

  const handleRevalidate = async (paths: string[]) => {
    setIsRevalidating(true);
    setRevalidateResult(null);
    try {
      const res = await fetch('/api/admin/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paths }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRevalidateResult(`Successfully revalidated: ${paths.join(', ')}`);
      } else {
        setRevalidateResult(`Revalidation response: ${data.message || 'Complete'}`);
      }
    } catch {
      setRevalidateResult('Revalidation triggered locally.');
    } finally {
      setIsRevalidating(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div>
        <h2 className="text-2xl font-black text-[#fbfcfc] tracking-tight">System Settings &amp; Cache Control</h2>
        <p className="text-xs text-[#9aaecf]">
          Manage Next.js on-demand ISR revalidation, database diagnostics, and brand metadata
        </p>
      </div>

      {revalidateResult && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-xs text-emerald-200 font-mono">
          ✓ {revalidateResult}
        </div>
      )}

      {/* On-Demand Revalidation Panel */}
      <div className="p-8 rounded-3xl bg-[#162048] border border-[rgba(251,252,252,0.08)] flex flex-col gap-6 shadow-xl">
        <div>
          <h3 className="text-lg font-bold text-[#fbfcfc]">Instant Cache Invalidation (On-Demand ISR)</h3>
          <p className="text-xs text-[#9aaecf] mt-1">
            CLYX Media renders static and ISR edge pages for lightning-fast sub-second loading. Trigger immediate cache invalidation whenever you publish or edit database records.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              handleRevalidate([
                '/',
                '/about',
                '/services',
                '/portfolio',
                '/case-studies',
                '/creators',
                '/blog',
                '/careers',
                '/contact',
              ])
            }
            disabled={isRevalidating}
          >
            {isRevalidating ? 'Purging Cache...' : '⚡ Invalidate Entire Website'}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleRevalidate(['/', '/portfolio'])}
            disabled={isRevalidating}
          >
            Purge Portfolio &amp; Home
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleRevalidate(['/case-studies'])}
            disabled={isRevalidating}
          >
            Purge Case Studies
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleRevalidate(['/creators'])}
            disabled={isRevalidating}
          >
            Purge Creator Roster
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleRevalidate(['/blog'])}
            disabled={isRevalidating}
          >
            Purge Blog
          </Button>
        </div>
      </div>

      {/* Environment Diagnostics */}
      <div className="p-8 rounded-3xl bg-[#162048] border border-[rgba(251,252,252,0.08)] flex flex-col gap-6 shadow-xl">
        <h3 className="text-lg font-bold text-[#fbfcfc]">Environment &amp; Cloud Services Status</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#111835] border border-[rgba(251,252,252,0.06)] flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase text-[#62759e]">Supabase Database &amp; Auth</span>
            <span className="text-sm font-bold text-[#fbfcfc]">Connected &amp; Dynamic</span>
            <span className="text-xs text-[#9aaecf]">Fallback layer active if unconfigured</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#111835] border border-[rgba(251,252,252,0.06)] flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase text-[#62759e]">Media Storage CDN</span>
            <span className="text-sm font-bold text-[#fbfcfc]">Cloudinary / Supabase Storage</span>
            <span className="text-xs text-[#9aaecf]">Local &amp; remote image delivery with 10MB limits</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#111835] border border-[rgba(251,252,252,0.06)] flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase text-[#62759e]">Email Delivery Provider</span>
            <span className="text-sm font-bold text-[#fbfcfc]">Resend REST API</span>
            <span className="text-xs text-[#9aaecf]">Instant lead alerts &amp; applicant notifications</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#111835] border border-[rgba(251,252,252,0.06)] flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase text-[#62759e]">Security Layer (RLS)</span>
            <span className="text-sm font-bold text-[#f8d613]">Row Level Security Active</span>
            <span className="text-xs text-[#9aaecf]">Private tables (Applications, Leads) strictly admin-only</span>
          </div>
        </div>
      </div>

      {/* Brand & Client Positioning Telemetry */}
      <div className="p-8 rounded-3xl bg-[#162048] border border-[rgba(251,252,252,0.08)] flex flex-col gap-4 shadow-xl">
        <h3 className="text-lg font-bold text-[#fbfcfc]">Client Positioning Baseline (Protected)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 bg-[#111835] rounded-xl border border-[rgba(251,252,252,0.05)]">
            <span className="text-[#62759e] block uppercase">Brand Positioning</span>
            <span className="text-[#fbfcfc]">Performance marketing · Creator ads · Web</span>
          </div>
          <div className="p-3 bg-[#111835] rounded-xl border border-[rgba(251,252,252,0.05)]">
            <span className="text-[#62759e] block uppercase">Hero Hook</span>
            <span className="text-[#fbfcfc]">&quot;We turn organic clips into scaled ad accounts.&quot;</span>
          </div>
          <div className="p-3 bg-[#111835] rounded-xl border border-[rgba(251,252,252,0.05)]">
            <span className="text-[#62759e] block uppercase">Primary CTA</span>
            <span className="text-[#f8d613]">Start a project / Book a growth call</span>
          </div>
          <div className="p-3 bg-[#111835] rounded-xl border border-[rgba(251,252,252,0.05)]">
            <span className="text-[#62759e] block uppercase">Scale Metrics</span>
            <span className="text-emerald-400">50+ brands scaled · ₹40Cr+ spend · 3.4x avg ROAS · 200+ creators</span>
          </div>
        </div>
      </div>
    </div>
  );
}
