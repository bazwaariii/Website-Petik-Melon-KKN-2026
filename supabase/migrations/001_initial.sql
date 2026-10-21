-- SQL Schema & Initial Seed Data for Wisata Petik Melon Sidorejo (Mirah Farm)

CREATE TABLE IF NOT EXISTS paket_wisata (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  nama TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  harga INT NOT NULL,
  durasi TEXT NOT NULL,
  min_orang INT NOT NULL DEFAULT 1,
  fasilitas TEXT[] NOT NULL DEFAULT '{}',
  foto_utama TEXT NOT NULL,
  galeri TEXT[] NOT NULL DEFAULT '{}',
  aktif BOOLEAN NOT NULL DEFAULT true,
  urutan INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reservasi (
  id TEXT PRIMARY KEY,
  nama TEXT NOT NULL,
  no_hp TEXT NOT NULL,
  tanggal DATE NOT NULL,
  jumlah_orang INT NOT NULL DEFAULT 1,
  paket_id TEXT,
  catatan TEXT,
  status TEXT NOT NULL DEFAULT 'baru',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS galeri (
  id TEXT PRIMARY KEY,
  judul TEXT NOT NULL,
  tipe TEXT NOT NULL DEFAULT 'foto',
  url TEXT NOT NULL,
  kategori TEXT NOT NULL DEFAULT 'kebun',
  urutan INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS produk (
  id TEXT PRIMARY KEY,
  nama TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  harga INT NOT NULL,
  foto TEXT NOT NULL,
  kontak_wa TEXT NOT NULL,
  aktif BOOLEAN NOT NULL DEFAULT true,
  stok_status TEXT NOT NULL DEFAULT 'tersedia',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS artikel (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  judul TEXT NOT NULL,
  ringkasan TEXT NOT NULL,
  konten TEXT NOT NULL,
  cover TEXT NOT NULL,
  penulis TEXT NOT NULL DEFAULT 'Admin Mirah Farm',
  terbit BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimoni (
  id TEXT PRIMARY KEY,
  nama TEXT NOT NULL,
  asal TEXT NOT NULL,
  pesan TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  foto TEXT,
  disetujui BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS faq (
  id TEXT PRIMARY KEY,
  pertanyaan TEXT NOT NULL,
  jawaban TEXT NOT NULL,
  urutan INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS pengaturan (
  id INT PRIMARY KEY DEFAULT 1,
  jam_operasional TEXT NOT NULL,
  status_panen TEXT NOT NULL DEFAULT 'siap_petik',
  status_panen_teks TEXT NOT NULL,
  hero_judul TEXT NOT NULL,
  hero_subjudul TEXT NOT NULL,
  wa_admin TEXT NOT NULL,
  instagram TEXT NOT NULL,
  alamat TEXT NOT NULL,
  maps_embed TEXT NOT NULL
);

-- Enable RLS and add public access policies for all tables
ALTER TABLE paket_wisata ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE galeri ENABLE ROW LEVEL SECURITY;
ALTER TABLE produk ENABLE ROW LEVEL SECURITY;
ALTER TABLE artikel ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimoni ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE pengaturan ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public full access paket_wisata" ON paket_wisata;
CREATE POLICY "Public full access paket_wisata" ON paket_wisata FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access reservasi" ON reservasi;
CREATE POLICY "Public full access reservasi" ON reservasi FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access galeri" ON galeri;
CREATE POLICY "Public full access galeri" ON galeri FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access produk" ON produk;
CREATE POLICY "Public full access produk" ON produk FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access artikel" ON artikel;
CREATE POLICY "Public full access artikel" ON artikel FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access testimoni" ON testimoni;
CREATE POLICY "Public full access testimoni" ON testimoni FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access faq" ON faq;
CREATE POLICY "Public full access faq" ON faq FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access pengaturan" ON pengaturan;
CREATE POLICY "Public full access pengaturan" ON pengaturan FOR ALL USING (true) WITH CHECK (true);

-- Insert Default Seed Data
INSERT INTO paket_wisata (id, slug, nama, deskripsi, harga, durasi, min_orang, fasilitas, foto_utama, galeri, aktif, urutan)
VALUES
('1', 'paket-perorangan-keluarga', 'Paket Jelajah & Petik Mandiri', 'Nikmati kebebasan berkeliling greenhouse hidroponik modern, memilih buah melon favorit dari pohon, dan langsung menimbang di tempat.', 35000, '1 - 2 Jam', 1, ARRAY['Akses Lengkap Greenhouse', 'Gratis Tester Melon Fresh', 'Peralatan Gunting & Keranjang', 'Pemanduan Singkat Cara Petik', 'Spot Foto Instagramable'], '/assets/photo/IMG_5443.PNG', ARRAY['/assets/photo/IMG_5443.PNG', '/assets/photo/IMG_5446.PNG'], true, 1),
('2', 'paket-edukasi-rombongan', 'Paket Edukasi Tani & Rombongan', 'Sangat cocok untuk rombongan sekolah, instansi, atau komunitas. Mendapatkan materi edukasi sistem hidroponik presisi dan welcome drink.', 50000, '2 - 3 Jam', 10, ARRAY['Semua Fasilitas Paket Mandiri', 'Welcome Drink Jus Melon Segar', 'Materi Edukasi Budidaya Hidroponik', 'Sertifikat Kunjungan Rombongan', 'Area Pendopo/Saung Khusus Rombongan'], '/assets/photo/IMG_5446.PNG', ARRAY['/assets/photo/IMG_5446.PNG', '/assets/photo/IMG_5459.PNG'], true, 2),
('3', 'paket-vip-exclusive', 'Paket VIP Private Experience', 'Pengalaman eksklusif petik melon didampingi langsung oleh Agronomis ahli kebun, membawa pulang 1 kg melon grade A pilihan + hampers souvenir.', 120000, '2 Jam', 2, ARRAY['Semua Fasilitas Paket Edukasi', 'Pendampingan Personal Agronomis', 'Gratis 1 kg Melon Premium Grade A', 'Souvenir Olahan Melon Sidorejo', 'Voucher Diskon Pembelian Berikutnya'], '/assets/photo/IMG_5459.PNG', ARRAY['/assets/photo/IMG_5459.PNG', '/assets/photo/IMG_5457.PNG'], true, 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO produk (id, nama, deskripsi, harga, foto, kontak_wa, aktif, stok_status)
VALUES
('prod-1', 'Jus Melon Fresh Inthanon (500ml)', 'Jus murni dari perasan buah melon Inthanon pilihan tanpa pemanis buatan. Segar & kaya vitamin.', 15000, '/assets/photo/IMG_5459.PNG', '+6282253070639', true, 'tersedia'),
('prod-2', 'Keripik Melon Krenyes Sidorejo', 'Olahan keripik buah melon renyah gurih dengan teknologi vacuum frying. Awet & cocok untuk oleh-oleh.', 20000, '/assets/photo/IMG_5457.PNG', '+6282253070639', true, 'tersedia'),
('prod-3', 'Dodol Melon Lembut Desa Sidorejo', 'Makanan manis tradisional hasil olahan warga lokal Desa Sidorejo. Tekstur kenyal dengan aroma khas melon.', 18000, '/assets/photo/IMG_5446.PNG', '+6282253070639', true, 'tersedia'),
('prod-4', 'Melon Inthanon Grade A (Per Kg)', 'Buah melon utuh matang pohon dengan tingkat kemanisan Brix 14%+. Daging buah crunchy manis murni.', 35000, '/assets/photo/IMG_5443.PNG', '+6282253070639', true, 'tersedia')
ON CONFLICT (id) DO NOTHING;

INSERT INTO galeri (id, judul, tipe, url, kategori, urutan)
VALUES
('gal-1', 'Greenhouse Hidroponik Modern Mirah Farm', 'foto', '/assets/photo/IMG_5443.PNG', 'kebun', 1),
('gal-2', 'Antusiasme Pengunjung Petik Melon', 'foto', '/assets/photo/IMG_5446.PNG', 'pengunjung', 2),
('gal-3', 'Buah Melon Inthanon Siap Panen', 'foto', '/assets/photo/IMG_5457.PNG', 'kebun', 3),
('gal-4', 'Hasil Penimbangan Buah Segar', 'foto', '/assets/photo/IMG_5459.PNG', 'produk', 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO artikel (id, slug, judul, ringkasan, konten, cover, penulis, terbit, published_at)
VALUES
('art-1', 'cara-memilih-melon-manis-segar', '5 Tips Memilih Buah Melon Matang Sempurna dari Pohonnya', 'Pelajari petunjuk praktis dari agronomis Mirah Farm untuk mengetahui ciri melon yang renyah dan manis manis Brix tinggi.', '<p>Buah melon yang matang di pohon memiliki aroma harum yang khas dan serat jaring yang rapat. Di Mirah Farm, kami memastikan setiap melon dipetik pada puncak kemanisannya.</p><p>Perhatikan bagian tangkai dan warna dasar kulit melon. Tangkai yang mulai mengering menandakan buah telah siap dipetik dan kaya nutrisi alami.</p>', '/assets/photo/IMG_5443.PNG', 'Tim Agronomis Mirah Farm', true, '2026-07-20'),
('art-2', 'keunggulan-greenhouse-hidroponik-sidorejo', 'Mengenal Teknologi Greenhouse Hidroponik Presisi Sidorejo', 'Inovasi pertanian modern Desa Sidorejo dalam menjaga kualitas melon bebas pestisida dan higienis sepanjang tahun.', '<p>Sistem hidroponik menggunakan nutrisi terukur yang dialirkan langsung ke akar tanaman secara otomatis. Hal ini menjaga konsistensi rasa manis buah melon.</p><p>Dengan berada di dalam greenhouse tertutup, tanaman terlindungi dari hama dan hujan sehingga bebas dari penggunaan pestisida kimia berbahaya.</p>', '/assets/photo/IMG_5446.PNG', 'Pengurus KKN 2026 Sidorejo', true, '2026-07-18')
ON CONFLICT (id) DO NOTHING;

INSERT INTO testimoni (id, nama, asal, pesan, rating, foto, disetujui, created_at)
VALUES
('testi-1', 'Bunda Rina Setyowati', 'Wisatawan Bojonegoro', 'Tempatnya sangat bersih dan rapi! Anak-anak senang sekali bisa petik melon sendiri langsung dari pohonnya. Melonnya manis renyah banget!', 5, '/assets/photo/IMG_5446.PNG', true, '2026-07-21T08:00:00Z'),
('testi-2', 'Pak Supriyanto', 'Rombongan Komunitas Cepu', 'Pelayanan admin ramah banget. Saung bersih, dapet welcome drink jus melon yang seger banget. Recommended buat liburan keluarga!', 5, '/assets/photo/IMG_5459.PNG', true, '2026-07-20T14:30:00Z')
ON CONFLICT (id) DO NOTHING;

INSERT INTO faq (id, pertanyaan, jawaban, urutan)
VALUES
('faq-1', 'Berapa harga tiket masuk ke Wisata Petik Melon Mirah Farm?', 'Tiket masuk menyesuaikan dengan paket wisata yang Anda pilih (mulai dari Rp 35.000/orang sudah termasuk akses greenhouse dan gratis tester melon segar).', 1),
('faq-2', 'Apakah perlu melakukan reservasi terlebih dahulu sebelum datang?', 'Sangat disarankan melakukan reservasi online melalui website agar kami dapat mengamankan slot jam kedatangan Anda dan menjaga kenyamanan di dalam greenhouse.', 2),
('faq-3', 'Apakah melon bisa dibeli dan dibawa pulang?', 'Bisa! Anda dapat memetik sendiri melon di kebun, kemudian ditimbang di kasir dengan harga per kg yang terjangkau.', 3),
('faq-4', 'Di mana lokasi persis Kebun Melon Mirah Farm?', 'Berlokasi di Jl. Bengawan Mbenang, Dusun Mbenang, Desa Sidorejo, Kec. Padangan, Kab. Bojonegoro (Dapat dibuka via Google Maps: Mirah Farm Sidorejo).', 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO pengaturan (id, jam_operasional, status_panen, status_panen_teks, hero_judul, hero_subjudul, wa_admin, instagram, alamat, maps_embed)
VALUES
(1, 'Senin - Minggu: 07.30 - 17.00 WIB', 'siap_petik', 'Kebun Sedang Musim Panen Melon Premium!', 'Petik Melon Fresh Langsung Dari Pohonnya', 'Agrowisata Melon Premium Mirah Farm di Desa Sidorejo, Padangan, Bojonegoro. Rasakan manisnya kebun hidroponik berteknologi tinggi bersama keluarga & rekan.', '+6282253070639', 'mirah_farm', 'Jl. Bengawan Mbenang, Dusun Mbenang, Sidorejo, Kec. Padangan, Kabupaten Bojonegoro, Jawa Timur 62162', 'https://maps.google.com/maps?q=Mirah%20Farm%20Desa%20Sidorejo%20Padangan%20Bojonegoro&t=&z=16&ie=UTF8&iwloc=&output=embed')
ON CONFLICT (id) DO UPDATE SET
  jam_operasional = EXCLUDED.jam_operasional,
  status_panen = EXCLUDED.status_panen,
  wa_admin = EXCLUDED.wa_admin,
  alamat = EXCLUDED.alamat;
