'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { matchPrompt, PROMPT_ITEMS } from '@/lib/promptMatcher';
import { Modal } from '@/components/ui/Modal';

interface NavigationPromptProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavigationPrompt: React.FC<NavigationPromptProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const matches = matchPrompt(query);
  const hasQuery = query.trim().length > 0;
  const displayedItems = hasQuery && matches.length > 0
    ? matches.map((m) => m.item)
    : PROMPT_ITEMS;

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (path: string) => {
    onClose();
    router.push(path);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % displayedItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + displayedItems.length) % displayedItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (displayedItems.length > 0) {
        handleSelect(displayedItems[selectedIndex].path);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Clyx Prompt Navigation" maxWidth="max-w-xl">
      <div className="flex flex-col gap-4">
        {/* Input Bar */}
        <div className="relative flex items-center">
          <span className="absolute left-4 text-[#f8d613] font-mono font-bold text-lg select-none">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a destination or prompt (e.g. 'show me your work', 'contact')..."
            className="w-full pl-10 pr-4 py-3.5 bg-[#18224b] text-[#fbfcfc] rounded-xl border border-[rgba(251,252,252,0.15)] focus:border-[#f8d613] focus:outline-none focus:ring-1 focus:ring-[#f8d613] placeholder-[#62759e] text-sm transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 text-xs text-[#9aaecf] hover:text-[#f8d613] px-2 py-1 bg-[#111835] rounded-md"
            >
              clear
            </button>
          )}
        </div>

        {/* Results / Suggestions */}
        <div className="flex flex-col gap-1 max-h-72 overflow-y-auto pr-1">
          {hasQuery && matches.length === 0 ? (
            <div className="p-4 text-center text-[#9aaecf] bg-[#18224b]/40 rounded-xl border border-[rgba(251,252,252,0.08)]">
              <p className="text-sm font-medium text-[#fbfcfc]">No direct route found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-[#62759e] mt-1">Try one of the suggested agency prompts below:</p>
            </div>
          ) : (
            <div className="text-xs font-semibold uppercase tracking-wider text-[#62759e] px-2 py-1">
              {hasQuery ? 'Matching Routes' : 'Suggested Prompts'}
            </div>
          )}

          {displayedItems.map((item, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={item.path + item.prompt}
                onClick={() => handleSelect(item.path)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-[#0248c1] text-[#fbfcfc] shadow-md translate-x-1'
                    : 'hover:bg-[#18224b] text-[#9aaecf]'
                }`}
              >
                <div className="flex flex-col">
                  <span className={`text-sm font-semibold font-mono ${isSelected ? 'text-[#f8d613]' : 'text-[#fbfcfc] group-hover:text-[#f8d613]'}`}>
                    &ldquo;{item.prompt}&rdquo;
                  </span>
                  <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-[#62759e]'}`}>
                    {item.description}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-[#111835] text-[#f8d613]' : 'bg-[#18224b] text-[#9aaecf]'
                  }`}>
                    {item.path}
                  </span>
                  <span className={`text-sm ${isSelected ? 'text-[#f8d613]' : 'text-transparent group-hover:text-[#9aaecf]'}`}>
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer tip */}
        <div className="pt-2 border-t border-[rgba(251,252,252,0.08)] flex items-center justify-between text-xs text-[#62759e]">
          <span>Use <kbd className="px-1.5 py-0.5 bg-[#18224b] rounded text-[#9aaecf]">↑</kbd> <kbd className="px-1.5 py-0.5 bg-[#18224b] rounded text-[#9aaecf]">↓</kbd> to navigate, <kbd className="px-1.5 py-0.5 bg-[#18224b] rounded text-[#9aaecf]">Enter</kbd> to select</span>
          <span><kbd className="px-1.5 py-0.5 bg-[#18224b] rounded text-[#9aaecf]">Esc</kbd> to close</span>
        </div>
      </div>
    </Modal>
  );
};
