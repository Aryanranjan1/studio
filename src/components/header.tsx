import { AmpireLogo } from "./logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-background/50 backdrop-blur-lg">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2">
          <AmpireLogo className="text-primary" />
          <span className="font-headline text-xl font-bold">AMpire Studio</span>
        </div>
      </div>
    </header>
  );
}
