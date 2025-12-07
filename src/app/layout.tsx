
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'Blog — Ampire Studio',
  description: 'Articles, case studies, and strategies for modern brands and digital creators on web design, development, and automation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn('antialiased', inter.variable, spaceGrotesk.variable)}>
        <FirebaseClientProvider>
          <div className="flex min-h-screen w-full flex-col">
            <Header />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <main className="flex-1 p-4 sm:px-6 sm:py-0">
                {children}
              </main>
            </div>
          </div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
