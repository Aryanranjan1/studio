"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getArticleBySlug } from '@/lib/data';
import type { Article } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import { PageTitleHeader } from '@/components/page-title-header';
import { Footer } from '@/components/footer';
import Plasma from '@/components/ui/Plasma';

import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
        <div className="flex min-h-screen flex-col bg-transparent text-foreground">
            <main className="flex-1">
                <PageTitleHeader 
                    title="Article Not Found"
                    subtitle="Sorry, we couldn't find the article you're looking for."
                />
            </main>
            <Footer />
        </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1 relative">
        <div className="absolute inset-0 z-0">
          <Plasma color="#4F46E5" speed={0.5} />
           <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
        </div>
        <div className='relative z-10'>
            <PageTitleHeader 
                title={article.title}
                subtitle=""
            />
            <div className="container py-16 sm:py-24">
                <article className="prose prose-invert mx-auto max-w-3xl bg-card/50 backdrop-blur-lg p-8 rounded-2xl">
                    <div className="relative mb-12 w-full h-96 rounded-lg overflow-hidden -mt-24">
                        <Image 
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex items-center gap-6 mb-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>By Ampire Studios</span>
                        </div>
                    </div>
                    <p className="whitespace-pre-line text-lg leading-relaxed text-foreground/80">
                        {article.content}
                    </p>
                </article>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
