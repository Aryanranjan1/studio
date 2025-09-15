import { cn } from "@/lib/utils";
import React from "react";
import {
  BentoGrid,
  BentoGridItem,
} from "@/components/ui/bento-grid";
import {
    Lightbulb,
    BarChart3,
    Clock,
    Scaling,
    Rocket,
    Code,
    Smartphone,
    ShoppingCart
} from "lucide-react";
import Image from "next/image";

export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[22rem] mt-16">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          problem={item.problem}
          solution={item.solution}
          className={item.className}
          icon={item.icon}
          imageUrl={item.imageUrl}
          imageHint={item.imageHint}
        />
      ))}
    </BentoGrid>
  );
}

const items = [
  {
    problem: "Facing tech confusion?",
    solution: "We demystify technology, offering clear solutions with trusted stacks like Next.js for performance and modern CMS platforms for flexibility.",
    className: "md:col-span-2",
    icon: <Lightbulb className="h-4 w-4 text-neutral-500" />,
    imageUrl: "https://picsum.photos/seed/tech-clarity/800/400",
    imageHint: "code dashboard"
  },
  {
    problem: "Struggling with online invisibility?",
    solution: "We make you visible online with proven SEO strategies that bring targeted traffic and valuable leads to your digital doorstep.",
    className: "md:col-span-1",
    icon: <BarChart3 className="h-4 w-4 text-neutral-500" />,
    imageUrl: "https://picsum.photos/seed/seo-growth/400/400",
    imageHint: "chart graph"
  },
  {
    problem: "Losing time to repetitive tasks?",
    solution: "We save you time by building custom automations that handle your repetitive, time-consuming tasks.",
    className: "md:col-span-1",
    icon: <Clock className="h-4 w-4 text-neutral-500" />,
    imageUrl: "https://picsum.photos/seed/automation-gears/400/400",
    imageHint: "gears clock"
  },
  {
    problem: "Can't keep up with growth?",
    solution:
      "We help you grow with custom apps, integrations, and performance-focused websites that can handle more users and complexity.",
    className: "md:col-span-2",
    icon: <Scaling className="h-4 w-4 text-neutral-500" />,
    imageUrl: "https://picsum.photos/seed/scaling-up/800/400",
    imageHint: "abstract architecture"
  },
];
