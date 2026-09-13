'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PROJECTS as STATIC_PROJECTS, CATEGORIES } from '@/lib/data/projects';
import { Project, ProjectCategory } from '@/types';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS);
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');

  useEffect(() => {
    const fetchDynamic = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('portfolio_projects')
          .select('*')
          .eq('status', 'published')
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (data && data.length > 0) {
          setProjects(
            data.map((item: Record<string, unknown>) => ({
              slug: String(item.slug),
              title: String(item.title),
              client: String(item.client),
              category: item.category as ProjectCategory,
              year: String(item.year),
              description: String(item.description),
              services: (item.services as string[]) || [],
              thumbnail: String(item.thumbnail),
              heroMedia: String(item.hero_media || item.thumbnail),
              gallery: (item.gallery as Project['gallery']) || [],
              overview: String(item.overview),
              challenge: String(item.challenge),
              approach: String(item.approach),
              execution: String(item.execution),
              results: (item.results as Project['results']) || [],
              tags: (item.tags as string[]) || [],
            }))
          );
        }
      } catch {
        // Keep static fallback
      }
    };
    fetchDynamic();
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="w-full min-h-screen py-16 md:py-28 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto bg-[#000c22]">
      {/* Header */}
      <div className="mb-20 md:mb-28 border-b border-[rgba(255,253,240,0.06)] pb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] block mb-4">
          Client Archive
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#FFFDF0] tracking-tight leading-[0.98] mb-8 max-w-5xl">
          Campaigns, not concepts.
        </h1>
        <p className="text-lg sm:text-xl text-[#cbd5e1] max-w-3xl leading-relaxed font-normal">
          Creator whitelisting, Meta ad accounts, UGC videos, and conversion-built web flagships scaled across Fashion, Beauty, Food, and Tech.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-2 mb-16">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#F5C400] text-[#000c22] font-bold shadow-md shadow-[#F5C400]/20'
                : 'bg-[#001840]/60 text-[#cbd5e1] hover:text-[#FFFDF0] border border-[rgba(255,253,240,0.08)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-28">
        {filteredProjects.map((project, idx) => (
          <Link
            key={project.slug}
            href={`/portfolio/${project.slug}`}
            data-cursor="view"
            className="group block rounded-3xl bg-[#001840]/40 border border-[rgba(255,253,240,0.08)] overflow-hidden hover:border-[#F5C400]/50 transition-all duration-300"
          >
            <div className="relative aspect-[16/10] w-full bg-[#001840] flex flex-col justify-between p-8 lg:p-10 overflow-hidden group-hover:bg-[#00225c] transition-colors">
              <div className="flex items-center justify-between z-10">
                <span className="text-xs font-mono text-[#F5C400] px-3 py-1 rounded-full bg-[#000c22] border border-[rgba(255,253,240,0.08)]">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-[#798fae]">
                  0{idx + 1}
                </span>
              </div>

              <div className="z-10 my-auto py-6">
                <span className="text-xs uppercase tracking-widest text-[#798fae] font-mono block mb-1">
                  {project.client}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#FFFDF0] group-hover:text-[#F5C400] transition-colors">
                  {project.title}
                </h3>
              </div>

              <div className="flex items-center justify-between text-xs text-[#cbd5e1] z-10 border-t border-[rgba(255,253,240,0.06)] pt-4">
                <span className="font-mono text-[11px] text-[#798fae]">{project.services[0]}</span>
                <span className="text-[#F5C400] group-hover:translate-x-1.5 transition-transform font-bold font-mono">
                  View Campaign Details →
                </span>
              </div>
            </div>

            <div className="p-6 lg:p-8">
              <p className="text-sm text-[#cbd5e1]/80 leading-relaxed mb-6 font-normal">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.services.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#000c22] text-[#cbd5e1] border border-[rgba(255,253,240,0.06)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="p-8 sm:p-14 rounded-3xl bg-[#001840]/60 border border-[rgba(255,253,240,0.08)] text-center max-w-3xl mx-auto backdrop-blur-md">
        <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFDF0] mb-3">
          Want to see ad account results in your category?
        </h3>
        <p className="text-sm text-[#cbd5e1]/80 mb-8 font-normal">
          Check out our detailed case studies or book a call to review live whitelisting benchmarks.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button href="/case-studies" variant="primary">
            Explore Case Studies
          </Button>
          <Button href="/contact" variant="outline">
            Start a project
          </Button>
        </div>
      </div>
    </main>
  );
}
