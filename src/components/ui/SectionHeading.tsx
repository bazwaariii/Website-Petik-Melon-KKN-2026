import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  tagline?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  tagline,
  title,
  subtitle,
  align = 'center',
  className,
}) => {
  const alignments = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={cn('flex flex-col mb-10 md:mb-14', alignments[align], className)}>
      {tagline && (
        <span className="font-hand text-xl md:text-2xl text-melon-primary font-bold tracking-wide mb-1.5">
          🍃 {tagline}
        </span>
      )}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-melon-dark tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base md:text-lg text-melon-dark/70 max-w-2xl font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="w-16 h-1 bg-gradient-to-r from-melon-primary to-melon-secondary rounded-full mt-4" />
    </div>
  );
};
