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
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const BentoCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={cn('relative rounded-lg border bg-card text-card-foreground shadow-sm', className)}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-4 grid-rows-8 gap-2 md:grid-cols-6 md:grid-rows-7 lg:grid-cols-8 lg:grid-rows-6">
        {/* Item 1: Our Services */}
        <BentoCard className="row-[1_/_4] col-[1_/_5] md:row-[1_/_5] md:col-[1_/_4] lg:row-[1_/_4] lg:col-[1_/_5] flex flex-col bg-[#9a16a1]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" />
              <span>Our Services</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We offer a wide range of services to help you grow your business.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 hover:bg-muted p-2 rounded-lg transition-colors">
                <Palette className="w-5 h-5 text-primary" />
                <span className="font-medium">Branding and Identity</span>
                <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground" />
              </div>
              <div className="flex items-center gap-3 hover:bg-muted p-2 rounded-lg transition-colors">
                <PenTool className="w-5 h-5 text-primary" />
                <span className="font-medium">UI/UX Design</span>
                <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground" />
              </div>
              <div className="flex items-center gap-3 hover:bg-muted p-2 rounded-lg transition-colors">
                <CircuitBoard className="w-5 h-5 text-primary" />
                <span className="font-medium">Web Development</span>
                <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </BentoCard>

        {/* Item 2: Profile Card */}
        <BentoCard className="row-[8_/_9] col-[2_/_5] md:row-[1_/_7] md:col-[6_/_7] lg:row-[1_/_6] lg:col-[8_/_9] flex items-center justify-center bg-[#cb0fe2]">
            <CardContent className="p-6 flex items-center gap-4">
                <Avatar className="w-16 h-16">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                <h3 className="font-semibold text-lg">Alex Doe</h3>
                <p className="text-sm text-muted-foreground">Founder & CEO</p>
                </div>
            </CardContent>
        </BentoCard>

        {/* Item 3: Let's Talk */}
        <BentoCard className="row-[8_/_9] col-[1_/_2] md:row-[7_/_8] md:col-[6_/_7] lg:row-[6_/_7] lg:col-[8_/_9] flex flex-col justify-center items-center text-center bg-[#1d46f8]">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-2">Let's Talk</h3>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" size="icon">
                <Mail className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Phone className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </BentoCard>

        {/* Item 4: Get a Quote */}
        <BentoCard className="row-[6_/_7] col-[1_/_5] md:row-[1_/_4] md:col-[4_/_6] lg:row-[1_/_3] lg:col-[5_/_8] bg-[#7ba2ee]">
          <CardHeader>
            <CardTitle>Get a Quote</CardTitle>
            <CardDescription>
              Let&apos;s build something amazing together.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              Contact Us <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </BentoCard>

        {/* Item 5: Image Card */}
        <BentoCard className="row-[7_/_8] col-[1_/_5] md:row-[4_/_8] md:col-[4_/_6] lg:row-[3_/_7] lg:col-[5_/_8] overflow-hidden bg-[#2ef68c]">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
            alt="Team working"
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
        </BentoCard>
        
        {/* Item 6: Metrics Card Part 1 */}
        <BentoCard className="row-[4_/_5] col-[1_/_5] md:row-[5_/_8] md:col-[1_/_4] lg:row-[4_/_7] lg:col-[1_/_5] bg-[#b134f5]">
          <CardContent className="p-4 flex flex-col justify-around h-full">
            <div className="flex items-center gap-4 py-2">
              <Rocket className="w-6 h-6 text-primary" />
              <div>
                <p className="text-2xl font-bold">125+</p>
                <p className="text-sm text-muted-foreground">Successful Projects</p>
              </div>
            </div>
             <div className="flex items-center gap-4 py-2">
              <Clock className="w-6 h-6 text-primary" />
              <div>
                <p className="text-2xl font-bold">12+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
            </div>
          </CardContent>
        </BentoCard>

        {/* Item 7: Metrics Card Part 2 */}
        <BentoCard className="row-[5_/_6] col-[1_/_5] md:row-[5_/_8] md:col-[1_/_4] lg:row-[4_/_7] lg:col-[1_/_5] bg-[#b134f5]">
          <CardContent className="p-4 flex flex-col justify-around h-full">
             <div className="flex items-center gap-4 py-2">
              <HeartHandshake className="w-6 h-6 text-primary" />
              <div>
                <p className="text-2xl font-bold">30+</p>
                <p className="text-sm text-muted-foreground">Strong Partners</p>
              </div>
            </div>
             <div className="flex items-center gap-4 py-2">
              <Users className="w-6 h-6 text-primary" />
              <div>
                <p className="text-2xl font-bold">98%</p>
                <p className="text-sm text-muted-foreground">Positive Users</p>
              </div>
            </div>
          </CardContent>
        </BentoCard>

      </div>
    </main>
  );
}
