'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PROJECTS as STATIC_PROJECTS, CATEGORIES } from '@/lib/data/projects';
import { Project, ProjectCategory } from '@/types';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

export const WorkShowcase: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS);
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');

  useEffect(() => {
    const fetchPublished = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('portfolio_projects')
          .select('*')
          .eq('status', 'published')
          .order('sort_order', { ascending: true });

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
        // Fallback to static
      }
    };
    fetchPublished();
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-16 bg-[#000c22] border-b border-[rgba(255,253,240,0.06)] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[rgba(255,253,240,0.06)] pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] block mb-3">
              Performance Portfolio
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#FFFDF0]">
              Campaigns, not concepts.
            </h2>
          </div>
          <Button href="/portfolio" variant="outline" className="shrink-0 border-[rgba(255,253,240,0.15)] hover:border-[#F5C400]">
            View Complete Archive →
          </Button>
        </div>

        {/* Categories Tab Bar */}
        <div role="tablist" aria-label="Portfolio categories" className="flex flex-wrap items-center gap-2.5 mb-12">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveCategory(cat)}
                className={`px-4.5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center justify-center min-h-[40px] ${
                  isSelected
                    ? 'bg-[#F5C400] text-[#000c22] font-bold shadow-md shadow-[#F5C400]/25 ring-2 ring-[#F5C400]/40'
                    : 'bg-[#001840]/80 text-[#cbd5e1] hover:text-[#FFFDF0] border border-[rgba(255,253,240,0.14)] hover:border-[#F5C400]/40 hover:bg-[#001840]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Editorial Campaign Gallery (Asymmetric Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => {
            const isWide = idx % 3 === 0;

            return (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                data-cursor="view"
                className={`group block rounded-3xl bg-[#001840]/40 border border-[rgba(255,253,240,0.08)] overflow-hidden hover:border-[#F5C400]/50 transition-all duration-300 ${
                  isWide ? 'md:col-span-12 lg:col-span-7' : 'md:col-span-6 lg:col-span-5'
                }`}
              >
                {/* Visual Frame */}
                <div className="relative aspect-[16/10] w-full bg-[#001840] flex flex-col justify-between p-6 sm:p-8 overflow-hidden group-hover:bg-[#00225c] transition-colors">
                  <div className="flex items-center justify-between z-10">
                    <span className="text-xs font-mono font-semibold text-[#F5C400] px-3 py-1.5 rounded-full bg-[#000c22]/90 border border-[rgba(255,253,240,0.1)]">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-[#cbd5e1]/70 bg-[#000c22]/60 px-2.5 py-1 rounded-md">
                      {project.year}
                    </span>
                  </div>

                  <div className="z-10 my-auto py-4">
                    <span className="text-xs uppercase tracking-widest text-[#F5C400] font-mono block mb-1.5 font-bold">
                      {project.client}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#FFFDF0] group-hover:text-[#F5C400] transition-colors leading-tight">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#cbd5e1] z-10 border-t border-[rgba(255,253,240,0.08)] pt-3.5">
                    <span className="font-mono text-xs text-[#798fae]">{project.services[0]}</span>
                    <span className="text-[#F5C400] group-hover:translate-x-1.5 transition-transform font-bold font-mono inline-flex items-center gap-1">
                      <span>View Case Study</span>
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>

                {/* Structured Meta Info (Cleanly Separated Below Preview) */}
                <div className="p-6 lg:p-7 border-t border-[rgba(255,253,240,0.06)] bg-[#000c22]/40">
                  <p className="text-xs sm:text-sm text-[#cbd5e1]/80 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((s) => (
                      <span
                        key={s}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#000c22] text-[#cbd5e1] border border-[rgba(255,253,240,0.08)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
