import { ScrollReveal } from "./scroll-reveal";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Code, Brush, Smartphone, ShoppingCart, Megaphone, PenTool } from 'lucide-react';

const services = [
  {
    icon: <Brush className="h-10 w-10 text-primary" />,
    title: "Branding",
    description: "Crafting unique brand identities that resonate with your audience and stand the test of time.",
  },
  {
    icon: <PenTool className="h-10 w-10 text-primary" />,
    title: "UI/UX Design",
    description: "Creating intuitive and beautiful user interfaces for exceptional user experiences.",
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "Web Development",
    description: "Building fast, responsive, and scalable websites with modern technologies.",
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: "Mobile App",
    description: "Designing and developing high-performance mobile applications for iOS and Android.",
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-primary" />,
    title: "E-commerce",
    description: "Developing robust e-commerce solutions that drive sales and customer loyalty.",
  },
  {
    icon: <Megaphone className="h-10 w-10 text-primary" />,
    title: "Marketing",
    description: "Executing data-driven marketing strategies to grow your reach and impact.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="container">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              Our Capabilities
            </h2>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              We offer a comprehensive suite of design and development services to bring your vision to life.
            </p>
          </div>
        </ScrollReveal>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 100}>
              <Card className="h-full text-center transition-all duration-300 hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center relative">
                      {service.icon}
                      <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping"></div>
                    </div>
                  </div>
                  <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
