import { Scan, PencilRuler, Code, Rocket } from 'lucide-react';
import { Badge } from './ui/badge';

const steps = [
  {
    icon: <Scan className="h-10 w-10" />,
    title: '1. Discovery & Strategy',
    description:
      "We dive deep into your business goals to create a winning digital strategy.",
  },
  {
    icon: <PencilRuler className="h-10 w-10" />,
    title: '2. UI/UX Design',
    description:
      'We craft beautiful, intuitive interfaces that your users will love.',
  },
  {
    icon: <Code className="h-10 w-10" />,
    title: '3. Development',
    description:
      'Our developers bring the designs to life with clean, efficient code.',
  },
  {
    icon: <Rocket className="h-10 w-10" />,
    title: '4. Launch & Optimization',
    description:
      "We deploy your project and monitor its performance for continuous improvement.",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-muted/30 py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge
            variant="outline"
            className="mb-4 border-primary/50 text-primary"
          >
            Our Process
          </Badge>
          <h2 className="font-headline text-3xl font-bold sm:text-4xl">
            A Journey to Digital Excellence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Our streamlined process ensures quality, efficiency, and a final
            product that exceeds expectations.
          </p>
        </div>
        <div className="relative mt-16">
          <div
            className="absolute left-1/2 top-4 hidden h-full w-px -translate-x-1/2 bg-border md:block"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-card text-primary shadow-md">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
