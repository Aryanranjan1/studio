
'use client';

import { getArticles } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useMemo, useState } from 'react';
import type { Article } from '@/lib/data';
import { Input } from '@/components/ui/input';

const allCategories = [
  'Web Design',
  'Development',
  'Automation',
  'Templates',
  'Branding',
  'Business Tips',
  'Case Studies',
];

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  useEffect(() => {
    setArticles(getArticles());
  }, []);

  const featuredArticle = useMemo(() => articles.find(a => a.featured), [articles]);
  
  const filteredArticles = useMemo(() => {
    return articles
      .filter(a => a.id !== featuredArticle?.id)
      .filter(article => {
        const term = searchTerm.toLowerCase();
        const categoryMatch =
          selectedCategories.length === 0 ||
          selectedCategories.some(cat => article.tags.includes(cat)); // Logic corrected for tags
        const searchMatch =
          article.title.toLowerCase().includes(term) ||
          article.excerpt.toLowerCase().includes(term);
        return categoryMatch && searchMatch;
      });
  }, [articles, featuredArticle, searchTerm, selectedCategories]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  if (articles.length === 0) {
    return <div>Loading...</div>; // Or a proper skeleton loader
  }

  return (
    <div className="bg-background text-foreground">
      <header className="container mx-auto px-4 py-16 text-center sm:px-6 lg:px-8">
        <Badge
          variant="outline"
          className="border-primary/50 text-primary"
        >
          Our Blog
        </Badge>
        <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Insights & Ideas
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Articles, guides, and practical insights for small businesses, creators, and growing brands.
        </p>
      </header>

      <main className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        {featuredArticle && (
          <section className="mb-16">
            <Link href={`/blog/${featuredArticle.id}`} className="group">
              <Card className="grid grid-cols-1 overflow-hidden md:grid-cols-2">
                <div className="relative h-80 w-full md:h-auto">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col p-8">
                  <Badge variant="secondary">{featuredArticle.category}</Badge>
                  <h2 className="mt-4 font-headline text-3xl font-bold group-hover:text-primary">
                    {featuredArticle.title}
                  </h2>
                  <p className="mt-4 text-muted-foreground">{featuredArticle.excerpt}</p>
                  <div className="mt-auto pt-4">
                    <p className="font-semibold text-primary">
                      Read Article <ArrowRight className="ml-2 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </section>
        )}

        <section className="mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="h-12 w-full rounded-md border-border bg-card pl-10 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {allCategories.map(category => (
              <Button
                key={category}
                variant={selectedCategories.includes(category) ? 'default' : 'outline'}
                onClick={() => handleCategoryToggle(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <Link href={`/blog/${article.id}`} key={article.id} className="group">
                <Card className="h-full overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-primary/10">
                  <div className="relative h-48 w-full">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/40" />
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="secondary">{article.category}</Badge>
                    <h3 className="mt-2 font-headline text-xl font-bold group-hover:text-primary">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {article.excerpt}
                    </p>
                    <p className="mt-4 text-sm font-semibold text-primary">
                      Read More <ArrowRight className="ml-1 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
