
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

interface PortfolioSectionProps {
  className?: string;
  filterBy?: string;
}

export function PortfolioSection({ className, filterBy }: PortfolioSectionProps) {
  const allProjects = getProjects();
  const allServices = getServices();

  // Filter services if a filter is provided
  const servicesToShow = filterBy
    ? allServices.filter((s) => s.title === filterBy)
    : allServices;

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
            collapsible
            className="w-full space-y-4"
            defaultValue={servicesToShow[0]?.title}
          >
            {servicesToShow.map((service) => {
              const serviceProjects = allProjects.filter((p) =>
                p.services.includes(service.title)
              );
              return (
                <AccordionItem
                  key={service.id}
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
                        <div className="relative h-64 md:h-80 -rotate-6">
                            {serviceProjects.slice(0, 3).map((project, index) => (
                                <div 
                                    key={project.id} 
                                    className="absolute rounded-lg overflow-hidden shadow-2xl"
                                    style={{
                                        width: '60%',
                                        height: '60%',
                                        top: `${10 + index * 15}%`,
                                        left: `${5 + index * 20}%`,
                                        transform: `rotate(${index * 5 - 5}deg)`,
                                        zIndex: index,
                                    }}
                                >
                                    <Image
                                        src={project.imageUrl}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={project.imageHint}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
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
