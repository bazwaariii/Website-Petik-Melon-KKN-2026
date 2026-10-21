'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Users, CheckCircle2, CalendarCheck, ArrowLeft, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PaketWisata } from '@/lib/types';
import { getPaketList } from '@/lib/data-store';
import { formatRupiah } from '@/lib/utils';

export default function DetailPaketClient({ slug }: { slug: string }) {
  const [paket, setPaket] = useState<PaketWisata | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const list = getPaketList();
    const found = list.find((p) => p.slug === slug);
    if (found) {
      setPaket(found);
    }
    setLoaded(true);
  }, [slug]);

  if (loaded && !paket) {
    notFound();
  }

  if (!paket) return <div className="pt-28 pb-16 text-center text-xs text-slate-500">Memuat paket...</div>;

  return (
    <div className="pt-28 pb-16 space-y-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/paket"
          className="inline-flex items-center gap-2 text-xs font-bold text-melon-secondary hover:text-melon-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Paket</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Gallery & Images */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden border-2 border-melon-primary/20 shadow-lg bg-melon-100">
              <Image
                src={paket.foto_utama}
                alt={paket.nama}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="orange" className="bg-white/90 text-sm font-bold py-1.5 px-4">
                  {formatRupiah(paket.harga)} / Orang
                </Badge>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {paket.galeri && paket.galeri.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {paket.galeri.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="relative h-20 rounded-xl overflow-hidden border border-melon-primary/10 bg-melon-100"
                  >
                    <Image src={imgUrl} alt={`${paket.nama} ${idx}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Description & Booking Box */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-semibold text-melon-secondary">
                <div className="flex items-center gap-1 bg-melon-accent/30 px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Durasi: {paket.durasi}</span>
                </div>
                <div className="flex items-center gap-1 bg-melon-primary/10 text-melon-primary px-3 py-1 rounded-full">
                  <Users className="w-3.5 h-3.5" />
                  <span>Minimal: {paket.min_orang} Orang</span>
                </div>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-melon-dark">
                {paket.nama}
              </h1>

              <p className="text-sm text-melon-dark/80 leading-relaxed">
                {paket.deskripsi}
              </p>

              <div className="space-y-3 pt-2">
                <h3 className="font-heading text-sm font-bold text-melon-dark uppercase tracking-wider">
                  Fasilitas & Layanan Yang Didapat:
                </h3>
                <div className="space-y-2">
                  {paket.fasilitas.map((fas, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-melon-dark/80">
                      <CheckCircle2 className="w-4 h-4 text-melon-secondary shrink-0 mt-0.5" />
                      <span>{fas}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Action Card */}
            <div className="p-6 rounded-3xl bg-white border-2 border-melon-primary/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-melon-dark/60 block">Total Investasi</span>
                  <span className="font-heading text-2xl font-extrabold text-melon-primary">
                    {formatRupiah(paket.harga)}
                  </span>
                  <span className="text-xs text-melon-dark/60 font-normal"> / Peserta</span>
                </div>
                <Badge variant="green">Konfirmasi Instan</Badge>
              </div>

              <div className="flex flex-col gap-2">
                <Link href={`/reservasi?paket=${paket.slug}`}>
                  <Button variant="primary" size="lg" className="w-full justify-center">
                    <CalendarCheck className="w-5 h-5 mr-2" />
                    Pesan Paket Ini Sekarang
                  </Button>
                </Link>
                <a
                  href={`https://wa.me/6282253070639?text=${encodeURIComponent(`Halo Admin Mirah Farm Sidorejo, saya ingin bertanya mengenai ${paket.nama}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="whatsapp" size="md" className="w-full justify-center">
                    <Phone className="w-4 h-4 mr-1.5" />
                    Tanya Admin via WA
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
