
"use client";

import { getProjects, getServices } from "@/lib/data";
import type { Project, Service } from "@/lib/data";
import { ScrollReveal } from "./scroll-reveal";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface PortfolioSectionProps {
  className?: string;
  filterBy?: string;
}

// Custom hook to detect when an element is in view
const useInView = (options?: IntersectionObserverInit) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isInView];
};


export function PortfolioSection({ className, filterBy }: PortfolioSectionProps) {
  const allProjects = getProjects();
  const allServices = getServices();
  const [openItems, setOpenItems] = useState<string[]>([]);
  
  const servicesToShow = (filterBy
    ? allServices.filter((s) => s.title === filterBy)
    : allServices
  ).filter(s => s.title !== "Marketing" && s.title !== "Branding");

  const handleInView = (serviceTitle: string) => {
    setOpenItems((prev) => {
      if (!prev.includes(serviceTitle)) {
        return [...prev, serviceTitle];
      }
      return prev;
    });
  };

  return (
    <section id="portfolio" className={cn("py-24 sm:py-32", className)}>
      <div className="container">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Smarter Website Design, Smarter Branding, Stronger Results.
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              A glimpse into the innovative solutions and beautiful designs
              we've crafted for our clients.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 max-w-4xl mx-auto">
          <Accordion
            type="multiple"
            className="w-full space-y-4"
            value={openItems}
            onValueChange={setOpenItems}
          >
            {servicesToShow.map((service) => {
              const serviceProjects = allProjects.filter((p) =>
                p.services.includes(service.title)
              );
              return (
                <AccordionItemWithInView
                  key={service.id}
                  service={service}
                  serviceProjects={serviceProjects}
                  onInView={() => handleInView(service.title)}
                />
              );
            })}
          </Accordion>
        </div>

        <div className="mt-16 text-center">
          <Button
            size="lg"
            variant="secondary"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            asChild
          >
            <Link href="/work">View All Work</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}


interface AccordionItemWithInViewProps {
  service: Service;
  serviceProjects: Project[];
  onInView: () => void;
}

const AccordionItemWithInView = ({ service, serviceProjects, onInView }: AccordionItemWithInViewProps) => {
  const [ref, isInView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (isInView) {
      onInView();
    }
  }, [isInView, onInView]);

  return (
    <div ref={ref}>
        <AccordionItem
        value={service.title}
        className="border rounded-2xl bg-card overflow-hidden"
        >
        <AccordionTrigger className="p-6 text-xl font-headline hover:no-underline [&[data-state=open]>svg.plus]:hidden [&[data-state=closed]>svg.minus]:hidden">
            <div className="flex items-center gap-4">
                <span>{`Smarter ${service.title}`}</span>
            </div>
            <Plus className="h-6 w-6 plus transition-transform duration-200" />
            <Minus className="h-6 w-6 minus transition-transform duration-200" />
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <p className="text-muted-foreground mb-6">
                        {service.longDescription.substring(0, 150) + "..."}
                    </p>
                    <Button asChild variant="outline">
                        <Link href={`/services/${service.slug}`}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
                <div className="relative h-64 md:h-80 -rotate-6 group">
                    {serviceProjects.slice(0, 3).map((project, index) => (
                        <div
                            key={project.id}
                            className="absolute rounded-lg overflow-hidden shadow-2xl transition-transform duration-300 ease-in-out group-hover:scale-105"
                            style={{
                                width: '60%',
                                height: '60%',
                                top: `${10 + index * 15}%`,
                                left: `${5 + index * 20}%`,
                                transform: `rotate(${index * 5 - 5}deg) scale(1)`,
                                zIndex: index,
                            }}
                        >
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                data-ai-hint={project.imageHint}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </AccordionContent>
        </AccordionItem>
    </div>
  );
};
