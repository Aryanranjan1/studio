import { Footer } from '@/components/footer';
import { ServiceCategorySection } from '@/components/service-category-section';

import { TestimonialSection } from '@/components/testimonial-section';
import { TsaSection } from '@/components/tsa-section';
import { ProcessSection } from '@/components/process-section';
import { ScrollReveal } from '@/components/scroll-reveal';
import { getServices, getTestimonials } from '@/lib/data';
import type { Service, Testimonial } from '@/lib/data';

export default async function ServicesPage() {
  const services: Service[] = await getServices();
  const testimonials: Testimonial[] = await getTestimonials();

  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <main className="flex-1">
        <ScrollReveal>
          <ServiceCategorySection services={services} />
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
