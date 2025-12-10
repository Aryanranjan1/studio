
import { getProjects } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, MoveRight } from 'lucide-react';
import type { Metadata } from 'next';
import '../page.css';
import { Footer } from '@/components/footer';

export function generateStaticParams() {
  const projects = getProjects();
  console.log('[generateStaticParams] Generating params for slugs:', projects.map(p => ({ slug: p.id })));
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = params;
    console.log(`[generateMetadata] Generating metadata for slug: "${slug}"`);
    const projects = getProjects();
    const project = projects.find((p) => p.id === slug);

    if (!project) {
        console.warn(`[generateMetadata] Project with slug "${slug}" not found.`);
        return {
            title: 'Project Not Found',
        };
    }
    
    console.log(`[generateMetadata] Found project: "${project.title}"`);

    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: [
                {
                    url: project.image,
                    width: 1200,
                    height: 630,
                    alt: project.imageAlt,
                },
            ],
        },
    };
}


export default async function ProjectDetailsPage(props: { params: { slug: string } }) {
  const { slug } = props.params;
  console.log(`[ProjectDetailsPage] Rendering page for slug: "${slug}"`);

  const projects = getProjects();
  const project = projects.find((p) => p.id === slug);
  
  if (!project) {
    console.error(`[ProjectDetailsPage] Project data not found for slug: "${slug}". Triggering 404.`);
    notFound();
  }

  const otherProjects = projects.filter(p => p.id !== slug).slice(0, 2);
  
  console.log(`[ProjectDetailsPage] Successfully found project: "${project.title}"`);

  return (
    <div className="project-detail-page">
        <nav className="project-nav">
            <Link href="/portfolio">&lt; CASE_STUDIES</Link>
            <span>ID: {project.id.toUpperCase()}</span>
        </nav>

        <header className="project-hero">
            <div className="hero-img-container">
                <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className="hero-img"
                    priority
                />
            </div>
            <div className="hero-content">
                <span className="hero-category">{project.category.toUpperCase()} // WORK_FILE</span>
                <h1 className="hero-title">{project.title}</h1>
            </div>
        </header>

        <main className="main-content-wrapper">
            {/* Main Content */}
            <div className="main-article">
                <section className="intro-section">
                    <h2 className="section-title">Introduction</h2>
                    <p className="intro-text">{project.longDescription}</p>
                </section>

                {project.testimonial && (
                <section className="testimonial-section">
                    <blockquote>
                    &ldquo;{project.testimonial.quote}&rdquo;
                    <cite>&mdash; {project.testimonial.name}, {project.testimonial.role}</cite>
                    </blockquote>
                </section>
                )}

                {project.images && project.images.length > 0 && (
                    <section className="gallery-section">
                        <h2 className="section-title">Gallery</h2>
                        <div className="gallery-grid">
                            {project.images.map((img, index) => (
                            <div key={index} className="gallery-item">
                                <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                loading="lazy"
                                className="gallery-image"
                                />
                                <div className="gallery-caption">{img.alt}</div>
                            </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Sidebar */}
            <aside className="sidebar-details">
                <div className="sidebar-sticky-content">
                    <div className="detail-card">
                        <h3 className="card-title">Project Details</h3>
                        <div className="detail-grid">
                            <div><span>Client</span><p>{project.client}</p></div>
                            <div><span>Role</span><p>{project.role}</p></div>
                            <div><span>Duration</span><p>{project.duration}</p></div>
                            <div><span>Category</span><p>{project.category}</p></div>
                        </div>
                        {project.url && (
                            <Button asChild className="w-full mt-6 rounded-none uppercase">
                                <a href={project.url} target="_blank" rel="noopener noreferrer">
                                    Visit Live Site <ArrowRight className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                        )}
                    </div>

                    <div className="detail-card">
                        <h3 className="card-title">Tech Stack</h3>
                        <div className="tech-tags">
                        {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="tag">{tech}</Badge>
                        ))}
                        </div>
                    </div>

                    <div className="detail-card">
                        <h3 className="card-title">Key Results</h3>
                        <div className="kpi-list">
                            {project.kpis.map((kpi, index) => (
                                <div key={index} className="kpi-item">
                                    <CheckCircle className="kpi-icon" />
                                    <div>
                                        <p className="kpi-value">{kpi.value}</p>
                                        <p className="kpi-label">{kpi.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        </main>
        
        {/* Other Projects Section */}
        <section className="other-projects-section">
          <h2 className="section-title text-center">Other Case Studies</h2>
          <div className="other-projects-grid">
            {otherProjects.map((otherProject) => (
              <Link href={`/portfolio/${otherProject.id}`} key={otherProject.id} className="project-card-link">
                <div className="project-card-img-wrapper">
                    <Image
                      src={otherProject.image}
                      alt={otherProject.imageAlt}
                      fill
                      loading="lazy"
                      className="project-card-img"
                    />
                </div>
                <div className="project-card-body">
                    <div className="project-card-meta">
                        <span className="project-card-category">{otherProject.category}</span>
                    </div>
                    <h3 className="project-card-title">{otherProject.title}</h3>
                    <div className="project-card-footer">
                        <span>VIEW CASE STUDY</span>
                        <MoveRight className="arrow-icon" />
                    </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <Footer />
    </div>
  );
}
