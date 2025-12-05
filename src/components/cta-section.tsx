import Image from 'next/image';
import { InputWithButton } from './input-with-button';

export function CtaSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-card shadow-lg">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="p-8 text-foreground lg:p-12">
              <h2 className="font-headline text-3xl font-bold sm:text-4xl">
                Subscribe to our newsletter to receive our daily news
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur lobortis tristique
                sociis, tortor neque ultrices dictumst justo adipiscing amet sit
                nec proin.
              </p>
              <div className="mt-8 max-w-md">
                <InputWithButton />
              </div>
            </div>
            <div className="relative h-64 w-full lg:h-full lg:min-h-[400px]">
              <Image
                src="https://aceternity.com/images/products/thumbnails/new/laptop.png"
                alt="Laptop showing a website"
                fill
                className="object-contain object-right-bottom lg:object-cover lg:object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
