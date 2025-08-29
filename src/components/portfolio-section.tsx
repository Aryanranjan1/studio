"use client";

import { useState, useEffect } from "react";
import { getProjects, Project, services } from "@/lib/data";
import { PortfolioCard } from "./portfolio-card";
import { Button } from "./ui/button";
import { ScrollReveal } from "./scroll-reveal";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

interface PortfolioSectionProps {
  className?: string;
}

export function PortfolioSection({ className }: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getProjects((fetchedProjects) => {
      setProjects(fetchedProjects);
      setLoading(false);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.services.includes(activeFilter));

  return (
    <section id="portfolio" className={cn("overflow-x-hidden py-24 sm:py-32", className)}>
      <div className="container">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              Our Showcase
            </h2>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              A glimpse into the innovative solutions and beautiful designs we've
              crafted for our clients.
            </p>
          </div>
        </ScrollReveal>

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
                key={service}
                variant={activeFilter === service ? "default" : "outline"}
                onClick={() => setActiveFilter(service)}
                className="rounded-full"
              >
                {service}
              </Button>
            ))}
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <PortfolioCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
