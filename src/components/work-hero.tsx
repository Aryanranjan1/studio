
"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import { getProjects } from "@/lib/data";
import type { Project } from "@/lib/data";
import { useItemDrawer } from "@/hooks/use-item-drawer";
import { cn } from "@/lib/utils";

export function WorkHero() {
  const projects = getProjects();
  const { showItem } = useItemDrawer();

  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 50 }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  const handleCardClick = (project: Project) => {
    showItem(project);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-10 bg-black/40" />
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {projects.map((project) => (
            <div
              key={project.id}
              className="embla__slide relative flex h-full items-center justify-center"
              onClick={() => handleCardClick(project)}
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                priority
                className="object-cover"
                data-ai-hint={project.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              <div className="relative z-20 text-center text-white">
                <h2 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  {project.title}
                </h2>
                <p className="mt-4 text-lg text-white/80 max-w-xl">
                  {project.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
