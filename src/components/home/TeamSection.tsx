'use client';

import React from 'react';
import { TEAM_MEMBERS } from '@/lib/data/team';

export const TeamSection: React.FC = () => {
  return (
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-16 bg-white border-b border-[#0017B2]/10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-[#0017B2] font-bold block mb-3">
            Partnership Model
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#000000] mb-6">
            Small team. Direct access.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#334155] leading-relaxed font-normal">
            No middle managers, no junior handoffs, and no waiting 3 weeks for an ad variation. You work directly with the media buyers, creator managers, and engineers running your account.
          </p>
        </div>

        {/* Human Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={member.id}
              className="p-8 rounded-3xl bg-[#F8FAFC] border border-[#0017B2]/15 flex flex-col justify-between hover:border-[#0017B2] transition-colors shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#64748B] mb-6">
                  <span>Squad 0{idx + 1}</span>
                  <span className="text-[#0017B2] font-bold">{member.department}</span>
                </div>

                <h3 className="text-xl font-bold text-[#000000] mb-1">
                  {member.name}
                </h3>

                <span className="text-xs font-mono text-[#64748B] block mb-4">
                  {member.role}
                </span>

                <p className="text-xs text-[#334155] leading-relaxed font-normal">
                  {member.bioPlaceholder}
                </p>
              </div>

              <div className="pt-6 border-t border-[#0017B2]/10 mt-8 flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                <span>Shared Slack Channel</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
