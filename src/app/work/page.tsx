
"use client";

import { Footer } from '@/components/footer';
import { AdvantageSection } from '@/components/advantage-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { TsaSection } from '@/components/tsa-section';
import { ProcessSection } from '@/components/process-section';
import { StickyScrollGallery } from '@/components/ui/sticky-scroll-gallery';
import { VideoSection } from '@/components/video-section';
import { WorkHero } from '@/components/work-hero';
import { ProjectGallerySection } from '@/components/project-gallery-section';

export default function WorkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <main className="flex-1">
        <WorkHero />
        <StickyScrollGallery />
        <VideoSection />
        <ProjectGallerySection />
        <AdvantageSection className="bg-alt" />
        <ProcessSection />
        <TestimonialSection className="bg-alt" />
        <TsaSection />
      </main>
      <Footer />
    </div>
  );
}
