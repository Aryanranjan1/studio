
'use client';

import { getServices } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export function ServicesSection() {
  const services = getServices().slice(0, 4); // We only want to show 4 services in this grid

  return (
    <section className="bg-background py-24 sm:py-32 border-t border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between">
          <div className="max-w-2xl">
            <p className="font-semibold uppercase tracking-wider text-muted-foreground">
              What We Do?
            </p>
            <h2 className="mt-2 font-headline text-4xl font-bold sm:text-5xl">
              EXPERTS IN EVERY ASPECT LIFECYCLE
            </h2>
          </div>
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 border-t border-l border-border md:grid-cols-2">
          {services.map((service, index) => (
            <Link
              href="/services"
              key={service.id}
              className={cn(
                'group relative border-b border-r border-border p-8 transition-colors duration-300',
                index === 0
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-background hover:bg-muted'
              )}
              style={{ minHeight: '350px' }}
            >
              <div className="flex h-full flex-col">
                <h3 className="font-headline text-3xl font-bold">
                  {service.title}
                </h3>
                <p
                  className={cn(
                    'mt-4 flex-grow text-sm',
                    index === 0
                      ? 'text-primary-foreground/80'
                      : 'text-muted-foreground'
                  )}
                >
                  {service.description}
                </p>
                <div className="flex justify-end">
                  <ArrowRight className="h-8 w-8 transition-transform duration-300 group-hover:rotate-[-45deg]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
         <div className="mt-8 flex justify-center sm:hidden">
            <Button asChild variant="outline">
                <Link href="/services">View All Services</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
