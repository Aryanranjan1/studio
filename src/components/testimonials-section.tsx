import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

export function TestimonialsSection() {
  return (
    <section className="w-full bg-black text-white py-24 sm:py-32 border-b border-white/20">
       <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="font-headline text-5xl md:text-6xl font-bold">What Our Clients Say</h2>
        <p className="mt-6 max-w-2xl text-lg text-neutral-400">
            We are trusted by the world's best companies. Here's what they have to say about us.
        </p>
      </div>
      <StaggerTestimonials />
    </section>
  );
}
