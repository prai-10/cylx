'use client';

import React from 'react';

interface LogoTickerProps {
  items?: string[];
  className?: string;
}

const DEFAULT_BRANDS = [
  'Kult Beauty',
  'Snitch',
  'Boat Lifestyle',
  'Mokobara',
  'Supertails',
  'Sleepy Owl',
  'The Whole Truth',
  'Minimalist',
];

export const LogoTicker: React.FC<LogoTickerProps> = ({
  items = DEFAULT_BRANDS,
  className = '',
}) => {
  const displayItems = [...items, ...items, ...items];

  return (
    <div className={`w-full overflow-hidden py-5 border-y border-[#0017B2]/10 bg-white select-none relative ${className}`}>
      <div className="relative flex w-full items-center">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex w-max animate-marquee space-x-12 items-center">
          {displayItems.map((brand, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-3 text-sm md:text-base font-bold uppercase tracking-wider text-[#000000]/60 hover:text-[#0017B2] transition-colors whitespace-nowrap group cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-[#FCD21D] group-hover:scale-125 transition-transform" />
              <span className="font-mono tracking-widest">{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
