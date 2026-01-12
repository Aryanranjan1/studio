'use client';

import { useLayoutEffect, useRef } from 'react';
import { getServices } from '@/lib/data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { IconComponent } from '@/components/icons';

gsap.registerPlugin(ScrollTrigger);

export function ServicesSection() {
  const component = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const services = getServices();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray<HTMLDivElement>('.panel');
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => '+=' + slider.current!.offsetWidth,
        },
      });
    }, component);
    return () => ctx.revert();
  }, [services.length]);

  return (
    <div className="w-full" ref={component}>
      <div
        ref={slider}
        className="w-full h-screen flex flex-nowrap overflow-x-hidden"
      >
        {/* Intro Panel */}
        <div className="panel w-screen h-screen flex-shrink-0 flex items-center justify-center bg-black border-r border-border p-8">
            <div className="text-center max-w-2xl">
                <h2 className="font-headline text-5xl md:text-7xl font-bold">OUR CAPABILITIES</h2>
                <p className="text-lg md:text-xl text-neutral-400 mt-6">We provide end-to-end solutions to design, build, and scale your digital presence. Scroll to explore our core services.</p>
                <div className='flex justify-center mt-8'>
                    <div className='relative w-1 h-24 bg-neutral-800'>
                        <div className='absolute left-1/2 -translate-x-1/2 w-0.5 h-12 bg-white animate-pulse' style={{animation: 'scroll-down 2s infinite'}}></div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes scroll-down {
                    0% { transform: translateY(-100%); }
                    50% { transform: translateY(100%); }
                    100% { transform: translateY(100%); opacity: 0; }
                }
            `}</style>
        </div>

        {/* Service Panels */}
        {services.map((service, index) => (
          <div
            key={service.id}
            className="panel group w-screen h-screen flex-shrink-0 flex items-center justify-center p-8 border-r border-border relative overflow-hidden"
          >
            <Image
              src={`https://picsum.photos/seed/service-bg-${index}/1920/1080`}
              alt={service.title}
              fill
              className="object-cover absolute inset-0 z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-10"
              data-ai-hint="abstract dark texture"
            />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
              <div className="md:col-span-1 text-center md:text-left">
                <span className="font-headline text-7xl md:text-8xl text-neutral-800 transition-colors duration-500 group-hover:text-primary">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="md:col-span-5 text-center md:text-left">
                <IconComponent iconName={service.icon} className="w-10 h-10 text-primary" />
                <h3 className="font-headline text-5xl md:text-6xl font-bold mt-4">
                  {service.title}
                </h3>
                <p className="text-neutral-400 mt-4 max-w-md mx-auto md:mx-0">
                  {service.longDescription}
                </p>
                <Link href="/services">
                    <div className="inline-flex items-center gap-2 mt-6 text-primary font-semibold">
                        Learn More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </Link>
              </div>
              <div className="md:col-span-6 flex justify-center md:justify-end">
                <div className="grid grid-cols-2 gap-8 text-center">
                    {service.kpis.map((kpi, kpiIndex) => (
                        <div key={kpiIndex}>
                            <p className="font-headline text-5xl font-bold text-primary">{kpi.value}</p>
                            <p className="text-neutral-500 text-sm uppercase tracking-wider">{kpi.label}</p>
                        </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* CTA Panel */}
        <div className="panel w-screen h-screen flex-shrink-0 flex flex-col items-center justify-center bg-black text-center p-8">
            <h2 className="font-headline text-6xl md:text-8xl font-bold">Let's Build Together</h2>
            <p className="text-xl text-neutral-400 mt-6 max-w-2xl">Have a project in mind? We're ready to bring your vision to life.</p>
            <Link href="/contact">
                <div className="mt-12 inline-block relative group">
                    <div className="absolute -inset-0.5 bg-primary rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-200"></div>
                    <div className="relative px-8 py-4 bg-black rounded-full text-lg font-bold flex items-center gap-2">
                        Start a Project <ArrowRight className="w-5 h-5"/>
                    </div>
                </div>
            </Link>
        </div>
      </div>
    </div>
  );
}
