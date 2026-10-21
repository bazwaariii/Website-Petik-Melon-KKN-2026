import React from 'react';
import DetailArtikelClient from './DetailArtikelClient';

export function generateStaticParams() {
  return [
    { slug: 'cara-memilih-melon-manis-segar' },
    { slug: 'keunggulan-greenhouse-hidroponik-sidorejo' },
    { slug: 'manfaat-kesehatan-buah-melon-premium' },
  ];
}

export default function DetailArtikelPage({ params }: { params: { slug: string } }) {
  return <DetailArtikelClient slug={params.slug} />;
}
