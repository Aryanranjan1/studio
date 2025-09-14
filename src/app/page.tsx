
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ArrowRight, MoveRight } from 'lucide-react';

const propertyTypes = ['House', 'Farm', 'Factory', 'Ranch'];

const benefits = [
  {
    icon: "https://picsum.photos/seed/mishappenings/100/100",
    title: "Mishappenings",
    description: "It helps personal or commercial property during the time of mishappening.",
  },
  {
    icon: "https://picsum.photos/seed/liability/100/100",
    title: "Liability Elements",
    description: "The liability coverage element helps save time and money against disputes and lawsuits.",
  },
  {
    icon: "https://picsum.photos/seed/business-safety/100/100",
    title: "Business Safety",
    description: "To safeguard the belongings of the office, or business property, that includes all furniture.",
  }
]

export default function Home() {

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        <section className="relative overflow-hidden bg-accent rounded-b-3xl">
          <div className="container py-24 sm:py-32">
            <div className="grid grid-cols-12 gap-8 items-center">
              <div className="col-span-12 lg:col-span-7">
                <ScrollReveal>
                  <h1 className="text-5xl md:text-7xl font-bold font-headline text-foreground leading-tight tracking-tighter">
                    GET RID OF ANY <br/> RISKS TO PROPERTIES
                  </h1>
                  <p className="mt-4 text-lg text-foreground/80 max-w-md">
                    Protect your largest investment from unexpected events life may throw your way.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {propertyTypes.map(type => (
                      <Button key={type} variant="outline" className="rounded-full bg-background/50">
                        {type}
                      </Button>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
               <div className="col-span-12 lg:col-span-5 relative h-64 lg:h-96">
                <ScrollReveal>
                  <Image 
                    src="https://picsum.photos/seed/hero-image/800/600"
                    alt="Property illustration"
                    fill
                    className="object-contain"
                    data-ai-hint="whimsical building"
                  />
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-headline text-2xl font-bold mb-2">INSURANCE FOR ANY OCCASIONS</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://randomuser.me/api/portraits/men/33.jpg" />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <Avatar className="-ml-4 h-8 w-8">
                        <AvatarImage src="https://randomuser.me/api/portraits/women/53.jpg" />
                        <AvatarFallback>B</AvatarFallback>
                      </Avatar>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Different types of property insurance. Choose according to your goals and needs.
                    </p>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                      <Image 
                        src="https://picsum.photos/seed/house-card/600/400"
                        alt="Cute house"
                        fill
                        className="object-cover"
                        data-ai-hint="cute house illustration"
                      />
                      <div className="absolute top-4 right-4 bg-background/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
              <ScrollReveal>
                <div className="space-y-8">
                  <h2 className="text-4xl font-bold font-headline">BENEFITS YOU CAN GET BY USING OUR SERVICES</h2>
                  <div className="space-y-6">
                    {benefits.map(benefit => (
                      <div key={benefit.title} className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted transition-colors">
                        <Image src={benefit.icon} alt={benefit.title} width={60} height={60} className="rounded-lg" data-ai-hint="house illustration" />
                        <div>
                          <h4 className="font-bold text-lg">{benefit.title}</h4>
                          <p className="text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="rounded-full">
                    Main Risks <MoveRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
