
'use client';

import { getArticles } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogPostCard } from '@/components/blog-post-card';
import { useEffect, useState } from 'react';
import type { Article } from '@/lib/data';

export default function BlogPage() {
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [otherArticles, setOtherArticles] = useState<Article[]>([]);

  useEffect(() => {
    const allArticles = getArticles();
    const popularArticles = allArticles.filter(a => a.popular);
    
    if (popularArticles.length > 0) {
      const randomFeatured = popularArticles[Math.floor(Math.random() * popularArticles.length)];
      setFeaturedArticle(randomFeatured);
      setOtherArticles(allArticles.filter(a => a.id !== randomFeatured.id));
    } else if (allArticles.length > 0) {
      // Fallback if no popular articles
      const randomFeatured = allArticles[Math.floor(Math.random() * allArticles.length)];
      setFeaturedArticle(randomFeatured);
      setOtherArticles(allArticles.filter(a => a.id !== randomFeatured.id));
    }
  }, []);

  if (!featuredArticle) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading articles...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-background text-foreground">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Featured Article Hero */}
        <section className="group relative mb-24 h-[500px] w-full overflow-hidden rounded-2xl">
          <Link href={`/blog/${featuredArticle.id}`}>
            <Image
              src={featuredArticle.image}
              alt={featuredArticle.imageAlt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white md:p-12">
              <Badge variant="secondary" className="mb-4 w-fit">
                Featured
              </Badge>
              <h1 className="font-headline text-3xl font-bold md:text-4xl lg:text-5xl">
                {featuredArticle.title}
              </h1>
              <p className="mt-4 max-w-3xl text-lg text-neutral-200">
                {featuredArticle.excerpt}
              </p>
              <div className="absolute top-8 right-8">
                <Button variant="ghost" size="icon" className="h-14 w-14 border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 group-hover:rotate-[-45deg]">
                  <ArrowRight className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </Link>
        </section>

        {/* Recent Blog Posts */}
        <section>
          <h2 className="font-headline text-3xl font-bold">Recent blog posts</h2>
          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {otherArticles.map(article => (
              <BlogPostCard key={article.id} article={article} />
            ))}
          </div>
        </section>
        
        <section className="mt-16 text-center">
            <Button variant="outline" size="lg">Loading more...</Button>
        </section>

      </main>
    </div>
  );
}
