
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
    <main className="w-full overflow-x-hidden bg-black text-white">
      <div className="grid grid-cols-12 gap-px border-l border-r border-neutral-800 bg-neutral-800">
        <div className="col-span-12 bg-black">
          <OzonteHero />
        </div>
        <div className="col-span-12 bg-black pt-16">
          <HeroGrid />
        </div>
        <div className="col-span-12 bg-black">
          <ServicesSection />
        </div>
        <div className="col-span-12 bg-black">
          <FeaturedPortfolio />
        </div>
        <div className="col-span-12 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <PricingSection />
          </div>
        </div>
        <div className="col-span-12 bg-black my-16">
          <TestimonialsSection />
        </div>
         <div className="col-span-12 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <CtaSection />
          </div>
        </div>
        <div className="col-span-12 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <BlogSection />
          </div>
        </div>
        <div className="col-span-12 bg-black">
          <Footer />
        </div>
      </div>
    </main>
  );
}
