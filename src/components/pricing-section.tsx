
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const pricingTiers = [
  {
    name: 'Template Website',
    price: 'RM 200 – 300',
    description: 'For quick builds using pre-designed layouts. No domain, no hosting, no maintenance included.',
    features: [
      '1–5 Pages',
      'Pre-Built Template (Framer / Webflow)',
      'Basic Style Adjustments',
      'Mobile Responsive',
      'Contact Form',
      'Paid Add-Ons Only (Revisions, hosting, domain, etc.)',
    ],
    isFeatured: false,
    cta: 'Get Template',
  },
  {
    name: 'Custom Website',
    price: 'RM 999',
    description: 'For brands needing a proper, flexible website with structured content management.',
    features: [
      'Up to 10 Custom Pages',
      'Full Custom Design (Framer / Webflow / Next.js coded)',
      'Complete CMS Setup (Blog / Services / Portfolio)',
      'SEO-Ready Structure',
      'Mobile Responsive',
      '5 Revisions Included',
      '3 Months Maintenance',
      'Free Domain (< RM50)',
      '1 Year Basic Hosting Included',
    ],
    isFeatured: true,
    badge: 'Most Popular',
    cta: 'Choose Custom',
  },
  {
    name: 'Enterprise Build',
    price: 'Custom Quote',
    description: 'For businesses needing complex features, automation, or large-scale builds.',
    features: [
      'Unlimited Pages',
      'Advanced CMS',
      'Custom Integrations (API, CRM, Automations)',
      'E-commerce Optional',
      'Priority Support',
      'Scalable Maintenance Options',
      'SEO-Ready Structure',
      'Mobile Responsive',
      '5 Revisions Included',
      '3 Months Maintenance',
      'Free Domain (< RM50)',
      '1 Year Basic Hosting Included',
    ],
    isFeatured: false,
    cta: 'Contact Us',
  },
];

export function PricingSection() {
  return (
    <section className="bg-black py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge
            variant="outline"
            className="mb-4 border-primary/50 text-primary"
          >
            Pricing
          </Badge>
          <h2 className="font-headline text-3xl font-bold sm:text-4xl">
            Flexible Plans for Every Need
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Choose the perfect plan to kickstart your project and grow your
            business.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricingTiers.map(tier => (
            <Card
              key={tier.name}
              className={cn(
                'flex flex-col',
                tier.isFeatured && 'border-primary ring-2 ring-primary'
              )}
            >
              <CardHeader className="relative">
                {tier.isFeatured && tier.badge && (
                  <div className="absolute top-0 right-6 -translate-y-1/2">
                    <Badge>{tier.badge}</Badge>
                  </div>
                )}
                <CardTitle className="font-headline text-2xl">{tier.name}</CardTitle>
                <p className="text-4xl font-bold">{tier.price}</p>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <ul className="space-y-3">
                  {tier.features.map(feature => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full"
                  variant={tier.isFeatured ? 'default' : 'outline'}
                  size="lg"
                >
                  <Link href="/contact">
                    {tier.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
