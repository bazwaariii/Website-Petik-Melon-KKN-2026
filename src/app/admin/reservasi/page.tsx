'use client';

import React, { useState, useEffect } from 'react';
import { CalendarCheck, MessageSquare, Download, Filter, Search, Plus, Edit, Trash2, X, Check } from 'lucide-react';
import { Reservasi, PaketWisata } from '@/lib/types';
import { getReservasiList, saveReservasiList, deleteReservasi, getPaketList } from '@/lib/data-store';
import { createWhatsAppLink } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AdminReservasiPage() {
  const [reservations, setReservations] = useState<Reservasi[]>([]);
  const [paketList, setPaketList] = useState<PaketWisata[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal State for Create / Edit
  const [showModal, setShowModal] = useState(false);
  const [editingRes, setEditingRes] = useState<Partial<Reservasi>>({
    nama: '',
    no_hp: '',
    tanggal: new Date().toISOString().split('T')[0],
    jumlah_orang: 2,
    paket_id: '1',
    catatan: '',
    status: 'baru',
  });

  useEffect(() => {
    setReservations(getReservasiList());
    setPaketList(getPaketList());
  }, []);

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRes.nama || !editingRes.no_hp || !editingRes.tanggal) {
      toast.error('Mohon lengkapi nama, no HP, dan tanggal.');
      return;
    }

    let updated: Reservasi[];

    if (editingRes.id) {
      // Edit existing
      updated = reservations.map((r) => (r.id === editingRes.id ? ({ ...r, ...editingRes } as Reservasi) : r));
      toast.success('Data reservasi berhasil diperbarui!');
    } else {
      // Create new
      const newRes: Reservasi = {
        id: `res-${Date.now()}`,
        nama: editingRes.nama,
        no_hp: editingRes.no_hp,
        tanggal: editingRes.tanggal,
        jumlah_orang: editingRes.jumlah_orang || 1,
        paket_id: editingRes.paket_id || (paketList[0]?.id || '1'),
        catatan: editingRes.catatan || '',
        status: editingRes.status || 'baru',
        created_at: new Date().toISOString(),
      };
      updated = [newRes, ...reservations];
      toast.success('Reservasi baru berhasil ditambahkan!');
    }

    setReservations(updated);
    saveReservasiList(updated);
    setShowModal(false);
  };

  const updateStatus = (id: string, newStatus: Reservasi['status']) => {
    const updated = reservations.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
    setReservations(updated);
    saveReservasiList(updated);
    toast.success(`Status reservasi diperbarui menjadi: ${newStatus.toUpperCase()}`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus data reservasi ini?')) {
      deleteReservasi(id);
      setReservations(getReservasiList());
      toast.success('Data reservasi berhasil dihapus.');
    }
  };

  const exportCSV = () => {
    const headers = ['ID,Nama,No HP,Tanggal,Jumlah Orang,Status,Catatan\n'];
    const rows = reservations.map(
      (r) => `"${r.id}","${r.nama}","${r.no_hp}","${r.tanggal}","${r.jumlah_orang}","${r.status}","${r.catatan || ''}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reservasi-mirah-farm-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('File CSV berhasil diunduh!');
  };

  const filteredData = reservations.filter((r) => {
    const matchStatus = filterStatus === 'semua' || r.status === filterStatus;
    const matchSearch =
      r.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.no_hp.includes(searchQuery);
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-800">
            Kelola Reservasi Pengunjung (CRUD)
          </h1>
          <p className="text-xs text-slate-500">
            Kelola booking tempat, ubah jadwal, konfirmasi via WA, atau tambah reservasi manual.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start">
          <button
            onClick={() => {
              setEditingRes({
                nama: '',
                no_hp: '',
                tanggal: new Date().toISOString().split('T')[0],
                jumlah_orang: 2,
                paket_id: paketList[0]?.id || '1',
                catatan: '',
                status: 'baru',
              });
              setShowModal(true);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-melon-primary text-white text-xs font-bold rounded-xl shadow hover:bg-melon-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Reservasi Manual</span>
          </button>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl shadow hover:bg-slate-900 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari nama atau no. HP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-melon-primary focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-melon-primary focus:outline-none"
          >
            <option value="semua">Semua Status</option>
            <option value="baru">Baru</option>
            <option value="dikonfirmasi">Dikonfirmasi</option>
            <option value="selesai">Selesai</option>
            <option value="batal">Batal</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="p-3.5">Nama & Kontak</th>
                <th className="p-3.5">Tgl Kunjungan</th>
                <th className="p-3.5">Jumlah</th>
                <th className="p-3.5">Catatan</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Ubah Status</th>
                <th className="p-3.5 text-right">Aksi CRUD & WA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    Tidak ada reservasi ditemukan.
                  </td>
                </tr>
              ) : (
                filteredData.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80">
                    <td className="p-3.5">
                      <span className="font-bold text-slate-800 block">{r.nama}</span>
                      <span className="text-slate-500">{r.no_hp}</span>
                    </td>
                    <td className="p-3.5 font-medium text-slate-700">{r.tanggal}</td>
                    <td className="p-3.5 text-slate-700">{r.jumlah_orang} Orang</td>
                    <td className="p-3.5 text-slate-500 max-w-xs truncate">
                      {r.catatan || '-'}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          r.status === 'baru'
                            ? 'bg-amber-100 text-amber-800'
                            : r.status === 'dikonfirmasi'
                            ? 'bg-emerald-100 text-emerald-800'
                            : r.status === 'selesai'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {r.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <select
                        value={r.status}
                        onChange={(e) => updateStatus(r.id, e.target.value as Reservasi['status'])}
                        className="px-2 py-1 rounded border border-slate-200 text-[11px] font-medium"
                      >
                        <option value="baru">Baru</option>
                        <option value="dikonfirmasi">Dikonfirmasi</option>
                        <option value="selesai">Selesai</option>
                        <option value="batal">Batal</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setEditingRes(r);
                          setShowModal(true);
                        }}
                        className="p-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-bold"
                        title="Edit Reservasi"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(r.id)}
                        className="p-1.5 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg text-xs font-bold"
                        title="Hapus Reservasi"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={createWhatsAppLink(
                          r.no_hp,
                          `Halo Kak ${r.nama}, konfirmasi reservasi Mirah Farm Sidorejo untuk tanggal ${r.tanggal} sejumlah ${r.jumlah_orang} orang sudah kami ${r.status.toUpperCase()}. Sampai jumpa di kebun!`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#25D366] text-white rounded-lg font-bold text-[11px] hover:bg-[#20ba5a]"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WA</span>
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Edit / Create Reservasi */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-heading text-lg font-bold text-slate-800">
              {editingRes.id ? 'Edit Data Reservasi' : 'Tambah Reservasi Manual'}
            </h3>

            <form onSubmit={handleSaveModal} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Nama Pemesan</label>
                <input
                  type="text"
                  required
                  value={editingRes.nama || ''}
                  onChange={(e) => setEditingRes({ ...editingRes, nama: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">No. WhatsApp (HP)</label>
                <input
                  type="tel"
                  required
                  value={editingRes.no_hp || ''}
                  onChange={(e) => setEditingRes({ ...editingRes, no_hp: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Tanggal Kunjungan</label>
                  <input
                    type="date"
                    required
                    value={editingRes.tanggal || ''}
                    onChange={(e) => setEditingRes({ ...editingRes, tanggal: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Jumlah Orang</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={editingRes.jumlah_orang || 1}
                    onChange={(e) => setEditingRes({ ...editingRes, jumlah_orang: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Paket Wisata</label>
                <select
                  value={editingRes.paket_id || ''}
                  onChange={(e) => setEditingRes({ ...editingRes, paket_id: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                >
                  {paketList.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Status Reservasi</label>
                <select
                  value={editingRes.status || 'baru'}
                  onChange={(e) => setEditingRes({ ...editingRes, status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                >
                  <option value="baru">Baru</option>
                  <option value="dikonfirmasi">Dikonfirmasi</option>
                  <option value="selesai">Selesai</option>
                  <option value="batal">Batal</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Catatan Tambahan</label>
                <textarea
                  rows={2}
                  value={editingRes.catatan || ''}
                  onChange={(e) => setEditingRes({ ...editingRes, catatan: e.target.value })}
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
                  Simpan Reservasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
