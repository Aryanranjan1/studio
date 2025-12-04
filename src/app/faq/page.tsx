import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from '@/components/ui/accordion';
  import { Badge } from '@/components/ui/badge';
  import { Button } from '@/components/ui/button';
  import { getFaqs } from '@/lib/data';
  import { ArrowRight } from 'lucide-react';
  import Link from 'next/link';
  
  export default function FaqPage() {
    const faqs = getFaqs();
  
    return (
      <div className="w-full bg-background text-foreground">
        <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="text-center">
            <Badge
              variant="outline"
              className="border-primary/50 text-primary"
            >
              Support
            </Badge>
            <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Have questions? We have answers. If you can&apos;t find what you&apos;re looking
              for, feel free to contact us.
            </p>
          </section>
  
          {/* FAQ Accordion */}
          <section className="mx-auto mt-16 max-w-4xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b-border/50"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary [&[data-state=open]]:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
  
          {/* CTA Section */}
          <section className="mt-24 text-center">
            <h2 className="font-headline text-3xl font-bold">
              Still Have Questions?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Our team is here to help. Get in touch with us for any specific
              inquiries you might have.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">
                  Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        </main>
      </div>
    );
  }
  