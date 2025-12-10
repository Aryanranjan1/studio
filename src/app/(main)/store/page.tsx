
'use client';

import { getTemplates } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import type { Template } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function StorePage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [cartCount, setCartCount] = useState(0);

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

  const categories = useMemo(() => {
    if (templates.length === 0) return [];
    return ['all', ...new Set(templates.map(t => t.specs.type.toLowerCase()))];
  }, [templates]);


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
                <span><span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 shadow-[0_0_10px_#00ff00]"></span>SYSTEM ONLINE</span>
                <span>// DIGITAL ASSETS // V.2.0</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold uppercase leading-none tracking-tight">Template<br/>Store.</h1>
        </header>

        <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/20 flex justify-between items-center h-16 px-5 md:px-10">
            <div className="flex h-full">
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={cn(
                            "bg-transparent border-r border-white/20 text-[#888] font-tech text-sm px-4 md:px-8 h-full uppercase transition-all duration-200 hover:text-white hover:bg-white/5",
                            activeFilter === cat && "text-black bg-white font-bold"
                        )}
                    >
                       [ {cat === 'all' ? 'ALL_ASSETS' : cat} ]
                    </button>
                ))}
            </div>
            <div className="text-sm font-bold">
                <Link href="/cart">CART [{cartCount}]</Link>
            </div>
        </nav>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
            {filteredTemplates.map((template) => (
              <Link href={`/store/${template.id}`} key={template.id} className="group product-card block border-b border-r border-white/20">
                <div className="relative">
                    {template.bestSeller && <div className="absolute top-4 left-4 z-10 bg-black border border-white text-white px-2.5 py-1 text-xs">BEST SELLER</div>}
                    {template.isNew && <div className="absolute top-4 left-4 z-10 bg-black border border-white text-white px-2.5 py-1 text-xs">NEW</div>}
                    <div className="h-72 overflow-hidden relative border-b border-white/20">
                        <Image
                            src={template.image}
                            alt={template.imageAlt}
                            fill
                            className="w-full h-full object-cover grayscale transition-all duration-500 ease-in-out group-hover:grayscale-0 group-hover:scale-105"
                        />
                    </div>
                </div>
                <div className="p-8 flex flex-col justify-between flex-grow">
                    <div>
                        <div className="flex justify-between items-start mb-5">
                            <div>
                                <h3 className="font-display text-2xl font-bold uppercase">{template.title}</h3>
                            </div>
                            <span className="text-xl font-bold">${template.price}</span>
                        </div>
                        <p className="text-sm text-[#888] leading-relaxed mb-8 max-w-[90%]">{template.description}</p>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-8 text-xs text-[#666] border-t border-[#222] pt-4">
                            <div className="spec-item">STACK: <span className="text-white">{template.specs.stack}</span></div>
                            <div className="spec-item">CSS: <span className="text-white">{template.specs.css}</span></div>
                            <div className="spec-item">CMS: <span className="text-white">{template.specs.cms}</span></div>
                            <div className="spec-item">TYPE: <span className="text-white">{template.specs.type}</span></div>
                        </div>
                    </div>
                    
                    <Button variant="outline" className="w-full uppercase rounded-none bg-transparent text-white border-white/20 group-hover:bg-white group-hover:text-black transition-all duration-300 flex items-center justify-center gap-2">
                        View Details <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </Link>
            ))}
        </section>
      </main>
    </div>
  );
}
