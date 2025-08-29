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
        setIsVisible(entry.isIntersecting);
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
    if (className?.includes("slide-reveal-left")) {
      return isVisible ? "slide-reveal-left" : "slide-out-to-left";
    }
    if (className?.includes("slide-reveal-right")) {
      return isVisible ? "slide-reveal-right" : "slide-out-to-right";
    }
    return isVisible ? "animate-fade-in-up" : "animate-fade-out-down";
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
