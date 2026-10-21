'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck,
  Package,
  Image as ImageIcon,
  ShoppingBag,
  FileText,
  MessageSquareQuote,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on login page, render without sidebar shell
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-canvas">{children}</div>;
  }

  const handleLogout = () => {
    // Clear cookies & local session
    document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    toast.success('Berhasil keluar dari panel admin.');
    router.push('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Kelola Reservasi', href: '/admin/reservasi', icon: <CalendarCheck className="w-4 h-4" /> },
    { label: 'Paket Wisata', href: '/admin/paket', icon: <Package className="w-4 h-4" /> },
    { label: 'Galeri Foto & Video', href: '/admin/galeri', icon: <ImageIcon className="w-4 h-4" /> },
    { label: 'Produk Olahan', href: '/admin/produk', icon: <ShoppingBag className="w-4 h-4" /> },
    { label: 'Artikel & Blog', href: '/admin/blog', icon: <FileText className="w-4 h-4" /> },
    { label: 'Moderasi Testimoni', href: '/admin/testimoni', icon: <MessageSquareQuote className="w-4 h-4" /> },
    { label: 'Kelola FAQ', href: '/admin/faq', icon: <HelpCircle className="w-4 h-4" /> },
    { label: 'Pengaturan Situs', href: '/admin/pengaturan', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800 font-sans">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-64 bg-melon-dark text-white flex-col justify-between p-4 shrink-0 shadow-xl">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2 py-3 border-b border-white/10">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-melon-accent">
              <Image src="/assets/logo.png" alt="Admin Logo" fill className="object-cover" />
            </div>
            <div>
              <span className="font-heading text-sm font-bold block text-white">PANEL ADMIN</span>
              <span className="text-[10px] text-melon-accent font-medium">Mirah Farm Sidorejo</span>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-melon-primary text-white shadow-md'
                      : 'text-melon-bg/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-2 px-2 text-[11px] text-white/70">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Sesi Admin Terverifikasi</span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white rounded-xl text-xs font-bold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden bg-melon-dark text-white p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-melon-primary" />
            <span className="font-heading font-bold text-sm">Admin Mirah Farm</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg bg-white/10 text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/80 flex">
            <div className="w-64 bg-melon-dark text-white p-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="font-heading font-bold text-sm">Menu Navigasi</span>
                  <button onClick={() => setSidebarOpen(false)}>
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium ${
                        pathname === item.href
                          ? 'bg-melon-primary text-white'
                          : 'text-melon-bg/80 hover:bg-white/10'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded-xl text-xs font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        )}

        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
