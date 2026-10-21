'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CalendarCheck, Send, CheckCircle2, PhoneCall, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PaketWisata, PengaturanSitus, Reservasi } from '@/lib/types';
import { getPaketList, getPengaturan, getReservasiList, saveReservasiList } from '@/lib/data-store';
import { formatRupiah, createWhatsAppLink } from '@/lib/utils';
import toast from 'react-hot-toast';

function ReservasiFormContent() {
  const searchParams = useSearchParams();
  const [paketList, setPaketList] = useState<PaketWisata[]>([]);
  const [pengaturan, setPengaturan] = useState<PengaturanSitus | null>(null);

  const [nama, setNama] = useState('');
  const [noHp, setNoHp] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [jumlahOrang, setJumlahOrang] = useState(2);
  const [paketSlug, setPaketSlug] = useState('');
  const [catatan, setCatatan] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const list = getPaketList();
    setPaketList(list);
    setPengaturan(getPengaturan());

    const paramSlug = searchParams.get('paket');
    if (paramSlug && list.some((p) => p.slug === paramSlug)) {
      setPaketSlug(paramSlug);
    } else if (list.length > 0) {
      setPaketSlug(list[0].slug);
    }
  }, [searchParams]);

  const selectedPaket = paketList.find((p) => p.slug === paketSlug) || paketList[0] || {
    id: '1',
    nama: 'Paket Jelajah & Petik Mandiri',
    harga: 35000,
    slug: 'paket-perorangan-keluarga',
  };

  const estimasiTotal = (selectedPaket?.harga || 35000) * jumlahOrang;
  const adminWa = pengaturan?.wa_admin || '+6282253070639';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama.trim() || !noHp.trim() || !tanggal) {
      toast.error('Mohon lengkapi Nama, No HP, dan Tanggal Kunjungan.');
      return;
    }

    setSubmitting(true);

    try {
      const waText =
`*RESERVASI PETIK MELON MIRAH FARM SIDOREJO*
----------------------------------------
*Nama Pemesan:* ${nama}
*No. WhatsApp:* ${noHp}
*Tanggal Kunjungan:* ${tanggal}
*Jumlah Peserta:* ${jumlahOrang} Orang
*Paket Wisata:* ${selectedPaket.nama}
*Estimasi Total:* ${formatRupiah(estimasiTotal)}
*Catatan Tambahan:* ${catatan ? catatan : '-'}
----------------------------------------
_Mohon konfirmasi ketersediaan slot jam kunjungan. Terima kasih!_`;

      const waLink = createWhatsAppLink(adminWa, waText);

      const newReservation: Reservasi = {
        id: `res-${Date.now()}`,
        nama,
        no_hp: noHp,
        tanggal,
        jumlah_orang: jumlahOrang,
        paket_id: selectedPaket.id,
        catatan,
        status: 'baru',
        created_at: new Date().toISOString(),
      };

      // Save using data-store helper so it syncs globally to Supabase Cloud Database!
      const existing = getReservasiList();
      const updatedList = [newReservation, ...existing];
      saveReservasiList(updatedList);

      toast.success('Reservasi berhasil dicatat & dikirim ke Cloud!');
      setSubmitted(true);

      setTimeout(() => {
        window.open(waLink, '_blank');
      }, 600);
    } catch (err) {
      toast.error('Gagal mengirim reservasi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-3 mb-10">
        <span className="font-hand text-2xl text-melon-primary font-bold">
          ✨ Proses Cepat &lt; 1 Menit
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-melon-dark">
          Form Reservasi Petik Melon
        </h1>
        <p className="text-sm text-melon-dark/70 max-w-xl mx-auto">
          Isi data kunjungan di bawah ini. Setelah submit, Anda akan otomatis terhubung ke WhatsApp Admin untuk mengonfirmasi jam petik.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-melon-primary/20 shadow-xl space-y-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-melon-dark">
                Reservasi Anda Terkirim!
              </h3>
              <p className="text-sm text-melon-dark/70 max-w-md mx-auto">
                Jendela WhatsApp telah dibuka. Jika belum terbuka, silakan klik tombol di bawah ini untuk mengobrol dengan Admin Mirah Farm.
              </p>
              <Button
                variant="whatsapp"
                size="lg"
                onClick={() => {
                  const waText = `Halo Admin Mirah Farm, saya ${nama} mau mengonfirmasi reservasi tanggal ${tanggal}.`;
                  window.open(createWhatsAppLink(adminWa, waText), '_blank');
                }}
              >
                Open WhatsApp Chat Admin
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-melon-dark mb-1">
                  Nama Lengkap Pemesan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ibu Rina Setyowati"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-melon-primary/20 focus:outline-none focus:ring-2 focus:ring-melon-primary text-sm bg-melon-bg/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-melon-dark mb-1">
                  Nomor WhatsApp (HP) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 081234567890"
                  value={noHp}
                  onChange={(e) => setNoHp(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-melon-primary/20 focus:outline-none focus:ring-2 focus:ring-melon-primary text-sm bg-melon-bg/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-melon-dark mb-1">
                    Tanggal Rencana Kunjungan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={todayStr}
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-melon-primary/20 focus:outline-none focus:ring-2 focus:ring-melon-primary text-sm bg-melon-bg/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-melon-dark mb-1">
                    Jumlah Peserta (Orang) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={100}
                    value={jumlahOrang}
                    onChange={(e) => setJumlahOrang(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-2.5 rounded-xl border border-melon-primary/20 focus:outline-none focus:ring-2 focus:ring-melon-primary text-sm bg-melon-bg/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-melon-dark mb-1">
                  Pilihan Paket Wisata <span className="text-red-500">*</span>
                </label>
                <select
                  value={paketSlug}
                  onChange={(e) => setPaketSlug(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-melon-primary/20 focus:outline-none focus:ring-2 focus:ring-melon-primary text-sm bg-melon-bg/50"
                >
                  {paketList.map((p) => (
                    <option key={p.id} value={p.slug}>
                      {p.nama} — {formatRupiah(p.harga)} / org
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-melon-dark mb-1">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Misal: Jam datang pukul 10.00 WIB, membawa 2 anak kecil."
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-melon-primary/20 focus:outline-none focus:ring-2 focus:ring-melon-primary text-sm bg-melon-bg/50 resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={submitting}
                className="w-full justify-center shadow-lg mt-2"
                icon={<Send className="w-4 h-4" />}
              >
                {submitting ? 'Memproses...' : 'Kirim Reservasi & Hubungi WA Admin'}
              </Button>
            </form>
          )}
        </div>

        {/* Reservation Summary Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-br from-melon-dark to-melon-900 text-white p-6 rounded-3xl shadow-xl space-y-4">
            <h3 className="font-heading text-lg font-bold border-b border-white/10 pb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-melon-highlight" />
              <span>Ringkasan Estimasi</span>
            </h3>

            <div className="space-y-2 text-xs text-melon-bg/80">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Paket Dipilih:</span>
                <span className="font-bold text-white text-right">{selectedPaket?.nama}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Harga Satuan:</span>
                <span className="font-bold text-melon-accent">{formatRupiah(selectedPaket?.harga || 0)} / org</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Jumlah Peserta:</span>
                <span className="font-bold text-white">{jumlahOrang} Orang</span>
              </div>
              <div className="flex justify-between py-2 text-sm font-extrabold text-white">
                <span>Estimasi Total:</span>
                <span className="text-melon-highlight text-base">{formatRupiah(estimasiTotal)}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/10 text-[11px] leading-relaxed text-white/80">
              ℹ️ Pembayaran dilakukan secara tunai / Qris langsung di lokasi kasir Mirah Farm setelah penimbangan buah.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReservasiPage() {
  return (
    <div className="pt-28 pb-16">
      <Suspense fallback={<div className="text-center p-12">Loading form...</div>}>
        <ReservasiFormContent />
      </Suspense>
    </div>
  );
}
