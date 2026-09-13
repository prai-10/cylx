import type { Metadata } from 'next';
import { getCmsServices } from '@/lib/cms/data';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Services — CLYX',
  description: 'Six disciplines. One growth engine. Influencer marketing, performance marketing, social media management, UGC videos, website development, and Shopify stores.',
};

export default async function ServicesPage() {
  const services = await getCmsServices();

  return (
    <main className="w-full min-h-screen py-16 md:py-28 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto bg-[#000c22]">
      {/* Header */}
      <div className="mb-20 md:mb-28 border-b border-[rgba(255,253,240,0.06)] pb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] block mb-4">
          Our Disciplines
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#FFFDF0] tracking-tight leading-[0.98] mb-8 max-w-5xl">
          Six disciplines. One growth engine.
        </h1>
        <p className="text-lg sm:text-xl text-[#cbd5e1] max-w-3xl leading-relaxed font-normal">
          We don&apos;t run fragmented marketing tactics. We integrate creator whitelisting, media buying, feed-native UGC, and conversion-built web into a single high-velocity revenue engine.
        </p>
      </div>

      {/* 6 Disciplines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-28">
        {services.map((service, idx) => (
          <div
            key={service.id}
            id={service.id}
            className="p-8 lg:p-10 rounded-3xl bg-[#001840]/40 border border-[rgba(255,253,240,0.08)] flex flex-col justify-between hover:border-[#F5C400]/40 transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-8 border-b border-[rgba(255,253,240,0.06)] pb-4">
                <span className="text-xs font-mono text-[#F5C400] px-3 py-1 rounded-full bg-[#000c22] border border-[rgba(255,253,240,0.08)]">
                  0{idx + 1}
                </span>
                <span className="text-[11px] font-mono text-[#798fae] uppercase">
                  Growth Engine
                </span>
              </div>

              <h2 className="text-2xl font-bold text-[#FFFDF0] group-hover:text-[#F5C400] transition-colors mb-3">
                {service.title}
              </h2>

              <p className="text-sm font-medium text-[#FFFDF0]/90 mb-4 leading-relaxed">
                {service.shortDescription}
              </p>

              <p className="text-xs text-[#cbd5e1]/80 leading-relaxed mb-6 font-normal">
                {service.longDescription}
              </p>
            </div>

            <div className="pt-6 border-t border-[rgba(255,253,240,0.06)]">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#798fae] block mb-3">
                Key Deliverables
              </span>
              <ul className="flex flex-col gap-2">
                {service.capabilities.map((cap) => (
                  <li key={cap} className="text-xs text-[#cbd5e1] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400]" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Services Bottom Banner */}
      <div className="p-8 sm:p-14 rounded-3xl bg-[#001840]/60 border border-[rgba(255,253,240,0.08)] flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md">
        <div className="max-w-xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] block mb-3">
            Integrated Scaling
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-[#FFFDF0] mb-3">
            Ready to integrate creator ads with performance media?
          </h3>
          <p className="text-sm text-[#cbd5e1]/80 leading-relaxed font-normal">
            We partner with category leaders to turn organic clips into scaled ad accounts with transparent reporting and direct Slack channel access.
          </p>
        </div>

        <Button href="/contact" variant="primary" size="lg">
          Book a growth call →
        </Button>
      </div>
    </main>
  );
}
