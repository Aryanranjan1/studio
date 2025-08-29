"use client";

import { useState, useEffect } from "react";
import { getProjects, getServices } from "@/lib/data";
import type { Project, Service } from "@/lib/data";
import { PortfolioCard } from "./portfolio-card";
import { Button } from "./ui/button";
import { ScrollReveal } from "./scroll-reveal";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

interface PortfolioSectionProps {
  className?: string;
  filterBy?: string;
}

export function PortfolioSection({ className, filterBy }: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState(filterBy || "All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubProjects = getProjects((fetchedProjects) => {
      setProjects(fetchedProjects);
      if (services.length > 0) setLoading(false);
    });
    const unsubServices = getServices((fetchedServices) => {
        setServices(fetchedServices);
        if (projects.length > 0 || fetchedServices.length > 0) setLoading(false);
    });
    return () => {
        unsubProjects();
        unsubServices();
    }
  }, []);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.services.includes(activeFilter));

  const sectionTitle = filterBy ? `Related ${filterBy} Projects` : "Our Showcase";
  const sectionSubtitle = filterBy ? `See our work in the ${filterBy} space.` : "A glimpse into the innovative solutions and beautiful designs we've crafted for our clients.";

  return (
    <section id="portfolio" className={cn("overflow-x-hidden py-24 sm:py-32", className)}>
      <div className="container">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              {sectionTitle}
            </h2>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              {sectionSubtitle}
            </p>
          </div>
        </ScrollReveal>

        {!filterBy && (
            <ScrollReveal delay={200}>
            <div className="my-10 flex flex-wrap justify-center gap-3">
                <Button
                variant={activeFilter === "All" ? "default" : "outline"}
                onClick={() => setActiveFilter("All")}
                className="rounded-full"
                >
                All
                </Button>
                {services.map((service) => (
                <Button
                    key={service.id}
                    variant={activeFilter === service.title ? "default" : "outline"}
                    onClick={() => setActiveFilter(service.title)}
                    className="rounded-full"
                >
                    {service.title}
                </Button>
                ))}
            </div>
            </ScrollReveal>
        )}


        {loading ? (
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
             {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-4">
                    <Skeleton className="h-60 w-full rounded-2xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                </div>
            ))}
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <PortfolioCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
