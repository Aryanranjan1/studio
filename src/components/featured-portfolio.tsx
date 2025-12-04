import { getProjects } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function FeaturedPortfolio() {
  const featuredProjects = getProjects().slice(0, 2);

  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge
            variant="outline"
            className="mb-4 border-primary/50 text-primary"
          >
            Our Work
          </Badge>
          <h2 className="font-headline text-3xl font-bold sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A glimpse into the digital experiences we’ve crafted.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {featuredProjects.map(project => (
            <Link
              href={`/portfolio/${project.id}`}
              key={project.id}
              className="group"
            >
              <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-primary/10">
                <div className="relative h-80 w-full">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <Badge variant="secondary">{project.category}</Badge>
                    <h3 className="mt-2 font-headline text-2xl font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/50 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button asChild size="lg">
            <Link href="/portfolio">
              View All Projects <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
