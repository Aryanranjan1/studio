
"use client";

import { motion } from "framer-motion";
import { getTestimonials } from "@/lib/data";
import type { Testimonial } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface TestimonialSectionProps {
  className?: string;
}

const TestimonialSection = ({ className }: TestimonialSectionProps) => {
  const testimonials = getTestimonials();
  const featuredTestimonial = testimonials[0];

  return (
    <section className={cn("bg-primary text-primary-foreground py-24 sm:py-32", className)}>

      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter">
            Amazing Feedbacks from Happy Clients
          </h2>

            {featuredTestimonial && (
                <div className="mt-12 bg-primary/80 backdrop-blur-sm p-8 rounded-2xl border border-primary-foreground/20">
                    <div className="flex items-center gap-4 mb-4">
                        <Image
                            src={featuredTestimonial.avatarUrl}
                            alt={featuredTestimonial.name}
                            width={48}
                            height={48}
                            className="rounded-full"
                        />
                        <div>
                            <p className="font-bold">{featuredTestimonial.name}</p>
                            <p className="text-sm opacity-80">{featuredTestimonial.title}, {featuredTestimonial.company}</p>
                        </div>
                    </div>
                    <blockquote className="text-lg text-primary-foreground/90 text-left">
                        "{featuredTestimonial.quote}"
                    </blockquote>
                </div>
            )}
        </motion.div>

      </div>
    </section>
  );
};

export { TestimonialSection };
