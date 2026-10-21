'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Package, Plus, Trash2, Edit } from 'lucide-react';
import { PaketWisata } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';
import { getPaketList, savePaketList, deletePaket } from '@/lib/data-store';
import { uploadMedia } from '@/lib/supabase/storage';
import toast from 'react-hot-toast';

export default function AdminPaketPage() {
  const [paketList, setPaketList] = useState<PaketWisata[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingPaket, setEditingPaket] = useState<Partial<PaketWisata>>({
    nama: '',
    slug: '',
    deskripsi: '',
    harga: 50000,
    durasi: '2 Jam',
    min_orang: 1,
    fasilitas: ['Akses Greenhouse', 'Tester Buah'],
    foto_utama: '/assets/photo/IMG_5443.PNG',
    aktif: true,
  });

  useEffect(() => {
    setPaketList(getPaketList());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPaket.nama || !editingPaket.harga) {
      toast.error('Mohon isi nama paket dan harga.');
      return;
    }

    let newList: PaketWisata[];

    if (editingPaket.id) {
      // Edit existing
      newList = paketList.map((p) => (p.id === editingPaket.id ? ({ ...p, ...editingPaket } as PaketWisata) : p));
      toast.success('Paket wisata berhasil diperbarui!');
    } else {
      // Create new
      const newP: PaketWisata = {
        id: `paket-${Date.now()}`,
        slug: editingPaket.nama.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        nama: editingPaket.nama,
        deskripsi: editingPaket.deskripsi || '',
        harga: editingPaket.harga,
        durasi: editingPaket.durasi || '2 Jam',
        min_orang: editingPaket.min_orang || 1,
        fasilitas: editingPaket.fasilitas || ['Akses Greenhouse', 'Tester Melon Segar'],
        foto_utama: editingPaket.foto_utama || '/assets/photo/IMG_5443.PNG',
        galeri: [editingPaket.foto_utama || '/assets/photo/IMG_5443.PNG'],
        aktif: true,
        urutan: paketList.length + 1,
      };
      newList = [...paketList, newP];
      toast.success('Paket wisata baru ditambahkan!');
    }

    setPaketList(newList);
    savePaketList(newList);
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus paket ini?')) {
      deletePaket(id);
      setPaketList(getPaketList());
      toast.success('Paket berhasil dihapus.');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const mediaUrl = await uploadMedia(file);
        setEditingPaket({ ...editingPaket, foto_utama: mediaUrl });
        toast.success('Foto paket berhasil diproses!');
      } catch (err) {
        toast.error('Gagal memproses foto.');
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-800">
            Kelola Paket Wisata
          </h1>
          <p className="text-xs text-slate-500">
            Tambah, edit, atau hapus pilihan paket wisata petik melon.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingPaket({
              nama: '',
              slug: '',
              deskripsi: '',
              harga: 45000,
              durasi: '2 Jam',
              min_orang: 1,
              fasilitas: ['Akses Greenhouse', 'Tester Melon Segar'],
              foto_utama: '/assets/photo/IMG_5443.PNG',
              aktif: true,
            });
            setShowModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-melon-primary text-white text-xs font-bold rounded-xl shadow hover:bg-melon-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Paket Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paketList.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative h-44 w-full bg-slate-100">
                <Image src={p.foto_utama} alt={p.nama} fill className="object-cover" />
                <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-extrabold text-melon-primary">
                  {formatRupiah(p.harga)}
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-heading font-bold text-slate-800 text-lg">{p.nama}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{p.deskripsi}</p>
                <div className="text-[11px] text-emerald-700 font-semibold pt-1">
                  Durasi: {p.durasi} • Min {p.min_orang} Orang
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 flex items-center justify-end gap-2 bg-slate-50/50">
              <button
                onClick={() => {
                  setEditingPaket(p);
                  setShowModal(true);
                }}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs font-bold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Edit / Create */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-heading text-lg font-bold text-slate-800">
              {editingPaket.id ? 'Edit Paket Wisata' : 'Tambah Paket Wisata Baru'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Nama Paket</label>
                <input
                  type="text"
                  required
                  value={editingPaket.nama || ''}
                  onChange={(e) => setEditingPaket({ ...editingPaket, nama: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Harga (Rp per Orang)</label>
                <input
                  type="number"
                  required
                  value={editingPaket.harga || 0}
                  onChange={(e) => setEditingPaket({ ...editingPaket, harga: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Deskripsi Ringkas</label>
                <textarea
                  rows={3}
                  value={editingPaket.deskripsi || ''}
                  onChange={(e) => setEditingPaket({ ...editingPaket, deskripsi: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Upload / Ganti Foto Paket</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-melon-primary/10 file:text-melon-primary hover:file:bg-melon-primary/20 cursor-pointer disabled:opacity-50"
                />
                {uploading && <p className="text-[10px] text-melon-primary pt-1 animate-pulse">Mengunggah gambar...</p>}
                {editingPaket.foto_utama && !uploading && (
                  <div className="relative h-24 w-full rounded-xl overflow-hidden mt-2 border border-slate-200 bg-slate-100">
                    <Image src={editingPaket.foto_utama} alt="Preview Paket" fill className="object-cover" />
                  </div>
                )}
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
                  disabled={uploading}
                  className="px-4 py-2 bg-melon-primary text-white rounded-xl font-bold disabled:opacity-50"
                >
                  Simpan Paket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
