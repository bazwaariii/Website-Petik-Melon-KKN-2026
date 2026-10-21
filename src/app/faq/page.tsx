'use client';

import React, { useState, useEffect } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { FAQItem } from '@/lib/types';
import { getFAQList } from '@/lib/data-store';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  const loadData = () => {
    setFaqs(getFAQList());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('mirah_data_updated', loadData);
    return () => window.removeEventListener('mirah_data_updated', loadData);
  }, []);

  return (
    <div className="pt-28 pb-16 space-y-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="font-hand text-2xl text-melon-primary font-bold">
          ❓ Jawaban Pertanyaan Umum
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-melon-dark">
          Frequently Asked Questions (FAQ)
        </h1>
        <p className="text-base text-melon-dark/70 max-w-2xl mx-auto leading-relaxed">
          Temukan jawaban atas pertanyaan yang sering diajukan mengenai tiket masuk, cara reservasi, jam operasional, dan lokasi kebun.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQAccordion items={faqs} />
      </section>
    </div>
  );
}
