'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquareQuote, Check, X, Star, Plus, Edit, Trash2 } from 'lucide-react';
import { Testimoni } from '@/lib/types';
import { getTestimoniList, saveTestimoniList, deleteTestimoni } from '@/lib/data-store';
import toast from 'react-hot-toast';

export default function AdminTestimoniPage() {
  const [list, setList] = useState<Testimoni[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Testimoni>>({
    nama: '',
    asal: 'Wisatawan',
    pesan: '',
    rating: 5,
    disetujui: true,
  });

  useEffect(() => {
    setList(getTestimoniList());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.nama?.trim() || !editingItem.pesan?.trim()) {
      toast.error('Lengkapi nama dan ulasan testimoni.');
      return;
    }

    let updated: Testimoni[];

    if (editingItem.id) {
      // Edit existing
      updated = list.map((t) => (t.id === editingItem.id ? ({ ...t, ...editingItem } as Testimoni) : t));
      toast.success('Testimoni berhasil diperbarui!');
    } else {
      // Create new
      const newItem: Testimoni = {
        id: `testi-${Date.now()}`,
        nama: editingItem.nama,
        asal: editingItem.asal || 'Wisatawan',
        pesan: editingItem.pesan,
        rating: editingItem.rating || 5,
        disetujui: editingItem.disetujui ?? true,
        created_at: new Date().toISOString(),
      };
      updated = [newItem, ...list];
      toast.success('Testimoni baru berhasil ditambahkan!');
    }

    setList(updated);
    saveTestimoniList(updated);
    setShowModal(false);
  };

  const toggleApproval = (id: string) => {
    const updated = list.map((t) => (t.id === id ? { ...t, disetujui: !t.disetujui } : t));
    setList(updated);
    saveTestimoniList(updated);
    toast.success('Status testimoni berhasil diperbarui.');
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus testimoni ini?')) {
      deleteTestimoni(id);
      setList(getTestimoniList());
      toast.success('Testimoni berhasil dihapus.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-800">
            Kelola & Moderasi Testimoni Pengunjung (CRUD)
          </h1>
          <p className="text-xs text-slate-500">
            Tambah testimoni manual, edit ulasan, atur persetujuan tampil, atau hapus ulasan.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingItem({
              nama: '',
              asal: 'Wisatawan Bojonegoro',
              pesan: '',
              rating: 5,
              disetujui: true,
            });
            setShowModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-melon-primary text-white text-xs font-bold rounded-xl shadow hover:bg-melon-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Testimoni</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="p-3.5">Nama & Asal</th>
                <th className="p-3.5">Ulasan / Pesan</th>
                <th className="p-3.5">Rating</th>
                <th className="p-3.5">Status Moderasi</th>
                <th className="p-3.5 text-right">Aksi CRUD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80">
                  <td className="p-3.5">
                    <span className="font-bold text-slate-800 block">{t.nama}</span>
                    <span className="text-slate-500">{t.asal}</span>
                  </td>
                  <td className="p-3.5 text-slate-700 max-w-sm italic">&ldquo;{t.pesan}&rdquo;</td>
                  <td className="p-3.5">
                    <div className="flex items-center text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current mr-1" />
                      <span>{t.rating}/5</span>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        t.disetujui ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {t.disetujui ? 'DISATUJUI (TAMPIL)' : 'MENUNGGU MODERASI'}
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-1.5">
                    <button
                      onClick={() => toggleApproval(t.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        t.disetujui
                          ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {t.disetujui ? 'Sembunyikan' : 'Setujui Tampil'}
                    </button>
                    <button
                      onClick={() => {
                        setEditingItem(t);
                        setShowModal(true);
                      }}
                      className="px-2 py-1 bg-slate-200 text-slate-700 hover:bg-slate-300 rounded-lg text-xs font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-bold hover:bg-red-200"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Edit / Create Testimoni */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-heading text-lg font-bold text-slate-800">
              {editingItem.id ? 'Edit Testimoni' : 'Tambah Testimoni Pengunjung'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Nama Pengunjung</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pak Supriyanto"
                  value={editingItem.nama || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, nama: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Kota / Instansi / Asal</label>
                <input
                  type="text"
                  placeholder="Contoh: Wisatawan Cepu / Bojonegoro"
                  value={editingItem.asal || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, asal: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Rating Bintang (1-5)</label>
                <select
                  value={editingItem.rating || 5}
                  onChange={(e) => setEditingItem({ ...editingItem, rating: parseInt(e.target.value) || 5 })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 / 5)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 / 5)</option>
                  <option value={3}>⭐⭐⭐ (3 / 5)</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Ulasan / Pesan Testimoni</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tulis ulasan pengunjung..."
                  value={editingItem.pesan || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, pesan: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="disetujuiCheck"
                  checked={editingItem.disetujui ?? true}
                  onChange={(e) => setEditingItem({ ...editingItem, disetujui: e.target.checked })}
                />
                <label htmlFor="disetujuiCheck" className="font-bold text-slate-700">
                  Langsung Tampilkan di Website Publik
                </label>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-melon-primary text-white rounded-xl font-bold"
                >
                  Simpan Testimoni
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
