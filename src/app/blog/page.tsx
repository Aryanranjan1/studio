

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
import { CtaSection } from '@/components/cta-section';
import { Footer } from '@/components/footer';

const allCategories = [
  'Web Design',
  'Development',
  'Automation',
  'Templates',
  'Branding',
  'Business Strategy',
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
          selectedCategories.some(cat => article.tags.includes(cat));
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Ampire Studio Blog',
    'description': 'Articles, case studies, and strategies for modern brands and digital creators.',
    'publisher': {
      '@type': 'Organization',
      'name': 'Ampire Studio'
    }
  };

  if (articles.length === 0) {
    return <div>Loading...</div>; // Or a proper skeleton loader
  }

  return (
    <div className="w-full bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main>
        <div className="grid grid-cols-12 gap-px border-l border-r border-neutral-800 bg-neutral-800">
          <div className="col-span-12 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {featuredArticle && (
                <section className="my-12">
                  <Link href={`/blog/${featuredArticle.id}`} className="group" data-event="FeaturedArticleClick">
                    <Card className="grid grid-cols-1 overflow-hidden md:grid-cols-2 bg-card/50 backdrop-blur-lg">
                      <div className="relative h-80 w-full md:h-auto">
                        <Image
                          src={featuredArticle.image}
                          alt={featuredArticle.imageAlt}
                          fill
                          className="object-cover"
                        />
                         <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-primary/20" />
                      </div>
                      <div className="flex flex-col p-8">
                        <Badge variant="outline" className="w-fit border-primary/50 text-primary">{featuredArticle.category}</Badge>
                        <h2 className="mt-4 font-headline text-3xl font-bold group-hover:text-primary">
                          {featuredArticle.title}
                        </h2>
                        <p className="mt-4 text-muted-foreground">{featuredArticle.excerpt}</p>
                         <p className="mt-4 text-sm text-muted-foreground">
                          {new Date(featuredArticle.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · {featuredArticle.readingTime} min read
                        </p>
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
            </div>
          </div>
          <div className="col-span-12 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <section className="mb-12">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search articles — design, development, automation…"
                    className="h-14 w-full rounded-lg border-border bg-card/50 pl-12 text-base focus-visible:ring-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    role="search"
                    aria-label="Search articles"
                    data-event="BlogSearch"
                  />
                  {searchTerm && (
                      <p className="mt-2 text-sm text-muted-foreground" aria-live="polite">
                          {filteredArticles.length} results found.
                      </p>
                  )}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {allCategories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategories.includes(category) ? 'default' : 'secondary'}
                      className="rounded-full"
                      onClick={() => handleCategoryToggle(category)}
                      data-event="FilterApplied"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </section>
            </div>
          </div>
          <div className="col-span-12 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <section>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {filteredArticles.map((article) => (
                    <Link href={`/blog/${article.id}`} key={article.id} className="group" data-event="ArticleCardClick">
                      <Card className="h-full overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-primary/10 bg-card/50 backdrop-blur-lg">
                        <div className="relative h-60 w-full">
                          <Image
                            src={article.image}
                            alt={article.imageAlt}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-primary/20" />
                        </div>
                        <CardContent className="p-6">
                          <Badge variant="outline" className="border-primary/50 text-primary">{article.category}</Badge>
                          <h3 className="mt-4 font-headline text-2xl font-bold group-hover:text-primary">
                            {article.title}
                          </h3>
                          <p className="mt-2 text-muted-foreground">
                            {article.excerpt}
                          </p>
                          <p className="mt-4 text-sm text-muted-foreground">
                            {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · {article.readingTime} min read
                          </p>
                           <p className="mt-6 font-semibold text-primary">
                            Read Article <ArrowRight className="ml-2 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
          <div className="col-span-12 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <section className="mt-12 flex justify-center gap-2 pb-12">
                  <Button variant="outline" data-event="PaginationClick">Previous</Button>
                  <Button variant="secondary" data-event="PaginationClick">1</Button>
                  <Button variant="ghost" data-event="PaginationClick">2</Button>
                  <Button variant="ghost" data-event="PaginationClick">3</Button>
                  <Button variant="outline" data-event="PaginationClick">Next</Button>
              </section>
            </div>
          </div>
        </div>
      </main>

      <CtaSection />
      <Footer />
    </div>
  );
}
