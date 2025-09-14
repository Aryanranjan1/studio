
"use client";

import { getServices } from '@/lib/data';
import type { Service } from "@/lib/data";
import { ScrollReveal } from './scroll-reveal';
import { cn } from '@/lib/utils';
import { Card } from './ui/card';
import { ArrowRight, Code, Brush, Smartphone, ShoppingCart, Megaphone, PenTool, Bot } from 'lucide-react';
import Link from 'next/link';

interface ServicesSectionProps {
  className?: string;
}

const iconMap: { [key: string]: React.ReactElement } = {
  'Branding': <Brush className="h-8 w-8 text-primary" />,
  'UI/UX Design': <PenTool className="h-8 w-8 text-primary" />,
  'Web Development': <Code className="h-8 w-8 text-primary" />,
  'Mobile App': <Smartphone className="h-8 w-8 text-primary" />,
  'E-commerce': <ShoppingCart className="h-8 w-8 text-primary" />,
  'Marketing': <Megaphone className="h-8 w-8 text-primary" />,
  'Automations': <Bot className="h-8 w-8 text-primary" />,
};

export function ServicesSection({ className }: ServicesSectionProps) {
    const services = getServices();

    return (
        <section id="services" className={cn("py-24 sm:py-32", className)}>
            <div className="container">
                <ScrollReveal>
                    <div className="max-w-2xl">
                        <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                            Our Arsenal of Services
                        </h2>
                        <p className="mt-4 text-lg text-foreground/80">
                            From crafting your brand identity to scaling your business with custom tech, we provide the tools you need to conquer the digital world.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ScrollReveal key={service.id} delay={index * 100}>
                            <Card className="p-8 h-full group">
                                <div className="mb-6 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    {iconMap[service.icon] || <PenTool className="h-8 w-8 text-primary" />}
                                </div>
                                <h3 className="font-headline text-xl font-bold mb-2">{service.title}</h3>
                                <p className="text-muted-foreground mb-6">{service.description}</p>
                                <Link href={`/services/${service.slug}`} className="font-semibold text-primary group-hover:text-accent flex items-center transition-colors">
                                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Card>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
