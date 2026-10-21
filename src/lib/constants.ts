import { PaketWisata, ProdukUMKM, ArtikelBlog, Testimoni, FAQItem, PengaturanSitus, GaleriItem } from './types';

export const PENGATURAN_DEFAULT: PengaturanSitus = {
  id: 1,
  jam_operasional: 'Senin - Minggu: 07.30 - 17.00 WIB',
  status_panen: 'siap_petik',
  status_panen_teks: 'Kebun Sedang Musim Panen Panen Melon Premium!',
  hero_judul: 'Nikmati Sensasi Petik Melon Fresh Langsung Dari Greenhouse',
  hero_subjudul: 'Agrowisata Melon Premium Mirah Farm di Desa Sidorejo, Padangan, Bojonegoro. Rasakan manisnya kebun hidroponik berteknologi tinggi bersama keluarga & rekan.',
  wa_admin: '+6282253070639',
  instagram: 'mirah_farm',
  alamat: 'Jl. Bengawan Mbenang, Dusun Mbenang, Sidorejo, Kec. Padangan, Kabupaten Bojonegoro, Jawa Timur 62162',
  maps_embed: 'https://maps.google.com/maps?q=Mirah%20Farm%20Desa%20Sidorejo%20Padangan%20Bojonegoro&t=&z=16&ie=UTF8&iwloc=&output=embed',
};

export const PAKET_WISATA_DEFAULT: PaketWisata[] = [
  {
    id: '1',
    slug: 'paket-perorangan-keluarga',
    nama: 'Paket Jelajah & Petik Mandiri',
    deskripsi: 'Cocok untuk kunjungan keluarga atau perseorangan. Dapatkan akses penuh ke greenhouse hidroponik, panduan pemilihan melon termanis, gratis mencicipi melon segar, serta bonus 1 kg melon pilihan untuk dibawa pulang.',
    harga: 35000,
    durasi: '1 - 2 Jam',
    min_orang: 1,
    fasilitas: [
      'Akses masuk Greenhouse Melon Premium',
      'Edukasi singkat cara budidaya & memilih melon manis',
      'Peralatan petik (keranjang & gunting steril)',
      'Tester melon manis gratis di lokasi',
      'Termasuk 1 Kg Melon Segar Pilihan',
      'Free spot foto instagramable sepuasnya',
      'Fasilitas Gazebo & Tempat Istirahat'
    ],
    foto_utama: '/assets/photo/IMG_5443.PNG',
    galeri: ['/assets/photo/IMG_5443.PNG', '/assets/photo/IMG_5446.PNG', '/assets/photo/IMG_5448.PNG', '/assets/photo/IMG_5451.PNG'],
    aktif: true,
    urutan: 1,
  },
  {
    id: '2',
    slug: 'paket-rombongan-edukasi',
    nama: 'Paket Rombongan & Edukasi Tani',
    deskripsi: 'Dirancang khusus untuk rombongan sekolah, instansi, atau komunitas. Termasuk tour kebun bersama agronomis berpengalaman, workshop hidroponik melon, welcome drink es melon segar, dan petik melon.',
    harga: 65000,
    durasi: '2 - 3 Jam',
    min_orang: 10,
    fasilitas: [
      'Welcome Drink Es Melon Segar',
      'Pemandu Wisata Agrowisata Dedikatif',
      'Materi Edukasi Sistem Hydroponik Greenhouse',
      'Praktek Langsung Petik Melon Premium',
      'Gratis 1.5 Kg Melon hasil petik per orang',
      'Sertifikat Peserta Edukasi (Opsional Sekolah)',
      'Akses Saung Gazebo Utama & Sound System'
    ],
    foto_utama: '/assets/photo/IMG_5455.PNG',
    galeri: ['/assets/photo/IMG_5455.PNG', '/assets/photo/IMG_5447.PNG', '/assets/photo/IMG_5454.PNG', '/assets/photo/IMG_5457.PNG'],
    aktif: true,
    urutan: 2,
  },
  {
    id: '3',
    slug: 'paket-vip-panen-eksklusif',
    nama: 'Paket VIP Experience & Gourmet Melon',
    deskripsi: 'Pengalaman istimewa memetik varietas unggul melon Inthanon / Golden Emerald dengan hidangan olahan manis khas Mirah Farm, foto candid resolusi tinggi, serta fasilitas tempat bersantai privat.',
    harga: 120000,
    durasi: '3 - 4 Jam',
    min_orang: 2,
    fasilitas: [
      'Privat Tour Kebun dengan Owner/Ahli Tani',
      'Petik Varietas Premium (Golden / Inthanon)',
      'Termasuk 3 Kg Melon Premium Pilihan',
      'Paket Olahan Melon (Jus + Keripik Melon)',
      'Layanan Penimbangan & Pengemasan Eksklusif',
      'Penggunaan VIP Gazebo & Souvenir Spesial'
    ],
    foto_utama: '/assets/photo/IMG_5452.PNG',
    galeri: ['/assets/photo/IMG_5452.PNG', '/assets/photo/IMG_5460.PNG', '/assets/photo/IMG_5459.PNG'],
    aktif: true,
    urutan: 3,
  }
];

export const PRODUK_UMKM_DEFAULT: ProdukUMKM[] = [
  {
    id: '1',
    nama: 'Melon Fresh Inthanon Premium (Per Kg)',
    deskripsi: 'Melon berbintik jaring emas, daging oranye kerenyahan tinggi dan brix manis di atas 14%. Hasil panen greenhouse hidroponik bebas pestisida sintetis.',
    harga: 25000,
    foto: '/assets/photo/IMG_5459.PNG',
    kontak_wa: '+6282253070639',
    aktif: true,
    stok_status: 'tersedia'
  },
  {
    id: '2',
    nama: 'Melon Golden Emerald Sweet (Per Kg)',
    deskripsi: 'Melon berserat kuning mulus dengan aroma wangi buah khas yang sangat menggugah selera.',
    harga: 28000,
    foto: '/assets/photo/IMG_5460.PNG',
    kontak_wa: '+6282253070639',
    aktif: true,
    stok_status: 'tersedia'
  },
  {
    id: '3',
    nama: 'Jus Melon Segar Mirah Farm (350ml)',
    deskripsi: 'Jus murni 100% buah melon segar tanpa tambahan pemanis buatan. Dibuat langsung di saung kebun saat dipesan.',
    harga: 12000,
    foto: '/assets/photo/IMG_5447.PNG',
    kontak_wa: '+6282253070639',
    aktif: true,
    stok_status: 'tersedia'
  },
  {
    id: '4',
    nama: 'Keripik Melon Olahan Sidorejo (150g)',
    deskripsi: 'Keripik renyah rasa original manis buah melon hasil inovasi olahan UMKM warga Desa Sidorejo.',
    harga: 18000,
    foto: '/assets/photo/IMG_5458.PNG',
    kontak_wa: '+6282253070639',
    aktif: true,
    stok_status: 'tersedia'
  }
];

export const GALERI_DEFAULT: GaleriItem[] = [
  {
    id: '1',
    judul: 'Kunjungan Wisatawan Asing di Greenhouse',
    tipe: 'foto',
    url: '/assets/photo/IMG_5443.PNG',
    kategori: 'pengunjung',
    urutan: 1
  },
  {
    id: '2',
    judul: 'Panen Melon Berhasil Dibawa Pulang',
    tipe: 'foto',
    url: '/assets/photo/IMG_5446.PNG',
    kategori: 'pengunjung',
    urutan: 2
  },
  {
    id: '3',
    judul: 'Suasana Santai di Gazebo Bersama Kawan',
    tipe: 'foto',
    url: '/assets/photo/IMG_5447.PNG',
    kategori: 'kegiatan',
    urutan: 3
  },
  {
    id: '4',
    judul: 'Foto Ceria di Lorong Tanaman Melon',
    tipe: 'foto',
    url: '/assets/photo/IMG_5448.PNG',
    kategori: 'pengunjung',
    urutan: 4
  },
  {
    id: '5',
    judul: 'Pengalaman Petik Melon Pasangan Wisatawan',
    tipe: 'foto',
    url: '/assets/photo/IMG_5449.PNG',
    kategori: 'pengunjung',
    urutan: 5
  },
  {
    id: '6',
    judul: 'Silaturahmi Pengelola Kebun & Pengunjung',
    tipe: 'foto',
    url: '/assets/photo/IMG_5450.PNG',
    kategori: 'kegiatan',
    urutan: 6
  },
  {
    id: '7',
    judul: 'Spot Foto Estetik Tanaman Melon Hidroponik',
    tipe: 'foto',
    url: '/assets/photo/IMG_5451.PNG',
    kategori: 'kebun',
    urutan: 7
  },
  {
    id: '8',
    judul: 'Rombongan Ibu-Ibu Berburu Melon Segar',
    tipe: 'foto',
    url: '/assets/photo/IMG_5452.PNG',
    kategori: 'pengunjung',
    urutan: 8
  },
  {
    id: '9',
    judul: 'Gunting & Keranjang Petik Siap Dipakai',
    tipe: 'foto',
    url: '/assets/photo/IMG_5453.PNG',
    kategori: 'kegiatan',
    urutan: 9
  },
  {
    id: '10',
    judul: 'Kunjungan Rombongan Busana Putih Elegansi',
    tipe: 'foto',
    url: '/assets/photo/IMG_5454.PNG',
    kategori: 'pengunjung',
    urutan: 10
  },
  {
    id: '11',
    judul: 'Kunjungan Resmi Instansi & Perangkat',
    tipe: 'foto',
    url: '/assets/photo/IMG_5455.PNG',
    kategori: 'kegiatan',
    urutan: 11
  },
  {
    id: '12',
    judul: 'Petik Melon Langsung dari Tangkai Utama',
    tipe: 'foto',
    url: '/assets/photo/IMG_5456.PNG',
    kategori: 'kebun',
    urutan: 12
  },
  {
    id: '13',
    judul: 'Inspeksi Kualitas Buah Bersama Petugas',
    tipe: 'foto',
    url: '/assets/photo/IMG_5457.PNG',
    kategori: 'kegiatan',
    urutan: 13
  },
  {
    id: '14',
    judul: 'Proses Penimbangan dan Transaksi di Kasir',
    tipe: 'foto',
    url: '/assets/photo/IMG_5458.PNG',
    kategori: 'produk',
    urutan: 14
  },
  {
    id: '15',
    judul: 'Melon Premium Jumbo Hampir 3 Kilogram',
    tipe: 'foto',
    url: '/assets/photo/IMG_5459.PNG',
    kategori: 'produk',
    urutan: 15
  },
  {
    id: '16',
    judul: 'Melon Golden & Inthanon Siap Dikonsumsi',
    tipe: 'foto',
    url: '/assets/photo/IMG_5460.PNG',
    kategori: 'produk',
    urutan: 16
  },
  {
    id: '17',
    judul: 'Suasana Petik Melon Greenhouse Video 1',
    tipe: 'video',
    url: '/assets/videos/SaveClip.App_AQM-Xz8KE8P5GzbtY1PpykhZnQS8sXT4jJJiww-XaRjaBnkwarrZK0H6Kn9d0hXLfboj-c5P73194JiSlQkPAWuFmVvBHIWey-bPrfI.mp4',
    kategori: 'kebun',
    urutan: 17
  },
  {
    id: '18',
    judul: 'Keseruan Pengunjung Memetik Melon Video 2',
    tipe: 'video',
    url: '/assets/videos/SaveClip.App_AQM9RflZr2XeHQO_-cJUqSHkeDhNkaM_g8nu71tUixfWXeu41IzOvkMOPB-9M_D6_Xu2V7xG2x-vdloDjzojCFtBoDRUHI-F59NjunU.mp4',
    kategori: 'kegiatan',
    urutan: 18
  },
  {
    id: '19',
    judul: 'Keindahan Kebun Melon Mirah Farm Video 3',
    tipe: 'video',
    url: '/assets/videos/SaveClip.App_AQPx27Y3gzetdjT6qfWG8PJU7nl8sqBcwXFgzIwuaEdT6o6YlchKlwd0G8NImLEQd-lDB4XkXeUgX6ZIYQRm2ed_ABjZrHmAh4_OrPw.mp4',
    kategori: 'kebun',
    urutan: 19
  }
];

export const TESTIMONI_DEFAULT: Testimoni[] = [
  {
    id: '1',
    nama: 'Bunda Rina & Rombongan',
    asal: 'Bojonegoro Kota',
    pesan: 'Melonnya rasanya manis banget dan segar! Anak-anak senang sekali dipandu cara memetik melon yang benar. Saung rest areanya juga adem dan bersih.',
    rating: 5,
    foto: '/assets/photo/IMG_5447.PNG',
    disetujui: true,
    created_at: '2026-07-10'
  },
  {
    id: '2',
    nama: 'Mr. David & Family',
    asal: 'Wisatawan Mancanegara',
    pesan: 'Amazing greenhouse experience in Sidorejo! The melons are exceptionally sweet, crisp, and the farmers are so welcoming and kind.',
    rating: 5,
    foto: '/assets/photo/IMG_5443.PNG',
    disetujui: true,
    created_at: '2026-07-15'
  },
  {
    id: '3',
    nama: 'Dyah Septi & Teman-Teman',
    asal: 'Padangan',
    pesan: 'Foto-foto di dalam greenhouse estetik banget! Melon Inthanon yang kita petik ditimbang dapet 2.9kg jumbo dan rasanya super crunchy.',
    rating: 5,
    foto: '/assets/photo/IMG_5451.PNG',
    disetujui: true,
    created_at: '2026-07-18'
  }
];

export const ARTIKEL_DEFAULT: ArtikelBlog[] = [
  {
    id: '1',
    slug: '5-tips-memilih-melon-hidroponik-paling-manis',
    judul: '5 Tips Cara Memilih Melon Hidroponik Paling Manis dan Segar Saat Panen',
    ringkasan: 'Ingin mendapatkan buah melon dengan brix manis maksimal saat berkunjung ke Mirah Farm? Simak panduan praktis dari pengelola kebun berikut ini.',
    konten: `
      <h2>1. Perhatikan Jaring (Netting) Pada Kulit Buah</h2>
      <p>Melon jenis Inthanon memiliki jaring-jaring tebal dan rapat. Semakin rapat dan menonjol pola jaringnya, mengindikasikan tingkat kematangan dan kadar gula yang sudah optimal.</p>

      <h2>2. Cium Aroma Harum Khas Melon</h2>
      <p>Melon matang sempurna akan mengeluarkan aroma wangi buah yang lembut di sekitar tangkai ubi. Jika aromanya sudah tercium manis, artinya melon siap dipetik.</p>

      <h2>3. Periksa Lingkaran Retakan Tangkai</h2>
      <p>Pada melon greenhouse, perhatikan tangkai pembawa buah. Tangkai yang mulai mengering sedikit dan membentuk retakan alami kecil menandakan suplay nutrisi telah diserap penuh oleh buah.</p>

      <h2>4. Perhatikan Bobot Buah</h2>
      <p>Pilihlah buah yang terasa berat dan padat saat diangkat dibanding ukurannya. Bobot padat menandakan kadar air dan kerapatan serat daging buah yang kaya serat.</p>

      <h2>5. Tanya dan Konsultasi Pada Tim Mirah Farm</h2>
      <p>Saat berkunjung, jangan ragu meminta bantuan petugas kebun kami. Tim kami siap mengukur kadar gula (Brix) dengan alat Refraktometer untuk membuktikan manisnya!</p>
    `,
    cover: '/assets/photo/IMG_5459.PNG',
    penulis: 'Tim KKN Sidorejo & Mirah Farm',
    terbit: true,
    published_at: '2026-07-20'
  },
  {
    id: '2',
    slug: 'keunggulan-sistem-greenhouse-hidroponik-melon',
    judul: 'Mengenal Teknologi Greenhouse Hidroponik Melon di Desa Sidorejo',
    ringkasan: 'Bagaimana budidaya melon hidroponik di Mirah Farm mampu menghasilkan buah premium berkualitas tinggi bebas pestisida berbahaya?',
    konten: `
      <h2>Budidaya Modern Berbasis Presisi Nutrisi</h2>
      <p>Di Mirah Farm Desa Sidorejo, kami menerapkan sistem greenhouse tertutup yang menjaga tanaman dari serangan hama tanaman tanpa mengandalkan semprotan kimia sintetis berbahaya.</p>
      
      <h2>Efisiensi Air dan Pengaturan Suhu</h2>
      <p>Sistem hidroponik mengalirkan nutrisi langsung ke akar tanaman dengan terukur. Pengaturan kelembaban dan sirkulasi udara di dalam greenhouse memastikan melon tumbuh maksimal dalam suhu optimum.</p>

      <h2>Hasil Panen Lebih Manis & Higienis</h2>
      <p>Karena tidak menyentuh tanah secara langsung, buah melon tetap bersih, higienis, dan terlindungi hingga siap dipetik langsung oleh para pengunjung wisata.</p>
    `,
    cover: '/assets/photo/IMG_5457.PNG',
    penulis: 'Pengelola Mirah Farm',
    terbit: true,
    published_at: '2026-07-18'
  }
];

export const FAQ_DEFAULT: FAQItem[] = [
  {
    id: '1',
    pertanyaan: 'Berapa harga tiket masuk ke Wisata Petik Melon Mirah Farm?',
    jawaban: 'Akses masuk lokasi sangat terjangkau mulai dari Rp 35.000 per orang untuk paket mandiri (sudah termasuk edukasi, tester melon, dan hasil petik 1 kg buah melon bawa pulang).',
    urutan: 1
  },
  {
    id: '2',
    pertanyaan: 'Apakah perlu melakukan reservasi terlebih dahulu sebelum datang?',
    jawaban: 'Kami sangat menyarankan reservasi online melalui form di website ini atau kontak WhatsApp admin minimal 1 hari sebelumnya agar ketersediaan buah dan slot pemandu dapat disiapkan secara optimal.',
    urutan: 2
  },
  {
    id: '3',
    pertanyaan: 'Apakah anak-anak dan lansia nyaman berkunjung?',
    jawaban: 'Sangat nyaman! Jalur greenhouse menggunakan pipa hidroponik rapi dan bersih dari lumpur tanah. Tersedia saung gazebo luas untuk bersantai keluarga.',
    urutan: 3
  },
  {
    id: '4',
    pertanyaan: 'Kapan jam operasional buka dan tutup kebun?',
    jawaban: 'Mirah Farm buka setiap hari Senin sampai Minggu mulai pukul 07.30 WIB hingga 17.00 WIB.',
    urutan: 4
  },
  {
    id: '5',
    pertanyaan: 'Apakah tersedia fasilitas parkir dan tempat ibadah?',
    jawaban: 'Ya, tersedia area parkir luas untuk mobil maupun sepeda motor, serta fasilitas musholla dan toilet bersih bagi pengunjung.',
    urutan: 5
  }
];
