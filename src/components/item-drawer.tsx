
"use client";

import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { ArrowRight, CheckCircle, Users, BarChart, FileText, HelpCircle, Star } from 'lucide-react';
import { useItemDrawer } from '@/hooks/use-item-drawer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function ItemDrawer() {
  const { isOpen, closeItem, item } = useItemDrawer();

  if (!item) {
    return null;
  }

  const isProject = 'summary' in item;

  const renderSection = (title: string, icon: React.ReactNode, children: React.ReactNode) => (
    <AccordionItem value={title.toLowerCase().replace(/\s/g, '-')}>
      <AccordionTrigger className="text-base font-semibold hover:no-underline">
        <div className="flex items-center gap-3">
          {icon}
          {title}
        </div>
      </AccordionTrigger>
      <AccordionContent className="prose prose-invert max-w-none text-muted-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground text-sm">
        {children}
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { if (!open) closeItem(); }}>
        <SheetContent className="w-full md:w-[60%] lg:w-[50%] xl:w-[40%] p-0 border-l-0" side="right">
            <ScrollArea className="h-full">
                <div className="relative h-80 w-full">
                    <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <SheetHeader className="absolute bottom-0 left-0 p-6 text-left">
                        <SheetTitle className="font-headline text-3xl text-white shadow-md">
                            {item.title}
                        </SheetTitle>
                    </SheetHeader>
                </div>

                <div className="p-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {(isProject ? item.services : [item.title]).map((tag: string) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                    </div>

                     <Accordion type="multiple" defaultValue={['overview']} className="w-full">
                        {/* Overview */}
                        {renderSection("Overview", <FileText className="h-5 w-5 text-primary" />, (
                            <>
                                <p>{isProject ? item.longDescription : item.description}</p>
                                {!isProject && <p>This service is critical for establishing a powerful digital presence, solving key business challenges, and driving growth.</p>}
                            </>
                        ))}

                        {/* Who This Service Is For */}
                        {!isProject && renderSection("Who This Service Is For", <Users className="h-5 w-5 text-primary" />, (
                            <>
                                <p>This service is ideal for:</p>
                                <ul>
                                    <li>Small businesses looking to establish a professional online presence.</li>
                                    <li>Startups needing to build a scalable and impactful brand from scratch.</li>
                                    <li>Influencers and creators who want to convert their audience into a business.</li>
                                </ul>
                                <p><strong>Common Pain Points:</strong> Struggling with an outdated website, low online visibility, and a brand that doesn't connect with your target audience.</p>
                            </>
                        ))}

                        {/* Statistics / Proof */}
                        {renderSection("Impact & Statistics", <BarChart className="h-5 w-5 text-primary" />, (
                             <div className="grid grid-cols-2 gap-4 text-center not-prose">
                                <div className="bg-card p-4 rounded-lg">
                                    <p className="text-2xl font-bold font-headline text-primary">30%</p>
                                    <p className="text-xs text-muted-foreground">Engagement Boost</p>
                                </div>
                                <div className="bg-card p-4 rounded-lg">
                                    <p className="text-2xl font-bold font-headline text-primary">2x</p>
                                    <p className="text-xs text-muted-foreground">Faster Load Times</p>
                                </div>
                            </div>
                        ))}

                        {/* Features & Benefits */}
                        {!isProject && renderSection("Features & Benefits", <CheckCircle className="h-5 w-5 text-primary" />, (
                            <ul>
                                <li><strong>Custom Design:</strong> A unique look that reflects your brand, not a template.</li>
                                <li><strong>Responsive Layout:</strong> Flawless performance on all devices, from desktops to phones.</li>
                                <li><strong>SEO Foundation:</strong> Built to rank well on Google from day one.</li>
                                <li><strong>Scalable Architecture:</strong> A website that can grow with your business needs.</li>
                            </ul>
                        ))}
                        
                        {/* Project Specific Summary */}
                        {isProject && renderSection("Project Summary", <FileText className="h-5 w-5 text-primary" />, (
                            <p>{item.summary}</p>
                        ))}

                        {/* Testimonials */}
                        {renderSection("Client Testimonials", <Star className="h-5 w-5 text-primary" />, (
                            <blockquote>
                                "Working with Ampire Studios was a dream. They took our vision and translated it into a brand that is both beautiful and authentic. Their attention to detail is unmatched."
                                <cite className='block text-right not-italic mt-2'>- Aisha Khan, CEO of Helia Skincare</cite>
                            </blockquote>
                        ))}

                        {/* FAQ */}
                        {renderSection("Frequently Asked Questions", <HelpCircle className="h-5 w-5 text-primary" />, (
                           <>
                            <p><strong>How long does a project take?</strong><br/>A standard project takes 4-8 weeks, but this can vary based on complexity.</p>
                            <p><strong>What does it cost?</strong><br/>We provide custom quotes for each project to ensure fair pricing. Fill out our project intake form to get started!</p>
                           </>
                        ))}
                    </Accordion>

                    <div className="pt-6 border-t border-border">
                        <Button size="lg" className="w-full" asChild>
                            <Link href="/project-intake">
                                Start a Project Like This <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </ScrollArea>
        </SheetContent>
    </Sheet>
  );
}
