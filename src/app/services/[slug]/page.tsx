"use client";

import { getServiceBySlug } from '@/lib/data';
import type { Service } from '@/lib/data';
import { PageTitleHeader } from '@/components/page-title-header';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { PortfolioSection } from '@/components/portfolio-section';
import { TsaSection } from '@/components/tsa-section';

export default function ServicePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const service = getServiceBySlug(slug);
  
  if (!service) {
    return (
        <div className="flex min-h-screen flex-col bg-transparent text-foreground">
            <Header />
            <main className="flex-1">
                <PageTitleHeader 
                    title="Service Not Found"
                    subtitle="Sorry, we couldn't find the service you're looking for."
                />
            </main>
            <Footer />
        </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <Header />
      <main className="flex-1">
        <PageTitleHeader 
            title={service.title}
            subtitle={service.description}
        />
        <div className="container py-16 sm:py-24 space-y-24">
            <article className="prose prose-invert mx-auto max-w-4xl">
                 <p className="text-lg text-foreground/80 whitespace-pre-line">
                    {service.longDescription}
                </p>
            </article>

            <PortfolioSection filterBy={service.title} />
        </div>

        <TsaSection />
      </main>
      <Footer />
    </div>
  );
}
