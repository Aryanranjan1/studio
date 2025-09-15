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

export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] mt-16">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = ({className}: {className?: string}) => (
    <div className={cn("flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-dot-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black", className)}></div>
);

const items = [
  {
    title: "Clarity Over Confusion",
    description: "We demystify technology, offering clear solutions with trusted stacks like Next.js for performance and modern CMS platforms for flexibility.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <Lightbulb className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "From Invisible to Invincible",
    description: "We make you visible online with proven SEO strategies that bring targeted traffic and valuable leads to your digital doorstep.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <BarChart3 className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Automated Efficiency",
    description: "We save you time by building custom automations that handle your repetitive, time-consuming tasks.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <Clock className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Built to Scale",
    description:
      "We help you grow with custom apps, integrations, and performance-focused websites that can handle more users and complexity.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <Scaling className="h-4 w-4 text-neutral-500" />,
  },
];
