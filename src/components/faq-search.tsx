
'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import type { FaqItem } from '@/lib/data';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface FaqSearchProps {
  faqs: FaqItem[];
}

const categories = [
  'All',
  'General',
  'Pricing & Payments',
  'Revisions & Support',
  'Templates',
  'Development & Integrations',
  'Onboarding & Process',
  'Legal & Privacy',
];

export function FaqSearch({ faqs }: FaqSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const term = searchTerm.toLowerCase();
      const categoryMatch =
        activeCategory === 'All' || faq.category === activeCategory;
      const searchMatch =
        faq.question.toLowerCase().includes(term) ||
        faq.answer.toLowerCase().includes(term) ||
        faq.preview.toLowerCase().includes(term);
      return categoryMatch && searchMatch;
    });
  }, [searchTerm, activeCategory, faqs]);

  const groupedFaqs = useMemo(() => {
    return filteredFaqs.reduce(
      (acc, faq) => {
        if (!acc[faq.category]) {
          acc[faq.category] = [];
        }
        acc[faq.category].push(faq);
        return acc;
      },
      {} as Record<string, FaqItem[]>
    );
  }, [filteredFaqs]);

  return (
    <div>
      <div
        className="py-4"
        role="search"
      >
        <Input
          type="text"
          placeholder="Search FAQs — pricing, revision policy, timelines…"
          className="h-12 w-full rounded-md border-border bg-card px-4 text-base focus-visible:ring-primary"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          data-event="faq_search"
          aria-label="Search FAQs"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'secondary'}
              className="rounded-full"
              onClick={() => setActiveCategory(category)}
              data-event="faq_filter_click"
              data-category={category}
            >
              {category}
            </Button>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
          Showing {filteredFaqs.length} results.
        </p>
      </div>

      <div className="mt-4">
        {Object.entries(groupedFaqs).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h2 className="mb-4 font-headline text-xl font-bold">{category}</h2>
            <Accordion type="single" collapsible className="w-full">
              {items.map(faq => (
                <AccordionItem
                  key={faq.id}
                  value={`item-${faq.id}`}
                  id={`faq-${faq.id}`}
                  className="rounded-lg border-b border-border/50 bg-card/50 px-6"
                  data-event="faq_open"
                  data-faq-id={faq.id}
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground no-underline hover:no-underline [&[data-state=open]]:text-primary">
                    <div className="flex flex-col">
                        <span>{faq.question}</span>
                        <span className="mt-1 text-sm font-normal text-muted-foreground data-[state=open]:hidden">
                            {faq.preview}
                        </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    {faq.link && (
                       <Button asChild variant="link" className="p-0 mt-2">
                            <Link href={faq.link.href}>
                                {faq.link.text} <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                       </Button>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
         {filteredFaqs.length === 0 && (
            <div className="text-center py-16">
                <p className="text-lg font-semibold">No results found</p>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filter.</p>
            </div>
         )}
      </div>
    </div>
  );
}

    