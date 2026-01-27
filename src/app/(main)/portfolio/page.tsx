
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import type { PortfolioProject } from '@/lib/data';
import './page.css';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PricingSection } from '@/components/pricing-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { CtaSection } from '@/components/cta-section';
import { usePublicProjects } from '@/hooks/use-projects';

const ITEMS_PER_PAGE = 9;

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: projects, isLoading: loading } = usePublicProjects();

  useEffect(() => {
    document.title = 'Ampire Studio // Work';
  }, []);

  const categories = useMemo(() => {
    if (!projects) return ['All'];
    const all = ['All'];
    const unique = [
      ...new Set(projects.map(p => p.category || 'Uncategorized')),
    ];
    return [...all, ...unique.filter(c => c !== 'All')];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return projects.filter(
      project =>
        activeCategory === 'All' || project.category === activeCategory
    );
  }, [projects, activeCategory]);
  
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page on filter change
  };


  if (loading) {
    return <div className="bg-background text-foreground min-h-screen flex items-center justify-center">Loading Projects...</div>;
  }
  
  return (
    <div className='bg-background text-foreground'>
      <header className="portfolio-header">
        <div className="header-meta">
          <span>// OUR WORK</span>
          <span>PROJECTS: {projects?.length || 0}</span>
        </div>
        <h1 className="portfolio-title">
          Selected
          <br />
          Works.
        </h1>
      </header>

      <nav className="controls-bar">
        <div className="categories">
            {categories.map(cat => (
                <button 
                    key={cat} 
                    className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(cat)}
                >
                    {cat.toUpperCase()}
                </button>
            ))}
        </div>
      </nav>

      <section className="portfolio-grid">
        {paginatedProjects.map(project => (
          <div className="project-card group" key={project.id}>
            <div className="art-img-wrapper">
                <Link href={`/portfolio/${project.slug}`} className="block h-full w-full">
                    <Image
                        src={project.cardImage.url}
                        alt={project.cardImage.alt}
                        fill
                        className="art-img"
                        loading="lazy"
                    />
                </Link>
                <Badge variant="secondary" className="absolute top-4 left-4 z-10">{project.category}</Badge>
                {project.projectUrl && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black backdrop-blur-sm pointer-events-auto">
                            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                View
                            </a>
                        </Button>
                    </div>
                )}
            </div>
            <div className="art-body">
                <div className="art-meta">
                    <span>{project.technologies.slice(0,2).join(' / ')}</span>
                </div>
                <Link href={`/portfolio/${project.slug}`}>
                    <h3 className="art-title">{project.title}</h3>
                </Link>
                <p className="art-desc">{project.summary}</p>
                <Link href={`/portfolio/${project.slug}`} className="art-footer">
                    VIEW_PROJECT &rarr;
                </Link>
            </div>
          </div>
        ))}
      </section>
      
       {totalPages > 1 && (
        <div className="pagination-controls">
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            variant="outline"
            className="pagination-btn"
          >
            &larr; PREVIOUS
          </Button>
          <span className="pagination-status">
            PAGE {currentPage} OF {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            variant="outline"
            className="pagination-btn"
          >
            NEXT &rarr;
          </Button>
        </div>
      )}

      <PricingSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
