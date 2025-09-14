
"use client";

import { DynamicFrameLayout } from "@/components/ui/dynamic-frame-layout";
import { ScrollReveal } from "./scroll-reveal";
import { getProjects } from "@/lib/data";
import type { Project } from "@/lib/data";

const initialFrames = [
  { id: 1, video: "https://cdn.dribbble.com/userupload/13072381/file/original-4b3db1123497a688d363321528437298.mp4", defaultPos: { x: 0, y: 0, w: 4, h: 4 }, mediaSize: 1.5, },
  { id: 2, video: "https://cdn.dribbble.com/userupload/12918809/file/original-3c7d677d248b11d8b98b9a1039d99786.mp4", defaultPos: { x: 4, y: 0, w: 4, h: 4 }, mediaSize: 1.5, },
  { id: 3, video: "https://cdn.dribbble.com/userupload/12693836/file/original-13838119865a9a4b8689b9644f2d0a3d.mp4", defaultPos: { x: 8, y: 0, w: 4, h: 8 }, mediaSize: 1.5, },
  { id: 4, video: "https://cdn.dribbble.com/userupload/12271810/file/original-a7465f241a35017c181f47137f8d758f.mp4", defaultPos: { x: 0, y: 4, w: 8, h: 8 }, mediaSize: 1.5, },
  { id: 5, video: "https://cdn.dribbble.com/userupload/11831515/file/original-a0ee159f84803d3c7c211440c96f014e.mp4", defaultPos: { x: 8, y: 8, w: 4, h: 4 }, mediaSize: 1.5, },
];


export function VideoSection({ className }: { className?: string }) {

  return (
    <section id="gallery" className={className}>
      <div className="container py-24 sm:py-32">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Our Visual Showcase
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              A curated look at the stunning visuals and user-centric designs we've brought to life for our clients.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <div className="mt-16 max-w-5xl mx-auto h-[600px]">
            <DynamicFrameLayout frames={initialFrames} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

