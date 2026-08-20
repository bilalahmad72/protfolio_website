'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
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
  /** Blur radius the element sharpens from. Set to 0 for text-heavy blocks. */
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
 * reveals on the same curve, distance and trigger point.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  distance = 28,
  direction = 'up',
  blur = 10,
  tilt = false,
  amount = viewportOnce.amount,
}: RevealProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      filter: blur > 0 ? `blur(${blur}px)` : 'blur(0px)',
      rotateX: tilt ? -10 : 0,
      ...offsetFor(direction, distance),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: { duration, delay, ease: EASE_CINEMATIC },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      style={tilt ? { transformPerspective: 1200 } : undefined}
    >
      {children}
    </motion.div>
  );
}
