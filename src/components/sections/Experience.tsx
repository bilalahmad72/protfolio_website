'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { experiences } from '@/data/experience';
import SectionHeading from '@/components/motion/SectionHeading';
import { EASE_CINEMATIC } from '@/lib/motion';

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement | null>(null);

  // The beam fills as the timeline passes through the viewport, so scrolling
  // literally draws the career path.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 65%'],
  });
  const beamScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="section-y relative overflow-hidden">
      <div className="pointer-events-none absolute top-[30%] left-[-15%] h-[40vw] w-[40vw] rounded-full bg-neon-cyan/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="03 — Track record"
          title="Six years of"
          accent="shipping"
          subtitle="My professional journey as a Flutter Developer and Frontend Engineer."
          className="mb-20"
        />

        <div ref={timelineRef} className="relative ml-4 space-y-16 py-4 pl-8 md:ml-32 md:pl-12">
          {/* Static rail plus the animated beam that fills it. */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-white/8" />
          <motion.div
            aria-hidden
            style={{ scaleY: beamScale }}
            className="absolute top-0 bottom-0 left-0 w-px origin-top bg-gradient-to-b from-neon-cyan via-neon-indigo to-neon-purple shadow-[0_0_12px_rgba(0,242,254,0.6)]"
          />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -36, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: EASE_CINEMATIC, delay: index * 0.08 }}
              className="relative"
            >
              <div className="absolute -left-[41px] top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-neon-cyan bg-[#0B0F19] shadow-[0_0_12px_#00F2FE] md:-left-[57px]">
                <div className="h-2 w-2 animate-ping rounded-full bg-neon-cyan" />
              </div>

              <div className="absolute -left-48 top-1.5 hidden w-32 text-right md:block">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/5 bg-white/5 px-3 py-1.5 text-sm font-semibold text-slate-400">
                  <Calendar size={12} className="text-neon-cyan" />
                  {exp.duration.split(' - ')[0]}
                </span>
              </div>

              <div className="glassmorphism group relative rounded-2xl border border-white/5 p-8 transition-colors duration-300 hover:border-neon-cyan/25">
                <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-neon-cyan to-neon-indigo opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-slate-100 transition-colors group-hover:text-neon-cyan">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-sm font-semibold tracking-wide text-neon-purple">
                      {exp.company}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 self-start rounded-full border border-white/5 bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-400 md:hidden">
                    <Calendar size={12} className="text-neon-cyan" />
                    {exp.duration}
                  </div>
                  <div className="hidden text-xs font-medium text-slate-500 md:block">
                    {exp.duration}
                  </div>
                </div>

                <ul className="space-y-3.5">
                  {exp.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-slate-300">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neon-cyan shadow-[0_0_6px_#00F2FE]" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
