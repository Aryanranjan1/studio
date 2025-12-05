'use client';

import { getProjects } from '@/lib/data';
import Link from 'next/link';
import { ArrowRight, MoveRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { useEffect, useState } from 'react';
import type { Project } from '@/lib/data';

const FeaturedProjectColumn = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  return (
    <Link
      href={`/portfolio/${project.id}`}
      className="group relative flex h-[80vh] flex-col justify-between overflow-hidden border-r border-border p-6 transition-all duration-500 hover:bg-black"
      style={{'--bg-image': `url(${project.image})`} as React.CSSProperties}
    >
      <div className="absolute inset-0 z-0 bg-[image:var(--bg-image)] bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
       <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-20 flex flex-grow items-center justify-center">
        <span className="font-headline text-8xl font-thin text-foreground transition-opacity duration-500 group-hover:opacity-0">
          0{index + 1}
        </span>
      </div>
      <div className="relative z-20">
        <Badge
          variant="outline"
          className="mt-4 rounded-full border-foreground/50 bg-transparent px-4 py-2 text-sm uppercase text-foreground transition-colors duration-500 group-hover:border-white/50 group-hover:bg-white/10 group-hover:text-white"
        >
          {project.technologies[0]}
        </Badge>
        <h3 className="mt-4 font-headline text-2xl font-bold text-foreground transition-colors duration-500 group-hover:text-white">
          {project.title}
        </h3>
        <p className="max-w-xs text-sm text-white/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            {project.description}
        </p>
        <MoveRight className="mt-4 h-6 w-6 text-foreground transition-all duration-500 group-hover:translate-x-2 group-hover:text-white" />
      </div>
    </Link>
  );
};

export function FeaturedPortfolio() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    const allProjects = getProjects();
    const projectsWithFeatured = allProjects.filter(p => p.featured);
    // Get 4 random featured projects
    const randomProjects = projectsWithFeatured.sort(() => 0.5 - Math.random()).slice(0, 4);
    setFeaturedProjects(randomProjects);
  }, []);

  if (featuredProjects.length < 4) {
    return null;
  }

  return (
    <section className="border-t border-border bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {featuredProjects.map((project, index) => (
          <FeaturedProjectColumn
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
