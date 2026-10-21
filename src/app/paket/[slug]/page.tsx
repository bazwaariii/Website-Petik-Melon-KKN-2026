import React from 'react';
import DetailPaketClient from './DetailPaketClient';

export function generateStaticParams() {
  return [
    { slug: 'paket-perorangan-keluarga' },
    { slug: 'paket-edukasi-rombongan' },
    { slug: 'paket-vip-exclusive' },
  ];
}

export default function DetailPaketPage({ params }: { params: { slug: string } }) {
  return <DetailPaketClient slug={params.slug} />;
}
