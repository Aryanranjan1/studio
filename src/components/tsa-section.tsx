"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ScrollReveal } from "./scroll-reveal";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function TsaSection() {

  return (
    <section className="py-24 sm:py-32 bg-primary text-primary-foreground">
      <div className="container">
        <ScrollReveal>
          <div className="bg-background/80 rounded-2xl shadow-lg overflow-hidden backdrop-blur-sm border border-primary-foreground/10">
            <div className="grid lg:grid-cols-2 items-center">
              <div className="p-8 lg:p-12">
                <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
                  Have an amazing project idea in mind?
                </h2>
                <p className="mt-6 text-lg text-primary-foreground/80">
                  Let's discuss how we can help your brand rise above the noise.
                  Schedule your free strategy call today.
                </p>
                <div className="mt-10">
                  <Button size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                    <Link href="/project-intake">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="h-64 lg:h-full relative">
                 <Image
                    src="https://picsum.photos/seed/tsa-image/600/500"
                    alt="Woman with a project idea"
                    fill
                    className="object-cover"
                    data-ai-hint="woman idea"
                 />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
