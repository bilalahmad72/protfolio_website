'use client';

import dynamic from 'next/dynamic';
import { useDeferredDecoration } from '@/hooks/useDeferredDecoration';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

export default function HeroSceneLayer({ className }: { className?: string }) {
  const ready = useDeferredDecoration();
  if (!ready) return null;

  return <HeroScene className={className} />;
}
