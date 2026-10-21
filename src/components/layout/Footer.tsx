'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Instagram, ExternalLink, Heart } from 'lucide-react';
import { PengaturanSitus } from '@/lib/types';
import { getPengaturan } from '@/lib/data-store';

export const Footer = () => {
  const [settings, setSettings] = useState<PengaturanSitus | null>(null);

  const loadData = () => {
    setSettings(getPengaturan());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('mirah_data_updated', loadData);
    return () => window.removeEventListener('mirah_data_updated', loadData);
  }, []);

  const data = settings || {
    jam_operasional: 'Senin - Minggu: 07.30 - 17.00 WIB',
    alamat: 'Jl. Bengawan Mbenang, Dusun Mbenang, Sidorejo, Kec. Padangan, Kabupaten Bojonegoro, Jawa Timur 62162',
    wa_admin: '+6282253070639',
    instagram: 'mirah_farm',
  };

  return (
    <footer className="bg-melon-dark text-melon-bg pt-16 pb-12 relative overflow-hidden border-t-4 border-melon-primary">
      {/* Background organic glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-melon-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-melon-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-melon-accent">
                <Image
                  src="/assets/logo.png"
                  alt="Mirah Farm Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-white tracking-wide">
                  MIRAH FARM
                </h3>
                <p className="text-xs text-melon-accent font-semibold tracking-wider uppercase">
                  Desa Sidorejo, Bojonegoro
                </p>
              </div>
            </div>
            <p className="text-sm text-melon-bg/80 leading-relaxed">
              Agrowisata Petik Melon Greenhouse Hidroponik pertama dan terbesar di Desa Sidorejo, Padangan, Bojonegoro. Nikmati sensasi petik melon manis segar berkualitas tinggi.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-melon-secondary/40 text-melon-accent rounded-full text-xs font-medium border border-melon-secondary">
                🕒 {data.jam_operasional}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-4 border-b border-melon-bg/10 pb-2 inline-block">
              Navigasi Ringkas
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-melon-primary transition-colors flex items-center gap-2">
                  <span>🍃</span> Beranda Utama
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-melon-primary transition-colors flex items-center gap-2">
                  <span>🌾</span> Cerita Kebun Sidorejo
                </Link>
              </li>
              <li>
                <Link href="/paket" className="hover:text-melon-primary transition-colors flex items-center gap-2">
                  <span>🎟️</span> Paket Wisata & Harga
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="hover:text-melon-primary transition-colors flex items-center gap-2">
                  <span>📸</span> Galeri Foto & Video
                </Link>
              </li>
              <li>
                <Link href="/produk" className="hover:text-melon-primary transition-colors flex items-center gap-2">
                  <span>🍈</span> Produk Olahan UMKM
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-melon-primary transition-colors flex items-center gap-2">
                  <span>📖</span> Artikel Edukasi Tani
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-4 border-b border-melon-bg/10 pb-2 inline-block">
              Kontak & Lokasi
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-melon-primary shrink-0 mt-0.5" />
                <span className="text-melon-bg/80 leading-snug">
                  {data.alamat}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/6282253070639?text=${encodeURIComponent('Halo Admin Mirah Farm Sidorejo, saya mau tanya paket petik melon.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 font-medium transition-colors"
                >
                  {data.wa_admin}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-pink-400 shrink-0" />
                <a
                  href={`https://instagram.com/${data.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 font-medium transition-colors"
                >
                  @{data.instagram}
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/Vh3mkRcQXusJzWEcA?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-melon-accent hover:underline mt-1 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10"
                >
                  <span>📍 Buka Petunjuk di Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Admin Access */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-4 border-b border-melon-bg/10 pb-2 inline-block">
              Pengabdian KKN 2026
            </h4>
            <p className="text-xs text-melon-bg/70 leading-relaxed mb-4">
              Website ini dikembangkan dalam rangka Program Pengabdian Masyarakat KKN 2026 Desa Sidorejo, Kecamatan Padangan, Kabupaten Bojonegoro.
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-xs font-semibold text-melon-highlight">
                🔒 Area Pengelola Kebun
              </div>
              <p className="text-[11px] text-melon-bg/60">
                Kelola jadwal panen, reservasi baru, produk UMKM, dan galeri kebun.
              </p>
              <Link
                href="/admin/login"
                className="inline-block text-xs font-bold text-melon-primary hover:text-white transition-colors"
              >
                Masuk Dashboard Admin &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-melon-bg/10 flex flex-col sm:flex-row items-center justify-between text-xs text-melon-bg/60 gap-4">
          <p>© 2026 Mirah Farm Sidorejo. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> untuk Kebun Melon Sidorejo, Bojonegoro.
          </p>
        </div>
      </div>
    </footer>
  );
};
