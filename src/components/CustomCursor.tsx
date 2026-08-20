'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useFinePointer } from '@/hooks/useMediaQuery';

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [role="button"]';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  // A custom cursor is meaningless without a real pointing device.
  const isEnabled = useFinePointer();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const ringX = useSpring(cursorX, { damping: 26, stiffness: 240, mass: 0.5 });
  const ringY = useSpring(cursorY, { damping: 26, stiffness: 240, mass: 0.5 });

  useEffect(() => {
    if (!isEnabled) return;

    const moveCursor = (event: MouseEvent) => {
      cursorX.set(event.clientX - 16);
      cursorY.set(event.clientY - 16);
      dotX.set(event.clientX);
      dotY.set(event.clientY);
      setIsVisible(true);
    };

    // Delegated hover tracking: one pair of listeners covers every interactive
    // element, including anything mounted later by an animation.
    const handleOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target?.closest?.(INTERACTIVE_SELECTOR)) setIsHovered(true);
    };
    const handleOut = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target?.closest?.(INTERACTIVE_SELECTOR)) setIsHovered(false);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);
    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [cursorX, cursorY, dotX, dotY, isEnabled]);

  if (!isEnabled || !isVisible) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-50 hidden h-8 w-8 rounded-full border mix-blend-screen md:block"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: isPressed ? 0.85 : isHovered ? 1.6 : 1,
          borderColor: isHovered ? 'rgba(157,78,221,0.9)' : 'rgba(0,242,254,0.45)',
          backgroundColor: isHovered ? 'rgba(157,78,221,0.06)' : 'rgba(0,0,0,0)',
          boxShadow: isHovered
            ? '0 0 18px rgba(157,78,221,0.35)'
            : '0 0 10px rgba(0,242,254,0.12)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-50 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: isHovered ? 0.4 : 1,
          backgroundColor: isHovered ? 'var(--neon-purple)' : 'var(--neon-cyan)',
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
      />
    </>
  );
}
