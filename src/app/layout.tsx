
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/components/theme-provider';
import { SuccessPopupProvider } from '@/hooks/use-success-popup';
import { getSettings } from '@/lib/data';
import type { SiteSettings } from '@/lib/data';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ItemDrawerProvider } from '@/hooks/use-item-drawer';
import { ItemDrawer } from '@/components/item-drawer';
import SmoothScroll from '@/components/smooth-scroll';

export const metadata: Metadata = {
  metadataBase: new URL('https://ampire.studio'), // Replace with your actual domain
  title: {
    default: 'Top Web Design & Development Agency in Malaysia | AMpire Studio',
    template: '%s | AMpire Studio',
  },
  description: 'AMpire Studio is a top-tier web design and development agency in Malaysia. We build high-performance websites and deliver branding solutions that help businesses claim their digital throne.',
  keywords: ['web design malaysia', 'web development malaysia', 'digital agency malaysia', 'next.js development', 'branding agency'],
  openGraph: {
    title: 'Top Web Design & Development Agency in Malaysia | AMpire Studio',
    description: 'We build high-performance websites and deliver branding solutions that help businesses claim their digital throne.',
    url: 'https://ampire.studio', // Replace with your actual domain
    siteName: 'AMpire Studio',
    images: [
      {
        url: '/og-image.png', // Make sure to have an og-image.png in your public folder
        width: 1200,
        height: 630,
        alt: 'AMpire Studio - Web Design & Development Agency Malaysia',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Web Design & Development Agency in Malaysia | AMpire Studio',
    description: 'We build high-performance websites and deliver branding solutions that help businesses claim their digital throne.',
    // creator: '@yourtwitterhandle', // Optional: Add your Twitter handle
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings: SiteSettings = await getSettings();
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <SuccessPopupProvider>
            <ItemDrawerProvider>
              <Header />
              <SmoothScroll>
                <div className='relative z-0'>
                  {children}
                </div>
              </SmoothScroll>
              <Footer settings={settings} />
              <Toaster />
              <ItemDrawer />
            </ItemDrawerProvider>
          </SuccessPopupProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
