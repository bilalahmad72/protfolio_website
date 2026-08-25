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
    <section id="testimonials" className="section-y relative overflow-hidden bg-surface">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="05 — Social proof"
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
                className="glassmorphism relative flex flex-col items-center gap-8 rounded-3xl border border-slate-200 p-8 md:flex-row md:gap-12 md:p-12"
              >
                <div className="pointer-events-none absolute right-8 bottom-6 text-slate-900">
                  <Quote size={120} className="fill-current" />
                </div>

                <div className="relative h-24 w-24 flex-shrink-0 sm:h-28 sm:w-28">
                  <div className="absolute inset-[-4px] rounded-full bg-gradient-to-tr from-accent via-accent-strong to-accent-deep opacity-40 blur-sm" />
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full border border-accent/50 bg-slate-200">
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
                  <p className="relative z-10 text-pretty text-sm italic leading-relaxed text-slate-800 sm:text-base md:text-lg">
                    &ldquo;{current.quote}&rdquo;
                  </p>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{current.name}</h3>
                    <p className="mt-0.5 text-xs font-medium text-accent sm:text-sm">{current.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
            className="absolute left-[-20px] top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-surface text-slate-600 shadow-md shadow-slate-900/10 transition-all hover:scale-110 hover:border-accent/50 hover:text-accent active:scale-95 md:left-[-60px]"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextTestimonial}
            aria-label="Next testimonial"
            className="absolute right-[-20px] top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-surface text-slate-600 shadow-md shadow-slate-900/10 transition-all hover:scale-110 hover:border-accent/50 hover:text-accent active:scale-95 md:right-[-60px]"
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
              aria-current={index === idx}
              // The dot stays 10 px; the button around it is 44 px so the
              // touch target clears the 24 px minimum.
              className="flex h-11 w-6 cursor-pointer items-center justify-center"
            >
              <span
                aria-hidden
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === idx
                    ? 'w-7 bg-accent'
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
