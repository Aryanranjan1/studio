
'use client';

import { Button } from '@/components/ui/button';
import { usePublicFaqs } from '@/hooks/useFaqs';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FaqSearch } from '@/components/faq-search';
import { FaqSidebar } from '@/components/faq-sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Footer } from '@/components/footer';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';
import Head from 'next/head';

export default function FaqPage() {
  const { data: faqs, isLoading, error } = usePublicFaqs();
  
  // Set metadata dynamically
  useEffect(() => {
    document.title = 'FAQ — Ampire Studio';
  }, []);

  const featuredFaqs = faqs?.filter(faq => ['gen-1', 'price-1', 'dev-2'].includes(faq.id)) || [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs?.slice(0, 8).map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })) || [],
  };

  return (
    <div className="w-full bg-background text-foreground">
      <Head>
        <script
            key="faq-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <main>
        <div className="grid grid-cols-12 gap-px border-l border-r border-neutral-800 bg-black">
          {/* Hero Section */}
          <section className="col-span-12 bg-[#002a4d] text-primary-foreground">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                  <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                    Frequently Asked Questions
                  </h1>
                  <p className="mt-6 text-lg text-primary-foreground/80">
                    Clear answers about our process, pricing, timelines, support, and
                    working with Ampire Studio.
                  </p>
                  <Button
                    asChild
                    variant="link"
                    className="mt-6 px-0 text-primary-foreground hover:text-primary-foreground/80"
                  >
                    <Link href="/contact">
                      Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
            </div>
          </section>
          
          <div className="col-span-12 bg-black py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              
              {isLoading ? (
                <>
                    <Skeleton className="h-8 w-48 mb-6" />
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Skeleton className="h-48" />
                        <Skeleton className="h-48" />
                        <Skeleton className="h-48" />
                    </div>
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mt-12">
                        <div className="lg:col-span-8 space-y-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                        <div className="lg:col-span-4 space-y-4">
                             <Skeleton className="h-64 w-full" />
                        </div>
                    </div>
                </>
              ) : error ? (
                 <div className="text-destructive text-center py-16">Error loading FAQs.</div>
              ) : (
                <>
                  {/* Featured Questions */}
                  <section className="mb-12">
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
                      <FaqSearch faqs={faqs || []} />
                    </div>
                    <aside className="lg:col-span-4">
                       <FaqSidebar />
                    </aside>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-span-12 bg-black">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}

    