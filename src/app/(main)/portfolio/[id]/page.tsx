
'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import type { PortfolioProject, Template } from '@/lib/data';
import './page.css';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { usePublicTemplates } from '@/hooks/use-templates';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.id as string;
  const firestore = useFirestore();

  const projectQuery = useMemoFirebase(() => {
    if (!firestore || !slug) return null;
    return query(
      collection(firestore, 'projects'),
      where('slug', '==', slug),
      where('published', '==', true),
      limit(1)
    );
  }, [firestore, slug]);

  const { data: projects, isLoading: projectLoading, error } = useCollection<PortfolioProject>(projectQuery);
  const project = projects?.[0];

  const { data: allTemplates } = usePublicTemplates();
  const [matchingTemplate, setMatchingTemplate] = useState<Template | null>(null);

  useEffect(() => {
    if (project && allTemplates) {
      document.title = `Ampire // ${project.title}`;
      const template = allTemplates.find(t => t.slug === project.slug);
      setMatchingTemplate(template || null);
    }
  }, [project, allTemplates]);

  useEffect(() => {
    if ((!projectLoading && !project) || error) {
      notFound();
    }
  }, [project, projectLoading, error]);

  if (projectLoading || !project) {
    return (
      <div className="w-full min-h-screen bg-background text-foreground flex items-center justify-center">
        Loading Project Details...
      </div>
    );
  }

  return (
    <>
      <nav className="nav-bread">
        <Link href="/portfolio">&lt; BACK_TO_PROJECTS</Link>
        <span>PROJECT_ID: {project.id}</span>
      </nav>

      <div className='mt-[60px] bg-background text-foreground'>
        <header className="project-hero">
            <div className="hero-content">
                <div className="hero-meta">
                    <span>{project.category?.toUpperCase()} // {project.technologies.join(' / ').toUpperCase()}</span>
                </div>
                <h1 className="project-title">{project.title}</h1>
                 <p className="project-subtitle">{project.summary}</p>
                 <div className="flex flex-wrap gap-4 mt-8">
                    {project.projectUrl && (
                        <Button asChild size="lg" className="rounded-none">
                            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                                View Live Project <ArrowRight className="ml-2 h-5 w-5" />
                            </a>
                        </Button>
                    )}
                    {matchingTemplate && (
                       <Button asChild size="lg" variant="secondary" className="rounded-none">
                            <Link href={`/store/${matchingTemplate.slug}`}>
                                Go to Store <ShoppingCart className="ml-2 h-5 w-5" />
                            </Link>
                       </Button>
                    )}
                 </div>
            </div>
            <div className="hero-image-wrapper">
                 <Image src={project.featuredImage.url} alt={project.featuredImage.alt} fill className="hero-image" priority/>
            </div>
        </header>

        <div className="project-body-grid">
            <div className="main-content">
                <h2 className="section-title">About the Project</h2>
                <div className="project-long-description" dangerouslySetInnerHTML={{ __html: project.longDescription }} />
            </div>
            <aside className="sidebar-specs">
                <div className="specs-card">
                    <h3 className="specs-title">Project Info</h3>
                    <div className="specs-grid">
                        <div className="spec-item">
                            <span className="spec-key">CLIENT</span>
                            <span className="spec-value">{project.clientName || 'Internal'}</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-key">YEAR</span>
                            <span className="spec-value">{project.projectYear}</span>
                        </div>
                         <div className="spec-item">
                            <span className="spec-key">SERVICE</span>
                            <span className="spec-value">{project.category}</span>
                        </div>
                         <div className="spec-item">
                            <span className="spec-key">STACK</span>
                            <span className="spec-value">{project.technologies.join(', ')}</span>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
        
        {project.galleryImages && project.galleryImages.length > 0 && (
            <section className="gallery-section">
                <h2 className="section-title text-center">Project Gallery</h2>
                <div className="gallery-grid">
                    {project.galleryImages.map((img, index) => (
                        <div key={index} className="gallery-item">
                           <Image src={img.url} alt={img.alt} width={1200} height={800} className="gallery-image" loading="lazy" />
                           <div className="gallery-caption">{img.alt}</div>
                        </div>
                    ))}
                </div>
            </section>
        )}
        
        <Footer />
      </div>
    </>
  );
}
