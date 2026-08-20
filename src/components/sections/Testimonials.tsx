'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import SectionHeading from '@/components/motion/SectionHeading';
import { EASE_CINEMATIC } from '@/lib/motion';

const AUTOPLAY_MS = 8000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const goTo = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setIndex(((next % testimonials.length) + testimonials.length) % testimonials.length);
  }, []);

  const nextTestimonial = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prevTestimonial = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  const current = testimonials[index];

  // Restarting on `index` means a manual click always gets a full dwell time.
  useEffect(() => {
    const timer = setTimeout(nextTestimonial, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [nextTestimonial]);

  // Slides swing through depth rather than sliding flat, matching the 3D scene.
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      rotateY: dir > 0 ? -18 : 18,
      scale: 0.94,
      opacity: 0,
    }),
    center: {
      x: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
      transition: { duration: 0.7, ease: EASE_CINEMATIC },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 120 : -120,
      rotateY: dir < 0 ? -18 : 18,
      scale: 0.94,
      opacity: 0,
      transition: { duration: 0.45, ease: EASE_CINEMATIC },
    }),
  };

  return (
    <section id="testimonials" className="section-y relative overflow-hidden bg-[#0B0F19]/10">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="04 — Social proof"
          title="What clients"
          accent="actually say"
          subtitle="Feedback and reviews from managers and partners I worked with."
          className="mb-16"
        />

        <div className="relative flex min-h-[380px] items-center justify-center sm:min-h-[300px]">
          <div className="relative w-full" style={{ perspective: 1400 }}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ transformStyle: 'preserve-3d' }}
                className="glassmorphism relative flex flex-col items-center gap-8 rounded-3xl border border-white/5 p-8 md:flex-row md:gap-12 md:p-12"
              >
                <div className="pointer-events-none absolute right-8 bottom-6 text-white/5">
                  <Quote size={120} className="fill-current" />
                </div>

                <div className="relative h-24 w-24 flex-shrink-0 sm:h-28 sm:w-28">
                  <div className="absolute inset-[-4px] rounded-full bg-gradient-to-tr from-neon-cyan via-neon-indigo to-neon-purple opacity-40 blur-sm" />
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full border border-neon-cyan/50 bg-slate-900">
                    <Image
                      src={current.avatar}
                      alt={current.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex-grow space-y-6 text-center md:text-left">
                  <p className="relative z-10 text-pretty text-sm italic leading-relaxed text-slate-200 sm:text-base md:text-lg">
                    &ldquo;{current.quote}&rdquo;
                  </p>

                  <div>
                    <h4 className="text-lg font-bold text-slate-100">{current.name}</h4>
                    <p className="mt-0.5 text-xs font-medium text-neon-cyan sm:text-sm">{current.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
            className="absolute left-[-20px] top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[#0B0F19]/60 text-slate-400 shadow-md shadow-black/20 backdrop-blur-md transition-all hover:scale-110 hover:border-neon-cyan/50 hover:text-neon-cyan active:scale-95 md:left-[-60px]"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextTestimonial}
            aria-label="Next testimonial"
            className="absolute right-[-20px] top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[#0B0F19]/60 text-slate-400 shadow-md shadow-black/20 backdrop-blur-md transition-all hover:scale-110 hover:border-neon-cyan/50 hover:text-neon-cyan active:scale-95 md:right-[-60px]"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2.5">
          {testimonials.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => goTo(idx, idx > index ? 1 : -1)}
              aria-label={`Show testimonial ${idx + 1}`}
              className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ${
                index === idx
                  ? 'w-7 bg-neon-cyan shadow-[0_0_8px_#00F2FE]'
                  : 'w-2.5 bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
