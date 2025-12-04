import { getTemplates } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TemplateDetailsPage({ params }: { params: { id: string } }) {
  const templates = getTemplates();
  const template = templates.find((p) => p.id === params.id);
  const otherTemplates = templates.filter(p => p.id !== params.id).slice(0, 2);

  if (!template) {
    notFound();
  }

  return (
    <div className="bg-background text-foreground">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Main Content: Image Gallery */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-4">
              {template.images.map((img, index) => (
                <div key={index} className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <div>
                <div className="flex items-center gap-2">
                   {template.tags.slice(0, 1).map((tag) => (
                    <Badge key={tag} variant="outline" className='border-primary/50 text-primary'>{tag}</Badge>
                  ))}
                </div>
                <h1 className="mt-4 font-headline text-4xl font-bold">
                  {template.title}
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  {template.description}
                </p>
                 <p className="mt-4 text-4xl font-bold text-primary">
                    ${template.price}
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Key Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {template.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                            <p className="text-muted-foreground">{feature}</p>
                        </div>
                    ))}
                </CardContent>
              </Card>

              <a href={template.url} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button size="lg" className="w-full">
                    Purchase Now <ShoppingCart className="ml-2 h-4 w-4" />
                </Button>
              </a>
              
              <div className="text-center text-sm text-muted-foreground">
                <p>Secure payment via Gumroad.</p>
                <p>Includes lifetime updates.</p>
              </div>
            </div>
          </aside>
        </div>
        
        {/* Long Description */}
        <section className="mx-auto mt-24 max-w-5xl border-t border-border pt-16">
            <h2 className="font-headline text-3xl font-bold">Template Details</h2>
            <div className="prose prose-invert mt-6 max-w-none text-muted-foreground">
                <p>{template.longDescription}</p>
            </div>
        </section>

        {/* Other Templates Section */}
        <section className="mt-24 border-t border-border pt-16">
          <h2 className="text-center font-headline text-3xl font-bold">
            More Templates
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {otherTemplates.map((otherTemplate) => (
              <Link href={`/store/${otherTemplate.id}`} key={otherTemplate.id} className="group">
                <Card className="h-full overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-primary/10">
                  <div className="relative h-64 w-full">
                    <Image
                      src={otherTemplate.image}
                      alt={otherTemplate.imageAlt}
                      fill
                      className="object-cover"
                    />
                     <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-6">
                        <div>
                            <h3 className="font-headline text-2xl font-bold text-white group-hover:text-primary">
                            {otherTemplate.title}
                            </h3>
                             <p className="mt-2 text-lg font-bold text-primary">
                                ${otherTemplate.price}
                            </p>
                        </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
