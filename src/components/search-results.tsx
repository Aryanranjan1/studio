
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
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Briefcase, ShoppingBag } from 'lucide-react';

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
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(templates);

  useEffect(() => {
    const term = searchTerm.toLowerCase();

    if (term === '') {
      setFilteredProjects(projects);
      setFilteredArticles(articles);
      setFilteredTemplates(templates);
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

  return (
    <div className="mx-auto max-w-4xl">
      <Input
        type="search"
        placeholder="Search projects, articles, templates..."
        className="h-12 text-lg"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <div className="mt-12 space-y-12">
        {searchTerm && !hasResults && (
            <div className="text-center">
                <p className="text-lg font-semibold text-muted-foreground">No results found for &quot;{searchTerm}&quot;</p>
                <p className="mt-2 text-muted-foreground">Try a different search term.</p>
            </div>
        )}

        {filteredProjects.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
                <Briefcase className="h-6 w-6 text-primary" />
                <h2 className="font-headline text-2xl font-bold">Projects</h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {filteredProjects.map(project => (
                <Link href={`/portfolio/${project.id}`} key={project.id} className="group">
                  <Card className="flex h-full items-center overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10">
                    <div className="relative h-24 w-24 flex-shrink-0">
                      <Image src={project.image} alt={project.imageAlt} fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <p className="font-headline text-lg font-bold group-hover:text-primary">{project.title}</p>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    <ArrowRight className="ml-auto mr-4 h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {filteredTemplates.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <h2 className="font-headline text-2xl font-bold">Templates</h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {filteredTemplates.map(template => (
                <Link href={`/store/${template.id}`} key={template.id} className="group">
                  <Card className="flex h-full items-center overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10">
                     <div className="relative h-24 w-24 flex-shrink-0">
                      <Image src={template.image} alt={template.imageAlt} fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <p className="font-headline text-lg font-bold group-hover:text-primary">{template.title}</p>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                     <p className="ml-auto text-lg font-bold text-primary mr-4">${template.price}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {filteredArticles.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
                <BookOpen className="h-6 w-6 text-primary" />
                <h2 className="font-headline text-2xl font-bold">Articles</h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {filteredArticles.map(article => (
                <Link href={`/blog/${article.id}`} key={article.id} className="group">
                  <Card className="flex h-full items-center overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10">
                     <div className="relative h-24 w-24 flex-shrink-0">
                      <Image src={article.image} alt={article.imageAlt} fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <p className="font-headline text-lg font-bold group-hover:text-primary">{article.title}</p>
                      <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                    </div>
                    <ArrowRight className="ml-auto mr-4 h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
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
