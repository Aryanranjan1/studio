import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AboutSection } from '@/components/about-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { AdvantageSection } from '@/components/advantage-section';
import { ProcessSection } from '@/components/process-section';
import { TsaSection } from '@/components/tsa-section';
import { ProjectFormTsaSection } from '@/components/project-form-tsa-section';
import { SuccessRateSection } from '@/components/success-rate-section';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <Header />
      <main className="flex-1">
        <AboutSection />
        <SuccessRateSection className="bg-alt" />
        <ProjectFormTsaSection />
        <AdvantageSection className="bg-alt" />
        <ProcessSection />
        <TestimonialSection className="bg-alt" />
        <TsaSection />
      </main>
      <Footer />
    </div>
  );
}
