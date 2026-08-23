'use client';

import React, { useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useInViewFallback } from '@/hooks/useInViewFallback';
import { viewportOnce } from '@/lib/motion';

/**
 * A stagger parent that cannot leave its children stranded.
 *
 * These grids drive their children through variants, so if the parent's
 * `whileInView` never fires, every card underneath stays at `opacity: 0`.
 * Routing the trigger through `useInViewFallback` gives the group the same
 * geometry safety net `Reveal` has.
 */
export default function RevealGroup({
  children,
  variants,
  className,
  amount = viewportOnce.amount,
  as: Component = 'div',
}: {
  children: React.ReactNode;
  variants: Variants;
  className?: string;
  amount?: number;
  as?: 'div' | 'ol' | 'ul';
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const visible = useInViewFallback(ref, amount);
  const Motion = motion[Component];

  return (
    <Motion
      ref={ref as React.Ref<HTMLDivElement & HTMLOListElement & HTMLUListElement>}
      className={className}
      variants={variants}
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
    >
      {children}
    </Motion>
  );
}
