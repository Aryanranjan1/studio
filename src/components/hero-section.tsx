import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-32 md:py-40 lg:py-48">
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
            <h1 className="font-headline text-5xl font-bold tracking-tight text-primary sm:text-6xl md:text-7xl">
              We Craft Digital Excellence
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/80 md:text-xl">
              AMpire Studio is a creative powerhouse specializing in UI/UX design,
              branding, and web development. We build stunning, user-centric
              digital experiences that captivate and convert.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <a href="#portfolio">
                  View Our Work <ArrowDown className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline">
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
