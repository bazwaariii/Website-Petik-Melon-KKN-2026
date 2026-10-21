export interface PaketWisata {
  id: string;
  slug: string;
  nama: string;
  deskripsi: string;
  harga: number;
  durasi: string;
  min_orang: number;
  fasilitas: string[];
  foto_utama: string;
  galeri: string[];
  aktif: boolean;
  urutan: number;
  created_at?: string;
}

export interface Reservasi {
  id: string;
  nama: string;
  no_hp: string;
  tanggal: string;
  jumlah_orang: number;
  paket_id: string;
  catatan?: string;
  status: 'baru' | 'dikonfirmasi' | 'selesai' | 'batal';
  created_at: string;
}

export interface GaleriItem {
  id: string;
  judul: string;
  tipe: 'foto' | 'video';
  url: string;
  kategori: 'kebun' | 'kegiatan' | 'produk' | 'pengunjung';
  urutan: number;
  created_at?: string;
}

export interface ProdukUMKM {
  id: string;
  nama: string;
  deskripsi: string;
  harga: number;
  foto: string;
  kontak_wa: string;
  aktif: boolean;
  stok_status: 'tersedia' | 'preorder' | 'habis';
  created_at?: string;
}

export interface ArtikelBlog {
  id: string;
  slug: string;
  judul: string;
  ringkasan: string;
  konten: string;
  cover: string;
  penulis: string;
  terbit: boolean;
  published_at: string;
  created_at?: string;
}

export interface Testimoni {
  id: string;
  nama: string;
  asal: string;
  pesan: string;
  rating: number;
  foto?: string;
  disetujui: boolean;
  created_at: string;
}

export interface FAQItem {
  id: string;
  pertanyaan: string;
  jawaban: string;
  urutan: number;
}

export interface PengaturanSitus {
  id: number;
  jam_operasional: string;
  status_panen: 'siap_petik' | 'segera_panen' | 'masa_tanam';
  status_panen_teks: string;
  hero_judul: string;
  hero_subjudul: string;
  wa_admin: string;
  instagram: string;
  alamat: string;
  maps_embed: string;
}
