'use client';

import Link from 'next/link';
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
  LayoutGrid,
  Book,
  Mail,
  PanelLeft,
  ShoppingBag,
  ShoppingCart,
  HelpCircle,
  Crown,
  LogIn,
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


const mainNavLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: User },
  { href: '/services', label: 'Services', icon: Briefcase },
  { href: '/portfolio', label: 'Portfolio', icon: LayoutGrid },
  { href: '/blog', label: 'Blog', icon: Book },
  { href: '/store', label: 'Store', icon: ShoppingBag },
  { href: '/faq', label: 'FAQ', icon: HelpCircle },
  { href: '/contact', label: 'Contact', icon: Mail },
];

const secondaryNavLinks = [
    { href: '/cart', label: 'Cart', icon: ShoppingCart },
]

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
          className={cn(
            'relative flex h-12 w-12 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary',
            isActive && 'bg-primary/10 text-primary'
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
  return (
    <>
      {/* Desktop Sidebar */}
      <TooltipProvider>
        <header className="fixed left-0 top-0 z-50 hidden h-screen w-20 flex-col items-center justify-between border-r border-border bg-background py-6 md:flex">
          <div className="flex flex-col items-center gap-8">
            <Link href="/" className="font-headline text-xl font-bold text-primary">
              <Crown className="h-8 w-8" />
            </Link>
            <nav className="flex flex-col items-center gap-3">
              {mainNavLinks.map(link => (
                <NavLink key={link.href} {...link} />
              ))}
            </nav>
          </div>
          <div className="flex flex-col items-center gap-3">
             {secondaryNavLinks.map(link => (
                <NavLink key={link.href} {...link} />
              ))}
            <div className='w-full h-px bg-border my-2' />
            <NavLink href="/login" label="Login" icon={LogIn} />
          </div>
        </header>
      </TooltipProvider>

      {/* Mobile Header */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 md:hidden">
         <Link href="/" className="font-headline text-xl font-bold text-primary">
            Ampire
         </Link>
         <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <PanelLeft className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle>
                   <Link href="/" className="font-headline text-xl font-bold text-primary">
                      Ampire
                   </Link>
                </SheetTitle>
                <SheetDescription>
                  Navigate through our studio's offerings and works.
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {[...mainNavLinks, ...secondaryNavLinks].map((link) => (
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
              <div className="absolute bottom-6 left-6 right-6">
                 <Button asChild className="w-full">
                    <Link href="/login">
                        <LogIn className="mr-2 h-5 w-5" />
                        Login
                    </Link>
                 </Button>
              </div>
            </SheetContent>
          </Sheet>
      </header>
    </>
  );
}
