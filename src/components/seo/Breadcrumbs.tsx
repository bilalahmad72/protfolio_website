import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  name: string;
  /** Omitted on the current page, which is not a link. */
  path?: string;
}

/**
 * Visible breadcrumb trail. Google will often show these in place of the raw
 * URL in results, but only when the visible trail and the BreadcrumbList markup
 * agree — so both are built from the same array at the call site.
 */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.name} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight size={14} aria-hidden className="text-slate-400" />
              )}
              {crumb.path && !isLast ? (
                <Link href={crumb.path} className="transition-colors hover:text-accent">
                  {crumb.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-slate-700">
                  {crumb.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
