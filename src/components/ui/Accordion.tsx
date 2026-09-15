'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
  tag?: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || '']);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`divide-y divide-[#0017B2]/10 border-y border-[#0017B2]/10 ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div key={item.id} className="py-6 sm:py-7 group transition-colors">
            <button
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between text-left gap-6 cursor-pointer"
            >
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="text-xs font-mono text-[#64748B] group-hover:text-[#0017B2] transition-colors">
                  0{idx + 1}
                </span>
                <span className="text-lg sm:text-2xl font-bold text-[#000000] group-hover:text-[#0017B2] transition-colors tracking-tight">
                  {item.question}
                </span>
              </div>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-8 h-8 rounded-full border border-[#0017B2]/20 flex items-center justify-center text-base text-[#0017B2] shrink-0 group-hover:border-[#0017B2] transition-colors"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: {
                      height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.25, delay: 0.08 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.25, ease: [0.65, 0, 0.35, 1] },
                      opacity: { duration: 0.15 },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <div className="pt-5 pl-8 sm:pl-12 max-w-3xl">
                    <p className="text-sm sm:text-base text-[#334155] leading-relaxed font-normal">
                      {item.answer}
                    </p>
                    {item.tag && (
                      <span className="inline-block mt-4 text-[10px] font-mono uppercase tracking-widest text-[#0017B2] px-2.5 py-1 rounded bg-[#4A8FE7]/15 border border-[#0017B2]/15 font-semibold">
                        {item.tag}
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
