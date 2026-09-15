'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS as STATIC_PROJECTS, CATEGORIES } from '@/lib/data/projects';
import { Project, ProjectCategory } from '@/types';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const WorkShowcase: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS);
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');
  const prefersReduced = useReducedMotion();

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
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-16 bg-white border-b border-[#0017B2]/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#0017B2]/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0017B2]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#0017B2] font-bold">
                04 / Performance Portfolio
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#000000]">
              Campaigns, not concepts.
            </h2>
          </div>
          <Button href="/portfolio" variant="outline" className="shrink-0 border-[#0017B2]/20 hover:border-[#0017B2]">
            View Complete Archive →
          </Button>
        </div>

        {/* Categories Tab Bar */}
        <div role="tablist" aria-label="Portfolio categories" className="flex flex-wrap items-center gap-2.5 mb-14">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4.5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-colors cursor-pointer flex items-center justify-center min-h-[40px] ${
                  isSelected
                    ? 'text-[#000000]'
                    : 'text-[#64748B] hover:text-[#000000] bg-[#F1F5F9] border border-[#0017B2]/10 hover:border-[#0017B2]/30'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-[#FCD21D] rounded-full shadow-md shadow-[#FCD21D]/30 -z-0"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10 font-bold">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Editorial Campaign Gallery */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10"
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => {
              const isWide = idx % 3 === 0;

              return (
                <motion.div
                  layout
                  key={project.slug}
                  initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: prefersReduced ? 1 : 0.98 }}
                  transition={{ duration: 0.4 }}
                  className={`${
                    isWide ? 'md:col-span-12 lg:col-span-7' : 'md:col-span-6 lg:col-span-5'
                  }`}
                >
                  <Link
                    href={`/portfolio/${project.slug}`}
                    data-cursor="view"
                    className="group block rounded-3xl bg-[#F8FAFC] border border-[#0017B2]/15 overflow-hidden hover:border-[#0017B2] transition-all duration-300 h-full flex flex-col justify-between shadow-sm"
                  >
                    {/* Visual Frame */}
                    <div className="relative aspect-[16/10] w-full bg-[#0017B2]/5 flex flex-col justify-between p-6 sm:p-8 overflow-hidden group-hover:bg-[#4A8FE7]/10 transition-colors">
                      <div className="flex items-center justify-between z-10">
                        <span className="text-xs font-mono font-semibold text-[#0017B2] px-3 py-1.5 rounded-full bg-white border border-[#0017B2]/15 shadow-sm">
                          {project.category}
                        </span>
                        <span className="text-xs font-mono text-[#64748B] bg-white px-2.5 py-1 rounded-md border border-[#0017B2]/10">
                          {project.year}
                        </span>
                      </div>

                      <div className="z-10 my-auto py-4">
                        <span className="text-xs uppercase tracking-widest text-[#0017B2] font-mono block mb-1.5 font-bold">
                          {project.client}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-[#000000] group-hover:text-[#0017B2] transition-colors leading-tight">
                          {project.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#64748B] z-10 border-t border-[#0017B2]/10 pt-3.5">
                        <span className="font-mono text-xs text-[#64748B]">{project.services[0]}</span>
                        <span className="text-[#0017B2] group-hover:translate-x-1.5 transition-transform font-bold font-mono inline-flex items-center gap-1">
                          <span>View Case Study</span>
                          <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </div>

                    {/* Structured Meta Info */}
                    <div className="p-6 lg:p-7 border-t border-[#0017B2]/10 bg-white">
                      <p className="text-xs sm:text-sm text-[#334155] leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.services.map((s) => (
                          <span
                            key={s}
                            className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#F1F5F9] text-[#334155] border border-[#0017B2]/10"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
