import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Zap } from 'lucide-react';
import placeholderImages from '@/app/lib/placeholder-images.json';

export default function Home() {
  const {
    clawMachine,
    ssdExploded,
    ssdAngled
  } = placeholderImages.hero;
  return (
    <main className="flex flex-1 items-center justify-center text-center p-4 md:p-8 min-h-0 md:min-h-screen">
       <div className="grid grid-cols-1 md:grid-cols-10 md:grid-rows-7 gap-4 w-full h-full max-w-7xl mx-auto">
        {/* Left Bar */}
        <div className="md:col-span-2 md:row-span-5 bg-card rounded-2xl shadow-lg p-4 flex items-center justify-center">
            <h2 className="text-4xl font-bold tracking-widest uppercase -rotate-90 whitespace-nowrap text-primary-foreground font-headline">
                AMPIRE STUDIO
            </h2>
        </div>
        
        {/* Bottom-left */}
        <div className="md:col-span-3 md:row-span-2 bg-card rounded-2xl shadow-lg p-6 flex flex-col justify-center">
             <Image
              src={ssdExploded.src}
              alt={ssdExploded.alt}
              width={300}
              height={300}
              className="object-contain w-full h-full"
              data-ai-hint="exploded view product"
            />
        </div>

        {/* Center Top */}
        <div className="md:col-span-5 md:row-span-3 bg-card rounded-2xl shadow-lg p-8 text-left space-y-6">
            <h1 className="text-3xl font-bold font-headline">FORGED IN TECH. READY FOR THE UNKNOWN.</h1>
            <div className="flex items-center gap-2">
                <Zap className="text-primary w-5 h-5" />
                <span className="font-semibold">UP TO 1050 MB/S</span>
            </div>
            <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">SHOCKPROOF</Badge>
                <Badge variant="secondary">IP65 RATING</Badge>
                <Badge variant="secondary">DUSTPROOF</Badge>
                <Badge variant="secondary">SMART SLEEP MODE</Badge>
                <Badge variant="secondary">THERMAL STABILITY</Badge>
            </div>
        </div>
        
        {/* Center Bottom */}
        <div className="md:col-span-5 md:row-span-2 bg-primary text-primary-foreground rounded-2xl shadow-lg p-8 text-left relative overflow-hidden">
            <h3 className="text-2xl font-bold font-headline">BUILT FOR THE FIELD. TRUSTED IN THE STUDIO. NEVER OUT OF POWER.</h3>
            <div className="absolute bottom-8 right-8 text-right">
                <p className="text-sm opacity-80">Charging Time 90 minutes</p>
                <p className="text-8xl font-bold font-headline">20<span className="text-4xl">hr</span></p>
            </div>
            <div className="absolute top-4 right-4">
                <Button variant="ghost" size="icon" className="bg-white/10 hover:bg-white/20 text-white rounded-lg">
                    <ArrowUpRight className="w-6 h-6" />
                </Button>
            </div>
        </div>

        {/* Bottom-mid */}
        <div className="md:col-span-4 md:row-span-2 bg-card rounded-2xl shadow-lg p-6 text-left flex flex-col justify-between">
          <div>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                <li>Available in 1TB | 2TB | 4TB SSD</li>
                <li>Ultra-fast read/write speeds up to 1050MB/s</li>
                <li>Compatible with Windows, macOS, iOS, and Linux</li>
            </ul>
          </div>
          <div className="flex items-end justify-between">
            <Link href="#">
                <Button variant="outline">EXPLORE NOW</Button>
            </Link>
            <Image
                src={ssdAngled.src}
                alt={ssdAngled.alt}
                width={150}
                height={100}
                className="object-contain -mb-4 -mr-4"
                data-ai-hint="product angle"
            />
          </div>
        </div>

        {/* Right */}
        <div className="md:col-span-3 md:row-span-7 bg-card rounded-2xl shadow-lg relative overflow-hidden min-h-[400px] md:min-h-0">
             <Image
              src={clawMachine.src}
              alt={clawMachine.alt}
              fill
              className="object-cover"
              data-ai-hint="claw machine"
            />
        </div>
      </div>
    </main>
  );
}
