'use client';

import React, { useState, useEffect } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArtikelCard } from '@/components/ui/Card';
import { ArtikelBlog } from '@/lib/types';
import { getArtikelList } from '@/lib/data-store';

export default function BlogPage() {
  const [artikelList, setArtikelList] = useState<ArtikelBlog[]>([]);

  const loadData = () => {
    setArtikelList(getArtikelList().filter((a) => a.terbit));
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
          📖 Edukasi Agrowisata
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-melon-dark">
          Artikel & Tips Tani Melon
        </h1>
        <p className="text-base text-melon-dark/70 max-w-2xl mx-auto leading-relaxed">
          Temukan berbagai panduan memilih melon termanis, pengetahuan seputar sistem hidroponik greenhouse, serta informasi terkini dari Mirah Farm.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artikelList.map((artikel) => (
            <ArtikelCard key={artikel.id} artikel={artikel} />
          ))}
        </div>
      </section>
    </div>
  );
}
