
"use client";

import dynamic from 'next/dynamic';

// Dynamically import the timeline component with SSR disabled
const RadialOrbitalTimeline = dynamic(
  () => import('@/components/ui/radial-orbital-timeline'),
  { ssr: false }
);

export const ClientOnlyTimeline = RadialOrbitalTimeline;
