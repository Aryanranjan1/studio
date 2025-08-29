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
        <svg fill="hsl(var(--primary))" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8"><title>React</title><path d="M12.001 4.494c-3.264 0-6.236 1.62-8.08 4.252a.33.33 0 00.02.435l.84.722c.123.104.3.104.422 0 .42-.36 1.023-1.043 1.023-1.043.14-.14.36-.107.456.042l1.325 2.182c.097.16.052.373-.1.492l-1.92 1.48c-.148.12-.184.33-.08.49L12 21.5l6.095-7.427a.333.333 0 00-.08-.49l-1.92-1.48a.333.333 0 00-.1-.492l1.325-2.182c.096-.15.316-.182.456-.042 0 0 .603.683 1.023 1.043.122.104.3 0 .422 0l.84-.722a.33.33 0 00.02-.435C18.237 6.113 15.265 4.493 12.001 4.494zM8.41 12.833a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm7.182 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/></svg>
    )
}

function NodeJsIcon() {
    return (
        <svg fill="hsl(var(--primary))" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8"><title>Node.js</title><path d="M11.733 24c-1.324 0-2.583-.312-3.722-.897-2.45-1.252-4.22-3.37-4.81-6.003L3 16.04V7.957l.2-1.06c.59-2.634 2.36-4.752 4.81-6.004C9.15.28 10.41 0 11.733 0c1.292 0 2.53.28 3.65.85C17.84 2.08 19.57 4.14 20.18 6.69l.23 1.01v8.52l-.23 1.01c-.61 2.55-2.34 4.61-4.8 5.84-1.12.57-2.358.85-3.65.85zm-5.7-16.14c0 .34.28.61.62.61h1.27c.23 0 .43-.13.53-.33l3.22-5.46v10.5h.94v-10.5l3.22 5.46c.1.2.3.33.53.33h1.27c.34 0 .62-.27.62-.61V7.25c0-.34-.28-.61-.62-.61h-1.27c-.23 0-.43.13-.53.33l-3.22 5.46V1.91h-.94v10.5L8.52 2.24c-.1-.2-.3-.33-.53-.33H6.72c-.34 0-.62.27-.62.61v.61z"/></svg>
    )
}

function WordPressIcon() {
    return (
        <svg fill="hsl(var(--primary))" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8"><title>WordPress</title><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.872 7.82l-3.208 8.82-3.04-4.227-1.542-2.146-2.28 6.326-1.57-.01L8.08 6.42l-3.847-5.35h2.15l2.87 3.992 1.54 2.146 2.28-3.17h2.15l-3.85 5.353 3.56 9.8h-2.15z"/></svg>
    )
}

function ShopifyIcon() {
    return (
        <svg fill="hsl(var(--primary))" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8"><title>Shopify</title><path d="M19.375 7.031c0-2.375-1.844-4.219-4.219-4.219H8.844c-2.375 0-4.219 1.844-4.219 4.219v.938h9.313c2.375 0 4.281 1.844 4.281 4.219v3.281c0 .516.422.938.938.938s.938-.422.938-.938v-8.438zM15.156 9.812H4.656v9.563C4.656 21.75 6.25 24 8.625 24h6.531c2.375 0 4.219-2.25 4.219-4.625v-9.563z"/></svg>
    )
}

function LaravelIcon() {
    return (
        <svg fill="hsl(var(--primary))" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8"><title>Laravel</title><path d="M23.23 7.882L13.473.294a1.963 1.963 0 00-1.946 0L1.77 7.882a1.963 1.963 0 00-.973 1.7V14.42a1.963 1.963 0 00.973 1.7l9.757 7.588a1.963 1.963 0 001.946 0l9.757-7.588a1.963 1.963 0 00.973-1.7V9.58a1.963 1.963 0 00-.973-1.698zM12.5 2.45l8.36 6.5-4.18 3.25-8.36-6.5zm-1.14 11.5V9.77l-7.22-5.61v4.18zm2.28 0l7.22-5.61v-4.18L13.64 13.95zm.25 6.6l-8.36-6.5 4.18-3.25 8.36 6.5z"/></svg>
    )
}

function MongoDBIcon() {
    return (
        <svg fill="hsl(var(--primary))" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8"><title>MongoDB</title><path d="M12.755 24C6.54 24 1.393 19.33 1.393 13.623c0-3.954 2.545-7.33 6.07-8.828.27-.11.502-.02.628.25.127.27.01.54-.26.65-3.08 1.34-5.045 4.15-5.045 7.928 0 4.93 4.54 9.008 9.27 9.008s8.94-3.69 8.94-8.37c0-3.95-2.28-7.05-5.59-8.24-.27-.1-.36-.33-.23-.59.13-.27.4-.37.66-.25 3.73 1.32 6.13 4.81 6.13 8.99 0 5.61-4.99 10.38-10.94 10.38zM12.002 8.79c-1.39 0-2.92.23-3.93.63-.99.4-.99.63 0 1.03.98.4 2.53.63 3.93.63s2.95-.23 3.93-.63c1-.4 1-.63 0-1.03-.98-.4-2.54-.63-3.93-.63zm-.02 10.33c-3.97 0-7.68-1.52-7.68-3.63S8.01 12 11.98 12c3.98 0 7.7 1.53 7.7 3.63s-3.72 3.5-7.7 3.5z"/></svg>
    )
}

function AWSIcon() {
    return (
        <svg fill="hsl(var(--primary))" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8"><title>Amazon AWS</title><path d="M16.94 17.53c.12.06.26.09.39.09.5 0 .97-.24 1.3-.64.33-.4.5-.9.5-1.42 0-.6-.2-1.15-.59-1.62-.4-.46-.94-.7-1.54-.7-.57 0-1.1.2-1.55.55l.2-.95c.2-.95.1-1.92-.28-2.8-.3-1.03-.45-2.07-.45-3.13 0-.66.1-1.3.28-1.9.46-1.5.86-2.93 1.2-4.32l.33 1.5c.3 1.3.7 2.6 1.15 3.86.1.26.3.43.53.48.24.04.47-.03.65-.18l-.2-1.05c-.34-1.8-.73-3.55-1.17-5.26-.06-.23-.13-.5-.22-.8L17.6 0h-2.5l.34 1.7c.33 1.6.53 3.2.53 4.86 0 .9-.1 1.76-.28 2.6-.1.4-.23.8-.38 1.18L12.5 3.4l-2.8 6.9c-.15-.4-.28-.78-.38-1.2-.18-.8-.28-1.7-.28-2.6 0-1.65.2-3.25.53-4.85L7.9 0H5.4l-.5 2.4c-.45 1.7-.84 3.46-1.18 5.27L3.5 6.6c.2.14.4.22.65.18.23-.05.43-.22.53-.48.45-1.26.85-2.56 1.16-3.85l.32-1.5c.34 1.4.74 2.8 1.2 4.3.18.6.28 1.25.28 1.92 0 1.05-.14 2.1-.44 3.12-.4.9-.5 1.86-.3 2.8l.2.95c-.45-.35-.98-.55-1.55-.55-.6 0-1.15.24-1.55.7-.4.47-.6.98-.6 1.62 0 .5.17 1 .5 1.4.34.4.8.65 1.3.65.13 0 .27-.03.4-.1l.36 1.62c.2.9.33 1.8.33 2.73 0 .4-.03.8-.08 1.18l-1.9-4.4c-.1-.23-.3-.4-.5-.45-.24-.04-.47.03-.65.18l.3 1.45c.5 2.4.8 4.75 1.04 7.04.02.2.1.4.2.6L7.1 24h2.5l-.25-1.2c-.2-1-.33-2-.33-3.03 0-.85.1-1.7.3-2.5l2.8 6.55 2.8-6.55c.2.8.3 1.65.3 2.5 0 1 .13 2.05.32 3.05l-.25 1.2h2.5l.4-1.8c.1-.58.17-1.17.2-1.75.25-2.3.56-4.6.94-6.8l.28-1.45c.18-.15.35-.22.6-.18.2.05.4.17.5.4l-1.9 4.4c-.05-.4-.08-.8-.08-1.2 0-.9.13-1.8.33-2.7l.36-1.62z"/></svg>
    )
}

function GoogleCloudIcon() {
    return (
        <svg fill="hsl(var(--primary))" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8"><title>Google Cloud</title><path d="M5.36 14.227c-1.22-1.5-1.9-3.32-1.9-5.28 0-4.99 4.38-9.05 9.77-9.05 2.9 0 5.59 1.22 7.42 3.17-1.12-2.83-4.13-4.8-7.6-4.8-4.99 0-9.05 3.73-9.05 8.35 0 1.99.76 3.86 2.03 5.37l-.77.24zM20.64 9.773c1.21 1.5 1.9 3.32 1.9 5.28 0 4.99-4.38 9.05-9.77 9.05-2.9 0-5.59-1.22-7.42-3.17 1.12 2.83 4.13 4.8 7.6 4.8 4.99 0 9.05-3.73 9.05-8.35 0-1.99-.76-3.86-2.03-5.37l.77-.24z"/></svg>
    )
}
