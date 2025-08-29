import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";

export function ProjectFormTsaSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/1200/800"
          alt="Developer desk with code"
          fill
          className="object-cover"
          data-ai-hint="code laptop"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="container relative">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Have a Project in Mind?
            </h2>
            <p className="mt-6 text-lg text-white/80">
              Let's talk about how we can work together to create something amazing.
            </p>
            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/contact">Get a Free Consultation</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
