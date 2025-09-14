"use client";

import { ScrollReveal } from "./scroll-reveal";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Code, Brush, Smartphone, ShoppingCart, Megaphone, PenTool, Bot, Search } from 'lucide-react';
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getServices, Service } from "@/lib/data";

const iconMap: { [key: string]: React.ReactElement } = {
  'Branding': <Brush className="h-10 w-10 text-primary" />,
  'UI/UX Design': <PenTool className="h-10 w-10 text-primary" />,
  'Web Development': <Code className="h-10 w-10 text-primary" />,
  'Mobile App': <Smartphone className="h-10 w-10 text-primary" />,
  'E-commerce': <ShoppingCart className="h-10 w-10 text-primary" />,
  'Marketing': <Megaphone className="h-10 w-10 text-primary" />,
  'Automations': <Bot className="h-10 w-10 text-primary" />,
  'SEO': <Search className="h-10 w-10 text-primary" />,
};

interface ServiceCategorySectionProps {
  className?: string;
}

export function ServiceCategorySection({ className }: ServiceCategorySectionProps) {
  const services: Service[] = getServices();

  return (
    <section id="services" className={cn("relative py-24 sm:py-32 text-white overflow-hidden", className)}>
       <div className="absolute inset-0 overflow-hidden z-0">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="size-full object-cover"
                src="https://www.pexels.com/download/video/3163534/"></video>
            <div className="absolute inset-0 bg-black/70"></div>
        </div>
      <div className="container relative z-10">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              Our Services
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
              We offer a comprehensive suite of services to build your digital empire, from crafting your brand's identity to scaling your operations with custom technology.
            </p>
          </div>
        </ScrollReveal>
        
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 100}>
            <Link href={`/services/${service.slug}`} className="h-full block">
                <Card className="h-full text-center transition-all duration-300 hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2 bg-card/50 backdrop-blur-lg group">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center relative">
                        {iconMap[service.icon] || <PenTool className="h-10 w-10 text-primary" />}
                        <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping"></div>
                    </div>
                    </div>
                    <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                    <div className="mt-4 flex justify-center items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                </CardContent>
                </Card>
            </Link>
            </ScrollReveal>
        ))}
        </div>
      </div>
    </section>
  );
}
