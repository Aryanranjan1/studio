import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { Typewriter } from "./typewriter";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-accent/50 py-32 md:py-40 lg:py-48 h-auto flex items-center justify-center rounded-b-3xl">
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
            <div className="relative inline-block">
                <Typewriter 
                  as="h1"
                  texts="We Don't Just Build Websites, We Build Empires."
                  className="font-headline text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl"
                />
                <Typewriter
                  texts={[
                    "For small businesses, influencers, and growing brands.",
                    "We craft digital experiences that attract, engage, and convert.",
                    "Claim your digital throne.",
                  ]}
                  className="mt-6 text-lg leading-8 text-foreground/80 md:text-xl min-h-[56px] md:min-h-[64px]"
                />
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/#portfolio">
                  View Our Work <ArrowDown className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Claim Your Throne</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
