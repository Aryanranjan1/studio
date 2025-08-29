import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PortfolioSection } from '@/components/portfolio-section';
import { ProcessSection } from '@/components/process-section';
import { AdvantageSection } from '@/components/advantage-section';
import { TestimonialSection } from '@/components/testimonial-section';

export default function WorkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <Header />
      <main className="flex-1">
        <PortfolioSection />
        <ProcessSection className="bg-white/5 backdrop-blur-sm" />
        <AdvantageSection />
        <TestimonialSection className="bg-white/5 backdrop-blur-sm" />
      </main>
      <Footer />
    </div>
  );
}
