'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { JOBS } from '@/lib/data/jobs';

export default function AdminCareerEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === 'new';

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    department: 'Strategy & Concept',
    location: 'Remote',
    type: 'Full-time',
    description: '',
    responsibilities: '',
    requirements: '',
    niceToHave: '',
    status: 'open' as 'open' | 'closed',
    sortOrder: 0,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isNew) {
      const fetchJob = async () => {
        try {
          const supabase = createClient();
          const { data } = await supabase
            .from('job_openings')
            .select('*')
            .eq('slug', id)
            .single();

          if (data) {
            setFormData({
              title: data.title,
              slug: data.slug,
              department: data.department,
              location: data.location,
              type: data.type,
              description: data.description,
              responsibilities: (data.responsibilities || []).join('\n'),
              requirements: (data.requirements || []).join('\n'),
              niceToHave: (data.nice_to_have || []).join('\n'),
              status: data.status,
              sortOrder: data.sort_order || 0,
            });
          } else {
            const fallback = JOBS.find((j) => j.slug === id);
            if (fallback) {
              setFormData({
                title: fallback.title,
                slug: fallback.slug,
                department: fallback.department,
                location: fallback.location,
                type: fallback.type,
                description: fallback.description,
                responsibilities: (fallback.responsibilities || []).join('\n'),
                requirements: (fallback.requirements || []).join('\n'),
                niceToHave: (fallback.niceToHave || []).join('\n'),
                status: fallback.status,
                sortOrder: 0,
              });
            }
          }
        } catch {
          // Keep current state
        }
      };

      fetchJob();
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
      setError('Job title and slug are required.');
      return;
    }

    setIsSaving(true);
    setError('');
    setSuccess('');

    const record = {
      title: formData.title,
      slug: formData.slug,
      department: formData.department,
      location: formData.location,
      type: formData.type,
      description: formData.description,
      responsibilities: formData.responsibilities.split('\n').map((s) => s.trim()).filter(Boolean),
      requirements: formData.requirements.split('\n').map((s) => s.trim()).filter(Boolean),
      nice_to_have: formData.niceToHave.split('\n').map((s) => s.trim()).filter(Boolean),
      status: formData.status,
      sort_order: Number(formData.sortOrder) || 0,
    };

    try {
      const supabase = createClient();
      if (isNew) {
        const { error: insertError } = await supabase.from('job_openings').insert([record]);
        if (insertError) throw new Error(insertError.message);
      } else {
        const { error: updateError } = await supabase
          .from('job_openings')
          .update(record)
          .eq('slug', id);
        if (updateError) throw new Error(updateError.message);
      }

      setSuccess('Job role saved successfully.');

      await fetch('/api/admin/revalidate', {
        method: 'POST',
        body: JSON.stringify({ paths: ['/careers', `/careers/${formData.slug}`] }),
      });

      setTimeout(() => {
        router.push('/admin/careers');
      }, 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save job opening.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl flex flex-col gap-6">
      <div>
        <Link
          href="/admin/careers"
          className="text-xs font-mono text-[#9aaecf] hover:text-[#f8d613] transition-colors"
        >
          ← Back to Job Openings
        </Link>
        <h2 className="text-2xl font-black text-[#fbfcfc] tracking-tight mt-1">
          {isNew ? 'Post New Job Opening' : `Edit: ${formData.title}`}
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
            id="job-title"
            label="Role Title"
            required
            placeholder="Senior Creative Strategist"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />

          <FormField
            id="job-slug"
            label="Slug"
            required
            placeholder="senior-creative-strategist"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <FormField
            id="job-dept"
            label="Department"
            as="select"
            options={[
              { value: 'Strategy & Concept', label: 'Strategy & Concept' },
              { value: 'Design & Visuals', label: 'Design & Visuals' },
              { value: 'Content Production', label: 'Content Production' },
              { value: 'Engineering & Tech', label: 'Engineering & Tech' },
              { value: 'Performance Growth', label: 'Performance Growth' },
            ]}
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          />

          <FormField
            id="job-location"
            label="Location"
            placeholder="Remote / Hybrid"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />

          <FormField
            id="job-type"
            label="Employment Type"
            placeholder="Full-time"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          />
        </div>

        <FormField
          id="job-desc"
          label="Role Description / Hook"
          as="textarea"
          rows={3}
          placeholder="Brief narrative of the role and impact..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <FormField
          id="job-resp"
          label="Responsibilities (One per line)"
          as="textarea"
          rows={4}
          placeholder="Lead campaign concepts...&#10;Translate cultural data...&#10;Collaborate with motion team..."
          value={formData.responsibilities}
          onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
        />

        <FormField
          id="job-req"
          label="Requirements (One per line)"
          as="textarea"
          rows={4}
          placeholder="3+ years experience in creative strategy...&#10;Demonstrated portfolio of viral activations..."
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
        />

        <FormField
          id="job-nice"
          label="Nice To Have (One per line)"
          as="textarea"
          rows={3}
          placeholder="Experience with consumer brands...&#10;Hands-on copywriting experience..."
          value={formData.niceToHave}
          onChange={(e) => setFormData({ ...formData, niceToHave: e.target.value })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-[rgba(251,252,252,0.08)]">
          <FormField
            id="job-status"
            label="Hiring Status"
            as="select"
            options={[
              { value: 'open', label: 'Open (Accepting Applications)' },
              { value: 'closed', label: 'Closed (Hidden from public)' },
            ]}
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'open' | 'closed' })}
          />

          <FormField
            id="job-order"
            label="Sort Order"
            type="number"
            value={formData.sortOrder}
            onChange={(e) => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
          />
        </div>

        <div className="pt-4 flex items-center justify-end gap-4 border-t border-[rgba(251,252,252,0.08)]">
          <Button href="/admin/careers" variant="ghost" type="button">
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSaving}>
            {isSaving ? 'Saving Role...' : isNew ? 'Publish Role →' : 'Save Changes →'}
          </Button>
        </div>
      </form>
    </div>
  );
}
