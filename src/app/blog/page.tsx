import { getArticles } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';

export default function BlogPage() {
  const articles = getArticles();

  return (
    <div className="w-full bg-background text-foreground">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center">
          <Badge
            variant="outline"
            className="border-primary/50 text-primary"
          >
            Insights & Articles
          </Badge>
          <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            From Our Desk
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Thoughts on design, development, and the future of the web.
          </p>
        </section>

        {/* Articles Grid */}
        <section className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link href={`/blog/${article.id}`} key={article.id} className="group">
                <Card className="h-full overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-primary/10">
                  <div className="relative h-56 w-full">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/40" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{article.author}</span>
                      </div>
                    </div>
                    <h2 className="mt-4 font-headline text-xl font-bold group-hover:text-primary">
                      {article.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {article.excerpt}
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