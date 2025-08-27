import { Twitter, Github, Dribbble } from "lucide-react";
import { AmpireLogo } from "./logo";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <AmpireLogo className="text-primary" />
            <span className="font-headline text-lg font-bold">AMpire Studio</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AMpire Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Dribbble">
              <Dribbble className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
