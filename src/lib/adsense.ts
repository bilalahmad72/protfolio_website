/**
 * AdSense wiring for the blog.
 *
 * Ads are confined to `/blog` and the article pages — the portfolio surfaces
 * (home, `/journey`) stay clean, since those are what clients and recruiters
 * land on.
 *
 * The publisher ID is the same account already declared in
 * `public/app-ads.txt`. It is a public value — it ships in the page markup on
 * every AdSense site — so there is nothing to hide in an env var.
 */
export const ADSENSE_CLIENT = 'ca-pub-1535443896287948';

/** Loader for the AdSense tag, shared by every page that carries a unit. */
export const ADSENSE_SRC =
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;

/**
 * Slot IDs, created in the AdSense dashboard under Ads → By ad unit.
 * An empty string renders nothing, so a slot that has not been created yet
 * simply leaves a gap rather than shipping a broken `<ins>`.
 */
export const AD_SLOTS = {
  /**
   * Two paragraphs into the article body, per AdSense's own placement advice.
   * An **In-article** unit: it renders `fluid`, so Google matches it to the
   * body text rather than dropping a boxed banner mid-paragraph.
   */
  articleTop: '9004077806',
  /** After the last content block. Display unit. */
  articleEnd: '5967333422',
  /**
   * Below the post grid on the listing page. Sharing `articleEnd`'s ID is
   * legal but collapses both into one row in the earnings report; give this
   * its own Display unit once you want to tell the two apart.
   */
  blogIndex: '5967333422',
} as const;
