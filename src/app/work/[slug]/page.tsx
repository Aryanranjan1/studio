
"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getProjectBySlug } from '@/lib/data';
import type { Project } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import { PageTitleHeader } from '@/components/page-title-header';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { PortfolioSection } from '@/components/portfolio-section';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const projectData = await getProjectBySlug(slug);
        setProject(projectData);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  if (loading) {
    return (
        <div className="flex min-h-screen flex-col bg-transparent text-foreground">
            <Header />
            <main className="flex-1">
                <div className="container py-24 sm:py-32">
                    <Skeleton className="h-10 w-3/4 mx-auto" />
                    <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
                    <Skeleton className="h-96 w-full mt-12 rounded-lg" />
                    <div className="mt-12 space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
  }

  if (!project) {
    return (
        <div className="flex min-h-screen flex-col bg-transparent text-foreground">
            <Header />
            <main className="flex-1">
                <PageTitleHeader 
                    title="Project Not Found"
                    subtitle="Sorry, we couldn't find the project you're looking for."
                />
            </main>
            <Footer />
        </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <Header />
      <main className="flex-1">
        <PageTitleHeader 
            title={project.title}
            subtitle="A detailed look into our process and solution."
        />
        <div className="container py-16 sm:py-24">
            <article className="prose prose-invert mx-auto max-w-4xl">
                <div className="relative mb-12 w-full h-[500px] rounded-lg overflow-hidden shadow-2xl">
                    <Image 
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="flex items-center gap-4 mb-8">
                    <span className='font-semibold'>Services:</span>
                    <div className="flex flex-wrap gap-2">
                        {project.services.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                    </div>
                </div>

                <p className="text-lg text-foreground/80 whitespace-pre-line">
                    {project.longDescription}
                </p>
            </article>
        </div>

        <PortfolioSection className="bg-alt" />
      </main>
      <Footer />
    </div>
  );
}
