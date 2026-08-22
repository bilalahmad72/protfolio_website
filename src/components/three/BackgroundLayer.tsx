'use client';

import dynamic from 'next/dynamic';
import { useDeferredDecoration } from '@/hooks/useDeferredDecoration';

// WebGL can only exist in the browser, so the scene is code-split away from the
// initial payload and never prerendered.
const WebGLBackground = dynamic(() => import('./WebGLBackground'), { ssr: false });

export default function BackgroundLayer() {
  // Code-splitting alone was not enough: the chunk still downloaded and compiled
  // during the load window. The painted CSS background in <Background /> stands
  // in for this the whole time, so nothing looks broken while it waits — or if
  // it never loads at all.
  const ready = useDeferredDecoration();
  if (!ready) return null;

  return <WebGLBackground />;
}
