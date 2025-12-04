import { BlogSection } from '@/components/blog-section';
import { CtaSection } from '@/components/cta-section';
import { FeaturedPortfolio } from '@/components/featured-portfolio';
import { Footer } from '@/components/footer';
import { HeroGrid } from '@/components/hero-grid';
import { ProcessSection } from '@/components/process-section';
import { ServicesSection } from '@/components/services-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { WhyChooseUsSection } from '@/components/why-choose-us-section';

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroGrid />
      <ServicesSection />
      <WhyChooseUsSection />
      <FeaturedPortfolio />
      <ProcessSection />
      <TestimonialsSection />
      <CtaSection />
      <BlogSection />
      <Footer />
    </main>
  );
}
