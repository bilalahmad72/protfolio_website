'use client';

import { useMediaQuery } from './useMediaQuery';

/** Tracks the user's reduced-motion preference. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
