
import { Footer } from '@/components/footer';
import { PortfolioSection } from '@/components/portfolio-section';
import { AdvantageSection } from '@/components/advantage-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { TsaSection } from '@/components/tsa-section';
import { ProcessSection } from '@/components/process-section';

export default function WorkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <main className="flex-1">
        <PortfolioSection />
        <AdvantageSection />
        <ProcessSection className="bg-alt" />
        <TestimonialSection />
        <TsaSection className="bg-alt" />
      </main>
      <Footer />
    </div>
  );
}
