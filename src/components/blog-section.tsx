import { getArticles } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

export function BlogSection() {
  const articles = getArticles().slice(0, 2); // Show first 2 articles

  return (
    <section className="bg-muted/30 py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge
            variant="outline"
            className="mb-4 border-primary/50 text-primary"
          >
            Insights
          </Badge>
          <h2 className="font-headline text-3xl font-bold sm:text-4xl">
            From Our Blog
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            The latest news, articles, and resources from our team.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {articles.map(article => (
            <Link
              href={`/blog/${article.id}`}
              key={article.id}
              className="group"
            >
              <Card className="h-full overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-primary/10">
                <div className="relative h-64 w-full">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">
                    {article.date}
                  </p>
                  <h3 className="mt-2 font-headline text-xl font-bold group-hover:text-primary">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {article.excerpt}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/blog">
              Visit Our Blog <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
