import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllProjectSlugs } from '@/lib/data/projects';
import { getCmsProjectBySlug, getCmsProjects } from '@/lib/cms/data';
import { Button } from '@/components/ui/Button';

interface PortfolioSlugProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PortfolioSlugProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getCmsProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found — CLYX' };
  }

  return {
    title: `${project.title} — CLYX Portfolio`,
    description: project.description,
  };
}

export default async function PortfolioDetailPage({ params }: PortfolioSlugProps) {
  const { slug } = await params;
  const project = await getCmsProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getCmsProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length] || allProjects[0];

  return (
    <main className="w-full min-h-screen py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-10">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#9aaecf] hover:text-[#F5C400] transition-colors"
        >
          ← Back to Portfolio
        </Link>
      </div>

      <div className="border-b border-[rgba(255,253,240,0.12)] pb-12 mb-16">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] px-3 py-1 bg-[#001840] rounded-full border border-[rgba(255,253,240,0.12)]">
            {project.category}
          </span>
          <span className="text-xs font-mono text-[#9aaecf]">
            {project.year}
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#FFFDF0] tracking-tight mb-8 max-w-4xl leading-[1.05]">
          {project.title}
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[rgba(255,253,240,0.12)]">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#7d93b8] block mb-1">
              Client
            </span>
            <span className="text-base font-semibold text-[#FFFDF0]">
              {project.client}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#7d93b8] block mb-1">
              Category
            </span>
            <span className="text-base font-semibold text-[#FFFDF0]">
              {project.category}
            </span>
          </div>

          <div className="col-span-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#7d93b8] block mb-1">
              Disciplines Delivered
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {project.services.map((s) => (
                <span key={s} className="text-xs px-2.5 py-0.5 rounded-full bg-[#001840] border border-[rgba(255,253,240,0.1)] text-[#9aaecf] font-mono">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Visual Card */}
      <div
        data-cursor="explore"
        className="w-full aspect-[21/9] min-h-[300px] bg-[#001840] rounded-3xl border border-[rgba(255,253,240,0.12)] flex flex-col items-center justify-center p-8 text-center mb-16 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#000c22] via-[#001840] to-[#102A71]/50 opacity-90 transition-opacity group-hover:opacity-100" />
        <div className="z-10 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] mb-2 block">
            Campaign Execution Asset
          </span>
          <p className="text-2xl sm:text-4xl font-black text-[#FFFDF0] tracking-tight">
            {project.title}
          </p>
          <p className="text-sm font-mono text-[#9aaecf] mt-3">
            Whitelisted Creator Creative × Meta & Google Scaling
          </p>
        </div>
      </div>

      {/* Narrative Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        <div className="lg:col-span-6 flex flex-col gap-8">
          <section className="p-8 sm:p-10 rounded-3xl bg-[#001840]/50 border border-[rgba(255,253,240,0.1)]">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#F5C400] mb-4">
              01 // Overview
            </h2>
            <p className="text-base text-[#FFFDF0] leading-relaxed">
              {project.overview}
            </p>
          </section>

          <section className="p-8 sm:p-10 rounded-3xl bg-[#001840]/50 border border-[rgba(255,253,240,0.1)]">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#F5C400] mb-4">
              02 // The Ad Fatigue Challenge
            </h2>
            <p className="text-sm sm:text-base text-[#9aaecf] leading-relaxed">
              {project.challenge}
            </p>
          </section>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-8">
          <section className="p-8 sm:p-10 rounded-3xl bg-[#001840]/50 border border-[rgba(255,253,240,0.1)]">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#F5C400] mb-4">
              03 // Whitelisting &amp; Performance Strategy
            </h2>
            <p className="text-sm sm:text-base text-[#9aaecf] leading-relaxed">
              {project.approach}
            </p>
          </section>

          <section className="p-8 sm:p-10 rounded-3xl bg-[#001840]/50 border border-[rgba(255,253,240,0.1)]">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#F5C400] mb-4">
              04 // Account Execution &amp; Scaling
            </h2>
            <p className="text-sm sm:text-base text-[#9aaecf] leading-relaxed">
              {project.execution}
            </p>
          </section>
        </div>
      </div>

      {/* Gallery Clips */}
      <div className="mb-20">
        <h2 className="text-2xl sm:text-3xl font-black text-[#FFFDF0] mb-8 tracking-tight">
          Campaign Artifacts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.gallery.map((g, i) => (
            <div
              key={i}
              data-cursor="view"
              className="p-8 rounded-2xl bg-[#001840]/60 border border-[rgba(255,253,240,0.1)] hover:border-[#F5C400]/40 transition-colors"
            >
              <span className="text-xs font-mono text-[#F5C400] block mb-3">Asset #0{i + 1}</span>
              <p className="text-base font-semibold text-[#FFFDF0]">{g.caption}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-[rgba(255,253,240,0.12)] pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#7d93b8] block mb-1">
            Next Campaign
          </span>
          <Link
            href={`/portfolio/${nextProject.slug}`}
            className="text-xl sm:text-3xl font-black text-[#FFFDF0] hover:text-[#F5C400] transition-colors"
          >
            {nextProject.title} →
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button href="/contact" variant="primary">
            Start a project
          </Button>
          <Button href="/portfolio" variant="outline">
            All Portfolio
          </Button>
        </div>
      </div>
    </main>
  );
}
