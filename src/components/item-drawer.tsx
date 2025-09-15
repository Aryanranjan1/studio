
"use client";

import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';
import { useItemDrawer } from '@/hooks/use-item-drawer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetOverlay
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ItemDrawer() {
  const { isOpen, closeItem, item } = useItemDrawer();

  if (!item) {
    return null;
  }

  const isProject = 'summary' in item;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { if (!open) closeItem(); }}>
        <SheetContent className="w-full md:w-1/2 lg:w-1/2 xl:w-[40%] p-0 border-l-0" side="right">
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

                <div className="p-6 space-y-6">
                    <div className="flex flex-wrap gap-2">
                        {(isProject ? item.services : [item.title]).map((tag: string) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                    </div>

                    <SheetDescription className="text-base text-muted-foreground whitespace-pre-line">
                        {isProject ? item.longDescription : item.description}
                    </SheetDescription>
                    
                    {/* Placeholder for stats */}
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-card p-4 rounded-lg">
                            <p className="text-2xl font-bold font-headline text-primary">30%</p>
                            <p className="text-xs text-muted-foreground">Engagement Boost</p>
                        </div>
                        <div className="bg-card p-4 rounded-lg">
                            <p className="text-2xl font-bold font-headline text-primary">3 Months</p>
                            <p className="text-xs text-muted-foreground">Project Timeline</p>
                        </div>
                    </div>

                    {isProject && (
                         <article className="prose prose-invert max-w-none text-foreground/80">
                            <h4>Project Summary</h4>
                            <p>{item.summary}</p>
                        </article>
                    )}

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
