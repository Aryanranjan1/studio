import { Footer } from '@/components/footer';
import { AboutHero } from '@/components/about-hero';
import { AboutSection } from '@/components/about-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { AdvantageSection } from '@/components/advantage-section';
import { ProcessSection } from '@/components/process-section';
import { TsaSection } from '@/components/tsa-section';
import { SuccessRateSection } from '@/components/success-rate-section';
import { getTestimonials } from '@/lib/data';
import type { Testimonial } from '@/lib/data';

export default async function AboutPage() {
  const testimonials: Testimonial[] = await getTestimonials();

  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <main className="flex-1">
        <AboutHero />
        <AboutSection />
        <SuccessRateSection className="bg-alt" />
        <AdvantageSection />
        <ProcessSection className="bg-alt" />
        <TestimonialSection testimonials={testimonials} />
        <TsaSection className="bg-alt" />
      </main>
      <Footer />
    </div>
  );
}
