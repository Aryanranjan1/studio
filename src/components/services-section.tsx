
"use client";

import { useState, useEffect, useRef } from 'react';
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
    href: '/services/marketing',
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
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const { top, height } = section.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;
      const scrollY = window.scrollY - section.offsetTop;

      if (scrollY >= 0 && scrollY <= scrollableHeight) {
        const progress = scrollY / scrollableHeight;
        const serviceIndex = Math.min(Math.floor(progress * servicesData.length), servicesData.length - 1);
        
        if (servicesData[serviceIndex] && activeService.id !== servicesData[serviceIndex].id) {
          setActiveService(servicesData[serviceIndex]);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeService]);

  const onCircleClick = (serviceId: number) => {
    const section = sectionRef.current;
    const service = servicesData.find(s => s.id === serviceId);
    if (!section || !service) return;

    const serviceIndex = servicesData.findIndex(s => s.id === serviceId);
    const scrollableHeight = section.offsetHeight - window.innerHeight;
    const targetScrollY = section.offsetTop + (serviceIndex / servicesData.length) * scrollableHeight;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  return (
    <section ref={sectionRef} id="services" className={cn('relative py-24 sm:py-32 h-[300vh]', className)}>
      <div className="sticky top-0 h-screen flex flex-col justify-center">
        <div className='container'>
            <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                Our Arsenal
                </h2>
                <p className="mt-4 text-lg text-foreground/80">
                From crafting your brand identity to scaling your business with custom tech, we provide the tools you need to conquer the digital world.
                </p>
            </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Image */}
            <div className="lg:col-span-5 h-96 w-full relative overflow-hidden rounded-2xl">
                {servicesData.map((service) => (
                <Image
                    key={service.id}
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className={cn(
                        "object-cover transition-opacity duration-1000 ease-in-out",
                        activeService.id === service.id ? "opacity-100" : "opacity-0"
                    )}
                    data-ai-hint={service.imageHint}
                    />
                ))}
            </div>

            {/* Middle Column: Service Selector */}
            <div className="lg:col-span-2 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-8">
                {servicesData.map((service) => (
                    <button
                    key={service.id}
                    onClick={() => onCircleClick(service.id)}
                    className={cn(
                        'flex items-center justify-center rounded-full transition-all duration-500 ease-in-out',
                        'h-16 w-16 bg-card shadow-lg',
                        activeService.id === service.id
                        ? 'bg-primary text-primary-foreground scale-125'
                        : 'text-primary hover:bg-primary/10'
                    )}
                    >
                    <div className={cn(
                        "transition-transform duration-500",
                        activeService.id === service.id ? 'animate-float' : ''
                    )}>
                        {service.icon}
                    </div>
                    </button>
                ))}
                </div>
            </div>

            {/* Right Column: Service Display */}
            <div className="lg:col-span-5 h-96 flex flex-col justify-center relative overflow-hidden">
                {servicesData.map(service => (
                <div
                    key={service.id}
                    className={cn(
                    "absolute transition-all duration-1000 ease-in-out",
                    activeService.id === service.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                    )}
                >
                    <h3 className="font-headline text-3xl font-bold text-foreground">
                    {service.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-foreground/80 text-lg">
                    {service.description}
                    </p>
                    <Button asChild className="mt-6" size="lg">
                    <Link href={service.href}>Learn More</Link>
                    </Button>
                </div>
                ))}
            </div>
            </div>
        </div>
      </div>
    </section>
  );
}
