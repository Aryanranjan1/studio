import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";
import { SparklesCore } from "./ui/sparkles";
import Link from "next/link";
import { Typewriter } from "./typewriter";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-transparent py-32 md:py-40 lg:py-48">
      <div className="absolute inset-0 z-0 h-full w-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="h-full w-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
            <div className="animate-float relative inline-block rounded-3xl bg-background/30 p-8 backdrop-blur-md">
                <Typewriter 
                  as="h1"
                  texts="We Craft Digital Excellence"
                  className="font-headline text-5xl font-bold tracking-tight text-primary sm:text-6xl md:text-7xl"
                />
                <Typewriter
                  texts={[
                    "AMpire Studio is a creative powerhouse specializing in UI/UX design.",
                    "We build stunning, user-centric digital experiences.",
                    "We specialize in branding and web development.",
                    "Our digital experiences captivate and convert.",
                  ]}
                  className="mt-6 text-lg leading-8 text-foreground/80 md:text-xl min-h-[56px] md:min-h-[64px]"
                />
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/work">
                  View Our Work <ArrowDown className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
