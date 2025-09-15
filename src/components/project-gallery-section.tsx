
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getProjects } from "@/lib/data";
import type { Project } from "@/lib/data";
import { useItemDrawer } from "@/hooks/use-item-drawer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 6;

export function ProjectGallerySection() {
  const allProjects = getProjects();
  const { showItem } = useItemDrawer();
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(allProjects.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = allProjects.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="container">
        <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Our Digital Creations
                </h2>
                <p className="mt-4 text-lg text-foreground/80">
                    A collection of our finest work, showcasing our dedication to quality and innovation in every pixel.
                </p>
            </div>
        </ScrollReveal>

        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentProjects.map((project) => (
            <motion.div
              key={project.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer"
              onClick={() => showItem(project)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                data-ai-hint={project.imageHint}
              />
              <div className="absolute inset-0 bg-black/70 p-6 flex flex-col justify-end text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div>
                    <h3 className="font-headline text-xl font-bold">
                        {project.title}
                    </h3>
                    <p className="text-sm mt-2 text-white/80 line-clamp-2">{project.summary}</p>
                    <div className="mt-4 flex items-center text-sm font-semibold">
                        Read More <ArrowUpRight className="ml-1 h-4 w-4" />
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
                <Button variant="outline" size="icon" onClick={handlePrevPage}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                    Page {currentPage + 1} of {totalPages}
                </span>
                <Button variant="outline" size="icon" onClick={handleNextPage}>
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </div>
        )}
      </div>
    </section>
  );
}
