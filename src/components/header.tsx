'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from './ui/button';
import {
  Home,
  User,
  Briefcase,
  Book,
  Mail,
  PanelLeft,
  ShoppingBag,
  HelpCircle,
  Crown,
  AppWindow,
  Linkedin,
  Instagram,
  Dribbble,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import { usePublicSettings } from '@/hooks/use-settings';

// This is an inline SVG component for the Pinterest icon.
const PinterestIcon = (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.103 3.203 9.422 7.625 11.23.02-.42.043-.98.043-1.16 0-.44-.288-.97-.288-.97s-.683-2.73.27-4.55c.866-1.66 2.73-5.4 2.73-7.44 0-3.23-2.25-6.04-5.08-6.04-4.09 0-6.78 3.06-6.78 6.59 0 2.11.81 5.08 2.84 5.08.81 0 1.6-8.56 1.6-2.5 0-2.25-1.32-3.98-2.67-3.98-2.16 0-3.64 1.52-3.64 4.02 0 1.34.5 2.38 1.2 3.1.09.09.09.19.06.27l-.24.91c-.05.19-.22.24-.4.15a8.21 8.21 0 0 1-4.02-5.7C.32 8.71 3 3.14 8.03 3.14c5.63 0 9.77 3.82 9.77 9.17 0 5.15-3.06 10.05-7.14 10.05-1.39 0-2.7-.72-3.14-1.55l-.01.01c-.13-.3-.12-.31-.1-.45l.6-2.58.01-.01c.14-.59.5-1.12.5-1.12.44.8 1.48 1.48 2.5 1.48 2.9 0 5.2-2.7 5.2-6.23 0-2.45-1.3-4.3-3.95-4.3-2.9 0-4.7 2.1-4.7 4.5 0 1.1.3 2.1.9 2.8.3.4.3.5.2 1l-.2 1.1c-.1.5-.1.6-.2 1l-1.3 5.4c-.4 1.8-1.5 4.3-1.5 4.3-.2.8.2 1.7.2 1.7s.4-1.8.5-2.2c.2-.5.5-1.4.5-1.4a12.18 12.18 0 0 0 7.6-11.23C24 5.373 18.627 0 12 0z"/>
    </svg>
);


const mainNavLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: User },
  { href: '/services', label: 'Services', icon: Briefcase },
  { href: '/portfolio', label: 'Work', icon: AppWindow },
  { href: '/blog', label: 'Blog', icon: Book },
  { href: '/store', label: 'Store', icon: ShoppingBag },
  { href: '/faq', label: 'FAQ', icon: HelpCircle },
  { href: '/contact', label: 'Contact', icon: Mail },
];

const NavLink = ({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          aria-label={label}
          className={cn(
            'relative flex h-12 w-12 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white',
            isActive && 'bg-primary/20 text-primary'
          )}
        >
          <Icon className="h-6 w-6" />
          {isActive && (
            <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary"></span>
          )}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export function Header() {
  const { settings } = usePublicSettings();
  const logoUrl = settings?.brandingConfig?.logoUrl;
  const socialLinks = settings?.contactConfig?.socialLinks;

  const socialIcons = [
    { name: 'LinkedIn', href: socialLinks?.linkedin, Icon: Linkedin },
    { name: 'Instagram', href: socialLinks?.instagram, Icon: Instagram },
    { name: 'Dribbble', href: socialLinks?.dribbble, Icon: Dribbble },
    { name: 'Pinterest', href: socialLinks?.pinterest, Icon: PinterestIcon },
  ].filter(link => link.href);

  return (
    <>
      {/* Desktop Sidebar */}
      <TooltipProvider>
        <header className="fixed left-0 top-0 z-50 hidden h-screen w-20 flex-col items-center justify-between border-r border-border bg-nav-footer py-6 md:flex">
          <div className="flex flex-col items-center gap-8">
            <Link href="/" className="font-headline text-xl font-bold text-primary" aria-label="Ampire Studio">
              {logoUrl ? (
                <Image src={logoUrl} alt={settings?.brandingConfig?.brandName || 'Logo'} width={40} height={40} className="rounded-md object-contain" />
              ) : (
                <Crown className="h-8 w-8" />
              )}
            </Link>
            <nav className="flex flex-col items-center gap-3">
              {mainNavLinks.map(link => (
                <NavLink key={link.href} {...link} />
              ))}
            </nav>
          </div>
          <div className="flex flex-col items-center gap-4">
             {socialIcons.map((link) => (
                <Tooltip key={link.name}>
                    <TooltipTrigger asChild>
                        <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name} className="text-white/70 hover:text-white transition-colors">
                            <link.Icon className="h-5 w-5" />
                        </a>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p>{link.name}</p>
                    </TooltipContent>
                </Tooltip>
             ))}
          </div>
        </header>
      </TooltipProvider>

      {/* Mobile Header */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-nav-footer px-4 md:hidden">
         <Link href="/" className="font-headline text-xl font-bold text-white md:text-primary">
            {settings?.brandingConfig?.brandName || 'Ampire'}
         </Link>
         <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className='text-white hover:bg-white/20 hover:text-white'>
                <PanelLeft className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-nav-footer">
              <SheetHeader>
                <SheetTitle>
                   <Link href="/" className="font-headline text-xl font-bold text-white">
                      {settings?.brandingConfig?.brandName || 'Ampire'}
                   </Link>
                </SheetTitle>
                <SheetDescription>
                  Navigate through our studio's offerings and works.
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {mainNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
      </header>
    </>
  );
}
