import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ArrowRight, MoveUpRight, Zap, Code, Bot, TrendingUp } from 'lucide-react';
import { HeroSvg } from './hero-svg';
import Link from 'next/link';
import { Badge } from './ui/badge';

const BentoCard = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => (
  <div
    className={cn(
      'rounded-2xl border border-border/20 bg-card p-4 shadow-inner flex relative overflow-hidden',
      className
    )}
  >
    {children}
  </div>
);

const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => (
  <div className="flex flex-col items-center text-center text-white">
    <div className="mb-2">{icon}</div>
    <div className="text-2xl font-bold font-headline">{value}</div>
    <div className="text-xs text-neutral-300">{label}</div>
  </div>
);

export function HeroGrid() {
  return (
    <div
      className="grid h-screen min-h-screen grid-cols-4 grid-rows-[repeat(26,_minmax(0,_1fr))] gap-2
    md:grid-cols-8 md:grid-rows-10 
    lg:grid-cols-12 lg:grid-rows-6"
    >
      {/* div1 */}
      <BentoCard
        className="col-span-4 row-span-7 p-0
      md:col-span-5 md:row-span-5 
      lg:col-span-6 lg:row-span-4 items-center justify-center"
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
        className="text-black bg-gradient-to-br from-cyan-200 to-cyan-400
      col-span-2 row-span-3 row-start-8
      md:col-span-3 md:row-start-6 md:row-span-3
      lg:col-span-3 lg:row-span-2 lg:col-start-1 lg:row-start-5 p-6 flex flex-col justify-between"
      >
        <Link href="/about" className="group flex flex-col justify-between h-full">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-0 text-black">
              About us
            </Badge>
            <MoveUpRight className="h-6 w-6 text-black transition-transform group-hover:rotate-45" />
          </div>
          <h2 className="text-lg font-semibold mt-auto">
            Explore our fascinating journey and the services we offer you
          </h2>
        </Link>
      </BentoCard>
      {/* div3 */}
      <BentoCard
        className="text-black bg-violet-300
      col-start-3 col-span-2 row-span-3 row-start-8
      md:col-span-2 md:row-start-6 md:row-span-3
      lg:col-span-3 lg:row-span-2 lg:col-start-4 lg:row-start-5 p-6 flex flex-col justify-between"
      >
        <Link href="/services" className="group flex flex-col justify-between h-full">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-0 text-black">
              New release
            </Badge>
            <MoveUpRight className="h-6 w-6 text-black transition-transform group-hover:rotate-45" />
          </div>
          <h2 className="text-lg font-semibold mt-auto">
            Get ready to take on a new workload
          </h2>
        </Link>
      </BentoCard>
      {/* div4 */}
      <BentoCard
        className="bg-[#7ba2ee]
      col-span-4 row-span-5 row-start-11
      md:col-start-6 md:col-span-3 md:row-start-1 md:row-span-3
      lg:col-span-4 lg:row-span-3 lg:col-start-7 lg:row-start-1 items-center justify-center"
      >
        div4
      </BentoCard>
      {/* div5 */}
      <BentoCard
        className="bg-[#2ef68c]
      col-span-4 row-span-7 row-start-16
      md:col-start-6 md:col-span-3 md:row-start-4 md:row-span-5
      lg:col-span-4 lg:row-span-3 lg:col-start-7 lg:row-start-4 items-center justify-center"
      >
        div5
      </BentoCard>
      {/* div6 */}
      <BentoCard
        className="col-span-2 row-span-4 row-start-[23]
        md:col-start-1 md:col-span-6 md:row-span-2 md:row-start-9 
        lg:col-span-2 lg:row-span-3 lg:col-start-11 lg:row-start-1"
      >
        <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-4 md:grid-cols-4 md:grid-rows-1 lg:grid-cols-1 lg:grid-rows-4">
          <StatCard icon={<Zap size={24} />} value="10k+" label="Hours Saved" />
          <StatCard icon={<Bot size={24} />} value="200+" label="Automations" />
          <StatCard icon={<Code size={24} />} value="500+" label="Websites Built" />
          <StatCard icon={<TrendingUp size={24} />} value="150%" label="Client ROI" />
        </div>
      </BentoCard>
      {/* div7 */}
      <BentoCard
        className="bg-gradient-to-br from-amber-200 to-amber-400 p-6 text-black
        col-span-2 row-span-4 row-start-[23]
        md:col-span-2 md:row-span-2 md:row-start-9 md:col-start-7 
        lg:col-span-2 lg:row-span-3 lg:col-start-11 lg:row-start-4 items-center"
      >
        <div className="flex flex-col items-start justify-center text-left">
          <h3 className="text-2xl font-bold font-headline">Have a project?</h3>
          <Link
            href="/contact"
            className="mt-2 flex items-center gap-1 text-lg underline"
          >
            Contact us
            <MoveUpRight className="h-4 w-4" />
          </Link>
        </div>
      </BentoCard>
    </div>
  );
}
