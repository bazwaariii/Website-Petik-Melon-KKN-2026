'use client';

import React, { useState, useEffect } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GalleryMasonry } from '@/components/ui/GalleryMasonry';
import { GaleriItem } from '@/lib/types';
import { getGaleriList } from '@/lib/data-store';

export default function GaleriPage() {
  const [items, setItems] = useState<GaleriItem[]>([]);

  const loadData = () => {
    setItems(getGaleriList());
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
          📸 Galeri & Media
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-melon-dark">
          Dokumentasi Mirah Farm Sidorejo
        </h1>
        <p className="text-base text-melon-dark/70 max-w-2xl mx-auto leading-relaxed">
          Kumpulan foto asli dan video kebun hidroponik, keceriaan pengunjung, kegiatan panen, serta fasilitas saung wisata di Desa Sidorejo.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GalleryMasonry items={items} />
      </section>
    </div>
  );
}
