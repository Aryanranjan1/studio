import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
              Transforming Ideas into Digital Masterpieces
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/80">
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
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl animate-float [animation-delay:-1.5s]"></div>
      </div>
    </section>
  );
}
