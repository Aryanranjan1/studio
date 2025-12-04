import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getFounder, getTestimonials } from '@/lib/data';
import { CheckCircle, Target, Users, Eye } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const founder = getFounder();
  const testimonials = getTestimonials();

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
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center">
          <Badge
            variant="outline"
            className="border-primary/50 text-primary"
          >
            Our Story
          </Badge>
          <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            A boutique agency for visionary SMEs.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
            We are a solo-founder agency dedicated to providing enterprise-level
            web design, development, and automation services with a personal,
            boutique touch.
          </p>
        </section>

        {/* Founder Section */}
        <section className="mt-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="relative h-[400px] rounded-lg lg:h-[500px]">
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                className="rounded-lg object-cover"
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
              <Card key={value.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
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

        {/* Testimonials */}
        <section className="mt-24">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold">
              What Our Partners Say
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {testimonials.slice(0, 2).map((testimonial) => (
              <Card key={testimonial.name} className="flex flex-col">
                <CardContent className="flex-grow p-6">
                  <p className="text-lg italic text-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </CardContent>
                <CardHeader className="flex flex-row items-center gap-4 border-t border-border pt-6">
                  <Avatar>
                    <AvatarImage src={testimonial.image} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
