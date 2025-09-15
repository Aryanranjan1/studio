
"use client";

import { Footer } from '@/components/footer';
import { AdvantageSection } from '@/components/advantage-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { TsaSection } from '@/components/tsa-section';
import { ProcessSection } from '@/components/process-section';
import { PageTitleHeader } from '@/components/page-title-header';
import { getProjects } from '@/lib/data';

export default function WorkPage() {
  const projects = getProjects();

  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <main className="flex-1">
        <PageTitleHeader 
            title="Our Work"
            subtitle="A showcase of our finest projects and digital experiences."
        />
        <AdvantageSection className="bg-alt" />
        <ProcessSection />
        <TestimonialSection className="bg-alt" />
        <TsaSection />
      </main>
      <Footer />
    </div>
  );
}
