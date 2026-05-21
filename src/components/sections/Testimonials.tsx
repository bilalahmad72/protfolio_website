'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextTestimonial = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[index];

  // Auto-play slider every 8 seconds
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeInOut' as const }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeInOut' as const }
    })
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-[#0B0F19]/10">
      <div className="absolute inset-0 bg-transparent opacity-[0.01] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-3xl sm:text-4xl font-extrabold"
          >
            What Clients <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent glow-text-cyan">Say</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base"
          >
            Feedback and reviews from managers and partners I worked with.
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[380px] sm:min-h-[300px] flex items-center justify-center">
          
          {/* Main Slide Card */}
          <div className="w-full relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="glassmorphism p-8 md:p-12 rounded-3xl border border-white/5 relative flex flex-col md:flex-row items-center gap-8 md:gap-12"
              >
                {/* Large Quote Icon overlay */}
                <div className="absolute right-8 bottom-6 text-white/5 pointer-events-none">
                  <Quote size={120} className="fill-current" />
                </div>

                {/* Avatar with dynamic ring */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
                  <div className="absolute inset-[-4px] rounded-full bg-gradient-to-tr from-neon-cyan via-neon-indigo to-neon-purple opacity-40 blur-sm" />
                  <div className="absolute inset-0 rounded-full border border-neon-cyan/50 overflow-hidden bg-slate-900">
                    <Image
                      src={current.avatar}
                      alt={current.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Quote Text */}
                <div className="flex-grow space-y-6 text-center md:text-left">
                  <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed italic relative z-10">
                    "{current.quote}"
                  </p>
                  
                  <div>
                    <h4 className="text-lg font-bold text-slate-100">{current.name}</h4>
                    <p className="text-xs sm:text-sm text-neon-cyan font-medium mt-0.5">{current.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevTestimonial}
            className="absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 hover:border-neon-cyan/50 bg-[#0B0F19]/60 backdrop-blur-md text-slate-400 hover:text-neon-cyan flex items-center justify-center transition-all shadow-md shadow-black/20 hover:scale-110 active:scale-95 cursor-pointer z-20"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextTestimonial}
            className="absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 hover:border-neon-cyan/50 bg-[#0B0F19]/60 backdrop-blur-md text-slate-400 hover:text-neon-cyan flex items-center justify-center transition-all shadow-md shadow-black/20 hover:scale-110 active:scale-95 cursor-pointer z-20"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Carousel indicator dots */}
        <div className="flex justify-center items-center gap-2.5 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > index ? 1 : -1);
                setIndex(idx);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === idx 
                  ? 'w-6 bg-neon-cyan shadow-[0_0_8px_#00F2FE]' 
                  : 'w-2.5 bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
