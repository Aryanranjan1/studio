
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { getProjects } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function PortfolioPage() {
  const projects = getProjects();

  return (
    <div className="w-full bg-background text-foreground">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-px border-l border-r border-neutral-800 bg-neutral-800">
          <div className="col-span-12 bg-black">
            {/* Hero Section */}
            <section className="text-center py-12">
              <Badge
                variant="outline"
                className="border-primary/50 text-primary"
              >
                Our Work
              </Badge>
              <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Digital Experiences, Masterfully Crafted
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Explore a selection of our projects that have helped businesses
                transform their digital presence.
              </p>
            </section>
          </div>

          <div className="col-span-12 bg-black">
            {/* Projects Grid */}
            <section className="py-12">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {projects.map((project) => (
                  <Link
                    href={`/portfolio/${project.id}`}
                    key={project.id}
                    className="group"
                  >
                    <Card className="overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/10">
                      <div className="relative h-80 w-full">
                        <Image
                          src={project.image}
                          alt={project.imageAlt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6">
                          <Badge
                            variant="secondary"
                            className="bg-accent/80 text-accent-foreground backdrop-blur-sm"
                          >
                            {project.category}
                          </Badge>
                          <h2 className="mt-2 font-headline text-2xl font-bold text-white">
                            {project.title}
                          </h2>
                        </div>
                        <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/50 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
