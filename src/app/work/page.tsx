
import { Footer } from '@/components/footer';
import { PortfolioSection } from '@/components/portfolio-section';
import { AdvantageSection } from '@/components/advantage-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { TsaSection } from '@/components/tsa-section';
import { ProcessSection } from '@/components/process-section';
import { PageTitleHeader } from '@/components/page-title-header';

export default function WorkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <main className="flex-1">
        <PageTitleHeader 
            title="Our Work"
            subtitle="A showcase of our finest projects and digital experiences."
        />
        <PortfolioSection />
        <AdvantageSection className="bg-alt" />
        <ProcessSection />
        <TestimonialSection className="bg-alt" />
        <TsaSection />
      </main>
      <Footer />
    </div>
  );
}
