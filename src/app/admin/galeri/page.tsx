'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Image as ImageIcon, Plus, Trash2, Edit, Play } from 'lucide-react';
import { GaleriItem } from '@/lib/types';
import { getGaleriList, saveGaleriList, deleteGaleri } from '@/lib/data-store';
import { uploadMedia } from '@/lib/supabase/storage';
import toast from 'react-hot-toast';

export default function AdminGaleriPage() {
  const [items, setItems] = useState<GaleriItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<GaleriItem>>({
    judul: '',
    kategori: 'pengunjung',
    tipe: 'foto',
    url: '/assets/photo/IMG_5443.PNG',
  });

  useEffect(() => {
    setItems(getGaleriList());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.judul?.trim()) {
      toast.error('Mohon isi judul galeri.');
      return;
    }

    let newList: GaleriItem[];

    if (editingItem.id) {
      // Edit existing
      newList = items.map((i) => (i.id === editingItem.id ? ({ ...i, ...editingItem } as GaleriItem) : i));
      toast.success('Media galeri berhasil diperbarui!');
    } else {
      // Create new
      const newItem: GaleriItem = {
        id: `gal-${Date.now()}`,
        judul: editingItem.judul,
        tipe: editingItem.tipe || 'foto',
        url: editingItem.url || '/assets/photo/IMG_5443.PNG',
        kategori: editingItem.kategori || 'pengunjung',
        urutan: items.length + 1,
      };
      newList = [newItem, ...items];
      toast.success('Media galeri baru berhasil ditambahkan!');
    }

    setItems(newList);
    saveGaleriList(newList);
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin hapus media dari galeri?')) {
      deleteGaleri(id);
      setItems(getGaleriList());
      toast.success('Media berhasil dihapus.');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const isVid = file.type.startsWith('video/');
        const mediaUrl = await uploadMedia(file);
        setEditingItem({
          ...editingItem,
          tipe: isVid ? 'video' : 'foto',
          url: mediaUrl,
        });
        toast.success('File media berhasil diproses!');
      } catch (err) {
        toast.error('Gagal memproses media.');
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
            Kelola Galeri Foto & Video (CRUD)
          </h1>
          <p className="text-xs text-slate-500">
            Tambah, edit judul/kategori/foto, atau hapus dokumentasi media kebun Mirah Farm.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingItem({
              judul: '',
              kategori: 'pengunjung',
              tipe: 'foto',
              url: '/assets/photo/IMG_5443.PNG',
            });
            setShowModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-melon-primary text-white text-xs font-bold rounded-xl shadow hover:bg-melon-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Media Galeri</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative group flex flex-col justify-between">
            <div>
              <div className="relative h-44 w-full bg-slate-100">
                {item.tipe === 'foto' ? (
                  <Image src={item.url} alt={item.judul} fill className="object-cover" />
                ) : (
                  <video src={item.url} className="w-full h-full object-cover" />
                )}
                {item.tipe === 'video' && (
                  <div className="absolute top-2 right-2 bg-melon-primary text-white p-1.5 rounded-full">
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                )}
              </div>

              <div className="p-3">
                <span className="text-[10px] uppercase font-bold text-melon-primary block">
                  {item.kategori}
                </span>
                <h4 className="font-bold text-xs text-slate-800 line-clamp-1">
                  {item.judul}
                </h4>
              </div>
            </div>

            <div className="p-3 border-t border-slate-100 flex items-center justify-end gap-1.5 bg-slate-50/50">
              <button
                onClick={() => {
                  setEditingItem(item);
                  setShowModal(true);
                }}
                className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1"
              >
                <Edit className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-2.5 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-xs font-bold flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Create & Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-heading text-lg font-bold text-slate-800">
              {editingItem.id ? 'Edit Media Galeri' : 'Tambah Media Galeri Baru'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Judul Foto / Video</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kunjungan Edukasi Tani"
                  value={editingItem.judul || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, judul: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Kategori</label>
                <select
                  value={editingItem.kategori || 'pengunjung'}
                  onChange={(e) => setEditingItem({ ...editingItem, kategori: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                >
                  <option value="pengunjung">Kunjungan Wisatawan</option>
                  <option value="kebun">Suasana Kebun</option>
                  <option value="kegiatan">Kegiatan & Edukasi</option>
                  <option value="produk">Produk & Panen</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Upload / Ganti File Media</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-melon-primary/10 file:text-melon-primary hover:file:bg-melon-primary/20 cursor-pointer disabled:opacity-50"
                />
                {uploading && <p className="text-[10px] text-melon-primary pt-1 animate-pulse">Mengunggah file...</p>}
                {editingItem.url && !uploading && (
                  <div className="relative h-24 w-full rounded-xl overflow-hidden mt-2 border border-slate-200 bg-slate-100">
                    {editingItem.tipe === 'foto' ? (
                      <Image src={editingItem.url} alt="Preview Galeri" fill className="object-cover" />
                    ) : (
                      <video src={editingItem.url} className="w-full h-full object-cover" />
                    )}
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
                  Simpan Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
