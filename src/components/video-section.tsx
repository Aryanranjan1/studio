
"use client";

import Image from "next/image";
import { getProjects } from "@/lib/data";
import type { Project } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollReveal } from "./scroll-reveal";

export function VideoSection({ className }: { className?: string }) {
  const projects = getProjects();

  return (
    <section id="gallery" className={className}>
      <div className="container py-24 sm:py-32">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Our Visual Showcase
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              A curated look at the stunning visuals and user-centric designs we've brought to life for our clients.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <div className="mt-16 max-w-5xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {projects.map((project) => (
                  <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/2">
                    <div className="p-1">
                      <Card className="overflow-hidden">
                        <CardContent className="flex aspect-video items-center justify-center p-0">
                           <Image
                                src={project.imageUrl}
                                alt={project.title}
                                width={600}
                                height={400}
                                className="w-full h-full object-cover"
                                data-ai-hint={project.imageHint}
                           />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
