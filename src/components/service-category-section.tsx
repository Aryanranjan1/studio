"use client";

import { ScrollReveal } from "./scroll-reveal";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Code, Brush, Smartphone, ShoppingCart, Megaphone, PenTool } from 'lucide-react';
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    icon: <Brush className="h-10 w-10 text-primary" />,
    title: "Branding",
    slug: "branding",
    description: "Crafting unique brand identities that resonate with your audience.",
    href: "/services/branding",
  },
  {
    icon: <PenTool className="h-10 w-10 text-primary" />,
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description: "Creating intuitive and beautiful user interfaces for exceptional experiences.",
    href: "/services/ui-ux-design",
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "Web Development",
    slug: "web-development",
    description: "Building fast, responsive, and scalable websites with modern tech.",
    href: "/services/web-development",
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: "Mobile App",
    slug: "mobile-app",
    description: "Designing and developing high-performance mobile apps for iOS and Android.",
    href: "/services/mobile-app",
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-primary" />,
    title: "E-commerce",
    slug: "e-commerce",
    description: "Developing robust e-commerce solutions that drive sales and customer loyalty.",
    href: "/services/e-commerce",
  },
  {
    icon: <Megaphone className="h-10 w-10 text-primary" />,
    title: "Marketing",
    slug: "marketing",
    description: "Executing data-driven marketing strategies to grow your reach and impact.",
    href: "/services/marketing",
  },
];

interface ServiceCategorySectionProps {
  className?: string;
}

export function ServiceCategorySection({ className }: ServiceCategorySectionProps) {
  return (
    <section id="services" className={cn("py-24 sm:py-32", className)}>
      <div className="container">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              Our Services
            </h2>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              We offer a comprehensive suite of design and development services to bring your vision to life, from initial concept to final launch and beyond.
            </p>
          </div>
        </ScrollReveal>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 100}>
              <Link href={service.href} className="h-full">
                <Card className="h-full text-center transition-all duration-300 hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2 bg-card/50 backdrop-blur-lg group">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center relative">
                        {service.icon}
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

    