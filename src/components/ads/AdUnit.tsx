'use client';

import { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT } from '@/lib/adsense';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdUnitProps {
  /** Slot ID from the AdSense dashboard. Empty renders nothing. */
  slot: string;
  /** `fluid` + a layout key for in-article; `auto` for a plain responsive box. */
  format?: string;
  layout?: string;
  className?: string;
  /** Screen-reader label so the slot is not an unexplained blank region. */
  label?: string;
}

/**
 * One `<ins class="adsbygoogle">` plus the push that fills it.
 *
 * The push happens in an effect rather than an inline <script> on purpose: the
 * site ships a hash-based CSP (see scripts/apply-csp.mjs) which blocks inline
 * scripts, and hashes cannot be computed for markup React writes at runtime.
 */
export default function AdUnit({
  slot,
  format = 'auto',
  layout,
  className = '',
  label = 'Advertisement',
}: AdUnitProps) {
  const pushed = useRef(false);

  useEffect(() => {
    // React 18+ runs effects twice in development; a second push on the same
    // <ins> makes AdSense throw "All ins elements already have ads".
    if (!slot || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // A blocked or failed tag must never take the article down with it.
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <aside
      aria-label={label}
      className={`my-10 overflow-hidden text-center ${className}`}
    >
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        {...(layout ? { 'data-ad-layout': layout } : {})}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
