
import { getArticles, getProjects, getTemplates } from '@/lib/data';
import { SearchResults } from '@/components/search-results';

export default function SearchPage() {
  const projects = getProjects();
  const articles = getArticles();
  const templates = getTemplates();

  return (
    <div className="w-full bg-background text-foreground">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <section>
          <SearchResults
            projects={projects}
            articles={articles}
            templates={templates}
          />
        </section>
      </main>
    </div>
  );
}
