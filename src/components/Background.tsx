'use client';

import React from 'react';

export default function Background() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#0B0F19]">
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 bg-transparent opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, white 1px, transparent 0),
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 40px 40px, 40px 40px',
        }}
      />

      {/* Floating Glowing Shapes */}
      <div className="absolute top-[-10%] left-[-10%] h-[50vw] w-[50vw] rounded-full bg-neon-cyan/10 blur-[120px] animate-float-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[60vw] w-[60vw] rounded-full bg-neon-purple/10 blur-[150px] animate-float-slower" />
      <div className="absolute top-[30%] right-[20%] h-[30vw] w-[30vw] rounded-full bg-neon-indigo/5 blur-[100px] animate-float-slow" />

      {/* Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0B0F19_90%)]" />
    </div>
  );
}
