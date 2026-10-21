'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, CheckCircle2, Image as ImageIcon, Sparkles, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export const QuickPhotoUploader = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('File harus berupa gambar (JPG/PNG/WebP).');
        return;
      }
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreviewUrl(result);
        setSelectedImage(result);
        setIsUploading(false);
        toast.success('Foto berhasil dimuat! Siap diperbarui.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSetHeroBackground = () => {
    if (!previewUrl) {
      toast.error('Pilih atau upload foto terlebih dahulu.');
      return;
    }
    localStorage.setItem('custom_hero_bg', previewUrl);
    toast.success('Foto latar belakang Hero Beranda berhasil diupdate!');
  };

  const handleAddToGallery = () => {
    if (!previewUrl) {
      toast.error('Pilih atau upload foto terlebih dahulu.');
      return;
    }
    const newMedia = {
      id: `gal-custom-${Date.now()}`,
      judul: 'Foto Upload Pengelola Kebun',
      tipe: 'foto',
      url: previewUrl,
      kategori: 'kebun',
      urutan: 1,
    };
    const saved = JSON.parse(localStorage.getItem('mirah_custom_gallery') || '[]');
    localStorage.setItem('mirah_custom_gallery', JSON.stringify([newMedia, ...saved]));
    toast.success('Foto baru berhasil ditambahkan ke Galeri!');
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-melon-primary/10 text-melon-primary rounded-xl">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-sm font-bold text-slate-800">
              Upload & Update Foto Cepat
            </h3>
            <p className="text-[11px] text-slate-500">
              Upload foto dari perangkat Anda untuk langsung dipakai di website.
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
          Fitur Media Admin
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Upload Box */}
        <div className="md:col-span-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-melon-primary/30 hover:border-melon-primary bg-melon-bg/30 hover:bg-melon-accent/10 rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-2 min-h-[160px]"
          >
            <div className="w-12 h-12 rounded-full bg-melon-primary/15 text-melon-primary flex items-center justify-center">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-slate-700">
              Klik di sini untuk upload foto baru
            </div>
            <p className="text-[11px] text-slate-400">
              Format PNG, JPG, WebP (Maks. 10MB)
            </p>
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="md:col-span-6 space-y-3">
          <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>Preview Foto:</span>
            {previewUrl && (
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Foto Siap</span>
              </span>
            )}
          </div>

          <div className="relative h-36 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Preview Upload"
                fill
                className="object-cover"
              />
            ) : (
              <div className="text-center p-4 text-slate-400 text-xs">
                Belum ada foto dipilih.
              </div>
            )}
          </div>

          {previewUrl && (
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={handleSetHeroBackground}
                className="flex-1 px-3 py-2 bg-melon-primary hover:bg-melon-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Jadikan Background Hero</span>
              </button>
              <button
                onClick={handleAddToGallery}
                className="flex-1 px-3 py-2 bg-melon-secondary hover:bg-melon-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Tambah ke Galeri</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
