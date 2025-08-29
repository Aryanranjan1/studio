import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { AdvantageSection } from '@/components/advantage-section';
import { ProcessSection } from '@/components/process-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { ContactSection } from '@/components/contact-section';
import { FaqSection } from '@/components/faq-section';
import { SparklesCore } from '@/components/ui/sparkles';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <div className="w-full fixed inset-0 h-screen z-0">
        <SparklesCore
          id="tsparticles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <Header />
      <main className="flex-1 relative z-10">
        <HeroSection />
        <div className="bg-background/80 backdrop-blur-sm">
          <ServicesSection />
          <AdvantageSection />
          <ProcessSection />
          <PortfolioSection />
          <TestimonialSection />
          <ContactSection />
          <FaqSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
