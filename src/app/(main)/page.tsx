
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getProjects } from '@/lib/data';
import { Manifesto } from '@/components/manifesto';
import { PricingSection } from '@/components/pricing-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { Footer } from '@/components/footer';
import { HorizontalServices } from '@/components/horizontal-services';
import { useLenis } from '@studio-freight/react-lenis';
import { WireframeHero } from '@/components/wireframe-hero';

// --- PROJECT CARD COMPONENT ---
const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  return (
    <Link href={`/portfolio/${project.id}`} className="project-card block group mb-20 last:mb-0">
      <div className="img-wrapper overflow-hidden border border-neutral-800 mb-5 relative h-[300px] md:h-[450px]">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="project-meta flex justify-between items-end pb-2.5 border-b border-neutral-800">
        <div>
          <h3 className="p-name text-2xl md:text-3xl uppercase font-display">{project.title}</h3>
          <span className="p-cat font-tech text-neutral-400 text-sm">{project.category}</span>
        </div>
        <span className="p-num text-xl font-tech">({String(index + 1).padStart(2, '0')})</span>
      </div>
    </Link>
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

      {/* The rest of the page content with padding */}
      <div className="md:pl-20">
        <main className="bg-black text-white font-tech selection:bg-primary selection:text-black">
          {/* 2. Manifesto Section */}
          <Manifesto />
          
          {/* 3. Services Section */}
          <HorizontalServices />

          {/* 4. Projects Section (Sticky Layout) */}
          {projects.length > 0 && (
            <section className="projects-section relative w-full bg-black border-b border-white/20">
              <div className="container max-w-[1400px] mx-auto px-0 md:px-5 md:border-l md:border-r border-neutral-800">
                <div className="project-layout flex flex-col md:flex-row">
                  
                  {/* Left Sticky Panel */}
                  <div className="left-panel w-full md:w-2/5 md:h-screen relative md:sticky top-0 flex flex-col justify-center py-16 px-6 md:px-10 border-b md:border-b-0 md:border-r border-neutral-800 bg-black z-10">
                    <h2 className="section-title text-5xl md:text-6xl uppercase mb-5 font-display leading-[0.9]">Selected<br />Works</h2>
                    <p className="hero-label text-primary tracking-widest font-tech">// 2024 - 2025</p>
                  </div>

                  {/* Right Scrolling Panel */}
                  <div className="right-panel w-full md:w-3/5 px-6 md:pl-10 py-16">
                    <div className="project-list flex flex-col">
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

          {/* 7. Footer Section */}
          <Footer />
        </main>
      </div>
    </>
  );
}
