'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/** Hairline reading-progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-accent via-accent-strong to-accent-deep shadow-[0_10px_30px_-12px_rgba(44,92,255,0.25)]"
    />
  );
}
