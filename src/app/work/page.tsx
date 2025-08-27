import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PortfolioSection } from '@/components/portfolio-section';

export default function WorkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <PortfolioSection />
      </main>
      <Footer />
    </div>
  );
}
