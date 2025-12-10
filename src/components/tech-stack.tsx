
'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

const technologies = [
  { 
    name: "Next.js", 
    description: "The React Framework", 
    src: "https://cdn.simpleicons.org/nextdotjs/white" 
  },
  { 
    name: "React", 
    description: "User Interfaces", 
    src: "https://cdn.simpleicons.org/react/white" 
  },
  { 
    name: "TypeScript", 
    description: "Type Safety", 
    src: "https://cdn.simpleicons.org/typescript/white" 
  },
  { 
    name: "Tailwind CSS", 
    description: "Utility-First CSS", 
    src: "https://cdn.simpleicons.org/tailwindcss/white" 
  },
  { 
    name: "Framer Motion", 
    description: "Production Animation", 
    src: "https://cdn.simpleicons.org/framer/white" 
  },
  { 
    name: "Firebase", 
    description: "Backend as a Service", 
    src: "https://cdn.simpleicons.org/firebase/white" 
  },
  { 
    name: "Figma", 
    description: "Collaborative Design", 
    src: "https://cdn.simpleicons.org/figma/white" 
  },
  { 
    name: "Vercel", 
    description: "Global Deployment", 
    src: "https://cdn.simpleicons.org/vercel/white" 
  },
];

export function TechStack() {
  return (
    <div className="col-span-12 bg-black border-b border-neutral-800 p-8 md:p-16">
      <div className="mb-12">
        <h2 className="font-headline text-5xl md:text-6xl font-bold">Technology Stack</h2>
         <p className="mt-6 max-w-2xl text-lg text-neutral-400">We build with a modern, scalable, and battle-tested stack to ensure your product is ready for the future.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-800 border-l border-t border-neutral-800">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className="group relative aspect-square flex items-center justify-center bg-black border-r border-b border-neutral-800 p-8 transition-colors hover:bg-neutral-900"
          >
            <Image
              src={tech.src}
              alt={`${tech.name} logo`}
              width={64}
              height={64}
              unoptimized
              className="h-12 w-12 text-white transition-opacity group-hover:opacity-10"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="font-bold text-lg">{tech.name}</p>
                <p className="text-sm text-neutral-400">{tech.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
