
import { getProjects } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MoveRight } from 'lucide-react';
import { DraggableServices } from '@/components/draggable-services';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';

const clientLogos = [
    { src: 'https://tailwindui.com/img/logos/158x48/reform-logo-white.svg', alt: 'Reform' },
    { src: 'https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg', alt: 'SavvyCal' },
    { src: 'https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg', alt: 'Statamic' },
    { src: 'https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg', alt: 'Transistor' },
];

export default function PortfolioPage() {
  const projects = getProjects();
  const projectCategories = [...new Set(projects.map(p => p.category))];

  return (
    <div className="w-full bg-black text-white min-h-screen">
      <main>
        <div className="grid grid-cols-12 gap-px border-l border-r border-neutral-800 bg-neutral-800">
          
          {/* Hero Header */}
          <div className="col-span-12 md:col-span-7 bg-black p-8 border-b border-neutral-800 flex flex-col justify-between min-h-[50vh]">
            <div>
                <h1 className="font-headline text-7xl md:text-9xl font-bold">Portfolio</h1>
                <p className="mt-4 max-w-md text-neutral-400">
                    We build digital experiences that stay clear, fast, and focused on delivering real value for your business and your users.
                </p>
            </div>
            <div className="flex flex-wrap gap-2">
                {projectCategories.map(cat => (
                    <Badge key={cat} variant="outline" className="text-sm">{cat}</Badge>
                ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 bg-black relative min-h-[300px] border-b border-neutral-800">
             <DraggableServices 
                items={['Next.js', 'Figma', 'Webflow', 'React', 'AI/ML', 'Automation', 'Firebase', 'SEO']}
             />
          </div>

          {/* Client Logos */}
            <div className="col-span-12 bg-black py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-center text-lg font-semibold text-neutral-400">
                        Trusted by the world’s most innovative companies
                    </h2>
                    <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
                        {clientLogos.map((logo) => (
                            <div key={logo.alt} className="flex justify-center">
                                <Image
                                    className="max-h-12 w-full object-contain"
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={158}
                                    height={48}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>


          {/* Projects Grid */}
            <div className="col-span-12 bg-black grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-800 border-t border-b border-neutral-800">
              {projects.map((project) => (
                <Link
                  href={`/portfolio/${project.id}`}
                  key={project.id}
                  className="group relative block overflow-hidden bg-black p-8"
                >
                  <div className="relative h-80 w-full rounded-lg overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint="website screenshot"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/30"></div>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between items-center">
                        <h3 className="font-headline text-3xl font-bold">{project.title}</h3>
                        <MoveRight className="h-8 w-8 text-neutral-500 transition-transform group-hover:translate-x-2 group-hover:text-primary" />
                    </div>
                    <p className="mt-2 text-neutral-400">{project.description}</p>
                     <div className="mt-4">
                        <Badge variant="secondary">{project.category}</Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          
          {/* Let's Work */}
          <div className="col-span-12 md:col-span-8 bg-black p-8 flex flex-col justify-between min-h-[300px] border-b border-neutral-800">
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
          <div className="col-span-12 md:col-span-4 bg-primary text-primary-foreground p-8 flex flex-col justify-center items-center text-center border-b border-neutral-800">
            <h3 className="font-headline text-3xl font-bold">Have an idea?</h3>
            <p className="mt-2">Tell us about your project.</p>
            <Button asChild variant="outline" className="mt-6 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                 <Link href="/contact" className="group">
                    CONTACT <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"/>
                 </Link>
            </Button>
          </div>

           <div className="col-span-12 bg-black">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
