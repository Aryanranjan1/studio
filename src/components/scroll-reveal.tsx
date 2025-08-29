"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  threshold = 0.1,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const getAnimationClass = () => {
    if (!isVisible) return "opacity-0";

    if (className?.includes("slide-reveal-left")) {
      return "slide-reveal-left";
    }
    if (className?.includes("slide-reveal-right")) {
      return "slide-reveal-right";
    }
    return "animate-fade-in-up";
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-opacity duration-700 ease-out",
        getAnimationClass(),
        className
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {children}
    </div>
  );
}
