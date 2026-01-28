
'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight, Dribbble, Instagram, Linkedin, Twitter } from 'lucide-react';
import { usePublicSettings } from '@/hooks/use-settings';

export function Footer() {
  const { settings } = usePublicSettings();
  const contact = settings?.contactConfig;
  const socials = contact?.socialLinks;

  const footerLinks = [
      { name: 'About', href: '/about'},
      { name: 'Services', href: '/services'},
      { name: 'Work', href: '/portfolio'},
      { name: 'Blog', href: '/blog'},
      { name: 'Privacy Policy', href: '#'}
  ]

  return (
      <footer className="footer-main bg-nav-footer border-t border-white/20">
          <div className="footer-cta p-8 md:p-12 border-b border-white/20">
              <h2 className="font-headline text-4xl md:text-5xl font-bold">Let's build something great together.</h2>
              <p className="text-lg mt-4 max-w-xs text-primary-foreground">
                Have a project in mind? Let's build something great together. Get in Touch
              </p>
              <Button asChild size="lg" className="mt-8 w-full md:w-auto">
                <Link href="/contact">Get In Touch <ArrowRight className="ml-2 w-5 h-5"/></Link>
              </Button>
          </div>

          <div className="footer-grid grid grid-cols-2 md:grid-cols-4 gap-px bg-white/20 border-b border-white/20">
              <div className="grid-item bg-nav-footer p-8">
                  <div className="grid-label text-muted-foreground text-sm uppercase">Location</div>
                  <div className="grid-content mt-4">
                      {contact?.address || 'Kuala Lumpur, Malaysia'}
                  </div>
              </div>
              <div className="grid-item bg-nav-footer p-8">
                  <div className="grid-label text-muted-foreground text-sm uppercase">Social</div>
                  <div className="grid-content mt-4 space-y-2">
                      {socials?.linkedin && <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="block hover:text-primary">• LinkedIn</a>}
                      {socials?.instagram && <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="block hover:text-primary">• Instagram</a>}
                      {socials?.twitter && <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="block hover:text-primary">• Twitter/X</a>}
                      {socials?.dribbble && <a href={socials.dribbble} target="_blank" rel="noopener noreferrer" className="block hover:text-primary">• Dribbble</a>}
                  </div>
              </div>
              <div className="grid-item bg-nav-footer p-8">
                  <div className="grid-label text-muted-foreground text-sm uppercase">Contact</div>
                  <div className="grid-content mt-4 space-y-2">
                      {contact?.phone && <a href={`tel:${contact.phone}`} className="block hover:text-primary">{contact.phone}</a>}
                      {contact?.primaryEmail && <a href={`mailto:${contact.primaryEmail}`} className="block hover:text-primary text-sm break-all">{contact.primaryEmail}</a>}
                  </div>
              </div>
              <div className="grid-item bg-nav-footer p-8">
                  <div className="grid-label text-muted-foreground text-sm uppercase">Navigate</div>
                  <div className="grid-content mt-4 space-y-2">
                      {footerLinks.map(link => (
                        <Link key={link.href} href={link.href} className="block hover:text-primary">• {link.name}</Link>
                      ))}
                  </div>
              </div>
          </div>
          <div className="copyright text-center p-6 text-sm text-primary-foreground">
            &copy; {new Date().getFullYear()} {settings?.brandingConfig?.brandName || 'Ampire Studio'}. All Rights Reserved.
          </div>
      </footer>
  );
}

    