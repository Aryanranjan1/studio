import { ScrollReveal } from "./scroll-reveal";

interface PageTitleHeaderProps {
    title: string;
    subtitle: string;
}

export function PageTitleHeader({ title, subtitle }: PageTitleHeaderProps) {
    return (
        <section className="py-24 sm:py-32 bg-primary/10 dark:bg-primary/10">
            <div className="container">
                <ScrollReveal>
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="mt-6 text-lg text-foreground/80">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
