import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="bg-primary text-primary-foreground py-32 md:py-40 lg:py-48">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
                <h1 className="font-headline text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
                    We Don't Just Build Websites, We Build Empires.
                </h1>
                <p className="mt-6 text-lg leading-8 text-primary-foreground/80 md:text-xl">
                    For small businesses, influencers, and growing brands, we craft digital experiences that attract, engage, and convert.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                    <Button size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                        <Link href="/contact">
                            Claim Your Throne <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out delay-200">
                <Image
                    src="https://picsum.photos/seed/hero-main/800/600"
                    alt="Team collaborating on a project"
                    width={800}
                    height={600}
                    className="rounded-2xl shadow-2xl"
                    data-ai-hint="team collaboration"
                />
            </div>
        </div>
      </div>
    </section>
  );
}
