import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/components/theme-provider';
import { SuccessPopupProvider } from '@/hooks/use-success-popup';
import { StaggeredMenu } from '@/components/staggered-menu';
import { getSettings } from '@/lib/data';
import type { SiteSettings } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AMpire Studio | Built For You. Crowned By Us.',
  description: 'We help businesses and creators rise above the noise and claim their digital throne. We craft digital experiences that attract, engage, and convert.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings: SiteSettings = getSettings();
  const navLinks = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Services', ariaLabel: 'View our services', link: '/services' },
    { label: 'Work', ariaLabel: 'View our work', link: '/work' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
  ];
  
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SuccessPopupProvider>
              <StaggeredMenu
                items={navLinks}
                cta={
                  <Button variant="secondary" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/80" asChild>
                    <Link href="/contact">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                }
                />
              <div className='relative z-0'>
                {children}
              </div>
              <Toaster />
            </SuccessPopupProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
