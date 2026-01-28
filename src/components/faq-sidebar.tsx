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

// This is an inline SVG component for the Pinterest icon.
const PinterestIcon = (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.103 3.203 9.422 7.625 11.23.02-.42.043-.98.043-1.16 0-.44-.288-.97-.288-.97s-.683-2.73.27-4.55c.866-1.66 2.73-5.4 2.73-7.44 0-3.23-2.25-6.04-5.08-6.04-4.09 0-6.78 3.06-6.78 6.59 0 2.11.81 5.08 2.84 5.08.81 0 1.6-8.56 1.6-2.5 0-2.25-1.32-3.98-2.67-3.98-2.16 0-3.64 1.52-3.64 4.02 0 1.34.5 2.38 1.2 3.1.09.09.09.19.06.27l-.24.91c-.05.19-.22.24-.4.15a8.21 8.21 0 0 1-4.02-5.7C.32 8.71 3 3.14 8.03 3.14c5.63 0 9.77 3.82 9.77 9.17 0 5.15-3.06 10.05-7.14 10.05-1.39 0-2.7-.72-3.14-1.55l-.01.01c-.13-.3-.12-.31-.1-.45l.6-2.58.01-.01c.14-.59.5-1.12.5-1.12.44.8 1.48 1.48 2.5 1.48 2.9 0 5.2-2.7 5.2-6.23 0-2.45-1.3-4.3-3.95-4.3-2.9 0-4.7 2.1-4.7 4.5 0 1.1.3 2.1.9 2.8.3.4.3.5.2 1l-.2 1.1c-.1.5-.1.6-.2 1l-1.3 5.4c-.4 1.8-1.5 4.3-1.5 4.3-.2.8.2 1.7.2 1.7s.4-1.8.5-2.2c.2-.5.5-1.4.5-1.4a12.18 12.18 0 0 0 7.6-11.23C24 5.373 18.627 0 12 0z"/>
    </svg>
);


export function FaqSidebar() {
  const { settings } = usePublicSettings();
  const contact = settings?.contactConfig;
  const socialLinks = contact?.socialLinks;

  const socialIcons = [
    { name: 'LinkedIn', href: socialLinks?.linkedin, Icon: Linkedin },
    { name: 'Instagram', href: socialLinks?.instagram, Icon: Instagram },
    { name: 'Dribbble', href: socialLinks?.dribbble, Icon: Dribbble },
    { name: 'Pinterest', href: socialLinks?.pinterest, Icon: PinterestIcon },
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
