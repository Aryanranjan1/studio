
import { Metadata } from 'next';
import { HorizontalServices } from '@/components/horizontal-services';
import { PricingSection } from '@/components/pricing-section';
import { CtaSection } from '@/components/cta-section';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { TechStack } from '@/components/tech-stack';
import { Faq } from './faq';

export const metadata: Metadata = {
    title: 'Services',
    description: 'From foundational branding to complex web applications, we provide the expertise to elevate your business in the digital landscape.',
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

export default function ServicesPage() {

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
                    <Badge variant="secondary">Brandimng</Badge>
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

          <Faq />


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
