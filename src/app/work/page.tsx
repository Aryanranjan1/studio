"use client";

import { Footer } from '@/components/footer';
import { AdvantageSection } from '@/components/advantage-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { TsaSection } from '@/components/tsa-section';
import { ProcessSection } from '@/components/process-section';
import { StickyScrollReveal } from '@/components/ui/sticky-scroll-reveal';
import { getProjects } from '@/lib/data';

export default function WorkPage() {
  const projects = getProjects();
  const content = projects.map(p => ({
    title: p.title,
    description: p.summary,
    content: (
        <div className="h-full w-full bg-background flex items-center justify-center text-white">
            {/* You can customize the visual content for each project here */}
        </div>
    )
  }));


  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <main className="flex-1">
        <StickyScrollReveal content={content} />
        <AdvantageSection className="bg-alt" />
        <ProcessSection />
        <TestimonialSection className="bg-alt" />
        <TsaSection />
      </main>
      <Footer />
    </div>
  );
}
