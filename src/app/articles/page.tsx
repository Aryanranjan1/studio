"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getArticles } from '@/lib/data';
import type { Article } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { PageTitleHeader } from '@/components/page-title-header';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ScrollReveal } from '@/components/scroll-reveal';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getArticles((fetchedArticles) => {
      // Filter for published articles only
      setArticles(fetchedArticles.filter(a => a.status === 'published'));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <Header />
      <main className="flex-1">
        <PageTitleHeader 
            title="Our Articles"
            subtitle="Insights, trends, and stories from the digital frontier."
        />
        <div className="container py-24 sm:py-32">
        {loading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="space-y-4">
                        <Skeleton className="h-60 w-full rounded-2xl" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                ))}
            </div>
            ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article, index) => (
                <ScrollReveal key={article.id} delay={index * 100}>
                    <Link href={`/articles/${article.slug}`}>
                        <Card className="group h-full overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2">
                        <CardHeader className="p-0">
                            <div className="relative h-60 w-full overflow-hidden">
                            <Image
                                src={article.imageUrl}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                data-ai-hint="article feature image"
                            />
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <Badge variant="secondary" className='mb-2'>{new Date(article.createdAt).toLocaleDateString()}</Badge>
                            <CardTitle className="font-headline text-xl mb-2">{article.title}</CardTitle>
                        </CardContent>
                        </Card>
                    </Link>
                </ScrollReveal>
                ))}
            </div>
            )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
