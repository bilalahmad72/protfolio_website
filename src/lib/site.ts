/**
 * Single source of truth for anything that has to agree across metadata,
 * structured data, the sitemap and robots.
 *
 * `trailingSlash: true` is set in next.config.ts, so every canonical URL built
 * here ends in a slash — a canonical that disagrees with the URL it sits on is
 * worse than no canonical at all.
 */
export const SITE = {
  url: 'https://bilalahmad72.com',
  name: 'Bilal Ahmad',
  jobTitle: 'Senior Flutter Developer',
  locale: 'en_US',
  description:
    'Senior Flutter Developer with 4+ years building production mobile apps — Clean Architecture, REST & GraphQL API integration, and custom Flutter animations. Comfortable across Riverpod, BLoC and Provider, and vibe coding with Claude Code, Codex, Antigravity and Cursor.',
  ogImage: '/og-image.png',
  ogImageAlt: 'Bilal Ahmad — Senior Flutter Developer, bilalahmad72.com',
} as const;

/** Profiles used as `sameAs` in the Person schema, and linked across the site. */
export const PROFILES = [
  'https://github.com/bilalahmad72',
  'https://www.linkedin.com/in/freelancer-bilalahmad72/',
  'https://www.upwork.com/freelancers/bilalahmad72',
  'https://www.fiverr.com/bilalahmad72',
  'https://www.instagram.com/bilalahmad72.official/',
] as const;

/** Builds an absolute, trailing-slash URL from a route path. */
export function absoluteUrl(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const withSlash = clean.endsWith('/') ? clean : `${clean}/`;
  return `${SITE.url}${withSlash}`;
}
