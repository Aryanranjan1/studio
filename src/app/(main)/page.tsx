'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getProjects } from '@/lib/data';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Manifesto } from '@/components/manifesto';
import { HorizontalServices } from '@/components/horizontal-services';
import { PricingSection } from '@/components/pricing-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { Crown } from 'lucide-react';

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  return (
    <Link href={`/portfolio/${project.id}`} className="project-card block group">
      <div className="img-wrapper overflow-hidden border border-white mb-5 relative h-[400px]">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
          loading="lazy"
        />
      </div>
      <div className="project-meta flex justify-between items-end pb-2.5 border-b border-neutral-700">
        <div>
          <h3 className="p-name text-2xl uppercase font-display">{project.title}</h3>
          <span className="p-cat font-tech text-neutral-400">{project.category}</span>
        </div>
        <span className="p-num text-xl">({String(index + 1).padStart(2, '0')})</span>
      </div>
    </Link>
  );
};

const HudHeader = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const clockInterval = setInterval(() => {
      const now = new Date();
      const timeString =
        now.toLocaleTimeString('en-US', { hour12: false }) +
        ':' +
        String(now.getMilliseconds()).padStart(3, '0').substring(0, 2);
      setTime('T-' + timeString);
    }, 50);

    return () => clearInterval(clockInterval);
  }, []);

  return (
    <div className="hud-header absolute top-0 left-0 w-full flex justify-between px-10 py-7 z-10 text-sm text-neutral-400 pointer-events-none">
      <div>
        <div className="hud-left font-bold text-white tracking-widest flex items-center">
            <Crown className="h-4 w-4 mr-2" />
            <span>AMPIRE STUDIO</span>
        </div>
        <div className="text-neutral-500 mt-1">// DIGITAL ARCHITECTS</div>
      </div>
      <div className="hud-right font-tech text-primary">{time}</div>
    </div>
  );
};

export default function Home() {
  const projects = getProjects().slice(0, 4);

  return (
    <main className="bg-bg-color text-text-color font-tech overflow-x-hidden">
      {/* Hero Section */}
      <header className="hero-section h-screen w-full relative flex flex-col justify-center overflow-hidden border-b border-border-active">
        <div className="hero-grid absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
        {/* Spotlight effect can be added with a client component tracking mouse position */}
        
        <HudHeader />

        <div className="hero-content z-10 px-10">
          <div className="hero-label text-neutral-400 mb-5 tracking-widest">// EST. 2025 // MALAYSIA</div>
          <h1 className="hero-title font-display text-[8vw] font-bold leading-[0.9] uppercase tracking-[-2px]">
            <span className="block">DIGITAL</span>
            <span className="block text-transparent" style={{ WebkitTextStroke: '2px #fff' }}>ARCHITECTS</span>
          </h1>
        </div>

        <div className="hero-footer absolute bottom-0 w-full flex justify-between items-end px-10 py-7 border-t border-border-color z-10 text-sm text-neutral-400">
          <div className="coord-box">
            <span>LAT: 03.14N</span><br />
            <span>LON: 101.69E</span>
          </div>
          <div className="status-box flex items-center">
            <span className="animate-ping-slow inline-block h-2 w-2 rounded-full bg-primary mr-2"></span> SYSTEM ONLINE
          </div>
        </div>
      </header>

      {/* Manifesto Section */}
      <Manifesto />
      
      {/* Services Section */}
      <HorizontalServices />

      {/* Projects Section */}
      <section className="projects-section relative w-full bg-bg-color border-b border-border-active">
        <div className="container max-w-7xl mx-auto px-5 border-l border-r border-neutral-800">
          <div className="project-layout flex flex-col md:flex-row">
            <div className="left-panel md:w-2/5 md:h-screen md:sticky top-0 flex flex-col justify-center py-16 md:py-0 md:pr-10 md:border-r md:border-border-active bg-bg-color z-10">
              <h2 className="section-title text-4xl uppercase mb-5 font-display">Selected<br />Works</h2>
              <p className="hero-label text-neutral-400 tracking-widest">// 2024 - 2025</p>
            </div>
            <div className="right-panel md:w-3/5 md:pl-10 py-16">
              <div className="project-list flex flex-col gap-20">
                {projects.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Re-integrated Pricing Section */}
      <PricingSection />

      {/* Re-integrated Testimonials Section */}
      <TestimonialsSection />


      {/* Footer Section */}
      <footer className="footer-simple text-center py-24 px-10 border-b border-white">
        <h2 className="text-[4vw] uppercase mb-10 font-display">Start a Project</h2>
        <Button asChild variant="outline" className="footer-btn px-12 py-7 uppercase bg-transparent text-white border-white hover:bg-white hover:text-black">
            <Link href="/contact">Contact Us</Link>
        </Button>
        <p className="mt-10 text-neutral-500 text-xs">&copy; {new Date().getFullYear()} Ampire Studio. Malaysia.</p>
      </footer>
    </main>
  );
}
