import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone } from "lucide-react";
import { AmpireLogo } from "./logo";
import { Button } from "./ui/button";

const socialLinks = [
  { icon: <Facebook className="h-4 w-4" />, href: "/", label: "Facebook" },
  { icon: <Twitter className="h-4 w-4" />, href: "/", label: "Twitter" },
  { icon: <Instagram className="h-4 w-4" />, href: "/", label: "Instagram" },
  { icon: <Linkedin className="h-4 w-4" />, href: "/", label: "LinkedIn" },
];

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
              {socialLinks.map((link) => (
                <Button key={link.label} variant="outline" size="icon" asChild>
                  <Link href={link.href} aria-label={link.label}>{link.icon}</Link>
                </Button>
              ))}
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
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">Kuala Lumpur, Malaysia</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                <a href="mailto:contact@ampirestudio.com" className="text-muted-foreground hover:text-primary transition-colors">
                  contact@ampirestudio.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                <a href="tel:+15551234567" className="text-muted-foreground hover:text-primary transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
            </ul>
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
