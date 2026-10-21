# Website Wisata Petik Melon Sidorejo — Planning, Requirements & Vibe Coding Guide

<aside>
🍈

**Proyek Pengabdian Masyarakat** — Website Wisata Petik Melon, Desa Sidorejo, Kec. Padangan, Kab. Bojonegoro, Jawa Timur. Dokumen ini berisi *planning, requirements, desain UI/UX, arsitektur teknis, data model, dan prompt siap-pakai* untuk vibe coding sampai website jadi lengkap. Login hanya untuk **admin**.

</aside>

## 1. Ringkasan Proyek

**Nama produk (usulan):** *MelonSari Sidorejo* — bisa diganti sesuai brand desa.

**Tujuan:** Membangun website resmi yang mempromosikan wisata petik melon, meningkatkan kunjungan wisatawan, memudahkan reservasi, dan mengangkat ekonomi warga (UMKM & produk olahan melon).

**Sifat website:** Company/tourism profile + katalog paket wisata + reservasi + blog edukasi + panel admin (satu pintu untuk kelola seluruh konten).

**Prinsip desain utama:**

1. **Kreatif & tidak umum** — layout asimetris, storytelling, bukan template kaku.
2. **Profesional** — konsisten, rapi, dipercaya.
3. **UX kuat** — cepat, jelas, mudah booking di HP maupun PC.
4. **Tidak terlihat AI** — foto asli lokasi, detail buatan tangan, copy manusiawi khas lokal.

---

## 2. Sasaran & Target Pengguna

| Persona | Kebutuhan utama | Perilaku |
| --- | --- | --- |
| Keluarga & rombongan | Info paket, harga, jam buka, cara reservasi | Akses via HP, cepat memutuskan |
| Anak muda / konten kreator | Spot foto estetik, galeri, sosial media | Scroll cepat, cari visual |
| Sekolah / edukasi | Paket edukasi tani melon, jadwal panen | Butuh info rombongan & kontak |
| Reseller / UMKM | Produk olahan, harga grosir, kontak | Cari kontak & katalog |
| **Admin desa** (khusus) | Kelola semua konten & reservasi | Login aman, dashboard sederhana |

**Target teknis pengalaman:** 

- Mobile-first, tapi tetap indah di desktop lebar.
- Load awal cepat (LCP < 2.5 dtk di 4G).
- Booking bisa selesai dalam < 1 menit (form ringkas + WhatsApp).

---

## 3. Requirements

### 3.1 Functional Requirements — Sisi Publik (Pengunjung)

- [ ]  **Beranda (Landing)** dengan hero visual sinematik, tagline, dan CTA "Pesan Sekarang".
- [ ]  **Tentang Kami / Cerita Desa** — narasi asal-usul kebun melon Sidorejo + foto warga.
- [ ]  **Paket Wisata** — daftar paket (nama, foto, harga, durasi, fasilitas, min. orang).
- [ ]  **Detail Paket** — halaman rinci tiap paket + tombol reservasi.
- [ ]  **Reservasi / Booking** — form (nama, no HP, tanggal, jumlah orang, paket, catatan) → kirim ke database + notifikasi WhatsApp admin.
- [ ]  **Galeri** — foto & video petik melon, kategori (kebun, kegiatan, produk).
- [ ]  **Musim Panen & Jam Operasional** — indikator status "Sedang musim / Segera panen".
- [ ]  **Produk Olahan / UMKM** — katalog produk melon (jus, keripik, dodol, dll) + kontak beli.
- [ ]  **Blog / Artikel Edukasi** — tips petik melon, kandungan gizi, agrowisata.
- [ ]  **Testimoni** — ulasan pengunjung (foto + rating bintang).
- [ ]  **Lokasi & Peta** — embed Google Maps + petunjuk arah.
- [ ]  **FAQ** — pertanyaan umum (harga, reservasi, anak-anak, parkir).
- [ ]  **Kontak & Sosial Media** — WhatsApp, Instagram, alamat, jam.
- [ ]  **Multi-bahasa (opsional)** — ID default, EN opsional.

### 3.2 Functional Requirements — Sisi Admin (Login Wajib)

<aside>
🔒

**Login HANYA untuk admin.** Tidak ada registrasi publik. Tidak ada peran user biasa. Akun admin dibuat manual (seed) atau lewat 1 super-admin.

</aside>

- [x]  **Login admin** (email + password, sesi aman, proteksi brute-force).
- [ ]  **Dashboard** — ringkasan: jumlah reservasi baru, total pengunjung paket, reservasi minggu ini.
- [ ]  **Kelola Reservasi** — lihat, filter, ubah status (Baru → Dikonfirmasi → Selesai → Batal), ekspor.
- [ ]  **Kelola Paket Wisata** — CRUD paket + upload foto.
- [ ]  **Kelola Galeri** — upload/hapus foto & video, atur kategori & urutan.
- [ ]  **Kelola Produk UMKM** — CRUD produk olahan.
- [ ]  **Kelola Artikel/Blog** — CRUD artikel dengan editor teks.
- [ ]  **Kelola Testimoni** — moderasi (setujui/tolak) & tambah manual.
- [ ]  **Kelola FAQ** — CRUD.
- [ ]  **Pengaturan Situs** — jam operasional, status musim panen, kontak, link sosmed, teks hero.
- [ ]  **Logout** & ganti password.

### 3.3 Non-Functional Requirements

| Aspek | Target |
| --- | --- |
| Responsif | Sempurna di HP kecil (360px), tablet, desktop, layar lebar |
| Performa | LCP < 2.5s, gambar lazy-load & ter-optimasi (WebP/AVIF) |
| SEO | Meta tags, Open Graph, sitemap.xml, [schema.org](http://schema.org) LocalBusiness/TouristAttraction |
| Aksesibilitas | Kontras cukup, alt text, navigasi keyboard, semantic HTML |
| Keamanan | Password di-hash, rate limit login, HTTPS, proteksi upload file |
| Skalabilitas | Mudah tambah paket/artikel tanpa ubah kode |
| Maintainability | Kode terstruktur, komponen reusable, env variables |
| Analitik | Google Analytics / Umami untuk pantau kunjungan |

---

## 4. Arah Desain UI/UX (Agar Kreatif & Tidak Terlihat AI)

<aside>
🎨

Kunci "tidak terlihat AI": gunakan **aset asli**, **detail buatan tangan**, dan **ketidaksempurnaan yang disengaja**. Website AI generik biasanya simetris, pakai stok foto, gradient ungu-biru, dan ikon seragam. Hindari itu.

</aside>

### 4.1 Konsep Kreatif

- **Tema visual:** "Kebun melon saat matahari pagi" — hangat, segar, membumi (earthy + fresh).
- **Storytelling scroll:** Beranda mengalir seperti cerita: dari kebun → petik → nikmati → bawa pulang.
- **Layout asimetris & organik:** gunakan grid tak beraturan, elemen sedikit miring, bentuk melengkung (blob), garis kontur seperti kebun.
- **Ilustrasi/tekstur custom:** doodle daun melon, tekstur kertas/kanvas halus, pola batik lokal Bojonegoro sebagai aksen (bukan pattern generik).
- **Micro-interactions:** hover kartu paket sedikit terangkat, animasi buah melon "jatuh" halus, progress panen, scroll-reveal lembut (pakai Framer Motion, jangan berlebihan).

### 4.2 Design System

**Palet warna (earthy melon, hindari gradient ungu AI):**

| Peran | Warna | Hex |
| --- | --- | --- |
| Primary (daging melon) | Oranye-melon lembut | `#F2994A` |
| Secondary (kulit/daun) | Hijau kebun | `#3A7D44` |
| Accent (segar) | Hijau muda melon | `#C7E89E` |
| Netral gelap | Coklat tanah | `#2E2A26` |
| Background | Krem kanvas | `#FAF6EF` |
| Highlight | Kuning matahari | `#F6C453` |

**Tipografi (kombinasi berkarakter, bukan Inter/Roboto default):**

- Judul: font berkarakter hangat, mis. *Fraunces*, *Clash Display*, atau *Bricolage Grotesque*.
- Isi: font mudah dibaca, mis. *Plus Jakarta Sans* atau *Source Sans 3*.
- Aksen tulisan tangan untuk quote lokal, mis. *Caveat* (secukupnya).

**Komponen kunci:** navbar transparan → solid saat scroll, kartu paket dengan foto besar & harga jelas, tombol CTA menonjol (WhatsApp hijau), badge status musim panen, galeri masonry, sticky booking bar di mobile.

### 4.3 Aturan "Anti-Generik"

- Gunakan **foto asli** kebun & warga Sidorejo (wajib). Jangan stok foto.
- Copywriting pakai **bahasa manusiawi & lokal** ("Petik langsung dari pohonnya, manisnya kerasa") bukan bahasa korporat kaku.
- Tambah **detail personal**: nama petani, cerita singkat, tanggal panen nyata.
- Variasikan bentuk section (jangan semua kotak seragam full-width).
- Ikon custom / satu set konsisten (mis. Lucide dengan gaya seragam), bukan campur banyak gaya.

---

## 5. Struktur Situs (Sitemap)

```
Publik
├── / (Beranda)
├── /tentang (Cerita Desa & Kebun)
├── /paket (Daftar Paket Wisata)
│   └── /paket/[slug] (Detail Paket)
├── /reservasi (Form Booking)
├── /galeri (Foto & Video)
├── /produk (UMKM / Olahan Melon)
├── /blog (Artikel)
│   └── /blog/[slug] (Detail Artikel)
├── /faq
└── /kontak

Admin (butuh login)
├── /admin/login
├── /admin (Dashboard)
├── /admin/reservasi
├── /admin/paket
├── /admin/galeri
├── /admin/produk
├── /admin/blog
├── /admin/testimoni
├── /admin/faq
└── /admin/pengaturan
```

---

## 6. Rekomendasi Tech Stack

<aside>
🧩

Stack ini ramah vibe coding, cepat, gratis/murah untuk desa, dan mendukung admin-only login + upload gambar.

</aside>

| Lapisan | Pilihan | Alasan |
| --- | --- | --- |
| Framework | **Next.js 14 (App Router) + TypeScript** | SEO bagus, cepat, fleksibel |
| Styling | **Tailwind CSS**  • komponen custom | Kontrol penuh desain unik |
| Animasi | **Framer Motion** | Micro-interaction halus |
| Backend + DB + Auth + Storage | **Supabase** (PostgreSQL, Auth, Storage) | Login admin, database, upload foto dalam 1 layanan |
| Editor artikel | Tiptap / React Quill | Menulis blog mudah |
| Peta | Google Maps Embed / Leaflet | Lokasi kebun |
| Notifikasi booking | Link WhatsApp ([wa.me](http://wa.me)) + email opsional | Admin langsung dapat pesan |
| Deploy | **Vercel** (frontend) + Supabase (backend) | Gratis, cepat, mudah |
| Analitik | Umami / Google Analytics | Pantau pengunjung |

**Alternatif lebih sederhana** (jika ingin 1 file/no-DB): Astro + konten markdown, admin pakai Decap CMS. Tapi untuk reservasi dinamis, Next.js + Supabase lebih tepat.

---

## 7. Data Model (Skema Database)

```sql
-- admin ditangani oleh Supabase Auth (tabel auth.users)
-- hanya akun admin yang di-seed; tidak ada signup publik

paket_wisata (
  id uuid pk, slug text unique, nama text, deskripsi text,
  harga int, durasi text, min_orang int, fasilitas text[],
  foto_utama text, galeri text[], aktif bool, urutan int,
  created_at timestamptz
)

reservasi (
  id uuid pk, nama text, no_hp text, tanggal date,
  jumlah_orang int, paket_id uuid fk, catatan text,
  status text default 'baru', -- baru|dikonfirmasi|selesai|batal
  created_at timestamptz
)

galeri (
  id uuid pk, judul text, tipe text, -- foto|video
  url text, kategori text, urutan int, created_at timestamptz
)

produk (
  id uuid pk, nama text, deskripsi text, harga int,
  foto text, kontak_wa text, aktif bool, created_at timestamptz
)

artikel (
  id uuid pk, slug text unique, judul text, ringkasan text,
  konten text, cover text, penulis text, terbit bool,
  published_at timestamptz, created_at timestamptz
)

testimoni (
  id uuid pk, nama text, pesan text, rating int,
  foto text, disetujui bool default false, created_at timestamptz
)

faq ( id uuid pk, pertanyaan text, jawaban text, urutan int )

pengaturan (
  id int pk default 1, jam_operasional text, status_panen text,
  hero_judul text, hero_subjudul text, wa_admin text,
  instagram text, alamat text, maps_embed text
)
```

**Keamanan (RLS Supabase):** tabel publik → SELECT untuk semua (kecuali reservasi/testimoni belum disetujui); INSERT reservasi & testimoni → boleh publik; semua UPDATE/DELETE & manajemen → hanya user terautentikasi (admin).

---

## 8. Roadmap Pengembangan (Milestone)

<details><summary><strong>Fase 0 — Persiapan (1–2 hari)</strong></summary>

- Kumpulkan aset asli: foto kebun, video, logo, teks cerita desa, daftar paket & harga, kontak WA, lokasi maps.
- Tentukan nama brand & tagline.
- Siapkan akun Supabase & Vercel.

</details>

<details><summary><strong>Fase 1 — Fondasi & Desain (2–3 hari)</strong></summary>

- Setup Next.js + Tailwind + Framer Motion.
- Bangun design system (warna, font, komponen dasar: button, card, navbar, footer).
- Layout responsif shell (navbar + footer + mobile menu).

</details>

<details><summary><strong>Fase 2 — Halaman Publik (3–5 hari)</strong></summary>

- Beranda (hero, cerita, paket unggulan, galeri teaser, testimoni, CTA).
- Halaman Paket + Detail, Galeri, Produk, Blog, FAQ, Kontak, Tentang.
- Form Reservasi + integrasi WhatsApp.

</details>

<details><summary><strong>Fase 3 — Panel Admin (3–5 hari)</strong></summary>

- Login admin + proteksi route.
- Dashboard + CRUD semua entitas + upload gambar.
- Moderasi testimoni & kelola reservasi.

</details>

<details><summary><strong>Fase 4 — Finishing (2–3 hari)</strong></summary>

- SEO, Open Graph, sitemap, [schema.org](http://schema.org).
- Optimasi gambar & performa, uji mobile.
- Analitik, testing lintas device, deploy ke Vercel.

</details>

---

## 9. Prompt Siap-Pakai untuk Vibe Coding

<aside>
⚡

Salin prompt di bawah ke tool vibe coding (Cursor, Lovable, v0, Bolt, dll) secara berurutan. Ganti bagian dalam kurung siku sesuai data asli desa.

</aside>

### 9.1 Master Prompt (Prompt Awal / Fondasi)

```
Bangun website wisata "Petik Melon Sidorejo" (Desa Sidorejo, Padangan, Bojonegoro)
menggunakan Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion,
backend Supabase (Auth, PostgreSQL, Storage).

TUJUAN DESAIN:
- Kreatif, profesional, UX kuat, mobile-first & sempurna di desktop.
- TIDAK terlihat AI/generik: layout asimetris & organik, storytelling scroll,
  tekstur kanvas halus, aksen batik lokal, ilustrasi daun melon, micro-interaction halus.
- Palet earthy-melon: primary #F2994A, hijau kebun #3A7D44, aksen #C7E89E,
  background krem #FAF6EF, kuning #F6C453, teks coklat #2E2A26.
- Font judul berkarakter (Fraunces / Bricolage Grotesque), isi Plus Jakarta Sans.
- HINDARI: gradient ungu-biru generik, stok foto, layout kotak seragam.

BUAT DULU:
1. Setup project + Tailwind theme (warna & font di atas).
2. Komponen dasar reusable: Button, Card, Badge, Container, Navbar (transparan lalu
   solid saat scroll), Footer, MobileMenu, StatusPanenBadge, SectionHeading.
3. Layout global responsif + smooth scroll.

Selanjutnya saya akan minta halaman satu per satu.
```

### 9.2 Prompt Beranda

```
Buat halaman Beranda yang sinematik dan bercerita (scroll storytelling):
1. HERO: foto kebun melon layar penuh, judul besar berkarakter, subjudul hangat,
   2 CTA ("Pesan Sekarang" -> /reservasi, "Lihat Paket" -> /paket),
   badge status musim panen, animasi reveal halus (Framer Motion), sedikit parallax.
2. Section "Cerita Kebun Kami" layout asimetris (foto miring + teks + doodle daun).
3. Section "Paket Unggulan": 3 kartu paket (foto besar, nama, harga, durasi, tombol detail).
4. Section "Kenapa ke Sidorejo": 4 keunggulan dengan ikon custom.
5. Galeri teaser (masonry) + tombol "Lihat Semua".
6. Testimoni slider dengan rating bintang.
7. CTA penutup + peta lokasi mini.
Semua responsif, gambar lazy-load & optimasi. Sticky booking bar muncul di mobile.
```

### 9.3 Prompt Paket Wisata + Detail

```
Buat /paket (grid kartu paket dari tabel paket_wisata Supabase: foto, nama, harga,
durasi, min orang, fasilitas ringkas) dan /paket/[slug] (detail: galeri foto,
deskripsi, fasilitas lengkap, harga, tombol "Reservasi Paket Ini" -> /reservasi?paket=slug).
Data diambil dari Supabase. Tampilkan skeleton loading. Responsif & elegan.
```

### 9.4 Prompt Reservasi + WhatsApp

```
Buat /reservasi dengan form: nama, no HP, tanggal (date picker, blok tanggal lampau),
jumlah orang, pilih paket (dropdown dari Supabase), catatan.
Saat submit: simpan ke tabel reservasi (status 'baru') LALU buka link WhatsApp
ke nomor admin [NOMOR_WA] berisi ringkasan reservasi ter-format rapi.
Validasi form, tampilkan pesan sukses/gagal, anti-spam sederhana. UX ringkas < 1 menit.
```

### 9.5 Prompt Panel Admin + Login (Admin Only)

```
Buat panel admin di /admin dengan Supabase Auth. PENTING: login HANYA untuk admin,
TIDAK ADA halaman registrasi/signup publik. Akun admin dibuat manual (seed) di Supabase.
- /admin/login: form email+password, rate limit, pesan error jelas.
- Middleware: semua /admin/* selain login WAJIB terautentikasi, kalau tidak -> redirect ke login.
- /admin (Dashboard): kartu statistik (reservasi baru, reservasi minggu ini, total paket, total artikel).
- CRUD lengkap + upload gambar ke Supabase Storage untuk: Paket, Galeri, Produk, Artikel (editor rich text), Testimoni (moderasi setujui/tolak), FAQ.
- /admin/reservasi: tabel dengan filter status & ubah status (baru->dikonfirmasi->selesai->batal), tombol WhatsApp ke pemesan, ekspor CSV.
- /admin/pengaturan: jam operasional, status musim panen, teks hero, kontak WA, Instagram, alamat, embed maps.
Terapkan Row Level Security: publik hanya SELECT konten aktif + INSERT reservasi/testimoni;
semua UPDATE/DELETE/manajemen hanya untuk admin terautentikasi.
UI admin bersih, sidebar navigasi, responsif.
```

### 9.6 Prompt Halaman Sisa

```
Buat halaman: /tentang (cerita desa + foto warga, timeline singkat),
/galeri (masonry foto & video + filter kategori),
/produk (katalog UMKM olahan melon + tombol beli via WhatsApp),
/blog & /blog/[slug] (dari Supabase, dengan cover, ringkasan, konten, tanggal),
/faq (accordion), /kontak (info + form + embed Google Maps + link sosmed).
Semua ambil data dari Supabase & konsisten dengan design system.
```

### 9.7 Prompt Finishing (SEO & Performa)

```
Tambahkan: metadata & Open Graph tiap halaman, sitemap.xml, robots.txt,
JSON-LD schema.org (TouristAttraction + LocalBusiness) di beranda,
optimasi gambar (next/image, WebP/AVIF, lazy-load), font display swap,
aksesibilitas (alt text, kontras, aria, navigasi keyboard),
dan integrasi analitik (Umami atau Google Analytics).
Pastikan skor Lighthouse mobile > 90.
```

---

## 10. Checklist Aset yang Perlu Disiapkan Warga/Tim

- [x]  Logo & nama brand final
- [x]  15–30 foto asli beresolusi tinggi (kebun, proses petik, pengunjung, produk)
- [x]  2–3 video pendek (drone/handheld)
- [ ]  Teks cerita desa & profil petani
- [ ]  Daftar paket wisata + harga + fasilitas
- [ ]  Daftar produk olahan + harga
- [x]  Nomor WhatsApp admin, Instagram, alamat lengkap, link Google Maps
- [ ]  Jam operasional & perkiraan musim panen
- [x]  3–5 testimoni awal

---

<aside>
✅

**Langkah berikutnya:** Kumpulkan aset di bagian 10, lalu jalankan prompt 9.1 → 9.7 berurutan di tool vibe coding. Setiap prompt bisa kamu iterasi sampai tampilannya pas.

</aside>