"use client";

import { motion } from "framer-motion";
import { getTestimonials } from "@/lib/data";
import type { Testimonial } from "@/lib/data";
import { cn } from "@/lib/utils";
import { TestimonialsColumn } from "@/components/ui/testimonials-column";

interface TestimonialSectionProps {
  className?: string;
}

const TestimonialSection = ({ className }: TestimonialSectionProps) => {
  const allTestimonials = getTestimonials();

  const firstColumn = allTestimonials.slice(0, 3);
  const secondColumn = allTestimonials.slice(1, 4);
  const thirdColumn = allTestimonials.slice(2, 5).length < 3 ? [...allTestimonials.slice(2, 5), ...allTestimonials.slice(0,1)] : allTestimonials.slice(2,5);


  return (
    <section className={cn("bg-background py-24 sm:py-32", className)}>

      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="font-headline text-sm font-semibold uppercase tracking-wider text-primary py-1 px-4 rounded-lg border">Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter">
            Amazing Feedbacks from Happy Clients
          </h2>
          <p className="text-center mt-5 text-lg text-foreground/80">
            See what our customers have to say about us.
          </p>
        </motion.div>

        <div className="relative flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={22} />
        </div>
      </div>
    </section>
  );
};

export { TestimonialSection };
