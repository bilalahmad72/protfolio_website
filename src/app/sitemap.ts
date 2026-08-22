import type { MetadataRoute } from 'next';
import { blogs } from '@/data/blogs';
import { absoluteUrl } from '@/lib/site';

/**
 * Static sitemap. `output: 'export'` runs this at build time and writes
 * out/sitemap.xml, so it must not depend on anything request-scoped.
 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts: MetadataRoute.Sitemap = blogs.map((post) => ({
    url: absoluteUrl(`/blog/${post.id}`),
    lastModified: new Date(post.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [
    { url: absoluteUrl('/'), changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/journey'), changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/blog'), changeFrequency: 'monthly', priority: 0.7 },
    ...posts,
  ];
}
