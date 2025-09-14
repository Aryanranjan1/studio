"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { useState, useEffect } from "react";
import { SiteSettings } from "@/lib/data";
import { getSettings } from "@/lib/data";

export function TsaSection() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const unsubscribe = getSettings((settingsData) => {
      setSettings(settingsData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="py-24 sm:py-32 bg-primary/90 text-primary-foreground">
      <div className="container">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
              Ready to Claim Your Digital Throne?
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/80">
              Let's discuss how we can help your brand rise above the noise.
              Schedule your free strategy call today.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/project-intake">Start Your Project</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href={settings ? `tel:${settings.contactPhone}` : '#'}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
