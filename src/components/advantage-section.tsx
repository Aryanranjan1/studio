import { CheckCircle, Award, DollarSign, Headphones, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollReveal } from './scroll-reveal';

const advantages = [
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: 'Proven Expertise',
    description: 'Our team combines years of experience with cutting-edge technologies to deliver exceptional results.',
  },
  {
    icon: <DollarSign className="h-8 w-8 text-primary" />,
    title: 'Transparent Pricing',
    description: 'No hidden fees. We offer competitive rates with clear breakdowns of what you\'re paying for.',
  },
  {
    icon: <Headphones className="h-8 w-8 text-primary" />,
    title: 'Dedicated Support',
    description: 'We provide ongoing support and maintenance to ensure your digital assets remain optimal.',
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
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
          <ScrollReveal>
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
          <ScrollReveal>
            <div>
                <h3 className="font-headline text-3xl font-bold text-foreground">Technologies We Master</h3>
                <p className="mt-4 text-foreground/80">
                    We stay at the forefront of technology to deliver modern, scalable solutions for our clients.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                    {technologies.map((tech) => (
                        <div key={tech.name} className="flex items-center gap-4 rounded-lg bg-card border border-white/20 p-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                {tech.icon}
                            </div>
                            <span className="font-semibold text-foreground">{tech.name}</span>
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
        <svg fill="hsl(var(--primary))" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"><title>React</title><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-4.39-5.59c-.48 0-.88-.39-.88-.88s.39-.88.88-.88.88.39.88.88-.39.88-.88.88zm8.78 0c-.48 0-.88-.39-.88-.88s.39-.88.88-.88.88.39.88.88-.39.88-.88.88zm-4.39-4.39c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
    )
}

function NodeJsIcon() {
    return (
        <svg fill="hsl(var(--primary))" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"><title>Node.js</title><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.02 15.65c-.09.32-.35.55-.68.55h-.9c-.41 0-.75-.34-.75-.75V6.55c0-.41.34-.75.75-.75h.9c.33 0 .59.23.68.55l4.37 7.57v.17l-4.37 1.96zm6.09-5.53l-2.07-3.58c-.14-.24-.4-.38-.69-.38h-.9c-.41 0-.75.34-.75.75v7.16c0 .41.34.75.75.75h.9c.28 0 .54-.15.69-.38l2.07-3.58v-.39z"/></svg>
    )
}

function WordPressIcon() {
    return (
        <svg fill="hsl(var(--primary))" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"><title>WordPress</title><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm6.33 13.04l-2.61-7.46-3.72 5.31-1.39-1.99-2.61 7.46h-1.95l3.52-10-3.52-5.04h1.95l2.61 3.73 1.39 1.99 2.61-3.73h1.95l-3.52 5.04 3.52 10h-1.95z"/></svg>
    )
}

function ShopifyIcon() {
    return (
        <svg fill="hsl(var(--primary))" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"><title>Shopify</title><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm2.84 12.33c-.78 0-1.42-.63-1.42-1.42s.63-1.42 1.42-1.42 1.42.63 1.42 1.42-.64 1.42-1.42 1.42zm-5.68 0c-.78 0-1.42-.63-1.42-1.42s.63-1.42 1.42-1.42 1.42.63 1.42 1.42-.64 1.42-1.42 1.42zm7.09-3.53h-8.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h8.5c.41 0 .75.34.75.75s-.34.75-.75.75z"/></svg>
    )
}

function LaravelIcon() {
    return (
        <svg fill="hsl(var(--primary))" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"><title>Laravel</title><path d="M21.99 8.32L12.5 2.89a1 1 0 00-1 0L2.01 8.32a1 1 0 00-.51.87V14.8a1 1 0 00.51.87l9.49 5.43a1 1 0 001 0l9.49-5.43a1 1 0 00.51-.87V9.19a1 1 0 00-.51-.87zM12 4.25l7.5 4.33-3.75 2.16-7.5-4.33L12 4.25zm-1.5 10.42l-6-3.47v-3.46l6 3.47v3.46zm1.5 4.08l-7.5-4.33 3.75-2.16 7.5 4.33-3.75 2.16zm1.5-4.08v-3.46l6-3.47v3.46l-6 3.47z"/></svg>
    )
}

function MongoDBIcon() {
    return (
        <svg fill="hsl(var(--primary))" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"><title>MongoDB</title><path d="M12.012 2.21c-4.63 0-8.47 3.018-9.597 7.052.037.49-.153.94-.49.94-.48 0-.82-.526-.647-1.144C2.525 3.99 6.828 0 12.012 0c5.183 0 9.486 3.99 10.733 9.068.174.618-.167 1.144-.648 1.144-.336 0-.526-.45-.489-.94C20.48 5.228 16.64 2.21 12.01 2.21zM11.96 11.23c-1.12 0-2.34.2-3.14.54-.8.34-.8.5 0 .85.8.34 2.02.54 3.14.54 1.12 0 2.34-.2 3.14-.54.8-.34.8-.5 0-.85-.8-.34-2.02-.54-3.14-.54zm0 6.07c-3.18 0-6.14-1.3-6.14-2.92S8.78 11.46 12 11.46s6.14 1.3 6.14 2.92-2.97 2.92-6.14 2.92z"/></svg>
    )
}

function AWSIcon() {
    return (
        <svg fill="hsl(var(--primary))" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"><title>Amazon AWS</title><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.18 13.37c-.36.2-.78.3-1.23.3-1.1 0-2-.6-2.3-1.6l-3.35 1.4-1-3.83 3.35-1.4c.05-.5.2-1 .4-1.4l-3.3-1.4 1-3.84 3.3 1.4c.4-.7 1-1.2 1.8-1.4l.6-4.03h2.3l-.6 4.03c.8.2 1.5.7 1.9 1.4l3.3-1.4 1 3.84-3.3 1.4c.1.4.2.9.2 1.4l3.35 1.4-1 3.83-3.35-1.4c-.4 1-1.2 1.6-2.3 1.6zm-1-3.17c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2 1.2.5 1.2 1.2-.5 1.2-1.2 1.2z"/></svg>
    )
}

function GoogleCloudIcon() {
    return (
        <svg fill="hsl(var(--primary))" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"><title>Google Cloud</title><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm6.5 13.5h-13c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h13c.28 0 .5.22.5.5s-.22.5-.5.5zm-3-4h-7c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h7c.28 0 .5.22.5.5s-.22.5-.5.5zm-2-4h-3c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h3c.28 0 .5.22.5.5s-.22.5-.5.5z"/></svg>
    )
}
