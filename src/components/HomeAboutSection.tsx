"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/data";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useItemDrawer } from "@/hooks/use-item-drawer";

interface HomeAboutSectionProps {
  projects: Project[];
  className?: string;
}

export function HomeAboutSection({ projects, className }: HomeAboutSectionProps) {
  const [randomProjects, setRandomProjects] = useState<Project[]>([]);
  const { showItem } = useItemDrawer();

  useEffect(() => {
    const shuffled = [...projects].sort(() => 0.5 - Math.random());
    setRandomProjects(shuffled.slice(0, 3));
  }, [projects]);

  const stackContainerVariants = {
    hidden: { opacity: 0, x: -300, y: 300, rotate: -45 }, // Increased x and y
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      rotate: 0,
      transition: { type: "spring", stiffness: 80, damping: 25, staggerChildren: 0.3 } // Adjusted stiffness and damping
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section className={cn("py-24 sm:py-32 relative overflow-hidden", className)}>
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="container grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          className="relative h-96 lg:h-[500px]"
          variants={stackContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }} // Removed once: true
        >
          {randomProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="absolute w-3/4 h-3/4 rounded-lg overflow-hidden shadow-2xl bg-card cursor-pointer"
              style={{
                zIndex: index,
                rotate: `${(index - 1) * 8}deg`,
                top: `${index * 15}%`,
                left: `${index * 10}%`,
              }}
              variants={imageVariants}
              onClick={() => showItem(project)}
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </motion.div>
          ))}
        </motion.div>
        <div>
          <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Let's Build Your Digital Empire, Together.
          </h2>
          <p className="mt-6 text-lg text-foreground/80">
            We are a passionate team of designers, developers, and strategists
            dedicated to crafting exceptional digital experiences. We don't just
            build websites; we build partnerships. Your vision is our mission,
            and your success is our benchmark.
          </p>
          <p className="mt-4 text-lg text-foreground/80">
            From initial concept to final launch, we work closely with you to
            ensure every detail is perfect. Let's create something amazing.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/about">
              More About Us <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
