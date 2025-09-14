
"use client";

import { getProjects } from "@/lib/data";
import type { Project } from "@/lib/data";
import { ScrollReveal } from "./scroll-reveal";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface PortfolioSectionProps {
  className?: string;
  filterBy?: string;
}

export function PortfolioSection({ className, filterBy }: PortfolioSectionProps) {
  const projects = getProjects();

  return (
    <section id="portfolio" className={cn("py-24 sm:py-32", className)}>
      <div className="container">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Amazing Live Projects We've Designed & Built
            </h2>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              A glimpse into the innovative solutions and beautiful designs we've crafted for our clients.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-8">
            {projects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 100}>
                  <Link href={`/work/${project.slug}`}>
                      <div className="grid lg:grid-cols-2 gap-8 items-center bg-card p-8 rounded-2xl group">
                          <div className={cn("relative h-80 rounded-2xl overflow-hidden", index % 2 !== 0 && "lg:order-last")}>
                              <Image
                                  src={project.imageUrl}
                                  alt={project.title}
                                  fill
                                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                  data-ai-hint={project.imageHint}
                              />
                          </div>
                          <div className="p-4">
                              <h3 className="font-headline text-3xl font-bold mb-4">{project.title}</h3>
                              <p className="text-muted-foreground mb-6">{project.summary}</p>
                              <div className="flex flex-wrap gap-2 mb-6">
                                  {project.services.map(s => <div key={s} className="text-sm border rounded-full px-3 py-1">{s}</div>)}
                              </div>
                              <div className="font-semibold text-primary group-hover:text-accent flex items-center transition-colors">
                                  View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                              </div>
                          </div>
                      </div>
                  </Link>
              </ScrollReveal>
            ))}
        </div>
        <div className="mt-16 text-center">
            <Button size="lg" variant="outline" className="bg-accent text-accent-foreground hover:bg-accent/90 border-0" asChild>
                <Link href="/work">View All Work</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
