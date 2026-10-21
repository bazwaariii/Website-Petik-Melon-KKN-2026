'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingBag, Plus, Trash2, Edit } from 'lucide-react';
import { ProdukUMKM } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';
import { getProdukList, saveProdukList, deleteProduk } from '@/lib/data-store';
import { uploadMedia } from '@/lib/supabase/storage';
import toast from 'react-hot-toast';

export default function AdminProdukPage() {
  const [produkList, setProdukList] = useState<ProdukUMKM[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingProduk, setEditingProduk] = useState<Partial<ProdukUMKM>>({
    nama: '',
    harga: 15000,
    deskripsi: '',
    foto: '/assets/photo/IMG_5459.PNG',
    kontak_wa: '+6282253070639',
    aktif: true,
    stok_status: 'tersedia',
  });

  useEffect(() => {
    setProdukList(getProdukList());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduk.nama?.trim()) {
      toast.error('Isi nama produk.');
      return;
    }

    let newList: ProdukUMKM[];

    if (editingProduk.id) {
      // Edit existing
      newList = produkList.map((p) => (p.id === editingProduk.id ? ({ ...p, ...editingProduk } as ProdukUMKM) : p));
      toast.success('Produk UMKM berhasil diperbarui!');
    } else {
      // Create new
      const newP: ProdukUMKM = {
        id: `prod-${Date.now()}`,
        nama: editingProduk.nama,
        deskripsi: editingProduk.deskripsi || '',
        harga: editingProduk.harga || 15000,
        foto: editingProduk.foto || '/assets/photo/IMG_5459.PNG',
        kontak_wa: editingProduk.kontak_wa || '+6282253070639',
        aktif: true,
        stok_status: editingProduk.stok_status || 'tersedia',
      };
      newList = [newP, ...produkList];
      toast.success('Produk UMKM baru berhasil ditambahkan!');
    }

    setProdukList(newList);
    saveProdukList(newList);
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus produk ini?')) {
      deleteProduk(id);
      setProdukList(getProdukList());
      toast.success('Produk berhasil dihapus.');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const mediaUrl = await uploadMedia(file);
        setEditingProduk({ ...editingProduk, foto: mediaUrl });
        toast.success('Foto produk berhasil diproses!');
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
            Kelola Produk UMKM Olahan Melon (CRUD)
          </h1>
          <p className="text-xs text-slate-500">
            Tambah, edit nama/harga/foto/status stok, atau hapus produk olahan.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProduk({
              nama: '',
              harga: 15000,
              deskripsi: '',
              foto: '/assets/photo/IMG_5459.PNG',
              kontak_wa: '+6282253070639',
              aktif: true,
              stok_status: 'tersedia',
            });
            setShowModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-melon-primary text-white text-xs font-bold rounded-xl shadow hover:bg-melon-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Produk Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {produkList.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative h-40 w-full bg-slate-100">
                <Image src={p.foto} alt={p.nama} fill className="object-cover" />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    p.stok_status === 'tersedia' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {p.stok_status === 'tersedia' ? 'Tersedia' : 'Pre-order'}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-heading font-bold text-slate-800 text-sm">{p.nama}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{p.deskripsi}</p>
                <div className="text-sm font-extrabold text-melon-primary pt-1">
                  {formatRupiah(p.harga)}
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-slate-100 flex items-center justify-end gap-1.5 bg-slate-50/50">
              <button
                onClick={() => {
                  setEditingProduk(p);
                  setShowModal(true);
                }}
                className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1"
              >
                <Edit className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="px-2.5 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-xs font-bold flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
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
              {editingProduk.id ? 'Edit Produk Olahan' : 'Tambah Produk Olahan Baru'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Nama Produk</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Dodol Melon Sidorejo"
                  value={editingProduk.nama || ''}
                  onChange={(e) => setEditingProduk({ ...editingProduk, nama: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Harga (Rp)</label>
                <input
                  type="number"
                  required
                  value={editingProduk.harga || 0}
                  onChange={(e) => setEditingProduk({ ...editingProduk, harga: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Status Stok</label>
                <select
                  value={editingProduk.stok_status || 'tersedia'}
                  onChange={(e) => setEditingProduk({ ...editingProduk, stok_status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                >
                  <option value="tersedia">Tersedia</option>
                  <option value="preorder">Pre-order</option>
                  <option value="habis">Habis</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Deskripsi Produk</label>
                <textarea
                  rows={2}
                  value={editingProduk.deskripsi || ''}
                  onChange={(e) => setEditingProduk({ ...editingProduk, deskripsi: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Upload / Ganti Foto Produk</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-melon-primary/10 file:text-melon-primary hover:file:bg-melon-primary/20 cursor-pointer disabled:opacity-50"
                />
                {uploading && <p className="text-[10px] text-melon-primary pt-1 animate-pulse">Mengunggah gambar...</p>}
                {editingProduk.foto && !uploading && (
                  <div className="relative h-24 w-full rounded-xl overflow-hidden mt-2 border border-slate-200 bg-slate-100">
                    <Image src={editingProduk.foto} alt="Preview Produk" fill className="object-cover" />
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
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
