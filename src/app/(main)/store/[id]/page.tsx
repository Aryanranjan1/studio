
'use client';

import { getTemplates } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Template } from '@/lib/data';
import { useEffect, useState, useCallback, useRef } from 'react';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';


export default function TemplateDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [template, setTemplate] = useState<Template | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!id) return;
    const templates = getTemplates();
    const foundTemplate = templates.find((p) => p.id === id);
    if (foundTemplate) {
      setTemplate(foundTemplate);
      document.title = `${foundTemplate.title} — Ampire Assets`;
    } else {
      notFound();
    }
  }, [id]);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    // Here you would typically add the item to a global cart state/context
  }
  
  const moveSlide = (direction: number) => {
    if (sliderRef.current) {
        const slideWidth = sliderRef.current.querySelector('.slide')?.clientWidth || 0;
        sliderRef.current.scrollBy({ left: slideWidth * direction, behavior: 'smooth' });
    }
  }


  if (!template) {
    // You can render a loading state here
    return (
      <div className="w-full bg-black text-white min-h-screen flex items-center justify-center">
        <p>Loading Template...</p>
      </div>
    );
  }


  return (
    <div className="w-full bg-[#050505] text-white font-tech h-screen overflow-hidden md:h-auto md:overflow-auto">
      <nav className="h-[60px] px-5 md:px-10 border-b border-white/20 text-xs text-[#888] fixed top-0 left-0 w-full bg-[#050505] z-50 flex justify-between items-center">
        <div><Link href="/store" className="hover:text-white">&lt; STORE</Link></div>
        <div className="hidden md:block">
            {template.title.toUpperCase()}_V{template.version}
        </div>
        <Link href="/cart">CART [{cartCount}]</Link>
      </nav>

      <main className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 h-[calc(100vh-60px)] mt-[60px] w-full">
        
        {/* --- LEFT: IMAGE SLIDER --- */}
        <div className="relative border-r border-white/20 h-full overflow-hidden bg-black md:col-span-3 lg:col-span-2">
            <button className="slider-btn prev-btn" onClick={() => moveSlide(-1)}>&lt;</button>
            <div className="slider-track" ref={sliderRef}>
                {template.images.map((img, index) => (
                    <div className="slide" key={index}>
                        <Image src={img.src} alt={img.alt} fill priority={index === 0} />
                        <div className="slide-caption">[FIG {index + 1}.0] {img.alt}</div>
                    </div>
                ))}
            </div>
            <button className="slider-btn next-btn" onClick={() => moveSlide(1)}>&gt;</button>
        </div>

        {/* --- RIGHT: INFO PANEL --- */}
        <div className="info-panel md:col-span-2 lg:col-span-1">
            <div className="header-group">
                <div className="status-badge">● INSTANT DOWNLOAD</div>
                <h1 className="p-title">{template.title}</h1>
                <div className="price-block">
                    <span className="p-price">${template.price.toFixed(2)}</span>
                    <span className="p-license">[ STANDARD LICENSE ]</span>
                </div>
            </div>

            <p className="p-description">
                {template.longDescription}
            </p>

            <div className="action-group">
                 <Button onClick={handleAddToCart} variant="outline" className="btn-main btn-cart rounded-none uppercase h-auto">
                    Add to Cart
                 </Button>
                <Button asChild className="btn-main btn-buy rounded-none uppercase h-auto">
                    <a href={template.url} target="_blank" rel="noopener noreferrer">
                        <span>Purchase Now</span>
                        <span>&rarr;</span>
                    </a>
                </Button>
            </div>

            <div className="compact-specs">
                {Object.entries(template.specs).map(([key, value]) => (
                    <div className="spec-item" key={key}>
                        {key.toUpperCase()}: <span>{value}</span>
                    </div>
                ))}
            </div>
        </div>
      </main>
      
      <style jsx>{`
        body {
            /* On desktop, we want a fixed viewport. On mobile, it scrolls normally. */
            @media (min-width: 769px) {
                height: 100vh;
                overflow: hidden;
            }
        }
        .main-grid {
            display: grid;
            grid-template-columns: 60% 40%; 
        }
        
        .slider-track {
            display: flex;
            height: 100%;
            overflow-x: scroll;
            scroll-snap-type: x mandatory;
            scrollbar-width: none; /* Firefox hidden */
            -ms-overflow-style: none; /* IE/Edge hidden */
            scroll-behavior: smooth;
        }
        .slider-track::-webkit-scrollbar { display: none; }

        .slide {
            min-width: 100%;
            height: 100%;
            scroll-snap-align: start;
            position: relative;
        }
        .slide-caption {
            position: absolute;
            bottom: 20px; right: 20px;
            background: rgba(0,0,0,0.8);
            padding: 5px 10px;
            font-size: 0.7rem;
            border: 1px solid var(--border-color);
            pointer-events: none;
        }
        .slider-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.5);
            color: #fff;
            border: 1px solid var(--border-color);
            width: 40px; height: 40px;
            font-size: 1.2rem;
            z-index: 10;
            transition: 0.3s;
            display: flex; align-items: center; justify-content: center;
        }
        .slider-btn:hover { background: #fff; color: #000; }
        .prev-btn { left: 20px; }
        .next-btn { right: 20px; }

        .info-panel {
            padding: 40px;
            display: flex;
            flex-direction: column;
            overflow-y: auto; 
            height: 100%;
        }
        .header-group { margin-bottom: 25px; }

        .status-badge {
            display: inline-block;
            border: 1px solid hsl(var(--primary));
            color: hsl(var(--primary));
            font-size: 0.7rem;
            padding: 4px 10px;
            margin-bottom: 15px;
            text-transform: uppercase;
        }
        .p-title {
            font-family: var(--font-headline);
            font-size: 3rem;
            line-height: 0.9;
            text-transform: uppercase;
            margin-bottom: 10px;
        }
        .price-block {
            display: flex;
            align-items: baseline;
            gap: 15px;
            margin-bottom: 20px;
        }
        .p-price { font-size: 2rem; font-weight: bold; font-family: var(--font-headline);}
        .p-license { font-size: 0.8rem; color: #888; }
        .p-description {
            font-size: 0.9rem;
            line-height: 1.5;
            color: #ccc;
            margin-bottom: 30px;
            flex-grow: 0; 
        }
        .action-group {
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: 15px;
            margin-bottom: 40px;
        }
        .btn-main {
            padding: 18px;
            font-family: var(--font-tech);
            text-transform: uppercase;
            font-weight: bold;
            font-size: 0.85rem;
            transition: all 0.3s;
            display: flex; justify-content: center; align-items: center;
        }
        .btn-cart {
            background: transparent;
            border: 1px solid var(--border-active);
            color: var(--text-color);
        }
        .btn-cart:hover { background: #333; }

        .btn-buy {
            background: var(--text-color);
            border: 1px solid var(--text-color);
            color: var(--bg-color);
            justify-content: space-between; padding: 0 25px;
        }
        .btn-buy:hover { background: hsl(var(--primary)); border-color: hsl(var(--primary)); }

        .compact-specs {
            border-top: 1px solid #333;
            padding-top: 25px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px 30px;
            font-size: 0.75rem;
            color: #888;
            margin-top: auto; 
        }
        .spec-item span { display: block; color: #fff; font-size: 0.85rem; margin-top: 5px; }

        @media (min-width: 769px) and (max-width: 1024px) {
            .main-grid { grid-template-columns: 50% 50%; } 
            .p-title { font-size: 2.2rem; }
            .info-panel { padding: 30px; }
        }

        @media (max-width: 768px) {
            .main-grid {
                display: flex;
                flex-direction: column;
                height: auto;
            }
            .slider-container {
                width: 100%;
                height: 50vh; 
                border-right: none;
                border-bottom: 1px solid var(--border-color);
            }
            .info-panel {
                width: 100%;
                height: auto;
                padding: 30px 20px;
            }
             .action-group { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
