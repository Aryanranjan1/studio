'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaDribbble, FaBehance } from 'react-icons/fa6';
import Link from 'next/link';

export function FaqSidebar() {

  const processSteps = [
    "Proposal",
    "Prototype → 1 revision (24h)",
    "Build → 1 revision (24h)",
    "Final payment → Launch",
    "Post-launch: up to 5 free revisions"
  ]

  return (
    <aside className="sticky top-24 space-y-8">
      {/* Still Need Help Card */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="font-headline text-xl">
            Still need help?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 text-muted-foreground">
            <a
              href="#"
              className="transition-colors hover:text-primary"
              aria-label="Instagram"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="transition-colors hover:text-primary"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="transition-colors hover:text-primary"
              aria-label="Dribbble"
            >
              <FaDribbble className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="transition-colors hover:text-primary"
              aria-label="Behance"
            >
              <FaBehance className="h-6 w-6" />
            </a>
          </div>
          <Button
            asChild
            className="mt-6 w-full"
            data-event="whatsapp_click"
          >
            <a href="https://wa.me/1234567890" target="_blank">
              Message on WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
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
             <Link href="/process">View full process <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}
