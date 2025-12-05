
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight, Instagram, Twitter, Youtube, Gitlab } from 'lucide-react';
import Image from 'next/image';

const socialLinks = [
  { href: '#', name: 'Instagram', icon: <Instagram className="h-4 w-4" /> },
  { href: '#', name: 'Twitter/X', icon: <Twitter className="h-4 w-4" /> },
  { href: '#', name: 'YouTube', icon: <Youtube className="h-4 w-4" /> },
  { href: '#', name: 'Pinterest', icon: <Gitlab className="h-4 w-4" /> },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* CTA Section */}
          <div className="md:col-span-5 lg:col-span-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Have a Cool Idea? Let&apos;s Collaborate.
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
                  1330 Huffman Rd, Anchorage,
                  <br />
                  Alask, United States
                </p>
              </div>
              <div>
                 <h3 className="font-semibold text-muted-foreground">Social</h3>
                  <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    {socialLinks.map(link => (
                        <a href={link.href} key={link.name} className="flex items-center gap-2 hover:text-primary">
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
                      <li><a href="tel:+6612058698720" className="hover:text-primary">+661 2058 6987 20</a></li>
                      <li><a href="mailto:Hello@Studio.com" className="hover:text-primary">Hello@Studio.com</a></li>
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
      <div className="relative h-72 w-full">
        <Image 
            src="https://picsum.photos/seed/footer-bg/1600/400" 
            alt="Abstract decorative image"
            fill
            className="object-cover"
            data-ai-hint="abstract dark texture"
        />
        <div className="absolute inset-0 flex items-end justify-center bg-black/30">
          <h2 className="text-white font-extrabold text-5xl md:text-7xl lg:text-[12rem] tracking-widest uppercase leading-none">
            Ampire
          </h2>
        </div>
      </div>
    </footer>
  );
}
