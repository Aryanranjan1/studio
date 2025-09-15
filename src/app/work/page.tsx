import { Footer } from '@/components/footer';
import { AdvantageSection } from '@/components/advantage-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { TsaSection } from '@/components/tsa-section';
import { ProcessSection } from '@/components/process-section';
import { StickyScrollGallery } from '@/components/ui/sticky-scroll-gallery';
import { VideoSection } from '@/components/video-section';
import { ProjectGallerySection } from '@/components/project-gallery-section';
import { getProjects, getTestimonials } from '@/lib/data';
import type { Project, Testimonial } from '@/lib/data';

export default async function WorkPage() {
  const projects: Project[] = await getProjects();
  const testimonials: Testimonial[] = await getTestimonials();

  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <main className="flex-1">
        <StickyScrollGallery projects={projects} />
        <VideoSection />
        <ProjectGallerySection projects={projects} />
        <AdvantageSection className="bg-alt" />
        <ProcessSection />
        <TestimonialSection testimonials={testimonials} className="bg-alt" />
        <TsaSection />
      </main>
      <Footer />
    </div>
  );
}
