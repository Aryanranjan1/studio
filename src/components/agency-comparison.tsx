"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  Zap, 
  TrendingUp, 
  Users, 
  Palette, 
  Code, 
  Rocket,
  Clock,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";

type ComparisonPoint = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

type ComparisonColumnData = {
  title: string;
  subtitle: string;
  isPositive: boolean;
  points: ComparisonPoint[];
};

const AgencyComparison = ({ className }: { className?: string }) => {
  const [activeSection, setActiveSection] = useState('us');

  const ourAgencyData = {
    title: "AMpire Studio",
    subtitle: "Custom & Collaborative",
    isPositive: true,
    points: [
      {
        title: "Tailored Strategy",
        description: "We dive deep into your brand, audience & goals before writing a single line of code.",
        icon: <Code className="w-5 h-5" />
      },
      {
        title: "Scalable Solutions",
        description: "Our modern tech stack (Next.js, Headless CMS) ensures your website can grow with your business.",
        icon: <TrendingUp className="w-5 h-5" />
      },
      {
        title: "Performance Optimized",
        description: "Speed, SEO, and user experience are our top priorities from the very start.",
        icon: <Zap className="w-5 h-5" />
      },
      {
        title: "Unique Brand Identity",
        description: "Your website will be a unique reflection of your brand, not a recycled template.",
        icon: <Palette className="w-5 h-5" />
      },
      {
        title: "Close Collaboration",
        description: "We work with you as a partner, ensuring your vision is brought to life.",
        icon: <Users className="w-5 h-5" />
      },
      {
        title: "Growth Partnership",
        description: "Our goal isn't just to launch a site, but to build a tool that helps you succeed.",
        icon: <Rocket className="w-5 h-5" />
      },
    ]
  };

  const othersData = {
    title: "Typical Agencies",
    subtitle: "Generic & Inflexible",
    isPositive: false,
    points: [
      {
        title: "One-Size-Fits-All",
        description: "They apply the same generic approach to every project, ignoring unique needs.",
        icon: <X className="w-5 h-5" />
      },
      {
        title: "Limited Flexibility",
        description: "Template-based sites are hard to scale or customize as your business evolves.",
        icon: <X className="w-5 h-5" />
      },
      {
        title: "Performance Issues",
        description: "Bloated templates and outdated tech lead to slow load times and poor SEO.",
        icon: <Clock className="w-5 h-5" />
      },
      {
        title: "Generic Branding",
        description: "Your site ends up looking like dozens of others, failing to stand out.",
        icon: <X className="w-5 h-5" />
      },
      {
        title: "Minimal Support",
        description: "Once the project is delivered, you're often left on your own.",
        icon: <X className="w-5 h-5" />
      },
      {
        title: "Deliver & Disappear",
        description: "They see it as a one-off project, not a long-term partnership for growth.",
        icon: <X className="w-5 h-5" />
      }
    ]
  };

  return (
    <section
      className={cn(
        "w-full py-24 px-4 bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              The AMpire Difference
            </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Why Partner With Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See the difference between our custom, growth-focused approach and generic, template-based solutions.
          </p>
        </div>

        <div className="flex justify-center mb-8 md:hidden">
          <div className="bg-muted p-1 rounded-lg flex">
            <button
              onClick={() => setActiveSection('us')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                activeSection === 'us'
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              AMpire Studio
            </button>
            <button
              onClick={() => setActiveSection('others')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                activeSection === 'others'
                  ? "bg-destructive/80 text-destructive-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Others
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className={cn("md:block", activeSection === 'us' ? "block" : "hidden")}>
            <ComparisonColumn data={ourAgencyData} />
          </div>
          <div className={cn("md:block", activeSection === 'others' ? "block" : "hidden")}>
            <ComparisonColumn data={othersData} />
          </div>
        </div>
      </div>
    </section>
  );
};

const ComparisonColumn = ({ data }: { data: ComparisonColumnData }) => {
  return (
    <motion.div
      className={cn(
        "relative p-6 rounded-2xl border-2 transition-all duration-300",
        data.isPositive
          ? "bg-gradient-to-br from-primary/5 to-blue-500/5 border-primary/20 hover:border-primary/40"
          : "bg-gradient-to-br from-muted/50 to-muted border-border hover:border-border/60"
      )}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-3", data.isPositive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>
          {data.isPositive ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
          {data.subtitle}
        </div>
        <h3 className={cn(
          "text-2xl md:text-3xl font-bold",
          data.isPositive ? "text-primary" : "text-muted-foreground"
        )}>
          {data.title}
        </h3>
      </div>

      <div className="space-y-4">
        {data.points.map((point, index) => (
          <ComparisonPointC key={index} point={point} isPositive={data.isPositive} />
        ))}
      </div>

      {data.isPositive && (
        <>
          <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 bg-primary/20 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-500/20 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </>
      )}
    </motion.div>
  );
};

const ComparisonPointC = ({ point, isPositive }: { point: ComparisonPoint, isPositive: boolean }) => {
  return (
    <motion.div
      className="group"
      whileHover={{ x: isPositive ? 5 : -5 }}
    >
      <div className="flex items-start gap-3 p-3 rounded-lg transition-all duration-300 group-hover:bg-background/50">
        <motion.div
          className={cn(
            "flex-shrink-0 p-2 rounded-lg transition-all duration-300",
            isPositive
              ? "bg-primary/10 text-primary group-hover:bg-primary/20"
              : "bg-muted text-muted-foreground group-hover:bg-muted/80"
          )}
          whileHover={{ rotate: isPositive ? 360 : -360 }}
          transition={{ duration: 0.6 }}
        >
          {point.icon}
        </motion.div>
        <div className="flex-1 min-w-0">
          <h4 className={cn(
            "font-semibold mb-1 transition-colors duration-300",
            isPositive
              ? "text-foreground group-hover:text-primary"
              : "text-muted-foreground"
          )}>
            {point.title}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {point.description}
          </p>
        </div>
        {isPositive && (
          <motion.div
            className="flex-shrink-0 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.2 }}
          >
            <Check className="w-4 h-4" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AgencyComparison;
