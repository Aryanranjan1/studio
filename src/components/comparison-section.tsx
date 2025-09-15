
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Check, X } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const comparisonData = {
  them: [
    { icon: X, text: "Bloated quotes & hidden fees that punish small budgets." },
    { icon: X, text: "Slow, rigid, one-size-fits-all corporate process." },
    { icon: X, text: "You're just another ticket number in a long queue." },
    { icon: X, text: "Complex jargon and a total lack of transparency." },
  ],
  us: [
    { icon: Check, text: "Clear, fair pricing that respects your hustle." },
    { icon: Check, text: "Agile, collaborative partnership focused on your goals." },
    { icon: Check, text: "Personalized support—we're invested in your success." },
    { icon: Check, text: "Radical transparency. We speak your language." },
  ],
};

const AnimatedListItem = ({ item, isUs }: { item: { icon: React.ElementType, text: string }, isUs: boolean}) => {
    const Icon = item.icon;
    return (
        <motion.li
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-start gap-3"
        >
            <span className={cn("flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5", isUs ? "bg-accent/20 text-accent" : "bg-red-500/20 text-red-500")}>
                <Icon className="w-4 h-4" />
            </span>
            <span className="text-foreground/80">{item.text}</span>
        </motion.li>
    )
}

export function ComparisonSection({ className }: { className?: string }) {
  const [activeView, setActiveView] = useState<"us" | "them">("us");

  return (
    <section className={cn("py-24 sm:py-32", className)}>
      <div className="container max-w-4xl">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              The AMpire Difference
            </h2>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              We're not like other agencies. We're built for the new wave of creators and entrepreneurs. Here's how we're different.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
            <div className="mt-12 flex justify-center">
            <div className="relative flex w-full max-w-xs items-center rounded-full bg-secondary p-1">
                <Button
                    onClick={() => setActiveView("them")}
                    variant="ghost"
                    className="w-1/2 rounded-full h-10 text-center text-sm font-medium leading-5 text-foreground transition-colors"
                >
                    Typical Agencies
                </Button>
                <Button
                    onClick={() => setActiveView("us")}
                    variant="ghost"
                    className="w-1/2 rounded-full h-10 text-center text-sm font-medium leading-5 text-foreground transition-colors"
                >
                    AMpire Studio
                </Button>
                <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-0 z-0 h-full w-1/2 rounded-full bg-background shadow-md"
                    animate={{ x: activeView === "us" ? "100%" : "0%" }}
                />
            </div>
            </div>
        </ScrollReveal>

        <ScrollReveal delay={400}>
            <div className="mt-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeView}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <ul className="space-y-6 max-w-md mx-auto">
                            {comparisonData[activeView].map((item, index) => (
                                <AnimatedListItem key={index} item={item} isUs={activeView === 'us'} />
                            ))}
                        </ul>
                    </motion.div>
                </AnimatePresence>
            </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
