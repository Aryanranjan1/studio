
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getTemplates } from '@/lib/data';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function StorePage() {
  const templates = getTemplates();

  return (
    <div className="w-full bg-background text-foreground">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-px border-l border-r border-neutral-800 bg-neutral-800">
          <div className="col-span-12 bg-black">
            {/* Hero Section */}
            <section className="text-center py-16">
              <Badge
                variant="outline"
                className="border-primary/50 text-primary"
              >
                Digital Products
              </Badge>
              <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Premium Templates & Resources
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Accelerate your projects with our professionally designed and
                developed digital assets.
              </p>
            </section>
          </div>

          <div className="col-span-12 bg-black">
            {/* Templates Grid */}
            <section className="py-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                  <Link
                    href={`/store/${template.id}`}
                    key={template.id}
                    className="group"
                  >
                    <Card className="h-full overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/10">
                      <div className="relative h-64 w-full">
                        <Image
                          src={template.image}
                          alt={template.imageAlt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/40" />
                        <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/50 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                          <ShoppingCart className="h-5 w-5" />
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <h2 className="font-headline text-xl font-bold group-hover:text-primary">
                            {template.title}
                          </h2>
                          <p className="text-lg font-bold text-primary">
                            ${template.price}
                          </p>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {template.description}
                        </p>
                         <div className="mt-4 flex flex-wrap gap-2">
                            {template.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
