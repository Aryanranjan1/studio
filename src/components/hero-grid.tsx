
'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { MoveUpRight, Zap, Code, Bot, TrendingUp } from 'lucide-react';
import { HeroSvg } from './hero-svg';
import Link from 'next/link';
import { Badge } from './ui/badge';
import placeholderImages from '@/app/lib/placeholder-images.json';
import { getArticles } from '@/lib/data';
import { DraggableServices } from './draggable-services';

const BentoCard = ({
  className,
  children,
  style,
}: {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    className={cn(
      'bg-card p-4 flex relative overflow-hidden border-2 border-transparent',
      className
    )}
    style={style}
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
  const allArticles = getArticles();
  const popularArticles = allArticles.filter(a => a.popular);
  const featuredArticle = popularArticles.length > 0 ? popularArticles[0] : allArticles[0];


  return (
    <div
      className="grid auto-rows-[100px] grid-cols-4 gap-2 min-h-screen w-screen max-w-full
      bg-black p-2
      md:grid-cols-8 md:grid-rows-10 
      lg:grid-cols-12 lg:grid-rows-8"
    >
      {/* div1 */}
      <BentoCard
        className="col-span-4 row-span-5 p-0
      md:col-span-5 md:row-span-5 
      lg:col-span-6 lg:row-span-5 items-center justify-center"
      >
        <Image
          src="https://picsum.photos/seed/hero-abstract-purple/1200/800"
          alt="Abstract background"
          fill
          className="object-cover"
          priority
          data-ai-hint="abstract purple dark"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full w-full flex-col justify-between p-6 text-white">
          <a
            href="#"
            className="group absolute right-4 bottom-4 flex h-24 w-24 items-center justify-center"
          >
            <HeroSvg />
            <MoveUpRight className="absolute h-6 w-6 text-white transition-transform group-hover:rotate-45" />
          </a>

          <div className="flex flex-col">
            <h1 className="mb-2 max-w-sm text-3xl font-bold font-headline md:text-4xl">
              WE ARE CREATING A BEAUTIFUL DESIGN FOR YOU{' '}
            </h1>
          </div>
        </div>
      </BentoCard>
      {/* div2 */}
      <BentoCard
        className="text-foreground bg-card/50
      col-span-2 row-span-2
      md:col-span-3 md:row-start-6 md:row-span-3
      lg:col-span-3 lg:row-span-3 lg:col-start-1 lg:row-start-6 p-6 flex flex-col justify-between"
        style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}
      >
        <div className="absolute inset-0 z-0 opacity-20"></div>
        <Link href="/about" className="group flex flex-col justify-between h-full z-10">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm border-border text-foreground">
              About us
            </Badge>
            <MoveUpRight className="h-6 w-6 text-foreground transition-transform group-hover:rotate-45" />
          </div>
          <h2 className="text-lg font-semibold mt-auto">
            Explore our fascinating journey and the services we offer you
          </h2>
        </Link>
      </BentoCard>
      {/* div3 */}
      <BentoCard
        className="text-foreground bg-card/50
      col-span-2 row-span-2
      md:col-span-2 md:row-start-6 md:row-span-3
      lg:col-span-3 lg:row-span-3 lg:col-start-4 lg:row-start-6 p-6 flex flex-col justify-between"
        style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'28\' height=\'49\' viewBox=\'0 0 28 49\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg id=\'Page-1\' fill=\'%239C92AC\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M28 0v49H0V0h28zM0 48h28v1H0v-1z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}
      >
        <Link href="/services" className="group flex flex-col justify-between h-full z-10">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm border-border text-foreground">
              New release
            </Badge>
            <MoveUpRight className="h-6 w-6 text-foreground transition-transform group-hover:rotate-45" />
          </div>
          <h2 className="text-lg font-semibold mt-auto">
            Get ready to take on a new workload
          </h2>
        </Link>
      </BentoCard>
      {/* div4 */}
      <BentoCard
        className="bg-muted
      col-span-4 row-span-3 flex-col justify-between
      md:col-start-6 md:col-span-3 md:row-start-1 md:row-span-3
      lg:col-span-4 lg:row-span-4 lg:col-start-7 lg:row-start-1"
        style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")'}}
      >
        <div className="flex flex-col justify-between h-full w-full">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm border-border text-foreground">
              Our services
            </Badge>
            <span className="text-sm font-semibold">2025-26</span>
          </div>
          <div className='relative flex-grow w-full'>
            <DraggableServices />
          </div>
        </div>
      </BentoCard>
      {/* div5 - Blog */}
      <BentoCard
        className="p-0
      col-span-4 row-span-3
      md:col-start-6 md:col-span-3 md:row-start-4 md:row-span-5
      lg:col-span-4 lg:row-span-4 lg:col-start-7 lg:row-start-5 flex-col justify-between"
      >
        <Image
          src={featuredArticle.image}
          alt={featuredArticle.imageAlt}
          fill
          loading="lazy"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="relative z-10 flex h-full w-full flex-col justify-between p-6 text-white">
          <Badge variant="outline" className="bg-white text-black border-white w-fit">
            From the Blog
          </Badge>
          <Link href={`/blog/${featuredArticle.id}`} className="group relative mt-auto">
             <div className="absolute -bottom-4 -left-4 w-[calc(100%+2rem)] p-4 bg-black/20 backdrop-blur-md border border-white/10">
                <Image src={featuredArticle.authorImage} width={32} height={32} alt={featuredArticle.author} className="rounded-full" data-ai-hint="person portrait"/>
                <div className="flex justify-between items-end mt-2">
                    <div>
                        <h3 className="text-lg font-bold font-headline transition-colors">
                            {featuredArticle.title}
                        </h3>
                        <p className="text-sm text-white/60 mt-1">{featuredArticle.excerpt}</p>
                    </div>
                    <MoveUpRight className="w-5 h-5 text-white/70 group-hover:rotate-45 transition-transform flex-shrink-0" />
                </div>
            </div>
          </Link>
        </div>
      </BentoCard>
      {/* div6 */}
      <BentoCard
        className="col-span-4 row-span-2
        md:col-start-1 md:col-span-6 md:row-span-2 md:row-start-9 
        lg:col-span-2 lg:row-span-6 lg:col-start-11 lg:row-start-1"
        style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'52\' height=\'26\' viewBox=\'0 0 52 26\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z\' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}
      >
        <div className="grid h-full w-full grid-cols-2 grid-rows-2 justify-items-center gap-4 md:grid-cols-4 md:grid-rows-1 lg:grid-cols-1 lg:grid-rows-4">
          <StatCard icon={<Zap size={24} />} value="10k+" label="Hours Saved" />
          <StatCard icon={<Bot size={24} />} value="200+" label="Automations" />
          <StatCard icon={<Code size={24} />} value="500+" label="Websites Built" />
          <StatCard icon={<TrendingUp size={24} />} value="150%" label="Client ROI" />
        </div>
      </BentoCard>
      {/* div7 */}
      <BentoCard
        className="bg-gradient-to-br from-primary to-primary/70 p-6 text-primary-foreground
        col-span-4 row-span-1
        md:col-span-2 md:row-span-2 md:row-start-9 md:col-start-7 
        lg:col-span-2 lg:row-span-2 lg:col-start-11 lg:row-start-7"
        style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-4c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63-28c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm-48-14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm8 45c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm34-1c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-34-35c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm4-2c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 99c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm56-76c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm-22 9c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm-14 26c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm23-15c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM11 4c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'}}
      >
        <div className="flex flex-col items-start justify-center h-full w-full">
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

    