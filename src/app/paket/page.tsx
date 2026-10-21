'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PaketCard } from '@/components/ui/Card';
import { PaketWisata } from '@/lib/types';
import { getPaketList } from '@/lib/data-store';

export default function PaketPage() {
  const [paketList, setPaketList] = useState<PaketWisata[]>([]);

  const loadData = () => {
    setPaketList(getPaketList());
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
          🎟️ Pilihan Pengalaman Wisata
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-melon-dark">
          Daftar Paket Wisata Petik Melon
        </h1>
        <p className="text-base text-melon-dark/70 max-w-2xl mx-auto leading-relaxed">
          Pilih paket yang paling sesuai dengan kebutuhan Anda, keluarga, maupun rombongan instansi atau sekolah. Semua paket sudah termasuk akses penuh ke greenhouse.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paketList.map((paket) => (
            <PaketCard key={paket.id} paket={paket} />
          ))}
        </div>
      </section>

      {/* Info Tambahan */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-3xl border border-melon-primary/20 shadow-sm space-y-4 text-center">
          <h3 className="font-heading text-xl font-bold text-melon-dark">
            Memiliki Permintaan Rombongan Khusus / Event Kustom?
          </h3>
          <p className="text-sm text-melon-dark/80 leading-relaxed max-w-2xl mx-auto">
            Kami siap memfasilitasi acara gathering perusahaan, kunjungan edukasi sekolah skala besar, maupun acara komunitas dengan fasilitas saung khusus dan konsumsi olahan melon.
          </p>
          <a
            href={`https://wa.me/6282253070639?text=${encodeURIComponent('Halo Admin Mirah Farm Sidorejo, saya mau tanya paket event custom rombongan.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[#25D366] text-white font-bold text-sm rounded-full shadow-md hover:bg-[#20ba5a] transition-all"
          >
            💬 Konsultasi Event Rombongan via WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
