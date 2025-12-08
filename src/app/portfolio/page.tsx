
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

const clientLogos = [
    { src: 'https://tailwindui.com/img/logos/158x48/reform-logo-white.svg', alt: 'Reform' },
    { src: 'https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg', alt: 'SavvyCal' },
    { src: 'https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg', alt: 'Statamic' },
    { src: 'https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg', alt: 'Transistor' },
];

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
              <div className="flex flex-col gap-4 max-w-md">
                <p className="text-neutral-400">
                    We build digital experiences that stay clear, fast, and focused on delivering real value for your business and your users.
                </p>
                <div className="flex flex-wrap gap-2">
                    {projectCategories.map(cat => (
                        <Badge key={cat} variant="outline" className="text-sm">{cat}</Badge>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Client Logos */}
            <div className="col-span-12 bg-black py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
                        {clientLogos.map((logo) => (
                            <div key={logo.alt} className="flex justify-center">
                                <Image
                                    className="max-h-12 w-full object-contain"
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={158}
                                    height={48}
                                />
                            </div>
                        ))}
                    </div>
                </div>
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
