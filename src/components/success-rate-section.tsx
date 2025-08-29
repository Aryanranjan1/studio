import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";
import { Card, CardContent } from "./ui/card";

const stats = [
    { value: "50+", label: "Happy Clients" },
    { value: "80+", label: "Projects Delivered" },
    { value: "5k+", label: "Hours of Work" },
    { value: "100%", label: "Client Satisfaction" },
];

interface SuccessRateSectionProps {
    className?: string;
}

export function SuccessRateSection({ className }: SuccessRateSectionProps) {
    return (
        <section id="success" className={cn("py-24 sm:py-32", className)}>
            <div className="container">
                <ScrollReveal>
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                            Proven Success, Tangible Results
                        </h2>
                        <p className="mt-4 text-lg text-foreground/80">
                            We are proud of our track record in helping businesses grow and succeed.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <ScrollReveal key={stat.label} delay={index * 100}>
                            <Card className="h-full text-center py-8 bg-card/70 backdrop-blur-md">
                                <CardContent>
                                    <p className="font-headline text-5xl font-bold text-primary">{stat.value}</p>
                                    <p className="mt-2 text-muted-foreground">{stat.label}</p>
                                </CardContent>
                            </Card>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
