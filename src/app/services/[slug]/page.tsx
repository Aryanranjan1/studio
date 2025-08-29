
"use client";

import { useEffect, useState } from 'react';
import { services as allServicesData } from '@/lib/data';
import { PageTitleHeader } from '@/components/page-title-header';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Skeleton } from '@/components/ui/skeleton';
import { PortfolioSection } from '@/components/portfolio-section';
import { TsaSection } from '@/components/tsa-section';

// Data for service pages - in a real app, this would come from a CMS
const serviceDetails: { [key: string]: { title: string; description: string, longDescription: string } } = {
    'branding': {
        title: 'Branding & Identity',
        description: 'We craft unique brand identities that tell your story and resonate with your audience.',
        longDescription: 'Our branding process is a deep dive into your company\'s essence. We start with understanding your mission, vision, and values. From there, we develop a comprehensive brand strategy that informs every design decision. This includes logo design, color palette selection, typography, and voice & tone guidelines. We create a complete visual identity system that ensures consistency across all your marketing materials, from your website to your social media profiles to your business cards. The result is a powerful, cohesive brand that builds trust and loyalty.'
    },
    'ui-ux-design': {
        title: 'UI/UX Design',
        description: 'We design intuitive and beautiful user interfaces for exceptional digital experiences.',
        longDescription: 'User-Experience (UX) and User-Interface (UI) are at the heart of everything we build. Our design process is human-centered, starting with in-depth research to understand your users\' needs, behaviors, and pain points. We create detailed user personas and journey maps to guide the design. From there, we move to wireframing and prototyping, creating interactive models of the user flow. Finally, we craft a visually stunning UI that is not only beautiful but also accessible and easy to use. Our goal is to create seamless, engaging experiences that users love.'
    },
    'web-development': {
        title: 'Web Development',
        description: 'We build fast, responsive, and scalable websites using modern technologies.',
        longDescription: 'Our web development team specializes in building high-performance websites that are both visually stunning and technically sound. We use modern frameworks like Next.js and React to create fast, scalable, and SEO-friendly sites. We follow best practices for coding, ensuring your website is maintainable and secure. Whether you need a simple marketing site, a complex web application, or a headless CMS integration, we have the expertise to deliver a solution that meets your specific needs and exceeds your expectations.'
    },
    'mobile-app': {
        title: 'Mobile App Development',
        description: 'We design and develop high-performance mobile applications for iOS and Android.',
        longDescription: 'We build native and cross-platform mobile apps that deliver a fantastic user experience. Our team handles the entire lifecycle, from ideation and design to development, testing, and App Store submission. We focus on performance, security, and scalability, ensuring your app can grow with your user base. Whether you need a simple utility app or a complex social network, we have the skills to bring your mobile vision to life on both iOS and Android platforms.'
    },
    'e-commerce': {
        title: 'E-commerce Solutions',
        description: 'We develop robust e-commerce solutions that drive sales and customer loyalty.',
        longDescription: 'We create powerful e-commerce experiences on platforms like Shopify, as well as custom-built solutions. Our focus is on creating a seamless shopping journey for your customers, from product discovery to checkout. We integrate secure payment gateways, manage complex product catalogs, and optimize for conversions. We can also build custom features like subscription models, customer accounts, and loyalty programs to help you build a thriving online business.'
    },
    'marketing': {
        title: 'Digital Marketing',
        description: 'We execute data-driven marketing strategies to grow your reach and impact.',
        longDescription: 'Our digital marketing services are designed to help you reach your target audience and achieve your business goals. We develop comprehensive strategies that can include Search Engine Optimization (SEO), Pay-Per-Click (PPC) advertising, social media management, content marketing, and email campaigns. We are data-driven, constantly analyzing performance and optimizing our campaigns to deliver the best possible return on investment. Let us help you grow your brand and connect with more customers online.'
    }
};

export default function ServicePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [service, setService] = useState(serviceDetails[slug]);
  
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
                 <p className="text-lg text-foreground/80">
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

    
