"use client";

import { useState } from "react";
import { portfolioData, services } from "@/lib/data";
import { PortfolioCard } from "./portfolio-card";
import { Button } from "./ui/button";
import { RequestToolDialog } from "./request-tool-dialog";
import { ScrollReveal } from "./scroll-reveal";

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? portfolioData
      : portfolioData.filter((p) => p.services.includes(activeFilter));

  return (
    <section id="portfolio" className="py-16 sm:py-24">
      <div className="container">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Our Showcase
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              A glimpse into the innovative solutions and beautiful designs we've
              crafted for our clients.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="my-8 flex flex-wrap justify-center gap-2">
            <Button
              variant={activeFilter === "All" ? "default" : "secondary"}
              onClick={() => setActiveFilter("All")}
            >
              All
            </Button>
            {services.map((service) => (
              <Button
                key={service}
                variant={activeFilter === service ? "default" : "secondary"}
                onClick={() => setActiveFilter(service)}
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
        
        <ScrollReveal delay={400}>
            <div className="mt-16 text-center">
                <h3 className="font-headline text-2xl font-bold">Have an idea for a design tool?</h3>
                <p className="mt-2 text-muted-foreground">We are always looking to create tools that help the community.</p>
                <div className="mt-6">
                    <RequestToolDialog />
                </div>
            </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
