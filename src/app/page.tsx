'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowUpRight,
  Briefcase,
  ChevronRight,
  CircuitBoard,
  HeartHandshake,
  Mail,
  PenTool,
  Phone,
  Palette,
  Rocket,
  Users,
  Clock,
  ArrowRight,
  Layers,
  Lightbulb,
  Users2,
  ThumbsUp
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const BentoCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={cn('relative rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex flex-col', className)}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      {/* Grid Container */}
      <div className="grid 
        grid-cols-4 grid-rows-8 gap-2
        md:grid-cols-6 md:grid-rows-7 md:gap-2
        lg:grid-cols-8 lg:grid-rows-6 lg:gap-2">
        
        {/* Item 1: "Our Services" */}
        <BentoCard className="
          row-[1_/_4] col-[1_/_5]
          md:row-[1_/_5] md:col-[1_/_4]
          lg:row-[1_/_4] lg:col-[1_/_5]
          bg-[#9a16a1] justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 mb-4">
              <Briefcase className="w-6 h-6 text-primary-foreground" />
              <span className="text-primary-foreground">Our Services</span>
            </CardTitle>
            <div className="flex flex-wrap gap-2">
                {['Brand', 'Figma Design', 'Logo', 'Illustrator', 'UI/UX Designing', 'Photoshop', 'Mobile App', 'Website design'].map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-background/20 text-foreground hover:bg-background/40 transition-colors cursor-pointer">{tag}</Badge>
                ))}
            </div>
          </div>
          <p className='text-sm text-primary-foreground/80'>2023-24</p>
        </BentoCard>

        {/* Item 2: Profile card */}
        <BentoCard className="
          row-[8_/_9] col-[2_/_5]
          md:row-[1_/_7] md:col-[6_/_7]
          lg:row-[1_/_6] lg:col-[8_/_9]
          bg-[#cb0fe2] items-center justify-center p-0">
            <div className="p-6 flex flex-col items-center justify-center text-center gap-4">
                <div className='text-sm'>Have a projects?</div>
                <Button variant='secondary'>Contact us <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </div>
        </BentoCard>

        {/* Item 3: "Let's Talk" */}
        <BentoCard className="
          row-[8_/_9] col-[1_/_2]
          md:row-[7_/_8] md:col-[6_/_7]
          lg:row-[6_/_7] lg:col-[8_/_9]
          bg-[#1d46f8] flex flex-col justify-center items-center text-center">
            <h3 className="font-bold text-lg mb-2">New release</h3>
            <p className='text-muted-foreground mb-4 text-sm'>Get ready to take on a new workload</p>
            <Button variant="outline" size="icon" className='bg-transparent border-white/50 text-white'>
              <ArrowUpRight className="w-5 h-5" />
            </Button>
        </BentoCard>

        {/* Item 4: "Get a Quote" */}
        <BentoCard className="
          row-[6_/_7] col-[1_/_5]
          md:row-[1_/_4] md:col-[4_/_6]
          lg:row-[1_/_3] lg:col-[5_/_8]
          bg-[#7ba2ee] justify-between">
            <div>
              <Badge variant="secondary" className='mb-4'>Work process</Badge>
              <h3 className="font-semibold text-xl text-background">We help our client's to shine in a digital way</h3>
              <p className="text-background/80 mt-2">This will provide you with an in-depth investigation</p>
            </div>
            <Button variant="ghost" size="icon" className='self-end text-background'>
              <ArrowUpRight className="w-5 h-5" />
            </Button>
        </BentoCard>

        {/* Item 5: Image Card */}
        <BentoCard className="
          row-[7_/_8] col-[1_/_5]
          md:row-[4_/_8] md:col-[4_/_6]
          lg:row-[3_/_7] lg:col-[5_/_8]
          overflow-hidden bg-[#2ef68c] p-0">
          <div className="flex justify-between items-start p-6">
            <Badge variant="secondary">About us</Badge>
            <Button variant="ghost" size="icon"><ArrowUpRight /></Button>
          </div>
          <div className="p-6 pt-0">
            <h3 className="font-semibold text-xl">Explore our fascinating journey and the services we offer you</h3>
          </div>
          <div className="flex-grow w-full h-24 bg-[linear-gradient(to_right,hsl(var(--primary)/0.1),hsl(var(--primary)/0.1)_1px,transparent_1px,transparent_10px),linear-gradient(to_bottom,hsl(var(--primary)/0.1),hsl(var(--primary)/0.1)_1px,transparent_1px,transparent_10px)] bg-[length:10px_10px] [mask-image:linear-gradient(to_bottom,white_10%,transparent_100%)]"></div>
        </BentoCard>
        
        {/* Item 6 & 7: Metrics Cards */}
        <BentoCard className="
          row-[4_/_6] col-[1_/_5]
          md:row-[5_/_8] md:col-[1_/_4]
          lg:row-[4_/_7] lg:col-[1_/_5]
          bg-[#b134f5] justify-around">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">125+</p>
                <p className="text-sm text-primary-foreground/80">Successful Projects</p>
              </div>
              <div className="bg-background/20 p-3 rounded-lg">
                <Layers className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">12+</p>
                <p className="text-sm text-primary-foreground/80">Years Experience</p>
              </div>
              <div className="bg-background/20 p-3 rounded-lg">
                <Lightbulb className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
        </BentoCard>

        <BentoCard className="
          row-[4_/_6] col-[1_/_5]
          md:row-[5_/_8] md:col-[1_/_4]
          lg:row-[4_/_7] lg:col-[1_/_5]
          bg-[#b134f5] justify-around">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">30+</p>
                <p className="text-sm text-primary-foreground/80">Strong Partners</p>
              </div>
              <div className="bg-background/20 p-3 rounded-lg">
                <Users2 className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">98%</p>
                <p className="text-sm text-primary-foreground/80">Positive Users</p>
              </div>
               <div className="bg-background/20 p-3 rounded-lg">
                <ThumbsUp className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
        </BentoCard>

      </div>
    </main>
  );
}
