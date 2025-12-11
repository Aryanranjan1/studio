

import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';
import { socialLinks } from '@/lib/social-links';
import { getContactDetails } from '@/lib/data';

const footerSocials = socialLinks;

export function Footer() {
  const currentYear = new Date().getFullYear();
  const contactDetails = getContactDetails();

  return (
    <footer className="w-full border-t border-white/20 bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* CTA Section */}
          <div className="md:col-span-5 lg:col-span-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Have a Cool Idea? Let's Collaborate.
            </h2>
            <Button asChild variant="outline" className="mt-6 rounded-full border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
              <Link href="/contact">
                Get In Touch <span className='ml-2 text-primary'>+</span>
              </Link>
            </Button>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Links Section */}
          <div className="md:col-span-7 lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-muted-foreground">Location</h3>
                <p className="mt-2 text-sm">
                  {contactDetails.address.line1}
                  <br />
                  {contactDetails.address.line2}
                </p>
              </div>
               <div>
                 <h3 className="font-semibold text-muted-foreground">Social</h3>
                  <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    {footerSocials.map(link => (
                        <a href={link.href} key={link.name} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
                          <span className='text-primary'>•</span> {link.name}
                        </a>
                    ))}
                  </div>
              </div>
            </div>
            
            <div className="sm:col-span-2 flex justify-end">
               <div className="grid grid-cols-1 gap-8 text-left sm:text-right">
                  <div>
                    <h3 className="font-semibold text-muted-foreground">Contact</h3>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li><a href={`tel:${contactDetails.phone}`} className="hover:text-primary">{contactDetails.phone}</a></li>
                      <li><a href={`mailto:${contactDetails.email}`} className="hover:text-primary">{contactDetails.email}</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-muted-foreground">Helpful Links</h3>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
                      <li><Link href="/about" className="hover:text-primary">About</Link></li>
                      <li><Link href="/services" className="hover:text-primary">Services</Link></li>
                      <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
                      <li><Link href="/portfolio" className="hover:text-primary">Work</Link></li>
                    </ul>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-72 w-full overflow-hidden">
        <Image 
            src="https://picsum.photos/seed/footer-texture/1600/400" 
            alt="Abstract decorative image"
            fill
            loading="lazy"
            className="object-cover"
            data-ai-hint="abstract dark texture"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end bg-primary/90">
            <h2 className="relative text-black font-extrabold text-7xl md:text-9xl lg:text-[12rem] tracking-widest uppercase leading-none text-center" style={{ transform: 'translateY(15px)' }}>
                Ampire
            </h2>
        </div>
      </div>
    </footer>
  );
}
