'use client';

import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useFinePointer } from '@/hooks/useMediaQuery';

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. */
  max?: number;
  /** How far the card lifts toward the viewer, in pixels. */
  lift?: number;
  /** Render the pointer-tracking specular sweep. */
  glare?: boolean;
  /** Render the cursor-following border highlight. */
  spotlight?: boolean;
};

const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

/**
 * Wraps a card in a real 3D perspective tilt driven by pointer position, with
 * an optional specular glare and border spotlight. Falls back to a plain
 * container on touch devices and when reduced motion is requested.
 */
export default function TiltCard({
  children,
  className = '',
  max = 7,
  lift = 10,
  glare = true,
  spotlight = true,
}: TiltCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  // Tilt only makes sense where there is a hovering pointer to track.
  const interactive = useFinePointer();
  const ref = useRef<HTMLDivElement | null>(null);

  const enabled = interactive && !prefersReducedMotion;

  // Normalised pointer position within the card, -0.5 .. 0.5.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const hover = useMotionValue(0);

  const rotateX = useSpring(useTransform(pointerY, (value) => -value * max * 2), SPRING);
  const rotateY = useSpring(useTransform(pointerX, (value) => value * max * 2), SPRING);
  const translateZ = useSpring(useTransform(hover, [0, 1], [0, lift]), SPRING);

  const glareX = useTransform(pointerX, (value) => `${50 + value * 110}%`);
  const glareY = useTransform(pointerY, (value) => `${50 + value * 110}%`);
  const glareOpacity = useSpring(useTransform(hover, [0, 1], [0, 0.09]), SPRING);
  const glareBackground = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(255,255,255,0.9), transparent 60%)`;

  const spotlightBackground = useMotionTemplate`radial-gradient(340px circle at ${glareX} ${glareY}, rgba(44,92,255,0.07), transparent 65%)`;
  const spotlightOpacity = useSpring(useTransform(hover, [0, 1], [0, 1]), SPRING);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
    hover.set(0);
  };

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => hover.set(1)}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        translateZ,
        transformPerspective: 1100,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
    >
      {children}

      {spotlight && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: spotlightBackground, opacity: spotlightOpacity }}
        />
      )}

      {glare && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBackground, opacity: glareOpacity }}
        />
      )}
    </motion.div>
  );
}
