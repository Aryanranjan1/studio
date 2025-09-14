
import { Footer } from '@/components/footer';
import { HeroParallax } from '@/components/ui/hero-parallax';
import { ServicesSection } from '@/components/services-section';
import { AdvantageSection } from '@/components/advantage-section';
import { ProcessSection } from '@/components/process-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { ContactSection } from '@/components/contact-section';
import { FaqSection } from '@/components/faq-section';
import { getProjects } from '@/lib/data';
import type { Project } from '@/lib/data';

export default function Home() {
  const projects = getProjects();
  const parallaxProducts = projects.map(p => ({
    title: p.title,
    link: `/work/${p.slug}`,
    thumbnail: p.imageUrl,
  }));

  // The parallax component expects at least 15 items for 3 full rows.
  // We'll duplicate projects to fill it.
  if (projects.length > 0) {
    while (parallaxProducts.length < 15) {
      parallaxProducts.push(...parallaxProducts.slice(0, 15 - parallaxProducts.length));
    }
  }


  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      
      <main className="flex-1">
        <HeroParallax products={parallaxProducts} />
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
