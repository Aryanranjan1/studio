import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ServiceCategorySection } from '@/components/service-category-section';
import { ProcessSection } from '@/components/process-section';
import { AdvantageSection } from '@/components/advantage-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { ContactSection } from '@/components/contact-section';
import { FaqSection } from '@/components/faq-section';
import { TsaSection } from '@/components/tsa-section';

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <Header />
      <main className="flex-1">
        <ServiceCategorySection />
        <ProcessSection className="bg-white/5 backdrop-blur-sm" />
        <AdvantageSection />
        <TestimonialSection className="bg-white/5 backdrop-blur-sm" />
        <ContactSection />
        <FaqSection className="bg-white/5 backdrop-blur-sm" />
        <TsaSection />
      </main>
      <Footer />
    </div>
  );
}
