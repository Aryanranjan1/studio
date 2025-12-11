
'use client';

import { getProjects } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import type { Project } from '@/lib/data';
import './page.css';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PricingSection } from '@/components/pricing-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { CtaSection } from '@/components/cta-section';

const ITEMS_PER_PAGE = 9;

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = 'Ampire Studio // Work';
    const data = getProjects();
    setProjects(data);
    setLoading(false);
  }, []);

  const categories = useMemo(() => {
    const all = ['All'];
    const unique = [
      ...new Set(projects.map(p => p.category || 'Uncategorized')),
    ];
    return [...all, ...unique.filter(c => c !== 'All')];
  }, [projects]);

  const filteredProjects = useMemo(() => {
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
    return <div className="bg-bg-color text-text-color min-h-screen flex items-center justify-center">Loading Projects...</div>;
  }
  
  return (
    <>
      <header className="portfolio-header">
        <div className="header-meta">
          <span>// OUR WORK</span>
          <span>PROJECTS: {projects.length}</span>
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
          <Link href={`/portfolio/${project.id}`} className="project-card" key={project.id}>
            <div className="art-img-wrapper">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                className="art-img"
                loading="lazy"
              />
               <Badge variant="secondary" className="absolute top-4 left-4 z-10">{project.category}</Badge>
            </div>
            <div className="art-body">
              <div className="art-meta">
                <span>{project.technologies.slice(0,2).join(' / ')}</span>
              </div>
              <h3 className="art-title">{project.title}</h3>
              <p className="art-desc">{project.description}</p>
              <div className="art-footer">VIEW_PROJECT &rarr;</div>
            </div>
          </Link>
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
    </>
  );
}
