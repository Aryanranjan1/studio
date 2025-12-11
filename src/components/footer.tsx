
import { getContactDetails } from '@/lib/data';
import { socialLinks } from '@/lib/social-links';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export function Footer() {
  const contactDetails = getContactDetails();
  
  const footerLinks = [
      { name: 'About', href: '/about'},
      { name: 'Services', href: '/services'},
      { name: 'Work', href: '/portfolio'},
      { name: 'Blog', href: '/blog'},
      { name: 'Privacy Policy', href: '#'}
  ]

  return (
      <footer className="footer-main bg-background border-t border-border">
          <div className="footer-cta p-8 md:p-12 border-b border-border">
              <h2 className="font-headline text-4xl md:text-5xl font-bold">Have a project?<br/>Let's talk.</h2>
              <Button asChild size="lg" className="mt-8 w-full md:w-auto">
                <Link href="/contact">Get In Touch <ArrowRight className="ml-2 w-5 h-5"/></Link>
              </Button>
          </div>

          <div className="footer-grid grid grid-cols-2 md:grid-cols-4 gap-px bg-border border-b border-border">
              <div className="grid-item bg-background p-8">
                  <div className="grid-label text-muted-foreground text-sm uppercase">Location</div>
                  <div className="grid-content mt-4">
                      {contactDetails.address.line1}<br/>{contactDetails.address.line2}
                  </div>
              </div>
              <div className="grid-item bg-background p-8">
                  <div className="grid-label text-muted-foreground text-sm uppercase">Social</div>
                  <div className="grid-content mt-4 space-y-2">
                      {socialLinks.map(link => (
                          <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="block hover:text-primary">• {link.name}</a>
                      ))}
                  </div>
              </div>
              <div className="grid-item bg-background p-8">
                  <div className="grid-label text-muted-foreground text-sm uppercase">Contact</div>
                  <div className="grid-content mt-4 space-y-2">
                      <a href={`tel:${contactDetails.phone}`} className="block hover:text-primary">{contactDetails.phone}</a>
                      <a href={`mailto:${contactDetails.email}`} className="block hover:text-primary text-sm break-all">{contactDetails.email}</a>
                  </div>
              </div>
              <div className="grid-item bg-background p-8">
                  <div className="grid-label text-muted-foreground text-sm uppercase">Navigate</div>
                  <div className="grid-content mt-4 space-y-2">
                      {footerLinks.map(link => (
                        <Link key={link.href} href={link.href} className="block hover:text-primary">• {link.name}</Link>
                      ))}
                  </div>
              </div>
          </div>
          <div className="copyright text-center p-6 text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Ampire Studio. All Rights Reserved.
          </div>
      </footer>
  );
}
