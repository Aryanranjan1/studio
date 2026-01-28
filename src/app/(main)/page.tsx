'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useLenis } from '@studio-freight/react-lenis';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { usePublicProjects } from '@/hooks/use-projects';
import type { PortfolioProject } from '@/lib/data';

// Dynamically import the WireframeHero component
const WireframeHero = dynamic(
  () => import('@/components/wireframe-hero').then(mod => mod.WireframeHero),
  {
    loading: () => <Skeleton className="h-screen w-full" />,
    ssr: false, // This component is client-side only
  }
);

// Dynamically import below-the-fold components
const Manifesto = dynamic(
  () => import('@/components/manifesto').then(mod => mod.Manifesto),
  { loading: () => <Skeleton className="h-48 w-full" /> }
);

const PricingSection = dynamic(
  () => import('@/components/pricing-section').then(mod => mod.PricingSection),
  { loading: () => <Skeleton className="h-96 w-full" /> }
);

const TestimonialsSection = dynamic(
  () => import('@/components/testimonials-section').then(mod => mod.TestimonialsSection),
  { loading: () => <Skeleton className="h-96 w-full" /> }
);

const Footer = dynamic(
  () => import('@/components/footer').then(mod => mod.Footer),
  { loading: () => <Skeleton className="h-64 w-full" /> }
);

const HorizontalServices = dynamic(
  () => import('@/components/horizontal-services').then(mod => mod.HorizontalServices),
  { loading: () => <Skeleton className="h-96 w-full" /> }
);

const CtaSection = dynamic(
  () => import('@/components/cta-section').then(mod => mod.CtaSection),
  { loading: () => <Skeleton className="h-64 w-full" /> }
);


// --- PROJECT CARD COMPONENT ---
const ProjectCard = ({ project, index }: { project: PortfolioProject; index: number }) => {
  return (
    <div className="project-card mb-8 last:mb-0">
      <div className="img-wrapper group overflow-hidden border border-border mb-5 relative h-[300px] md:h-[450px] block">
        <Link href={`/portfolio/${project.slug}`} className="block h-full w-full">
          <Image
            src={project.cardImage.url}
            alt={project.cardImage.alt}
            fill
            className="object-contain transition-all duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        {project.projectUrl && (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black backdrop-blur-sm pointer-events-auto">
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        View
                    </a>
                </Button>
            </div>
        )}
      </div>
      <div className="project-meta flex justify-between items-end pb-2.5 border-b border-border">
        <div>
          <Link href={`/portfolio/${project.slug}`}>
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
  const { data: projects, isLoading: projectsLoading } = usePublicProjects();

  // Lenis smooth scroll
  useLenis((lenis) => {
    // lenis operations
  });

  const displayedProjects = projects?.slice(0, 6) || [];

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
          {(projectsLoading || displayedProjects.length > 0) && (
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
                      {projectsLoading ? (
                        <>
                          <Skeleton className="h-[500px] w-full mb-8" />
                          <Skeleton className="h-[500px] w-full mb-8" />
                        </>
                      ) : (
                        displayedProjects.map((p, i) => (
                          <ProjectCard key={p.id} project={p} index={i} />
                        ))
                      )}
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
