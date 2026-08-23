'use client';

import React, { useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useInViewFallback } from '@/hooks/useInViewFallback';
import { EASE_CINEMATIC, viewportOnce } from '@/lib/motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait after the element enters the viewport. */
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: Direction;
  /**
   * Blur radius the element sharpens from. Defaults to 0 and should stay there:
   * `filter: blur()` cannot be composited, so animating it repaints the element
   * every frame. Opacity and transform both run on the GPU.
   */
  blur?: number;
  /** Adds a shallow X-axis rotation for a 3D entrance. */
  tilt?: boolean;
  /** Fraction of the element that must be visible before animating. */
  amount?: number;
};

function offsetFor(direction: Direction, distance: number) {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    default:
      return {};
  }
}

/**
 * The single scroll-entrance primitive used across the page, so every section
 * reveals on the same curve, distance and trigger point. The trigger comes from
 * `useInViewFallback`, which is what stops a missed observer from leaving the
 * content invisible.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  distance = 28,
  direction = 'up',
  blur = 0,
  tilt = false,
  amount = viewportOnce.amount,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const visible = useInViewFallback(ref, amount);

  // `filter: blur(0px)` is not the same as no filter: it still promotes the
  // element and keeps it off the fast path. When there is no blur to animate,
  // the property is left off entirely rather than set to zero.
  const variants: Variants = {
    hidden: {
      opacity: 0,
      rotateX: tilt ? -10 : 0,
      ...(blur > 0 ? { filter: `blur(${blur}px)` } : {}),
      ...offsetFor(direction, distance),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotateX: 0,
      ...(blur > 0 ? { filter: 'blur(0px)' } : {}),
      transition: { duration, delay, ease: EASE_CINEMATIC },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
      style={tilt ? { transformPerspective: 1200 } : undefined}
    >
      {children}
    </motion.div>
  );
}
