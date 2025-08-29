"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone, LucideIcon } from "lucide-react";
import { AmpireLogo } from "./logo";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { getSettings } from "@/lib/data";
import type { SiteSettings, SocialLink } from "@/lib/data";

const socialIcons: { [key in SocialLink['platform']]: LucideIcon } = {
  Facebook: Facebook,
  Twitter: Twitter,
  Instagram: Instagram,
  Linkedin: Linkedin,
};

const serviceLinks = [
    { name: "Web Design & Development", href: "/#services" },
    { name: "E-Commerce Solutions", href: "/#services" },
    { name: "Branding & Graphic Design", href: "/#services" },
    { name: "Social Media Management", href: "/#services" },
    { name: "SEO & Digital Marketing", href: "/#services" },
    { name: "Mobile App Development", href: "/#services" },
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
    <footer className="border-t border-white/10 bg-background/50 backdrop-blur-lg">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* AMpire Studio */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <AmpireLogo className="text-primary" />
              <span className="font-headline text-xl font-bold">AMpire Studio</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              We help businesses establish, enhance, and grow their digital presence through strategic design and development solutions.
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

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} AMpire Studio. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
