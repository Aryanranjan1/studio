
"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { ScrollReveal } from "./scroll-reveal";
import { getTestimonials, Testimonial } from "@/lib/data";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

interface TestimonialSectionProps {
  className?: string;
}

export function TestimonialSection({ className }: TestimonialSectionProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getTestimonials((fetchedTestimonials) => {
      setTestimonials(fetchedTestimonials);
      setLoading(false);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);


  return (
    <section id="testimonials" className={cn("py-24 sm:py-32", className)}>
      <div className="container">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-headline text-sm font-semibold uppercase tracking-wider text-primary">Testimonials</p>
            <h2 className="font-headline mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              What Our Clients Say
            </h2>
            <p className="mt-6 text-lg text-foreground/80">
              We're proud to have partnered with amazing companies and delivered exceptional results.
            </p>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
             {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-4 rounded-lg border p-6">
                    <Skeleton className="h-20 w-full" />
                    <div className="flex items-center gap-4 pt-6 border-t">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                </div>
            ))}
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.id} delay={index * 100}>
                <Card className="h-full flex flex-col">
                  <CardContent className="flex-1 flex flex-col justify-between p-6">
                    <div>
                      <Quote className="h-8 w-8 text-primary/50 mb-4" />
                      <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                    </div>
                    <div className="flex items-center gap-4 mt-6 pt-6 border-t dark:border-white/10">
                      <Avatar>
                        <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}, {testimonial.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
