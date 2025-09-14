
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { FaqSection } from '@/components/faq-section';
import { TsaSection } from '@/components/tsa-section';


export default function Home() {

  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <main className="flex-1">
        <HeroSection />
        <PortfolioSection className="bg-alt" />
        <TestimonialSection />
        <FaqSection className="bg-alt" />
        <TsaSection />
      </main>
      <Footer />
    </div>
  );
}
