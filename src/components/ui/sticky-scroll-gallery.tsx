
'use client';
import React, { forwardRef } from 'react';
import Image from 'next/image';
import { getProjects } from '@/lib/data';
import type { Project } from '@/lib/data';

const StickyScrollGallery = forwardRef<HTMLElement>((props, ref) => {
    const projects: Project[] = getProjects();
    
    // We need at least 5 images for this layout. If not enough, we'll duplicate some.
    const getLoopedImages = (count: number) => {
        const images: {src: string, hint: string, title: string}[] = projects.map(p => ({src: p.imageUrl, hint: p.imageHint, title: p.title}));
        while (images.length > 0 && images.length < count) {
            images.push(...images);
        }
        return images.slice(0, count);
    };

    const leftImages = getLoopedImages(5);
    const centerImages = getLoopedImages(3);
    const rightImages = getLoopedImages(5);

  return (
      <main className='bg-background text-foreground' ref={ref}>
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
        <section className='text-white w-full bg-background'>
          <div className='grid grid-cols-12 gap-2 p-2'>
            <div className='grid gap-2 col-span-4'>
                {leftImages.map((img, index) => (
                    <figure key={`left-${index}`} className='w-full'>
                        <Image
                        src={img.src}
                        alt={img.title}
                        width={500}
                        height={384}
                        data-ai-hint={img.hint}
                        className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                        />
                    </figure>
                ))}
            </div>
            <div className='sticky top-0 h-screen w-full col-span-4 gap-2 grid grid-rows-3'>
                {centerImages.map((img, index) => (
                    <figure key={`center-${index}`} className='w-full h-full'>
                        <Image
                        src={img.src}
                        alt={img.title}
                        width={500}
                        height={500}
                        data-ai-hint={img.hint}
                        className='transition-all duration-300 h-full w-full align-bottom object-cover rounded-md'
                        />
                    </figure>
                ))}
            </div>
            <div className='grid gap-2 col-span-4'>
                {rightImages.map((img, index) => (
                    <figure key={`right-${index}`} className='w-full'>
                        <Image
                        src={img.src}
                        alt={img.title}
                        width={500}
                        height={384}
                        data-ai-hint={img.hint}
                        className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                        />
                    </figure>
                ))}
            </div>
          </div>
        </section>
      </main>
  );
});

StickyScrollGallery.displayName = 'StickyScrollGallery';

export { StickyScrollGallery };
