'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Testimoni } from '@/lib/types';

interface TestimonialSliderProps {
  testimonials: Testimoni[];
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto bg-white rounded-3xl p-6 md:p-10 border border-melon-primary/20 shadow-xl overflow-hidden">
      <Quote className="absolute top-6 left-6 w-16 h-16 text-melon-primary/10 -z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        {/* User Image */}
        {current.foto && (
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-melon-accent shadow-md shrink-0">
            <Image
              src={current.foto}
              alt={current.nama}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          {/* Star Rating */}
          <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < current.rating
                    ? 'text-melon-highlight fill-melon-highlight'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>

          <p className="text-base md:text-lg italic text-melon-dark/90 font-medium leading-relaxed mb-4">
            &ldquo;{current.pesan}&rdquo;
          </p>

          <div>
            <h4 className="font-heading text-lg font-bold text-melon-dark">
              {current.nama}
            </h4>
            <span className="text-xs text-melon-secondary font-semibold">
              📍 {current.asal}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-melon-100">
        <div className="flex items-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-7 bg-melon-primary'
                  : 'bg-melon-secondary/30 hover:bg-melon-secondary/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-full border border-melon-secondary/20 hover:bg-melon-accent/30 text-melon-dark transition-colors"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-melon-primary text-white hover:bg-melon-600 shadow-md transition-colors"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
