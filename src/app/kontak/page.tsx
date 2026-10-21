'use client';

import React, { useState, useEffect } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MapPin, Phone, Instagram, ExternalLink, Clock } from 'lucide-react';
import { PengaturanSitus } from '@/lib/types';
import { getPengaturan } from '@/lib/data-store';

export default function KontakPage() {
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
    alamat: 'Jl. Bengawan Mbenang, Dusun Mbenang, Sidorejo, Kec. Padangan, Kabupaten Bojonegoro, Jawa Timur 62162',
    jam_operasional: 'Senin - Minggu: 07.30 - 17.00 WIB',
    wa_admin: '+6282253070639',
    instagram: 'mirah_farm',
    maps_embed: 'https://maps.google.com/maps?q=Mirah%20Farm%20Desa%20Sidorejo%20Padangan%20Bojonegoro&t=&z=16&ie=UTF8&iwloc=&output=embed',
  };

  return (
    <div className="pt-28 pb-16 space-y-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="font-hand text-2xl text-melon-primary font-bold">
          📍 Hubungi & Kunjungi Kami
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-melon-dark">
          Kontak & Lokasi Kebun
        </h1>
        <p className="text-base text-melon-dark/70 max-w-2xl mx-auto leading-relaxed">
          Tim pengelola Mirah Farm siap membantu merencanakan kunjungan Anda. Silakan hubungi via WhatsApp atau kunjungi kebun kami langsung.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Info Card */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-melon-primary/20 shadow-xl space-y-6">
            <h3 className="font-heading text-2xl font-bold text-melon-dark border-b border-melon-100 pb-4">
              Informasi Alamat & Medsos
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-melon-primary shrink-0 mt-1" />
                <div>
                  <span className="font-bold block text-melon-dark">Alamat Lengkap Kebun:</span>
                  <p className="text-melon-dark/80 leading-relaxed">{data.alamat}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-melon-secondary shrink-0" />
                <div>
                  <span className="font-bold block text-melon-dark">Jam Operasional:</span>
                  <p className="text-melon-dark/80">{data.jam_operasional}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold block text-melon-dark">WhatsApp Fast Response:</span>
                  <a
                    href={`https://wa.me/6282253070639?text=${encodeURIComponent('Halo Admin Mirah Farm, saya ingin tanya info kunjungan.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-bold hover:underline"
                  >
                    {data.wa_admin}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-pink-600 shrink-0" />
                <div>
                  <span className="font-bold block text-melon-dark">Instagram Resmi:</span>
                  <a
                    href={`https://instagram.com/${data.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-700 font-bold hover:underline"
                  >
                    @{data.instagram}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-melon-100">
              <a
                href="https://maps.app.goo.gl/Vh3mkRcQXusJzWEcA?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-melon-primary text-white font-bold text-sm rounded-2xl shadow-md hover:bg-melon-600 transition-all"
              >
                <span>Buka Rute di Google Maps App</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Embedded Google Maps */}
          <div className="lg:col-span-7 h-[450px] rounded-3xl overflow-hidden border-2 border-melon-primary/20 shadow-xl relative bg-melon-200">
            <iframe
              src={data.maps_embed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Peta Kebun Mirah Farm Sidorejo"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
