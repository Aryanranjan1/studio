import { Badge } from '@/components/ui/badge';
import { getArticles, getProjects, getTemplates } from '@/lib/data';
import { SearchResults } from '@/components/search-results';

export default function SearchPage() {
  const projects = getProjects();
  const articles = getArticles();
  const templates = getTemplates();

  return (
    <div className="w-full bg-background text-foreground">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center">
          <Badge
            variant="outline"
            className="border-primary/50 text-primary"
          >
            Search
          </Badge>
          <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Find What You&apos;re Looking For
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Search through our projects, articles, and templates to find the
            information you need.
          </p>
        </section>

        <section className="mt-16">
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
