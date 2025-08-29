import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { AdvantageSection } from '@/components/advantage-section';
import { ProcessSection } from '@/components/process-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { CtaSection } from '@/components/cta-section';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <div className="bg-secondary/50">
          <ServicesSection />
        </div>
        <AdvantageSection />
        <div className="bg-secondary/50">
          <ProcessSection />
        </div>
        <PortfolioSection />
        <div className="bg-secondary/50">
          <TestimonialSection />
        </div>
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
