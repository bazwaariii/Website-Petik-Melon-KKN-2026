'use client';

import React, { useState, useEffect } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProdukCard } from '@/components/ui/Card';
import { ProdukUMKM } from '@/lib/types';
import { getProdukList } from '@/lib/data-store';

export default function ProdukPage() {
  const [produkList, setProdukList] = useState<ProdukUMKM[]>([]);

  const loadData = () => {
    setProdukList(getProdukList());
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
          🍈 Olahan UMKM Desa Sidorejo
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-melon-dark">
          Produk Olahan & Melon Segar
        </h1>
        <p className="text-base text-melon-dark/70 max-w-2xl mx-auto leading-relaxed">
          Nikmati kelezatan olahan buah melon khas buatan warga lokal Desa Sidorejo. Tersedia pembelian eceran maupun grosir langsung dikirim ke lokasi Anda.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {produkList.map((produk) => (
            <ProdukCard key={produk.id} produk={produk} />
          ))}
        </div>
      </section>
    </div>
  );
}
