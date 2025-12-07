
'use client';

import { getArticles } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Search as SearchIcon, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogPostCard } from '@/components/blog-post-card';
import { useEffect, useState, useMemo } from 'react';
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
          selectedCategories.includes(article.category);
        const searchMatch =
          article.title.toLowerCase().includes(term) ||
          article.excerpt.toLowerCase().includes(term) ||
          article.category.toLowerCase().includes(term);
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
  
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Ampire Studio Blog',
    description: 'Articles, guides, and practical insights for small businesses, creators, and growing brands.',
    url: 'https://studiowebsite-gcp-dev.web.app/blog',
  };

  const articleJsonLd = articles.map(article => ({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      image: article.image,
      author: {
        '@type': 'Person',
        name: article.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Ampire Studio',
        logo: {
            '@type': 'ImageObject',
            url: 'https://studiowebsite-gcp-dev.web.app/logo.png'
        }
      },
      datePublished: article.date,
      description: article.excerpt,
  }));

  if (!featuredArticle) {
    return <div className="bg-cream flex h-screen items-center justify-center"><p>Loading...</p></div>;
  }

  return (
    <div className="w-full bg-cream text-black">
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center border-b-2 border-black">
        <div className="max-w-4xl mx-auto">
            <h1 className="font-headline text-5xl md:text-7xl font-bold" aria-label="Insights, Ideas & Digital Empire Building">
                Insights, Ideas & Digital Empire Building
            </h1>
            <p className="mt-6 text-lg max-w-2xl mx-auto">
                Articles, guides, and practical insights for small businesses, creators, and growing brands.
            </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Featured Article */}
        <section className="mb-24" data-event="FeaturedArticleClick" data-article-id={featuredArticle.id}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border-2 border-black shadow-neo-lg">
                <div className="md:col-span-2 p-8 flex flex-col justify-between bg-pastel-yellow">
                    <div>
                        <Badge variant="outline" className="border-black text-black font-semibold uppercase">{featuredArticle.category}</Badge>
                        <Link href={`/blog/${featuredArticle.id}`}>
                            <h2 className="mt-4 font-headline text-4xl font-bold hover:underline">{featuredArticle.title}</h2>
                        </Link>
                        <p className="mt-4 text-muted-foreground">{featuredArticle.excerpt}</p>
                    </div>
                    <div className="mt-8">
                         <p className="text-sm text-muted-foreground">{new Date(featuredArticle.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <Link href={`/blog/${featuredArticle.id}`} className="group inline-flex items-center font-bold mt-2">
                           Read Article <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
                <div className="md:col-span-3 relative h-80 md:h-auto min-h-[400px] border-t-2 md:border-t-0 md:border-l-2 border-black">
                     <Image
                        src={featuredArticle.image}
                        alt={featuredArticle.imageAlt}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </section>

        {/* Search and Filter */}
        <section className="mb-16" role="search">
            <div className="relative mb-6">
                <Input 
                    type="text"
                    placeholder="Search articles — e.g., web design, templates, automation…"
                    className="w-full h-14 px-5 pr-12 text-lg bg-white border-2 border-black focus:ring-primary focus:border-primary shadow-neo"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search articles"
                    data-event="BlogSearch"
                />
                <SearchIcon className="absolute top-1/2 right-5 -translate-y-1/2 h-6 w-6 text-muted-foreground"/>
            </div>
            <div className="flex flex-wrap gap-3">
                {allCategories.map(category => (
                    <Button 
                        key={category}
                        variant={selectedCategories.includes(category) ? 'default' : 'outline'}
                        onClick={() => handleCategoryToggle(category)}
                        className={`font-semibold border-2 border-black shadow-neo hover:-translate-y-0.5 hover:shadow-neo-md transition-all ${selectedCategories.includes(category) ? 'bg-black text-white' : 'bg-white text-black'}`}
                        data-event="FilterApplied"
                        data-category={category}
                    >
                        {category}
                    </Button>
                ))}
            </div>
             {searchTerm && (
                <p className="mt-4 text-muted-foreground" aria-live="polite">
                    {filteredArticles.length} results found for &quot;{searchTerm}&quot;
                </p>
            )}
        </section>


        {/* Main Blog Grid */}
        <section>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article, index) => (
              <BlogPostCard key={article.id} article={article} index={index}/>
            ))}
          </div>
        </section>
        
        {/* Pagination */}
        <nav className="mt-24 flex justify-between items-center border-t-2 border-black pt-8">
            <Button variant="outline" className="border-2 border-black shadow-neo hover:shadow-neo-md hover:-translate-y-0.5 transition-transform" data-event="PaginationClick" data-page="previous">
                &larr; Previous Page
            </Button>
            <div className="hidden md:flex gap-2">
                <Button variant="ghost" className="font-bold underline">1</Button>
                <Button variant="ghost">2</Button>
                <Button variant="ghost">3</Button>
            </div>
            <Button variant="outline" className="border-2 border-black shadow-neo hover:shadow-neo-md hover:-translate-y-0.5 transition-transform" data-event="PaginationClick" data-page="next">
                Next Page &rarr;
            </Button>
        </nav>

        {/* Social Strip */}
        <section className="mt-24 border-2 border-black bg-pastel-mint shadow-neo-lg p-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <h3 className="font-headline text-2xl font-bold">Let's stay connected.</h3>
                <div className="flex items-center gap-4">
                     <a href="#" className="text-black hover:text-primary">Instagram</a>
                     <a href="#" className="text-black hover:text-primary">LinkedIn</a>
                     <a href="#" className="text-black hover:text-primary">X</a>
                     <a href="#" className="text-black hover:text-primary">YouTube</a>
                </div>
                <Button 
                    className="bg-green-500 text-black font-bold border-2 border-black shadow-neo hover:bg-green-600 hover:-translate-y-0.5 transition-all"
                    data-event="WhatsAppClick"
                    asChild
                >
                    <a href="https://wa.me/1234567890" target="_blank">Message on WhatsApp</a>
                </Button>
            </div>
        </section>

      </main>
    </div>
  );
}

    
