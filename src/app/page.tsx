
import Link from 'next/link';
import type { SiteSettings } from '@/lib/data';

// A simple placeholder for your Logo component
const Logo = () => (
  <Link href="/" className="font-headline text-2xl font-bold">
    AMpire
  </Link>
);

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t bg-background text-foreground/80">
      <div className="container mx-auto px-6 py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Architects of your digital empire.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:col-span-2">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Contact</h3>
              <ul className="space-y-1 text-sm">
                <li><a href={`mailto:${settings.contactEmail}`} className="hover:text-primary">{settings.contactEmail}</a></li>
                <li>{settings.contactPhone}</li>
                <li className="max-w-xs">{settings.address}</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Follow Us</h3>
              <div className="flex items-center space-x-4">
                {settings.socials.map((social) => (
                  <Link 
                    key={social.platform} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {social.platform}
                    <span className="sr-only">{social.platform}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} AMpire Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
import PageAnimations from '@/components/page-animations';
import { HeroSection } from '@/components/hero-section';
import { ScrollRevealText } from '@/components/scroll-reveal-text';
import { PortfolioSection } from '@/components/portfolio-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { FaqSection } from '@/components/faq-section';
import { TsaSection } from '@/components/tsa-section';
import { VideoSection } from '@/components/video-section';
import { ScrollReveal } from '@/components/scroll-reveal';
import { HomeAboutSection } from '@/components/HomeAboutSection';

import AgencyComparison from '@/components/agency-comparison';
import { getProjects, getTestimonials, getServices } from '@/lib/data';
import type { Testimonial, Project, Service } from '@/lib/data';

export default async function Home() {
  const testimonials: Testimonial[] = await getTestimonials();
  const projects: Project[] = await getProjects();
  const services: Service[] = await getServices();

  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <PageAnimations />
      <main className="flex-1">
        <HeroSection />
                
        <ScrollReveal>
          <PortfolioSection projects={projects} services={services} />
        </ScrollReveal>
        <ScrollReveal>
          <HomeAboutSection projects={projects} className="bg-alt" />
        </ScrollReveal>
        <ScrollReveal>
          <VideoSection />
        </ScrollReveal>
        
        <ScrollReveal>
          <AgencyComparison className="bg-alt" />
        </ScrollReveal>
        <ScrollReveal>
          <TestimonialSection testimonials={testimonials} />
        </ScrollReveal>
        <ScrollReveal>
          <FaqSection className="bg-alt" />
        </ScrollReveal>
        <ScrollReveal>
          <TsaSection />
        </ScrollReveal>
      </main>
    </div>
  );
}
