import { SITE, PROFILES, absoluteUrl } from './site';

/**
 * Structured data builders.
 *
 * Everything here reads from `site.ts` so the schema can never drift from the
 * metadata — a Person schema that disagrees with the page title is worse than
 * none, because Google treats the mismatch as a quality signal.
 */

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}/#person`,
    name: SITE.name,
    url: SITE.url,
    image: `${SITE.url}${SITE.ogImage}`,
    jobTitle: SITE.jobTitle,
    description: SITE.description,
    sameAs: [...PROFILES],
    knowsAbout: [
      'Flutter',
      'Dart',
      'Clean Architecture',
      'Riverpod',
      'BLoC',
      'Provider',
      'GetX',
      'REST API',
      'GraphQL',
      'Firebase',
      'PostgreSQL',
      'Mobile App Development',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sheikhupura',
      addressRegion: 'Punjab',
      addressCountry: 'PK',
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: `${SITE.name} — ${SITE.jobTitle}`,
    description: SITE.description,
    inLanguage: 'en',
    publisher: { '@id': `${SITE.url}/#person` },
  };
}

export function blogPostingSchema(post: {
  id: string;
  title: string;
  excerpt: string;
  date: string;
}) {
  const url = absoluteUrl(`/blog/${post.id}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    inLanguage: 'en',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: `${SITE.url}${SITE.ogImage}`,
    author: { '@id': `${SITE.url}/#person` },
    publisher: { '@id': `${SITE.url}/#person` },
  };
}

/** `trail` runs root-first; the current page is the last entry. */
export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
