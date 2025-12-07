
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getFounder, getTestimonials } from '@/lib/data';
import { 
  CheckCircle, 
  Target, 
  Users, 
  Eye, 
  Zap, 
  Bot, 
  Code, 
  TrendingUp,
  MoveRight,
  Workflow,
  Search,
  PenTool,
  Rocket
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => (
  <Card className="bg-card/70 backdrop-blur-sm">
    <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
      <div className="text-primary mb-2">{icon}</div>
      <div className="text-2xl font-bold font-headline text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </CardContent>
  </Card>
);

export default function AboutPage() {
  const founder = getFounder();

  const processSteps = [
    { icon: <Search className="h-6 w-6"/>, title: "Intake & Discovery", description: "Understanding your vision, goals, and audience." },
    { icon: <PenTool className="h-6 w-6"/>, title: "Prototype & Revise", description: "A functional prototype with one 24-hour revision round." },
    { icon: <Code className="h-6 w-6"/>, title: "Full Development", description: "Building the pixel-perfect, high-performance solution." },
    { icon: <Rocket className="h-6 w-6"/>, title: "Launch & Support", description: "Deployment, plus up to 5 free post-launch revisions." },
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: 'Result-Driven',
      description:
        'Your success is our success. We focus on measurable outcomes that help your business grow.',
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: 'Quality Craftsmanship',
      description:
        'We take pride in delivering high-quality, robust, and scalable solutions that stand the test of time.',
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Partnership',
      description:
        'We work with you, not just for you. We aim to be a long-term partner in your digital journey.',
    },
    {
      icon: <Eye className="h-8 w-8 text-primary" />,
      title: 'Transparency',
      description:
        'Clear communication and honest pricing. You’ll always know what to expect when working with us.',
    },
  ];

  return (
    <div className="w-full bg-background text-foreground">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-24">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
                <Badge
                    variant="outline"
                    className="border-primary/50 text-primary mb-4"
                >
                    Our Agency
                </Badge>
                <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                    We build digital experiences that move brands forward.
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                    We are a development-focused creative studio specializing in high-performance websites and intelligent automation for visionary brands.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                    <Button asChild size="lg">
                        <Link href="/contact" data-event="AboutCTA_StartProject">Start a Project</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" data-event="AboutCTA_WhatsApp">
                        <a href="#">Message on WhatsApp</a>
                    </Button>
                </div>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <StatCard icon={<Zap size={24} />} value="10k+" label="Hours Saved" />
                <StatCard icon={<Bot size={24} />} value="200+" label="Automations" />
                <StatCard icon={<Code size={24} />} value="500+" label="Websites Built" />
                <StatCard icon={<TrendingUp size={24} />} value="150%" label="Client ROI" />
            </div>
        </section>

        {/* Story Section */}
        <section>
            <div className="text-center mb-12">
                 <h2 className="font-headline text-3xl font-bold">Our Story</h2>
                 <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                    Driven by a passion for efficiency and elegant code.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                    <CardTitle className="font-headline text-xl">Where It Started</CardTitle>
                    <p className="mt-2 text-muted-foreground">Ampire began with a single mission: to provide enterprise-level development and design with the agility of a small studio.</p>
                </Card>
                 <Card className="p-6">
                    <CardTitle className="font-headline text-xl">Why We Exist</CardTitle>
                    <p className="mt-2 text-muted-foreground">We exist to close the gap between great ideas and the technology required to bring them to life, empowering SMEs to compete at scale.</p>
                </Card>
                 <Card className="p-6">
                    <CardTitle className="font-headline text-xl">How We Work</CardTitle>
                    <p className="mt-2 text-muted-foreground">Our process is built on rapid prototyping, transparent communication, and an obsession with hitting deadlines.</p>
                </Card>
                 <Card className="p-6">
                    <CardTitle className="font-headline text-xl">What Makes Us Different</CardTitle>
                    <p className="mt-2 text-muted-foreground">We focus on automation-first solutions and a 24-hour revision cycle, delivering exceptional quality at unmatched speed.</p>
                </Card>
            </div>
        </section>

        {/* Process Section */}
        <section>
            <div className="text-center mb-12">
                 <h2 className="font-headline text-3xl font-bold">Our Process</h2>
                 <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                    A clear path from idea to launch, designed for speed and precision.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {processSteps.map((step) => (
                    <Card key={step.title} className="p-6 text-center group hover:-translate-y-1 transition-transform">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            {step.icon}
                        </div>
                        <h3 className="text-lg font-bold font-headline">{step.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                    </Card>
                ))}
            </div>
        </section>

        {/* Founder Section */}
        <section className="mt-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="relative h-[400px] rounded-2xl lg:h-[500px]">
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                className="rounded-2xl object-cover"
              />
              <div className="absolute -bottom-4 -right-4 rounded-lg border-2 border-primary bg-card p-4 shadow-lg">
                <h3 className="font-bold">{founder.name}</h3>
                <p className="text-sm text-primary">{founder.role}</p>
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="font-headline text-3xl font-bold">
                Meet the Founder
              </h2>
              <p className="mt-4 text-muted-foreground">{founder.longBio}</p>
              <div className="mt-6 flex gap-4">
                <a
                  href="#"
                  className="text-primary transition hover:text-primary/80"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-primary transition hover:text-primary/80"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mt-24">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold">Our Values</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              The principles that guide our work and partnership with you.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="text-center p-4">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {value.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
