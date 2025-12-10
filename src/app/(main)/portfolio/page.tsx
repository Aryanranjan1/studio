
'use client';

import { getProjects } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { MoveRight, Search } from 'lucide-react';
import { Footer } from '@/components/footer';
import { CtaSection } from '@/components/cta-section';
import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Project } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import './page.css';

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Portfolio — Ampire Studio';
    const allProjects = getProjects();
    setProjects(allProjects);
    setLoading(false);
  }, []);

  const allCategories = useMemo(() => {
    if (projects.length === 0) return [];
    return ['All', ...new Set(projects.map(p => p.category))];
  }, [projects]);

  const featuredProject = useMemo(() => {
    if (projects.length === 0) return null;
    const featured = projects.find(p => p.featured);
    return featured || projects[0];
  }, [projects]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  
  const ITEMS_PER_PAGE = 9;

  const filteredProjects = useMemo(() => {
    return projects
      .filter(project => {
        const term = searchTerm.toLowerCase();
        const isFeatured = project.id === featuredProject?.id;
        if(isFeatured) return false;

        const categoryMatch =
          selectedCategories.includes('All') ||
          selectedCategories.some(cat => project.category === cat);
        
        const searchMatch =
          project.title.toLowerCase().includes(term) ||
          project.description.toLowerCase().includes(term) ||
          project.technologies.some(tech => tech.toLowerCase().includes(term));
        
        return categoryMatch && searchMatch;
      });
  }, [projects, searchTerm, selectedCategories, featuredProject]);


  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleCategoryToggle = (category: string) => {
    setCurrentPage(1); // Reset page on filter change
    if (category === 'All') {
      setSelectedCategories(['All']);
    } else {
       setSelectedCategories(prev => {
        const newCats = prev.filter(c => c !== 'All');
        if (newCats.includes(category)) {
          const remaining = newCats.filter(c => c !== category);
          return remaining.length > 0 ? remaining : ['All'];
        } else {
          return [...newCats, category];
        }
      });
    }
  };


  return (
    <div className="portfolio-page">
      <header className="portfolio-header">
        <div className="header-meta">
            <span>// SELECTED WORKS</span>
            <span>TOTAL: {projects.length}</span>
        </div>
        <h1 className="portfolio-title">Case<br/>Studies.</h1>
      </header>

      {/* Featured Project Section */}
      {loading ? (
        <div className="p-4 md:p-8">
            <Skeleton className="h-[500px] w-full" />
        </div>
      ) : featuredProject && (
        <section className="featured-project-section">
            <Link href={`/portfolio/${featuredProject.id}`} className="featured-project group">
                <div className="featured-img-wrapper">
                    <Image
                    src={featuredProject.image}
                    alt={featuredProject.imageAlt}
                    fill
                    className="featured-img"
                    priority
                    />
                </div>
                <div className="featured-content">
                    <span className="meta-tag">FEATURED // {featuredProject.category.toUpperCase()}</span>
                    <h2 className="featured-title">{featuredProject.title}</h2>
                    <p className="featured-excerpt">{featuredProject.description}</p>
                    <div className="read-btn">
                        ACCESS FILE &rarr;
                    </div>
                </div>
            </Link>
        </section>
      )}

      {/* Search and Filter Section */}
      <nav className="controls-bar">
        <div className="categories">
          {allCategories.map(category => (
            <button
              key={category}
              className={`cat-btn ${selectedCategories.includes(category) ? 'active' : ''}`}
              onClick={() => handleCategoryToggle(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="search-wrapper">
          <Search className="h-4 w-4 text-neutral-500"/>
          <Input
            type="search"
            placeholder="Search..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search projects"
          />
        </div>
      </nav>

      <div className="portfolio-grid">
        {loading ? (
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <div key={index} className="project-card-skeleton">
                    <Skeleton className="h-60 w-full" />
                    <div className="p-6">
                        <Skeleton className="h-6 w-3/4 mb-4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6 mt-2" />
                    </div>
                </div>
            ))
        ) : (
            paginatedProjects.map((project, index) => (
            <Link href={`/portfolio/${project.id}`} key={project.id} className="project-card group">
                <div className="project-img-wrapper">
                <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className="project-img"
                    loading="lazy"
                />
                </div>
                <div className="project-body">
                <div className="project-meta">
                    <span className="project-category">{project.category}</span>
                    <span className="project-index">N&deg;{String(index + 1 + (currentPage - 1) * ITEMS_PER_PAGE).padStart(2, '0')}</span>
                </div>
                <h3 className="project-card-title">{project.title}</h3>
                 <div className="project-footer">
                    <span>VIEW CASE STUDY</span>
                    <MoveRight className="arrow-icon" />
                 </div>
                </div>
            </Link>
            ))
        )}
      </div>

      {/* Pagination Controls */}
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
      
      <div className="border-b border-neutral-800">
        <CtaSection />
      </div>

      <Footer />
    </div>
  );
}
