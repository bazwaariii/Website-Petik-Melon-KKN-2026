'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ShieldAlert, ArrowLeft, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate admin credentials
    setTimeout(() => {
      if (
        (email.trim().toLowerCase() === 'admin@sidorejo.desa.id' && password === 'admin123') ||
        (email.trim().toLowerCase() === 'admin' && password === 'admin')
      ) {
        // Set admin session cookie
        document.cookie = 'admin_session=active; path=/; max-age=86400; SameSite=Lax';
        toast.success('Login Admin Berhasil! Mengalihkan...');
        router.push('/admin');
      } else {
        toast.error('Email atau password admin salah!');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-melon-dark">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-melon-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-melon-secondary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl relative z-10 space-y-6 border border-melon-primary/20">
        <div className="text-center space-y-2">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-melon-primary mx-auto shadow-md">
            <Image src="/assets/logo.png" alt="Logo" fill className="object-cover" />
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-melon-dark">
            Login Admin Mirah Farm
          </h1>
          <p className="text-xs text-melon-dark/60">
            Akses Terproteksi Khusus Pengelola Kebun Sidorejo
          </p>
        </div>

        {/* Warning Notice: Admin Only */}
        <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Akses Khusus Admin.</strong> Tidak ada pendaftaran akun publik. Kontak pengelola jika lupa kata sandi.
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-melon-dark mb-1">
              Email / Username Admin
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-melon-dark/40 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                placeholder="admin@sidorejo.desa.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-melon-primary/20 text-xs focus:ring-2 focus:ring-melon-primary focus:outline-none bg-melon-bg/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-melon-dark mb-1">
              Kata Sandi (Password)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-melon-dark/40 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-melon-primary/20 text-xs focus:ring-2 focus:ring-melon-primary focus:outline-none bg-melon-bg/40"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={loading}
            className="w-full justify-center shadow-lg mt-2"
            icon={<KeyRound className="w-4 h-4" />}
          >
            {loading ? 'Memverifikasi...' : 'Masuk Panel Admin'}
          </Button>
        </form>

        <div className="pt-4 border-t border-melon-100 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-melon-secondary hover:text-melon-primary font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Website Utama</span>
          </a>
        </div>
      </div>
    </div>
  );
}
