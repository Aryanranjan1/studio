
"use client"

import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";

interface PageTitleHeaderProps {
    title: string;
    subtitle: string;
    imageUrl?: string;
}

export function PageTitleHeader({ title, subtitle, imageUrl }: PageTitleHeaderProps) {
    return (
        <section className="relative py-24 sm:py-32 text-primary-foreground overflow-hidden">
            <div className="absolute inset-0 z-0">
                {imageUrl ? (
                    <>
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            priority
                            className="object-cover"
                            data-ai-hint="newspaper article abstract"
                        />
                        <div className="absolute inset-0 bg-black/60" />
                    </>
                ) : (
                    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
                        <div className="absolute -top-1/4 left-0 w-full h-full bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-50 animate-pulse-slow" />
                        <div className="absolute top-0 -right-1/4 w-full h-full bg-gradient-to-l from-blue-500/10 via-transparent to-transparent opacity-50 animate-pulse-slow [animation-delay:2s]" />
                        <div className="absolute inset-0 bg-primary/90" />
                    </div>
                )}
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
