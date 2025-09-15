import { getArticles, getServices } from '@/lib/data';
import type { Article, Service } from '@/lib/data';
import ArticlesPageClient from './articles-client'; // We'll create this file

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function ArticlesPage() {
  // Fetch data on the server
  const articles: Article[] = await getArticles();
  const services: Service[] = await getServices();
  const allTags: string[] = services.map(s => s.title);

  // Pass data as props to the client component
  return <ArticlesPageClient articles={articles} allTags={allTags} />;
}
