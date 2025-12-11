
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MoveRight, Instagram, Linkedin } from 'lucide-react';
import { getTeam } from '@/lib/data';
import { TeamMemberCard } from '@/components/team-member-card';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import type { Metadata } from 'next';
import { socialLinks } from '@/lib/social-links';

export const metadata: Metadata = {
    title: 'About',
    description: 'Learn about our process, our values, and the team behind Ampire Studio.',
};

export default function AboutPage() {
  const team = getTeam();

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
    <div className="w-full bg-black text-white min-h-screen">
      <main>
        <div className="grid grid-cols-12 gap-px border-l border-r border-neutral-800 bg-black">
          
          {/* About Header */}
          <div className="col-span-12 bg-black p-8 border-b border-neutral-800">
            <div className="md:flex justify-between items-end">
              <h1 className="font-headline text-7xl md:text-9xl font-bold">About</h1>
              <p className="mt-4 md:mt-0 max-w-sm text-neutral-400">
                We build digital experiences that stay clear, fast, and focused on delivering real value for your business and your users.
              </p>
            </div>
          </div>

          {/* How we work and Image */}
          <div className="col-span-12 md:col-span-7 bg-black p-8 border-b border-neutral-800">
            <h2 className="font-headline text-5xl md:text-6xl font-bold">
              How We <span className="text-primary">Work</span>
            </h2>
            <p className="mt-4 max-w-lg text-neutral-400">
              We keep the workflow simple and structured. Every project moves in short, focused cycles where you see progress early, understand each decision, and stay aligned with the outcome. No clutter, no slow loops — just clear steps and steady forward motion.
            </p>
          </div>

          <div className="col-span-12 md:col-span-5 bg-black relative min-h-[300px] border-b border-neutral-800">
            <Image 
              src="https://picsum.photos/seed/teamwork/800/600"
              alt="A design team collaborating around a table with sticky notes and wireframes."
              fill
              loading="lazy"
              className="object-cover"
              data-ai-hint="team collaboration office"
            />
          </div>

          {/* Design Process & Principles */}
          <div className="col-span-12 bg-black grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-800 border-b border-neutral-800">
             <div className="col-span-1 grid grid-rows-2">
                <div className="row-span-1 bg-black p-8 flex items-center">
                    <p className="font-headline text-3xl md:text-4xl font-bold max-w-md">
                        THE BEST PRODUCTS COME FROM CLARITY. THE WORK FLOWS BETTER WHEN THE PROCESS STAYS CLEAN AND FOCUSED.
                    </p>
                </div>
                <div className="row-span-1 bg-black p-8 relative min-h-[250px]">
                    <Image 
                      src="https://picsum.photos/seed/process/800/600"
                      alt="Abstract design process visualization"
                      fill
                      loading="lazy"
                      className="object-cover"
                      data-ai-hint="abstract design process"
                    />
                </div>
             </div>
             <div className="col-span-1 grid grid-rows-2 gap-px bg-neutral-800">
                <div className="row-span-1 bg-black p-8 border-b border-neutral-800">
                    <h3 className="font-headline text-2xl text-primary font-bold">{principles[0].title}</h3>
                    <p className="mt-2 text-neutral-400 text-sm">{principles[0].description}</p>
                </div>
                <div className="row-span-1 bg-black p-8">
                    <h3 className="font-headline text-2xl text-primary font-bold">{principles[1].title}</h3>
                    <p className="mt-2 text-neutral-400 text-sm">{principles[1].description}</p>
                </div>
             </div>
          </div>
          
          {/* Geometric Section */}
          <div className="col-span-12 md:col-span-7 bg-black p-8 relative min-h-[300px] border-b border-neutral-800">
            <div className="absolute inset-0 grid grid-cols-2">
                <div className="border-r border-neutral-800"></div>
                <div></div>
            </div>
            <div className="absolute inset-0 grid grid-rows-2">
                <div className="border-b border-neutral-800"></div>
                <div></div>
            </div>
             <div className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute w-48 h-24 border-t border-l border-r border-neutral-700 rounded-t-full"></div>
                <div className="absolute bottom-0 w-48 h-24 border-b border-l border-r border-neutral-700 rounded-b-full scale-x-50"></div>
            </div>

            <div className="absolute bottom-8 left-8 w-32 h-32 bg-white rounded-tr-3xl"></div>
            <div className="absolute bottom-8 left-1/2 w-32 h-32 bg-primary/70 -translate-x-1/2 rounded-tl-3xl"></div>
          </div>

          <div className="col-span-12 md:col-span-5 bg-primary text-primary-foreground p-8 flex items-center border-b border-neutral-800">
            <p className="font-headline text-2xl md:text-3xl font-bold">
              WE BUILD WITH PURPOSE, FOCUSING ON FAST, EFFICIENT SYSTEMS THAT STILL DELIVER A STRONG AND RECOGNIZABLE VISUAL IMPACT.
            </p>
          </div>

          {/* Capabilities Header */}
          <div className="col-span-12 bg-black p-8 border-b border-neutral-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-headline text-5xl md:text-6xl font-bold">
                Capabilities
              </h2>
            </div>
          </div>

          {/* Capabilities Grid */}
          <div className="col-span-12 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 -mx-6">
                {team.map((member) => (
                    <div key={member.id} className="bg-black p-6 border border-neutral-800 flex items-center gap-6">
                    <TeamMemberCard 
                        icon={member.icon}
                        className="w-24 h-24 flex-shrink-0" 
                    />
                    <div>
                        <p className="font-bold text-lg">{member.name}</p>
                        <p className="text-neutral-400 text-sm">{member.role}</p>
                    </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
          

          {/* Let's Work */}
          <div className="col-span-12 md:col-span-8 bg-black p-8 border-b border-neutral-800 flex flex-col justify-between min-h-[300px]">
            <div>
              <h2 className="font-headline text-5xl md:text-6xl font-bold">Let's Work</h2>
              <p className="text-neutral-400 mt-2">Your brand here</p>
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
          <div className="col-span-12 md:col-span-4 bg-black p-8 border-b border-neutral-800 flex flex-col justify-end items-center text-center">
            <div className="mb-8 flex gap-4">
              <a href="#" className="hover:text-primary">Be</a>
              <a href="#" className="hover:text-primary">Clutch</a>
              {socialLinks.filter(l => l.name === 'LinkedIn' || l.name === 'Instagram').map(link => (
                <a href={link.href} key={link.name} className="hover:text-primary">
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
           <div className="col-span-12 bg-black">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
