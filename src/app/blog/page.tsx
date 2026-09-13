'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BLOG_POSTS as STATIC_BLOG_POSTS } from '@/lib/data/blog';
import { BlogPost } from '@/types';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(STATIC_BLOG_POSTS);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchDynamicPosts = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (data && data.length > 0) {
          setPosts(
            data.map((p: Record<string, unknown>) => ({
              slug: String(p.slug),
              title: String(p.title),
              excerpt: String(p.excerpt),
              content: String(p.content),
              date: String(p.date),
              readTime: String(p.read_time),
              category: String(p.category),
              author: String(p.author),
            }))
          );
        }
      } catch {
        // Keep fallback
      }
    };
    fetchDynamicPosts();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <main className="w-full min-h-screen py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-20">
        <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] px-3 py-1 bg-[#001840] rounded-full border border-[rgba(255,253,240,0.12)] inline-block mb-4">
          Insights &amp; Strategy
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#FFFDF0] tracking-tight mb-6 leading-[1.05]">
          Notes on running paid + creator together.
        </h1>
        <p className="text-base sm:text-lg text-[#9aaecf] max-w-2xl leading-relaxed font-normal">
          Tactical frameworks, creative hook mechanics, and attribution learnings from managing ₹40Cr+ in performance media spend.
        </p>
      </div>

      {/* Main Grid: Articles + Newsletter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
        {/* Posts List */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              data-cursor="view"
              className="p-8 sm:p-12 rounded-3xl bg-[#001840]/40 border border-[rgba(255,253,240,0.1)] hover:border-[#F5C400]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-3 text-xs text-[#9aaecf] mb-5">
                  <span className="font-mono text-[#F5C400] px-3 py-1 rounded-full bg-[#000c22] border border-[rgba(255,253,240,0.1)]">
                    {post.category}
                  </span>
                  <span>•</span>
                  <span className="font-mono">{post.readTime}</span>
                  <span>•</span>
                  <span className="font-mono">{post.date}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-[#FFFDF0] group-hover:text-[#F5C400] transition-colors mb-4 tracking-tight leading-tight">
                  {post.title}
                </h2>

                <p className="text-sm sm:text-base text-[#9aaecf] leading-relaxed mb-8">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-5 border-t border-[rgba(255,253,240,0.08)] flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#F5C400]">
                <span>Read article</span>
                <span className="group-hover:translate-x-1.5 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter Sidebar: One email a month. No fluff. */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#001840]/60 border border-[rgba(255,253,240,0.12)] flex flex-col justify-between sticky top-28">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] block mb-3">
                Monthly Dispatch
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#FFFDF0] mb-3 tracking-tight leading-tight">
                One email a month. No fluff.
              </h3>
              <p className="text-xs sm:text-sm text-[#9aaecf] leading-relaxed mb-8">
                Direct tactical takeaways from our ad accounts: creative hook frameworks, whitelisting benchmark data, and conversion storefront strategies.
              </p>
            </div>

            {subscribed ? (
              <div className="p-6 bg-[#000c22] rounded-2xl border border-[#F5C400]/30 text-center">
                <span className="text-xs font-bold text-[#F5C400] font-mono block">✓ Subscribed to Monthly Dispatch</span>
                <p className="text-xs text-[#9aaecf] mt-1">You will receive our next monthly breakdown.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  placeholder="name@brand.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#000c22] text-[#FFFDF0] placeholder-[#7d93b8] rounded-xl text-xs sm:text-sm border border-[rgba(255,253,240,0.12)] focus:border-[#F5C400] focus:outline-none transition-colors"
                />
                <Button type="submit" variant="primary" size="md" className="w-full">
                  Subscribe to Notes →
                </Button>
                <span className="text-[11px] font-mono text-[#7d93b8] text-center mt-1">
                  Zero spam. Unsubscribe anytime in 1 click.
                </span>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
