import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-sm';

  const variants = {
    primary: 'bg-melon-primary hover:bg-melon-600 text-white shadow-melon-primary/20 hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-melon-secondary hover:bg-melon-800 text-white shadow-melon-secondary/20 hover:shadow-lg hover:-translate-y-0.5',
    outline: 'border-2 border-melon-secondary text-melon-secondary hover:bg-melon-secondary hover:text-white',
    whatsapp: 'bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-emerald-500/20 hover:shadow-lg hover:-translate-y-0.5',
    ghost: 'text-melon-dark hover:bg-melon-accent/20 hover:text-melon-secondary',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5 font-semibold',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
