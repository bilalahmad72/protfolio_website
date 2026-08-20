'use client';

import React from 'react';
import { MotionConfig } from 'framer-motion';

/**
 * Applies one motion policy to every Framer Motion animation on the page.
 * `reducedMotion="user"` drops transform and layout animation for readers who
 * asked for reduced motion, while still fading content in so nothing is lost.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
