'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CASE_STUDIES as STATIC_CASE_STUDIES } from '@/lib/data/caseStudies';
import { CaseStudy } from '@/types';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const ClientResultsSection: React.FC = () => {
  const [studies, setStudies] = useState<CaseStudy[]>(STATIC_CASE_STUDIES);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const fetchDynamic = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('case_studies')
          .select('*')
          .eq('status', 'published')
          .order('sort_order', { ascending: true });

        if (data && data.length > 0) {
          setStudies(
            data.map((item: Record<string, unknown>) => ({
              slug: String(item.slug),
              title: String(item.title),
              client: String(item.client),
              category: item.category as CaseStudy['category'],
              adSpendManaged: String(item.ad_spend_managed),
              roasLift: String(item.roas_lift),
              creatorHandle: String(item.creator_handle),
              whitelistedFormat: String(item.whitelisted_format),
              summary: String(item.summary),
              challenge: String(item.challenge),
              whitelistingStrategy: String(item.whitelisting_strategy),
              scalingData: String(item.scaling_data),
              results: (item.results as CaseStudy['results']) || [],
            }))
          );
        }
      } catch {
        // Fallback to static
      }
    };
    fetchDynamic();
  }, []);

  return (
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-16 bg-white border-b border-[#0017B2]/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 border-b border-[#0017B2]/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0017B2]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#0017B2] font-bold">
                05 / Verified Case Studies
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#000000]">
              Client Results &amp; Whitelisting Data
            </h2>
          </div>
          <Button href="/case-studies" variant="outline" className="shrink-0 border-[#0017B2]/20 hover:border-[#0017B2]">
            All Verified Breakdowns →
          </Button>
        </div>

        {/* Editorial Case Study Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {studies.map((study, idx) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="p-8 lg:p-10 rounded-3xl bg-[#F8FAFC] border border-[#0017B2]/15 flex flex-col justify-between hover:border-[#0017B2] transition-all duration-300 group relative shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-8 border-b border-[#0017B2]/10 pb-4">
                  <span className="text-xs font-mono text-[#0017B2] px-3 py-1 rounded-full bg-white border border-[#0017B2]/15 font-semibold">
                    {study.category}
                  </span>
                  <span className="text-3xl font-black text-[#0017B2] font-mono tracking-tight">
                    {study.roasLift}
                  </span>
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-[#000000] group-hover:text-[#0017B2] transition-colors mb-3 leading-snug">
                  {study.title}
                </h3>

                <p className="text-sm text-[#334155] leading-relaxed font-normal mb-8">
                  {study.summary}
                </p>

                {/* Evidence Metrics Box */}
                <div className="p-4 rounded-2xl bg-white border border-[#0017B2]/10 mb-8 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B] font-mono uppercase text-[10px]">Whitelisted Handle</span>
                    <span className="font-mono text-[#0017B2] font-bold">{study.creatorHandle}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#0017B2]/10">
                    <span className="text-[#64748B] font-mono uppercase text-[10px]">Ad Spend Managed</span>
                    <span className="font-mono text-[#000000] font-bold">{study.adSpendManaged}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#0017B2]/10 flex items-center justify-between text-xs">
                <span className="text-[#64748B] font-mono text-[11px]">
                  {study.client}
                </span>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="font-mono text-[#0017B2] hover:text-[#4A8FE7] group-hover:translate-x-1 transition-transform font-bold inline-flex items-center gap-1"
                >
                  <span>Strategy Breakdown</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
