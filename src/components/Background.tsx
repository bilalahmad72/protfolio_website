'use client';

import React from 'react';

/**
 * The static base layer beneath the WebGL canvas: the themed ground, a blueprint
 * grid and two soft blue washes. It renders on the server, so the page never
 * flashes an unstyled background while the 3D scene is still being fetched.
 * Every colour here is a token, so it follows the light/dark switch.
 */
export default function Background() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-surface">
      {/* Blueprint grid, fading out toward the bottom of the viewport. */}
      <div
        className="absolute inset-0 opacity-[0.55] [mask-image:linear-gradient(to_bottom,#000_0%,transparent_80%)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px, 64px 64px',
        }}
      />

      {/* Slow-drifting colour fields — blue 100/200 doing the tinting. */}
      <div className="absolute top-[-18%] left-[-12%] h-[55vw] w-[55vw] rounded-full bg-accent-100 blur-[150px] animate-float-slow" />
      <div className="absolute right-[-12%] bottom-[-18%] h-[60vw] w-[60vw] rounded-full bg-accent-200/70 blur-[170px] animate-float-slower" />
      <div className="absolute top-[38%] right-[20%] h-[30vw] w-[30vw] rounded-full bg-accent-100 blur-[130px] animate-float-slow" />

      {/* Keeps the page from dissolving into flat white at the very edges. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,var(--edge-tint)_100%)]" />
    </div>
  );
}
