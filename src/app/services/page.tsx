
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getServices } from '@/lib/data';
import { ArrowRight, Bot, Code, Palette, Megaphone } from 'lucide-react';
import Link from 'next/link';

const iconComponents: { [key: string]: React.ElementType } = {
  Code,
  Palette,
  Bot,
  Megaphone,
};

export default function ServicesPage() {
  const services = getServices();

  return (
    <div className="w-full bg-background text-foreground">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center">
          <Badge
            variant="outline"
            className="border-primary/50 text-primary"
          >
            Our Services
          </Badge>
          <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            A Partner for Your Digital Growth
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            From foundational branding to complex web applications, we provide
            the expertise to elevate your business in the digital landscape.
          </p>
        </section>

        {/* Services Grid */}
        <section className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service) => {
              const IconComponent = iconComponents[service.icon];
              return (
                <Card
                  key={service.id}
                  className="flex flex-col overflow-hidden"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-headline text-2xl">
                        {service.title}
                      </CardTitle>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">
                      {service.longDescription}
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      {service.kpis.map((kpi, index) => (
                        <div key={index}>
                          <p className="text-2xl font-bold text-primary">
                            {kpi.value}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {kpi.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <div className="border-t border-border p-6">
                      <Link href={`/portfolio?category=${service.id}`} className="group inline-flex items-center font-semibold text-primary">
                          View Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
