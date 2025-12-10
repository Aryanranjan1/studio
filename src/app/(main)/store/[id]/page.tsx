
'use client';

import { getTemplates } from '@/lib/data';
import { notFound, useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { Template } from '@/lib/data';
import { useEffect, useState } from 'react';

// We can't use generateMetadata in a Client Component.
// We'll set the title using useEffect instead.

export default function TemplateDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [template, setTemplate] = useState<Template | null>(null);

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


  if (!template) {
    // You can render a loading state here
    return (
        <div className="w-full bg-black text-white min-h-screen flex items-center justify-center">
            <p>Loading Template...</p>
        </div>
    )
  }

  return (
    <div className="w-full bg-[#050505] text-white font-tech">
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-white/20 bg-black/90 px-5 py-4 text-xs tracking-wider text-[#888] backdrop-blur-md md:px-10">
        <Link
          href="/store"
          className="transition-colors hover:text-white"
        >
          &lt; BACK_TO_STORE
        </Link>
        <div className="hidden md:block">
          AMPIRE_ASSETS // ID: {typeof id === 'string' ? id.split('-')[1].padStart(3, '0') : ''}
        </div>
      </nav>

      <main className="flex flex-col pt-[60px] md:flex-row">
        {/* Left Column: Scrolling Images */}
        <div className="w-full md:w-[65%] border-b border-white/20 p-5 md:border-b-0 md:border-r md:p-10">
          {template.images.map((img, index) => (
            <div key={index} className="mb-10">
              <Image
                src={img.src}
                alt={img.alt}
                width={1600}
                height={900}
                className="border border-[#222]"
                priority={index === 0}
              />
              <div className="mt-3 text-right text-[10px] text-[#666] uppercase">
                [FIG 1.{index}] {img.alt}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Sticky Info */}
        <div className="w-full md:w-[35%] md:sticky md:top-[60px] md:h-[calc(100vh-60px)] md:overflow-y-auto">
            <div className="p-5 md:p-10 flex flex-col h-full">
                <div className="inline-flex items-center gap-2 border border-primary px-3 py-1 text-xs uppercase text-primary self-start">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    INSTANT DOWNLOAD
                </div>
                
                <h1 className="mt-5 font-display text-5xl font-bold uppercase leading-none">
                    {template.title}
                </h1>
                <span className="mt-3 block text-xs text-[#888]">
                    VERSION {template.version} // UPDATED DEC 2024
                </span>

                <p className="mt-6 text-base leading-relaxed text-[#ccc]">
                    {template.longDescription}
                </p>

                <div className="specs-table my-8 w-full border-t border-white/20">
                    {Object.entries(template.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b border-[#222] py-4 text-sm">
                            <span className="text-[#666] uppercase">{key}</span>
                            <span className="font-bold uppercase text-right">{value}</span>
                        </div>
                    ))}
                </div>

                <div className="file-tree mb-8 border border-[#333] bg-[#111] p-5 font-mono text-xs text-[#888]">
                    {template.fileTree?.map((item, index) => (
                        <div key={index} className={`tree-item ${item.indent ? 'pl-5 text-[#555]' : 'text-white'}`}>
                            {item.indent && '└── '}{item.name}
                        </div>
                    ))}
                </div>
                
                {/* Buy Box - Pushed to bottom */}
                <div className="buy-box mt-auto border border-white bg-black p-5">
                    <div className="price-row mb-5 flex items-end justify-between font-display">
                        <span className="text-sm text-[#888]">LICENSE: STANDARD</span>
                        <span className="text-5xl font-bold">${template.price.toFixed(2)}</span>
                    </div>
                    <Button asChild className="buy-btn group w-full justify-between rounded-none border-none bg-white p-4 text-base font-bold uppercase text-black transition hover:bg-primary hover:text-black">
                        <a href={template.url} target="_blank" rel="noopener noreferrer">
                            <span>Initiate Purchase</span>
                            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                        </a>
                    </Button>
                    <div className="mt-2 text-center text-[10px] text-[#666]">
                        SECURE CHECKOUT VIA GUMROAD
                    </div>
                </div>

            </div>
        </div>
      </main>
    </div>
  );
}
