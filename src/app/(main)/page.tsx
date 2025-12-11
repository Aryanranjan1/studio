
'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getProjects } from '@/lib/data';
import { Manifesto } from '@/components/manifesto';
import { PricingSection } from '@/components/pricing-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { Footer } from '@/components/footer';
import { HorizontalServices } from '@/components/horizontal-services';
import { useLenis } from '@studio-freight/react-lenis';

// --- HUD HEADER COMPONENT ---
const HudHeader = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    // Only run on client to avoid hydration mismatch
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-GB', { hour12: false }) + ':' + String(now.getMilliseconds()).padStart(3, '0').slice(0, 2);
      setTime('T-' + timeString);
    };
    
    // Initial call
    updateTime();
    
    const clockInterval = setInterval(updateTime, 50);
    return () => clearInterval(clockInterval);
  }, []);

  return (
    <div className="hud-header absolute top-0 left-0 right-0 mt-7 z-20 pointer-events-none select-none hidden md:block">
      <div className="mx-6 md:mx-10">
        <div className="flex justify-between items-start text-xs md:text-sm text-neutral-400 pb-4">
            <div>
            <div className="hud-left font-bold text-white tracking-widest flex items-center pointer-events-auto">
                <span>AMPIRE STUDIO</span>
            </div>
            <div className="text-neutral-500 mt-1 hidden md:block">// DIGITAL ARCHITECTS</div>
            </div>
            <div className="hud-right font-tech text-primary">{time}</div>
        </div>
      </div>
      <div className="w-full h-px bg-white/20"></div>
    </div>
  );
};

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
  const heroRef = useRef<HTMLHeadElement>(null);

  // Lenis smooth scroll
  useLenis((lenis) => {
    // lenis operations
  });

  // Interactive grid effect
  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = heroElement;
      const x = (clientX / offsetWidth) * 100;
      const y = (clientY / offsetHeight) * 100;
      heroElement.style.setProperty('--mouse-x', `${x}%`);
      heroElement.style.setProperty('--mouse-y', `${y}%`);
    };

    heroElement.addEventListener('mousemove', handleMouseMove);
    return () => {
      heroElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <main className="bg-black text-white font-tech selection:bg-primary selection:text-black">
      
      {/* 1. Hero Section */}
      <header ref={heroRef} className="hero-section h-screen w-full relative flex flex-col justify-center overflow-hidden border-b border-white/20">
        <div className="hero-grid absolute inset-0 pointer-events-none"></div>
        
        <HudHeader />

        <div className="hero-content z-10 px-6 md:px-10">
          <div className="hero-label text-muted-foreground mb-5 tracking-widest text-xs md:text-sm">// EST. 2025 // MALAYSIA</div>
          <h1 className="hero-title font-display text-[12vw] md:text-[8vw] font-bold leading-[0.85] uppercase tracking-[-2px]">
            <span className="block animate-in fade-in slide-in-from-bottom-4 duration-1000">DIGITAL</span>
            <span className="block text-transparent animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200" style={{ WebkitTextStroke: '1px hsl(var(--foreground))' }}>ARCHITECTS</span>
          </h1>
        </div>

        <div className="hero-footer absolute bottom-0 w-full flex justify-between items-end px-6 md:px-10 py-7 border-t border-white/20 z-10 text-xs md:text-sm text-muted-foreground">
          <div className="coord-box">
            <span>LAT: 03.14N</span><br />
            <span>LON: 101.69E</span>
          </div>
          <div className="status-box flex items-center">
            <span className="animate-blink-color inline-block h-2 w-2 rounded-full bg-primary mr-2 shadow-[0_0_10px_currentColor]"></span> SYSTEM ONLINE
          </div>
        </div>
      </header>

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
      <footer className="footer-simple text-center py-24 px-6 md:px-10 border-b border-white/20 relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-white/5 skew-y-12 scale-150 pointer-events-none"></div>
        <h2 className="relative text-[8vw] md:text-[4vw] uppercase mb-10 font-display leading-none">Ready to Initiate?</h2>
        <Button asChild variant="outline" className="relative footer-btn px-12 py-8 text-lg uppercase bg-transparent text-white border-white rounded-none hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300">
            <Link href="/contact">Start Project</Link>
        </Button>
        <p className="relative mt-20 text-muted-foreground text-xs font-tech uppercase tracking-widest">&copy; {new Date().getFullYear()} Ampire Studio. Malaysia.</p>
      </footer>
      <Footer />
       <style jsx>{`
        .hero-section {
          --mouse-x: 50%;
          --mouse-y: 50%;
        }
        .hero-grid {
           background-image: 
            radial-gradient(
              circle at var(--mouse-x) var(--mouse-y),
              hsla(var(--background), 0.3),
              transparent 20vw
            ),
            linear-gradient(to right, hsla(var(--background), 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, hsla(var(--background), 0.5) 1px, transparent 1px);
          background-size: 1px 1px, 50px 50px, 50px 50px;
          transition: background-position 0.2s ease-out;
        }
      `}</style>
    </main>
  );
}
