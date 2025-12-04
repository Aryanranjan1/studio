import { HeroGrid } from '@/components/hero-grid';

export default function Home() {
  return (
    <main className="relative flex flex-col p-2 min-h-[calc(100vh-theme(spacing.14))] sm:min-h-screen sm:items-center sm:justify-center">
      <HeroGrid />
    </main>
  );
}
