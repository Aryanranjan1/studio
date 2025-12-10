
'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

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
  {
    num: "05",
    isCta: true,
    title: "Come work\nwith us",
    items: ["Let's build the future together."],
  }
];

const ServiceCard = ({ service, isCta }: { service: typeof services[0], isCta?: boolean }) => (
    <div className={`service-card w-full md:min-w-[450px] md:h-full border border-white/20 md:-mr-px flex flex-col justify-between p-8 md:p-10 bg-[#050505] transition-colors duration-300 ${isCta ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-white hover:text-black'} mb-5 md:mb-0`}>
        {isCta ? (
             <div className="flex flex-col h-full justify-center items-center text-center">
                 <h3 className="text-3xl md:text-5xl mb-5 uppercase font-display whitespace-pre-wrap leading-[0.9]">{service.title}</h3>
                 <p className="mt-4">{service.items[0]}</p>
                 <Link href="/contact" className="mt-8 underline">
                    Start a Project
                 </Link>
             </div>
        ) : (
            <>
                <div className="svc-num text-4xl md:text-5xl font-bold opacity-30 mb-4 md:mb-0 font-display">{service.num}</div>
                <div className="svc-content">
                    <h3 className="text-3xl md:text-5xl mb-5 uppercase font-display whitespace-pre-wrap leading-[0.9]">{service.title}</h3>
                    <ul className="svc-list">
                        {service.items.map((item, i) => (
                            <li key={i} className="border-t border-current/30 py-4 text-sm md:text-base transition-colors duration-300 font-tech">{item}</li>
                        ))}
                    </ul>
                </div>
            </>
        )}
    </div>
);

export function HorizontalServices() {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isIntersecting, setIsIntersecting] = useState(false);

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
        let animationFrameId: number;

        const handleWheel = (e: WheelEvent) => {
            const { deltaY } = e;
            const scrollWidth = track.scrollWidth;
            const containerWidth = container.clientWidth;
            const maxScroll = scrollWidth - containerWidth;
            
            // Allow normal scroll if not intersecting
            if (!isIntersecting) return;
            
            targetX -= deltaY;
            targetX = Math.max(-maxScroll, Math.min(0, targetX));

            // If we are at the edges, allow vertical scroll
            if (targetX === 0 && deltaY < 0) {
                 // Trying to scroll up at the beginning
            } else if (targetX === -maxScroll && deltaY > 0) {
                // Trying to scroll down at the end
            } else {
                 e.preventDefault(); // Hijack scroll
            }
        };

        const animate = () => {
            currentX += (targetX - currentX) * easing;
            if (Math.abs(targetX - currentX) < 0.1) {
                currentX = targetX;
            }
            track.style.transform = `translateX(${currentX}px)`;
            animationFrameId = requestAnimationFrame(animate);
        };
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            { threshold: 1.0 } // Trigger when 100% of the element is visible
        );

        if (container) observer.observe(container);

        if (isIntersecting) {
            container.addEventListener('wheel', handleWheel, { passive: false });
            animate();
        } else {
             container.removeEventListener('wheel', handleWheel);
             cancelAnimationFrame(animationFrameId!);
        }

        return () => {
            if(container) observer.unobserve(container);
            container?.removeEventListener('wheel', handleWheel);
            cancelAnimationFrame(animationFrameId!);
        };

    }, [isDesktop, isIntersecting]);

    if (!isDesktop) {
         return (
            <section className="bg-[#050505] border-b border-white/20 py-10 px-5">
                <div className="mb-8">
                  <h2 className='font-tech text-xl uppercase text-white'>// Capabilities</h2>
                </div>
                 <div className="flex flex-col">
                    {services.map((service) => (
                        <ServiceCard key={service.num} service={service} isCta={service.isCta} />
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
            <ServiceCard key={service.num} service={service} isCta={service.isCta} />
          ))}
        </div>
    </section>
  );
}

