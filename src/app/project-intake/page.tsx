import { Footer } from '@/components/footer';
import { IntakeForm } from '@/components/intake-form';
import { PageTitleHeader } from '@/components/page-title-header';
import Plasma from '@/components/ui/Plasma';

export default function ProjectIntakePage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <main className="flex-1">
        <PageTitleHeader
            title="Web Design Project Discovery"
            subtitle="This questionnaire is designed to give us a deep understanding of your business and what you need from your new website. Please be as detailed as possible."
            imageUrl="https://picsum.photos/seed/project-discovery/1920/1080"
        />
        <div className="relative">
            <div className="absolute inset-0 -z-10">
                <Plasma color="#4F46E5" speed={0.5} />
                <div className="absolute inset-0 bg-background/90" />
            </div>
            <div className="container py-16 sm:py-24">
                <IntakeForm />
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
