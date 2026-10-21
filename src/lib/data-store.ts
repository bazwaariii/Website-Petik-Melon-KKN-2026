'use client';

import {
  PaketWisata,
  ProdukUMKM,
  GaleriItem,
  ArtikelBlog,
  Testimoni,
  FAQItem,
  PengaturanSitus,
  Reservasi,
} from './types';
import {
  PAKET_WISATA_DEFAULT,
  PRODUK_UMKM_DEFAULT,
  GALERI_DEFAULT,
  ARTIKEL_DEFAULT,
  TESTIMONI_DEFAULT,
  FAQ_DEFAULT,
  PENGATURAN_DEFAULT,
} from './constants';
import { createClient } from './supabase/client';

const KEYS = {
  PAKET: 'mirah_paket_list',
  PRODUK: 'mirah_produk_list',
  GALERI: 'mirah_galeri_list',
  ARTIKEL: 'mirah_artikel_list',
  TESTIMONI: 'mirah_testimoni_list',
  FAQ: 'mirah_faq_list',
  PENGATURAN: 'mirah_pengaturan_data',
  RESERVASI: 'mirah_reservations',
};

function isClient(): boolean {
  return typeof window !== 'undefined';
}

export function notifyUpdate() {
  if (isClient()) {
    window.dispatchEvent(new Event('mirah_data_updated'));
  }
}

// DEFAULT RESERVASI DATA
const RESERVASI_DEFAULT: Reservasi[] = [
  {
    id: 'res-101',
    nama: 'Bunda Rina Setyowati',
    no_hp: '081234567890',
    tanggal: '2026-07-25',
    jumlah_orang: 4,
    paket_id: '1',
    catatan: 'Datang pagi jam 09.00 WIB',
    status: 'baru',
    created_at: '2026-07-22T10:00:00Z',
  },
  {
    id: 'res-102',
    nama: 'Instansi Dinas Pertanian',
    no_hp: '082198765432',
    tanggal: '2026-07-28',
    jumlah_orang: 15,
    paket_id: '2',
    catatan: 'Kunjungan rombongan & welcome drink',
    status: 'dikonfirmasi',
    created_at: '2026-07-21T14:30:00Z',
  },
];

// Helper to push updates to Supabase Cloud DB in background
async function pushToSupabase(table: string, data: any) {
  const supabase = createClient();
  if (!supabase) return;

  try {
    if (Array.isArray(data)) {
      if (data.length === 0) return;
      await supabase.from(table).upsert(data);
    } else {
      await supabase.from(table).upsert(data);
    }
  } catch (err) {
    console.warn(`[Supabase Push Warning] Failed to sync ${table}:`, err);
  }
}

// Helper to delete item from Supabase Cloud DB
export async function deleteFromSupabase(table: string, id: string | number) {
  const supabase = createClient();
  if (!supabase) return;
  try {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) {
      console.warn(`[Supabase Delete Notice] ${table} id=${id}:`, error.message);
    }
  } catch (err) {
    console.warn(`[Supabase Delete Warning] Failed to delete from ${table}:`, err);
  }
}

// Global fetch from Supabase Cloud DB to populate local cache across all devices
export async function syncFromSupabase() {
  const supabase = createClient();
  if (!supabase || !isClient()) return;

  try {
    // 1. Paket Wisata
    const { data: paketData } = await supabase.from('paket_wisata').select('*').order('urutan', { ascending: true });
    if (paketData && paketData.length > 0) {
      localStorage.setItem(KEYS.PAKET, JSON.stringify(paketData));
    }

    // 2. Produk
    const { data: produkData } = await supabase.from('produk').select('*').order('created_at', { ascending: false });
    if (produkData) {
      localStorage.setItem(KEYS.PRODUK, JSON.stringify(produkData));
    }

    // 3. Galeri
    const { data: galeriData } = await supabase.from('galeri').select('*').order('urutan', { ascending: true });
    if (galeriData) {
      localStorage.setItem(KEYS.GALERI, JSON.stringify(galeriData));
    }

    // 4. Artikel
    const { data: artikelData } = await supabase.from('artikel').select('*').order('published_at', { ascending: false });
    if (artikelData) {
      localStorage.setItem(KEYS.ARTIKEL, JSON.stringify(artikelData));
    }

    // 5. Testimoni
    const { data: testimoniData } = await supabase.from('testimoni').select('*').order('created_at', { ascending: false });
    if (testimoniData) {
      localStorage.setItem(KEYS.TESTIMONI, JSON.stringify(testimoniData));
    }

    // 6. FAQ
    const { data: faqData } = await supabase.from('faq').select('*').order('urutan', { ascending: true });
    if (faqData) {
      localStorage.setItem(KEYS.FAQ, JSON.stringify(faqData));
    }

    // 7. Pengaturan
    const { data: pengaturanData } = await supabase.from('pengaturan').select('*').single();
    if (pengaturanData) {
      localStorage.setItem(KEYS.PENGATURAN, JSON.stringify(pengaturanData));
    }

    // 8. Reservasi
    const { data: reservasiData } = await supabase.from('reservasi').select('*').order('created_at', { ascending: false });
    if (reservasiData) {
      localStorage.setItem(KEYS.RESERVASI, JSON.stringify(reservasiData));
    }

    notifyUpdate();
  } catch (err) {
    console.warn('[Supabase Sync Notice] Sync error:', err);
  }
}

// Run initial background sync on client initialization if env vars exist
if (isClient()) {
  syncFromSupabase();
}

// 0. RESERVASI
export function getReservasiList(): Reservasi[] {
  if (!isClient()) return RESERVASI_DEFAULT;
  try {
    const data = localStorage.getItem(KEYS.RESERVASI);
    return data ? JSON.parse(data) : RESERVASI_DEFAULT;
  } catch {
    return RESERVASI_DEFAULT;
  }
}

export function saveReservasiList(list: Reservasi[]) {
  if (!isClient()) return;
  try {
    localStorage.setItem(KEYS.RESERVASI, JSON.stringify(list));
  } catch (e) {
    console.warn('LocalStorage quota warning:', e);
  }
  notifyUpdate();
  pushToSupabase('reservasi', list);
}

export function deleteReservasi(id: string) {
  const list = getReservasiList().filter((r) => r.id !== id);
  saveReservasiList(list);
  deleteFromSupabase('reservasi', id);
}

// 1. PAKET WISATA
export function getPaketList(): PaketWisata[] {
  if (!isClient()) return PAKET_WISATA_DEFAULT;
  try {
    const data = localStorage.getItem(KEYS.PAKET);
    return data ? JSON.parse(data) : PAKET_WISATA_DEFAULT;
  } catch {
    return PAKET_WISATA_DEFAULT;
  }
}

export function savePaketList(list: PaketWisata[]) {
  if (!isClient()) return;
  try {
    localStorage.setItem(KEYS.PAKET, JSON.stringify(list));
  } catch (e) {
    console.warn('LocalStorage quota warning:', e);
  }
  notifyUpdate();
  pushToSupabase('paket_wisata', list);
}

export function deletePaket(id: string) {
  const list = getPaketList().filter((p) => p.id !== id);
  savePaketList(list);
  deleteFromSupabase('paket_wisata', id);
}

// 2. PRODUK UMKM
export function getProdukList(): ProdukUMKM[] {
  if (!isClient()) return PRODUK_UMKM_DEFAULT;
  try {
    const data = localStorage.getItem(KEYS.PRODUK);
    return data ? JSON.parse(data) : PRODUK_UMKM_DEFAULT;
  } catch {
    return PRODUK_UMKM_DEFAULT;
  }
}

export function saveProdukList(list: ProdukUMKM[]) {
  if (!isClient()) return;
  try {
    localStorage.setItem(KEYS.PRODUK, JSON.stringify(list));
  } catch (e) {
    console.warn('LocalStorage quota warning:', e);
  }
  notifyUpdate();
  pushToSupabase('produk', list);
}

export function deleteProduk(id: string) {
  const list = getProdukList().filter((p) => p.id !== id);
  saveProdukList(list);
  deleteFromSupabase('produk', id);
}

// 3. GALERI FOTO & VIDEO
export function getGaleriList(): GaleriItem[] {
  if (!isClient()) return GALERI_DEFAULT;
  try {
    const data = localStorage.getItem(KEYS.GALERI);
    return data ? JSON.parse(data) : GALERI_DEFAULT;
  } catch {
    return GALERI_DEFAULT;
  }
}

export function saveGaleriList(list: GaleriItem[]) {
  if (!isClient()) return;
  try {
    localStorage.setItem(KEYS.GALERI, JSON.stringify(list));
  } catch (e) {
    console.warn('LocalStorage quota warning:', e);
  }
  notifyUpdate();
  pushToSupabase('galeri', list);
}

export function deleteGaleri(id: string) {
  const list = getGaleriList().filter((g) => g.id !== id);
  saveGaleriList(list);
  deleteFromSupabase('galeri', id);
}

// 4. ARTIKEL BLOG
export function getArtikelList(): ArtikelBlog[] {
  if (!isClient()) return ARTIKEL_DEFAULT;
  try {
    const data = localStorage.getItem(KEYS.ARTIKEL);
    return data ? JSON.parse(data) : ARTIKEL_DEFAULT;
  } catch {
    return ARTIKEL_DEFAULT;
  }
}

export function saveArtikelList(list: ArtikelBlog[]) {
  if (!isClient()) return;
  try {
    localStorage.setItem(KEYS.ARTIKEL, JSON.stringify(list));
  } catch (e) {
    console.warn('LocalStorage quota warning:', e);
  }
  notifyUpdate();
  pushToSupabase('artikel', list);
}

export function deleteArtikel(id: string) {
  const list = getArtikelList().filter((a) => a.id !== id);
  saveArtikelList(list);
  deleteFromSupabase('artikel', id);
}

// 5. TESTIMONI
export function getTestimoniList(): Testimoni[] {
  if (!isClient()) return TESTIMONI_DEFAULT;
  try {
    const data = localStorage.getItem(KEYS.TESTIMONI);
    return data ? JSON.parse(data) : TESTIMONI_DEFAULT;
  } catch {
    return TESTIMONI_DEFAULT;
  }
}

export function saveTestimoniList(list: Testimoni[]) {
  if (!isClient()) return;
  try {
    localStorage.setItem(KEYS.TESTIMONI, JSON.stringify(list));
  } catch (e) {
    console.warn('LocalStorage quota warning:', e);
  }
  notifyUpdate();
  pushToSupabase('testimoni', list);
}

export function deleteTestimoni(id: string) {
  const list = getTestimoniList().filter((t) => t.id !== id);
  saveTestimoniList(list);
  deleteFromSupabase('testimoni', id);
}

// 6. FAQ
export function getFAQList(): FAQItem[] {
  if (!isClient()) return FAQ_DEFAULT;
  try {
    const data = localStorage.getItem(KEYS.FAQ);
    return data ? JSON.parse(data) : FAQ_DEFAULT;
  } catch {
    return FAQ_DEFAULT;
  }
}

export function saveFAQList(list: FAQItem[]) {
  if (!isClient()) return;
  try {
    localStorage.setItem(KEYS.FAQ, JSON.stringify(list));
  } catch (e) {
    console.warn('LocalStorage quota warning:', e);
  }
  notifyUpdate();
  pushToSupabase('faq', list);
}

export function deleteFAQ(id: string) {
  const list = getFAQList().filter((f) => f.id !== id);
  saveFAQList(list);
  deleteFromSupabase('faq', id);
}

// 7. PENGATURAN SITUS
export function getPengaturan(): PengaturanSitus {
  if (!isClient()) return PENGATURAN_DEFAULT;
  try {
    const data = localStorage.getItem(KEYS.PENGATURAN);
    return data ? JSON.parse(data) : PENGATURAN_DEFAULT;
  } catch {
    return PENGATURAN_DEFAULT;
  }
}

export function savePengaturan(settings: PengaturanSitus) {
  if (!isClient()) return;
  try {
    localStorage.setItem(KEYS.PENGATURAN, JSON.stringify(settings));
  } catch (e) {
    console.warn('LocalStorage quota warning:', e);
  }
  notifyUpdate();
  pushToSupabase('pengaturan', settings);
}
