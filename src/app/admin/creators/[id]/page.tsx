'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { CREATORS } from '@/lib/data/creators';
import { ProjectCategory } from '@/types';
import { ContentStatus } from '@/types/cms';

export default function AdminCreatorEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === 'new';

  const [formData, setFormData] = useState({
    name: '',
    handle: '@',
    platform: 'Instagram' as 'Instagram' | 'TikTok' | 'YouTube',
    category: 'Fashion' as ProjectCategory,
    followers: '100K',
    averageEngagement: '4.5%',
    specialty: '',
    whitelistingReady: true,
    status: 'published' as ContentStatus,
    sortOrder: 0,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isNew) {
      const decodedParam = decodeURIComponent(id);
      const targetHandle = decodedParam.startsWith('@') ? decodedParam : `@${decodedParam}`;

      const fetchCreator = async () => {
        try {
          const supabase = createClient();
          const { data } = await supabase
            .from('creators')
            .select('*')
            .eq('handle', targetHandle)
            .single();

          if (data) {
            setFormData({
              name: data.name,
              handle: data.handle,
              platform: data.platform,
              category: data.category,
              followers: data.followers,
              averageEngagement: data.average_engagement,
              specialty: data.specialty,
              whitelistingReady: data.whitelisting_ready,
              status: data.status,
              sortOrder: data.sort_order || 0,
            });
          } else {
            const fallback = CREATORS.find(
              (c) => c.handle.toLowerCase() === targetHandle.toLowerCase() || c.id === id
            );
            if (fallback) {
              setFormData({
                name: fallback.name,
                handle: fallback.handle,
                platform: fallback.platform,
                category: fallback.category,
                followers: fallback.followers,
                averageEngagement: fallback.averageEngagement,
                specialty: fallback.specialty,
                whitelistingReady: fallback.whitelistingReady,
                status: 'published',
                sortOrder: 0,
              });
            }
          }
        } catch {
          // Keep current state
        }
      };

      fetchCreator();
    }
  }, [id, isNew]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.handle.trim()) {
      setError('Name and handle are required.');
      return;
    }

    const cleanHandle = formData.handle.startsWith('@') ? formData.handle : `@${formData.handle}`;

    setIsSaving(true);
    setError('');
    setSuccess('');

    const record = {
      name: formData.name,
      handle: cleanHandle,
      platform: formData.platform,
      category: formData.category,
      followers: formData.followers,
      average_engagement: formData.averageEngagement,
      specialty: formData.specialty,
      whitelisting_ready: formData.whitelistingReady,
      status: formData.status,
      sort_order: Number(formData.sortOrder) || 0,
    };

    try {
      const supabase = createClient();
      if (isNew) {
        const { error: insertError } = await supabase.from('creators').insert([record]);
        if (insertError) throw new Error(insertError.message);
      } else {
        const decodedParam = decodeURIComponent(id);
        const originalHandle = decodedParam.startsWith('@') ? decodedParam : `@${decodedParam}`;
        const { error: updateError } = await supabase
          .from('creators')
          .update(record)
          .eq('handle', originalHandle);
        if (updateError) throw new Error(updateError.message);
      }

      setSuccess('Creator profile saved successfully.');

      await fetch('/api/admin/revalidate', {
        method: 'POST',
        body: JSON.stringify({ paths: ['/', '/creators'] }),
      });

      setTimeout(() => {
        router.push('/admin/creators');
      }, 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save creator profile.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl flex flex-col gap-6">
      <div>
        <Link
          href="/admin/creators"
          className="text-xs font-mono text-[#9aaecf] hover:text-[#f8d613] transition-colors"
        >
          ← Back to Creator Network
        </Link>
        <h2 className="text-2xl font-black text-[#fbfcfc] tracking-tight mt-1">
          {isNew ? 'Add Creator to Roster' : `Edit: ${formData.name}`}
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
            id="cr-name"
            label="Creator Name"
            required
            placeholder="Marcus Chen"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <FormField
            id="cr-handle"
            label="Social Handle"
            required
            placeholder="@marcus.fits"
            value={formData.handle}
            onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <FormField
            id="cr-platform"
            label="Platform"
            as="select"
            options={[
              { value: 'Instagram', label: 'Instagram' },
              { value: 'TikTok', label: 'TikTok' },
              { value: 'YouTube', label: 'YouTube' },
            ]}
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value as 'Instagram' | 'TikTok' | 'YouTube' })}
          />

          <FormField
            id="cr-category"
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
            id="cr-followers"
            label="Followers Count"
            placeholder="145K"
            value={formData.followers}
            onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            id="cr-engagement"
            label="Average Engagement Rate"
            placeholder="4.8%"
            value={formData.averageEngagement}
            onChange={(e) => setFormData({ ...formData, averageEngagement: e.target.value })}
          />

          <div className="flex flex-col gap-1.5 justify-center pt-2">
            <label className="text-xs font-mono text-[#9aaecf] uppercase tracking-wider">Whitelisting Status</label>
            <label className="flex items-center gap-2 cursor-pointer mt-2 text-sm text-[#fbfcfc]">
              <input
                type="checkbox"
                checked={formData.whitelistingReady}
                onChange={(e) => setFormData({ ...formData, whitelistingReady: e.target.checked })}
                className="w-4 h-4 rounded bg-[#18224b] border-[rgba(251,252,252,0.2)] text-[#0248c1] focus:ring-[#f8d613]"
              />
              Whitelisting Access Verified &amp; Ready
            </label>
          </div>
        </div>

        <FormField
          id="cr-specialty"
          label="Creator Specialty / Content Niche"
          as="textarea"
          rows={3}
          placeholder="Streetwear styling, seasonal capsule try-ons & sneaker pairing"
          value={formData.specialty}
          onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-[rgba(251,252,252,0.08)]">
          <FormField
            id="cr-status"
            label="Status"
            as="select"
            options={[
              { value: 'published', label: 'Published (Public Roster)' },
              { value: 'draft', label: 'Draft (Internal Only)' },
            ]}
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ContentStatus })}
          />

          <FormField
            id="cr-order"
            label="Sort Order"
            type="number"
            value={formData.sortOrder}
            onChange={(e) => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
          />
        </div>

        <div className="pt-4 flex items-center justify-end gap-4 border-t border-[rgba(251,252,252,0.08)]">
          <Button href="/admin/creators" variant="ghost" type="button">
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSaving}>
            {isSaving ? 'Saving...' : isNew ? 'Add Creator →' : 'Save Changes →'}
          </Button>
        </div>
      </form>
    </div>
  );
}
