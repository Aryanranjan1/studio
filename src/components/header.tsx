import Link from "next/link";
import { AmpireLogo } from "./logo";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";


export function Header() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
    { name: "Articles", href: "/articles" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/50 backdrop-blur-lg">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <AmpireLogo className="text-primary" />
          <span className="font-headline text-xl font-bold">AMpire Studio</span>
        </Link>
        <nav className="ml-auto hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.slice(0, 4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/80 transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-6">
            <ThemeSwitcher />
          <Button asChild className="hidden md:flex">
            <Link href="/contact">Get in touch</Link>
          </Button>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="p-4">
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                  <Button asChild className="mt-6 w-full">
                    <Link href="/contact">Get in touch</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
