import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AboutSection } from '@/components/about-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { AdvantageSection } from '@/components/advantage-section';
import { ProcessSection } from '@/components/process-section';
import { TsaSection } from '@/components/tsa-section';
import { ProjectFormTsaSection } from '@/components/project-form-tsa-section';
import { SuccessRateSection } from '@/components/success-rate-section';
import { PageTitleHeader } from '@/components/page-title-header';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <Header />
      <main className="flex-1">
        <PageTitleHeader
            title="About Ampire Studios"
            subtitle="We exist to help businesses and creators rise above the noise and claim their digital throne."
        />
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
