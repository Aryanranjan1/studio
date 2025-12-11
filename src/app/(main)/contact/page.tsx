
'use client';

import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight } from 'lucide-react';
import { Footer } from '@/components/footer';
import { contactSocials } from '@/lib/social-links';
import { getContactDetails } from '@/lib/data';

const faqItems = [
  {
    question: 'How soon will I get a reply?',
    answer:
      'We typically respond to all inquiries within 12-24 hours during business days. We appreciate your patience.',
  },
  {
    question: 'Do you offer custom development?',
    answer:
      'Absolutely. While we offer defined packages, we specialize in building custom solutions tailored to your unique requirements.',
  },
  {
    question: 'Can you work with my budget?',
    answer:
      'We offer various pricing tiers and can often tailor a project scope to fit a specific budget. Let us know your budget, and we can propose a solution.',
  },
];

export default function ContactPage() {
  const [contactMethod, setContactMethod] = useState('email');
  const contactDetails = getContactDetails();

  useEffect(() => {
    document.title = "Contact — Ampire Studio";
  }, []);

  return (
    <div className="w-full bg-background text-foreground min-h-screen">
      <main>
        <div className="grid grid-cols-12 gap-px border-l border-r border-border bg-background">
          
          {/* Hero Header */}
          <div className="col-span-12 bg-background p-8 border-b border-border relative overflow-hidden">
             <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 py-12">
              <h1 className="font-headline text-7xl md:text-9xl font-bold">Start a<br/>Project<span className="text-primary">.</span></h1>
               <div className='max-w-md'>
                <p className="mt-4 md:mt-0 text-muted-foreground">
                  Have an idea? Let's turn it into a reality. Fill out the form, and we'll be in touch to discuss your project in detail.
                </p>
              </div>
            </div>
            <div className="absolute top-1/2 right-0 w-72 h-72 border-t-2 border-r-2 border-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-px bg-border">
            {/* Form Section */}
            <div className="col-span-12 lg:col-span-7 bg-background p-4 md:p-8">
              <Card className="bg-card border-border shadow-none rounded-none">
                <CardHeader>
                  <CardTitle className="font-headline text-3xl text-foreground">Project Brief</CardTitle>
                  <CardDescription className="text-muted-foreground">Tell us about your vision.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" className="bg-background border-input h-12" />
                      </div>
                       <div className="space-y-2">
                        <Label htmlFor="company">Company (Optional)</Label>
                        <Input id="company" placeholder="Acme Inc." className="bg-background border-input h-12"/>
                      </div>
                    </div>
                     <div className="space-y-4">
                        <Label>How should we contact you?</Label>
                        <RadioGroup defaultValue="email" value={contactMethod} onValueChange={setContactMethod} className="flex gap-x-8">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="email" id="r-email" />
                                <Label htmlFor="r-email">Email</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="phone" id="r-phone" />
                                <Label htmlFor="r-phone">Phone</Label>
                            </div>
                        </RadioGroup>
                        <div>
                        {contactMethod === 'email' ? (
                            <Input id="email" type="email" placeholder="you@example.com" className="bg-background border-input h-12"/>
                        ) : (
                            <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="bg-background border-input h-12"/>
                        )}
                        </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Project Description</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project, goals, timeline, and budget..."
                        rows={6}
                         className="bg-background border-input"
                      />
                    </div>
                    <div className="pt-4">
                      <Button type="submit" size="lg" className="w-full h-14 text-lg">
                        Send Project Brief <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <aside className="col-span-12 lg:col-span-5 bg-background p-4 md:p-8 space-y-8">
              <Card className='bg-card border-border shadow-none rounded-none'>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Other Ways to Connect</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-muted-foreground mb-6">
                    Follow our journey, chat with us directly, or explore our work on other platforms.
                  </p>
                  <div className="flex items-center space-x-6 text-muted-foreground">
                    {contactSocials.map(social => (
                      <a
                        key={social.name}
                        href={social.href}
                        className="transition-colors hover:text-primary"
                        aria-label={social.name}
                      >
                        <social.Icon className="h-6 w-6" />
                      </a>
                    ))}
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-6 w-full bg-transparent border-input hover:bg-foreground hover:text-background"
                  >
                    <a href={contactDetails.whatsapp} target="_blank">
                      Chat on WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Mini FAQ */}
              <Card className='bg-card border-border shadow-none rounded-none'>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Quick Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border-b border-border last:border-b-0"
                      >
                        <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary no-underline hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </aside>
          </div>

          <div className="col-span-12 bg-background">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
