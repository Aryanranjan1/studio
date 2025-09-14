
import { Footer } from '@/components/footer';
import { ContactSection } from '@/components/contact-section';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <main className="flex-1 pt-16">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
