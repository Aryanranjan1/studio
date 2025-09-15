import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/components/theme-provider';
import { SuccessPopupProvider } from '@/hooks/use-success-popup';
import { getSettings } from '@/lib/data';
import type { SiteSettings } from '@/lib/data';
import { Header } from '@/components/header';
import { ReactLenis } from 'lenis/react';

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
  
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <ReactLenis root>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <SuccessPopupProvider>
              <Header />
              <div className='relative z-0'>
                {children}
              </div>
              <Toaster />
            </SuccessPopupProvider>
          </ThemeProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
