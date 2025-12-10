
'use client';

import { getArticles } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import type { Article } from '@/lib/data';
import './page.css';
import { Footer } from '@/components/footer';

export default function ArticlePage() {
  const params = useParams();
  const id = params.id as string;
  
  const [article, setArticle] = useState<Article | null>(null);
  const [nextArticle, setNextArticle] = useState<Article | null>(null);
  const [otherArticles, setOtherArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [headings, setHeadings] = useState<{ id: string; text: string | null }[]>([]);
  const [activeId, setActiveId] = useState('');
  const contentRef = useRef<HTMLElement>(null);

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


  useEffect(() => {
    if (!id) return;
    
    const allArticles = getArticles();
    const currentArticleIndex = allArticles.findIndex(a => a.id === id);
    const currentArticle = allArticles[currentArticleIndex];

    if (currentArticle) {
      setArticle(currentArticle);
      document.title = `Ampire Log // ${currentArticle.title}`;
      
      const next = allArticles[currentArticleIndex + 1] || allArticles[0];
      setNextArticle(next);

      setOtherArticles(
        allArticles.filter(a => a.id !== currentArticle.id && a.id !== next.id).slice(0, 2)
      );

      // Simulate TOC generation after render
      setTimeout(() => {
          const foundHeadings = Array.from(contentRef.current?.querySelectorAll('h2') || []).map(h => ({
              id: h.id,
              text: h.textContent
          }));
          setHeadings(foundHeadings);
      }, 100);

    } else {
      notFound();
    }
    setLoading(false);
  }, [id]);


  if (loading || !article) {
    return (
      <div className="w-full min-h-screen bg-bg-color text-text-color flex items-center justify-center">
        Accessing Transmission Log...
      </div>
    );
  }

  return (
    <>
      <div className="progress-container">
        <div className="progress-bar" id="progressBar"></div>
      </div>

      <nav className="nav-bread">
        <Link href="/blog">&lt; BACK_TO_LOGS</Link>
        <span>LOG_ID: {article.id.replace('article-', '')}</span>
      </nav>

      <div className='mt-[64px]'>
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

            <article className="article-body" ref={contentRef}>
                <p id="intro" className="lead-text">{article.excerpt}</p>
                <p>{article.content}</p>

                <h2 id="section-1">The Monolith Problem</h2>
                <p>The traditional CMS forces you to play by its rules. You want a custom interaction? You need a plugin. You want to optimize your Largest Contentful Paint (LCP)? Good luck fighting the 40 scripts the theme injected automatically.</p>
                
                <blockquote>
                    "The web was never meant to be rendered by a PHP server in 2025. It was meant to be compiled at the edge."
                </blockquote>

                <p>This restriction of creativity and performance is why agencies like ours have moved entirely to the "Modern Stack"—Next.js, Tailwind, and a Headless CMS.</p>

                <h2 id="section-2">The Headless Future</h2>
                <p>A headless CMS separates the <strong>Body</strong> (the content repository) from the <strong>Head</strong> (the frontend display). This allows us to push content not just to a website, but to mobile apps, smartwatches, and even billboard displays from a single source of truth.</p>

                <h2 id="section-3">Implementation</h2>
                <p>Here is a simplified example of how we fetch data in this new world using a modern stack. Notice the lack of boilerplate.</p>

                <div className="code-block">
                    <div className="code-header">/lib/data.ts</div>
                    <div className="code-content">
                        <span className="kw">export async function</span> <span className="func">getPosts</span>() {'{'} <br/>
                        {'  '}<span className="kw">const</span> query = <span className="str">`*[_type == "post"]`</span>; <br/>
                        {'  '}<span className="kw">return</span> client.fetch(query); <br/>
                        {'}'}
                    </div>
                </div>

                <p>This level of control allows us to render exactly what we need, when we need it. No bloat. No compromise.</p>

                <h2 id="conclusion">Conclusion</h2>
                <p>The transition is painful for legacy developers, but essential. Speed is the currency of the modern web, and monoliths are bankrupt.</p>
            </article>
        </div>
        
        {/* Recommendation Section */}
        <section className="recommendation-section">
            <h2 className="rec-title">Further Reading</h2>
            <div className="rec-grid">
                {otherArticles.map(rec => (
                    <Link href={`/blog/${rec.id}`} key={rec.id} className="article-card">
                        <div className="art-img-wrapper">
                            <Image src={rec.image} alt={rec.imageAlt} width={500} height={300} className="art-img" loading="lazy" />
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
