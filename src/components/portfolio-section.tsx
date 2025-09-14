
"use client";

import { useState } from "react";
import { getProjects, getServices } from "@/lib/data";
import type { Project, Service } from "@/lib/data";
import { PortfolioCard } from "./portfolio-card";
import { Button } from "./ui/button";
import { ScrollReveal } from "./scroll-reveal";
import { cn } from "@/lib/utils";

interface PortfolioSectionProps {
  className?: string;
  filterBy?: string;
}

export function PortfolioSection({ className, filterBy }: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState(filterBy || "All");
  const projects = getProjects();
  const services = getServices();

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

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <PortfolioCard key={project.id} project={project} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
}
