
'use client';

import { getArticles } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import type { Article } from '@/lib/data';
import './page.css';
import { Footer } from '@/components/footer';

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL_LOGS');

  useEffect(() => {
    document.title = 'Ampire Studio // Transmission Log';
    const data = getArticles();
    setArticles(data);
    setLoading(false);
  }, []);

  const featuredArticle = useMemo(() => {
    // Find a featured article, or fall back to the first one.
    return articles.find(a => a.featured) || articles[0];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return articles.filter(
      article =>
        article.id !== featuredArticle?.id &&
        (activeCategory === 'ALL_LOGS' ||
          article.category.toUpperCase() === activeCategory) &&
        (article.title.toLowerCase().includes(term) ||
          article.excerpt.toLowerCase().includes(term))
    );
  }, [articles, featuredArticle, searchTerm, activeCategory]);

  const categories = useMemo(() => {
      const all = ['ALL_LOGS'];
      const unique = [...new Set(articles.map(a => a.category.toUpperCase()))];
      return [...all, ...unique.filter(c => c !== 'ALL_LOGS')];
  }, [articles]);

  if (loading) {
    return <div className="bg-bg-color text-text-color min-h-screen flex items-center justify-center">Loading Transmission Log...</div>;
  }
  
  if (!featuredArticle) {
      return <div className="bg-bg-color text-text-color min-h-screen flex items-center justify-center">No articles found.</div>;
  }

  return (
    <>
      <header className="blog-header">
        <div className="header-meta">
          <span>// DATABASE ACCESS</span>
          <span>LOGS: {articles.length}</span>
        </div>
        <h1 className="blog-title">
          Transmission
          <br />
          Log.
        </h1>
      </header>

      <nav className="controls-bar">
        <div className="categories">
            {categories.map(cat => (
                <button 
                    key={cat} 
                    className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
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
            src={featuredArticle.image}
            alt={featuredArticle.imageAlt}
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

      <section className="blog-grid">
        {filteredArticles.map(article => (
          <Link href={`/blog/${article.id}`} className="article-card" key={article.id}>
            <div className="art-img-wrapper">
              <Image
                src={article.image}
                alt={article.imageAlt}
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

      <section className="newsletter-section">
        <div className="nl-text">
          <h3>Subscribe to Signals</h3>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            // GET_WEEKLY_UPDATES // NO_SPAM
          </p>
        </div>
        <form className="nl-form">
          <input
            type="email"
            className="nl-input"
            placeholder="INPUT_EMAIL_ADDRESS"
          />
          <button type="submit" className="nl-btn">
            INIT
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
}
