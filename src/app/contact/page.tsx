import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ContactSection } from '@/components/contact-section';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
