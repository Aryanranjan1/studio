
import { getArticles } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { format } from 'date-fns';

export function BlogSection() {
  const articles = getArticles();
  const latestArticle = articles[0];
  const otherArticles = articles.slice(1, 4);

  return (
    <section className="bg-background py-24 sm:py-32 border-t border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="relative">
            <h2 className="font-headline text-3xl font-bold sm:text-4xl">
              latest story blog
            </h2>
            <div className="absolute -bottom-2 left-0 h-1 w-2/3 bg-primary" />
          </div>
          <Button asChild variant="outline">
            <Link href="/blog">
              Read all articles
            </Link>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Featured Article */}
          <Link href={`/blog/${latestArticle.id}`} className="group">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={latestArticle.image}
                alt={latestArticle.imageAlt}
                width={800}
                height={600}
                loading="lazy"
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-6">
              <p className="font-semibold text-primary">{latestArticle.category}</p>
              <h3 className="mt-2 font-headline text-2xl font-bold group-hover:text-primary">
                {latestArticle.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {format(new Date(latestArticle.date), 'MMMM do, yyyy')} • by {latestArticle.author}
              </p>
              <p className="mt-4 text-muted-foreground">
                {latestArticle.excerpt}
              </p>
            </div>
          </Link>

          {/* Article List */}
          <div className="flex flex-col gap-8">
            {otherArticles.map(article => (
              <Link href={`/blog/${article.id}`} key={article.id} className="group flex items-center gap-6">
                 <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                 </div>
                 <div>
                    <p className="font-semibold text-primary">{article.category}</p>
                    <h4 className="mt-1 font-headline text-lg font-bold group-hover:text-primary">
                      {article.title}
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {format(new Date(article.date), 'MMMM do, yyyy')}
                    </p>
                 </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
