
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Toaster } from '@/components/ui/toaster';
import { LenisProvider } from '@/components/lenis-provider';


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
  description: 'A digital design and development agency specializing in bespoke websites and applications.',
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn('antialiased', inter.variable, spaceGrotesk.variable)} suppressHydrationWarning={true}>
        <LenisProvider>
          <FirebaseClientProvider>
            {children}
            <Toaster />
          </FirebaseClientProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
