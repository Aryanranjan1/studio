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
              <Card className="h-full border-white/20 bg-card shadow-lg backdrop-blur-lg text-center transition-all duration-300 hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2">
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
                        <div key={tech.name} className="flex flex-col items-center justify-center text-center gap-2 rounded-lg bg-card border border-white/20 p-4">
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
      <circle cx="12" cy="12" r="2" />
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48 0a6 6 0 0 1 0-8.49m11.31-2.83a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
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
      <path d="M20 10.1A5 5 0 0 0 10.1 20H4v-4a5 5 0 0 1 5-5h.1" />
      <path d="M4 10.1A5 5 0 0 1 13.9 4H20v4a5 5 0 0 0-5 5h-.1" />
    </svg>
  );
}

function WordPressIcon() {
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
      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 0a9 9 0 1 1 0-18 9 9 0 0 1 0 18zm-3-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 4c-3 0-4 1-4 2h8c0-1-1-2-4-2z" />
    </svg>
  );
}

function ShopifyIcon() {
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
      <path d="M6.5 6.5a10 10 0 0 1 11 0" />
      <path d="M12 12a10 10 0 0 1 5.5-9.5" />
      <path d="M12 12a10 10 0 0 0-5.5-9.5" />
      <path d="M12 12v10" />
    </svg>
  );
}

function LaravelIcon() {
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
      <path d="m2 12 5-9 5 9-5 9-5-9z" />
      <path d="m12 12 5-9 5 9-5 9-5-9z" />
    </svg>
  );
}
function MongoDBIcon() {
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
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6" />
    </svg>
  );
}

function AWSIcon() {
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
      <path d="M14.2 14.2c-1.4 1.4-3.6.4-5.6-1.6-2-2-3-4.2-1.6-5.6" />
      <path d="M10 10l-6 6" />
      <path d="M12 2a10 10 0 0 0-9 14.9" />
      <path d="M14.9 21.9a10 10 0 0 0 7-9.9" />
    </svg>
  );
}

function GoogleCloudIcon() {
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
      <path d="M17.5 19H9a7 7 0 1 1 6.33-10.5" />
      <path d="M12 2v7h7" />
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
