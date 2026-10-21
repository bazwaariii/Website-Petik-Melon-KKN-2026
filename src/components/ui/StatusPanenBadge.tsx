import React from 'react';
import { Sparkles, Calendar, Leaf } from 'lucide-react';

interface StatusPanenBadgeProps {
  status: 'siap_petik' | 'segera_panen' | 'masa_tanam';
  teksCustom?: string;
  className?: string;
}

export const StatusPanenBadge: React.FC<StatusPanenBadgeProps> = ({
  status,
  teksCustom,
  className = '',
}) => {
  const configs = {
    siap_petik: {
      bg: 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300',
      dot: 'bg-emerald-400',
      icon: <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
      defaultText: 'Kebun Sedang Musim Panen Melon Premium — Siap Dipetik!',
    },
    segera_panen: {
      bg: 'bg-amber-500/20 border-amber-400/40 text-amber-300',
      dot: 'bg-amber-400',
      icon: <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
      defaultText: 'Segera Panen — Slot Reservasi Kebun Sudah Dibuka!',
    },
    masa_tanam: {
      bg: 'bg-blue-500/20 border-blue-400/40 text-blue-300',
      dot: 'bg-blue-400',
      icon: <Leaf className="w-3.5 h-3.5 text-blue-400 shrink-0" />,
      defaultText: 'Kebun Dalam Masa Tanam & Perawatan Hydroponik',
    },
  };

  const current = configs[status] || configs.siap_petik;
  const displayText = teksCustom && teksCustom.trim() !== '' ? teksCustom : current.defaultText;

  return (
    <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border backdrop-blur-md text-xs font-semibold ${current.bg} ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${current.dot}`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${current.dot}`}></span>
      </span>
      {current.icon}
      <span>{displayText}</span>
    </div>
  );
};
