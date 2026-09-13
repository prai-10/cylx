import React from 'react';
import { Button } from '@/components/ui/Button';

export const AboutStatement: React.FC = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#111835] border-t border-[rgba(251,252,252,0.08)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#f8d613] px-3 py-1 bg-[#18224b] rounded-full border border-[rgba(251,252,252,0.08)] inline-block mb-6">
              Agency Philosophy
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#fbfcfc] leading-tight mb-6">
              We live in the timeline your audience actually cares about.
            </h2>
            <Button href="/about" variant="primary">
              Learn About Clyx →
            </Button>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 text-[#9aaecf] text-base leading-relaxed">
            <p className="text-lg text-[#fbfcfc] font-medium leading-relaxed">
              Traditional agencies move at the speed of quarterly reviews. The internet moves at the speed of culture. Clyx Media was born inside the feed, built by creators, designers, and engineers who understand algorithmic velocity natively.
            </p>
            <p>
              We don&apos;t produce generic broadcast ads or clinical corporate collateral. We engineer high-concept social rollouts, tactile 3D simulations, interactive digital flagships, and unskippable campaign moments designed to be saved, shared, and remembered.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-[rgba(251,252,252,0.08)]">
              <div>
                <span className="text-2xl font-black text-[#f8d613]">Gen-Z</span>
                <p className="text-xs text-[#62759e] mt-1">Native perspective &amp; creator-first roster</p>
              </div>
              <div>
                <span className="text-2xl font-black text-[#fbfcfc]">100%</span>
                <p className="text-xs text-[#62759e] mt-1">Production-ready engineering &amp; craft</p>
              </div>
              <div>
                <span className="text-2xl font-black text-[#0248c1]">0s</span>
                <p className="text-xs text-[#62759e] mt-1">Tolerance for boring, predictable media</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
