import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center text-center">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline">
              Creative Digital Studio
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              We design and build beautiful, functional, and user-centric digital experiences.
            </p>
            <div className="space-x-4 pt-6">
              <Link href="/portfolio">
                <Button>View Our Work</Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary">Get in Touch</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
