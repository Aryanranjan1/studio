import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { IntakeForm } from '@/components/intake-form';
import { PageTitleHeader } from '@/components/page-title-header';

export default function ProjectIntakePage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <Header />
      <main className="flex-1">
        <PageTitleHeader
            title="Web Design Project Discovery"
            subtitle="This questionnaire is designed to give us a deep understanding of your business and what you need from your new website. Please be as detailed as possible."
        />
        <div className="container py-16 sm:py-24">
            <IntakeForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
