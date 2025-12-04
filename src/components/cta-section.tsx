import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-primary/10 px-8 py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
          <div className="relative text-center">
            <h2 className="font-headline text-3xl font-bold text-primary sm:text-4xl">
              Ready to Start a Project?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary/80">
              Let's turn your idea into a digital reality. Contact us today to
              get started.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">
                  Get in Touch <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
