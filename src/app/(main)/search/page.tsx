
import { getArticles, getProjects, getTemplates } from '@/lib/data';
import { SearchResults } from '@/components/search-results';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Search',
    description: 'Search for projects, articles, and templates from Ampire Studio.',
};

export default function SearchPage() {
  const projects = getProjects();
  const articles = getArticles();
  const templates = getTemplates();

  return (
    <div className="w-full bg-background text-foreground">
      <main>
         <div className="grid grid-cols-12 gap-px border-l border-r border-neutral-800 bg-black">
            <div className="col-span-12 bg-black">
                <SearchResults
                    projects={projects}
                    articles={articles}
                    templates={templates}
                />
            </div>
        </div>
      </main>
    </div>
  );
}
