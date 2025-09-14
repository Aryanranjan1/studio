
"use client";

import { FlowingMenu } from './flowing-menu';
import { getServices } from '@/lib/data';
import { ScrollReveal } from './scroll-reveal';
import { cn } from '@/lib/utils';

const serviceImages = [
    'https://picsum.photos/seed/uiux-service/600/400',
    'https://picsum.photos/seed/webdev-service/600/400',
    'https://picsum.photos/seed/mobile-service/600/400',
    'https://picsum.photos/seed/ecomm-service/600/400',
    'https://picsum.photos/seed/marketing-service/600/400', // This will now be SEO
    'https://picsum.photos/seed/branding-service/600/400', // This will now be Automation
]

const servicesToShow = ["UI/UX Design", "Web Development", "Mobile App", "E-commerce", "SEO Service", "Automation"];

interface ServicesSectionProps {
  className?: string;
}

export function ServicesSection({ className }: ServicesSectionProps) {
    const allServices = getServices();
    
    // In a real app with more services, you might fetch specific service images.
    // For now, we're just filtering the list of services to show.
    const filteredServices = allServices.filter(service => servicesToShow.includes(service.title));

    const menuItems = filteredServices.map((service, index) => ({
        link: `/services/${service.slug}`,
        text: service.title,
        image: serviceImages[index]
    }));

  return (
    <section id="services" className={cn("py-24 sm:py-32", className)}>
        <div className="container">
            <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                    Our Arsenal
                    </h2>
                    <p className="mt-4 text-lg text-foreground/80">
                    From crafting your brand identity to scaling your business with custom tech, we provide the tools you need to conquer the digital world.
                    </p>
                </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
                <div style={{ height: '70vh', position: 'relative' }} className="mt-16">
                    <FlowingMenu items={menuItems} />
                </div>
            </ScrollReveal>
        </div>
    </section>
  );
}
