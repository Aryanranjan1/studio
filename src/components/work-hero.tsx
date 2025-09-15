"use client";

import React from "react";
import Image from "next/image";

export function WorkHero() {
  return (
    <div className='relative flex h-screen items-center justify-center bg-background text-white'>
        <div className="absolute inset-0 z-0">
            <Image
                src="https://picsum.photos/seed/universe/1920/1080"
                alt="Abstract universe background"
                fill
                priority
                className="object-cover"
                data-ai-hint="abstract universe"
            />
            <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className='relative z-10 max-w-4xl text-center'>
            <h2 className='text-4xl font-bold font-headline md:text-6xl'>
            A Glimpse Into Our Universe
            </h2>
            <p className='mt-4 text-lg text-white/80'>
            Where creativity meets code. Scroll to explore our work.
            </p>
            <div className="mt-8 text-white/80 animate-bounce">
            ↓ Scroll Down ↓
            </div>
        </div>
    </div>
  );
}
