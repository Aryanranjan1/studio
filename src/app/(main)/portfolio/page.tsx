
'use client';

import { getProjects } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { MoveRight, Search } from 'lucide-react';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { CtaSection } from '@/components/cta-section';
import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Project } from '@/lib/data';
import { Card } from '@/components/ui/card';
import useMeasure from 'react-use-measure';
import { Skeleton } from '@/components/ui/skeleton';

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Portfolio — Ampire Studio";
  }, []);

  const allCategories = useMemo(() => {
    if (projects.length === 0) return [];
    return ['All', ...new Set(projects.map(p => p.category))];
  }, [projects]);
  

  const [featuredProject, setFeaturedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  
  const [ref, { width }] = useMeasure();
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    const allProjects = getProjects();
    setProjects(allProjects);

    const featured = allProjects.filter(p => p.featured);
    if (featured.length > 0) {
      const randomProject = featured[Math.floor(Math.random() * featured.length)];
      setFeaturedProject(randomProject);
    }
    setLoading(false);
  }, []);
  
  useEffect(() => {
    if (width > 0) {
      if (width < 768) {
        setItemsPerPage(6);
      } else if (width < 1024) {
        setItemsPerPage(8);
      } else {
        setItemsPerPage(12);
      }
    }
  }, [width]);


  const filteredProjects = useMemo(() => {
    return projects
      .filter(project => {
        const term = searchTerm.toLowerCase();
        const categoryMatch =
          selectedCategories.includes('All') ||
          selectedCategories.some(cat => project.tags.includes(cat) || project.category === cat);
        const searchMatch =
          project.title.toLowerCase().includes(term) ||
          project.description.toLowerCase().includes(term) ||
          project.technologies.some(tech => tech.toLowerCase().includes(term));
        return categoryMatch && searchMatch;
      });
  }, [projects, searchTerm, selectedCategories]);


  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleCategoryToggle = (category: string) => {
    if (category === 'All') {
      setSelectedCategories(['All']);
    } else {
      setSelectedCategories(prev => {
        const newCats = prev.filter(c => c !== 'All');
        if (newCats.includes(category)) {
          // If it's already there, remove it. If it's the last one, default to 'All'.
          const remaining = newCats.filter(c => c !== category);
          return remaining.length > 0 ? remaining : ['All'];
        } else {
          // If it's not there, add it.
          return [...newCats, category];
        }
      });
    }
    setCurrentPage(1); // Reset to first page on filter change
  };


  return (
    <div className="w-full bg-black text-white min-h-screen">
      <main ref={ref}>
        <div className="grid grid-cols-12 gap-px border-l border-r border-neutral-800 bg-black">
          
          {/* Hero Header */}
          <div className="col-span-12 bg-black p-8 border-b border-neutral-800">
             <div className="flex flex-col md:flex-row justify-between md:items-end gap-8">
              <h1 className="font-headline text-7xl md:text-9xl font-bold">Portfolio</h1>
               <div className='max-w-md'>
                <p className="mt-4 md:mt-0 text-neutral-400">
                  We build digital experiences that stay clear, fast, and focused on delivering real value for your business and your users.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary">Web Development</Badge>
                    <Badge variant="secondary">Branding</Badge>
                    <Badge variant="secondary">Automation</Badge>
                    <Badge variant="secondary">Mobile App</Badge>
                </div>
              </div>
            </div>
          </div>
          
          {/* Featured Project Section */}
          <div className="col-span-12 bg-black p-8">
            {loading ? (
                <Card className="grid grid-cols-1 overflow-hidden md:grid-cols-2 bg-card/50 backdrop-blur-lg">
                    <Skeleton className="h-80 w-full md:h-auto lg:min-h-[480px]" />
                    <div className="flex flex-col p-8 lg:p-12 justify-center">
                        <Skeleton className="h-6 w-32 mb-4" />
                        <Skeleton className="h-10 w-3/4 mb-4" />
                        <Skeleton className="h-5 w-full mb-2" />
                        <Skeleton className="h-5 w-5/6" />
                        <div className="mt-auto pt-4">
                           <Skeleton className="h-6 w-40" />
                        </div>
                    </div>
                </Card>
            ) : featuredProject && (
              <Link href={`/portfolio/${featuredProject.id}`} className="group block">
                <Card className="grid grid-cols-1 overflow-hidden md:grid-cols-2 bg-card/50 backdrop-blur-lg">
                  <div className="relative h-80 w-full md:h-auto lg:min-h-[480px]">
                    <Image
                      src={featuredProject.image}
                      alt={featuredProject.imageAlt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-primary/20" />
                  </div>
                  <div className="flex flex-col p-8 lg:p-12 justify-center">
                    <Badge variant="outline" className="w-fit border-primary/50 text-primary">
                      Featured Project
                    </Badge>
                    <h2 className="mt-4 font-headline text-3xl lg:text-4xl font-bold group-hover:text-primary">
                      {featuredProject.title}
                    </h2>
                    <p className="mt-4 text-muted-foreground lg:text-lg">{featuredProject.description}</p>
                    <div className="mt-auto pt-4">
                      <p className="font-semibold text-primary flex items-center">
                        View Project <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            )}
          </div>


            {/* Search and Filter Section */}
            <div className="col-span-12 bg-black p-8">
                <div className="relative mt-4 max-w-4xl mx-auto">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search projects — Next.js, Figma, Automation..."
                    className="h-14 w-full rounded-lg border-border bg-card/50 pl-12 text-base focus-visible:ring-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search projects"
                  />
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {allCategories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategories.includes(category) ? 'default' : 'secondary'}
                      className="rounded-full"
                      onClick={() => handleCategoryToggle(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
            </div>


          {/* Projects Grid */}
            <div className="col-span-12 bg-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-800 border-t border-b border-neutral-800">
             {loading ? (
                Array.from({ length: itemsPerPage }).map((_, index) => (
                  <div key={index} className="bg-black p-8">
                    <Skeleton className="h-80 w-full rounded-lg" />
                    <div className="mt-6">
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                      <Skeleton className="mt-4 h-4 w-full" />
                      <Skeleton className="mt-2 h-4 w-5/6" />
                      <div className="mt-4">
                        <Skeleton className="h-6 w-24" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                paginatedProjects.map((project) => (
                  <Link
                    href={`/portfolio/${project.id}`}
                    key={project.id}
                    className="group relative block overflow-hidden bg-black p-8"
                  >
                    <div className="relative h-80 w-full rounded-lg overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint="website screenshot"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/30"></div>
                    </div>
                    <div className="mt-6">
                      <div className="flex justify-between items-center">
                          <h3 className="font-headline text-3xl font-bold">{project.title}</h3>
                          <MoveRight className="h-8 w-8 text-neutral-500 transition-transform group-hover:translate-x-2 group-hover:text-primary" />
                      </div>
                      <p className="mt-2 text-neutral-400">{project.description}</p>
                       <div className="mt-4">
                          <Badge variant="secondary">{project.category}</Badge>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="col-span-12 bg-black p-8 flex justify-center items-center gap-4">
                    <Button 
                        onClick={handlePrevPage} 
                        disabled={currentPage === 1}
                        variant="outline"
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-neutral-400">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button 
                        onClick={handleNextPage} 
                        disabled={currentPage === totalPages}
                        variant="outline"
                    >
                        Next
                    </Button>
                </div>
            )}
          
          <div className="col-span-12 bg-black border-b border-neutral-800">
            <CtaSection />
          </div>

           <div className="col-span-12 bg-black">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
