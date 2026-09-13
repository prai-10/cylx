import type { Metadata } from 'next';
import Link from 'next/link';
import { getCmsCaseStudies } from '@/lib/cms/data';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Case Studies — CLYX',
  description: 'In-depth breakdowns of creator whitelisting, ad spend scaling, and ROAS improvements across client accounts.',
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCmsCaseStudies();

  return (
    <main className="w-full min-h-screen py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-20">
        <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] px-3 py-1 bg-[#001840] rounded-full border border-[rgba(255,253,240,0.12)] inline-block mb-4">
          Data &amp; Scale
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#FFFDF0] tracking-tight mb-6 leading-[1.05]">
          Case Studies &amp; Whitelisting Data
        </h1>
        <p className="text-base sm:text-lg text-[#9aaecf] max-w-2xl leading-relaxed font-normal">
          Real numbers, verified creator handles, and systematic media buying strategies that scaled brands across Meta and Google.
        </p>
      </div>

      {/* Case Studies List */}
      <div className="flex flex-col gap-10 mb-28">
        {caseStudies.map((study, idx) => (
          <div
            key={study.slug}
            data-cursor="explore"
            className="p-8 sm:p-12 rounded-3xl bg-[#001840]/40 border border-[rgba(255,253,240,0.1)] hover:border-[#F5C400]/40 transition-all flex flex-col lg:flex-row justify-between gap-10 group"
          >
            <div className="max-w-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-mono text-[#F5C400] px-3 py-1 rounded-full bg-[#000c22] border border-[rgba(255,253,240,0.1)]">
                    0{idx + 1} // {study.category}
                  </span>
                  <span className="text-xs font-mono text-[#9aaecf]">
                    Client: {study.client}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-[#FFFDF0] group-hover:text-[#F5C400] transition-colors mb-4 tracking-tight leading-tight">
                  {study.title}
                </h2>

                <p className="text-sm sm:text-base text-[#9aaecf] leading-relaxed mb-8">
                  {study.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-xs font-mono">
                <span className="text-[#FFFDF0] bg-[#001840] px-3 py-1.5 rounded-lg border border-[rgba(255,253,240,0.1)]">
                  Handle: <span className="text-[#F5C400]">{study.creatorHandle}</span>
                </span>
                <span className="text-[#FFFDF0] bg-[#001840] px-3 py-1.5 rounded-lg border border-[rgba(255,253,240,0.1)]">
                  Format: <span className="text-[#9aaecf]">{study.whitelistedFormat}</span>
                </span>
              </div>
            </div>

            {/* Metrics Pillar & Action */}
            <div className="lg:w-80 shrink-0 flex flex-col justify-between p-8 rounded-2xl bg-[#000c22] border border-[rgba(255,253,240,0.08)] gap-8">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#7d93b8] block mb-2">
                  ROAS Lift
                </span>
                <span className="text-5xl sm:text-6xl font-black text-[#F5C400] font-mono tracking-tight">
                  {study.roasLift}
                </span>
                <div className="mt-4 pt-4 border-t border-[rgba(255,253,240,0.08)]">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#7d93b8] block mb-1">
                    Ad Spend Scaled
                  </span>
                  <span className="text-sm font-bold text-[#FFFDF0] font-mono">
                    {study.adSpendManaged}
                  </span>
                </div>
              </div>

              <Button href={`/case-studies/${study.slug}`} variant="primary" size="md" className="w-full">
                Read Full Breakdown →
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Direct CTA */}
      <div className="p-10 sm:p-14 rounded-3xl bg-[#001840]/60 border border-[rgba(255,253,240,0.12)] text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] block mb-3">
          Scale Your Acquisition
        </span>
        <h3 className="text-2xl sm:text-4xl font-black text-[#FFFDF0] mb-4 tracking-tight">
          Want similar numbers for your product category?
        </h3>
        <p className="text-sm sm:text-base text-[#9aaecf] mb-8 leading-relaxed max-w-xl mx-auto">
          Schedule a direct growth session to review your current creative CPA and discover whitelisted creator opportunities.
        </p>
        <Button href="/contact" variant="primary" size="lg">
          Book a growth call →
        </Button>
      </div>
    </main>
  );
}
