import React from 'react';
import type { Metadata } from 'next';
import { SITE, absoluteUrl } from '@/lib/site';
import BlogIndexView from './BlogIndexView';

const TITLE = 'Flutter Development Notes';
const DESCRIPTION =
  'Articles on Flutter development: Clean Architecture, state management with Riverpod and BLoC, API integration and the patterns behind production apps.';

/*
 * The listing itself is interactive, so it lives in a client component. Next
 * only reads `metadata` from a server component, which is why this page is a
 * thin server shell rather than the view itself.
 */
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/blog/' },
  openGraph: {
    type: 'website',
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl('/blog'),
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.ogImageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [SITE.ogImage],
  },
};

export default function BlogIndexPage() {
  return <BlogIndexView />;
}
