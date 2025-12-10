'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
    <div className="service-card min-w-[450px] h-full border border-border-active -mr-px flex flex-col justify-between p-10 bg-bg-color transition-colors duration-300 hover:bg-white hover:text-black">
        <div className="svc-num text-5xl font-bold opacity-30">{service.num}</div>
        <div className="svc-content">
            <h3 className="text-5xl mb-5 uppercase font-display whitespace-pre-wrap">{service.title}</h3>
            <ul className="svc-list">
                {service.items.map((item, i) => (
                    <li key={i} className="border-t border-neutral-700 py-4 transition-colors duration-300">{item}</li>
                ))}
            </ul>
        </div>
    </div>
);

export function HorizontalServices() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${100 * (services.length - 2)}%`]);

  return (
    <section ref={targetRef} className="services-trigger relative h-[400vh] bg-bg-color border-b border-border-active">
      <div className="sticky-wrapper sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="service-header-static absolute top-10 left-10 z-10 text-white mix-blend-difference">
          <h2 className='font-tech'>// Capabilities</h2>
        </div>
        <motion.div style={{ x }} className="horizontal-track flex h-[70vh] pl-[5vw]">
          {services.map((service) => (
            <ServiceCard key={service.num} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
