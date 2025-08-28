import { ScrollReveal } from "./scroll-reveal";

const processSteps = [
    {
      step: 1,
      title: "Discovery & Consultation",
      description: "We start by understanding your business, goals, and requirements through detailed discussions and research.",
      color: "bg-blue-500",
    },
    {
      step: 2,
      title: "Planning & Strategy",
      description: "Our team creates a comprehensive project plan with timelines, milestones, and technology stack recommendations.",
      color: "bg-pink-500",
    },
    {
      step: 3,
      title: "Design & Prototyping",
      description: "We develop wireframes and design mockups for your approval before any development begins.",
      color: "bg-purple-500",
    },
    {
      step: 4,
      title: "Development",
      description: "Our developers build your solution with clean, efficient code following industry best practices.",
      color: "bg-sky-500",
    },
    {
      step: 5,
      title: "Testing & Quality Assurance",
      description: "We rigorously test all functionality across devices and browsers to ensure flawless performance.",
      color: "bg-green-500",
    },
    {
      step: 6,
      title: "Launch & Support",
      description: "We deploy your solution and provide training plus ongoing support to ensure long-term success.",
      color: "bg-yellow-500",
    },
  ];

export function ProcessSection() {
    return (
        <section id="process" className="py-24 sm:py-32">
            <div className="container">
                <ScrollReveal>
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="font-headline text-sm font-semibold uppercase tracking-wider text-primary">Our Process</p>
                        <h2 className="font-headline mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                            How We Bring Your Vision to Life
                        </h2>
                        <p className="mt-6 text-lg text-foreground/80">
                            Our structured approach ensures efficiency, transparency, and outstanding results at every stage.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="relative mt-16 max-w-2xl mx-auto">
                    <div className="absolute left-4 top-0 h-full w-px bg-border -translate-x-1/2"></div>
                    {processSteps.map((item, index) => (
                        <ScrollReveal key={item.step} delay={index * 100}>
                            <div className="relative flex items-start gap-8 last:mb-0 mb-12">
                                <div className="relative flex-shrink-0">
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