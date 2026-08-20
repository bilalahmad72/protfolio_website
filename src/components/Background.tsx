'use client';

import React from 'react';

/**
 * The static base layer beneath the WebGL canvas: colour wash, blueprint grid
 * and vignette. It renders on the server, so the page never flashes a flat
 * black background while the 3D scene is still being fetched.
 */
export default function Background() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#0B0F19]">
      {/* Blueprint grid, fading out toward the bottom of the viewport. */}
      <div
        className="absolute inset-0 opacity-[0.04] [mask-image:linear-gradient(to_bottom,#000_0%,transparent_85%)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px, 64px 64px',
        }}
      />

      {/* Slow-drifting colour fields. */}
      <div className="absolute top-[-15%] left-[-10%] h-[55vw] w-[55vw] rounded-full bg-neon-cyan/10 blur-[140px] animate-float-slow" />
      <div className="absolute bottom-[-15%] right-[-10%] h-[60vw] w-[60vw] rounded-full bg-neon-purple/10 blur-[160px] animate-float-slower" />
      <div className="absolute top-[35%] right-[18%] h-[32vw] w-[32vw] rounded-full bg-neon-indigo/[0.07] blur-[120px] animate-float-slow" />

      {/* Horizon glow that anchors the 3D grid drawn above this layer. */}
      <div className="absolute inset-x-0 bottom-0 h-[38vh] bg-[radial-gradient(70%_100%_at_50%_100%,rgba(0,242,254,0.10),transparent_70%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,#070A12_95%)]" />
    </div>
  );
}
