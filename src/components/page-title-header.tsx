
"use client"

import { ScrollReveal } from "./scroll-reveal";
import LightRays from "@/components/ui/light-rays";
import { useTheme } from "next-themes";

interface PageTitleHeaderProps {
    title: string;
    subtitle: string;
}

export function PageTitleHeader({ title, subtitle }: PageTitleHeaderProps) {
    const { theme } = useTheme();

    return (
        <section className="relative py-24 sm:py-32 bg-primary/10 dark:bg-primary/10 overflow-hidden">
            <LightRays
                raysColor={theme === 'dark' ? '#FFFFFF' : '#8B5CF6'}
                raysSpeed={0.4}
                lightSpread={0.8}
                rayLength={1.2}
                pulsating={true}
                fadeDistance={0.8}
                saturation={0.5}
                mouseInfluence={0.1}
                noiseAmount={0.05}
                distortion={0.05}
                className="opacity-20"
            />
            <div className="container relative">
                <ScrollReveal>
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="mt-6 text-lg text-foreground/80">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
