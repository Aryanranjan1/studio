
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { AdvantageSection } from '@/components/advantage-section';
import { ProcessSection } from '@/components/process-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { ContactSection } from '@/components/contact-section';
import { FaqSection } from '@/components/faq-section';
import { getProjects } from '@/lib/data';
import type { Project } from '@/lib/data';
import { GridMotion } from '@/components/ui/grid-motion';
import Link from 'next/link';

export default function Home() {
  const projects = getProjects();

  // The new grid is 4x7, so we need 28 items.
  // We'll duplicate projects to fill the grid.
  const parallaxProjects: Project[] = [];
  if (projects.length > 0) {
    for (let i = 0; i < 28; i++) {
      parallaxProjects.push(projects[i % projects.length]);
    }
  }

  const projectItems = parallaxProjects.map((project, index) => (
    <Link 
      href={`/work/${project.slug}`} 
      key={`${project.id}-${index}`}
      className="relative group block w-full h-full bg-cover bg-center"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${project.imageUrl})` }}
        data-ai-hint={project.imageHint}
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-300"></div>
      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white font-bold text-lg">{project.title}</h3>
      </div>
    </Link>
  ));


  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      
      <main className="flex-1">
        <HeroSection />
        <div className="h-screen w-full relative">
            <GridMotion items={projectItems} />
        </div>
        <ServicesSection className="bg-alt" />
        <AdvantageSection />
        <ProcessSection className="bg-alt" />
        <TestimonialSection />
        <ContactSection className="bg-alt" />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
