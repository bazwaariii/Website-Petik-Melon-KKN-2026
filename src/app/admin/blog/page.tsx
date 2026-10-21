'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FileText, Plus, Trash2, Edit } from 'lucide-react';
import { ArtikelBlog } from '@/lib/types';
import { getArtikelList, saveArtikelList, deleteArtikel } from '@/lib/data-store';
import { uploadMedia } from '@/lib/supabase/storage';
import toast from 'react-hot-toast';

export default function AdminBlogPage() {
  const [articles, setArticles] = useState<ArtikelBlog[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingArt, setEditingArt] = useState<Partial<ArtikelBlog>>({
    judul: '',
    ringkasan: '',
    konten: '',
    cover: '/assets/photo/IMG_5457.PNG',
    penulis: 'Admin Mirah Farm',
    terbit: true,
  });

  useEffect(() => {
    setArticles(getArtikelList());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArt.judul?.trim()) {
      toast.error('Isi judul artikel.');
      return;
    }

    let newList: ArtikelBlog[];

    if (editingArt.id) {
      // Edit existing
      newList = articles.map((a) => (a.id === editingArt.id ? ({ ...a, ...editingArt } as ArtikelBlog) : a));
      toast.success('Artikel edukasi berhasil diperbarui!');
    } else {
      // Create new
      const newArt: ArtikelBlog = {
        id: `art-${Date.now()}`,
        slug: editingArt.judul.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        judul: editingArt.judul,
        ringkasan: editingArt.ringkasan || '',
        konten: editingArt.konten || `<p>${editingArt.ringkasan}</p>`,
        cover: editingArt.cover || '/assets/photo/IMG_5457.PNG',
        penulis: editingArt.penulis || 'Admin Mirah Farm',
        terbit: editingArt.terbit ?? true,
        published_at: new Date().toISOString().split('T')[0],
      };
      newList = [newArt, ...articles];
      toast.success('Artikel edukasi baru dipublikasikan!');
    }

    setArticles(newList);
    saveArtikelList(newList);
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus artikel ini?')) {
      deleteArtikel(id);
      setArticles(getArtikelList());
      toast.success('Artikel berhasil dihapus.');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const mediaUrl = await uploadMedia(file);
        setEditingArt({ ...editingArt, cover: mediaUrl });
        toast.success('Foto cover artikel berhasil diproses!');
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
            Kelola Artikel & Blog Edukasi (CRUD)
          </h1>
          <p className="text-xs text-slate-500">
            Tulis, edit judul/ringkasan/konten/cover, atau hapus artikel edukasi tani.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingArt({
              judul: '',
              ringkasan: '',
              konten: '',
              cover: '/assets/photo/IMG_5457.PNG',
              penulis: 'Admin Mirah Farm',
              terbit: true,
            });
            setShowModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-melon-primary text-white text-xs font-bold rounded-xl shadow hover:bg-melon-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Artikel Baru</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="p-3.5">Cover & Judul Artikel</th>
                <th className="p-3.5">Penulis</th>
                <th className="p-3.5">Tanggal Terbit</th>
                <th className="p-3.5 text-right">Aksi CRUD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-slate-50/80">
                  <td className="p-3.5 flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                      <Image src={art.cover} alt={art.judul} fill className="object-cover" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 line-clamp-1">{art.judul}</span>
                      <span className="text-slate-500 line-clamp-1">{art.ringkasan}</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-600">{art.penulis}</td>
                  <td className="p-3.5 text-slate-600">{art.published_at}</td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingArt(art);
                        setShowModal(true);
                      }}
                      className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold inline-flex items-center gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(art.id)}
                      className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-xs font-bold inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Hapus</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Edit & Create Artikel */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="font-heading text-lg font-bold text-slate-800">
              {editingArt.id ? 'Edit Artikel Edukasi' : 'Tulis Artikel Edukasi Baru'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Judul Artikel</label>
                <input
                  type="text"
                  required
                  placeholder="Judul artikel..."
                  value={editingArt.judul || ''}
                  onChange={(e) => setEditingArt({ ...editingArt, judul: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Ringkasan Singkat</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ringkasan 2 kalimat..."
                  value={editingArt.ringkasan || ''}
                  onChange={(e) => setEditingArt({ ...editingArt, ringkasan: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Isi Konten Artikel (Teks / HTML)</label>
                <textarea
                  rows={4}
                  placeholder="Tulis konten lengkap artikel di sini..."
                  value={editingArt.konten || ''}
                  onChange={(e) => setEditingArt({ ...editingArt, konten: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none resize-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Upload / Ganti Foto Cover Artikel</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-melon-primary/10 file:text-melon-primary hover:file:bg-melon-primary/20 cursor-pointer disabled:opacity-50"
                />
                {uploading && <p className="text-[10px] text-melon-primary pt-1 animate-pulse">Mengunggah gambar...</p>}
                {editingArt.cover && !uploading && (
                  <div className="relative h-24 w-full rounded-xl overflow-hidden mt-2 border border-slate-200 bg-slate-100">
                    <Image src={editingArt.cover} alt="Preview Cover" fill className="object-cover" />
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
                  Simpan Artikel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
