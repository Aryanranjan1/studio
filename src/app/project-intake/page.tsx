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
            videoUrl="/videos/project-intake.mp4"
        />
        <div className="relative">
            <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
                <video
                autoPlay
                loop
                muted
                playsInline
                src="/videos/abstract-bg.mp4"
                className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-background/80" />
            </div>
            <div className="container py-16 sm:py-24">
                <IntakeForm />
            </div>
        </div>
      </main>
      
    </div>
  );
}
