
'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getServices } from '@/lib/data';
import { ArrowRight, Bot, Code, Palette, Megaphone, Server, Gem, Sparkles, Gauge, Smartphone, Rocket, Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PricingSection } from '@/components/pricing-section';
import { CtaSection } from '@/components/cta-section';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const iconComponents: { [key: string]: React.ElementType } = {
  Code,
  Palette,
  Bot,
  Megaphone,
  Server,
  Gem,
  Sparkles,
  Gauge,
  Smartphone,
  Rocket,
};

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

const techStack = [
    { name: "Next.js", logo: "/tech/nextjs.svg" },
    { name: "React", logo: "/tech/react.svg" },
    { name: "Firebase", logo: "/tech/firebase.svg" },
    { name: "Node.js", logo: "/tech/nodejs.svg" },
    { name: "Figma", logo: "/tech/figma.svg" },
    { name: "Webflow", logo: "/tech/webflow.svg" },
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
  const services = getServices();

  return (
    <div className="w-full bg-black text-white min-h-screen">
      <main>
        <div className="grid grid-cols-12 gap-px border-l border-r border-neutral-800 bg-neutral-800">
          
          {/* Hero Header */}
          <div className="col-span-12 bg-black p-8 border-b border-neutral-800">
            <div className="md:flex justify-between items-end">
              <h1 className="font-headline text-7xl md:text-9xl font-bold">Services</h1>
              <p className="mt-4 md:mt-0 max-w-sm text-neutral-400">
                From foundational branding to complex web applications, we provide the expertise to elevate your business in the digital landscape.
              </p>
            </div>
          </div>

          {/* Services Section */}
          {services.map((service, index) => {
            const IconComponent = iconComponents[service.icon];
            const isReversed = index % 2 !== 0;
            return (
              <React.Fragment key={service.id}>
                <div className={`col-span-12 md:col-span-7 bg-black p-8 border-b border-neutral-800 ${isReversed ? 'md:order-2' : ''}`}>
                  <div className="flex items-center gap-4">
                    {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
                    <h2 className="font-headline text-5xl md:text-6xl font-bold">
                      {service.title}
                    </h2>
                  </div>
                  <p className="mt-4 max-w-lg text-neutral-400">
                    {service.longDescription}
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    {service.kpis.map((kpi, kpiIndex) => (
                        <div key={kpiIndex}>
                        <p className="text-3xl font-bold text-primary">
                            {kpi.value}
                        </p>
                        <p className="text-sm text-neutral-400">
                            {kpi.label}
                        </p>
                        </div>
                    ))}
                  </div>
                  <Button asChild variant="link" className="p-0 mt-8 text-white">
                     <Link href={`/portfolio?category=${service.id}`} className="group inline-flex items-center font-semibold text-primary">
                        View Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
                <div className={`col-span-12 md:col-span-5 bg-black relative min-h-[300px] border-b border-neutral-800 ${isReversed ? 'md:order-1' : ''}`}>
                  <Image 
                    src={`https://picsum.photos/seed/service-${index}/800/600`}
                    alt={service.title}
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                   <div className="absolute inset-0 bg-black/20" />
                </div>
              </React.Fragment>
            );
          })}

          <div className="col-span-12 bg-black">
            <PricingSection />
          </div>
          
          {/* Process Section */}
          <div className="col-span-12 bg-black p-8 md:p-12 border-b border-neutral-800">
            <div className="text-center">
                 <h2 className="font-headline text-5xl md:text-6xl font-bold">Our Process</h2>
                 <p className="mt-4 max-w-2xl mx-auto text-neutral-400">We follow a structured four-step process to ensure clarity, efficiency, and exceptional results from start to finish.</p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800 border-t border-r border-neutral-800">
                {processSteps.map(item => (
                    <div key={item.step} className="bg-black p-8 border-l border-b border-neutral-800">
                        <span className="text-6xl font-headline font-bold text-primary">{item.step}</span>
                        <h3 className="mt-4 font-headline text-2xl font-bold">{item.title}</h3>
                        <p className="mt-2 text-neutral-400">{item.description}</p>
                    </div>
                ))}
            </div>
          </div>
          
          {/* Tech Stack Section */}
            <div className="col-span-12 bg-black p-8 md:p-12 text-center border-b border-neutral-800">
                <h2 className="font-headline text-5xl font-bold">Technology Stack</h2>
                <p className="mt-4 max-w-xl mx-auto text-neutral-400">
                    We use a modern, battle-tested stack to build fast, scalable, and secure digital products.
                </p>
                <div className="mt-12 flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12">
                    {techStack.map(tech => (
                        <div key={tech.name} className="flex flex-col items-center gap-2 text-neutral-400">
                            <Image src={tech.logo} alt={tech.name} width={48} height={48} className="brightness-0 invert" />
                            <span>{tech.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="col-span-12 lg:col-span-7 bg-black p-8 border-b border-neutral-800">
                <h2 className="font-headline text-5xl font-bold mb-8">FAQ</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border-b border-b-border/50"
                      >
                        <AccordionTrigger className="text-left text-lg font-semibold text-foreground/80 no-underline hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
            </div>
            
            {/* Contact Form Section */}
            <div className="col-span-12 lg:col-span-5 bg-muted/10 p-8 border-b border-neutral-800">
                 <Card className="h-full border border-border bg-transparent shadow-none rounded-none">
                    <CardHeader>
                    <CardTitle className="font-headline text-2xl">
                        Start a Project
                    </CardTitle>
                    </CardHeader>
                    <CardContent>
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name-service">Name</Label>
                            <Input id="name-service" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email-service">Email</Label>
                            <Input
                            id="email-service"
                            type="email"
                            placeholder="john.doe@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message-service">Message</Label>
                            <Textarea
                                id="message-service"
                                placeholder="Tell us briefly about your project..."
                                rows={4}
                            />
                        </div>
                        <Button type="submit" size="lg" className="w-full">
                            Send Inquiry <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </form>
                    </CardContent>
                </Card>
            </div>

          <div className="col-span-12 bg-black">
             <CtaSection />
          </div>
          
          <div className="col-span-12 bg-black">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}

    