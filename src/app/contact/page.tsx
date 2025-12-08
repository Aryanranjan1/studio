

'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaDribbble, FaBehance } from 'react-icons/fa6';
import { Badge } from '@/components/ui/badge';
import { Footer } from '@/components/footer';

const inquiryTypes = [
  'New Project',
  'Template Support',
  'General Question',
  'Collaboration',
  'Other',
];

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
  {
    question: 'What’s included in a project estimate?',
    answer:
      'Our project estimates include a detailed breakdown of all phases: discovery, design, development, testing, and deployment, with clear deliverables for each.',
  },
];

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState('New Project');

  return (
    <div className="w-full bg-background text-foreground">
      <main>
        <div className="grid grid-cols-12 gap-px border-l border-r border-neutral-800 bg-neutral-800">
          <div className="col-span-12 bg-black py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
               {/* Hero Section */}
               <div className="col-span-12 lg:col-span-7 bg-black p-8">
                <h1 className="font-headline text-7xl md:text-9xl font-bold">Contact <span className="text-primary">Us</span></h1>
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="grid grid-cols-12 col-span-12 gap-px bg-neutral-800">
            <div className="col-span-12 lg:col-span-7 bg-black p-4 md:p-8">
              <Card className="h-full border border-border bg-transparent shadow-none rounded-none">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">
                    Get in Touch
                  </CardTitle>
                  <CardDescription>
                    Please provide as much detail as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john.doe@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inquiry-type">What can we help you with?</Label>
                      <Select
                        value={inquiryType}
                        onValueChange={setInquiryType}
                      >
                        <SelectTrigger id="inquiry-type">
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map(type => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project, goals, and timeline..."
                        rows={8}
                      />
                    </div>
                    <div className="flex flex-col items-center gap-4 pt-4">
                      <Button type="submit" size="lg" className="w-full md:w-auto">
                        Send Message <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <p className="text-center text-sm text-muted-foreground">
                        We typically respond within 12–24 hours.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <aside className="col-span-12 lg:col-span-5 bg-black p-4 md:p-8 space-y-8">
              <Card className='bg-transparent border border-border shadow-none rounded-none'>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">
                    Connect with us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-muted-foreground">
                    <a
                      href="#"
                      className="transition-colors hover:text-primary"
                      aria-label="Instagram"
                    >
                      <FaInstagram className="h-6 w-6" />
                    </a>
                    <a
                      href="#"
                      className="transition-colors hover:text-primary"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="h-6 w-6" />
                    </a>
                    <a
                      href="#"
                      className="transition-colors hover:text-primary"
                      aria-label="Dribbble"
                    >
                      <FaDribbble className="h-6 w-6" />
                    </a>
                    <a
                      href="#"
                      className="transition-colors hover:text-primary"
                      aria-label="Behance"
                    >
                      <FaBehance className="h-6 w-6" />
                    </a>
                  </div>
                  <Button
                    asChild
                    className="mt-6 w-full bg-foreground text-background hover:bg-foreground/90"
                  >
                    <a href="https://wa.me/1234567890" target="_blank">
                      Chat on WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Mini FAQ */}
              <Card className='bg-transparent border border-border shadow-none rounded-none'>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">
                    Frequently Asked
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border-b border-b-border/50"
                      >
                        <AccordionTrigger className="text-left font-semibold text-foreground/80 no-underline hover:no-underline">
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

          <div className="col-span-12 bg-black">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
