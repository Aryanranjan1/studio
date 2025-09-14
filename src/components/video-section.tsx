
import { ScrollReveal } from "./scroll-reveal";

export function VideoSection({ className }: { className?: string }) {
  return (
    <section id="video" className={className}>
      <div className="container py-24 sm:py-32">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              See Our Process in Action
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              Watch how we transform ideas into fully-realized digital empires,
              from initial strategy to final launch.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-card">
              <video
                src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
