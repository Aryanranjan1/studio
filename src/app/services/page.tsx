import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ServiceCategorySection } from '@/components/service-category-section';

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <Header />
      <main className="flex-1">
        <ServiceCategorySection />
      </main>
      <Footer />
    </div>
  );
}
