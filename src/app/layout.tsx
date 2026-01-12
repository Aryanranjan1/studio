
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Toaster } from '@/components/ui/toaster';
import { LenisProvider } from '@/components/lenis-provider';
import { GoogleAnalytics } from '@/components/google-analytics';
import { Suspense } from 'react';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: {
    default: 'Ampire Studio',
    template: '%s — Ampire Studio',
  },
  metadataBase: new URL('https://ampire.studio'),
  description: 'A digital design and development agency specializing in bespoke websites and applications.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ampire Studio',
    description: 'A digital design and development agency specializing in bespoke websites and applications.',
    url: '/',
    siteName: 'Ampire Studio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Ampire Studio',
    card: 'summary_large_image',
  },
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* These preconnect hints are now correctly placed outside of a manual <head> tag */}
      <link rel="preconnect" href="https://ampire-studio-92664092-32a02.firebaseapp.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://apis.google.com" crossOrigin="anonymous" />
      
      <body className={cn('antialiased', inter.variable, spaceGrotesk.variable)} suppressHydrationWarning={true}>
        <LenisProvider>
          <FirebaseClientProvider>
            <Suspense>
              <GoogleAnalytics />
            </Suspense>
            {children}
            <Toaster />
          </FirebaseClientProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
