import Link from "next/link";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

export function CtaSection() {
    return (
        <section id="cta" className="bg-primary/90">
            <div className="container py-24 text-center">
                <ScrollReveal>
                    <h2 className="font-headline text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl">
                        Ready to Transform Your Digital Presence?
                    </h2>
                    <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                        Let's discuss how we can help your business stand out online. Schedule a free consultation today.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-4">
                        <Button size="lg" variant="secondary" asChild>
                            <Link href="/contact">Get Started Now</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                            <Link href="tel:+15551234567">
                                <Phone className="mr-2 h-4 w-4"/>
                                Call Us
                            </Link>
                        </Button>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
