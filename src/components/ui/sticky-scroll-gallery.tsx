
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
