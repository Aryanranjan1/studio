
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { usePublicFaqs } from '@/hooks/useFaqs';
import { ArrowRight } from 'lucide-react';

export function Faq() {
    const { data: allFaqs } = usePublicFaqs();
    const faqItems = allFaqs?.filter(faq => ['onboard-1', 'rev-1', 'rev-2'].includes(faq.id)) || [];

    return (
        <div className="col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-px bg-border border-b border-border">
            <div className="col-span-12 lg:col-span-6 bg-background p-8 md:p-16">
                <h2 className="font-headline text-5xl font-bold mb-12">FAQ</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((faq, index) => (
                    <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border-b border-border last:border-0"
                    >
                        <AccordionTrigger className="text-left text-xl font-medium py-6 hover:text-primary transition-colors">
                        {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-lg leading-relaxed pb-6">
                          <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        </AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>
            </div>
            
            <div className="col-span-12 lg:col-span-6 bg-background p-8 md:p-16">
                <div className="h-full flex flex-col justify-center">
                    <h2 className="font-headline text-4xl font-bold mb-8">Start a Project</h2>
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name-service" className="text-base">Name</Label>
                            <Input id="name-service" placeholder="John Doe" className="bg-card border-input h-12" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email-service" className="text-base">Email</Label>
                            <Input
                            id="email-service"
                            type="email"
                            placeholder="john@company.com"
                            className="bg-card border-input h-12"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message-service" className="text-base">Message</Label>
                            <Textarea
                                id="message-service"
                                placeholder="Tell us about your project..."
                                rows={4}
                                className="bg-card border-input resize-none"
                            />
                        </div>
                        <Button type="submit" size="lg" className="w-full h-14 text-lg mt-4">
                            Send Inquiry <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

    