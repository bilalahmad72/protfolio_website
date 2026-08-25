import React from 'react';

/**
 * Emits a JSON-LD block.
 *
 * `<` is replaced with its `\u003c` JSON escape so a string can never close
 * the surrounding script tag early. Note the doubled backslash: `'\u003c'` is
 * the six characters JSON decodes back to `<`, whereas `'<'` is simply the
 * `<` character itself — writing it that way makes the replacement a no-op,
 * which is exactly the bug this once had.
 *
 * The payload is authored in this codebase today, so this is defence in depth
 * rather than a live fix. It stops being optional the moment any of it comes
 * from content someone else can edit.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
