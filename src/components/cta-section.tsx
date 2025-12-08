import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="relative w-full py-24 sm:py-32">
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/cta-bg/1920/1080"
          alt="Abstract background"
          fill
          loading="lazy"
          className="object-cover"
          data-ai-hint="abstract dark texture"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="font-headline text-3xl font-bold sm:text-4xl">
          Join Our Newsletter
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-300">
          Stay up to date with the latest news, articles, and resources, sent
          straight to your inbox weekly.
        </p>
        <form className="mt-8 mx-auto max-w-md flex items-center gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-neutral-400 focus-visible:ring-primary"
            aria-label="Email for newsletter"
          />
          <Button type="submit" variant="default" size="lg">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
