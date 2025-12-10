'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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
  const targetRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // 1. Check if we are on desktop
    const checkDesktop = () => {
        setIsDesktop(window.innerWidth > 768);
    };

    // 2. Calculate exact scroll width
    const updateScrollRange = () => {
        if (trackRef.current) {
            const trackWidth = trackRef.current.scrollWidth;
            const viewportWidth = window.innerWidth;
            // Scroll range = Total Width - Viewport Width + Padding Buffer
            setScrollRange(trackWidth - viewportWidth + 100); 
        }
    };

    checkDesktop();
    updateScrollRange();

    window.addEventListener('resize', () => {
        checkDesktop();
        updateScrollRange();
    });

    return () => window.removeEventListener('resize', updateScrollRange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const x = useTransform(smoothProgress, [0, 1], ["0px", `-${scrollRange}px`]);

  return (
    <section ref={targetRef} className="services-trigger relative h-auto md:h-[400vh] bg-[#050505] border-b border-white/20">
      {/* Container: Relative on Mobile (Vertical), Sticky on Desktop (Horizontal) */}
      <div className="sticky-wrapper relative md:sticky md:top-0 h-auto md:h-screen overflow-hidden flex flex-col md:flex-row items-start md:items-center py-10 md:py-0">
        
        <div className="service-header-static relative md:absolute top-0 md:top-10 left-0 md:left-10 z-10 text-white mix-blend-difference px-5 md:px-0 mb-8 md:mb-0">
          <h2 className='font-tech text-xl uppercase'>// Capabilities</h2>
        </div>

        {/* Track: Vertical Stack on Mobile, Horizontal Motion on Desktop */}
        <motion.div 
            ref={trackRef}
            style={{ x: isDesktop ? x : 0 }} 
            className="horizontal-track flex flex-col md:flex-row h-auto md:h-[70vh] px-5 md:pl-[5vw] gap-5 md:gap-0 w-full md:w-auto"
        >
          {services.map((service) => (
            <ServiceCard key={service.num} service={service} />
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
