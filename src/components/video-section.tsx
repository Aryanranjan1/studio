
"use client";

import { DynamicFrameLayout } from "@/components/ui/dynamic-frame-layout";
import { ScrollReveal } from "./scroll-reveal";

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
      <div className="container py-12 sm:py-16">
        <ScrollReveal>
          <div className="mt-8 max-w-5xl mx-auto h-[600px]">
            <DynamicFrameLayout 
                frames={initialFrames} 
                hoverSize={6}
                gapSize={4}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
