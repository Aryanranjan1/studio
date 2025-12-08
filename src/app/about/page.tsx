
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MoveRight, Instagram, Linkedin } from 'lucide-react';
import { getTeam } from '@/lib/data';
import { TeamMemberCard } from '@/components/team-member-card';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import { DraggableServices } from '@/components/draggable-services';

export default function AboutPage() {
  const team = getTeam();

  const principles = [
    {
      title: 'AGILE',
      description: 'Our approach is agile before agile was called agile. We work in sprints to move through the project both fast and thoughtfully. Our project size starts at 4-weekly sprints at least.',
    },
    {
      title: 'TRANSPARENT',
      description: 'You are always aware about what we are working on. We give you access to our Figma design file and plan frequent calls with you.',
    },
  ];

  return (
    <div className="w-full bg-black text-white min-h-screen">
      <main>
        <div className="grid grid-cols-12 gap-px border-l border-r border-neutral-800 bg-neutral-800">
          
          {/* About Header */}
          <div className="col-span-12 bg-black p-8 border-b border-neutral-800">
            <h1 className="font-headline text-7xl md:text-9xl font-bold">About</h1>
            <p className="mt-4 max-w-sm text-neutral-400">
              Our agency tailors service to your ambitions while focusing on delivering creative and efficient outcomes for your users.
            </p>
          </div>

          {/* How we work and Image */}
          <div className="col-span-12 md:col-span-7 bg-black p-8 border-b border-neutral-800">
            <h2 className="font-headline text-5xl md:text-6xl font-bold">
              How We <span className="text-blue-500">Work</span>
            </h2>
          </div>

          <div className="col-span-12 md:col-span-5 bg-black relative min-h-[300px] border-b border-neutral-800">
            <Image 
              src="https://picsum.photos/seed/teamwork/800/600"
              alt="A design team collaborating around a table with sticky notes and wireframes."
              fill
              className="object-cover"
              data-ai-hint="team collaboration office"
            />
          </div>

          {/* Design Process & Principles */}
          <div className="col-span-12 bg-black grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-800 border-b border-neutral-800">
             <div className="col-span-1 grid grid-rows-2 gap-px bg-neutral-800">
                <div className="row-span-1 bg-black p-8 flex items-center">
                    <p className="font-headline text-3xl md:text-4xl font-bold max-w-md">
                        DESIGN PROCESS DOESN’T HAVE TO BE COMPLEX. IN FACT, IT SHOULD BE SIMPLE.
                    </p>
                </div>
                <div className="row-span-1 bg-black p-8 relative min-h-[250px]">
                    <DraggableServices />
                </div>
             </div>
             <div className="col-span-1 grid grid-rows-2 gap-px bg-neutral-800">
                <div className="row-span-1 bg-black p-8">
                    <h3 className="font-headline text-2xl text-blue-500 font-bold">{principles[0].title}</h3>
                    <p className="mt-2 text-neutral-400 text-sm">{principles[0].description}</p>
                </div>
                <div className="row-span-1 bg-black p-8">
                    <h3 className="font-headline text-2xl text-blue-500 font-bold">{principles[1].title}</h3>
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

            <div className="absolute bottom-8 left-8 w-32 h-32 bg-yellow-400 rounded-tr-3xl"></div>
            <div className="absolute bottom-8 left-1/2 w-32 h-32 bg-pink-400 -translate-x-1/2 rounded-tl-3xl"></div>
          </div>

          <div className="col-span-12 md:col-span-5 bg-blue-500 text-black p-8 flex items-center border-b border-neutral-800">
            <p className="font-headline text-2xl md:text-3xl font-bold">
              WE ARE CONSTANTLY SEEKING TO STRIKE THE RIGHT BALANCE BETWEEN EFFICIENCY AND IMPRESSIVE LOOK
            </p>
          </div>

          {/* Our Team Header */}
          <div className="col-span-12 bg-black p-8 border-b border-neutral-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-headline text-5xl md:text-6xl font-bold">
                <span className="text-blue-500">Our</span> Team
              </h2>
            </div>
          </div>

          {/* Team Grid */}
          <div className="col-span-12 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 -mx-6">
                {team.map((member) => (
                    <div key={member.id} className="bg-black p-6 border border-neutral-800 flex items-center gap-6">
                    <TeamMemberCard 
                        imageUrl={member.imageUrl} 
                        shape={member.shape} 
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
            <div className="flex items-center gap-4">
              <button className="h-20 w-20 rounded-full bg-yellow-400 text-black font-bold flex items-center justify-center transition-transform hover:scale-105">
                Next Step
              </button>
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                <span className="w-2 h-2 rounded-full bg-neutral-700"></span>
                <span className="w-2 h-2 rounded-full bg-neutral-700"></span>
                <span className="w-2 h-2 rounded-full bg-neutral-700"></span>
                <span className="w-2 h-2 rounded-full bg-neutral-700"></span>
              </div>
            </div>
          </div>
          
          {/* Contact */}
          <div className="col-span-12 md:col-span-4 bg-black p-8 border-b border-neutral-800 flex flex-col justify-between items-center text-center">
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-500">Be</a>
              <a href="#" className="hover:text-blue-500">Clutch</a>
              <a href="#" className="hover:text-blue-500">
                <Linkedin className="h-5 w-5"/>
              </a>
               <a href="#" className="hover:text-blue-500">
                <Instagram className="h-5 w-5"/>
              </a>
            </div>
            <div className="relative w-full max-w-[200px] aspect-square">
                 <div className="absolute inset-0 border-t border-l border-r border-neutral-700 rounded-t-full"></div>
                 <Link href="/contact" className="absolute inset-0 flex items-center justify-center font-bold group">
                    CONTACT <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"/>
                 </Link>
            </div>
            <p className="text-xs text-neutral-500">Next Page</p>
          </div>
           <div className="col-span-12 bg-black">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
