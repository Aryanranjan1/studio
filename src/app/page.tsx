import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { FaqSection } from '@/components/faq-section';
import { TsaSection } from '@/components/tsa-section';
import { VideoSection } from '@/components/video-section';
import { ScrollRevealText } from '@/components/scroll-reveal-text';
import { AdvantageSection } from '@/components/advantage-section';
import AgencyComparison from '@/components/agency-comparison';
import { ProjectGallerySection } from '@/components/project-gallery-section';
import { getTestimonials } from '@/lib/data';
import type { Testimonial } from '@/lib/data';

export default async function Home() {
  const testimonials: Testimonial[] = await getTestimonials();

  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <main className="flex-1">
        <HeroSection />
        <section className='py-24 sm:py-32'>
            <div className='container max-w-4xl'>
                <ScrollRevealText
                    textClassName='text-center text-foreground'
                >
                    Your brand is a story waiting to be told. A legacy waiting to be built. We don't just design websites; we forge digital empires. Let us be the architects of your digital throne.
                </ScrollRevealText>
            </div>
        </section>
        <PortfolioSection />
        <VideoSection />
        <AdvantageSection />
        <AgencyComparison className="bg-alt" />
        <TestimonialSection testimonials={testimonials} />
        <FaqSection className="bg-alt" />
        <TsaSection />
      </main>
      <Footer />
    </div>
  );
}
