'use client';

import { useEffect, useState, type RefObject } from 'react';
import { useInView } from 'framer-motion';

/**
 * `useInView`, with a geometry check behind it.
 *
 * Entrance animations here start from `opacity: 0`, and that hidden state is
 * server-rendered — so an IntersectionObserver that never fires leaves the
 * content permanently invisible rather than merely un-animated. That is not
 * hypothetical: it is what made a whole section disappear on mobile. Scroll
 * restoration on reload, a mobile address bar resizing the viewport after load,
 * and occluded tabs have all been observed to skip the callback.
 *
 * The observer stays the fast path. A cheap `getBoundingClientRect` check runs
 * after mount and on scroll/resize/orientation/visibility, and reveals anything
 * that is genuinely on screen. Both paths latch once and then detach.
 */
export function useInViewFallback(
  ref: RefObject<Element | null>,
  amount: number,
): boolean {
  const inView = useInView(ref, { once: true, amount });
  const [fallbackVisible, setFallbackVisible] = useState(false);

  useEffect(() => {
    if (fallbackVisible) return;

    const check = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < viewportHeight && rect.bottom > 0) setFallbackVisible(true);
    };

    // Catches the case the observer misses most often: the element already
    // being on screen at mount, after the browser restored a scroll position.
    const timer = window.setTimeout(check, 600);

    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
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
  }, [fallbackVisible, ref]);

  return inView || fallbackVisible;
}
