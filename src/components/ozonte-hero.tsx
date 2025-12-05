'use client';
import Image from 'next/image';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export function OzonteHero() {
  return (
    <div className="relative flex h-screen w-full flex-col bg-black text-white">
      <div className="absolute top-1/4 left-8 z-10">
        <h1 className="font-headline text-8xl font-bold uppercase md:text-9xl">
          <span className="text-primary">Ozonte</span>
          <br />
          Agency
        </h1>
      </div>
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/ozonte/1920/1080"
          alt="Abstract red waves"
          fill
          className="object-cover"
          data-ai-hint="abstract red waves dark"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <footer className="absolute bottom-0 left-0 right-0 z-10 p-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-end gap-8 md:grid-cols-3">
          <div className="max-w-xs md:col-span-1">
            <p className="text-lg">
              we create websites that{' '}
              <span className="text-primary">captivate users</span> from the
              first seconds
            </p>
          </div>
          <div className="hidden text-sm text-muted-foreground md:block md:col-span-1">
            <p>& seamlessly blend with marketing</p>
          </div>
          <div className="flex items-center justify-end gap-4 md:col-span-1">
            <Button
              variant="ghost"
              className="group text-lg hover:bg-transparent hover:text-primary"
            >
              start a project
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
