import React from 'react';

/**
 * The static base layer beneath the WebGL canvas.
 *
 * This used to be three 55–60vw circles with `blur-[150px]` running a continuous
 * float animation. A blurred element cannot be composited, so each frame
 * repainted the whole area — a large part of the 31.8 s of main-thread work
 * Lighthouse measured against only 1.9 s of script.
 *
 * Radial gradients produce the same soft wash with no filter and no animation,
 * and they paint once.
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

      {/* Colour wash — gradients rather than blurred shapes. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(60vw 60vw at 8% 0%, var(--color-accent-100) 0%, transparent 60%),
            radial-gradient(65vw 65vw at 95% 100%, var(--color-accent-200) 0%, transparent 60%),
            radial-gradient(35vw 35vw at 78% 42%, var(--color-accent-100) 0%, transparent 65%)
          `,
        }}
      />

      {/* Keeps the page from dissolving into flat white at the very edges. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,var(--edge-tint)_100%)]" />
    </div>
  );
}
