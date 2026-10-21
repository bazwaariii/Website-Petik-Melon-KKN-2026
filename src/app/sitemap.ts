import { MetadataRoute } from 'next';
import { PAKET_WISATA_DEFAULT, ARTIKEL_DEFAULT } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://petikmelon-sidorejo.desa.id';

  const routes = [
    '',
    '/tentang',
    '/paket',
    '/reservasi',
    '/galeri',
    '/produk',
    '/blog',
    '/faq',
    '/kontak',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const paketRoutes = PAKET_WISATA_DEFAULT.map((paket) => ({
    url: `${baseUrl}/paket/${paket.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogRoutes = ARTIKEL_DEFAULT.map((artikel) => ({
    url: `${baseUrl}/blog/${artikel.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...paketRoutes, ...blogRoutes];
}
