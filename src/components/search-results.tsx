
'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import {
  type Project,
  type Article,
  type Template,
} from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Briefcase, ShoppingBag, ArrowRight } from 'lucide-react';

type SearchResultsProps = {
  projects: Project[];
  articles: Article[];
  templates: Template[];
};

export function SearchResults({
  projects,
  articles,
  templates,
}: SearchResultsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();

    // No search term, show some featured items from each category
    if (term === '') {
        setFilteredProjects(projects.filter(p => p.featured).slice(0, 4));
        setFilteredArticles(articles.filter(a => a.popular).slice(0, 4));
        setFilteredTemplates(templates.slice(0, 4));
        return;
    }

    setFilteredProjects(
      projects.filter(
        p =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.technologies.some(t => t.toLowerCase().includes(term))
      )
    );

    setFilteredArticles(
      articles.filter(
        a =>
          a.title.toLowerCase().includes(term) ||
          a.excerpt.toLowerCase().includes(term) ||
          a.content.toLowerCase().includes(term) ||
          a.tags.some(t => t.toLowerCase().includes(term))
      )
    );

    setFilteredTemplates(
      templates.filter(
        t =>
          t.title.toLowerCase().includes(term) ||
          t.description.toLowerCase().includes(term) ||
          t.tags.some(t => t.toLowerCase().includes(term))
      )
    );
  }, [searchTerm, projects, articles, templates]);

  const hasResults = filteredProjects.length > 0 || filteredArticles.length > 0 || filteredTemplates.length > 0;
  const isSearching = searchTerm.length > 0;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-center sm:text-5xl lg:text-6xl">
            Find What You&apos;re Looking For
        </h1>
        <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground text-center">
            Search through our projects, articles, and templates to find the
            information you need.
        </p>
        <Input
            type="search"
            placeholder="Search projects, articles, templates..."
            className="h-14 text-lg mt-8 max-w-2xl mx-auto"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mt-12 space-y-16">
        {isSearching && !hasResults && (
            <div className="text-center py-16">
                <p className="text-2xl font-semibold text-muted-foreground">No results found for &quot;{searchTerm}&quot;</p>
                <p className="mt-4 text-muted-foreground">Try a different search term or explore our featured content below.</p>
            </div>
        )}

        {(isSearching ? filteredProjects.length > 0 : true) && (
          <section>
            <div className="flex items-center gap-3 mb-8">
                <Briefcase className="h-7 w-7 text-primary" />
                <h2 className="font-headline text-3xl font-bold">{isSearching ? 'Projects' : 'Featured Projects'}</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {filteredProjects.map(project => (
                <Link href={`/portfolio/${project.id}`} key={project.id} className="group">
                  <Card className="flex h-full items-center overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10">
                    <div className="relative h-28 w-28 flex-shrink-0">
                      <Image src={project.image} alt={project.imageAlt} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <p className="font-headline text-lg font-bold group-hover:text-primary">{project.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                    </div>
                    <ArrowRight className="ml-auto mr-6 h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {(isSearching ? filteredTemplates.length > 0 : true) && (
          <section>
            <div className="flex items-center gap-3 mb-8">
                <ShoppingBag className="h-7 w-7 text-primary" />
                <h2 className="font-headline text-3xl font-bold">{isSearching ? 'Templates' : 'Popular Templates'}</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {filteredTemplates.map(template => (
                <Link href={`/store/${template.id}`} key={template.id} className="group">
                  <Card className="flex h-full items-center overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10">
                     <div className="relative h-28 w-28 flex-shrink-0">
                      <Image src={template.image} alt={template.imageAlt} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="p-4 flex-grow">
                      <p className="font-headline text-lg font-bold group-hover:text-primary">{template.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
                    </div>
                     <p className="ml-auto text-xl font-bold text-primary mr-6">${template.price}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {(isSearching ? filteredArticles.length > 0 : true) && (
          <section>
            <div className="flex items-center gap-3 mb-8">
                <BookOpen className="h-7 w-7 text-primary" />
                <h2 className="font-headline text-3xl font-bold">{isSearching ? 'Articles' : 'Latest Articles'}</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {filteredArticles.map(article => (
                <Link href={`/blog/${article.id}`} key={article.id} className="group">
                  <Card className="flex h-full items-center overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10">
                     <div className="relative h-28 w-28 flex-shrink-0">
                      <Image src={article.image} alt={article.imageAlt} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <p className="font-headline text-lg font-bold group-hover:text-primary">{article.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                    </div>
                    <ArrowRight className="ml-auto mr-6 h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
