import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollReveal } from './scroll-reveal';

const advantages = [
  {
    icon: <ProvenExpertiseIcon />,
    title: 'Proven Expertise',
    description: 'Our team combines years of experience with cutting-edge technologies to deliver exceptional results.',
  },
  {
    icon: <TransparentPricingIcon />,
    title: 'Transparent Pricing',
    description: "No hidden fees. We offer competitive rates with clear breakdowns of what you're paying for.",
  },
  {
    icon: <DedicatedSupportIcon />,
    title: 'Dedicated Support',
    description: 'We provide ongoing support and maintenance to ensure your digital assets remain optimal.',
  },
  {
    icon: <FastTurnaroundIcon />,
    title: 'Fast Turnaround',
    description: 'We respect your time with efficient processes that deliver quality results without unnecessary delays.',
  },
];

const commitments = [
    {
      title: 'Strategic Approach',
      description: 'We analyze your business objectives to create solutions that align with your goals.',
    },
    {
      title: 'Quality Assurance',
      description: 'Rigorous testing ensures flawless performance across all devices and platforms.',
    },
    {
      title: 'Client-Centric Process',
      description: 'Regular updates and collaboration ensure the final product exceeds expectations.',
    },
]

const technologies = [
    { name: 'React/Next.js', icon: <ReactIcon /> },
    { name: 'Node.js', icon: <NodeJsIcon /> },
    { name: 'WordPress', icon: <WordPressIcon /> },
    { name: 'Shopify', icon: <ShopifyIcon /> },
    { name: 'PHP/Laravel', icon: <LaravelIcon /> },
    { name: 'MySQL/MongoDB', icon: <MongoDBIcon /> },
    { name: 'AWS', icon: <AWSIcon /> },
    { name: 'Google Cloud', icon: <GoogleCloudIcon /> },
]

export function AdvantageSection() {
  return (
    <section id="advantage" className="py-24 sm:py-32">
      <div className="container">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-headline text-sm font-semibold uppercase tracking-wider text-primary">Why Choose Us</p>
            <h2 className="font-headline mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              The AMpire Studio Advantage
            </h2>
            <p className="mt-6 text-lg text-foreground/80">
              We don't just deliver projects - we build partnerships that drive real business results.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {advantages.map((advantage, index) => (
            <ScrollReveal key={advantage.title} delay={index * 100}>
              <Card className="h-full text-center transition-all duration-300 hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2">
                <CardHeader>
                  <div className="flex justify-center mb-4">{advantage.icon}</div>
                  <CardTitle className="font-headline text-xl">{advantage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{advantage.description}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ScrollReveal className="slide-reveal-left">
            <div>
              <h3 className="font-headline text-3xl font-bold text-foreground">Our Commitment to Excellence</h3>
              <p className="mt-4 text-foreground/80">
                At AMpire Studio, we approach every project with the same level of dedication and professionalism, whether it's a small business website or a complex enterprise application.
              </p>
              <ul className="mt-8 space-y-6">
                {commitments.map((commitment) => (
                  <li key={commitment.title} className="flex gap-4">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-primary" />
                    <div>
                      <h4 className="font-semibold text-foreground">{commitment.title}</h4>
                      <p className="text-muted-foreground">{commitment.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal className="slide-reveal-right">
            <div>
                <h3 className="font-headline text-3xl font-bold text-foreground">Technologies We Master</h3>
                <p className="mt-4 text-foreground/80">
                    We stay at the forefront of technology to deliver modern, scalable solutions for our clients.
                </p>
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {technologies.map((tech) => (
                        <div key={tech.name} className="flex flex-col items-center justify-center text-center gap-2 rounded-lg bg-card/50 backdrop-blur-lg p-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                {tech.icon}
                            </div>
                            <span className="font-semibold text-foreground text-sm">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}


// SVG Icons for technologies
function ReactIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8 text-primary"
    >
      <ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(45 12 12)"></ellipse>
      <ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(-45 12 12)"></ellipse>
      <ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(90 12 12)"></ellipse>
      <circle cx="12" cy="12" r="1"></circle>
    </svg>
  );
}

function NodeJsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8 text-primary"
    >
        <path d="M18.8 3.3a1 1 0 0 0-.9-.3H6.1a1 1 0 0 0-.9.3L1.5 9.7a1 1 0 0 0 0 1.2l3.7 6.4a1 1 0 0 0 .9.3h11.8a1 1 0 0 0 .9-.3l3.7-6.4a1 1 0 0 0 0-1.2L18.8 3.3z"></path>
    </svg>
  );
}

function WordPressIcon() {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-8 w-8 text-primary"
    >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.89 12.2l-1.83 5.59-2.07-1.44-1.22-3.8-1.12 3.49-1.92-1.39.81-2.52-2.3-6.93h2.3l1.19 3.98 1.15-3.98h2.3l-2.45 6.48z"></path>
    </svg>
  );
}

function ShopifyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-8 w-8 text-primary"
    >
      <path d="M19.34 9.17c-.9-2.38-3.13-4.17-5.84-4.17-2.61 0-4.83 1.68-5.68 4h-4.32v10h19V9.17h-3.16zm-7.34-2.17c1.5 0 2.76 1.05 3.11 2.47H8.89c.35-1.42 1.61-2.47 3.11-2.47z"></path>
    </svg>
  );
}

function LaravelIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-8 w-8 text-primary"
    >
      <path d="M12 2L2 7l10 5 10-5L12 2zm-1.14 12.35L2 12v5l8.86 5L12 21.35v-6.99zM22 17v-5l-8.86 2.35L12 14.35V21.35L22 17z"></path>
    </svg>
  );
}
function MongoDBIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-8 w-8 text-primary"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v10h-2V7z"></path>
    </svg>
  );
}

function AWSIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-8 w-8 text-primary"
    >
        <path d="M12.93 10.36a3.5 3.5 0 0 0-4.95 0L3 15.31V21h18v-5.69l-8.07-4.95zM4 19v-2.69l3.5-2.15 4.5 4.5L8.5 22H4v-3zm16 0h-4.5l-3.5-3.5 4.5-4.5L20 16.31V19zM12 2a9 9 0 0 0-9 9v.31l2-1.23V11a7 7 0 1 1 14 0v.08l2 1.23V11a9 9 0 0 0-9-9z"></path>
    </svg>
  );
}

function GoogleCloudIcon() {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-8 w-8 text-primary"
    >
        <path d="M19.5 9.5c0-3.59-2.91-6.5-6.5-6.5-2.8 0-5.2 1.77-6.12 4.22A5.987 5.987 0 0 0 2 12.5C2 15.81 4.69 18.5 8 18.5h11.5c2.49 0 4.5-2.01 4.5-4.5s-2.01-4.5-4.5-4.5z"></path>
    </svg>
  );
}

function ProvenExpertiseIcon() {
  return (
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <path d="m9 12 2 2 4-4"></path>
        </svg>
    </div>
  );
}

function TransparentPricingIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                <path d="M12 12a5 5 0 1 1-5-5"></path>
            </svg>
        </div>
    );
}

function DedicatedSupportIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.2 8.8a5.5 5.5 0 0 0-7.8 0L12 10l-1.4-1.2a5.5 5.5 0 0 0-7.8 0c-2.3 2.3-2.3 6.1 0 8.5l7.8 7.8 7.8-7.8c2.3-2.3 2.3-6.1 0-8.5z"></path>
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
            </svg>
        </div>
    );
}

function FastTurnaroundIcon() {
    return (
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
            </svg>
        </div>
    );
}
