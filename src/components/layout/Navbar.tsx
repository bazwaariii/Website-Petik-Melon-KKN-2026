'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, CalendarCheck, PhoneCall, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang Desa', href: '/tentang' },
    { name: 'Paket Wisata', href: '/paket' },
    { name: 'Galeri', href: '/galeri' },
    { name: 'Produk Olahan', href: '/produk' },
    { name: 'Blog Edukasi', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Kontak', href: '/kontak' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-nav py-3 shadow-sm'
          : 'bg-gradient-to-b from-melon-dark/60 via-melon-dark/30 to-transparent py-4 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-melon-accent shadow-md transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/assets/logo.png"
              alt="Mirah Farm Logo"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className={`font-heading text-lg font-extrabold tracking-tight ${
              scrolled ? 'text-melon-dark' : 'text-white'
            }`}>
              MIRAH FARM
            </span>
            <span className={`text-[10px] tracking-widest uppercase font-semibold ${
              scrolled ? 'text-melon-secondary' : 'text-melon-accent'
            }`}>
              Greenhouse Melon Sidorejo
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-melon-primary relative py-1 ${
                  isActive
                    ? 'text-melon-primary font-bold'
                    : scrolled
                    ? 'text-melon-dark/80'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-melon-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Admin Link */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/admin/login">
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
              scrolled
                ? 'text-melon-dark/60 hover:text-melon-secondary hover:bg-melon-accent/20'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}>
              Admin Login
            </span>
          </Link>
          <Link href="/reservasi">
            <Button
              variant="primary"
              size="sm"
              icon={<CalendarCheck className="w-4 h-4" />}
            >
              Pesan Sekarang
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 rounded-xl transition-colors ${
            scrolled ? 'text-melon-dark hover:bg-melon-accent/20' : 'text-white hover:bg-white/10'
          }`}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav border-b border-melon-primary/20 px-4 pt-4 pb-6 mt-2 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold px-4 py-2.5 rounded-xl transition-colors ${
                  pathname === link.href
                    ? 'bg-melon-primary text-white'
                    : 'text-melon-dark hover:bg-melon-accent/30'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-melon-dark/10 flex flex-col gap-2">
              <Link href="/reservasi" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full justify-center">
                  <CalendarCheck className="w-4 h-4 mr-2" />
                  Reservasi Petik Melon
                </Button>
              </Link>
              <Link href="/admin/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full text-center text-xs">
                  Login Panel Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
