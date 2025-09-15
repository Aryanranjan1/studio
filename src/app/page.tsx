

import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { FaqSection } from '@/components/faq-section';
import { TsaSection } from '@/components/tsa-section';
import { VideoSection } from '@/components/video-section';
import { ScrollRevealText } from '@/components/scroll-reveal-text';
import { AdvantageSection } from '@/components/advantage-section';
import { ComparisonSection } from '@/components/comparison-section';


export default function Home() {

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
        <AdvantageSection />
        <ComparisonSection className="bg-alt" />
        <PortfolioSection />
        <VideoSection />
        <TestimonialSection className="bg-alt"/>
        <FaqSection />
        <TsaSection className="bg-alt" />
      </main>
      <Footer />
    </div>
  );
}
