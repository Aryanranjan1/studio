import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";

const processSteps = [
    {
      step: 1,
      title: "Discovery & Strategy",
      description: "We dive deep into your brand, goals, and audience to create a strategic blueprint for your digital empire.",
      color: "bg-blue-500",
    },
    {
      step: 2,
      title: "Design & Prototyping",
      description: "We craft stunning, user-centric designs and interactive prototypes. This is where your vision starts to take shape.",
      color: "bg-pink-500",
    },
    {
      step: 3,
      title: "Development & Build",
      description: "Our developers bring the designs to life with clean, efficient code, whether it's a WordPress site or a Next.js app.",
      color: "bg-purple-500",
    },
    {
      step: 4,
      title: "SEO & Automation Setup",
      description: "We implement foundational SEO and time-saving automations to ensure your site works hard for you from day one.",
      color: "bg-sky-500",
    },
    {
      step: 5,
      title: "Testing & Quality Assurance",
      description: "We rigorously test everything across all devices to ensure a flawless, bug-free launch for your audience.",
      color: "bg-green-500",
    },
    {
      step: 6,
      title: "Launch & Coronation",
      description: "We deploy your project and hand you the keys to your new digital throne. Ongoing support ensures your reign is long and successful.",
      color: "bg-yellow-500",
    },
  ];

interface ProcessSectionProps {
    className?: string;
}

export function ProcessSection({ className }: ProcessSectionProps) {
    return (
        <section id="process" className={cn("py-24 sm:py-32", className)}>
            <div className="container">
                <ScrollReveal>
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="font-headline text-sm font-semibold uppercase tracking-wider text-primary">Our Process</p>
                        <h2 className="font-headline mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                            How We Crown Your Brand
                        </h2>
                        <p className="mt-6 text-lg text-foreground/80">
                            Our structured approach ensures efficiency, transparency, and outstanding results at every stage of building your empire.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="relative mt-16 max-w-2xl mx-auto">
                    <div className="absolute left-4 top-0 h-full w-px bg-border -translate-x-1/2"></div>
                    {processSteps.map((item, index) => (
                        <ScrollReveal key={item.step} delay={index * 100}>
                            <div className="relative flex items-start gap-8 last:mb-0 mb-12">
                                <div className="relative z-10 flex-shrink-0">
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ${item.color}`}>
                                        {item.step}
                                    </div>
                                </div>
                                <div className="mt-px">
                                    <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                                    <p className="mt-2 text-muted-foreground">{item.description}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
