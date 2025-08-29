
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import type { Project } from "@/lib/data";
import { ScrollReveal } from "./scroll-reveal";

interface PortfolioCardProps {
  project: Project;
  index: number;
}

export function PortfolioCard({ project, index }: PortfolioCardProps) {
  return (
    <ScrollReveal delay={index * 100}>
      <Link href={`/work/${project.slug}`}>
        <Card className="group h-full overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2">
          <CardHeader className="p-0">
            <div className="relative h-60 w-full overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                data-ai-hint={project.imageHint}
              />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <CardTitle className="font-headline text-xl mb-2">{project.title}</CardTitle>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.services?.map((service) => (
                <Badge key={service} variant="secondary">
                  {service}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{project.summary}</p>
          </CardContent>
        </Card>
      </Link>
    </ScrollReveal>
  );
}
