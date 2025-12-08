

import { getProjects } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const projects = getProjects();
  const project = projects.find((p) => p.id === params.id);
  const otherProjects = projects.filter(p => p.id !== params.id).slice(0, 2);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 py-12 text-white sm:px-6 lg:px-8">
            <Badge variant="secondary" className="bg-accent/80 text-accent-foreground backdrop-blur-sm">
              {project.category}
            </Badge>
            <h1 className="mt-4 font-headline text-4xl font-bold md:text-5xl lg:text-6xl">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Project Intro */}
            <section>
              <h2 className="font-headline text-3xl font-bold">Introduction</h2>
              <div className="mt-6 space-y-6 text-lg text-muted-foreground">
                <p>{project.longDescription}</p>
              </div>
            </section>

            {/* Before/After or Gallery */}
            <section className="mt-16">
              <h2 className="font-headline text-3xl font-bold">Gallery</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {project.images?.map((img, index) => (
                  <div key={index} className="relative h-80 w-full overflow-hidden rounded-lg">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </section>
            
            {/* Testimonial */}
             {project.testimonial && (
              <section className="mt-16">
                <Card className="border-accent bg-accent/10">
                  <CardContent className="p-8">
                    <blockquote className="text-xl italic text-foreground">
                      &ldquo;{project.testimonial.quote}&rdquo;
                    </blockquote>
                    <footer className="mt-6">
                      <p className="font-bold">{project.testimonial.name}</p>
                      <p className="text-muted-foreground">
                        {project.testimonial.role}, {project.testimonial.company}
                      </p>
                    </footer>
                  </CardContent>
                </Card>
              </section>
            )}

          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Client</span>
                        <span className="font-semibold">{project.client}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Role</span>
                        <span className="font-semibold">{project.role}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-semibold">{project.duration}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Category</span>
                        <span className="font-semibold">{project.category}</span>
                    </div>
                    {project.url && (
                        <Button asChild className="w-full mt-4">
                            <a href={project.url} target="_blank" rel="noopener noreferrer">
                                Visit Website <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Technologies</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </CardContent>
              </Card>

               <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Key Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {project.kpis.map((kpi, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <CheckCircle className="h-6 w-6 text-primary" />
                            <div>
                                <p className="font-bold text-lg">{kpi.value}</p>
                                <p className="text-muted-foreground text-sm">{kpi.label}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
              </Card>

            </div>
          </aside>
        </div>

        {/* Other Projects Section */}
        <section className="mt-24 border-t border-border pt-16">
          <h2 className="text-center font-headline text-3xl font-bold">
            Other Projects
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {otherProjects.map((otherProject) => (
              <Link href={`/portfolio/${otherProject.id}`} key={otherProject.id} className="group">
                <Card className="h-full overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-primary/10">
                  <div className="relative h-64 w-full">
                    <Image
                      src={otherProject.image}
                      alt={otherProject.imageAlt}
                      fill
                      loading="lazy"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-6">
                      <div>
                        <Badge variant="secondary">{otherProject.category}</Badge>
                        <h3 className="mt-2 font-headline text-2xl font-bold text-white group-hover:text-primary">
                          {otherProject.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
