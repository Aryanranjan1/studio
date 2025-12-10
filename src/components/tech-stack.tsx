'use client';

import { DraggableServices } from '@/components/draggable-services';

const technologies = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'Firebase',
  'Figma',
  'Vercel',
  'Webflow',
  'Zapier',
  'Airtable'
];

export function TechStack() {
  return (
    <div className="col-span-12 bg-black border-b border-neutral-800 p-8 md:p-16">
      <div className="mb-12">
        <h2 className="font-headline text-5xl md:text-6xl font-bold">Technology Stack</h2>
      </div>
      <div className="relative min-h-[400px] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]">
        <DraggableServices items={technologies} />
      </div>
    </div>
  );
}
