import { ScrollReveal } from "./scroll-reveal";
import { RequestToolDialog } from "./request-tool-dialog";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-32">
        <div className="container">
            <ScrollReveal>
                <div className="text-center">
                    <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                        Let's Build Something Great
                    </h2>
                    <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
                        Have a project in mind or just want to say hello? We'd love to hear from you.
                    </p>
                    <div className="mt-8">
                        <RequestToolDialog />
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </section>
  );
}
