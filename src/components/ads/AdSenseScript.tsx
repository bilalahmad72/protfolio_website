import Script from 'next/script';
import { ADSENSE_CLIENT, ADSENSE_SRC } from '@/lib/adsense';

/**
 * Loads the AdSense tag once for the page that renders it.
 *
 * `afterInteractive` rather than `beforeInteractive`: the ad tag is never
 * needed for first paint, and `beforeInteractive` is only legal in the root
 * layout — which would pull ads onto the portfolio pages too.
 *
 * next/script deduplicates by `src`, so rendering this alongside several
 * <AdUnit> components still results in a single request.
 */
export default function AdSenseScript() {
  return (
    <Script
      id="adsbygoogle-init"
      src={ADSENSE_SRC}
      strategy="afterInteractive"
      crossOrigin="anonymous"
      data-ad-client={ADSENSE_CLIENT}
    />
  );
}
