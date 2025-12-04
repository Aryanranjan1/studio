import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, Bot, CheckCircle, PencilRuler, Rocket, Search } from 'lucide-react';

const processSteps = [
    {
        step: 1,
        title: "Discovery & Strategy",
        description: "We start by understanding your business, goals, and audience to create a comprehensive strategy and project roadmap.",
        icon: <Search className="h-8 w-8 text-primary" />
    },
    {
        step: 2,
        title: "UI/UX & Branding",
        description: "Our team designs a stunning, intuitive user interface and a cohesive brand identity that resonates with your customers.",
        icon: <PencilRuler className="h-8 w-8 text-primary" />
    },
    {
        step: 3,
        title: "Development & CMS",
        description: "We bring the designs to life with clean, scalable code and integrate a powerful content management system.",
        icon: <Bot className="h-8 w-8 text-primary" />
    },
    {
        step: 4,
        title: "Testing & Review",
        description: "Rigorous testing across all devices ensures a flawless user experience before we go live.",
        icon: <CheckCircle className="h-8 w-8 text-primary" />
    },
    {
        step: 5,
        title: "Launch & Optimize",
        description: "We deploy your project and monitor its performance, providing ongoing support and optimization.",
        icon: <Rocket className="h-8 w-8 text-primary" />
    },
]


export default function ProcessPage() {
  return (
    <div className="w-full bg-background text-foreground">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center">
          <Badge
            variant="outline"
            className="border-primary/50 text-primary"
          >
            How We Work
          </Badge>
          <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Our Blueprint for Digital Excellence
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            We follow a structured, transparent process to ensure your project is delivered on time, on budget, and to the highest standard.
          </p>
        </section>

        {/* Process Steps */}
        <section className="relative mt-24">
          <div className="absolute left-1/2 top-0 -z-10 h-full w-px -translate-x-1/2 bg-border/50"></div>
          
          <div className="space-y-16">
            {processSteps.map((step, index) => (
                <div key={step.step} className="relative flex items-center">
                    <div className="flex w-1/2 items-center pr-8" style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}>
                       <div style={{ textAlign: index % 2 === 0 ? 'right' : 'left' }} className="w-full">
                           <h3 className="font-headline text-2xl font-bold text-primary">Step {step.step}</h3>
                           <h4 className="mt-1 text-xl font-semibold">{step.title}</h4>
                           <p className="mt-2 text-muted-foreground">{step.description}</p>
                       </div>
                    </div>

                    <div className="absolute left-1/2 z-10 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border-2 border-border bg-background">
                       <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        {step.icon}
                       </div>
                    </div>
                    <div className="w-1/2"></div>
                </div>
            ))}
          </div>

        </section>
      </main>
    </div>
  );
}
