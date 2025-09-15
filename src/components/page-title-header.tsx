
"use client"

import { ScrollReveal } from "./scroll-reveal";
import DarkVeil from "@/components/ui/dark-veil";
import { useTheme } from "next-themes";

interface PageTitleHeaderProps {
    title: string;
    subtitle: string;
}

export function PageTitleHeader({ title, subtitle }: PageTitleHeaderProps) {
    const { theme } = useTheme();

    return (
        <section className="relative py-24 sm:py-32 text-primary-foreground overflow-hidden">
            <div className="absolute inset-0 z-0">
                <DarkVeil hueShift={244} />
            </div>
            <div className="container relative">
                <ScrollReveal>
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="mt-6 text-lg text-white/80">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
