import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, CheckCircle2, ArrowRight, ShoppingBag } from 'lucide-react';
import { PaketWisata, ProdukUMKM, ArtikelBlog } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';
import { Button } from './Button';
import { Badge } from './Badge';

interface PaketCardProps {
  paket: PaketWisata;
}

export const PaketCard: React.FC<PaketCardProps> = ({ paket }) => {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-melon-primary/20 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full">
      {/* Card Image */}
      <div className="relative h-56 w-full overflow-hidden bg-melon-200">
        <Image
          src={paket.foto_utama}
          alt={paket.nama}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <Badge variant="orange" className="bg-white/90 backdrop-blur-md font-bold">
            {formatRupiah(paket.harga)} / Orang
          </Badge>
        </div>
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
          <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-md">
            <Clock className="w-3.5 h-3.5 text-melon-highlight" />
            <span>{paket.durasi}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-md">
            <Users className="w-3.5 h-3.5 text-melon-accent" />
            <span>Min. {paket.min_orang} Orang</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-heading text-xl font-bold text-melon-dark mb-2 group-hover:text-melon-primary transition-colors">
            {paket.nama}
          </h3>
          <p className="text-sm text-melon-dark/70 line-clamp-2 leading-relaxed mb-4">
            {paket.deskripsi}
          </p>

          <div className="space-y-2 mb-6">
            <span className="text-xs font-bold text-melon-secondary uppercase tracking-wider block">
              Fasilitas Utama:
            </span>
            {paket.fasilitas.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-melon-dark/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-melon-secondary shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-melon-100 flex items-center justify-between gap-3">
          <Link href={`/paket/${paket.slug}`} className="w-full">
            <Button variant="primary" size="md" className="w-full justify-center">
              <span>Detail & Reservasi</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

interface ProdukCardProps {
  produk: ProdukUMKM;
}

export const ProdukCard: React.FC<ProdukCardProps> = ({ produk }) => {
  const waMessage = encodeURIComponent(`Halo Mirah Farm Sidorejo, saya tertarik membeli produk olahan: ${produk.nama} (${formatRupiah(produk.harga)}). Apakah stok masih ada?`);

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-melon-secondary/15 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
      <div className="relative h-48 w-full overflow-hidden bg-melon-100">
        <Image
          src={produk.foto}
          alt={produk.nama}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge variant={produk.stok_status === 'tersedia' ? 'green' : 'orange'}>
            {produk.stok_status === 'tersedia' ? 'Tersedia' : 'Pre-order'}
          </Badge>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-heading text-lg font-bold text-melon-dark mb-1 group-hover:text-melon-secondary transition-colors">
            {produk.nama}
          </h4>
          <p className="text-xs text-melon-dark/70 line-clamp-2 leading-relaxed mb-3">
            {produk.deskripsi}
          </p>
          <div className="text-base font-extrabold text-melon-primary mb-4">
            {formatRupiah(produk.harga)}
          </div>
        </div>

        <a
          href={`https://wa.me/6282253070639?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="whatsapp" size="sm" className="w-full justify-center">
            <ShoppingBag className="w-4 h-4" />
            <span>Beli via WhatsApp</span>
          </Button>
        </a>
      </div>
    </div>
  );
};

interface ArtikelCardProps {
  artikel: ArtikelBlog;
}

export const ArtikelCard: React.FC<ArtikelCardProps> = ({ artikel }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-melon-primary/15 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
      <div className="relative h-48 w-full overflow-hidden bg-melon-100">
        <Image
          src={artikel.cover}
          alt={artikel.judul}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="yellow" className="bg-white/90 font-medium text-[11px]">
            {artikel.published_at}
          </Badge>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-heading text-lg font-bold text-melon-dark mb-2 group-hover:text-melon-primary transition-colors line-clamp-2">
            {artikel.judul}
          </h4>
          <p className="text-xs text-melon-dark/70 line-clamp-3 leading-relaxed mb-4">
            {artikel.ringkasan}
          </p>
        </div>

        <div className="pt-3 border-t border-melon-100 flex items-center justify-between">
          <span className="text-[11px] font-medium text-melon-secondary">
            Oleh: {artikel.penulis}
          </span>
          <Link
            href={`/blog/${artikel.slug}`}
            className="text-xs font-bold text-melon-primary hover:underline flex items-center gap-1"
          >
            <span>Baca Selengkapnya</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
