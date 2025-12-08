
import { getArticles, getProjects, getTemplates } from '@/lib/data';
import { SearchResults } from '@/components/search-results';

export default function SearchPage() {
  const projects = getProjects();
  const articles = getArticles();
  const templates = getTemplates();

  return (
    <div className="w-full bg-background text-foreground">
      <main>
         <div className="grid grid-cols-12 gap-px border-l border-r border-neutral-800 bg-neutral-800">
            <div className="col-span-12 bg-black py-16">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <SearchResults
                        projects={projects}
                        articles={articles}
                        templates={templates}
                    />
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
