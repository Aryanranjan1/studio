import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getFaqs } from '@/lib/data';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const pricingTiers = [
  {
    name: 'Website',
    price: '$5k - $15k',
    description: 'For businesses needing a premium, high-performing website.',
    features: [
      'Custom UI/UX Design',
      '5-10 Custom Pages',
      'CMS Integration',
      'Advanced SEO Setup',
      'Mobile-First Responsive',
    ],
    cta: 'Get Started',
    isPrimary: false,
  },
  {
    name: 'Platform',
    price: '$15k - $50k+',
    description:
      'For businesses requiring a scalable web application or platform.',
    features: [
      'Everything in Website',
      'User Authentication',
      'Custom Database Schema',
      'Third-party API Integrations',
      'Advanced Automation',
    ],
    cta: 'Start Building',
    isPrimary: true,
  },
  {
    name: 'Retainer',
    price: 'Custom',
    description: 'For ongoing design, development, and strategic support.',
    features: [
      'Dedicated Hours/Month',
      'Priority Support',
      'Proactive Site Monitoring',
      'Performance Optimization',
      'Strategic Guidance',
    ],
    cta: 'Discuss Partnership',
    isPrimary: false,
  },
];

export default function PricingPage() {
  const faqs = getFaqs();

  return (
    <div className="w-full bg-background text-foreground">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center">
          <Badge
            variant="outline"
            className="border-primary/50 text-primary"
          >
            Pricing
          </Badge>
          <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Transparent Pricing for Premium Value
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Investing in quality digital infrastructure is investing in your
            growth. We offer clear pricing for exceptional results.
          </p>
        </section>

        {/* Pricing Tiers */}
        <section className="mt-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.name}
                className={`flex flex-col ${
                  tier.isPrimary
                    ? 'border-primary shadow-lg shadow-primary/10'
                    : ''
                }`}
              >
                <CardHeader
                  className={tier.isPrimary ? 'bg-primary/5' : ''}
                >
                  <CardTitle className="font-headline text-2xl">
                    {tier.name}
                  </CardTitle>
                  <p className="text-4xl font-bold">{tier.price}</p>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow pt-6">
                  <ul className="space-y-4">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    size="lg"
                    className="w-full"
                    variant={tier.isPrimary ? 'default' : 'outline'}
                  >
                    <Link href="/contact">{tier.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            All prices are estimates. We provide a detailed, fixed-price quote after our discovery call.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="mx-auto mt-24 max-w-4xl">
           <div className="text-center">
            <h2 className="font-headline text-3xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="mt-12 w-full">
            {faqs.slice(0, 4).map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b-border/50"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary [&[data-state=open]]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
           <div className="mt-8 text-center">
              <Button asChild variant="ghost" className="text-primary hover:text-primary">
                <Link href="/faq">
                  See all FAQs <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
        </section>
      </main>
    </div>
  );
}
