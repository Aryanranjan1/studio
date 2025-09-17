import { Footer } from '@/components/footer';
import { AboutHero } from '@/components/about-hero';
import { AboutSection } from '@/components/about-section';
import { TestimonialSection } from '@/components/testimonial-section';

import { ProcessSection } from '@/components/process-section';
import { TsaSection } from '@/components/tsa-section';
import { SuccessRateSection } from '@/components/success-rate-section';
import { ScrollReveal } from '@/components/scroll-reveal';
import { getTestimonials } from '@/lib/data';
import type { Testimonial } from '@/lib/data';

export default async function AboutPage() {
  const testimonials: Testimonial[] = await getTestimonials();

  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <main className="flex-1">
        <ScrollReveal>
          <AboutHero />
        </ScrollReveal>
        <ScrollReveal>
          <AboutSection />
        </ScrollReveal>
        <ScrollReveal>
          <SuccessRateSection className="bg-alt" />
        </ScrollReveal>
        
        <ScrollReveal>
          <ProcessSection className="bg-alt" />
        </ScrollReveal>
        <ScrollReveal>
          <TestimonialSection testimonials={testimonials} />
        </ScrollReveal>
        <ScrollReveal>
          <TsaSection className="bg-alt" />
        </ScrollReveal>
      </main>
      
    </div>
  );
}
