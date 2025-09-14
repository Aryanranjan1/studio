import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/components/theme-provider';
import { Background } from '@/components/background';
import { SuccessPopupProvider } from '@/hooks/use-success-popup';
import { StaggeredMenu } from '@/components/staggered-menu';
import { getServices, getSettings } from '@/lib/data';
import type { Service, SiteSettings } from '@/lib/data';

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
    { label: 'Work', ariaLabel: 'View our work', link: '/work' },
    { label: 'Services', ariaLabel: 'View our services', link: '/services' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
  ];
  const socialLinks = settings.socials.map(s => ({ label: s.platform, link: s.href }));

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
              <Background />
              <StaggeredMenu
                items={navLinks}
                socialItems={socialLinks}
                />
              <div className='relative z-10'>
                {children}
              </div>
              <Toaster />
            </SuccessPopupProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
