'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { MediaUploader } from '@/components/admin/MediaUploader';
import { PROJECTS } from '@/lib/data/projects';
import { ProjectCategory } from '@/types';
import { ContentStatus } from '@/types/cms';

export default function AdminProjectEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === 'new';

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    client: '',
    category: 'Fashion' as ProjectCategory,
    year: '2025',
    description: '',
    overview: '',
    challenge: '',
    approach: '',
    execution: '',
    services: 'Influencer Marketing, Performance Marketing',
    thumbnail: '/textures/project-thumb.jpg',
    status: 'published' as ContentStatus,
    sortOrder: 0,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isNew) {
      // Fetch project from Supabase or fallback
      const fetchProject = async () => {
        try {
          const supabase = createClient();
          const { data } = await supabase
            .from('portfolio_projects')
            .select('*')
            .eq('slug', id)
            .single();

          if (data) {
            setFormData({
              title: data.title,
              slug: data.slug,
              client: data.client,
              category: data.category,
              year: data.year,
              description: data.description,
              overview: data.overview,
              challenge: data.challenge,
              approach: data.approach,
              execution: data.execution,
              services: (data.services || []).join(', '),
              thumbnail: data.thumbnail,
              status: data.status,
              sortOrder: data.sort_order || 0,
            });
          } else {
            const fallback = PROJECTS.find((p) => p.slug === id);
            if (fallback) {
              setFormData({
                title: fallback.title,
                slug: fallback.slug,
                client: fallback.client,
                category: fallback.category,
                year: fallback.year,
                description: fallback.description,
                overview: fallback.overview,
                challenge: fallback.challenge,
                approach: fallback.approach,
                execution: fallback.execution,
                services: fallback.services.join(', '),
                thumbnail: fallback.thumbnail,
                status: 'published',
                sortOrder: 0,
              });
            }
          }
        } catch {
          // Keep current state
        }
      };

      fetchProject();
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

    const servicesArray = formData.services.split(',').map((s) => s.trim()).filter(Boolean);

    const record = {
      title: formData.title,
      slug: formData.slug,
      client: formData.client,
      category: formData.category,
      year: formData.year,
      description: formData.description,
      overview: formData.overview,
      challenge: formData.challenge,
      approach: formData.approach,
      execution: formData.execution,
      services: servicesArray,
      thumbnail: formData.thumbnail,
      hero_media: formData.thumbnail,
      status: formData.status,
      sort_order: Number(formData.sortOrder) || 0,
      updated_at: new Date().toISOString(),
    };

    try {
      const supabase = createClient();
      if (isNew) {
        const { error: insertError } = await supabase.from('portfolio_projects').insert([record]);
        if (insertError) throw new Error(insertError.message);
      } else {
        const { error: updateError } = await supabase
          .from('portfolio_projects')
          .update(record)
          .eq('slug', id);
        if (updateError) throw new Error(updateError.message);
      }

      setSuccess('Project saved successfully.');

      // Trigger cache revalidation
      await fetch('/api/admin/revalidate', {
        method: 'POST',
        body: JSON.stringify({ paths: ['/', '/portfolio', `/portfolio/${formData.slug}`] }),
      });

      setTimeout(() => {
        router.push('/admin/portfolio');
      }, 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save project to database.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/portfolio"
            className="text-xs font-mono text-[#9aaecf] hover:text-[#f8d613] transition-colors"
          >
            ← Back to Portfolio List
          </Link>
          <h2 className="text-2xl font-black text-[#fbfcfc] tracking-tight mt-1">
            {isNew ? 'Create New Portfolio Project' : `Edit Project: ${formData.title}`}
          </h2>
        </div>
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
            id="proj-title"
            label="Project Title"
            required
            placeholder="e.g. Kaviar Apparel Creator Engine"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />

          <FormField
            id="proj-slug"
            label="URL Slug"
            required
            placeholder="kaviar-streetwear-whitelisting"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <FormField
            id="proj-client"
            label="Client Brand"
            placeholder="Kaviar Label"
            value={formData.client}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
          />

          <FormField
            id="proj-category"
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
            id="proj-year"
            label="Year"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          />
        </div>

        <FormField
          id="proj-desc"
          label="Short Description"
          as="textarea"
          rows={2}
          placeholder="Brief summary of the campaign and performance focus..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            id="proj-overview"
            label="Overview"
            as="textarea"
            rows={3}
            value={formData.overview}
            onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
          />

          <FormField
            id="proj-challenge"
            label="The Challenge"
            as="textarea"
            rows={3}
            value={formData.challenge}
            onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            id="proj-approach"
            label="Strategic Approach"
            as="textarea"
            rows={3}
            value={formData.approach}
            onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
          />

          <FormField
            id="proj-execution"
            label="Execution & Rollout"
            as="textarea"
            rows={3}
            value={formData.execution}
            onChange={(e) => setFormData({ ...formData, execution: e.target.value })}
          />
        </div>

        <FormField
          id="proj-services"
          label="Disciplines (comma separated)"
          placeholder="Influencer Marketing, Performance Marketing, UGC Videos"
          value={formData.services}
          onChange={(e) => setFormData({ ...formData, services: e.target.value })}
        />

        <MediaUploader
          label="Cover / Thumbnail Image"
          currentUrl={formData.thumbnail}
          onUploadSuccess={(url) => setFormData({ ...formData, thumbnail: url })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-[rgba(251,252,252,0.08)]">
          <FormField
            id="proj-status"
            label="Publishing Status"
            as="select"
            options={[
              { value: 'published', label: 'Published (Publicly Visible)' },
              { value: 'draft', label: 'Draft (Admin Only)' },
            ]}
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ContentStatus })}
          />

          <FormField
            id="proj-order"
            label="Sort Order Index"
            type="number"
            value={formData.sortOrder}
            onChange={(e) => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
          />
        </div>

        <div className="pt-4 flex items-center justify-end gap-4 border-t border-[rgba(251,252,252,0.08)]">
          <Button href="/admin/portfolio" variant="ghost" type="button">
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSaving}>
            {isSaving ? 'Saving to Database...' : isNew ? 'Create & Publish Project →' : 'Save Changes →'}
          </Button>
        </div>
      </form>
    </div>
  );
}
