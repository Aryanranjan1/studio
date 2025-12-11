
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
    <section className="bg-background text-foreground py-24 sm:py-32 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="font-headline text-5xl md:text-6xl font-bold">Pricing</h2>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Choose the perfect plan to kickstart your project and grow your
            business.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-px border border-border bg-border">
          {pricingTiers.map(tier => (
            <div
              key={tier.name}
              className={cn(
                'flex flex-col p-8 bg-background relative',
                tier.isFeatured && 'border-2 border-primary'
              )}
            >
              {tier.isFeatured && tier.badge && (
                <div className="absolute top-0 right-6 -translate-y-1/2">
                  <Badge variant="default" className='bg-foreground text-background hover:bg-foreground/80'>{tier.badge}</Badge>
                </div>
              )}
              <h3 className="font-display text-2xl">{tier.name}</h3>
              <p className="text-4xl font-bold mt-4">{tier.price}</p>
              <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>
              
              <ul className="space-y-3 mt-8 mb-10 flex-grow">
                {tier.features.map(feature => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className="w-full mt-auto"
                variant={tier.isFeatured ? 'default' : 'outline'}
                size="lg"
              >
                <Link href="/contact">
                  {tier.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
