import type { Metadata } from 'next';
import './globals.css';
import { AppLayoutWrapper } from '@/components/layout/AppLayoutWrapper';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  metadataBase: new URL('https://petikmelon-sidorejo.desa.id'),
  title: 'Mirah Farm Sidorejo',
  description: 'Wisata agrowisata petik melon hidroponik langsung di greenhouse Desa Sidorejo, Padangan, Bojonegoro.',
  keywords: [
    'Wisata Petik Melon Bojonegoro',
    'Mirah Farm Sidorejo',
    'Agrowisata Padangan',
    'Greenhouse Melon Hidroponik',
    'Petik Melon Bojonegoro',
    'Melon Inthanon Sidorejo',
    'KKN 2026 Sidorejo'
  ],
  authors: [{ name: 'Tim Pengabdian KKN 2026 Desa Sidorejo' }],
  openGraph: {
    title: 'Mirah Farm Sidorejo',
    description: 'Nikmati manisnya melon hidroponik premium dipetik langsung dari pohonnya di Desa Sidorejo, Padangan, Bojonegoro.',
    url: 'https://petikmelon-sidorejo.desa.id',
    siteName: 'Mirah Farm Sidorejo',
    images: [
      {
        url: '/assets/photo/IMG_5443.PNG',
        width: 1200,
        height: 630,
        alt: 'Wisata Petik Melon Mirah Farm Sidorejo',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="icon" href="/assets/logo.png" />
      </head>
      <body className="bg-canvas text-melon-dark min-h-screen flex flex-col font-sans antialiased selection:bg-melon-primary selection:text-white">
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <AppLayoutWrapper>{children}</AppLayoutWrapper>
      </body>
    </html>
  );
}
