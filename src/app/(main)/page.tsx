
'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { getProjects } from '@/lib/data';
import { Manifesto } from '@/components/manifesto';
import { PricingSection } from '@/components/pricing-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { Footer } from '@/components/footer';
import { HorizontalServices } from '@/components/horizontal-services';
import { useLenis } from '@studio-freight/react-lenis';
import { CtaSection } from '@/components/cta-section';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import the WireframeHero component
const WireframeHero = dynamic(
  () => import('@/components/wireframe-hero').then(mod => mod.WireframeHero),
  {
    loading: () => <Skeleton className="h-screen w-full" />,
    ssr: false, // This component is client-side only
  }
);


// --- PROJECT CARD COMPONENT ---
const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  return (
    <div className="project-card group mb-8 last:mb-0">
      <div className="img-wrapper overflow-hidden border border-border mb-5 relative h-[300px] md:h-[450px] block">
        <Link href={`/portfolio/${project.id}`}>
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            className="object-contain transition-all duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button asChild variant="outline" className="bg-background/80 backdrop-blur-md hover:bg-foreground hover:text-background scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 delay-100">
                <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Live preview of ${project.title}`}>
                    Live Preview <MoveRight className="w-4 h-4 ml-2" />
                </a>
            </Button>
        </div>
      </div>
      <div className="project-meta flex justify-between items-end pb-2.5 border-b border-border">
        <div>
          <Link href={`/portfolio/${project.id}`}>
            <h3 className="p-name text-2xl md:text-3xl uppercase font-display hover:text-primary transition-colors">{project.title}</h3>
          </Link>
          <span className="p-cat font-tech text-muted-foreground text-sm">{project.category}</span>
        </div>
        <span className="p-num text-xl font-tech">({String(index + 1).padStart(2, '0')})</span>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
export default function Home() {
  const projects = getProjects().slice(0, 6);

  // Lenis smooth scroll
  useLenis((lenis) => {
    // lenis operations
  });

  return (
    <>
      {/* 1. Hero Section - Full width */}
      <WireframeHero />

      {/* The rest of the page content */}
      <main className="font-tech selection:bg-primary selection:text-primary-foreground">
          {/* 2. Manifesto Section */}
          <Manifesto />
          
          {/* 3. Services Section */}
          <HorizontalServices />

          {/* 4. Projects Section (Responsive Layout) */}
          {projects.length > 0 && (
            <section className="projects-section relative w-full border-b border-border">
              <div className="container max-w-[1400px] mx-auto px-4 lg:px-0 lg:border-l lg:border-r border-border">
                <div className="project-layout flex flex-col lg:flex-row">
                  
                  {/* Left Panel (Sticky on Desktop) */}
                  <div className="left-panel w-full lg:w-2/5 lg:h-screen relative lg:sticky top-0 flex flex-col justify-center py-16 px-6 border-b lg:border-b-0 lg:border-r border-border bg-background z-10">
                    <h2 className="section-title text-5xl md:text-6xl uppercase mb-5 font-display leading-[0.9]">Selected<br />Works</h2>
                    <p className="hero-label text-accent tracking-widest font-tech">// 2024 - 2025</p>
                  </div>

                  {/* Right Panel (Grid on Tablet/Mobile, Scroll on Desktop) */}
                  <div className="right-panel w-full lg:w-3/5 p-6 lg:pl-10 lg:py-16">
                    <div className="project-list grid grid-cols-1 gap-x-8">
                      {projects.map((p, i) => (
                        <ProjectCard key={p.id} project={p} index={i} />
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </section>
          )}


          {/* 5. Pricing Section */}
          <PricingSection />

          {/* 6. Testimonials Section */}
          <TestimonialsSection />

          {/* CTA Section */}
          <CtaSection />

          {/* 7. Footer Section */}
          <Footer />
        </main>
    </>
  );
}
