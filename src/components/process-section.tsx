
"use client";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { Calendar, PenTool, Code, Search, CheckCircle, Rocket } from "lucide-react";

const processSteps = [
    {
      id: 1,
      title: "Discovery & Strategy",
      date: "Step 1",
      content: "We dive deep into your brand, goals, and audience to create a strategic blueprint for your digital empire.",
      category: "Planning",
      icon: Calendar,
      relatedIds: [2],
      status: "completed" as const,
      energy: 100,
    },
    {
      id: 2,
      title: "Design & Prototyping",
      date: "Step 2",
      content: "We craft stunning, user-centric designs and interactive prototypes. This is where your vision starts to take shape.",
      category: "Design",
      icon: PenTool,
      relatedIds: [1, 3],
      status: "completed" as const,
      energy: 90,
    },
    {
      id: 3,
      title: "Development & Build",
      date: "Step 3",
      content: "Our developers bring the designs to life with clean, efficient code, whether it's a WordPress site or a Next.js app.",
      category: "Development",
      icon: Code,
      relatedIds: [2, 4],
      status: "completed" as const,
      energy: 80,
    },
     {
      id: 4,
      title: "SEO & Automation Setup",
      date: "Step 4",
      content: "We implement foundational SEO and time-saving automations to ensure your site works hard for you from day one.",
      category: "Setup",
      icon: Search,
      relatedIds: [3, 5],
      status: "in-progress" as const,
      energy: 60,
    },
    {
      id: 5,
      title: "Testing & Quality Assurance",
      date: "Step 5",
      content: "We rigorously test everything across all devices to ensure a flawless, bug-free launch for your audience.",
      category: "Testing",
      icon: CheckCircle,
      relatedIds: [4, 6],
      status: "pending" as const,
      energy: 40,
    },
    {
      id: 6,
      title: "Launch & Coronation",
      date: "Step 6",
      content: "We deploy your project and hand you the keys to your new digital throne. Ongoing support ensures your reign is long and successful.",
      category: "Release",
      icon: Rocket,
      relatedIds: [5],
      status: "pending" as const,
      energy: 20,
    },
];

interface ProcessSectionProps {
    className?: string;
}

export function ProcessSection({ className }: ProcessSectionProps) {
    return (
        <section id="process" className={cn("py-24 sm:py-32", className)}>
            <div className="container">
                <ScrollReveal>
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="font-headline text-sm font-semibold uppercase tracking-wider text-primary">Our Process</p>
                        <h2 className="font-headline mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                            How We Crown Your Brand
                        </h2>
                        <p className="mt-6 text-lg text-foreground/80">
                            Our structured approach ensures efficiency, transparency, and outstanding results at every stage of building your empire.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="relative mt-16 h-[500px] md:h-[600px] w-full">
                    <RadialOrbitalTimeline timelineData={processSteps} />
                </div>
            </div>
        </section>
    )
}
