"use client";

import { motion } from "framer-motion";
import type { Testimonial } from "@/lib/data";
import { cn } from "@/lib/utils";
import { TestimonialsColumn } from "@/components/ui/testimonials-column";

interface TestimonialSectionProps {
  className?: string;
  testimonials: Testimonial[];
}

const TestimonialSection = ({ className, testimonials }: TestimonialSectionProps) => {

  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(1, 4).length < 3 ? [...testimonials.slice(1, 4), ...testimonials.slice(0,1)] : testimonials.slice(1, 4);
  const thirdColumn = testimonials.slice(2, 5).length < 3 ? [...testimonials.slice(2, 5), ...testimonials.slice(0,2)] : testimonials.slice(2,5);

  return (
    <section className={cn("bg-background py-24 sm:py-32", className)}>

      <div className="container z-10 mx-auto">
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
