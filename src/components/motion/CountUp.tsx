'use client';

import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/** Splits "400+" into ["", "400", "+"] so only the number is animated. */
const NUMERIC = /^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/;

type CountUpProps = {
  /** Any label; if it contains no leading number it is rendered verbatim. */
  value: string;
  className?: string;
  duration?: number;
};

/**
 * Counts a stat up from zero the first time it scrolls into view. Labels
 * without a number, and readers who asked for reduced motion, get the final
 * value straight away.
 */
export default function CountUp({ value, className, duration = 1.8 }: CountUpProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  const match = value.match(NUMERIC);
  const prefix = match?.[1] ?? '';
  const suffix = match?.[3] ?? '';
  const target = match ? Number(match[2].replace(/,/g, '')) : null;
  const decimals = match?.[2].includes('.') ? match[2].split('.')[1].length : 0;

  const shouldAnimate = target !== null && !prefersReducedMotion;
  const [counted, setCounted] = useState<string | null>(null);

  useEffect(() => {
    if (!shouldAnimate || !inView || target === null) return;

    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        const rendered = latest.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
        setCounted(`${prefix}${rendered}${suffix}`);
      },
    });

    return () => controls.stop();
  }, [decimals, duration, inView, prefix, shouldAnimate, suffix, target]);

  // Before the animation starts the stat reads as zero; afterwards it settles
  // on the authored string so "+"/"%" suffixes stay exactly as written.
  const display = shouldAnimate ? (counted ?? `${prefix}0${suffix}`) : value;

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
