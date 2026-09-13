'use client';

import React, { useState, useEffect } from 'react';
import { CREATORS as STATIC_CREATORS } from '@/lib/data/creators';
import { Creator, ProjectCategory } from '@/types';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { createClient } from '@/lib/supabase/client';

export default function CreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>(STATIC_CREATORS);
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');
  const [applied, setApplied] = useState(false);
  const [creatorForm, setCreatorForm] = useState({
    name: '',
    handle: '',
    email: '',
    category: 'Fashion',
    followers: '',
  });

  useEffect(() => {
    const fetchDynamicCreators = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('creators')
          .select('*')
          .eq('status', 'published')
          .order('sort_order', { ascending: true });

        if (data && data.length > 0) {
          setCreators(
            data.map((c: Record<string, unknown>) => ({
              id: String(c.id || c.handle),
              name: String(c.name),
              handle: String(c.handle),
              platform: c.platform as Creator['platform'],
              category: c.category as Creator['category'],
              followers: String(c.followers),
              averageEngagement: String(c.average_engagement),
              specialty: String(c.specialty),
              whitelistingReady: Boolean(c.whitelisting_ready),
            }))
          );
        }
      } catch {
        // Keep static fallback
      }
    };
    fetchDynamicCreators();
  }, []);

  const categories: ('All' | ProjectCategory)[] = ['All', 'Fashion', 'Beauty', 'Food', 'Tech'];

  const filteredCreators = activeCategory === 'All'
    ? creators
    : creators.filter((c) => c.category === activeCategory);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (creatorForm.name && creatorForm.handle && creatorForm.email) {
      setApplied(true);
    }
  };

  return (
    <main className="w-full min-h-screen py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-20">
        <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] px-3 py-1 bg-[#001840] rounded-full border border-[rgba(255,253,240,0.12)] inline-block mb-4">
          Creator Network
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#FFFDF0] tracking-tight mb-6 leading-[1.05]">
          200+ Creators. Whitelisting-Ready.
        </h1>
        <p className="text-base sm:text-lg text-[#9aaecf] max-w-2xl leading-relaxed font-normal">
          We don&apos;t do one-off brand tag spam. We partner with vetted niche creators across Fashion, Beauty, Food, and Tech to scale authentic content through paid ad accounts.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#F5C400] text-[#000c22] font-bold shadow-sm'
                : 'bg-[#001840] text-[#9aaecf] hover:text-[#FFFDF0] border border-[rgba(255,253,240,0.1)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Creators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-28">
        {filteredCreators.map((creator) => (
          <div
            key={creator.id}
            data-cursor="explore"
            className="p-8 rounded-3xl bg-[#001840]/50 border border-[rgba(255,253,240,0.1)] flex flex-col justify-between hover:border-[#F5C400]/40 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono text-[#F5C400] px-2.5 py-0.5 rounded-full bg-[#000c22] border border-[rgba(255,253,240,0.1)]">
                  {creator.category}
                </span>
                <span className="text-xs text-[#F5C400] font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400] animate-pulse" />
                  Whitelisting Ready
                </span>
              </div>

              <span className="text-[11px] text-[#7d93b8] font-mono uppercase tracking-widest block mb-1">
                {creator.platform}
              </span>
              <h3 className="text-2xl font-black text-[#FFFDF0] group-hover:text-[#F5C400] transition-colors mb-1 tracking-tight">
                {creator.name}
              </h3>
              <p className="text-sm font-mono text-[#F5C400] mb-4">
                {creator.handle}
              </p>

              <p className="text-xs sm:text-sm text-[#9aaecf] leading-relaxed mb-6">
                {creator.specialty}
              </p>
            </div>

            <div className="pt-4 border-t border-[rgba(255,253,240,0.08)] flex items-center justify-between text-xs text-[#9aaecf]">
              <span>Followers: <strong className="text-[#FFFDF0] font-mono">{creator.followers}</strong></span>
              <span>Avg Eng: <strong className="text-[#FFFDF0] font-mono">{creator.averageEngagement}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Two Pillars: Brands (Book call) & Creators (Apply to bench) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Brand Scout Box */}
        <div className="lg:col-span-6 p-8 sm:p-12 rounded-3xl bg-[#001840]/60 border border-[rgba(255,253,240,0.12)] flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] block mb-3">
              For Brands &amp; Founders
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-[#FFFDF0] mb-4 tracking-tight">
              Need category-matched creators for paid ads?
            </h3>
            <p className="text-sm sm:text-base text-[#9aaecf] leading-relaxed mb-8">
              We scout and onboard creators who genuinely match your product niche, manage full usage contracts, and connect their handles directly into your Meta Ads Manager.
            </p>
          </div>
          <Button href="/contact" variant="primary" size="lg">
            Book a growth call →
          </Button>
        </div>

        {/* Creator Join Form Box */}
        <div className="lg:col-span-6 p-8 sm:p-12 rounded-3xl bg-[#001840]/60 border border-[rgba(255,253,240,0.12)]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] block mb-3">
            For Creators
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-[#FFFDF0] mb-4 tracking-tight">
            Join our whitelisting network
          </h3>
          <p className="text-sm sm:text-base text-[#9aaecf] leading-relaxed mb-6">
            Get paid transparently for dark-post rights while brands spend thousands scaling your content and growing your reach.
          </p>

          {applied ? (
            <div className="p-8 rounded-2xl bg-[#000c22] border border-[#F5C400]/40 text-center">
              <span className="text-sm font-bold text-[#F5C400] block mb-1">✓ Application Received</span>
              <p className="text-xs text-[#9aaecf]">Our creator management squad will review your handle and reach out.</p>
            </div>
          ) : (
            <form onSubmit={handleApply} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  id="creator-name"
                  label="Your Name"
                  required
                  placeholder="Anya Taylor"
                  value={creatorForm.name}
                  onChange={(e) => setCreatorForm({ ...creatorForm, name: e.target.value })}
                />
                <FormField
                  id="creator-handle"
                  label="Primary Handle"
                  required
                  placeholder="@yourhandle"
                  value={creatorForm.handle}
                  onChange={(e) => setCreatorForm({ ...creatorForm, handle: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  id="creator-email"
                  label="Email Address"
                  type="email"
                  required
                  placeholder="anya@creator.com"
                  value={creatorForm.email}
                  onChange={(e) => setCreatorForm({ ...creatorForm, email: e.target.value })}
                />
                <FormField
                  id="creator-category"
                  label="Niche"
                  as="select"
                  options={[
                    { value: 'Fashion', label: 'Fashion & Streetwear' },
                    { value: 'Beauty', label: 'Beauty & Skincare' },
                    { value: 'Food', label: 'Food & Beverage' },
                    { value: 'Tech', label: 'Tech & Hardware' },
                  ]}
                  value={creatorForm.category}
                  onChange={(e) => setCreatorForm({ ...creatorForm, category: e.target.value })}
                />
              </div>

              <Button type="submit" variant="primary" size="md">
                Submit Creator Profile →
              </Button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
