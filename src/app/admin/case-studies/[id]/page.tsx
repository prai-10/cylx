'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { CASE_STUDIES } from '@/lib/data/caseStudies';
import { ProjectCategory } from '@/types';
import { ContentStatus } from '@/types/cms';

export default function AdminCaseStudyEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === 'new';

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    client: '',
    category: 'Fashion' as ProjectCategory,
    adSpendManaged: '₹1Cr+',
    roasLift: '3.0x',
    creatorHandle: '@creator.handle',
    whitelistedFormat: 'Reels Dark Post / Hook',
    summary: '',
    challenge: '',
    whitelistingStrategy: '',
    scalingData: '',
    status: 'published' as ContentStatus,
    sortOrder: 0,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isNew) {
      const fetchStudy = async () => {
        try {
          const supabase = createClient();
          const { data } = await supabase
            .from('case_studies')
            .select('*')
            .eq('slug', id)
            .single();

          if (data) {
            setFormData({
              title: data.title,
              slug: data.slug,
              client: data.client,
              category: data.category,
              adSpendManaged: data.ad_spend_managed,
              roasLift: data.roas_lift,
              creatorHandle: data.creator_handle,
              whitelistedFormat: data.whitelisted_format,
              summary: data.summary,
              challenge: data.challenge,
              whitelistingStrategy: data.whitelisting_strategy,
              scalingData: data.scaling_data,
              status: data.status,
              sortOrder: data.sort_order || 0,
            });
          } else {
            const fallback = CASE_STUDIES.find((c) => c.slug === id);
            if (fallback) {
              setFormData({
                title: fallback.title,
                slug: fallback.slug,
                client: fallback.client,
                category: fallback.category,
                adSpendManaged: fallback.adSpendManaged,
                roasLift: fallback.roasLift,
                creatorHandle: fallback.creatorHandle,
                whitelistedFormat: fallback.whitelistedFormat,
                summary: fallback.summary,
                challenge: fallback.challenge,
                whitelistingStrategy: fallback.whitelistingStrategy,
                scalingData: fallback.scalingData,
                status: 'published',
                sortOrder: 0,
              });
            }
          }
        } catch {
          // Keep current state
        }
      };

      fetchStudy();
    }
  }, [id, isNew]);

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: isNew ? val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : prev.slug,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.slug.trim()) {
      setError('Title and slug are required.');
      return;
    }

    setIsSaving(true);
    setError('');
    setSuccess('');

    const record = {
      title: formData.title,
      slug: formData.slug,
      client: formData.client,
      category: formData.category,
      ad_spend_managed: formData.adSpendManaged,
      roas_lift: formData.roasLift,
      creator_handle: formData.creatorHandle,
      whitelisted_format: formData.whitelistedFormat,
      summary: formData.summary,
      challenge: formData.challenge,
      whitelisting_strategy: formData.whitelistingStrategy,
      scaling_data: formData.scalingData,
      status: formData.status,
      sort_order: Number(formData.sortOrder) || 0,
      updated_at: new Date().toISOString(),
    };

    try {
      const supabase = createClient();
      if (isNew) {
        const { error: insertError } = await supabase.from('case_studies').insert([record]);
        if (insertError) throw new Error(insertError.message);
      } else {
        const { error: updateError } = await supabase
          .from('case_studies')
          .update(record)
          .eq('slug', id);
        if (updateError) throw new Error(updateError.message);
      }

      setSuccess('Case study saved successfully.');

      await fetch('/api/admin/revalidate', {
        method: 'POST',
        body: JSON.stringify({ paths: ['/', '/case-studies', `/case-studies/${formData.slug}`] }),
      });

      setTimeout(() => {
        router.push('/admin/case-studies');
      }, 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save case study to database.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl flex flex-col gap-6">
      <div>
        <Link
          href="/admin/case-studies"
          className="text-xs font-mono text-[#9aaecf] hover:text-[#f8d613] transition-colors"
        >
          ← Back to Case Studies
        </Link>
        <h2 className="text-2xl font-black text-[#fbfcfc] tracking-tight mt-1">
          {isNew ? 'Create New Case Study' : `Edit: ${formData.title}`}
        </h2>
      </div>

      {error && (
        <div className="p-4 bg-red-950/60 border border-red-500/40 rounded-xl text-xs text-red-200">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-200">
          {success}
        </div>
      )}

      <form onSubmit={handleSave} className="p-8 rounded-3xl bg-[#162048] border border-[rgba(251,252,252,0.08)] flex flex-col gap-6 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            id="cs-title"
            label="Case Study Title"
            required
            placeholder="Scaling D2C Streetwear via Creator Handle Whitelisting"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />

          <FormField
            id="cs-slug"
            label="Slug"
            required
            placeholder="scaling-apparel-creator-whitelisting"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <FormField
            id="cs-client"
            label="Client Brand"
            placeholder="Kaviar Label"
            value={formData.client}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
          />

          <FormField
            id="cs-category"
            label="Category"
            as="select"
            options={[
              { value: 'Fashion', label: 'Fashion' },
              { value: 'Beauty', label: 'Beauty' },
              { value: 'Food', label: 'Food' },
              { value: 'Tech', label: 'Tech' },
            ]}
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
          />

          <FormField
            id="cs-roas"
            label="ROAS Lift"
            placeholder="3.6x"
            value={formData.roasLift}
            onChange={(e) => setFormData({ ...formData, roasLift: e.target.value })}
          />

          <FormField
            id="cs-spend"
            label="Ad Spend Managed"
            placeholder="₹3.2Cr+"
            value={formData.adSpendManaged}
            onChange={(e) => setFormData({ ...formData, adSpendManaged: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            id="cs-handle"
            label="Creator Handle"
            placeholder="@marcus.fits"
            value={formData.creatorHandle}
            onChange={(e) => setFormData({ ...formData, creatorHandle: e.target.value })}
          />

          <FormField
            id="cs-format"
            label="Whitelisted Format"
            placeholder="Reels Dark Post / Fit Check Hook"
            value={formData.whitelistedFormat}
            onChange={(e) => setFormData({ ...formData, whitelistedFormat: e.target.value })}
          />
        </div>

        <FormField
          id="cs-summary"
          label="Executive Summary"
          as="textarea"
          rows={2}
          value={formData.summary}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
        />

        <FormField
          id="cs-challenge"
          label="The Problem & Ad Fatigue Challenge"
          as="textarea"
          rows={3}
          value={formData.challenge}
          onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
        />

        <FormField
          id="cs-strategy"
          label="Creator Whitelisting Strategy"
          as="textarea"
          rows={3}
          value={formData.whitelistingStrategy}
          onChange={(e) => setFormData({ ...formData, whitelistingStrategy: e.target.value })}
        />

        <FormField
          id="cs-scaling"
          label="Scaling Data & Account Execution"
          as="textarea"
          rows={3}
          value={formData.scalingData}
          onChange={(e) => setFormData({ ...formData, scalingData: e.target.value })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-[rgba(251,252,252,0.08)]">
          <FormField
            id="cs-status"
            label="Status"
            as="select"
            options={[
              { value: 'published', label: 'Published (Public)' },
              { value: 'draft', label: 'Draft (Admin Only)' },
            ]}
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ContentStatus })}
          />

          <FormField
            id="cs-order"
            label="Sort Order"
            type="number"
            value={formData.sortOrder}
            onChange={(e) => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
          />
        </div>

        <div className="pt-4 flex items-center justify-end gap-4 border-t border-[rgba(251,252,252,0.08)]">
          <Button href="/admin/case-studies" variant="ghost" type="button">
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSaving}>
            {isSaving ? 'Saving Case Study...' : isNew ? 'Create Case Study →' : 'Save Changes →'}
          </Button>
        </div>
      </form>
    </div>
  );
}
