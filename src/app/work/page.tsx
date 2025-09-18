import { Footer } from '@/components/footer';

import { TestimonialSection } from '@/components/testimonial-section';
import { TsaSection } from '@/components/tsa-section';
import { ProcessSection } from '@/components/process-section';
import { StickyScrollGallery } from '@/components/ui/sticky-scroll-gallery';
import { VideoSection } from '@/components/video-section';
import { ProjectGallerySection } from '@/components/project-gallery-section';
import { ScrollReveal } from '@/components/scroll-reveal';
import { getProjects, getTestimonials } from '@/lib/data';
import type { Project, Testimonial } from '@/lib/data';
import { WorkFooterCta } from '@/components/work-footer-cta';

export default async function WorkPage() {
  const projects: Project[] = await getProjects();
  const testimonials: Testimonial[] = await getTestimonials();

  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <main className="flex-1">
        <ScrollReveal>
          <StickyScrollGallery projects={projects} />
        </ScrollReveal>
        <ScrollReveal>
          <VideoSection />
        </ScrollReveal>
        <ScrollReveal>
          <ProjectGallerySection projects={projects} />
        </ScrollReveal>
        <ScrollReveal>
          <ProcessSection />
        </ScrollReveal>
        <ScrollReveal>
          <TestimonialSection testimonials={testimonials} className="bg-alt" />
        </ScrollReveal>
        <ScrollReveal>
          <TsaSection />
        </ScrollReveal>
      </main>
      
    </div>
  );
}
