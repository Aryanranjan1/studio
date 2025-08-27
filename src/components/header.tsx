import { AmpireLogo } from "./logo";
import { Button } from "./ui/button";

export function Header() {
  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/50 backdrop-blur-lg">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2">
          <AmpireLogo className="text-primary" />
          <span className="font-headline text-xl font-bold">AMpire Studio</span>
        </div>
        <nav className="ml-auto hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground/80 transition-colors hover:text-primary"
            >
              {link.name}
            </a>
          ))}
        </nav>
        <Button className="ml-auto md:ml-6">
          <a href="#contact">Get in touch</a>
        </Button>
      </div>
    </header>
  );
}
