'use client';

import { useState } from 'react';
import { getServices } from '@/lib/data';
import { ArrowRight, DraftingCompass, Globe, UserCog } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { SeoIcon } from './icons';

const iconComponents: { [key: string]: React.ElementType } = {
  Globe,
  Seo: SeoIcon,
  Brand: DraftingCompass,
  Maintenance: UserCog,
};

const allCategories = [
  'Web Design',
  'Social Media',
  'Support',
  'Brand',
  'Search Engine Optimization',
];

export function ServicesSection() {
  const allServices = getServices();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredServices = selectedCategory
    ? allServices.filter(service => service.category === selectedCategory)
    : allServices;

  return (
    <section className="bg-card/30 py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-semibold uppercase tracking-wider text-primary">
              Official Services
            </p>
            <h2 className="mt-2 font-headline text-3xl font-bold sm:text-4xl">
              Innovative Practises for Maximum Online Presence
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {allCategories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category ? null : category
                  )
                }
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {filteredServices.slice(0, 4).map(service => {
            const Icon = iconComponents[service.icon];
            return (
              <Card
                key={service.id}
                className="group h-full bg-card/70 transition-all duration-300 hover:bg-primary/90 hover:text-primary-foreground"
              >
                <CardHeader>
                  {Icon && (
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted transition-colors duration-300 group-hover:bg-primary/80">
                      <Icon className="h-8 w-8 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                    </div>
                  )}
                  <CardTitle className="font-headline text-xl">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground transition-colors duration-300 group-hover:text-primary-foreground/80">
                    {service.description}
                  </p>
                  <Link
                    href={`/services#${service.id}`}
                    className="mt-4 inline-flex items-center font-semibold text-primary transition-colors duration-300 group-hover:text-primary-foreground"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
