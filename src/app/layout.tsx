
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
  // 1. Fetch settings from the server-side source of truth
  const settings = await getSiteSettings();

  // 2. Define base values and fallbacks in one place
  const siteName = settings?.brandingConfig?.websiteName || 'Ampire Studio';
  const titleTemplate = settings?.seoConfig?.defaultMetaTitleTemplate || '%s | Ampire Studio';
  const description = settings?.seoConfig?.defaultMetaDescription || 'A digital design and development agency specializing in bespoke websites and applications.';
  const siteUrl = settings?.seoConfig?.baseSiteUrl || 'https://ampire.studio';
  const ogImage = settings?.brandingConfig?.defaultOgImageUrl;
  const favicon = settings?.brandingConfig?.faviconUrl;

  // 3. Construct the final metadata object
  const metadata: Metadata = {
    title: {
      default: siteName,
      template: titleTemplate,
    },
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: {
        default: siteName,
        template: titleTemplate,
      },
      description,
      url: '/',
      siteName,
      locale: 'en_US',
      type: 'website',
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      title: {
        default: siteName,
        template: titleTemplate,
      },
      description,
      card: 'summary_large_image',
      images: ogImage ? [ogImage] : [],
    },
  };

  // 4. Conditionally add the icons object only if a URL is provided
  // This gives it "privilege" by being explicitly set from the dynamic source.
  if (favicon) {
    metadata.icons = {
      icon: favicon,
    };
  }

  return metadata;
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
