
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Dribbble, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { usePublicSettings } from '@/hooks/use-settings';

export function FaqSidebar() {
  const { settings } = usePublicSettings();
  const contact = settings?.contactConfig;
  const socialLinks = contact?.socialLinks;

  const socialIcons = [
    { name: 'LinkedIn', href: socialLinks?.linkedin, Icon: Linkedin },
    { name: 'Instagram', href: socialLinks?.instagram, Icon: Instagram },
    { name: 'Dribbble', href: socialLinks?.dribbble, Icon: Dribbble },
  ].filter(link => link.href);

  const processSteps = [
    "Proposal",
    "Prototype → 1 revision (24h)",
    "Build → 1 revision (24h)",
    "Final payment → Launch",
    "Post-launch: up to 5 free revisions"
  ]

  return (
    <aside className="space-y-8">
      {/* Still Need Help Card */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="font-headline text-xl">
            Still need help?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 text-muted-foreground">
            {socialIcons.map(social => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
                aria-label={social.name}
              >
                <social.Icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          {contact?.phone && (
          <Button
            asChild
            className="mt-6 w-full"
            data-event="whatsapp_click"
          >
            <a href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
              Message on WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          )}
          <p className="mt-2 text-xs text-center text-muted-foreground">
            Prefer a quick intake? Send a one-line brief on WhatsApp.
          </p>
          <Button
            asChild
            variant="outline"
            className="mt-4 w-full"
            data-event="contact_cta"
          >
            <Link href="/contact">
              Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
      
      {/* Onboarding Process Card */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="font-headline text-xl">
            Our Process
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {processSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
              <p className="text-sm text-muted-foreground">{step}</p>
            </div>
          ))}
          <Button asChild variant="link" className="p-0 mt-4">
             <Link href="/services">View full process <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}

    