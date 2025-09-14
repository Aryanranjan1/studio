
"use client";

import Image from 'next/image';
import { getProjectBySlug } from '@/lib/data';
import type { Project } from '@/lib/data';
import { PageTitleHeader } from '@/components/page-title-header';
import { Footer } from '@/components/footer';

import { Badge } from '@/components/ui/badge';
import { PortfolioSection } from '@/components/portfolio-section';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
        <div className="flex min-h-screen flex-col bg-transparent text-foreground">
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
