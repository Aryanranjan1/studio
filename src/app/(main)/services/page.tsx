
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

// Components
import { HorizontalServices } from '@/components/horizontal-services';
import { PricingSection } from '@/components/pricing-section';
import { CtaSection } from '@/components/cta-section';
import { Footer } from '@/components/footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { useEffect } from 'react';
import { TechStack } from '@/components/tech-stack';


const processSteps = [
    {
      step: "01",
      title: "Discovery & Proposal",
      description: "We start with a deep dive into your project goals, audience, and challenges, culminating in a detailed project proposal with a fixed price and timeline.",
    },
    {
      step: "02",
      title: "Prototype & Revision",
      description: "We design an interactive prototype. You get one full revision round to ensure the design aligns perfectly with your vision before we write a single line of code.",
    },
    {
      step: "03",
      title: "Build & Staging",
      description: "Our team develops the project on a private staging server. You get access to track progress and provide feedback during one final revision round.",
    },
    {
      step: "04",
      title: "Launch & Handover",
      description: "After final payment, we deploy your project to your live domain and hand over all assets. We include up to 5 minor post-launch fixes for free.",
    },
];

const faqItems = [
    {
        question: "What is your typical project timeline?",
        answer: "A standard marketing site takes 4-8 weeks, while a complex web application can take 12+ weeks. We provide a detailed timeline in every proposal.",
    },
    {
        question: "How do you handle revisions?",
        answer: "We include one revision round on the prototype and one on the final build before launch. Additional revisions are billed at our standard hourly rate.",
    },
    {
        question: "Do you offer support after the project is launched?",
        answer: "Yes, we offer optional monthly support retainers to handle updates, security, and performance monitoring. We also include 5 minor bug fixes for free post-launch.",
    },
];

export default function ServicesPage() {
    useEffect(() => {
        document.title = "Services — Ampire Studio";
    }, []);

  return (
    <div className="w-full bg-background text-foreground min-h-screen">
      <main>
        <div className="grid grid-cols-12 gap-px border-l border-r border-border bg-background">
          
          {/* Hero Header */}
          <div className="col-span-12 bg-background p-8 border-b border-border">
             <div className="flex flex-col md:flex-row justify-between md:items-end gap-8">
              <h1 className="font-headline text-7xl md:text-9xl font-bold">Services</h1>
               <div className='max-w-md'>
                <p className="mt-4 md:mt-0 text-muted-foreground">
                  From foundational branding to complex web applications, we provide the expertise to elevate your business in the digital landscape.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary">Web Development</Badge>
                    <Badge variant="secondary">Branding</Badge>
                    <Badge variant="secondary">Automation</Badge>
                    <Badge variant="secondary">Mobile App</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* 1. HORIZONTAL SCROLL SERVICES */}
          <div className="col-span-12 bg-background">
             <HorizontalServices />
          </div>
          
          {/* 4. TECH STACK */}
          <div className="col-span-12 bg-background">
            <TechStack />
          </div>


          {/* 2. PRICING */}
          <div className="col-span-12 bg-background">
            <PricingSection />
          </div>
          
          {/* 3. PROCESS */}
           <div className="col-span-12 bg-background p-8 md:p-16 border-b border-border">
              <div className="mb-12">
                  <h2 className="font-headline text-5xl md:text-6xl font-bold">Our Process</h2>
                  <p className="mt-6 max-w-2xl text-lg text-muted-foreground">We follow a structured four-step process to ensure clarity, efficiency, and exceptional results from start to finish.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
                {processSteps.map((item) => (
                  <div key={item.step} className="bg-background p-8">
                    <span className="text-primary font-headline text-lg">{item.step}</span>
                    <h3 className="font-headline text-2xl font-bold mt-2">{item.title}</h3>
                    <p className="text-muted-foreground mt-4">{item.description}</p>
                  </div>
                ))}
              </div>
          </div>

            {/* 5. FAQ & Contact */}
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
                            {faq.answer}
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


          <div className="col-span-12 bg-background">
             <CtaSection />
          </div>
          
          <div className="col-span-12 bg-background">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
