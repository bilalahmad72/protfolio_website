'use client';

import { useEffect, useState } from 'react';

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

/**
 * Gates purely decorative work — currently the two WebGL scenes.
 *
 * Both scenes are already code-split, but a `dynamic()` chunk still downloads,
 * compiles and runs as soon as its component mounts, which lands squarely in
 * the load window. Measured on the live site that cost **17,490 ms of Total
 * Blocking Time** against a 200 ms target, with 30.7 s of main-thread work, for
 * a background nobody is looking at.
 *
 * So the decision here is deliberately conservative: the scene is an
 * enhancement, and it only loads when the device has capacity to spare and the
 * page is otherwise finished.
 *
 * Returns `false` — permanently — when:
 * - reduced motion is requested (the scenes are animation and nothing else)
 * - the device reports 4 GB of memory or less, or 4 cores or fewer
 * - Data Saver is on, or the connection reports 2g/3g
 *
 * Otherwise it flips to `true` once the page has loaded *and* the browser
 * reports an idle window.
 */
export function useDeferredDecoration(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const nav = navigator as NavigatorWithHints;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4) return;
    if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4) return;

    const connection = nav.connection;
    if (connection?.saveData) return;
    if (connection?.effectiveType && /(^|-)[23]g$/.test(connection.effectiveType)) return;

    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;

    const scheduleMount = () => {
      const start = () => setReady(true);

      // requestIdleCallback keeps this off the critical path entirely. The
      // timeout is the fallback for browsers without it, and the second
      // argument bounds how long the browser may keep deferring.
      // A `'requestIdleCallback' in window` guard narrows window to never here,
      // because the DOM lib declares the method as always present.
      if (typeof window.requestIdleCallback === 'function') {
        idleHandle = window.requestIdleCallback(start, { timeout: 4000 });
      } else {
        timeoutHandle = window.setTimeout(start, 2000);
      }
    };

    if (document.readyState === 'complete') {
      scheduleMount();
      return () => {
        if (idleHandle !== undefined) window.cancelIdleCallback?.(idleHandle);
        if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
      };
    }

    window.addEventListener('load', scheduleMount, { once: true });
    return () => {
      window.removeEventListener('load', scheduleMount);
      if (idleHandle !== undefined) window.cancelIdleCallback?.(idleHandle);
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
    };
  }, []);

  return ready;
}
