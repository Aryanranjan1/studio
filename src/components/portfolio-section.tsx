"use client";

import { useState } from "react";
import { portfolioData, services } from "@/lib/data";
import { PortfolioCard } from "./portfolio-card";
import { Button } from "./ui/button";
import { ScrollReveal } from "./scroll-reveal";

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? portfolioData
      : portfolioData.filter((p) => p.services.includes(activeFilter));

  return (
    <section id="portfolio" className="overflow-x-hidden py-24 sm:py-32">
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <PortfolioCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
