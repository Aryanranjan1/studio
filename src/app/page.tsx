
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowUpRight,
  BarChart,
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronRight,
  CircuitBoard,
  Clock,
  DollarSign,
  HeartHandshake,
  Mail,
  MapPin,
  Palette,
  Phone,
  Rocket,
  Users,
  PenTool,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const BentoCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={cn('relative col-span-4 rounded-lg border bg-card text-card-foreground shadow-sm', className)}
  >
    {children}
  </motion.div>
);

const MetricCard = ({ icon: Icon, value, label }: { icon: React.ElementType, value: string, label: string }) => (
  <div className="flex flex-col items-center text-center p-4">
    <Icon className="w-8 h-8 mb-2 text-primary" />
    <p className="text-3xl font-bold">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);


export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 auto-rows-[minmax(150px,auto)] gap-4">

        {/* Our Services */}
        <BentoCard className="md:col-span-2 lg:col-span-2 lg:row-span-2">
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

        {/* Metrics Card */}
        <BentoCard className="md:col-span-2 lg:col-span-1 lg:row-span-2">
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

        {/* Get a Quote */}
        <BentoCard className="md:col-span-2 lg:col-span-2">
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

        {/* Profile Card */}
        <BentoCard className="md:col-span-2 lg:col-span-2">
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

        {/* Image Card */}
        <BentoCard className="md:col-span-2 lg:col-span-3 lg:row-span-2 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
            alt="Team working"
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
        </BentoCard>

        {/* Let's Talk */}
        <BentoCard className="md:col-span-4 lg:col-span-2 flex flex-col justify-center items-center text-center">
          <CardContent className="p-6">
            <h3 className="font-bold text-2xl mb-2">Let&apos;s Talk</h3>
            <p className="text-muted-foreground mb-4">
              Have a project in mind? We&apos;d love to hear about it.
            </p>
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

      </div>
    </main>
  );
}
