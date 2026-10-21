'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle, ShieldCheck, Heart, Award, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { StatusPanenBadge } from '@/components/ui/StatusPanenBadge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PaketCard } from '@/components/ui/Card';
import { GalleryMasonry } from '@/components/ui/GalleryMasonry';
import { TestimonialSlider } from '@/components/ui/TestimonialSlider';
import { PaketWisata, GaleriItem, Testimoni, PengaturanSitus } from '@/lib/types';
import {
  getPaketList,
  getGaleriList,
  getTestimoniList,
  getPengaturan,
} from '@/lib/data-store';

export default function HomePage() {
  const [heroBg, setHeroBg] = useState<string>('/assets/photo/IMG_5443.PNG_2K.jpeg');
  const [paketList, setPaketList] = useState<PaketWisata[]>([]);
  const [galeriList, setGaleriList] = useState<GaleriItem[]>([]);
  const [testimoniList, setTestimoniList] = useState<Testimoni[]>([]);
  const [pengaturan, setPengaturan] = useState<PengaturanSitus | null>(null);

  const loadData = () => {
    setPaketList(getPaketList());
    setGaleriList(getGaleriList());
    setTestimoniList(getTestimoniList().filter((t) => t.disetujui));
    setPengaturan(getPengaturan());

    const customBg = localStorage.getItem('custom_hero_bg');
    if (customBg) {
      setHeroBg(customBg);
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('mirah_data_updated', loadData);
    return () => window.removeEventListener('mirah_data_updated', loadData);
  }, []);

  const settings = pengaturan || {
    status_panen: 'siap_petik' as const,
    status_panen_teks: 'Kebun Sedang Musim Panen Melon Premium!',
    hero_subjudul: 'Agrowisata Melon Premium Mirah Farm di Desa Sidorejo, Padangan, Bojonegoro. Rasakan manisnya kebun hidroponik berteknologi tinggi bersama keluarga & rekan.',
    maps_embed: 'https://maps.google.com/maps?q=Mirah%20Farm%20Desa%20Sidorejo%20Padangan%20Bojonegoro&t=&z=16&ie=UTF8&iwloc=&output=embed',
  };

  const featuredPackages = paketList.slice(0, 3);
  const teaserGallery = galeriList.slice(0, 6);

  return (
    <div className="space-y-16 md:space-y-24">
      {/* 1. HERO SECTION (CLEAN & HD BACKGROUND) */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-20 overflow-hidden bg-melon-dark">
        {/* HD Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBg}
            alt="Hero Background Mirah Farm HD"
            fill
            priority
            quality={100}
            className="object-cover opacity-50 scale-105 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-melon-dark via-melon-dark/50 to-black/30" />
        </div>

        {/* Floating Decorative Leaf Blob */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-melon-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-melon-secondary/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-20 space-y-6">
          {/* Harvest Status Badge */}
          <div className="inline-block animate-bounce duration-1000">
            <StatusPanenBadge
              status={settings.status_panen}
              teksCustom={settings.status_panen_teks}
              className="bg-black/50 border-melon-accent/40 text-melon-accent shadow-lg"
            />
          </div>

          {/* Main Title */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white drop-shadow-lg">
            Petik Melon <span className="text-melon-primary">Fresh</span> Langsung Dari Pohonnya
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-melon-bg/90 max-w-3xl mx-auto font-normal leading-relaxed">
            {settings.hero_subjudul}
          </p>
        </div>
      </section>

      {/* 2. STORYTELLING SECTION: CERITA KEBUN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/assets/photo/IMG_5446.PNG"
                alt="Selamat Datang Mirah Farm Sidorejo"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 z-20 w-48 sm:w-56 h-40 sm:h-48 rounded-2xl overflow-hidden border-4 border-melon-accent shadow-xl hidden sm:block transform rotate-3 hover:scale-105 transition-transform">
              <Image
                src="/assets/photo/IMG_5459.PNG"
                alt="Melon Jumbo Timbangan"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-4 left-4 z-30 bg-melon-primary text-white p-3 rounded-2xl shadow-lg font-hand text-lg rotate-3">
              🍈 Kebun Sidorejo Padangan
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="font-hand text-2xl text-melon-primary font-bold block">
              ✨ Cerita Dari Kebun Kami
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-melon-dark leading-tight">
              Inovasi Pertanian Modern Di Jantung Desa Sidorejo
            </h2>
            <p className="text-base text-melon-dark/80 leading-relaxed font-normal">
              Mirah Farm lahir dari semangat warga Desa Sidorejo untuk menghadirkan pengalaman agrowisata unggulan di Kabupaten Bojonegoro. Dengan memanfaatkan teknologi greenhouse hidroponik presisi, setiap tanaman melon dirawat secara penuh kasih tanpa menggunakan pestisida berbahaya.
            </p>
            <p className="text-base text-melon-dark/80 leading-relaxed font-normal">
              Pengunjung tidak hanya menikmati rasa segar manis buah melon Inthanon dan Golden Emerald yang crunchy, namun juga diajak belajar langsung cara merawat dan memetik buah matang sempurna dari tempatnya tumbuh.
            </p>

            <div className="p-4 rounded-2xl bg-melon-accent/20 border border-melon-accent/40 flex items-center gap-4">
              <div className="p-3 bg-melon-secondary text-white rounded-xl shrink-0">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div className="text-xs sm:text-sm text-melon-dark font-medium">
                &ldquo;Petik sendiri, timbang di tempat, dan nikmati manisnya langsung bersama keluarga tersayang di saung kebun kami.&rdquo;
              </div>
            </div>

            <div className="pt-2">
              <Link href="/tentang">
                <Button variant="secondary" icon={<ArrowRight className="w-4 h-4" />}>
                  Baca Selengkapnya Profil Desa
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PAKET WISATA UNGGULAN */}
      <section className="bg-gradient-to-b from-melon-bg via-white to-melon-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tagline="Pilih Pengalaman Anda"
            title="Paket Wisata Petik Melon"
            subtitle="Tersedia pilihan paket petik mandiri perorangan, rombongan sekolah/instansi, hingga paket VIP exclusive."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPackages.map((paket) => (
              <PaketCard key={paket.id} paket={paket} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/paket">
              <Button variant="outline" size="lg">
                Lihat Semua Fasilitas & Detail Paket &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. 4 KEUNGGULAN UTAMA MIRAH FARM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <SectionHeading
          tagline="Mengapa Harus Berkunjung"
          title="Keunggulan Kebun Melon Sidorejo"
          subtitle="Desain kebun yang bersih, edukatif, dan menyenangkan bagi seluruh kalangan umur."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-melon-primary/15 shadow-sm hover:shadow-md transition-all text-center space-y-3">
            <div className="w-14 h-14 bg-melon-primary/15 text-melon-primary rounded-2xl flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-heading text-lg font-bold text-melon-dark">
              Melon Premium Brix 14%+
            </h3>
            <p className="text-xs text-melon-dark/70 leading-relaxed">
              Daging buah renyah manis konsisten dengan pengawasan nutrisi otomatis setiap hari.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-melon-secondary/15 shadow-sm hover:shadow-md transition-all text-center space-y-3">
            <div className="w-14 h-14 bg-melon-secondary/15 text-melon-secondary rounded-2xl flex items-center justify-center mx-auto">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-heading text-lg font-bold text-melon-dark">
              Bebas Lumpur & Hama
            </h3>
            <p className="text-xs text-melon-dark/70 leading-relaxed">
              Lokasi greenhouse bersih berpipa hidroponik. Bebas becek sehingga pakaian tetap rapi.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-melon-highlight/30 shadow-sm hover:shadow-md transition-all text-center space-y-3">
            <div className="w-14 h-14 bg-melon-highlight/20 text-amber-800 rounded-2xl flex items-center justify-center mx-auto">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="font-heading text-lg font-bold text-melon-dark">
              Edukasi Tani Lengkap
            </h3>
            <p className="text-xs text-melon-dark/70 leading-relaxed">
              Diajari langsung oleh ahli tani mengenai cara budidaya hingga teknik menimbang buah manis.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-emerald-500/20 shadow-sm hover:shadow-md transition-all text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-500/15 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="font-heading text-lg font-bold text-melon-dark">
              Spot Foto Instagramable
            </h3>
            <p className="text-xs text-melon-dark/70 leading-relaxed">
              Lorong buah melon menggelantung indah menjadi latar foto estetik yang menarik.
            </p>
          </div>
        </div>
      </section>

      {/* 5. GALERI TEASER */}
      <section className="bg-white py-14 border-y border-melon-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tagline="Dokumentasi Kunjungan"
            title="Galeri Kebun & Wisatawan"
            subtitle="Momen ceria pengunjung saat memetik dan menikmati melon segar di Mirah Farm Sidorejo."
          />

          <GalleryMasonry items={teaserGallery} />

          <div className="text-center mt-10">
            <Link href="/galeri">
              <Button variant="primary" size="lg">
                Lihat Semua Foto & Video Galeri &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONI PENGUNJUNG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <SectionHeading
          tagline="Kata Pengunjung Kami"
          title="Ulasan & Kesan Pengunjung"
          subtitle="Kepuasan dan kebahagiaan para pengunjung yang telah merasakan langsung sensasi petik melon."
        />

        <TestimonialSlider testimonials={testimoniList} />
      </section>

      {/* 7. CTA PENUTUP & PETA LOKASI MINI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-melon-dark to-melon-800 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-block px-3 py-1 bg-melon-primary/20 text-melon-accent rounded-full text-xs font-semibold border border-melon-primary/30">
                📍 Lokasi Desa Sidorejo, Padangan, Bojonegoro
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold leading-tight">
                Rencanakan Kunjungan Petik Melon Anda Sekarang!
              </h2>
              <p className="text-sm sm:text-base text-melon-bg/80 leading-relaxed font-normal">
                Slot jam petik dibatasi tiap harinya demi menjaga kenyamanan pengunjung di dalam greenhouse. Segera amankan tanggal kunjungan Anda melalui reservasi online cepat.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link href="/reservasi">
                  <Button variant="primary" size="lg">
                    Form Reservasi Fast Response
                  </Button>
                </Link>
                <a
                  href={`https://wa.me/6282253070639?text=${encodeURIComponent('Halo Admin Mirah Farm, saya mau konsultasi jadwal kunjungan petik melon.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="whatsapp" size="lg" icon={<Phone className="w-5 h-5" />}>
                    Hubungi Admin WhatsApp
                  </Button>
                </a>
              </div>
            </div>

            {/* Embedded Google Maps Mini */}
            <div className="lg:col-span-5 relative h-64 w-full rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg">
              <iframe
                src={settings.maps_embed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Peta Lokasi Mirah Farm Sidorejo"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
