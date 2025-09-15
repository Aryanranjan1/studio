
"use client";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";
import { BentoGridDemo } from "./bento-grid";

interface AdvantageSectionProps {
  className?: string;
}

export function AdvantageSection({ className }: AdvantageSectionProps) {

  return (
    <section id="advantage" className={cn("py-24 sm:py-32", className)}>
      <div className="container">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-headline text-sm font-semibold uppercase tracking-wider text-primary">Why Choose Us?</p>
            <h2 className="font-headline mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Your Digital Problem Solvers
            </h2>
            <p className="mt-6 text-lg text-foreground/80">
              You're facing scaling challenges, tech confusion, and online invisibility. We provide the solutions to help you claim your digital throne.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
            <BentoGridDemo />
        </ScrollReveal>
      </div>
    </section>
  );
}
