import Link from "next/link";
import { AmpireLogo } from "./logo";
import { Button } from "./ui/button";

export function Header() {
  const navLinks = [
    { name: "Services", href: "/" },
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/50 backdrop-blur-lg">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <AmpireLogo className="text-primary" />
          <span className="font-headline text-xl font-bold">AMpire Studio</span>
        </Link>
        <nav className="ml-auto hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/80 transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <Button className="ml-auto md:ml-6" asChild>
          <Link href="/contact">Get in touch</Link>
        </Button>
      </div>
    </header>
  );
}
