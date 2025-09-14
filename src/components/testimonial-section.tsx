"use client";

import { motion } from "framer-motion";
import { getTestimonials } from "@/lib/data";
import type { Testimonial } from "@/lib/data";
import { TestimonialsColumn } from "@/components/ui/testimonials-column";
import { cn } from "@/lib/utils";

interface TestimonialSectionProps {
  className?: string;
}

const TestimonialSection = ({ className }: TestimonialSectionProps) => {
  const testimonials = getTestimonials().map(t => ({
      text: t.quote,
      image: t.avatarUrl,
      name: t.name,
      role: `${t.title}, ${t.company}`
  }));

  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(1, 4);
  const thirdColumn = testimonials.slice(2, 5);

  return (
    <section className={cn("bg-background my-20 relative", className)}>

      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-center">
            What our clients say
          </h2>
          <p className="text-center mt-5 opacity-75">
            See what our customers have to say about us.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export { TestimonialSection };
