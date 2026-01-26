
'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import type { Article } from '@/lib/data';
import './page.css';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const ITEMS_PER_PAGE = 12;

export default function BlogPage() {
  const firestore = useFirestore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL_LOGS');
  const [currentPage, setCurrentPage] = useState(1);
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);

  const articlesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'blogs'), orderBy('date', 'desc'));
  }, [firestore]);

  const { data: articles, isLoading: articlesLoading } = useCollection<Article>(articlesQuery);
  
  useEffect(() => {
    if (articles && articles.length > 0) {
      const featured = articles.filter(a => a.featured);
      if (featured.length > 0) {
        const randomIndex = Math.floor(Math.random() * featured.length);
        setFeaturedArticle(featured[randomIndex]);
      } else {
        const randomIndex = Math.floor(Math.random() * articles.length);
        setFeaturedArticle(articles[randomIndex]);
      }
    }
  }, [articles]);

  const categories = useMemo(() => {
    if (!articles) return ['ALL_LOGS'];
    const all = ['ALL_LOGS'];
    const unique = [...new Set(articles.map(a => a.category.toUpperCase()))];
    return [...all, ...unique.filter(c => c !== 'ALL_LOGS')];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (!articles || !featuredArticle) return [];
    const term = searchTerm.toLowerCase();
    return articles.filter(
      article =>
        article.id !== featuredArticle.id &&
        (activeCategory === 'ALL_LOGS' || article.category.toUpperCase() === activeCategory) &&
        (article.title.toLowerCase().includes(term) ||
          article.excerpt.toLowerCase().includes(term) ||
          article.tags.some(t => t.toLowerCase().includes(term)))
    );
  }, [articles, featuredArticle, searchTerm, activeCategory]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };
  
  useEffect(() => {
    document.title = 'Ampire Studio // Transmission Log';
  }, []);

  if (articlesLoading || !featuredArticle) {
    return <div className="bg-background text-foreground min-h-screen flex items-center justify-center">Loading Transmission Log...</div>;
  }

  if (!articles || articles.length === 0) {
    return <div className="bg-background text-foreground min-h-screen flex items-center justify-center">No articles found. Try seeding data in the admin panel.</div>;
  }

  return (
    <div className='bg-background text-foreground'>
      <header className="blog-header">
        <div className="header-meta">
          <span>// DATABASE ACCESS</span>
          <span>LOGS: {articles.length}</span>
        </div>
        <h1 className="blog-title">
          Blog.
        </h1>
      </header>

      <nav className="controls-bar">
        <div className="categories">
            {categories.map(cat => (
                <button 
                    key={cat} 
                    className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(cat)}
                >
                    {cat}
                </button>
            ))}
        </div>
        <div className="search-wrapper">
          <span>SEARCH:</span>
          <input
            type="text"
            className="search-input"
            placeholder="ENTER_KEYWORD"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </nav>

      <section className="featured-article">
        <div className="feat-img-wrapper">
          <Image
            src={featuredArticle.featuredImage.url}
            alt={featuredArticle.featuredImage.alt}
            fill
            className="feat-img"
            priority
          />
        </div>
        <div className="feat-content">
          <span className="meta-tag">FEATURED // {featuredArticle.category.toUpperCase()}</span>
          <h2 className="feat-title">{featuredArticle.title}</h2>
          <p className="feat-excerpt">{featuredArticle.excerpt}</p>
          <Link href={`/blog/${featuredArticle.id}`} className="read-btn">
            ACCESS FILE &rarr;
          </Link>
        </div>
      </section>

      <div className="grid-separator"></div>

      <section className="blog-grid">
        {paginatedArticles.map(article => (
          <Link href={`/blog/${article.id}`} className="article-card" key={article.id}>
            <div className="art-img-wrapper">
              <Image
                src={article.cardImage.url}
                alt={article.cardImage.alt}
                fill
                className="art-img"
                loading="lazy"
              />
            </div>
            <div className="art-body">
              <div className="art-meta">
                <span>{new Date(article.date).toISOString().split('T')[0].replace(/-/g, '.')}</span>
                <span>[ READ: {String(article.readingTime).padStart(2, '0')}m ]</span>
              </div>
              <h3 className="art-title">{article.title}</h3>
              <p className="art-desc">{article.excerpt}</p>
              <div className="art-footer">READ_ENTRY &rarr;</div>
            </div>
          </Link>
        ))}
      </section>
      
       {totalPages > 1 && (
        <div className="pagination-controls">
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            variant="outline"
            className="pagination-btn"
          >
            &larr; PREVIOUS
          </Button>
          <span className="pagination-status">
            PAGE {currentPage} OF {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            variant="outline"
            className="pagination-btn"
          >
            NEXT &rarr;
          </Button>
        </div>
      )}


      <section className="newsletter-section">
        <div className="nl-text">
          <h3>Join Our Newsletter</h3>
          <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem' }}>
            Get weekly updates, tips, and insights. No spam.
          </p>
        </div>
        <form className="nl-form">
          <input
            type="email"
            className="nl-input"
            placeholder="Enter your email address"
          />
          <button type="submit" className="nl-btn">
            Subscribe
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
}
