'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight, Dribbble, Instagram, Linkedin } from 'lucide-react';
import { usePublicSettings } from '@/hooks/use-settings';

// This is an inline SVG component for the Pinterest icon.
const PinterestIcon = (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.103 3.203 9.422 7.625 11.23.02-.42.043-.98.043-1.16 0-.44-.288-.97-.288-.97s-.683-2.73.27-4.55c.866-1.66 2.73-5.4 2.73-7.44 0-3.23-2.25-6.04-5.08-6.04-4.09 0-6.78 3.06-6.78 6.59 0 2.11.81 5.08 2.84 5.08.81 0 1.6-8.56 1.6-2.5 0-2.25-1.32-3.98-2.67-3.98-2.16 0-3.64 1.52-3.64 4.02 0 1.34.5 2.38 1.2 3.1.09.09.09.19.06.27l-.24.91c-.05.19-.22.24-.4.15a8.21 8.21 0 0 1-4.02-5.7C.32 8.71 3 3.14 8.03 3.14c5.63 0 9.77 3.82 9.77 9.17 0 5.15-3.06 10.05-7.14 10.05-1.39 0-2.7-.72-3.14-1.55l-.01.01c-.13-.3-.12-.31-.1-.45l.6-2.58.01-.01c.14-.59.5-1.12.5-1.12.44.8 1.48 1.48 2.5 1.48 2.9 0 5.2-2.7 5.2-6.23 0-2.45-1.3-4.3-3.95-4.3-2.9 0-4.7 2.1-4.7 4.5 0 1.1.3 2.1.9 2.8.3.4.3.5.2 1l-.2 1.1c-.1.5-.1.6-.2 1l-1.3 5.4c-.4 1.8-1.5 4.3-1.5 4.3-.2.8.2 1.7.2 1.7s.4-1.8.5-2.2c.2-.5.5-1.4.5-1.4a12.18 12.18 0 0 0 7.6-11.23C24 5.373 18.627 0 12 0z"/>
    </svg>
);


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
                      {socials?.pinterest && <a href={socials.pinterest} target="_blank" rel="noopener noreferrer" className="block hover:text-primary">• Pinterest</a>}
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
