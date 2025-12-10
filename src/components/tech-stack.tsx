
'use client';

import { Code, Cpu, Database, Fingerprint, Framer, LucideIcon, Palette, Bot, Server, Sparkles, Wind } from 'lucide-react';
import { cn } from '@/lib/utils';

const technologies: {
  id: string;
  name: string;
  description: string;
  Icon: LucideIcon;
}[] = [
  {
    id: '01',
    name: 'Next.js',
    description: '// FRONTEND FRAMEWORK\nServer-side rendering for max speed.',
    Icon: Wind,
  },
  {
    id: '02',
    name: 'Tailwind',
    description: '// STYLING ENGINE\nUtility-first CSS for custom designs.',
    Icon: Palette,
  },
  {
    id: '03',
    name: 'Python',
    description: '// BACKEND LOGIC\nComplex data processing & AI integration.',
    Icon: Code,
  },
  {
    id: '04',
    name: 'Three.js',
    description: '// WEBGL RENDERER\nImmersive 3D experiences in-browser.',
    Icon: Sparkles,
  },
  {
    id: '05',
    name: 'Postgres',
    description: '// DATABASE\nReliable, scalable structured data.',
    Icon: Database,
  },
  {
    id: '06',
    name: 'Vercel',
    description: '// INFRASTRUCTURE\nEdge network deployment globally.',
    Icon: Server,
  },
  {
    id: '07',
    name: 'OpenAI API',
    description: '// INTELLIGENCE\nCustom agents & automation logic.',
    Icon: Bot,
  },
  {
    id: '08',
    name: 'Auth.js',
    description: '// SECURITY\nEncrypted authentication flows.',
    Icon: Fingerprint,
  },
];

export function TechStack() {
  return (
    <section className="tech-section relative w-full overflow-hidden border-b border-white/20 bg-black">
      <div className="tech-marquee overflow-hidden whitespace-nowrap border-t border-b border-white/20 bg-black py-4">
        <div className="marquee-track inline-block animate-scroll">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="marquee-content mx-4 font-headline text-lg font-bold uppercase tracking-wider">
              SYSTEM ARCHITECTURE // CORE TECHNOLOGIES // OPTIMIZED FOR PERFORMANCE //
            </span>
          ))}
        </div>
      </div>

      <div className="tech-grid-container grid w-full grid-cols-1 border-neutral-700 bg-neutral-700 md:grid-cols-2 lg:grid-cols-4">
        {technologies.map(({ id, name, description, Icon }, index) => (
          <div
            key={id}
            className={cn(
              "tech-cell group relative flex h-[250px] cursor-crosshair flex-col justify-between bg-black p-8 transition-all duration-300 ease-in-out hover:bg-white hover:text-black",
            )}
          >
            <div className="tech-header flex justify-between items-start">
              <span className="tech-id rounded-full border border-neutral-700 px-3 py-1 text-xs transition-colors duration-300 group-hover:border-black">
                {id}
              </span>
              <Icon className="tech-icon h-6 w-6 text-neutral-500 transition-colors duration-300 group-hover:text-black" />
            </div>
            <div className="tech-info">
              <h3 className="mb-2 font-headline text-2xl font-bold uppercase">{name}</h3>
              <p className="whitespace-pre-line text-xs leading-snug text-neutral-400 transition-colors duration-300 group-hover:text-neutral-600">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
