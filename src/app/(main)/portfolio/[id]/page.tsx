

'use client';

import { getProjects, getTemplates } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import type { Project, Template } from '@/lib/data';
import './page.css';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, ShoppingCart } from 'lucide-react';

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [otherProjects, setOtherProjects] = useState<Project[]>([]);
  const [matchingTemplate, setMatchingTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const allProjects = getProjects();
    const currentProject = allProjects.find(p => p.id === id);

    if (currentProject) {
      setProject(currentProject);
      document.title = `Ampire // ${currentProject.title}`;
      
      setOtherProjects(
        allProjects.filter(p => p.id !== currentProject.id).slice(0, 2)
      );

      const allTemplates = getTemplates();
      const template = allTemplates.find(t => t.id === `template-${currentProject.id}`);
      setMatchingTemplate(template || null);


    } else {
      notFound();
    }
    setLoading(false);
  }, [id]);


  if (loading || !project) {
    return (
      <div className="w-full min-h-screen bg-bg-color text-text-color flex items-center justify-center">
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

      <div className='mt-[60px] bg-black text-white'>
        <header className="project-hero">
            <div className="hero-content">
                <div className="hero-meta">
                    <span>{project.category?.toUpperCase()} // {project.technologies.join(' / ').toUpperCase()}</span>
                </div>
                <h1 className="project-title">{project.title}</h1>
                 <p className="project-subtitle">{project.description}</p>
                 <div className="flex flex-wrap gap-4 mt-8">
                    <Button asChild size="lg" className="rounded-none">
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                            View Live Project <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                    </Button>
                    {matchingTemplate && (
                       <Button asChild size="lg" variant="secondary" className="rounded-none">
                            <Link href={`/store/${matchingTemplate.id}`}>
                                Go to Store <ShoppingCart className="ml-2 h-5 w-5" />
                            </Link>
                       </Button>
                    )}
                 </div>
            </div>
            <div className="hero-image-wrapper">
                 <Image src={project.image} alt={project.imageAlt} fill className="hero-image" priority/>
            </div>
        </header>

        <div className="project-body-grid">
            <div className="main-content">
                <h2 className="section-title">About the Project</h2>
                <p className="project-long-description">
                    {project.longDescription}
                </p>

                <h2 className="section-title">Key Features</h2>
                <ul className="features-list">
                    {project.features.map((feature, index) => (
                        <li key={index}><Check className="text-primary h-5 w-5" /> {feature}</li>
                    ))}
                </ul>
            </div>
            <aside className="sidebar-specs">
                <div className="specs-card">
                    <h3 className="specs-title">Tech Stack</h3>
                    <div className="specs-grid">
                        {Object.entries(project.specs).map(([key, value]) => (
                            <div className="spec-item" key={key}>
                                <span className="spec-key">{key.toUpperCase()}</span>
                                <span className="spec-value">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
        
        {project.images && project.images.length > 0 && (
            <section className="gallery-section">
                <h2 className="section-title text-center">Project Gallery</h2>
                <div className="gallery-grid">
                    {project.images.map((img, index) => (
                        <div key={index} className="gallery-item">
                           <Image src={img.src} alt={img.alt} width={1200} height={800} className="gallery-image" loading="lazy" />
                           <div className="gallery-caption">{img.alt}</div>
                        </div>
                    ))}
                </div>
            </section>
        )}
        
        {/* Recommendation Section */}
        {otherProjects.length > 0 && (
            <section className="recommendation-section">
                <h2 className="rec-title">Other Projects</h2>
                <div className="rec-grid">
                    {otherProjects.map(rec => (
                        <Link href={`/portfolio/${rec.id}`} key={rec.id} className="project-card">
                            <div className="art-img-wrapper">
                                <Image src={rec.image} alt={rec.imageAlt} width={500} height={300} className="art-img" loading="lazy" />
                            </div>
                            <div className="art-body">
                                <h3 className="art-title">{rec.title}</h3>
                                <div className="art-footer">VIEW_PROJECT &rarr;</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        )}
        
        <Footer />
      </div>
    </>
  );
}
