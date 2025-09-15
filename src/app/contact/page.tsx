
import { Footer } from '@/components/footer';
import { ContactSection } from '@/components/contact-section';
import { PageTitleHeader } from '@/components/page-title-header';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <main className="flex-1">
        <PageTitleHeader 
            title="Ready to Start Your Project?"
            subtitle="Fill out the form below and we'll get back to you within 24 hours to discuss how we can build your digital empire."
        />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
