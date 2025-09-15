
import { Footer } from '@/components/footer';
import { AboutSection } from '@/components/about-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { AdvantageSection } from '@/components/advantage-section';
import { ProcessSection } from '@/components/process-section';
import { TsaSection } from '@/components/tsa-section';
import { SuccessRateSection } from '@/components/success-rate-section';
import { InteractiveImageAccordion } from '@/components/interactive-image-accordion';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <main className="flex-1">
        <InteractiveImageAccordion />
        <AboutSection />
        <SuccessRateSection className="bg-alt" />
        <AdvantageSection />
        <ProcessSection className="bg-alt" />
        <TestimonialSection />
        <TsaSection className="bg-alt" />
      </main>
      <Footer />
    </div>
  );
}
