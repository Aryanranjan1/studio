import { getArticles } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function ArticlePage({ params }: { params: { id: string } }) {
  const articles = getArticles();
  const article = articles.find((a) => a.id === params.id);

  if (!article) {
    notFound();
  }

  const otherArticles = articles.filter(a => a.id !== params.id).slice(0, 2);

  return (
    <div className="bg-background text-foreground">
      <div className="relative h-[400px] w-full">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      <main className="container mx-auto -mt-32 px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="rounded-lg bg-card p-8 shadow-lg">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
            </div>

            <h1 className="mt-4 font-headline text-3xl font-bold sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <article className="prose prose-invert mt-12 max-w-none">
            {/* The article content will be rendered here. For now, it's just a placeholder. */}
            <p>{article.content}</p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                <p>This is a highlighted quote from the article, designed to draw the reader's attention to a key point. It stands out visually from the rest of the content.</p>
            </blockquote>
            <p>The rest of the article continues here, with more insights and information for the reader.</p>
          </article>
        </div>

         {/* Other Articles Section */}
         <section className="mt-24 border-t border-border pt-16">
          <h2 className="text-center font-headline text-3xl font-bold">
            More Articles
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {otherArticles.map((otherArticle) => (
              <Link href={`/blog/${otherArticle.id}`} key={otherArticle.id} className="group">
                <Card className="h-full overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-primary/10">
                  <div className="relative h-48 w-full">
                    <Image
                      src={otherArticle.image}
                      alt={otherArticle.imageAlt}
                      fill
                      className="object-cover"
                    />
                     <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/40" />
                  </div>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">{otherArticle.date}</p>
                    <h3 className="mt-2 font-headline text-xl font-bold group-hover:text-primary">
                      {otherArticle.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {otherArticle.excerpt}
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
