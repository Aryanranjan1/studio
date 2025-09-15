
'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { LogoLoop } from '@/components/ui/logo-loop'
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiWordpress, SiShopify } from 'react-icons/si';
import Plasma from "@/components/ui/Plasma";

const techLogos = [
    { node: <SiReact size="28"/>, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs size="28"/>, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript size="28"/>, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss size="28"/>, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiNodedotjs size="28"/>, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiWordpress size="28"/>, title: "WordPress", href: "https://wordpress.org" },
    { node: <SiShopify size="28"/>, title: "Shopify", href: "https://www.shopify.com" },
];

export function HeroSection() {
    return (
        <main className="overflow-x-hidden">
            <section className="relative pt-32 lg:pt-48 pb-24 md:pb-32 lg:pb-36">
                <div className="absolute inset-0 overflow-hidden">
                    <Plasma color="#4F46E5" speed={0.5} />
                     <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
                </div>

                <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:px-12">
                    <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
                        <h1 className="mt-8 max-w-2xl text-balance text-5xl md:text-6xl lg:mt-16 xl:text-7xl">We Don't Just Build Websites, We Build Empires.</h1>
                        <p className="mt-8 max-w-2xl text-balance text-lg text-muted-foreground">For small businesses, influencers, and growing brands, we craft digital experiences that attract, engage, and convert.</p>

                        <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                            <Button
                                asChild
                                size="lg"
                                className="h-12 rounded-full pl-5 pr-3 text-base">
                                <Link href="/project-intake">
                                    <span className="text-nowrap">Start Building</span>
                                    <ChevronRight className="ml-1" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="h-12 rounded-full px-5 text-base border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                                <Link href="/contact">
                                    <span className="text-nowrap">Request a demo</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-background py-8">
                <LogoLoop
                    logos={techLogos}
                    speed={100}
                    direction="left"
                    logoHeight={32}
                    gap={48}
                    pauseOnHover
                    scaleOnHover
                    fadeOut
                />
            </section>
        </main>
    )
}
