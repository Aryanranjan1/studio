import { AmpireLogo } from "./logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2">
          <AmpireLogo className="text-primary" />
          <span className="font-headline text-xl font-bold">AMpire Studio</span>
        </div>
      </div>
    </header>
  );
}
