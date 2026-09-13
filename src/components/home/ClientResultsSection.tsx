'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CASE_STUDIES as STATIC_CASE_STUDIES } from '@/lib/data/caseStudies';
import { CaseStudy } from '@/types';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

export const ClientResultsSection: React.FC = () => {
  const [studies, setStudies] = useState<CaseStudy[]>(STATIC_CASE_STUDIES);

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
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-16 bg-[#000c22] border-b border-[rgba(255,253,240,0.06)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 border-b border-[rgba(255,253,240,0.06)] pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] block mb-3">
              Performance Evidence
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#FFFDF0]">
              Client Results &amp; Whitelisting Data
            </h2>
          </div>
          <Button href="/case-studies" variant="outline" className="shrink-0 border-[rgba(255,253,240,0.15)] hover:border-[#F5C400]">
            All Verified Breakdowns →
          </Button>
        </div>

        {/* Editorial Case Study Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {studies.map((study) => (
            <div
              key={study.slug}
              className="p-8 lg:p-10 rounded-3xl bg-[#001840]/40 border border-[rgba(255,253,240,0.08)] flex flex-col justify-between hover:border-[#F5C400]/40 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-8 border-b border-[rgba(255,253,240,0.06)] pb-4">
                  <span className="text-xs font-mono text-[#F5C400] px-3 py-1 rounded-full bg-[#000c22] border border-[rgba(255,253,240,0.08)]">
                    {study.category}
                  </span>
                  <span className="text-3xl font-black text-[#F5C400] font-mono tracking-tight">
                    {study.roasLift}
                  </span>
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-[#FFFDF0] group-hover:text-[#F5C400] transition-colors mb-3 leading-snug">
                  {study.title}
                </h3>

                <p className="text-sm text-[#cbd5e1]/80 leading-relaxed font-normal mb-8">
                  {study.summary}
                </p>

                {/* Evidence Metrics Box */}
                <div className="p-4 rounded-2xl bg-[#000c22] border border-[rgba(255,253,240,0.06)] mb-8 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#798fae] font-mono uppercase text-[10px]">Whitelisted Handle</span>
                    <span className="font-mono text-[#F5C400] font-bold">{study.creatorHandle}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[rgba(255,253,240,0.04)]">
                    <span className="text-[#798fae] font-mono uppercase text-[10px]">Ad Spend Managed</span>
                    <span className="font-mono text-[#FFFDF0] font-bold">{study.adSpendManaged}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(255,253,240,0.06)] flex items-center justify-between text-xs">
                <span className="text-[#798fae] font-mono text-[11px]">
                  {study.client}
                </span>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="font-mono text-[#F5C400] group-hover:translate-x-1 transition-transform font-bold"
                >
                  Read Strategy Breakdown →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
