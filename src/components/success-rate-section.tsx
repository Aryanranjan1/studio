
"use client";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";
import { Card, CardContent } from "./ui/card";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const stats = [
    { value: "50+", label: "Happy Clients" },
    { value: "80+", label: "Projects Delivered" },
    { value: "5k+", label: "Hours of Work" },
    { value: "100%", label: "Client Satisfaction" },
];

interface SuccessRateSectionProps {
    className?: string;
}

export function SuccessRateSection({ className }: SuccessRateSectionProps) {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    return (
        <section 
            id="success" 
            ref={sectionRef}
            className={cn("relative py-24 sm:py-32 overflow-hidden", className)}
        >
            <motion.div 
                className="absolute inset-0 z-0"
                style={{ y }}
            >
                <Image
                    src="https://picsum.photos/seed/success-bg/1920/1080"
                    alt="Abstract background"
                    fill
                    className="object-cover"
                    data-ai-hint="abstract background"
                />
                <div className="absolute inset-0 bg-black/70" />
            </motion.div>
            
            <div className="container relative z-10">
                <ScrollReveal>
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            Proven Success, Tangible Results
                        </h2>
                        <p className="mt-4 text-lg text-white/80">
                            We are proud of our track record in helping businesses grow and succeed.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <ScrollReveal key={stat.label} delay={index * 100}>
                            <Card className="h-full text-center py-8 bg-white/10 backdrop-blur-sm border-white/20">
                                <CardContent>
                                    <p className="font-headline text-5xl font-bold text-primary">{stat.value}</p>
                                    <p className="mt-2 text-white/80">{stat.label}</p>
                                </CardContent>
                            </Card>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
