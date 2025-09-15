
"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from 'embla-carousel-react';

import { getProjects } from "@/lib/data";
import type { Project } from "@/lib/data";
import { useItemDrawer } from "@/hooks/use-item-drawer";
import { cn } from "@/lib/utils";

export function WorkHero() {
  const projects = getProjects();
  const { showItem } = useItemDrawer();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 50 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [slidesInView, setSlidesInView] = useState<number[]>([]);

  const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    setSlidesInView(emblaApi.slidesInView(true));
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    
    updateSlidesInView(emblaApi);
    emblaApi.on("select", updateSlidesInView);
    emblaApi.on("reInit", updateSlidesInView);
    // Cleanup
    return () => {
      emblaApi.off("select", updateSlidesInView);
    };
  }, [emblaApi, updateSlidesInView]);

  const handleCardClick = (project: Project) => {
    showItem(project);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-10 bg-black/20" />
      <div className="embla embla--fade h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={cn(
                "embla__slide relative flex h-full items-center justify-center",
                "transition-opacity duration-700 ease-in-out",
                slidesInView.includes(index) ? "opacity-100" : "opacity-0"
              )}
              onClick={() => handleCardClick(project)}
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                priority={index < 2}
                className="object-cover"
                data-ai-hint={project.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
