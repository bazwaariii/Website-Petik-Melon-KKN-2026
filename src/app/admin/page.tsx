'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  Package,
  FileText,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
} from 'lucide-react';
import { PAKET_WISATA_DEFAULT, ARTIKEL_DEFAULT, PENGATURAN_DEFAULT } from '@/lib/constants';
import { createWhatsAppLink } from '@/lib/utils';
import { Reservasi } from '@/lib/types';

export default function AdminDashboardPage() {
  const [reservations, setReservations] = useState<Reservasi[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mirah_reservations');
    if (saved) {
      setReservations(JSON.parse(saved));
    } else {
      const mock: Reservasi[] = [
        {
          id: 'res-101',
          nama: 'Bunda Rina Setyowati',
          no_hp: '081234567890',
          tanggal: '2026-07-25',
          jumlah_orang: 4,
          paket_id: '1',
          catatan: 'Datang pagi jam 09.00 WIB',
          status: 'baru',
          created_at: '2026-07-22T10:00:00Z',
        },
        {
          id: 'res-102',
          nama: 'Instansi Dinas Pertanian',
          no_hp: '082198765432',
          tanggal: '2026-07-28',
          jumlah_orang: 15,
          paket_id: '2',
          catatan: 'Kunjungan rombongan & welcome drink',
          status: 'dikonfirmasi',
          created_at: '2026-07-21T14:30:00Z',
        },
      ];
      setReservations(mock);
    }
  }, []);

  const totalReservasiBaru = reservations.filter((r) => r.status === 'baru').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-800">
            Dashboard Pengelola
          </h1>
          <p className="text-xs text-slate-500">
            Ringkasan statistik dan aktivitas terbaru Wisata Petik Melon Mirah Farm.
          </p>
        </div>

        <Link
          href="/admin/reservasi"
          className="inline-flex items-center gap-2 px-4 py-2 bg-melon-primary text-white text-xs font-bold rounded-xl shadow-sm hover:bg-melon-600 transition-colors self-start"
        >
          <span>Kelola Semua Reservasi</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Reservasi Baru</span>
            <div className="p-2 bg-amber-500/10 text-amber-600 rounded-xl">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="font-heading text-3xl font-extrabold text-slate-800">
            {totalReservasiBaru}
          </div>
          <span className="text-[11px] text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-full inline-block">
            Perlu konfirmasi admin
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Paket Aktif</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="font-heading text-3xl font-extrabold text-slate-800">
            {PAKET_WISATA_DEFAULT.length}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
            Siap dipesan pengunjung
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Artikel Blog</span>
            <div className="p-2 bg-blue-500/10 text-blue-600 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="font-heading text-3xl font-extrabold text-slate-800">
            {ARTIKEL_DEFAULT.length}
          </div>
          <span className="text-[11px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full inline-block">
            Terpublikasi di situs
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Status Kebun</span>
            <div className="p-2 bg-melon-primary/10 text-melon-primary rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="font-heading text-lg font-bold text-emerald-700 leading-snug">
            🟢 Siap Petik
          </div>
          <span className="text-[11px] text-slate-500 font-medium block truncate">
            {PENGATURAN_DEFAULT.jam_operasional}
          </span>
        </div>
      </div>

      {/* Recent Reservations Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-slate-800">
            Reservasi Terbaru Membutuhkan Tindakan
          </h2>
          <span className="text-xs text-slate-500">Total {reservations.length} data</span>
        </div>

        {reservations.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            Belum ada data reservasi masuk.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-200">
                <tr>
                  <th className="p-3">Nama Pemesan</th>
                  <th className="p-3">No. WhatsApp</th>
                  <th className="p-3">Tgl Kunjungan</th>
                  <th className="p-3">Jumlah</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Aksi WA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reservations.slice(0, 5).map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80">
                    <td className="p-3 font-semibold text-slate-800">{r.nama}</td>
                    <td className="p-3 text-slate-600">{r.no_hp}</td>
                    <td className="p-3 font-medium text-slate-700">{r.tanggal}</td>
                    <td className="p-3 text-slate-600">{r.jumlah_orang} Orang</td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          r.status === 'baru'
                            ? 'bg-amber-100 text-amber-800'
                            : r.status === 'dikonfirmasi'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {r.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <a
                        href={createWhatsAppLink(
                          r.no_hp,
                          `Halo Kak ${r.nama}, mengenai reservasi petik melon tanggal ${r.tanggal}...`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white rounded-lg font-bold text-[11px] hover:bg-emerald-700"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat WA</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
