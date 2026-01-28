'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MoveRight, Dribbble, Instagram, Linkedin } from 'lucide-react';
import { getTeam } from '@/lib/data';
import { TeamMemberCard } from '@/components/team-member-card';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import { usePublicSettings } from '@/hooks/use-settings';

// This is an inline SVG component for the Pinterest icon as it's not in lucide-react.
const PinterestIcon = (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.103 3.203 9.422 7.625 11.23.02-.42.043-.98.043-1.16 0-.44-.288-.97-.288-.97s-.683-2.73.27-4.55c.866-1.66 2.73-5.4 2.73-7.44 0-3.23-2.25-6.04-5.08-6.04-4.09 0-6.78 3.06-6.78 6.59 0 2.11.81 5.08 2.84 5.08.81 0 1.6-8.56 1.6-2.5 0-2.25-1.32-3.98-2.67-3.98-2.16 0-3.64 1.52-3.64 4.02 0 1.34.5 2.38 1.2 3.1.09.09.09.19.06.27l-.24.91c-.05.19-.22.24-.4.15a8.21 8.21 0 0 1-4.02-5.7C.32 8.71 3 3.14 8.03 3.14c5.63 0 9.77 3.82 9.77 9.17 0 5.15-3.06 10.05-7.14 10.05-1.39 0-2.7-.72-3.14-1.55l-.01.01c-.13-.3-.12-.31-.1-.45l.6-2.58.01-.01c.14-.59.5-1.12.5-1.12.44.8 1.48 1.48 2.5 1.48 2.9 0 5.2-2.7 5.2-6.23 0-2.45-1.3-4.3-3.95-4.3-2.9 0-4.7 2.1-4.7 4.5 0 1.1.3 2.1.9 2.8.3.4.3.5.2 1l-.2 1.1c-.1.5-.1.6-.2 1l-1.3 5.4c-.4 1.8-1.5 4.3-1.5 4.3-.2.8.2 1.7.2 1.7s.4-1.8.5-2.2c.2-.5.5-1.4.5-1.4a12.18 12.18 0 0 0 7.6-11.23C24 5.373 18.627 0 12 0z"/>
    </svg>
);

export default function AboutPage() {
  const team = getTeam();
  const { settings } = usePublicSettings();
  const socialLinks = settings?.contactConfig?.socialLinks;

  const socialIcons = [
    { name: 'LinkedIn', href: socialLinks?.linkedin, Icon: Linkedin },
    { name: 'Instagram', href: socialLinks?.instagram, Icon: Instagram },
    { name: 'Dribbble', href: socialLinks?.dribbble, Icon: Dribbble },
    { name: 'Pinterest', href: socialLinks?.pinterest, Icon: PinterestIcon },
  ].filter(link => link.href);

  const principles = [
    {
      title: 'AGILE',
      description: 'Our workflow adapts quickly and stays structured. We break projects into tight sprints that keep progress visible, predictable, and fast. Most builds move through several focused weekly cycles from start to finish.',
    },
    {
      title: 'TRANSPARENT',
      description: 'You stay informed at every stage. We share files, timelines, and decisions openly, giving you full access to designs, progress, and ongoing updates.',
    },
  ];

  return (
    <div className="w-full bg-background text-foreground min-h-screen">
      <main>
        <div className="grid grid-cols-12 gap-px border-l border-r border-border bg-background">
          
          {/* About Header */}
          <div className="col-span-12 bg-background p-8 border-b border-border">
            <div className="md:flex justify-between items-end">
              <h1 className="font-headline text-7xl md:text-9xl font-bold">About</h1>
              <p className="mt-4 md:mt-0 max-w-sm text-muted-foreground">
                We build digital experiences that stay clear, fast, and focused on delivering real value for your business and your users.
              </p>
            </div>
          </div>

          {/* How we work and Image */}
          <div className="col-span-12 md:col-span-7 bg-background p-8 border-b border-border">
            <h2 className="font-headline text-5xl md:text-6xl font-bold">
              How We <span className="text-primary">Work</span>
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              We keep the workflow simple and structured. Every project moves in short, focused cycles where you see progress early, understand each decision, and stay aligned with the outcome. No clutter, no slow loops — just clear steps and steady forward motion.
            </p>
          </div>

          <div className="col-span-12 md:col-span-5 bg-background relative min-h-[300px] border-b border-border">
            <img 
              src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxsYXB0b3B8ZW58MHx8fHwxNzY4NjYwNzc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="A design team collaborating around a table with sticky notes and wireframes."
              loading="lazy"
              className="object-cover w-full h-full absolute inset-0"
              data-ai-hint="laptop"
            />
          </div>

          {/* Design Process & Principles */}
          <div className="col-span-12 bg-background grid grid-cols-1 md:grid-cols-2 gap-px bg-border border-b border-border">
             <div className="col-span-1 grid grid-rows-2">
                <div className="row-span-1 bg-background p-8 flex items-center">
                    <p className="font-headline text-3xl md:text-4xl font-bold max-w-md">
                        THE BEST PRODUCTS COME FROM CLARITY. THE WORK FLOWS BETTER WHEN THE PROCESS STAYS CLEAN AND FOCUSED.
                    </p>
                </div>
                <div className="row-span-1 bg-background p-8 relative min-h-[250px]">
                    <img 
                      src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlfGVufDB8fHx8MTc2ODY2MTIyMHww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Abstract design process visualization"
                      loading="lazy"
                      className="object-cover w-full h-full absolute inset-0"
                      data-ai-hint="website"
                    />
                </div>
             </div>
             <div className="col-span-1 grid grid-rows-2 gap-px bg-border">
                <div className="row-span-1 bg-background p-8 border-b border-border">
                    <h3 className="font-headline text-2xl text-primary font-bold">{principles[0].title}</h3>
                    <p className="mt-2 text-muted-foreground text-sm">{principles[0].description}</p>
                </div>
                <div className="row-span-1 bg-background p-8">
                    <h3 className="font-headline text-2xl text-primary font-bold">{principles[1].title}</h3>
                    <p className="mt-2 text-muted-foreground text-sm">{principles[1].description}</p>
                </div>
             </div>
          </div>
          
          {/* Geometric Section */}
          <div className="col-span-12 md:col-span-7 bg-background p-8 relative min-h-[300px] border-b border-border">
            <div className="absolute inset-0 grid grid-cols-2">
                <div className="border-r border-border"></div>
                <div></div>
            </div>
            <div className="absolute inset-0 grid grid-rows-2">
                <div className="border-b border-border"></div>
                <div></div>
            </div>
             <div className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute w-48 h-24 border-t border-l border-r border-neutral-700 rounded-t-full"></div>
                <div className="absolute bottom-0 w-48 h-24 border-b border-l border-r border-neutral-700 rounded-b-full scale-x-50"></div>
            </div>

            <div className="absolute bottom-8 left-8 w-32 h-32 bg-white rounded-tr-3xl"></div>
            <div className="absolute bottom-8 left-1/2 w-32 h-32 bg-primary/70 -translate-x-1/2 rounded-tl-3xl"></div>
          </div>

          <div className="col-span-12 md:col-span-5 bg-primary text-primary-foreground p-8 flex items-center border-b border-border">
            <p className="font-headline text-2xl md:text-3xl font-bold">
              WE BUILD WITH PURPOSE, FOCUSING ON FAST, EFFICIENT SYSTEMS THAT STILL DELIVER A STRONG AND RECOGNIZABLE VISUAL IMPACT.
            </p>
          </div>

          {/* Capabilities Header */}
          <div className="col-span-12 bg-background p-8 border-b border-border">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-headline text-5xl md:text-6xl font-bold">
                Capabilities
              </h2>
            </div>
          </div>

          {/* Capabilities Grid */}
          <div className="col-span-12 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 -mx-6">
                {team.map((member) => (
                    <div key={member.id} className="bg-background p-6 border border-border flex items-center gap-6">
                    <TeamMemberCard 
                        icon={member.icon}
                        className="w-24 h-24 flex-shrink-0" 
                    />
                    <div>
                        <p className="font-bold text-lg">{member.name}</p>
                        <p className="text-muted-foreground text-sm">{member.role}</p>
                    </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
          

          {/* Let's Work */}
          <div className="col-span-12 md:col-span-8 bg-background p-8 border-b border-border flex flex-col justify-between min-h-[300px]">
            <div>
              <h2 className="font-headline text-5xl md:text-6xl font-bold">Let's build something great together.</h2>
              <p className="text-foreground mt-2">Your brand here</p>
            </div>
            <div className="flex gap-4">
              <Button asChild className="flex-1">
                <Link href="/contact">Start Project</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          
          {/* Contact */}
          <div className="col-span-12 md:col-span-4 bg-background p-8 border-b border-border flex flex-col justify-end items-center text-center">
            <div className="mb-8 flex gap-4">
              {socialIcons.map(link => (
                <a href={link.href} key={link.name} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  <link.Icon className="h-5 w-5"/>
                </a>
              ))}
            </div>
            <div className="relative w-full max-w-[200px] aspect-square">
                 <div className="absolute inset-0 border-t border-l border-r border-neutral-700 rounded-t-full"></div>
                 <Link href="/contact" className="absolute inset-0 flex items-center justify-center font-bold group">
                    CONTACT <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"/>
                 </Link>
            </div>
            
          </div>
           <div className="col-span-12 bg-background">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
