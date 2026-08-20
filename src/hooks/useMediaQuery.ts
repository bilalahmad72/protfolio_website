'use client';

import { useCallback, useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

/**
 * Reads a media query without a setState-in-effect round trip. Returns `false`
 * during SSR and on the hydration pass, then the real value immediately after.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True once the component is running in the browser. */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/** True when a hovering, precise pointer (a mouse or trackpad) is available. */
export function useFinePointer(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}
