import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'orange' | 'yellow' | 'dark' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'green',
  className,
}) => {
  const base = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide';

  const variants = {
    green: 'bg-melon-accent/40 text-melon-secondary border border-melon-secondary/20',
    orange: 'bg-melon-primary/15 text-melon-600 border border-melon-primary/30',
    yellow: 'bg-melon-highlight/30 text-amber-900 border border-melon-highlight/40',
    dark: 'bg-melon-dark text-melon-bg',
    outline: 'border border-melon-secondary/30 text-melon-secondary',
  };

  return (
    <span className={cn(base, variants[variant], className)}>
      {children}
    </span>
  );
};
