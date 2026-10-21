'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, Plus, Trash2, Edit } from 'lucide-react';
import { FAQItem } from '@/lib/types';
import { getFAQList, saveFAQList, deleteFAQ } from '@/lib/data-store';
import toast from 'react-hot-toast';

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Partial<FAQItem>>({
    pertanyaan: '',
    jawaban: '',
  });

  useEffect(() => {
    setFaqs(getFAQList());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq.pertanyaan?.trim() || !editingFaq.jawaban?.trim()) {
      toast.error('Lengkapi pertanyaan dan jawaban.');
      return;
    }

    let newList: FAQItem[];

    if (editingFaq.id) {
      // Edit existing
      newList = faqs.map((f) => (f.id === editingFaq.id ? ({ ...f, ...editingFaq } as FAQItem) : f));
      toast.success('FAQ berhasil diperbarui!');
    } else {
      // Create new
      const newFaq: FAQItem = {
        id: `faq-${Date.now()}`,
        pertanyaan: editingFaq.pertanyaan,
        jawaban: editingFaq.jawaban,
        urutan: faqs.length + 1,
      };
      newList = [...faqs, newFaq];
      toast.success('FAQ baru berhasil ditambahkan!');
    }

    setFaqs(newList);
    saveFAQList(newList);
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus pertanyaan FAQ ini?')) {
      deleteFAQ(id);
      setFaqs(getFAQList());
      toast.success('FAQ berhasil dihapus.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-800">
            Kelola Pertanyaan FAQ (CRUD)
          </h1>
          <p className="text-xs text-slate-500">
            Tambah pertanyaan baru, edit jawaban, atau hapus daftar FAQ umum.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingFaq({
              pertanyaan: '',
              jawaban: '',
            });
            setShowModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-melon-primary text-white text-xs font-bold rounded-xl shadow hover:bg-melon-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah FAQ Baru</span>
        </button>
      </div>

      <div className="space-y-3">
        {faqs.map((item, idx) => (
          <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-melon-primary">FAQ #{idx + 1}</span>
              <h4 className="font-bold text-sm text-slate-800">{item.pertanyaan}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{item.jawaban}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  setEditingFaq(item);
                  setShowModal(true);
                }}
                className="p-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-bold"
                title="Edit FAQ"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 bg-red-100 text-red-600 rounded-lg text-xs font-bold hover:bg-red-200"
                title="Hapus FAQ"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Edit & Create FAQ */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-heading text-lg font-bold text-slate-800">
              {editingFaq.id ? 'Edit FAQ' : 'Tambah FAQ Baru'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Pertanyaan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Berapa harga tiket masuk?"
                  value={editingFaq.pertanyaan || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, pertanyaan: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Jawaban Lengkap</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Jawaban penjelasan..."
                  value={editingFaq.jawaban || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, jawaban: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none resize-none"
                />
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
                  Simpan FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
