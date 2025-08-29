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
          minSize={0.6}
          maxSize={1.4}
          particleDensity={120}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <Header />
      <main className="flex-1 relative z-10">
        <HeroSection />
        <ServicesSection className="bg-black/30 backdrop-blur-sm" />
        <AdvantageSection />
        <ProcessSection className="bg-black/30 backdrop-blur-sm" />
        <PortfolioSection />
        <TestimonialSection className="bg-black/30 backdrop-blur-sm" />
        <ContactSection />
        <FaqSection className="bg-black/30 backdrop-blur-sm" />
      </main>
      <Footer />
    </div>
  );
}
