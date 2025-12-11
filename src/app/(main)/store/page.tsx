
'use client';

import { getTemplates } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import type { Template } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PricingSection } from '@/components/pricing-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { CtaSection } from '@/components/cta-section';
import { Footer } from '@/components/footer';

const ITEMS_PER_PAGE = 9;

export default function StorePage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = "Ampire Assets // Store";
    const data = getTemplates();
    setTemplates(data);
    setLoading(false);
  }, []);
  
  const filteredTemplates = useMemo(() => {
    if (activeFilter === 'all') {
      return templates;
    }
    return templates.filter(t => t.specs.type.toLowerCase() === activeFilter);
  }, [templates, activeFilter]);

  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);

  const paginatedTemplates = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTemplates.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTemplates, currentPage]);

  const categories = useMemo(() => {
    if (templates.length === 0) return [];
    const uniqueCategories = ['all', ...new Set(templates.map(t => t.specs.type.toLowerCase()))];
    // Manually add 'blog' if it's not present, as it was in the user's example
    if (!uniqueCategories.includes('blog')) {
      uniqueCategories.push('blog');
    }
    return uniqueCategories;
  }, [templates]);

  const handleFilterClick = (category: string) => {
    setActiveFilter(category);
    setCurrentPage(1);
  };
  
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };


  if (loading) {
    return (
        <div className="w-full bg-black text-white min-h-screen flex items-center justify-center">
            <p>Loading Store...</p>
        </div>
    )
  }

  return (
    <div className="w-full bg-[#050505] text-white font-tech">
      <main>
        <header className="px-5 md:px-10 py-16 md:py-28 border-b border-white/20 relative">
            <div className="text-xs text-[#888] mb-5 tracking-wider flex gap-5">
                <span><span className="inline-block w-2 h-2 bg-primary rounded-full mr-2 shadow-[0_0_10px_var(--primary-DEFAULT-hsl))]"></span>SYSTEM ONLINE</span>
                <span>// DIGITAL ASSETS // V.2.0</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold uppercase leading-none tracking-tight">Template<br/>Store.</h1>
        </header>

        <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/20 flex justify-between items-center h-16 px-5 md:px-10">
            <div className="flex h-full overflow-x-auto whitespace-nowrap scrollbar-hide">
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => handleFilterClick(cat)}
                        className={cn(
                            "bg-transparent border-r border-white/20 text-[#888] font-tech text-sm px-4 md:px-8 h-full uppercase transition-all duration-200 hover:text-white hover:bg-white/5 flex-shrink-0",
                            activeFilter === cat && "text-black bg-white font-bold"
                        )}
                    >
                       [ {cat === 'all' ? 'ALL_ASSETS' : cat} ]
                    </button>
                ))}
            </div>
        </nav>
        
        <section className="grid grid-cols-2 lg:grid-cols-3 w-full">
            {paginatedTemplates.map((template) => (
              <div key={template.id} className="group product-card block border-b border-r border-white/20">
                <div className="relative">
                    {template.bestSeller && <div className="absolute top-2 left-2 z-10 bg-black border border-white text-white px-2 py-0.5 text-[10px] md:top-4 md:left-4 md:px-2.5 md:py-1 md:text-xs">BEST SELLER</div>}
                    {template.isNew && <div className="absolute top-2 left-2 z-10 bg-black border border-white text-white px-2 py-0.5 text-[10px] md:top-4 md:left-4 md:px-2.5 md:py-1 md:text-xs">NEW</div>}
                    <div className="h-48 md:h-72 overflow-hidden relative border-b border-white/20">
                        <Image
                            src={template.image}
                            alt={template.imageAlt}
                            fill
                            className="w-full h-full object-cover grayscale transition-all duration-500 ease-in-out group-hover:grayscale-0 group-hover:scale-105"
                        />
                    </div>
                </div>
                <div className="p-4 md:p-8 flex flex-col justify-between flex-grow">
                    <div>
                        <div className="flex justify-between items-start mb-3 md:mb-5">
                            <div>
                                <h3 className="font-display text-lg md:text-2xl font-bold uppercase">{template.title}</h3>
                            </div>
                            <span className="text-base md:text-xl font-bold">${template.price}</span>
                        </div>
                        <p className="text-xs md:text-sm text-[#888] leading-relaxed mb-4 md:mb-8 max-w-[90%] line-clamp-2 md:line-clamp-none">{template.description}</p>
                        
                        <div className="hidden md:grid grid-cols-2 gap-x-4 gap-y-2 mb-8 text-xs text-[#666] border-t border-[#222] pt-4">
                            <div className="spec-item">STACK: <span className="text-white">{template.specs.stack}</span></div>
                            <div className="spec-item">CSS: <span className="text-white">{template.specs.css}</span></div>
                            <div className="spec-item">CMS: <span className="text-white">{template.specs.cms}</span></div>
                            <div className="spec-item">TYPE: <span className="text-white">{template.specs.type}</span></div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-2 mt-auto">
                         <Button asChild className="w-full uppercase rounded-none flex items-center justify-center gap-2 text-xs md:text-sm h-10 md:h-auto">
                           <a href={template.url} target="_blank" rel="noopener noreferrer">
                            Buy Now <ArrowRight className="w-4 h-4 hidden md:inline-block" />
                           </a>
                        </Button>
                    </div>
                </div>
              </div>
            ))}
        </section>

        {totalPages > 1 && (
            <div className="col-span-12 bg-black p-8 flex justify-center items-center gap-4 border-b border-white/20">
                <Button 
                    onClick={handlePrevPage} 
                    disabled={currentPage === 1}
                    variant="outline"
                    className="rounded-none"
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
                    className="rounded-none"
                >
                    Next
                </Button>
            </div>
        )}

        <PricingSection />
        <TestimonialsSection />
        <CtaSection />
        <Footer />
      </main>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
