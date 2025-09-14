"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ScrollReveal } from './scroll-reveal';
import { Button } from './ui/button';
import { Code, Smartphone, Zap, Search } from 'lucide-react';

const servicesData = [
  {
    id: 1,
    title: 'Web Design & Development',
    description: 'We build fast, responsive, and scalable websites using modern technologies. Our designs are not only beautiful but also intuitive, ensuring a seamless user experience that captivates and converts.',
    imageUrl: 'https://picsum.photos/seed/web-dev/800/600',
    imageHint: 'website development code',
    icon: <Code className="h-8 w-8" />,
    href: '/services/web-development',
  },
  {
    id: 2,
    title: 'App Design & Development',
    description: 'From concept to launch, we design and develop high-performance mobile applications for both iOS and Android. We focus on creating engaging experiences that amplify your impact and connect with users on the go.',
    imageUrl: 'https://picsum.photos/seed/app-dev/800/600',
    imageHint: 'mobile application interface',
    icon: <Smartphone className="h-8 w-8" />,
    href: '/services/mobile-app',
  },
  {
    id: 3,
    title: 'Automation',
    description: 'Save time and streamline your operations with custom automations. We build solutions that handle your repetitive, time-consuming tasks, allowing you to focus on what truly matters: growing your empire.',
    imageUrl: 'https://picsum.photos/seed/automation/800/600',
    imageHint: 'business process automation',
    icon: <Zap className="h-8 w-8" />,
    href: '/services/marketing', // Assuming automation falls under marketing/ops
  },
  {
    id: 4,
    title: 'SEO Service',
    description: 'Become visible to your target audience with our data-driven SEO strategies. We help you climb the search engine rankings, bringing valuable, organic traffic to your digital doorstep.',
    imageUrl: 'https://picsum.photos/seed/seo/800/600',
    imageHint: 'search engine optimization graph',
    icon: <Search className="h-8 w-8" />,
    href: '/services/marketing',
  },
];

interface ServicesSectionProps {
  className?: string;
}

export function ServicesSection({ className }: ServicesSectionProps) {
  const [activeService, setActiveService] = useState(servicesData[0]);

  return (
    <section id="services" className={cn('py-24 sm:py-32', className)}>
      <div className="container">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
             <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              Our Arsenal
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              From crafting your brand identity to scaling your business with custom tech, we provide the tools you need to conquer the digital world.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-20 grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          {/* Left Column: Service Selector */}
          <ScrollReveal className="lg:col-span-4" delay={200}>
            <div className="flex flex-col gap-4">
              {servicesData.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  className={cn(
                    'flex items-center gap-4 rounded-xl p-4 text-left transition-all duration-300',
                    activeService.id === service.id
                      ? 'bg-primary/10'
                      : 'hover:bg-muted/50'
                  )}
                >
                  <div
                    className={cn(
                      'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-background shadow-lg transition-all duration-300',
                      activeService.id === service.id
                        ? 'scale-110 rotate-[360deg] bg-primary text-primary-foreground'
                        : 'text-primary'
                    )}
                  >
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {service.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Right Column: Service Display */}
          <ScrollReveal className="lg:col-span-8" delay={400}>
            <div className="relative h-[450px] w-full overflow-hidden rounded-2xl bg-card shadow-2xl">
              <div className="relative h-full w-full">
                <Image
                  src={activeService.imageUrl}
                  alt={activeService.title}
                  fill
                  className="object-cover transition-all duration-500 ease-in-out"
                  data-ai-hint={activeService.imageHint}
                  key={activeService.id} // Forces re-render on change
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="font-headline text-3xl font-bold">
                  {activeService.title}
                </h3>
                <p className="mt-2 max-w-lg text-white/80">
                  {activeService.description}
                </p>
                <Button asChild className="mt-6">
                  <Link href={activeService.href}>Learn More</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
