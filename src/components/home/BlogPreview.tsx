'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BLOG_POSTS as STATIC_BLOG_POSTS } from '@/lib/data/blog';
import { BlogPost } from '@/types';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

export const BlogPreview: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(STATIC_BLOG_POSTS);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchDynamic = async () => {
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
        // Fallback
      }
    };
    fetchDynamic();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-16 bg-white border-b border-[#0017B2]/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 border-b border-[#0017B2]/10 pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#0017B2] font-bold block mb-3">
              Agency Publication &amp; Insights
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#000000]">
              Notes on running paid + creator together.
            </h2>
          </div>
          <Button href="/blog" variant="outline" className="shrink-0 border-[#0017B2]/20 hover:border-[#0017B2]">
            All Articles &amp; Frameworks →
          </Button>
        </div>

        {/* Editorial Publication Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Articles Stream */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {posts.slice(0, 2).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                data-cursor="view"
                className="p-8 lg:p-10 rounded-3xl bg-[#F8FAFC] border border-[#0017B2]/15 hover:border-[#0017B2] transition-all duration-300 flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono text-[#64748B] mb-4">
                    <span className="text-[#0017B2] font-semibold px-2.5 py-1 rounded bg-white border border-[#0017B2]/15">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-black text-[#000000] group-hover:text-[#0017B2] transition-colors mb-4 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm text-[#334155] leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-8 border-t border-[#0017B2]/10 flex items-center justify-between text-xs font-mono text-[#0017B2] font-bold">
                  <span>Read Full Article &amp; Breakdown</span>
                  <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Minimalist Dispatch Box: One email a month. No fluff. */}
          <div className="lg:col-span-4 p-8 lg:p-10 rounded-3xl bg-[#F8FAFC] border border-[#0017B2]/15 flex flex-col justify-between relative overflow-hidden shadow-sm">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#4A8FE7]/15 rounded-full blur-3xl pointer-events-none" />

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#0017B2] font-bold block mb-4">
                Monthly Dispatch
              </span>
              <h3 className="text-2xl lg:text-3xl font-black text-[#000000] mb-3">
                One email a month. No fluff.
              </h3>
              <p className="text-sm text-[#334155] leading-relaxed mb-8">
                Direct tactical takeaways from our ad accounts: creative hook frameworks, whitelisting benchmark data, and conversion storefront strategies.
              </p>
            </div>

            {subscribed ? (
              <div className="p-4 bg-white rounded-2xl border border-[#0017B2]/40 text-center">
                <span className="text-xs font-bold text-[#0017B2] block mb-1">✓ Subscribed to Monthly Dispatch</span>
                <p className="text-[11px] text-[#64748B]">You will receive our next monthly performance breakdown.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3.5">
                <input
                  type="email"
                  required
                  placeholder="name@brand.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white text-[#000000] placeholder-[#64748B] rounded-xl text-xs font-mono border border-[#0017B2]/20 focus:border-[#0017B2] focus:outline-none transition-colors shadow-sm"
                />
                <Button type="submit" variant="primary" size="md" className="w-full justify-center">
                  Subscribe to Notes →
                </Button>
                <span className="text-[10px] text-[#64748B] text-center font-mono">
                  Zero spam. Unsubscribe anytime in 1 click.
                </span>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
