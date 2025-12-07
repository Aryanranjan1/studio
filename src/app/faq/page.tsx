import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getFaqs } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FaqSearch } from '@/components/faq-search';
import { FaqSidebar } from '@/components/faq-sidebar';
import { getFeaturedFaqs } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';

export default function FaqPage() {
  const faqs = getFaqs();
  const featuredFaqs = getFeaturedFaqs();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.slice(0, 8).map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="w-full bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-16 md:mb-24">
          <div className="max-w-3xl">
            <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Clear answers about our process, pricing, timelines, support, and
              working with Ampire Studio.
            </p>
            <Button asChild variant="link" className="mt-6 px-0">
              <Link href="/contact">
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Featured Questions */}
        <section className="mb-16">
           <h2 className="font-headline text-2xl font-bold">Top Questions</h2>
           <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredFaqs.map(faq => (
                <Card key={faq.id} className="bg-muted/50 flex flex-col">
                  <CardContent className="p-6 flex-grow">
                    <h3 className="font-headline text-lg font-bold">{faq.question}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{faq.preview}</p>
                  </CardContent>
                  <div className='p-6 pt-0'>
                     <Button asChild variant="link" className="p-0 text-primary" data-event="faq_featured_readmore">
                       <a href={`#faq-${faq.id}`}>Read more <ArrowRight className="ml-2 h-4 w-4" /></a>
                    </Button>
                  </div>
                </Card>
              ))}
           </div>
        </section>


        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <FaqSearch faqs={faqs} />
          </div>
          <aside className="lg:col-span-4">
             <FaqSidebar />
          </aside>
        </div>
      </main>
    </div>
  );
}
