import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";
import { Card } from "./ui/card";

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-background/50">
      <div className="container">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                <Card className="h-full w-full border-white/20 bg-background/50 shadow-lg backdrop-blur-lg">
                    <Image 
                        src="https://picsum.photos/800/600"
                        alt="Our Team"
                        fill
                        className="object-cover"
                        data-ai-hint="team business"
                    />
                </Card>
            </div>
            <div>
              <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                About AMpire Studio
              </h2>
              <p className="mt-6 text-lg text-foreground/80">
                We are a passionate team of designers, developers, and strategists dedicated to crafting exceptional digital experiences. Our studio thrives on collaboration, innovation, and a shared commitment to pushing the boundaries of design and technology.
              </p>
              <p className="mt-4 text-lg text-foreground/80">
                Our mission is to translate your ideas into powerful digital solutions that not only look beautiful but also perform flawlessly. We believe in building partnerships with our clients, working together to achieve outstanding results.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
