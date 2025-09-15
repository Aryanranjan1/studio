
"use client";

import { Footer } from '@/components/footer';
import { ContactSection } from '@/components/contact-section';
import Plasma from '@/components/ui/Plasma';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1 relative flex items-center justify-center py-24 sm:py-32">
        <div className="absolute inset-0 z-0">
          <Plasma color="#4F46E5" speed={0.5} />
           <div className="absolute inset-0 bg-background/50"></div>
        </div>
        <div className="relative z-10 w-full">
            <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
