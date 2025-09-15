
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
import { useState, useEffect, useRef, useCallback } from "react";

interface PortfolioSectionProps {
  className?: string;
  filterBy?: string;
}

interface IntersectingEntry {
  title: string;
  rect: DOMRect;
}

export function PortfolioSection({ className, filterBy }: PortfolioSectionProps) {
  const allProjects = getProjects();
  const allServices = getServices();
  const [activeService, setActiveService] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const intersectingItemsRef = useRef<Map<string, DOMRect>>(new Map());

  const servicesToShow = (filterBy
    ? allServices.filter((s) => s.title === filterBy)
    : allServices
  ).filter(s => s.title !== "Marketing" && s.title !== "Branding");

  const openItem = hoveredService || activeService;

  const determineActiveService = useCallback(() => {
    let lowestItem: IntersectingEntry | null = null;
    intersectingItemsRef.current.forEach((rect, title) => {
        if (!lowestItem || rect.top > lowestItem.rect.top) {
            lowestItem = { title, rect };
        }
    });

    if (lowestItem) {
        setActiveService(lowestItem.title);
    } else if (!hoveredService) {
        setActiveService(null);
    }
  }, [hoveredService]);


  const handleIntersection = useCallback((isIntersecting: boolean, entry: IntersectionObserverEntry, serviceTitle: string) => {
    if (isIntersecting) {
        intersectingItemsRef.current.set(serviceTitle, entry.boundingClientRect);
    } else {
        intersectingItemsRef.current.delete(serviceTitle);
    }
    determineActiveService();
  }, [determineActiveService]);

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
            type="single"
            className="w-full space-y-4"
            value={openItem || ""}
            onValueChange={(value) => {
                // This is needed for hover to work with keyboard nav, but we primarily control with state
            }}
          >
            {servicesToShow.map((service) => {
              const serviceProjects = allProjects.filter((p) =>
                p.services.includes(service.title)
              );
              return (
                <AccordionItemWithObserver
                  key={service.id}
                  service={service}
                  serviceProjects={serviceProjects}
                  onIntersectionChange={handleIntersection}
                  onHoverChange={(isHovering) => setHoveredService(isHovering ? service.title : null)}
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

interface AccordionItemWithObserverProps {
  service: Service;
  serviceProjects: Project[];
  onIntersectionChange: (isIntersecting: boolean, entry: IntersectionObserverEntry, serviceTitle: string) => void;
  onHoverChange: (isHovering: boolean) => void;
}

const AccordionItemWithObserver = ({
  service,
  serviceProjects,
  onIntersectionChange,
  onHoverChange,
}: AccordionItemWithObserverProps) => {
  const itemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        onIntersectionChange(entry.isIntersecting, entry, service.title);
      },
      { threshold: 0.5 } // Trigger when 50% of the item is visible
    );

    const currentItemRef = itemRef.current;
    if (currentItemRef) {
      observer.observe(currentItemRef);
    }
    
    return () => {
        if (currentItemRef) {
            observer.unobserve(currentItemRef);
        }
    };
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service.title, onIntersectionChange]);

  return (
    <div 
        ref={itemRef} 
        onMouseEnter={() => onHoverChange(true)} 
        onMouseLeave={() => onHoverChange(false)}
    >
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
