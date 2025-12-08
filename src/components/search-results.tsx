
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
import { Badge } from '@/components/ui/badge';

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
    <div className="grid grid-cols-12 gap-px bg-neutral-800">
        <div className="col-span-12 bg-black p-8 md:p-12">
            <Input
                type="search"
                placeholder="Search projects, articles, templates..."
                className="h-14 text-lg max-w-2xl mx-auto"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>

      {isSearching && !hasResults && (
            <div className="col-span-12 bg-black p-8 md:p-12 text-center py-16">
                <p className="text-2xl font-semibold text-muted-foreground">No results found for &quot;{searchTerm}&quot;</p>
                <p className="mt-4 text-muted-foreground">Try a different search term or explore our featured content below.</p>
            </div>
        )}

        {(isSearching ? filteredProjects.length > 0 : true) && (
          <>
            <div className="col-span-12 bg-black p-8 md:p-12">
                <div className="flex items-center gap-3">
                    <Briefcase className="h-7 w-7 text-primary" />
                    <h2 className="font-headline text-3xl font-bold">{isSearching ? 'Projects' : 'Featured Projects'}</h2>
                </div>
            </div>
            {filteredProjects.map(project => (
                <div key={project.id} className="col-span-12 md:col-span-6 bg-black">
                    <Link href={`/portfolio/${project.id}`} className="group h-full block">
                        <Card className="h-full overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-primary/10 rounded-none border-transparent">
                            <div className="relative aspect-video w-full">
                            <Image src={project.image} alt={project.imageAlt} fill className="object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                            </div>
                            <CardContent className="p-6">
                            <Badge variant="outline" className="border-primary/50 text-primary">{project.category}</Badge>
                            <p className="font-headline text-xl font-bold mt-4 group-hover:text-primary">{project.title}</p>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{project.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            ))}
          </>
        )}

        {(isSearching ? filteredTemplates.length > 0 : true) && (
            <>
                <div className="col-span-12 bg-black p-8 md:p-12">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="h-7 w-7 text-primary" />
                        <h2 className="font-headline text-3xl font-bold">{isSearching ? 'Templates' : 'Popular Templates'}</h2>
                    </div>
                </div>
                {filteredTemplates.map(template => (
                    <div key={template.id} className="col-span-12 md:col-span-6 bg-black">
                        <Link href={`/store/${template.id}`} className="group h-full block">
                        <Card className="h-full overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-primary/10 rounded-none border-transparent">
                            <div className="relative aspect-video w-full">
                            <Image src={template.image} alt={template.imageAlt} fill className="object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                            </div>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start">
                                    <Badge variant="secondary">{template.tags[0]}</Badge>
                                    <p className="text-xl font-bold text-primary">${template.price}</p>
                                </div>
                            <p className="font-headline text-xl font-bold mt-4 group-hover:text-primary">{template.title}</p>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{template.description}</p>
                            </CardContent>
                        </Card>
                        </Link>
                    </div>
                ))}
          </>
        )}

        {(isSearching ? filteredArticles.length > 0 : true) && (
            <>
                <div className="col-span-12 bg-black p-8 md:p-12">
                    <div className="flex items-center gap-3">
                        <BookOpen className="h-7 w-7 text-primary" />
                        <h2 className="font-headline text-3xl font-bold">{isSearching ? 'Articles' : 'Latest Articles'}</h2>
                    </div>
                </div>
                {filteredArticles.map(article => (
                    <div key={article.id} className="col-span-12 md:col-span-6 bg-black">
                        <Link href={`/blog/${article.id}`} className="group h-full block">
                            <Card className="h-full overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-primary/10 rounded-none border-transparent">
                                <div className="relative aspect-video w-full">
                                <Image src={article.image} alt={article.imageAlt} fill className="object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                                </div>
                                <CardContent className="p-6">
                                <Badge variant="outline" className="border-primary/50 text-primary">{article.category}</Badge>
                                <p className="font-headline text-xl font-bold mt-4 group-hover:text-primary">{article.title}</p>
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{article.excerpt}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
              ))}
          </>
        )}
    </div>
  );
}
