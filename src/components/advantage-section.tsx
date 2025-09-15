
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ScrollReveal } from './scroll-reveal';
import { Button } from './ui/button';

const advantageData = [
  {
    id: 'clarity',
    title: 'Tech Confusion',
    subtitle: 'Clarity Over Confusion',
    description: "We demystify technology, offering clear solutions with trusted stacks like Next.js for performance and modern CMS platforms for flexibility.",
    imageUrl: 'https://picsum.photos/seed/clarity/800/600',
    imageHint: 'dashboard analytics'
  },
  {
    id: 'visibility',
    title: 'Online Invisibility',
    subtitle: 'From Invisible to Invincible',
    description: "We make you visible online with proven SEO strategies that bring targeted traffic and valuable leads to your digital doorstep.",
    imageUrl: 'https://picsum.photos/seed/visibility/800/600',
    imageHint: 'growth chart'
  },
  {
    id: 'efficiency',
    title: 'Wasted Time',
    subtitle: 'Automated Efficiency',
    description: "We save you time and streamline your operations by building custom automations that handle your repetitive, time-consuming tasks.",
    imageUrl: 'https://picsum.photos/seed/efficiency/800/600',
    imageHint: 'workflow automation'
  },
  {
    id: 'scalability',
    title: 'Growth Plateaus',
    subtitle: 'Built to Scale',
    description: "We help you grow with custom apps, integrations, and performance-focused websites that can handle more users and complexity.",
    imageUrl: 'https://picsum.photos/seed/scalability/800/600',
    imageHint: 'server architecture'
  },
];

interface AdvantageSectionProps {
  className?: string;
}

export function AdvantageSection({ className }: AdvantageSectionProps) {
  const [activeId, setActiveId] = useState(advantageData[0].id);

  const activeAdvantage = advantageData.find(item => item.id === activeId) || advantageData[0];

  return (
    <section id="advantage" className={cn("py-24 sm:py-32", className)}>
      <div className="container">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-headline text-sm font-semibold uppercase tracking-wider text-primary">Why Choose Us?</p>
            <h2 className="font-headline mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Your Digital Problem Solvers
            </h2>
            <p className="mt-6 text-lg text-foreground/80">
              You're facing scaling challenges, tech confusion, and online invisibility. We provide the solutions to help you claim your digital throne.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <ScrollReveal delay={100} className="lg:col-span-1">
            <div className="flex flex-col gap-4">
              {advantageData.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn(
                    "w-full text-left justify-start p-6 text-lg h-auto transition-all duration-300",
                    activeId === item.id 
                      ? 'bg-primary/10 text-primary border-primary' 
                      : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                  )}
                  onClick={() => setActiveId(item.id)}
                >
                  <div className='flex flex-col'>
                    <span className='font-semibold text-sm uppercase text-primary/80'>{`Problem:`}</span>
                    <span className='font-headline text-xl text-foreground'>{item.title}</span>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200} className="lg:col-span-2">
            <div className="relative h-[450px] w-full overflow-hidden rounded-2xl bg-card p-8 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="w-full h-full flex flex-col justify-between"
                >
                  <div>
                    <p className='font-semibold text-primary uppercase text-sm'>{`Our Solution:`}</p>
                    <h3 className="font-headline text-3xl font-bold mt-1 text-foreground">{activeAdvantage.subtitle}</h3>
                    <p className="mt-4 text-lg text-muted-foreground max-w-md">{activeAdvantage.description}</p>
                  </div>
                  <div className="relative w-full h-48 rounded-lg overflow-hidden mt-8 shadow-inner">
                     <Image
                        src={activeAdvantage.imageUrl}
                        alt={activeAdvantage.subtitle}
                        fill
                        className="object-cover"
                        data-ai-hint={activeAdvantage.imageHint}
                        priority
                     />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
