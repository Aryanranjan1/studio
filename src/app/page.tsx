
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { AdvantageSection } from '@/components/advantage-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { FaqSection } from '@/components/faq-section';
import { ContactSection } from '@/components/contact-section';


export default function Home() {

  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <main className="flex-1">
        <HeroSection />
        <ServicesSection className="bg-alt" />
        <PortfolioSection />
        <AdvantageSection className="bg-alt" />
        <TestimonialSection />
        <FaqSection className="bg-alt" />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
