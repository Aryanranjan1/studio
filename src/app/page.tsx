
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { AdvantageSection } from '@/components/advantage-section';
import { ProcessSection } from '@/components/process-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { ContactSection } from '@/components/contact-section';
import { FaqSection } from '@/components/faq-section';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      
      <main className="flex-1">
        <HeroSection />
        <PortfolioSection />
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
