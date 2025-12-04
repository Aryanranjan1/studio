import Link from 'next/link';
import { Crown, Github, Twitter, Linkedin } from 'lucide-react';
import { getSiteSettings } from '@/lib/data';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  {
    href: '#',
    icon: <Twitter className="h-5 w-5" />,
    label: 'Twitter',
  },
  {
    href: '#',
    icon: <Github className="h-5 w-5" />,
    label: 'GitHub',
  },
  {
    href: '#',
    icon: <Linkedin className="h-5 w-5" />,
    label: 'LinkedIn',
  },
];

export function Footer() {
  const settings = getSiteSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/20 bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <Crown className="h-8 w-8 text-primary" />
              <span className="font-headline text-xl font-bold">
                {settings.title}
              </span>
            </Link>
            <p className="mt-2 text-muted-foreground">
              {settings.description}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div>
              <h3 className="font-headline font-semibold">Navigation</h3>
              <ul className="mt-4 space-y-2">
                {navLinks.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-headline font-semibold">More</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/faq"
                    className="text-muted-foreground hover:text-primary"
                  >
                    FAQ
                  </Link>
                </li>
                 <li>
                  <Link
                    href="/store"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Store
                  </Link>
                </li>
              </ul>
            </div>
             <div>
              <h3 className="font-headline font-semibold">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                 <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} {settings.title}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary"
                  aria-label={link.label}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
