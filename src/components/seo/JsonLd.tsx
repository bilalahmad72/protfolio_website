import React from 'react';

/**
 * Emits a JSON-LD block.
 *
 * The payload is authored in this codebase, never from user input, so the
 * only escaping needed is for `<` — which would otherwise let a string close
 * the surrounding script tag early.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\u003c'),
      }}
    />
  );
}
