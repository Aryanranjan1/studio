
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

const services = [
  'Website',
  'Automation',
  'UI/UX',
  'Development',
  'Branding',
  'Consultation',
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
  const [selectedService, setSelectedService] = useState('Website');

  return (
    <div className="w-full bg-background text-foreground">
      <main className="container mx-auto min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-16 text-center">
             <Badge
                variant="outline"
                className="border-primary/50 text-primary"
                >
                Contact Us
            </Badge>
          <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Let’s Build Something Exceptional
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            Share your project details, and our team will get back to you
            shortly.
          </p>
        </section>

        {/* Page Structure */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  Project Details
                </CardTitle>
                <CardDescription>
                  Please provide as much detail as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
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
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget</Label>
                      <Select>
                        <SelectTrigger id="budget">
                          <SelectValue placeholder="Select a budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<5k">&lt; $5,000</SelectItem>
                          <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                          <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                          <SelectItem value="25k+">$25,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Needed</Label>
                      <Select
                        value={selectedService}
                        onValueChange={setSelectedService}
                      >
                        <SelectTrigger id="service">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map(service => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
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

          {/* Right Column */}
          <aside className="space-y-8 lg:col-span-5">
             <Card className='bg-muted'>
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
                  className="mt-6 w-full bg-green-500/10 text-green-400 hover:bg-green-500/20 hover:text-green-300"
                >
                  <a href="https://wa.me/1234567890" target="_blank">
                    Chat on WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Mini FAQ */}
            <Card className='bg-muted'>
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
                      className="border-border/50"
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
      </main>
    </div>
  );
}
