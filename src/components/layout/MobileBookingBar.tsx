'use client';

import React from 'react';
import Link from 'next/link';
import { CalendarCheck, MessageSquare } from 'lucide-react';
import { PENGATURAN_DEFAULT } from '@/lib/constants';

export const MobileBookingBar = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-melon-dark/95 backdrop-blur-md text-white p-3 border-t border-melon-primary/30 flex items-center justify-between gap-2 shadow-2xl">
      <a
        href={`https://wa.me/6282253070639?text=${encodeURIComponent('Halo Admin Mirah Farm Sidorejo, saya mau reservasi petik melon.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl font-bold text-xs shadow-md transition-transform active:scale-95"
      >
        <MessageSquare className="w-4 h-4 shrink-0" />
        <span>Chat WA Admin</span>
      </a>

      <Link
        href="/reservasi"
        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-melon-primary hover:bg-melon-600 text-white rounded-xl font-bold text-xs shadow-md transition-transform active:scale-95"
      >
        <CalendarCheck className="w-4 h-4 shrink-0" />
        <span>Pesan Tempat</span>
      </Link>
    </div>
  );
};
