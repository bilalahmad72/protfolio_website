'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useFinePointer } from '@/hooks/useMediaQuery';

type MagneticButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  /** How far the button may drift toward the cursor, in pixels. */
  strength?: number;
};

const SPRING = { stiffness: 260, damping: 18, mass: 0.5 };

/**
 * A button that leans toward the cursor as it approaches, then snaps back.
 * Degrades to an ordinary button without a fine pointer.
 */
export default function MagneticButton({
  strength = 14,
  className = '',
  children,
  ...props
}: MagneticButtonProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const interactive = useFinePointer();
  const ref = useRef<HTMLButtonElement | null>(null);

  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  const enabled = interactive && !prefersReducedMotion;

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * strength * 2);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * strength * 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onBlur={reset}
      style={enabled ? { x, y } : undefined}
      whileTap={{ scale: 0.97 }}
      className={className}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
