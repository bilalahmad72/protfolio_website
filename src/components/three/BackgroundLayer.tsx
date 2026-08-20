'use client';

import dynamic from 'next/dynamic';

// WebGL can only exist in the browser, so the scene is code-split away from the
// initial payload and never prerendered.
const WebGLBackground = dynamic(() => import('./WebGLBackground'), { ssr: false });

export default function BackgroundLayer() {
  return <WebGLBackground />;
}
