"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone, LucideIcon } from "lucide-react";
import { AmpireLogo } from "./logo";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { getSettings } from "@/lib/data";
import type { SiteSettings, SocialLink } from "@/lib/data";

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16.75 13.96c.25.13.43.2.5.33.07.14.07.54-.03.73-.09.19-.54.54-.91.73-.37.2-.78.3-1.22.25-.44-.05-1.07-.25-2.02-1.02-.95-.77-1.56-1.56-1.75-1.94-.19-.37-.09-.57.09-.75.16-.16.33-.41.47-.56.14-.14.23-.28.33-.47.1-.19.05-.37-.03-.52-.07-.14-.68-1.64-.93-2.2-.25-.56-.5-.48-.68-.48-.18 0-.37.05-.56.09-.19.05-.47.28-.47.73 0 .45.23.89.28 1.02.05.13.25 1.54.25 1.64s.19 1.48.56 2.02c.37.54.73.78 1.13.97.4.2.77.25 1.02.25.25 0 .73-.05 1.02-.33.29-.28.47-.73.56-1.02.09-.28.09-.56.05-.73-.05-.18-.19-.28-.37-.42-.18-.14-.37-.23-.52-.28-.14-.05-.28-.05-.37.05-.1.09-.19.18-.28.33-.09.14-.14.23-.23.33-.09.1-.18.18-.28.23-.09.05-.23.09-.33.05-.09-.05-.28-.09-.52-.18-.23-.09-.46-.23-.68-.42-.22-.19-.42-.42-.56-.68-.14-.25-.23-.52-.28-.8-.05-.28-.05-.56-.05-.84 0-.28.05-.52.09-.73.05-.22.14-.43.28-.63.14-.19.33-.37.56-.52.23-.14.48-.23.75-.28.27-.05.54-.05.78 0 .25.05.48.14.68.28.19.14.33.33.42.56.09.23.14.48.14.75 0 .27-.05.52-.14.73-.09.22-.23.42-.42.56-.19.14-.42.23-.68.28-.26.05-.52.05-.78-.05zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c1.78 0 3.45-.47 4.93-1.3L22 22l-1.3-4.93C21.53 15.45 22 13.78 22 12c0-5.523-4.477-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    </svg>
  );

const socialIcons: { [key in SocialLink['platform']]: LucideIcon | ((props: React.SVGProps<SVGSVGElement>) => JSX.Element) } = {
  Facebook: Facebook,
  Whatsapp: WhatsappIcon,
  Instagram: Instagram,
  Linkedin: Linkedin,
};

const serviceLinks = [
    { name: "Web Design & Development", href: "/services" },
    { name: "E-Commerce Solutions", href: "/services" },
    { name: "Branding & Graphic Design", href: "/services" },
    { name: "SEO Strategies", href: "/services" },
    { name: "Custom Automations", href: "/services" },
    { name: "Mobile App Development", href: "/services" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Portfolio", href: "/work" },
  { name: "Articles", href: "/articles" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const unsubscribe = getSettings((settingsData) => {
        setSettings(settingsData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <footer className="border-t dark:border-white/10 dark:bg-background/50 dark:backdrop-blur-lg">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Ampire Studios */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <AmpireLogo className="text-primary" />
              <span className="font-headline text-xl font-bold">Ampire Studios</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              We help businesses and creators rise above the noise and claim their digital throne.
            </p>
            <div className="flex items-center gap-2">
              {settings?.socials?.map((link) => {
                  const Icon = socialIcons[link.platform];
                  return (
                    <Button key={link.platform} variant="outline" size="icon" asChild>
                      <Link href={link.href} aria-label={link.platform}><Icon className="h-4 w-4" /></Link>
                    </Button>
                  );
              })}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-headline font-semibold text-lg text-foreground">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-headline font-semibold text-lg text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-headline font-semibold text-lg text-foreground">Contact Info</h4>
            {settings ? (
                <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                    <span className="text-muted-foreground">{settings.address}</span>
                </li>
                <li className="flex items-start gap-3">
                    <Mail className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                    <a href={`mailto:${settings.contactEmail}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {settings.contactEmail}
                    </a>
                </li>
                <li className="flex items-start gap-3">
                    <Phone className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                    <a href={`tel:${settings.contactPhone}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {settings.contactPhone}
                    </a>
                </li>
                </ul>
            ) : (
                <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Ampire Studios. All rights reserved.
                </p>
                <p className="text-sm text-muted-foreground mt-1 font-headline">
                    Built For You. Crowned By Us. 👑
                </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
