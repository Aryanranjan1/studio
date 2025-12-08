
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Code,
  Palette,
  Smartphone,
  TrendingUp,
  Bot,
  MoveRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Bespoke, high-performance websites using Next.js. Every line of code is written for speed, SEO, and scalability.',
    tags: ['Next.js', 'React', 'Headless CMS', 'Vercel'],
    image: 'https://picsum.photos/seed/h-webdev/1200/800',
  },
  {
    icon: Palette,
    title: 'Product Design',
    description: 'User experience is our obsession. We create rigorous wireframes and high-fidelity prototypes in Figma to ensure your product feels intuitive.',
    tags: ['UI/UX', 'Figma', 'Design Systems', 'Prototyping'],
    image: 'https://picsum.photos/seed/h-design/1200/800',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'From iOS to Android, we build mobile apps that provide a seamless user experience, from concept to App Store deployment.',
    tags: ['React Native', 'Swift', 'Kotlin', 'Firebase'],
    image: 'https://picsum.photos/seed/h-mobile/1200/800',
  },
  {
    icon: TrendingUp,
    title: 'SEO & Growth',
    description: 'A beautiful site is useless if no one sees it. We bake technical SEO into the foundation for maximum discoverability.',
    tags: ['Technical SEO', 'Analytics', 'Performance', 'CRO'],
    image: 'https://picsum.photos/seed/h-growth/1200/800',
  },
  {
    icon: Bot,
    title: 'Automation',
    description: 'Scale without hiring. We connect your apps (Airtable, Stripe, OpenAI) to automate busy work, so you can focus on strategy.',
    tags: ['Zapier', 'n8n', 'OpenAI', 'Workflows'],
    image: 'https://picsum.photos/seed/h-automation/1200/800',
  },
];

const IntroCard = () => (
  <div className="w-screen md:w-[50vw] h-[75vh] flex-shrink-0 flex flex-col justify-between p-8 border-r border-white/20 bg-black">
     <h3 className="font-headline text-5xl font-bold text-white tracking-tight">
        A full-service<br />design &<br />development<br />agency.
      </h3>
      <div className="text-neutral-400">
        <p className="text-lg max-w-sm">
          We operate at the intersection of design and engineering. Scroll to see how we help brands scale.
        </p>
        <MoveRight className="w-12 h-12 mt-8" />
      </div>
  </div>
);

const CtaCard = () => (
    <div className="w-screen md:w-[50vw] h-[75vh] flex-shrink-0 flex flex-col items-center justify-center p-8 border-r border-white/20 bg-primary text-primary-foreground text-center">
      <h3 className="font-headline text-5xl font-bold tracking-tight">
        Have a project<br />in mind?
      </h3>
      <p className="text-lg mt-4 max-w-xs">Let's build something great together.</p>
      <Link href="/contact" className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground text-primary font-bold transition-transform hover:scale-105">
          Get in Touch <ArrowRight className="w-5 h-5"/>
      </Link>
  </div>
)

export function HorizontalServices() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Total of 7 cards (1 intro + 5 services + 1 CTA)
  // On desktop, each card is 50vw. Total width = 7 * 50vw = 350vw
  // We want to scroll past 6 cards (300vw) to reveal the last one.
  // The transform needs to be -(total_width - viewport_width).
  // Total width is 350vw. Viewport is 100vw. So we need to move by -250vw.
  // In percentage of the total width (350vw), this is (-250/350)*100 = -71.42%
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-71.42857143%']);

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-black border-y border-neutral-800">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex">
          <IntroCard />
          {services.map((service, index) => (
            <div key={index} className="w-screen md:w-[50vw] h-[75vh] flex-shrink-0 relative border-r border-white/20 overflow-hidden group">
                <Image 
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover absolute inset-0 z-0 grayscale group-hover:grayscale-0 transition-all duration-500"
                    data-ai-hint="abstract technology dark"
                />
                <div className="absolute inset-0 bg-black/70 z-10"/>

                <div className="relative z-20 flex flex-col justify-between h-full p-8 text-white">
                    <div className="flex justify-between items-start">
                        <div className="p-3 border border-white/20 bg-white/10 backdrop-blur-sm">
                            <service.icon className="w-6 h-6" />
                        </div>
                        <span className="font-headline text-8xl font-bold text-white/10">
                           0{index + 1}
                        </span>
                    </div>

                    <div>
                        <h3 className="font-headline text-4xl font-bold tracking-tight">{service.title}</h3>
                        <p className="mt-2 text-neutral-300 max-w-sm">{service.description}</p>
                        <div className="flex flex-wrap gap-2 mt-6">
                            {service.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 border border-white/20 bg-white/10 text-sm text-neutral-200">
                                    {tag}
                                </span>
                            ))}
                        </div>
                         <Link href={`/portfolio?category=${service.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="mt-8 inline-flex items-center text-primary font-semibold group-hover:underline">
                            View Projects <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
          ))}
          <CtaCard />
        </motion.div>
      </div>
    </section>
  );
}
