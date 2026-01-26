
'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef, useMemo } from 'react';
import type { Article } from '@/lib/data';
import './page.css';
import { Footer } from '@/components/footer';
import { useDoc, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { doc, collection, query, orderBy } from 'firebase/firestore';

export default function ArticlePage() {
  const params = useParams();
  const id = params.id as string;
  const firestore = useFirestore();
  
  // Fetch the current article
  const articleRef = useMemoFirebase(() => {
      if (!firestore || !id) return null;
      return doc(firestore, 'blogs', id);
  }, [firestore, id]);
  const { data: article, isLoading: articleLoading } = useDoc<Article>(articleRef);
  
  // Fetch other articles for recommendations
  const articlesQuery = useMemoFirebase(() => {
      if (!firestore) return null;
      return query(collection(firestore, 'blogs'), orderBy('date', 'desc'));
  }, [firestore]);
  const { data: allArticles } = useCollection<Article>(articlesQuery);

  const [nextArticle, setNextArticle] = useState<Article | null>(null);
  const [otherArticles, setOtherArticles] = useState<Article[]>([]);
  const [headings, setHeadings] = useState<{ id: string; text: string | null }[]>([]);
  const [activeId, setActiveId] = useState('');
  const contentRef = useRef<HTMLElement>(null);
  
  // Find next and other articles once all articles are loaded
  useEffect(() => {
    if (article && allArticles) {
        document.title = `Ampire Log // ${article.title}`;
        const currentArticleIndex = allArticles.findIndex(a => a.id === article.id);

        if (currentArticleIndex !== -1) {
            const next = allArticles[currentArticleIndex + 1] || allArticles[0];
            setNextArticle(next);

            setOtherArticles(
                allArticles.filter(a => a.id !== article.id && a.id !== next?.id).slice(0, 2)
            );
        }
        
        // TOC generation
        setTimeout(() => {
            if (!contentRef.current) return;
            const headingElements = Array.from(contentRef.current.querySelectorAll('h2'));
            const foundHeadings = headingElements.map((h, index) => {
                const text = h.textContent || `section-${index + 1}`;
                const id = h.id || text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                h.id = id; // Ensure the element has an ID
                return { id, text };
            });
            setHeadings(foundHeadings);
        }, 100);
    }
  }, [article, allArticles]);

  // Scroll and progress bar effect
  useEffect(() => {
    const handleScroll = () => {
      const progressBar = document.getElementById('progressBar');
      if (!progressBar) return;
      
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // TOC active state effect
  useEffect(() => {
    if (!contentRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` }
    );
    
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      headings.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [headings]);


  if (articleLoading) {
    return (
      <div className="w-full min-h-screen bg-background text-foreground flex items-center justify-center">
        Accessing Transmission Log...
      </div>
    );
  }
  
  if (!article) {
    return (
       <div className="w-full min-h-screen bg-background text-foreground flex items-center justify-center">
        Article not found. Has the data been seeded in the admin panel?
      </div>
    )
  }

  return (
    <>
      <div className="progress-container">
        <div className="progress-bar" id="progressBar"></div>
      </div>

      <nav className="nav-bread">
        <Link href="/blog">&lt; BACK_TO_LOGS</Link>
        <span>LOG_ID: {article.id.slice(0, 8)}</span>
      </nav>

      <div className='mt-[64px] bg-background text-foreground'>
        <header className="article-hero">
            <div className="hero-meta">{article.category.toUpperCase()} // ANALYSIS</div>
            <h1 className="article-title">{article.title}</h1>
            
            <div className="meta-grid">
                <div className="meta-item">
                    <strong>AUTHOR</strong>
                    <span>{article.author.replace(' ', '_').toUpperCase()}</span>
                </div>
                <div className="meta-item">
                    <strong>DATE</strong>
                    <span>{new Date(article.date).toISOString().split('T')[0].replace(/-/g, '.')}</span>
                </div>
                <div className="meta-item">
                    <strong>READ TIME</strong>
                    <span>{String(article.readingTime).padStart(2, '0')} MIN</span>
                </div>
                <div className="meta-item">
                    <strong>STATUS</strong>
                    <span>ARCHIVED</span>
                </div>
            </div>
        </header>

        <div className="content-wrapper">
            <aside className="sidebar">
                <div className="toc-title">Directory</div>
                <ul className="toc-list">
                    {headings.map((h, i) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className={activeId === h.id ? 'active' : ''}>
                          {String(i + 1).padStart(2, '0')}. {h.text}
                        </a>
                      </li>
                    ))}
                </ul>
            </aside>

            <article className="article-body" ref={contentRef} dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
        
        {otherArticles.length > 0 && (
            <section className="recommendation-section">
                <h2 className="rec-title">Further Reading</h2>
                <div className="rec-grid">
                    {otherArticles.map(rec => (
                        <Link href={`/blog/${rec.id}`} key={rec.id} className="article-card">
                            <div className="art-img-wrapper">
                                <Image src={rec.cardImage.url} alt={rec.cardImage.alt} width={500} height={300} className="art-img" loading="lazy" />
                            </div>
                            <div className="art-body">
                                <div className="art-meta">
                                    <span>{new Date(rec.date).toISOString().split('T')[0].replace(/-/g, '.')}</span>
                                    <span>[ READ: {String(rec.readingTime).padStart(2, '0')}m ]</span>
                                </div>
                                <h3 className="art-title">{rec.title}</h3>
                                <div className="art-footer">READ_ENTRY &rarr;</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        )}


        {nextArticle && (
            <div className="next-post">
                <span className="next-label">NEXT_TRANSMISSION &darr;</span>
                <Link href={`/blog/${nextArticle.id}`} className="next-title">{nextArticle.title}</Link>
            </div>
        )}
        
        <Footer />
      </div>
    </>
  );
}
