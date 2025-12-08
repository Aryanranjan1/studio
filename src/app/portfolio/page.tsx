
'use client';

import { getProjects } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { CtaSection } from '@/components/cta-section';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FeaturedPortfolio } from '@/components/featured-portfolio';


const ITEMS_PER_PAGE = 6;


export default function PortfolioPage() {
  const projects = getProjects();
  const projectCategories = [...new Set(projects.map(p => p.category))];

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const paginatedProjects = projects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };


  return (
    <div className="w-full bg-black text-white min-h-screen">
      <main>
        <div className="grid grid-cols-12 gap-px border-l border-r border-neutral-800 bg-neutral-800">
          
          {/* Hero Header */}
          <div className="col-span-12 bg-black p-8 border-b border-neutral-800">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-8">
              <h1 className="font-headline text-7xl md:text-9xl font-bold">Portfolio</h1>
            </div>
          </div>

          {/* Featured Projects */}
            <div className="col-span-12 bg-black">
                <FeaturedPortfolio />
            </div>


          {/* Projects Grid */}
            <div className="col-span-12 bg-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-800 border-t border-b border-neutral-800">
              {paginatedProjects.map((project) => (
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
              ))}
            </div>

            {/* Pagination Controls */}
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
