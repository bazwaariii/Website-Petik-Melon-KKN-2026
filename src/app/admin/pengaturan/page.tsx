'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, Sparkles } from 'lucide-react';
import { PengaturanSitus } from '@/lib/types';
import { getPengaturan, savePengaturan } from '@/lib/data-store';
import toast from 'react-hot-toast';

const DEFAULT_TEKS_MAP = {
  siap_petik: 'Kebun Sedang Musim Panen Melon Premium — Siap Dipetik!',
  segera_panen: 'Segera Panen — Slot Reservasi Kebun Sudah Dibuka!',
  masa_tanam: 'Kebun Dalam Masa Tanam & Perawatan Hydroponik',
};

export default function AdminPengaturanPage() {
  const [settings, setSettings] = useState<PengaturanSitus | null>(null);

  useEffect(() => {
    setSettings(getPengaturan());
  }, []);

  const handleStatusChange = (newStatus: 'siap_petik' | 'segera_panen' | 'masa_tanam') => {
    if (settings) {
      setSettings({
        ...settings,
        status_panen: newStatus,
        status_panen_teks: DEFAULT_TEKS_MAP[newStatus],
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (settings) {
      savePengaturan(settings);
      toast.success('Pengaturan situs berhasil disimpan & diperbarui!');
    }
  };

  if (!settings) return <div className="p-8 text-center text-xs text-slate-500">Memuat pengaturan...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-800">
          Pengaturan Umum Situs
        </h1>
        <p className="text-xs text-slate-500">
          Atur status panen kebun, teks banner hero, nomor kontak WA admin, jam operasional, dan alamat.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs">
        {/* Section 1: Status Panen */}
        <div className="space-y-4 pb-6 border-b border-slate-100">
          <h3 className="font-heading text-sm font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-melon-primary" />
            <span>Indikator Status Musim Panen Kebun</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-2 ${
                settings.status_panen === 'siap_petik'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-sm'
                  : 'border-slate-200 hover:border-emerald-300'
              }`}
            >
              <input
                type="radio"
                name="status_panen"
                value="siap_petik"
                checked={settings.status_panen === 'siap_petik'}
                onChange={() => handleStatusChange('siap_petik')}
              />
              <span>🟢 Siap Dipetik (Musim Panen)</span>
            </label>

            <label
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-2 ${
                settings.status_panen === 'segera_panen'
                  ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold shadow-sm'
                  : 'border-slate-200 hover:border-amber-300'
              }`}
            >
              <input
                type="radio"
                name="status_panen"
                value="segera_panen"
                checked={settings.status_panen === 'segera_panen'}
                onChange={() => handleStatusChange('segera_panen')}
              />
              <span>🟡 Segera Panen (Booking Slot)</span>
            </label>

            <label
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-2 ${
                settings.status_panen === 'masa_tanam'
                  ? 'border-blue-500 bg-blue-50 text-blue-900 font-bold shadow-sm'
                  : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              <input
                type="radio"
                name="status_panen"
                value="masa_tanam"
                checked={settings.status_panen === 'masa_tanam'}
                onChange={() => handleStatusChange('masa_tanam')}
              />
              <span>🔵 Masa Tanam & Perawatan</span>
            </label>
          </div>

          <div>
            <label className="font-bold block mb-1 text-slate-700">
              Teks Banner Status Panen (Akan Tampil di Halaman Utama Website)
            </label>
            <input
              type="text"
              required
              value={settings.status_panen_teks || ''}
              onChange={(e) => setSettings({ ...settings, status_panen_teks: e.target.value })}
              placeholder="Contoh: Kebun Dalam Masa Tanam & Perawatan Hydroponik"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-melon-primary"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Teks ini otomatis menyesuaikan saat Anda memilih radio button di atas, atau dapat Anda ketik kustom.
            </p>
          </div>
        </div>

        {/* Section 2: Contact Info */}
        <div className="space-y-4 pb-6 border-b border-slate-100">
          <h3 className="font-heading text-sm font-bold text-slate-800">
            Kontak & Informasi Operasional
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold block mb-1">Nomor WhatsApp Admin</label>
              <input
                type="text"
                value={settings.wa_admin}
                onChange={(e) => setSettings({ ...settings, wa_admin: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Username Instagram</label>
              <input
                type="text"
                value={settings.instagram}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold block mb-1">Jam Operasional</label>
            <input
              type="text"
              value={settings.jam_operasional}
              onChange={(e) => setSettings({ ...settings, jam_operasional: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold block mb-1">Alamat Lengkap Kebun</label>
            <textarea
              rows={2}
              value={settings.alamat}
              onChange={(e) => setSettings({ ...settings, alamat: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-6 py-3 bg-melon-primary text-white font-bold rounded-2xl shadow-md hover:bg-melon-600 transition-colors inline-flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan Pengaturan</span>
        </button>
      </form>
    </div>
  );
}
