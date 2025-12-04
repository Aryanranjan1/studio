import { CheckCircle, Zap, Shield, Heart } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: 'Lightning-Fast Performance',
    description:
      'We build websites that load in the blink of an eye, ensuring a seamless user experience.',
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: 'Fort-Knox Security',
    description:
      'Your digital assets are protected with enterprise-grade security measures.',
  },
  {
    icon: <Heart className="h-6 w-6 text-primary" />,
    title: 'Dedicated Partnership',
    description:
      "We're more than just a vendor; we're your partner in digital growth.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="bg-muted/30 py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="relative">
            <div className="relative h-[450px] w-full rounded-2xl">
              <Image
                src="https://picsum.photos/seed/why-us/800/1000"
                alt="Our team collaborating"
                fill
                className="rounded-2xl object-cover"
                data-ai-hint="team collaboration office"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 z-10 hidden rounded-2xl bg-card p-6 shadow-lg sm:block">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                  <CheckCircle className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">100+</p>
                  <p className="text-sm text-muted-foreground">
                    Projects Completed
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-headline text-3xl font-bold sm:text-4xl">
              Why Partner With Us?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We are committed to excellence, innovation, and, most
              importantly, your success.
            </p>
            <div className="mt-12 space-y-8">
              {features.map(feature => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-muted">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="mt-1 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
