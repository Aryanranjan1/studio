
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
import { HeroParallax } from '@/components/ui/hero-parallax';

export default function Home() {
  const projects = getProjects();

  // We need 15 projects for the parallax effect.
  // If we don't have enough, we'll duplicate them.
  const parallaxProjects = [...projects];
  while (parallaxProjects.length < 15) {
    parallaxProjects.push(...projects);
  }

  const products = parallaxProjects.slice(0, 15).map((project) => ({
    title: project.title,
    link: `/work/${project.slug}`,
    thumbnail: project.imageUrl,
  }));

  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      
      <main className="flex-1">
        <HeroSection />
        <HeroParallax products={products} />
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
