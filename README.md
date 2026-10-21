# 🍈 Website Resmi Agrowisata Petik Melon — Mirah Farm Sidorejo (KKN 2026)

Website resmi agrowisata petik melon **Mirah Farm**, Desa Sidorejo, Kecamatan Padangan, Kabupaten Bojonegoro, Jawa Timur. Dibangun sebagai luaran program pengabdian KKN 2026 untuk memajukan potensi agrowisata berbasis greenhouse hidroponik presisi dan produk UMKM olahan warga desa.

---

## 🌟 Fitur Utama

- **Hero Banner Dinamis & HD**: Menampilkan suasana kebun dengan indikator status musim panen (🟢 Siap Dipetik, 🟡 Segera Panen, 🔵 Masa Tanam & Perawatan) yang tersinkronisasi langsung dari dashboard.
- **Katalog Paket Wisata**: Informasi lengkap mengenai paket mandiri, edukasi rombongan, dan VIP eksklusif lengkap dengan rincian fasilitas dan harga.
- **Produk UMKM Olahan Melon**: Etalase produk turunan melon seperti keripik vacuum frying, jus segar inthanon, dodol melon, dan buah segar per kg.
- **Galeri Dokumentasi Foto & Video**: Dokumentasi aktivitas wisatawan, kebun greenhouse, dan edukasi pertanian hidroponik.
- **Artikel & Blog Edukasi**: Media edukasi teknik budidaya melon hidroponik dan tips kesehatan konsumsi melon.
- **Sistem Reservasi Real-Time**: Formulir booking kunjungan langsung tersinkronisasi ke database cloud Supabase dan terhubung otomatis ke WhatsApp Admin.
- **Dashboard Admin Lengkap (CRUD)**:
  - Kelola Data Reservasi Pengunjung
  - Kelola Paket Wisata (Tambah, Edit, Hapus, Upload Foto)
  - Kelola Galeri Media Foto & Video (Upload langsung dengan kompresi cerdas)
  - Kelola Produk UMKM (Harga, Stok, Foto Produk)
  - Kelola Artikel Blog Edukasi
  - Moderasi Testimoni & FAQ
  - Pengaturan Umum Situs (Status Panen, Jam Operasional, Kontak Admin, Alamat)
- **Kompresi Gambar Otomatis**: Setiap gambar yang diunggah dikompres otomatis menggunakan Canvas API di browser sehingga cepat, ringan, dan hemat penyimpanan.
- **Multi-Device Realtime Cloud Sync**: Terhubung dengan database cloud Supabase sehingga seluruh pembaruan dari HP atau Laptop langsung tersinkronisasi secara global.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Static Export)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database & Storage**: [Supabase](https://supabase.com/) (PostgreSQL & Storage)
- **Deployment**: [Netlify](https://www.netlify.com/)

---

## 🚀 Panduan Memulai (Local Development)

### 1. Clone Repository
```bash
git clone https://github.com/bazwaariii/Website-Petik-Melon-KKN-2026.git
cd Website-Petik-Melon-KKN-2026
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```
Pastikan kredensial Supabase (`NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`) telah terisi.

### 4. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka browser dan akses [http://localhost:3000](http://localhost:3000).

---

## 📦 Build & Deployment

Untuk melakukan build static export yang siap diunggah ke hosting (Netlify, Vercel, GitHub Pages, cPanel):

```bash
npm run build
```

Hasil build akan otomatis diekspor ke dalam folder `/out`.

---

## 📍 Kontak & Lokasi

- **Lokasi Kebun**: Jl. Bengawan Mbenang, Dusun Mbenang, Desa Sidorejo, Kec. Padangan, Kab. Bojonegoro, Jawa Timur 62162
- **Instagram**: [@mirah_farm](https://instagram.com/mirah_farm)
- **WhatsApp**: [+6282253070639](https://wa.me/6282253070639)
- **Google Maps**: [Mirah Farm Sidorejo](https://maps.app.goo.gl/Vh3mkRcQXusJzWEcA?g_st=ic)

---

Dibuat dengan ❤️ oleh **Tim KKN 2026 Desa Sidorejo**
