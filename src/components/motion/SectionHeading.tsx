'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { EASE_CINEMATIC } from '@/lib/motion';

type SectionHeadingProps = {
  /** Small monospace label above the title. */
  kicker: string;
  title: string;
  /** Trailing words of the title rendered in the gradient accent. */
  accent?: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
};

/**
 * The shared section masthead: index label, headline with a gradient accent,
 * an animated rule and a supporting line. Using one component everywhere is
 * what keeps the page rhythm consistent from section to section.
 */
export default function SectionHeading({
  kicker,
  title,
  accent,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const isCentered = align === 'center';

  return (
    <div
      className={`flex flex-col gap-5 ${isCentered ? 'items-center text-center' : 'items-start text-left'} ${className}`}
    >
      <Reveal blur={0} distance={16} duration={0.7}>
        <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-accent">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70" />
          {kicker}
        </span>
      </Reveal>

      <Reveal delay={0.06} distance={22} tilt>
        <h2 className="text-balance text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
          <span className="text-slate-900">{title}</span>
          {accent && <> <span className="gradient-text">{accent}</span></>}
        </h2>
      </Reveal>

      <motion.span
        aria-hidden
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1, ease: EASE_CINEMATIC, delay: 0.15 }}
        className={`h-px w-28 bg-gradient-to-r from-accent via-accent-strong to-transparent ${
          isCentered ? 'origin-center' : 'origin-left'
        }`}
      />

      {subtitle && (
        <Reveal delay={0.12} blur={0} distance={18}>
          <p
            className={`text-pretty text-sm leading-relaxed text-slate-600 sm:text-base ${
              isCentered ? 'mx-auto max-w-2xl' : 'max-w-2xl'
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
