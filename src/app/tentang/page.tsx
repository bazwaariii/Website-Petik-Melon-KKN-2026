import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { CalendarCheck, Award, Heart, Sparkles, MapPin } from 'lucide-react';
import { PENGATURAN_DEFAULT } from '@/lib/constants';

export default function TentangPage() {
  return (
    <div className="pt-28 pb-16 space-y-16">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="font-hand text-2xl text-melon-primary font-bold">
          🌾 Cerita Desa & Kebun Sidorejo
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-melon-dark">
          Tentang Mirah Farm Sidorejo
        </h1>
        <p className="text-base sm:text-lg text-melon-dark/70 max-w-3xl mx-auto leading-relaxed">
          Mengenal perjalanan budidaya agrowisata melon hidroponik modern yang memberdayakan masyarakat Desa Sidorejo, Kecamatan Padangan, Bojonegoro.
        </p>
      </section>

      {/* Main Story & Profile */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="/assets/photo/IMG_5455.PNG"
                alt="Pengelola & Perangkat Kebun Mirah Farm"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 bg-melon-primary text-white p-4 rounded-2xl shadow-lg max-w-xs text-xs font-medium font-sans border-2 border-white">
              &ldquo;Menggabungkan teknologi hijau dengan kearifan lokal tani Bojonegoro.&rdquo;
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <h2 className="font-heading text-3xl font-extrabold text-melon-dark leading-tight">
              Menghadirkan Buah Melon Kualitas Ekspor Dari Bojonegoro
            </h2>
            <p className="text-sm sm:text-base text-melon-dark/80 leading-relaxed font-normal">
              Agrowisata Mirah Farm diresmikan sebagai wujud nyata inovasi pertanian terpadu di Desa Sidorejo. Dengan iklim Bojonegoro yang kaya akan sinar matahari, tanaman melon hidroponik tumbuh optimal menghasilkan buah dengan tingkat kemanisan di atas rata-rata nasional.
            </p>
            <p className="text-sm sm:text-base text-melon-dark/80 leading-relaxed font-normal">
              Melalui sistem greenhouse tertutup berstandar tinggi, buah terjaga higienis dari kontaminasi lingkungan luar dan serangga. Setiap pengunjung diajak menikmati sensasi memetik buah melon segar pilihan langsung dari pohonnya.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-melon-primary/20 shadow-sm">
                <div className="text-melon-primary font-heading font-extrabold text-2xl mb-1">
                  100% Organik Nutrisi
                </div>
                <div className="text-xs text-melon-dark/70">
                  Nutrisi mikro & makro terukur tanpa residu pestisida sintetis.
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-melon-secondary/20 shadow-sm">
                <div className="text-melon-secondary font-heading font-extrabold text-2xl mb-1">
                  Pemberdayaan UMKM
                </div>
                <div className="text-xs text-melon-dark/70">
                  Mengangkat ekonomi warga melalui olahan olahan buah melon khas desa.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Perkembangan */}
      <section className="bg-white py-14 border-y border-melon-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tagline="Jejak Langkah Kebun"
            title="Perjalanan Mirah Farm Sidorejo"
          />

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-melon-primary/20">
            <div className="relative flex items-center justify-between gap-8 flex-col sm:flex-row">
              <div className="sm:w-1/2 text-right space-y-1">
                <span className="text-xs font-bold text-melon-primary">Tahun 2024</span>
                <h4 className="font-heading font-bold text-lg text-melon-dark">Pembangunan Greenhouse Pertama</h4>
                <p className="text-xs text-melon-dark/70">Pemasangan infrastruktur hidroponik bambu & baja ringan serta instalasi irigasi otomatis.</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-melon-primary text-white font-bold flex items-center justify-center text-xs shrink-0 z-10">1</div>
              <div className="sm:w-1/2" />
            </div>

            <div className="relative flex items-center justify-between gap-8 flex-col sm:flex-row">
              <div className="sm:w-1/2" />
              <div className="w-8 h-8 rounded-full bg-melon-secondary text-white font-bold flex items-center justify-center text-xs shrink-0 z-10">2</div>
              <div className="sm:w-1/2 space-y-1">
                <span className="text-xs font-bold text-melon-secondary">Tahun 2025</span>
                <h4 className="font-heading font-bold text-lg text-melon-dark">Panen Perdana & Uji Coba Agrowisata</h4>
                <p className="text-xs text-melon-dark/70">Pengenalan varietas Inthanon RZ & Golden Emerald yang mendapat antusias luar biasa dari warga lokal.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between gap-8 flex-col sm:flex-row">
              <div className="sm:w-1/2 text-right space-y-1">
                <span className="text-xs font-bold text-melon-primary">Tahun 2026</span>
                <h4 className="font-heading font-bold text-lg text-melon-dark">Digitalisasi & Program KKN 2026</h4>
                <p className="text-xs text-melon-dark/70">Peluncuran website resmi reservasi online, pendampingan UMKM, dan perluasan saung edukasi.</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-melon-highlight text-amber-900 font-bold flex items-center justify-center text-xs shrink-0 z-10">3</div>
              <div className="sm:w-1/2" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Button */}
      <section className="text-center max-w-xl mx-auto px-4">
        <h3 className="font-heading text-2xl font-bold text-melon-dark mb-4">
          Ingin Memeras Sensasi Manisnya Melon Sidorejo?
        </h3>
        <Link href="/reservasi">
          <Button variant="primary" size="lg" icon={<CalendarCheck className="w-5 h-5" />}>
            Reservasi Kunjungan Sekarang
          </Button>
        </Link>
      </section>
    </div>
  );
}
