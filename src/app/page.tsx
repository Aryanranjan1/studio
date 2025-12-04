import { HeroGrid } from '@/components/hero-grid';

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-[calc(100vh-theme(spacing.14))] sm:min-h-screen">
      <HeroGrid />
    </main>
  );
}
