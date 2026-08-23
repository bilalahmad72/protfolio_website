'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
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
 * reveals on the same curve, distance and trigger point.
 *
 * The hidden state is `opacity: 0`, and it is server-rendered — which means an
 * IntersectionObserver that never fires leaves the content permanently
 * invisible rather than merely un-animated. That is not hypothetical: scroll
 * restoration on reload, a mobile address bar resizing the viewport after load,
 * and background/occluded tabs have all been observed to skip the callback.
 *
 * So the observer is treated as the fast path, not the only path. A geometry
 * check runs after mount and on scroll/resize, and reveals anything that is
 * actually on screen. Both paths latch once and then detach.
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
  const inView = useInView(ref, { once: true, amount });
  const [fallbackVisible, setFallbackVisible] = useState(false);

  useEffect(() => {
    if (fallbackVisible) return;

    const isOnScreen = () => {
      const el = ref.current;
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      return rect.top < viewportHeight && rect.bottom > 0;
    };

    const check = () => {
      if (!isOnScreen()) return;
      setFallbackVisible(true);
    };

    // One deferred check catches the case the observer misses most often: the
    // element already being on screen when it mounts, after the browser has
    // restored a scroll position.
    const timer = window.setTimeout(check, 600);

    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    // A mobile address bar collapsing, an orientation change, or returning to a
    // backgrounded tab all resize the viewport after load — each one is a point
    // where an observer can miss an element that is now on screen.
    window.addEventListener('orientationchange', check);
    window.addEventListener('pageshow', check);
    document.addEventListener('visibilitychange', check);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      window.removeEventListener('orientationchange', check);
      window.removeEventListener('pageshow', check);
      document.removeEventListener('visibilitychange', check);
    };
  }, [fallbackVisible]);

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
      animate={inView || fallbackVisible ? 'visible' : 'hidden'}
      style={tilt ? { transformPerspective: 1200 } : undefined}
    >
      {children}
    </motion.div>
  );
}
