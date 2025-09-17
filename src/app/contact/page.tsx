
"use client";

import { Footer } from '@/components/footer';
import { ContactSection } from '@/components/contact-section';
import Plasma from '@/components/ui/Plasma';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1 relative flex items-center justify-center py-24 sm:py-32">
        <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/videos/abstract-bg.mp4"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>
           <div className="absolute inset-0 bg-background/50"></div>
        </div>
        <div className="relative z-10 w-full">
            <ContactSection />
        </div>
      </main>
      
    </div>
  );
}
