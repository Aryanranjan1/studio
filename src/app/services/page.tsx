
import { Footer } from '@/components/footer';
import { ServiceCategorySection } from '@/components/service-category-section';
import { AdvantageSection } from '@/components/advantage-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { TsaSection } from '@/components/tsa-section';
import { ProcessSection } from '@/components/process-section';

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <main className="flex-1">
        <ServiceCategorySection />
        <AdvantageSection />
        <ProcessSection className="bg-alt" />
        <TestimonialSection />
        <TsaSection className="bg-alt" />
      </main>
      <Footer />
    </div>
  );
}
