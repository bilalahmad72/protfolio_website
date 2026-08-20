'use client';

import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

export default function HeroSceneLayer({ className }: { className?: string }) {
  return <HeroScene className={className} />;
}
