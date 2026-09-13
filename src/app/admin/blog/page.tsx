'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { Button } from '@/components/ui/Button';
import { AdminTable } from '@/components/admin/AdminTable';
import { createClient } from '@/lib/supabase/client';
import { BLOG_POSTS } from '@/lib/data/blog';
import { CmsBlogPost, ContentStatus } from '@/types/cms';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<CmsBlogPost[]>([]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [deleteCandidate, setDeleteCandidate] = useState<CmsBlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        const fallback: CmsBlogPost[] = BLOG_POSTS.map((p) => ({
          id: p.slug,
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          content: p.content,
          date: p.date,
          readTime: p.readTime,
          category: p.category,
          author: p.author,
          status: 'published',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }));
        setPosts(fallback);
      } else {
        setPosts(
          data.map((p: Record<string, unknown>) => ({
            id: String(p.id),
            slug: String(p.slug),
            title: String(p.title),
            excerpt: String(p.excerpt),
            content: String(p.content),
            date: String(p.date),
            readTime: String(p.read_time),
            category: String(p.category),
            author: String(p.author),
            coverImage: p.cover_image ? String(p.cover_image) : undefined,
            status: p.status as ContentStatus,
            publishedAt: p.published_at ? String(p.published_at) : undefined,
            createdAt: String(p.created_at || new Date().toISOString()),
            updatedAt: String(p.updated_at || new Date().toISOString()),
          }))
        );
      }
    } catch {
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleToggleStatus = async (post: CmsBlogPost) => {
    const newStatus: ContentStatus = post.status === 'published' ? 'draft' : 'published';
    try {
      const supabase = createClient();
      await supabase
        .from('blog_posts')
        .update({
          status: newStatus,
          published_at: newStatus === 'published' ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq('slug', post.slug);

      setPosts((prev) =>
        prev.map((p) => (p.slug === post.slug ? { ...p, status: newStatus } : p))
      );

      fetch('/api/admin/revalidate', {
        method: 'POST',
        body: JSON.stringify({ paths: ['/', '/blog', `/blog/${post.slug}`] }),
      });
    } catch (err) {
      console.error('Failed to toggle post status:', err);
    }
  };

  const handleDelete = async () => {
    if (!deleteCandidate) return;
    try {
      const supabase = createClient();
      await supabase.from('blog_posts').delete().eq('slug', deleteCandidate.slug);
      setPosts((prev) => prev.filter((p) => p.slug !== deleteCandidate.slug));
      setDeleteCandidate(null);
      fetch('/api/admin/revalidate', {
        method: 'POST',
        body: JSON.stringify({ paths: ['/', '/blog'] }),
      });
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  const filtered = filterCategory === 'All'
    ? posts
    : posts.filter((p) => p.category === filterCategory);

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#fbfcfc] tracking-tight">Blog &amp; Growth Insights</h2>
          <p className="text-xs text-[#9aaecf]">Manage thought leadership articles, creator playbooks, and SEO content</p>
        </div>
        <Button href="/admin/blog/new" variant="primary" size="sm">
          + Write New Article
        </Button>
      </div>

      <div className="flex items-center gap-2">
        {['All', 'Creator Ads', 'Performance Marketing', 'E-commerce & Web'].map((cat) => (
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

      <AdminTable isEmpty={filtered.length === 0} emptyMessage={isLoading ? 'Loading articles...' : 'No articles found.'}>
        <thead className="border-b border-[rgba(251,252,252,0.08)] bg-[#111835]/50 text-[11px] font-mono text-[#62759e] uppercase">
          <tr>
            <th className="py-3 px-4">Title &amp; Slug</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Author</th>
            <th className="py-3 px-4">Read Time</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[rgba(251,252,252,0.06)]">
          {filtered.map((p) => (
            <tr key={p.slug} className="hover:bg-[#18224b]/40 transition-colors">
              <td className="py-3.5 px-4 max-w-md">
                <span className="font-bold text-[#fbfcfc] block truncate">{p.title}</span>
                <span className="text-xs text-[#62759e] font-mono">/{p.slug}</span>
              </td>
              <td className="py-3.5 px-4 font-mono text-xs text-[#f8d613]">{p.category}</td>
              <td className="py-3.5 px-4 text-xs text-[#9aaecf]">{p.author}</td>
              <td className="py-3.5 px-4 font-mono text-xs text-[#9aaecf]">{p.readTime}</td>
              <td className="py-3.5 px-4">
                <StatusBadge status={p.status} />
              </td>
              <td className="py-3.5 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleToggleStatus(p)}
                    className="text-xs px-2.5 py-1 rounded bg-[#18224b] hover:bg-[#0248c1]/30 text-[#9aaecf] hover:text-[#fbfcfc] border border-[rgba(251,252,252,0.1)] transition-colors"
                  >
                    {p.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>
                  <Link
                    href={`/admin/blog/${p.slug}`}
                    className="text-xs px-2.5 py-1 rounded bg-[#18224b] hover:bg-[#0248c1] text-[#fbfcfc] border border-[rgba(251,252,252,0.1)] transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setDeleteCandidate(p)}
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
        title="Delete Article"
        message={`Are you sure you want to permanently delete "${deleteCandidate?.title}"? This action cannot be undone.`}
        confirmText="Delete Article"
      />
    </div>
  );
}
