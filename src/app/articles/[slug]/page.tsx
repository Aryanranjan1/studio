"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getArticleBySlug } from '@/lib/firestore';
import type { Article } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import { PageTitleHeader } from '@/components/page-title-header';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const articleData = await getArticleBySlug(params.slug);
        setArticle(articleData);
      } catch (error) {
        console.error("Failed to fetch article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.slug]);

  if (loading) {
    return (
        <div className="flex min-h-screen flex-col bg-transparent text-foreground">
            <Header />
            <main className="flex-1">
                <div className="container py-24 sm:py-32">
                    <Skeleton className="h-10 w-3/4 mx-auto" />
                    <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
                    <Skeleton className="h-96 w-full mt-12 rounded-lg" />
                    <div className="mt-12 space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
  }

  if (!article) {
    return (
        <div className="flex min-h-screen flex-col bg-transparent text-foreground">
            <Header />
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
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <Header />
      <main className="flex-1">
        <PageTitleHeader 
            title={article.title}
            subtitle=""
        />
        <div className="container py-16 sm:py-24">
            <article className="prose prose-invert mx-auto max-w-3xl">
                <div className="relative mb-12 w-full h-96 rounded-lg overflow-hidden">
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
                        <span>By AMpire Studio</span>
                    </div>
                </div>
                <p className="whitespace-pre-line text-lg leading-relaxed text-foreground/80">
                    {article.content}
                </p>
            </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
