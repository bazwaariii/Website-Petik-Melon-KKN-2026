'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Maximize2, X } from 'lucide-react';
import { GaleriItem } from '@/lib/types';

interface GalleryMasonryProps {
  items: GaleriItem[];
}

export const GalleryMasonry: React.FC<GalleryMasonryProps> = ({ items }) => {
  const [activeCategory, setActiveCategory] = useState<string>('semua');
  const [selectedMedia, setSelectedMedia] = useState<GaleriItem | null>(null);

  const categories = [
    { id: 'semua', label: 'Semua Galeri' },
    { id: 'pengunjung', label: 'Kunjungan Wisatawan' },
    { id: 'kebun', label: 'Suasana Kebun' },
    { id: 'kegiatan', label: 'Kegiatan & Edukasi' },
    { id: 'produk', label: 'Produk & Panen' },
  ];

  const filteredItems = activeCategory === 'semua'
    ? items
    : items.filter((item) => item.kategori === activeCategory);

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeCategory === cat.id
                ? 'bg-melon-primary text-white shadow-md scale-105'
                : 'bg-white/80 text-melon-dark/80 hover:bg-melon-accent/40 border border-melon-primary/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedMedia(item)}
            className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer border border-melon-primary/20 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-melon-100"
          >
            {item.tipe === 'foto' ? (
              <Image
                src={item.url}
                alt={item.judul}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <video
                src={item.url}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
              />
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            {/* Video Play Badge */}
            {item.tipe === 'video' && (
              <div className="absolute top-4 right-4 bg-melon-primary/90 text-white p-2.5 rounded-full shadow-lg backdrop-blur-md animate-pulse">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
            )}

            {/* Title & Zoom Icon */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-melon-highlight block mb-0.5">
                  {item.kategori}
                </span>
                <h4 className="font-heading text-sm font-bold line-clamp-1">
                  {item.judul}
                </h4>
              </div>
              <div className="p-2 bg-white/20 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Zoom Preview */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50"
            aria-label="Close Preview"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
            {selectedMedia.tipe === 'foto' ? (
              <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden">
                <Image
                  src={selectedMedia.url}
                  alt={selectedMedia.judul}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <video
                src={selectedMedia.url}
                controls
                autoPlay
                className="max-h-[70vh] w-auto rounded-2xl shadow-2xl"
              />
            )}
            <div className="mt-4 text-center text-white">
              <h3 className="font-heading text-xl font-bold">{selectedMedia.judul}</h3>
              <span className="text-xs text-melon-accent uppercase tracking-widest mt-1 block">
                {selectedMedia.kategori} — Mirah Farm Sidorejo
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
