import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";
import { Card } from "./ui/card";

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container">
        
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden slide-reveal-left">
                <Card className="h-full w-full border-white/20 bg-background/50 shadow-lg backdrop-blur-lg">
                    <Image 
                        src="https://picsum.photos/seed/about-us/800/600"
                        alt="AMpire Studio Team"
                        fill
                        className="object-cover"
                        data-ai-hint="team collaboration"
                    />
                </Card>
            </ScrollReveal>
            <ScrollReveal className="slide-reveal-right">
              <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                Our Brand Story
              </h2>
              <p className="mt-6 text-lg text-foreground/80">
                At AMpire Studio, we believe every brand deserves its crown. That’s why our symbol is a crown—because we exist to help businesses and creators rise above the noise and claim their digital throne.
              </p>
              <p className="mt-4 text-lg text-foreground/80">
                We started with a simple vision: to design and build websites that don’t just look good, but work hard. For small businesses, influencers, and growing brands, we craft digital experiences that attract, engage, and convert. From sleek WordPress builds to powerful Next.js applications, our work blends creativity with technology to deliver results that last.
              </p>
              <p className="mt-4 text-lg text-foreground/80">
                With a modern aesthetic shaped by Space Grotesk and Inter, and a bold color palette led by vibrant purple, our brand is designed to be clean, timeless, and unmistakably digital. At AMpire Studio, we’re not just building websites—we’re building empires.
              </p>
              <p className="mt-6 font-headline text-xl font-bold text-primary">
                Built For You. Crowned By Us. 👑
              </p>
            </ScrollReveal>
          </div>
        
      </div>
    </section>
  );
}
