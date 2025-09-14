
"use client";

import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";
import { Card } from "./ui/card";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";

export function AboutSection() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct * 100);
    y.set(yPct * 100);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  }

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container">
        
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal className="slide-reveal-left">
                <motion.div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        transformStyle: "preserve-3d",
                        transform: "rotateY(-10deg)"
                    }}
                    className="relative h-96 lg:h-[500px] rounded-2xl"
                >
                    <motion.div
                        style={{
                            rotateX,
                            rotateY,
                        }}
                        className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <Card className="h-full w-full border-white/20 bg-background/50 shadow-lg backdrop-blur-lg">
                            <Image 
                                src="https://picsum.photos/seed/about-us/800/600"
                                alt="AMpire Studio Team"
                                fill
                                className="object-cover"
                                data-ai-hint="team collaboration"
                            />
                        </Card>
                    </motion.div>
                </motion.div>
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
