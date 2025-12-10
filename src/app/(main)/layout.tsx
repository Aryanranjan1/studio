import { Header } from '@/components/header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pl-20">{children}</main>
    </div>
  );
}
