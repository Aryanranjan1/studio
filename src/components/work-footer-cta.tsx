"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function WorkFooterCta() {
  return (
    <section className="relative py-24 sm:py-32 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          src="/videos/workpage.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="container relative z-10 text-center">
        <h2 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Ready to start your project?
        </h2>
        <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
          Let's build something amazing together.
        </p>
        <div className="mt-10">
          <Button size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link href="/project-intake">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
