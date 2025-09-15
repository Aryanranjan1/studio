"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageTitleHeader } from '@/components/page-title-header';
import { Footer } from '@/components/footer';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Button } from '@/components/ui/button';

interface ArticlesPageClientProps {
  articles: Article[];
  allTags: string[];
}

export default function ArticlesPageClient({ articles, allTags }: ArticlesPageClientProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const featuredArticles = articles.filter(a => a.isFeatured);
  const regularArticles = articles.filter(a => !a.isFeatured);

  const filteredArticles =
    activeFilter === "All"
      ? regularArticles
      : regularArticles.filter((a) => a.tags && a.tags.includes(activeFilter));

  const ArticleCard = ({ article, delay = 0, priority = false }: { article: Article, delay?: number, priority?: boolean }) => (
    <ScrollReveal delay={delay}>
        <Link href={`/articles/${article.slug}`}>
            <Card className="group h-full overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2 bg-card/80 backdrop-blur-lg">
            <CardHeader className="p-0">
                <div className="relative h-60 w-full overflow-hidden">
                <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    priority={priority}
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    data-ai-hint="article feature image"
                />
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-2">
                    {article.tags?.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
                <CardTitle className="font-headline text-xl mb-2">{article.title}</CardTitle>
                <p className='text-sm text-muted-foreground'>{new Date(article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </CardContent>
            </Card>
        </Link>
    </ScrollReveal>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        <PageTitleHeader 
            title="Our Articles"
            subtitle="Insights, trends, and stories from the digital frontier."
            imageUrl="https://picsum.photos/seed/newspaper/1920/1080"
        />
        <div className="container py-24 sm:py-32 space-y-24">
            <>
                {/* Featured Articles Section */}
                {featuredArticles.length > 0 && (
                    <section>
                        <ScrollReveal>
                            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl text-center mb-12">Featured Insights</h2>
                        </ScrollReveal>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            {featuredArticles.map((article, index) => (
                            <ArticleCard key={article.id} article={article} delay={index * 100} priority={index < 2} />
                            ))}
                        </div>
                    </section>
                )}

                {/* All Articles Section */}
                <section>
                    <ScrollReveal>
                        <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl text-center mb-6">All Articles</h2>
                    </ScrollReveal>
                    
                    <ScrollReveal delay={200}>
                        <div className="my-10 flex flex-wrap justify-center gap-3">
                            <Button
                            variant={activeFilter === "All" ? "default" : "outline"}
                            onClick={() => setActiveFilter("All")}
                            className="rounded-full"
                            >
                            All
                            </Button>
                            {allTags.map((tag) => (
                            <Button
                                key={tag}
                                variant={activeFilter === tag ? "default" : "outline"}
                                onClick={() => setActiveFilter(tag)}
                                className="rounded-full"
                            >
                                {tag}
                            </Button>
                            ))}
                        </div>
                    </ScrollReveal>
                    
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredArticles.map((article, index) => (
                        <ArticleCard key={article.id} article={article} delay={index * 100} />
                        ))}
                    </div>
                </section>
            </>
        </div>
      </main>
      <Footer />
    </div>
  );
}
