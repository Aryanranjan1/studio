import { getServices } from '@/lib/data';
import { ArrowRight, Bot, Code, Megaphone, Palette } from 'lucide-react';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const iconComponents: { [key: string]: React.ElementType } = {
  Code,
  Palette,
  Bot,
  Megaphone,
};

export function ServicesSection() {
  const services = getServices().slice(0, 2); // Show first 2 services

  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-1">
            <Badge
              variant="outline"
              className="mb-4 border-primary/50 text-primary"
            >
              Our Services
            </Badge>
            <h2 className="font-headline text-3xl font-bold sm:text-4xl">
              What We Do
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We provide a complete suite of services to help your business
              succeed in the digital world.
            </p>
            <Button asChild className="mt-8" size="lg">
              <Link href="/services">
                View All Services <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {services.map(service => {
                const Icon = iconComponents[service.icon];
                return (
                  <Card key={service.id} className="h-full">
                    <CardHeader>
                      {Icon && <Icon className="mb-4 h-8 w-8 text-primary" />}
                      <CardTitle className="font-headline text-xl">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
