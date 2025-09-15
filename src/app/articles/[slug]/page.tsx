import Image from 'next/image';
import { getArticleBySlug } from '@/lib/data';
import type { Article } from '@/lib/data';
import { PageTitleHeader } from '@/components/page-title-header';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import type { Metadata } from 'next';

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const article = await getArticleBySlug(params.slug);
  
    if (!article) {
      return {
        title: 'Article Not Found',
      };
    }
  
    return {
      title: `${article.title} | AMpire Studio`,
      description: article.content.substring(0, 160) + '...',
      openGraph: {
        title: article.title,
        description: article.content.substring(0, 160) + '...',
        images: [
          {
            url: article.imageUrl,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
      },
    };
  }

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return (
        <div className="flex min-h-screen flex-col bg-transparent text-foreground">
            <main className="flex-1">
                <PageTitleHeader 
                    title="Article Not Found"
                    subtitle="Sorry, we couldn't find the article you're looking for."
                />
            </main>
            <Footer />
        </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1 relative">
        <section className="relative flex h-[50vh] min-h-[400px] items-center justify-center text-white">
            <div className="absolute inset-0 z-0">
                <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    priority
                    className="object-cover"
                    data-ai-hint="article feature background"
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>
            <div className="relative z-10 text-center container">
                <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    {article.title}
                </h1>
            </div>
        </section>

        <div className="container py-16 sm:py-24">
            <article className="prose prose-invert mx-auto max-w-3xl">
                <div className="flex items-center gap-6 mb-8 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>By Ampire Studios</span>
                    </div>
                </div>
                <p className="whitespace-pre-line text-lg leading-relaxed text-foreground/80">
                    {article.content}
                </p>
            </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
