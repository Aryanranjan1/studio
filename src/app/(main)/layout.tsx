
import { Header } from '@/components/header';
import { cn } from '@/lib/utils';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />
       <main className="flex-1 md:pl-20 bg-background">{children}</main>
    </div>
  );
}
