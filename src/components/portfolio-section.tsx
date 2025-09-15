
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
import { useScroll, useTransform, motion } from "framer-motion";

interface PortfolioSectionProps {
  className?: string;
  filterBy?: string;
}

export function PortfolioSection({ className, filterBy }: PortfolioSectionProps) {
  const allProjects = getProjects();
  const allServices = getServices();
  const [activeService, setActiveService] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const servicesToShow = (filterBy
    ? allServices.filter((s) => s.title === filterBy)
    : allServices
  ).filter(s => s.title !== "Marketing" && s.title !== "Branding");

  const openItem = hoveredService || activeService;

  const containerRef = useRef<HTMLDivElement>(null);

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

        <div className="mt-16 max-w-4xl mx-auto" ref={containerRef}>
          <Accordion
            type="single"
            className="w-full space-y-4"
            value={openItem || ""}
            onValueChange={() => {}}
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
                  setActiveService={setActiveService}
                  onHoverChange={(isHovering) => setHoveredService(isHovering ? service.title : null)}
                  isAnimating={isAnimating}
                  setIsAnimating={setIsAnimating}
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
  setActiveService: (title: string | null) => void;
  onHoverChange: (isHovering: boolean) => void;
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
}

const AccordionItemWithObserver = ({
  service,
  serviceProjects,
  setActiveService,
  onHoverChange,
  isAnimating,
  setIsAnimating,
}: AccordionItemWithObserverProps) => {
  const itemRef = useRef<HTMLDivElement | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start center", "end center"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const isCentered = latest > 0 && latest < 1;
      if (isCentered && !isAnimating) {
        setActiveService(service.title);
      }
    });
  }, [scrollYProgress, service.title, setActiveService, isAnimating]);
  
  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    // This event fires for both 'accordion-down' and 'accordion-up'.
    // We only care about when the opening animation finishes.
    if (e.animationName === 'accordion-down') {
      setIsAnimating(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setIsAnimating(true);
    }
  };

  return (
    <div 
        ref={itemRef} 
        onMouseEnter={() => onHoverChange(true)} 
        onMouseLeave={() => onHoverChange(false)}
    >
      <AccordionItem
        value={service.title}
        className="border rounded-2xl bg-card overflow-hidden"
        onFocusCapture={() => handleOpenChange(true)}
      >
        <AccordionTrigger className="p-6 text-xl font-headline hover:no-underline [&[data-state=open]>svg.plus]:hidden [&[data-state=closed]>svg.minus]:hidden">
          <div className="flex items-center gap-4">
            <span>{`Smarter ${service.title}`}</span>
          </div>
          <Plus className="h-6 w-6 plus transition-transform duration-200" />
          <Minus className="h-6 w-6 minus transition-transform duration-200" />
        </AccordionTrigger>
        <AccordionContent 
          className="px-6 pb-6"
          onAnimationEnd={handleAnimationEnd}
        >
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
