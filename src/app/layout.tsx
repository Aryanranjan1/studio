
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Toaster } from '@/components/ui/toaster';
import { LenisProvider } from '@/components/lenis-provider';
import { GoogleAnalytics } from '@/components/google-analytics';
import { Suspense } from 'react';
import { getSiteSettings } from '@/lib/firestore/settings.server';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const titleTemplate = settings?.seoConfig?.defaultMetaTitleTemplate || '%s | Ampire Studio';
  const siteName = settings?.brandingConfig?.websiteName || 'Ampire Studio';
  const description = settings?.seoConfig?.defaultMetaDescription || 'A digital design and development agency specializing in bespoke websites and applications.';
  const siteUrl = settings?.seoConfig?.baseSiteUrl || 'https://ampire.studio';

  const defaultMetadata: Metadata = {
    title: {
      default: siteName,
      template: titleTemplate,
    },
    metadataBase: new URL(siteUrl),
    description,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: siteName,
      description,
      url: '/',
      siteName,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: siteName,
      card: 'summary_large_image',
    },
  };
  
  if (!settings || !settings.brandingConfig) {
    return defaultMetadata;
  }

  const { faviconUrl, defaultOgImageUrl } = settings.brandingConfig;
  const dynamicMetadata: Metadata = { ...defaultMetadata };

  if (faviconUrl) {
    dynamicMetadata.icons = {
      icon: faviconUrl,
    };
  }

  if (defaultOgImageUrl) {
      dynamicMetadata.openGraph = {
      ...defaultMetadata.openGraph,
      images: [defaultOgImageUrl],
    };
  }

  return dynamicMetadata;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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

    