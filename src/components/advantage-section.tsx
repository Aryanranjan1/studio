
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
            <h2 className="font-headline mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Why Choose Us?
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              Here's how we solve your biggest challenges and help you claim your digital throne.
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
