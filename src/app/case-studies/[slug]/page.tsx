import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CASE_STUDIES, getAllCaseStudySlugs } from '@/lib/data/caseStudies';
import { getCmsCaseStudyBySlug, getCmsCaseStudies } from '@/lib/cms/data';
import { Button } from '@/components/ui/Button';

interface CaseStudySlugProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudySlugProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCmsCaseStudyBySlug(slug);

  if (!study) {
    return { title: 'Case Study Not Found — CLYX' };
  }

  return {
    title: `${study.title} — CLYX Case Study`,
    description: study.summary,
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudySlugProps) {
  const { slug } = await params;
  const study = await getCmsCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const allStudies = await getCmsCaseStudies();
  const currentIndex = allStudies.findIndex((c) => c.slug === slug);
  const nextStudy = allStudies[(currentIndex + 1) % allStudies.length] || allStudies[0];

  return (
    <main className="w-full min-h-screen py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-10">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#9aaecf] hover:text-[#F5C400] transition-colors"
        >
          ← Back to Case Studies
        </Link>
      </div>

      {/* Header */}
      <div className="border-b border-[rgba(255,253,240,0.12)] pb-12 mb-16">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] px-3 py-1 bg-[#001840] rounded-full border border-[rgba(255,253,240,0.12)]">
            {study.category}
          </span>
          <span className="text-xs font-mono text-[#9aaecf]">
            Client: {study.client}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#FFFDF0] tracking-tight mb-8 max-w-4xl leading-[1.08]">
          {study.title}
        </h1>

        {/* Data Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[rgba(255,253,240,0.12)]">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#7d93b8] block mb-1">
              ROAS Achieved
            </span>
            <span className="text-4xl font-black text-[#F5C400] font-mono">
              {study.roasLift}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#7d93b8] block mb-1">
              Ad Spend Scaled
            </span>
            <span className="text-2xl font-bold text-[#FFFDF0] font-mono">
              {study.adSpendManaged}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#7d93b8] block mb-1">
              Whitelisted Handle
            </span>
            <span className="text-base font-semibold text-[#F5C400] font-mono">
              {study.creatorHandle}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#7d93b8] block mb-1">
              Ad Format
            </span>
            <span className="text-xs text-[#9aaecf]">
              {study.whitelistedFormat}
            </span>
          </div>
        </div>
      </div>

      {/* Narrative Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        <div className="lg:col-span-6 flex flex-col gap-8">
          <section className="p-8 sm:p-10 rounded-3xl bg-[#001840]/50 border border-[rgba(255,253,240,0.1)]">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#F5C400] mb-4">
              01 // The Background &amp; Problem
            </h2>
            <p className="text-sm sm:text-base text-[#9aaecf] leading-relaxed">
              {study.challenge}
            </p>
          </section>

          <section className="p-8 sm:p-10 rounded-3xl bg-[#001840]/50 border border-[rgba(255,253,240,0.1)]">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#F5C400] mb-4">
              02 // Creator Whitelisting Strategy
            </h2>
            <p className="text-sm sm:text-base text-[#9aaecf] leading-relaxed">
              {study.whitelistingStrategy}
            </p>
          </section>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-8">
          <section className="p-8 sm:p-10 rounded-3xl bg-[#001840]/50 border border-[rgba(255,253,240,0.1)]">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#F5C400] mb-4">
              03 // Scaling Data &amp; Execution
            </h2>
            <p className="text-sm sm:text-base text-[#9aaecf] leading-relaxed">
              {study.scalingData}
            </p>
          </section>

          <section className="p-8 sm:p-10 rounded-3xl bg-[#000c22] border border-[rgba(255,253,240,0.1)]">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#F5C400] mb-5">
              04 // Key Performance Outcomes
            </h2>
            <div className="flex flex-col gap-3">
              {study.results.map((r, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-[rgba(255,253,240,0.08)] last:border-b-0">
                  <span className="text-sm text-[#9aaecf]">{r.label}</span>
                  <span className="text-base font-bold text-[#FFFDF0] font-mono">{r.metric}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-[rgba(255,253,240,0.12)] pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#7d93b8] block mb-1">
            Next Case Study
          </span>
          <Link
            href={`/case-studies/${nextStudy.slug}`}
            className="text-xl sm:text-3xl font-black text-[#FFFDF0] hover:text-[#F5C400] transition-colors"
          >
            {nextStudy.title} →
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button href="/contact" variant="primary">
            Book a growth call
          </Button>
          <Button href="/case-studies" variant="outline">
            All Case Studies
          </Button>
        </div>
      </div>
    </main>
  );
}
