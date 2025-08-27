import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { AiSummary } from "./ai-summary";
import type { Project } from "@/lib/data";
import { ScrollReveal } from "./scroll-reveal";

interface PortfolioCardProps {
  project: Project;
  index: number;
}

export function PortfolioCard({ project, index }: PortfolioCardProps) {
  return (
    <ScrollReveal delay={index * 100}>
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-60 w-full">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              data-ai-hint={project.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="font-headline text-xl mb-2">{project.title}</CardTitle>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.services.map((service) => (
              <Badge key={service} variant="secondary">
                {service}
              </Badge>
            ))}
          </div>
          <AiSummary description={project.longDescription} />
        </CardContent>
      </Card>
    </ScrollReveal>
  );
}
