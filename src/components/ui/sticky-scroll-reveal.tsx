"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getProjects } from "@/lib/data";
import Image from "next/image";

export const StickyScrollReveal = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 25 and comment line 26 if you DON'T want the overflow container and want to have it change on the entire page!
    // target: ref,
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;
  const projects = getProjects();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsPerScroll = cardLength;
    const totalSections = cardsPerScroll;
    const sectionIndex = Math.floor(latest * totalSections);
    const clampedIndex = Math.min(sectionIndex, cardsPerScroll - 1);
    
    if (clampedIndex >= 0) {
        setActiveCard(clampedIndex);
    }
  });

  const backgroundColors = [
    "var(--background)",
    "var(--background)",
    "var(--background)",
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
  ];

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-screen overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-primary"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg text-muted-foreground max-w-sm mt-10"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <motion.div
        animate={{
          background: linearGradients[activeCard % linearGradients.length],
        }}
        className={cn(
          "hidden lg:block h-96 w-96 rounded-md bg-white sticky top-10 overflow-hidden",
          contentClassName
        )}
      >
        {projects.length > 0 && projects[activeCard] && (
            <Image 
                src={projects[activeCard].imageUrl}
                alt={projects[activeCard].title}
                fill
                className="object-cover"
            />
        )}
      </motion.div>
    </motion.div>
  );
};
