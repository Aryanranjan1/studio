'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    num: "01",
    title: "Web\nEngineering",
    items: ["> Next.js Architecture", "> React Native", "> Performance Optimization"],
  },
  {
    num: "02",
    title: "Interface\nDesign",
    items: ["> Atomic Design Systems", "> Wireframing", "> 3D Implementation"],
  },
  {
    num: "03",
    title: "Backend\nSystems",
    items: ["> Python / Django", "> Cloud Infrastructure", "> API Development"],
  },
  {
    num: "04",
    title: "SEO &\nGrowth",
    items: ["> Technical Audits", "> Semantic HTML", "> Core Vitals"],
  },
];

const ServiceCard = ({ service }: { service: typeof services[0] }) => (
    <div className="service-card w-full md:min-w-[450px] md:h-full border border-white/20 md:-mr-px flex flex-col justify-between p-8 md:p-10 bg-[#050505] transition-colors duration-300 hover:bg-white hover:text-black mb-5 md:mb-0">
        <div className="svc-num text-4xl md:text-5xl font-bold opacity-30 mb-4 md:mb-0 font-display">{service.num}</div>
        <div className="svc-content">
            <h3 className="text-3xl md:text-5xl mb-5 uppercase font-display whitespace-pre-wrap leading-[0.9]">{service.title}</h3>
            <ul className="svc-list">
                {service.items.map((item, i) => (
                    <li key={i} className="border-t border-neutral-800 py-4 text-sm md:text-base transition-colors duration-300 font-tech">{item}</li>
                ))}
            </ul>
        </div>
    </div>
);

export function HorizontalServices() {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth > 768);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    useEffect(() => {
        if (!isDesktop || !containerRef.current || !trackRef.current) return;

        const container = containerRef.current;
        const track = trackRef.current;
        let currentX = 0;
        let targetX = 0;
        const easing = 0.08;

        const handleWheel = (e: WheelEvent) => {
            const { deltaY } = e;
            const scrollWidth = track.scrollWidth;
            const containerWidth = container.clientWidth;
            const maxScroll = scrollWidth - containerWidth;

            // Update targetX based on scroll delta
            targetX -= deltaY;

            // Clamp the targetX to be within bounds [0, -maxScroll]
            targetX = Math.max(-maxScroll, Math.min(0, targetX));
        };

        const animationFrame = () => {
             // Linear interpolation for smooth scrolling
            currentX += (targetX - currentX) * easing;
            track.style.transform = `translateX(${currentX}px)`;
            requestAnimationFrame(animationFrame);
        };
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    document.body.style.overflow = 'hidden';
                    container.addEventListener('wheel', handleWheel, { passive: true });
                    requestAnimationFrame(animationFrame);
                } else {
                    document.body.style.overflow = '';
                    container.removeEventListener('wheel', handleWheel);
                }
            },
            { threshold: 0.5 } // Trigger when 50% of the element is visible
        );

        observer.observe(container);

        return () => {
            document.body.style.overflow = '';
            observer.disconnect();
            container.removeEventListener('wheel', handleWheel);
        };

    }, [isDesktop]);

    if (!isDesktop) {
         return (
            <section className="bg-[#050505] border-b border-white/20 py-10 px-5">
                <div className="mb-8">
                  <h2 className='font-tech text-xl uppercase text-white'>// Capabilities</h2>
                </div>
                 <div className="flex flex-col gap-5">
                    {services.map((service) => (
                        <ServiceCard key={service.num} service={service} />
                    ))}
                </div>
            </section>
        );
    }
  
    return (
    <section ref={containerRef} className="services-section relative h-screen bg-[#050505] border-b border-white/20 overflow-hidden flex items-center">
        <div className="absolute top-10 left-10 z-10 text-white mix-blend-difference">
          <h2 className='font-tech text-xl uppercase'>// Capabilities</h2>
        </div>
        <div 
            ref={trackRef}
            className="horizontal-track flex h-[70vh] px-[5vw] w-auto"
        >
          {services.map((service) => (
            <ServiceCard key={service.num} service={service} />
          ))}
        </div>
    </section>
  );
}
