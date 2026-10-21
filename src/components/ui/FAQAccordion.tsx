'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '@/lib/types';

interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.id || idx}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'bg-white border-melon-primary/40 shadow-md'
                : 'bg-white/80 border-melon-primary/10 hover:border-melon-primary/20'
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-melon-dark hover:text-melon-primary transition-colors"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-melon-primary' : 'text-melon-secondary/50'}`} />
                <span className="text-base md:text-lg">{item.pertanyaan}</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-melon-secondary transition-transform duration-300 shrink-0 ${
                  isOpen ? 'rotate-180 text-melon-primary' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-sm text-melon-dark/80 leading-relaxed border-t border-melon-100/60 font-normal">
                {item.jawaban}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
