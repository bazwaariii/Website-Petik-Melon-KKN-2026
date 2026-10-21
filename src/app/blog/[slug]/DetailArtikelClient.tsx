'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { ArtikelBlog } from '@/lib/types';
import { getArtikelList } from '@/lib/data-store';

export default function DetailArtikelClient({ slug }: { slug: string }) {
  const [artikel, setArtikel] = useState<ArtikelBlog | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const list = getArtikelList();
    const found = list.find((a) => a.slug === slug);
    if (found) {
      setArtikel(found);
    }
    setLoaded(true);
  }, [slug]);

  if (loaded && !artikel) {
    notFound();
  }

  if (!artikel) return <div className="pt-28 pb-16 text-center text-xs text-slate-500">Memuat artikel...</div>;

  return (
    <div className="pt-28 pb-16 space-y-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-melon-secondary hover:text-melon-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Artikel</span>
        </Link>

        <article className="space-y-6">
          <div className="space-y-3">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-melon-dark leading-tight">
              {artikel.judul}
            </h1>

            <div className="flex items-center gap-4 text-xs text-melon-dark/60 font-semibold border-b border-melon-primary/10 pb-4">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-melon-secondary" />
                <span>{artikel.penulis}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-melon-primary" />
                <span>{artikel.published_at}</span>
              </div>
            </div>
          </div>

          <div className="relative h-80 sm:h-[420px] w-full rounded-3xl overflow-hidden border border-melon-primary/20 shadow-lg bg-melon-100">
            <Image
              src={artikel.cover}
              alt={artikel.judul}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div
            className="prose prose-melon max-w-none text-sm sm:text-base text-melon-dark/90 leading-relaxed space-y-4 pt-4"
            dangerouslySetInnerHTML={{ __html: artikel.konten }}
          />
        </article>
      </div>
    </div>
  );
}
