import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AboutSection } from '@/components/about-section';
import { TestimonialSection } from '@/components/testimonial-section';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <Header />
      <main className="flex-1">
        <AboutSection />
        <TestimonialSection className="bg-white/5 backdrop-blur-sm" />
      </main>
      <Footer />
    </div>
  );
}
