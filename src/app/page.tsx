import { BlogSection } from '@/components/blog-section';
import { CtaSection } from '@/components/cta-section';
import { FeaturedPortfolio } from '@/components/featured-portfolio';
import { Footer } from '@/components/footer';
import { HeroGrid } from '@/components/hero-grid';
import { OzonteHero } from '@/components/ozonte-hero';
import { PricingSection } from '@/components/pricing-section';
import { ServicesSection } from '@/components/services-section';
import { TestimonialsSection } from '@/components/testimonials-section';

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <OzonteHero />
      <div className="my-16">
        <HeroGrid />
      </div>
      <ServicesSection />
      <PricingSection />
      <FeaturedPortfolio />
      <TestimonialsSection />
      <CtaSection />
      <BlogSection />
      <Footer />
    </main>
  );
}
