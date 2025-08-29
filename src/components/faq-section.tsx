import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { ScrollReveal } from "./scroll-reveal";
import { cn } from "@/lib/utils";
  
  const faqs = [
    {
      question: "What is AMpire Studio?",
      answer: "AMpire Studio is a full-service digital agency specializing in web design, development, branding, and marketing. We create beautiful, functional, and user-centric digital experiences that help businesses grow."
    },
    {
      question: "How long does a project typically take?",
      answer: "Project timelines vary depending on the scope and complexity. A standard website can take anywhere from 4-8 weeks, while larger projects may take several months. We provide a detailed timeline after our initial discovery phase."
    },
    {
      question: "What are your pricing models?",
      answer: "We offer flexible pricing models to suit different needs, including fixed-price projects and hourly rates for ongoing work. We provide a detailed proposal with a clear breakdown of costs before any project begins."
    },
    {
      question: "Do you offer ongoing support?",
      answer: "Yes, we offer ongoing support and maintenance packages to ensure your website or application remains secure, up-to-date, and optimized for performance. We're here to be your long-term digital partner."
    },
    {
        question: "How do I get started?",
        answer: "Getting started is easy! Simply fill out our contact form with some details about your project, and we'll get back to you within 24 hours to schedule a free consultation. We look forward to hearing from you!"
    }
  ]

  interface FaqSectionProps {
    className?: string;
  }
  
  export function FaqSection({ className }: FaqSectionProps) {
    return (
      <section id="faq" className={cn("py-24 sm:py-32", className)}>
        <div className="container">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-lg text-foreground/80">
                Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.
              </p>
            </div>
          </ScrollReveal>
  
          <ScrollReveal delay={200}>
            <div className="mt-12 max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index + 1}`}>
                    <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollReveal>
        </div>
      </section>
    )
  }
