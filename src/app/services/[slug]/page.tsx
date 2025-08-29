"use client";

import { useEffect, useState } from 'react';
import { getServiceBySlug } from '@/lib/data';
import type { Service } from '@/lib/data';
import { PageTitleHeader } from '@/components/page-title-header';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Skeleton } from '@/components/ui/skeleton';
import { PortfolioSection } from '@/components/portfolio-section';
import { TsaSection } from '@/components/tsa-section';

export default function ServicePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      try {
        const serviceData = await getServiceBySlug(slug);
        setService(serviceData);
      } catch (error) {
        console.error("Failed to fetch service:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchService();
    }
  }, [slug]);

  if (loading) {
    return (
        <div className="flex min-h-screen flex-col bg-transparent text-foreground">
            <Header />
            <main className="flex-1">
                <div className="container py-24 sm:py-32">
                    <Skeleton className="h-10 w-1/4 mx-auto" />
                    <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
                    <div className="mt-12 max-w-4xl mx-auto space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
  }
  
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
