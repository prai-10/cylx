'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { BLOG_POSTS } from '@/lib/data/blog';
import { ContentStatus } from '@/types/cms';

export default function AdminBlogEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === 'new';

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Creator Ads',
    author: 'CLYX Growth Team',
    readTime: '4 min read',
    date: 'March 2025',
    status: 'published' as ContentStatus,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isNew) {
      const fetchPost = async () => {
        try {
          const supabase = createClient();
          const { data } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', id)
            .single();

          if (data) {
            setFormData({
              title: data.title,
              slug: data.slug,
              excerpt: data.excerpt,
              content: data.content,
              category: data.category,
              author: data.author,
              readTime: data.read_time,
              date: data.date,
              status: data.status,
            });
          } else {
            const fallback = BLOG_POSTS.find((p) => p.slug === id);
            if (fallback) {
              setFormData({
                title: fallback.title,
                slug: fallback.slug,
                excerpt: fallback.excerpt,
                content: fallback.content,
                category: fallback.category,
                author: fallback.author,
                readTime: fallback.readTime,
                date: fallback.date,
                status: 'published',
              });
            }
          }
        } catch {
          // Keep current state
        }
      };

      fetchPost();
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
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      author: formData.author,
      read_time: formData.readTime,
      date: formData.date,
      status: formData.status,
      published_at: formData.status === 'published' ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    try {
      const supabase = createClient();
      if (isNew) {
        const { error: insertError } = await supabase.from('blog_posts').insert([record]);
        if (insertError) throw new Error(insertError.message);
      } else {
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update(record)
          .eq('slug', id);
        if (updateError) throw new Error(updateError.message);
      }

      setSuccess('Article saved successfully.');

      await fetch('/api/admin/revalidate', {
        method: 'POST',
        body: JSON.stringify({ paths: ['/', '/blog', `/blog/${formData.slug}`] }),
      });

      setTimeout(() => {
        router.push('/admin/blog');
      }, 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save blog post.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl flex flex-col gap-6">
      <div>
        <Link
          href="/admin/blog"
          className="text-xs font-mono text-[#9aaecf] hover:text-[#f8d613] transition-colors"
        >
          ← Back to Blog
        </Link>
        <h2 className="text-2xl font-black text-[#fbfcfc] tracking-tight mt-1">
          {isNew ? 'Write New Article' : `Edit: ${formData.title}`}
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
            id="blog-title"
            label="Article Title"
            required
            placeholder="Why Whitelisted Creator Ads Outperform Brand Handles by 3x"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />

          <FormField
            id="blog-slug"
            label="Slug"
            required
            placeholder="creator-whitelisting-vs-brand-ads"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <FormField
            id="blog-category"
            label="Category"
            as="select"
            options={[
              { value: 'Creator Ads', label: 'Creator Ads' },
              { value: 'Performance Marketing', label: 'Performance Marketing' },
              { value: 'E-commerce & Web', label: 'E-commerce & Web' },
            ]}
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />

          <FormField
            id="blog-author"
            label="Author"
            placeholder="CLYX Growth Team"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />

          <FormField
            id="blog-readtime"
            label="Read Time"
            placeholder="4 min read"
            value={formData.readTime}
            onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
          />
        </div>

        <FormField
          id="blog-excerpt"
          label="Short Excerpt (Summary for Cards & SEO)"
          as="textarea"
          rows={2}
          placeholder="A quick summary for previews and social meta tags..."
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
        />

        <FormField
          id="blog-content"
          label="Article Content (Markdown supported)"
          as="textarea"
          rows={12}
          placeholder="## Section Title&#10;&#10;Write detailed breakdown..."
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-[rgba(251,252,252,0.08)]">
          <FormField
            id="blog-status"
            label="Status"
            as="select"
            options={[
              { value: 'published', label: 'Published (Public)' },
              { value: 'draft', label: 'Draft (Internal Only)' },
            ]}
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ContentStatus })}
          />

          <FormField
            id="blog-date"
            label="Publish Date Display"
            placeholder="March 2025"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div className="pt-4 flex items-center justify-end gap-4 border-t border-[rgba(251,252,252,0.08)]">
          <Button href="/admin/blog" variant="ghost" type="button">
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSaving}>
            {isSaving ? 'Saving...' : isNew ? 'Publish Article →' : 'Save Changes →'}
          </Button>
        </div>
      </form>
    </div>
  );
}
