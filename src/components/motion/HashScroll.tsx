'use client';

import { useEffect } from 'react';

/**
 * Scrolls to the URL's hash target after mount.
 *
 * Client-side navigation into `/journey#role-whooo` lands correctly on its own,
 * but a cold load of the same URL does not: the browser resolves the hash
 * before this long page has finished laying out, and nothing moves. Since the
 * whole point of the role anchors is that they can be linked and shared, the
 * scroll is redone once the document is actually the right height.
 */
export default function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    let target: HTMLElement | null = null;
    try {
      target = document.querySelector(hash);
    } catch {
      // A malformed hash is not a selector; there is simply nothing to scroll to.
      return;
    }
    if (!target) return;

    // Two frames is enough for layout to settle without a visible jump.
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        target.scrollIntoView({ block: 'start', behavior: 'auto' });
      });
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return null;
}
