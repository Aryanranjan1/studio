import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ArrowRight, MoveUpRight } from 'lucide-react';
import { HeroSvg } from './hero-svg';

const BentoCard = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => (
  <div
    className={cn(
      'rounded-2xl border border-border/20 bg-card p-4 shadow-inner flex items-center justify-center relative overflow-hidden',
      className
    )}
  >
    {children}
  </div>
);

export function HeroGrid() {
  return (
    <div
      className="grid h-auto grid-cols-4 grid-rows-[repeat(26,_minmax(0,_1fr))] gap-2
    md:h-[900px] md:grid-cols-8 md:grid-rows-10 
    lg:h-[600px] lg:grid-cols-12 lg:grid-rows-6"
    >
      {/* div1 */}
      <BentoCard
        className="col-span-4 row-span-7 p-0
      md:col-span-5 md:row-span-5 
      lg:col-span-6 lg:row-span-4"
      >
        <Image
          src="https://picsum.photos/seed/hero-bg/1200/800"
          alt="Abstract background"
          fill
          className="object-cover"
          data-ai-hint="abstract dark"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full w-full flex-col justify-between p-6 text-white">
          <a
            href="#"
            className="group absolute right-4 top-4 flex h-24 w-24 items-center justify-center"
          >
            <HeroSvg />
            <MoveUpRight className="absolute h-6 w-6 text-white transition-transform group-hover:rotate-45" />
          </a>

          <div className="flex flex-col">
            <h1 className="mb-2 max-w-sm text-3xl font-bold font-headline md:text-4xl">
              WE ARE CREATING A BEAUTIFUL DESIGN FOR YOU{' '}
              <ArrowRight className="inline h-8 w-8" />
            </h1>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-neutral-300">Our Creators</span>
              <div className="mt-2 flex items-center">
                <div className="flex -space-x-2 overflow-hidden">
                  <Image
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-background"
                    src="https://picsum.photos/seed/avatar1/40/40"
                    width={40}
                    height={40}
                    alt="Creator 1"
                    data-ai-hint="woman smiling"
                  />
                  <Image
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-background"
                    src="https://picsum.photos/seed/avatar2/40/40"
                    width={40}
                    height={40}
                    alt="Creator 2"
                    data-ai-hint="woman portrait"
                  />
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground ring-2 ring-background">
                    2k+
                  </div>
                </div>
              </div>
            </div>
            <div className="text-4xl font-bold font-headline">CI</div>
          </div>
        </div>
      </BentoCard>
      {/* div2 */}
      <BentoCard
        className="col-span-2 row-span-3 row-start-8 bg-[#cb0fe2] 
      md:col-start-1 md:col-span-3 md:row-start-6 md:row-span-3
      lg:col-start-1 lg:col-span-3 lg:row-start-5 lg:row-span-2"
      >
        div2
      </BentoCard>
      {/* div3 */}
      <BentoCard
        className="col-start-3 col-span-2 row-span-3 row-start-8 bg-[#1d46f8]
      md:col-start-4 md:col-span-2 md:row-start-6 md:row-span-3 
      lg:col-start-4 lg:col-span-3 lg:row-start-5 lg:row-span-2"
      >
        div3
      </BentoCard>
      {/* div4 */}
      <BentoCard
        className="col-span-4 row-span-5 row-start-11 bg-[#7ba2ee]
      md:col-start-6 md:col-span-3 md:row-start-1 md:row-span-3 
      lg:col-start-7 lg:col-span-4 lg:row-start-1 lg:row-span-3"
      >
        div4
      </BentoCard>
      {/* div5 */}
      <BentoCard
        className="col-span-4 row-span-7 row-start-16 bg-[#2ef68c]
      md:col-start-6 md:col-span-3 md:row-start-4 md:row-span-5
      lg:col-start-7 lg:col-span-4 lg:row-start-4 lg:row-span-3"
      >
        div5
      </BentoCard>
      {/* div6 */}
      <BentoCard
        className="col-span-1 row-start-23 row-span-4 bg-[#b134f5]
      md:col-start-1 md:col-span-2 md:row-start-9 md:row-span-2
      lg:col-start-11 lg:col-span-2 lg:row-start-1 lg:row-span-5"
      >
        div6
      </BentoCard>
      {/* div7 */}
      <BentoCard
        className="col-span-3 row-start-23 row-span-4 bg-[#f5b134]
      md:col-start-3 md:col-span-6 md:row-start-9 md:row-span-2 
      lg:col-start-11 lg:col-span-2 lg:row-start-6 lg:row-span-1"
      >
        div7
      </BentoCard>
    </div>
  );
}