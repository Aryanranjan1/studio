
import type { Article } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { format } from 'date-fns';

type BlogPostCardProps = {
  article: Article;
};

export function BlogPostCard({ article }: BlogPostCardProps) {
    const formattedDate = format(new Date(article.date), "d MMM yyyy");

  return (
    <Link href={`/blog/${article.id}`} className="group flex flex-col">
      <div className="relative mb-4 h-56 w-full overflow-hidden rounded-xl">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="font-headline text-xl font-bold group-hover:text-primary">
        {article.title}
      </h3>
      <p className="mt-2 text-muted-foreground flex-grow">
        {article.excerpt}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <Avatar className="h-8 w-8">
            <AvatarImage src={article.authorImage} alt={article.author} />
            <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
            <p className="text-sm font-semibold">{article.author}</p>
            <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>
      </div>
    </Link>
  );
}
