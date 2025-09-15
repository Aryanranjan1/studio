
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import {
  BentoGrid,
  BentoGridItem,
} from "@/components/ui/bento-grid";
import {
    Lightbulb,
    BarChart3,
    Clock,
    Scaling,
    Rocket,
    Code,
    Smartphone,
    ShoppingCart,
    X,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getProjects, getProjectBySlug } from "@/lib/data";
import type { Project } from "@/lib/data";
import { useItemDrawer } from "@/hooks/use-item-drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "./ui/button";

const animationTypes = [
    'flip-horizontal',
    'flip-vertical',
    'fade-slide',
    'zoom-out-in',
];
  
const FlippableBentoCard = ({
    item,
    className,
  }: {
    item: (typeof items)[0];
    className?: string;
  }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [animationType, setAnimationType] = useState('flip-horizontal');
    const { showItem } = useItemDrawer();
    const isMobile = useMediaQuery("(max-width: 768px)");
  
    const handleFlip = () => {
        if (isMobile) {
            setIsExpanded(true);
        } else {
            setIsFlipped(!isFlipped);
        }
    }
    
    const handleHoverStart = () => {
      if (isMobile) return;
      const randomType = animationTypes[Math.floor(Math.random() * animationTypes.length)];
      setAnimationType(randomType);
      setIsHovering(true);
    };

    const handleHoverEnd = () => {
      if (isMobile) return;
      setIsHovering(false);
      if (!isFlipped) {
        setIsHovering(false);
      }
    };
  
    const showBack = !isMobile && (isFlipped || isHovering);

    const project = getProjectBySlug(item.projectSlug);

    const handleProjectClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        if(project) {
            showItem(project);
        }
    }

    const handleCloseExpanded = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(false);
    }
  
    const variants = {
      'flip-horizontal': {
        front: { rotateY: 180 },
        back: { rotateY: -180 },
      },
      'flip-vertical': {
        front: { rotateX: 180 },
        back: { rotateX: -180 },
      },
      'fade-slide': {
        front: { opacity: 0, x: -50 },
        back: { opacity: 0, x: 50 },
      },
      'zoom-out-in': {
        front: { scale: 0, opacity: 0 },
        back: { scale: 0, opacity: 0 },
      },
    };
  
    const selectedVariant = variants[animationType as keyof typeof variants] || variants['flip-horizontal'];
    
    if (isMobile) {
        return (
            <>
                <BentoGridItem
                    className={cn("relative", className)}
                    onClick={handleFlip}
                >
                    <motion.div
                        className="absolute inset-0 w-full h-full flex flex-col justify-end p-6 bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.imageUrl})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0" />
                        <div className="relative z-10 flex items-center gap-2 text-white">
                            {React.cloneElement(item.icon, { className: "h-5 w-5"})}
                            <div className="text-lg font-headline font-bold">
                            {item.problem}
                            </div>
                        </div>
                    </motion.div>
                </BentoGridItem>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="fixed inset-0 bg-black/80 z-50 p-4 flex items-center justify-center"
                            onClick={() => setIsExpanded(false)}
                        >
                            <div 
                                className="relative w-full max-w-sm h-auto max-h-[80vh] bg-card rounded-2xl p-6 flex flex-col overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 z-10 text-muted-foreground"
                                    onClick={handleCloseExpanded}
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                                
                                <div className="flex-grow flex flex-col gap-4 overflow-y-auto pr-2">
                                    <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                                        {item.icon}
                                        <h3 className="font-headline font-bold text-foreground text-lg">
                                        Our Solution
                                        </h3>
                                    </div>
                                    <div className="text-sm text-muted-foreground flex-grow overflow-y-auto pr-2">
                                        <p className="whitespace-pre-wrap">{item.solution}</p>
                                    </div>
                                    <div className="w-full relative rounded-lg overflow-hidden h-48 mt-4">
                                        <button onClick={handleProjectClick} className="block w-full h-full group cursor-pointer">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.problem}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                data-ai-hint={item.imageHint}
                                            />
                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <span className="text-white text-xs font-bold bg-black/50 px-2 py-1 rounded-full">View Project</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </>
        );
    }
  
    return (
      <BentoGridItem
        className={cn("relative", className)}
        style={{ perspective: "1200px" }}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        onClick={handleFlip}
      >
        <AnimatePresence initial={false}>
          {!showBack ? (
            <motion.div
              key="front"
              initial={{ rotateX: 0, rotateY: 0, opacity: 1, scale: 1, x: 0 }}
              animate={{ rotateX: 0, rotateY: 0, opacity: 1, scale: 1, x: 0 }}
              exit={{ ...selectedVariant.front, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full flex flex-col justify-end p-6 bg-cover bg-center"
              style={{
                backgroundImage: `url(${item.imageUrl})`,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0" />
              <div className="relative z-10 flex items-center gap-2 text-white">
                {React.cloneElement(item.icon, { className: "h-5 w-5"})}
                <div className="text-lg font-headline font-bold">
                  {item.problem}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ ...selectedVariant.back, opacity: 0 }}
              animate={{ rotateX: 0, rotateY: 0, opacity: 1, scale: 1, x: 0 }}
              exit={{ ...selectedVariant.front, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full bg-card p-6 flex flex-col"
              style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
            >
              <div className="flex-grow flex flex-col md:flex-row gap-4 overflow-hidden">
                <div className="w-full md:w-1/2 flex flex-col">
                  <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                    {item.icon}
                    <h3 className="font-headline font-bold text-foreground text-base">
                      Our Solution
                    </h3>
                  </div>
                  <div className="text-xs text-muted-foreground flex-grow overflow-y-auto pr-2 custom-scrollbar">
                    <p className="whitespace-pre-wrap">{item.solution}</p>
                  </div>
                </div>
                <div className="w-full md:w-1/2 relative rounded-lg overflow-hidden h-32 md:h-auto">
                   <button onClick={handleProjectClick} className="block w-full h-full group cursor-pointer">
                      <Image
                          src={item.imageUrl}
                          alt={item.problem}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          data-ai-hint={item.imageHint}
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-white text-xs font-bold bg-black/50 px-2 py-1 rounded-full">View Project</span>
                      </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </BentoGridItem>
    );
};


export function BentoGridDemo() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
        <div className="grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto mt-16">
            <Skeleton className="md:col-span-2 h-56" />
            <Skeleton className="md:col-span-1 h-56" />
            <Skeleton className="md:col-span-1 h-56" />
            <Skeleton className="md:col-span-2 h-56" />
            <Skeleton className="md:col-span-1 h-56" />
            <Skeleton className="md:col-span-1 h-56" />
            <Skeleton className="md:col-span-1 h-56" />
        </div>
    );
  }

  return (
    <BentoGrid className="grid-cols-2 md:grid-cols-5 auto-rows-fr md:auto-rows-[14rem] mt-16 max-w-5xl mx-auto">
      {items.map((item, i) => (
        <FlippableBentoCard
          key={i}
          item={item}
          className={cn(item.mobileClassName, item.desktopClassName)}
        />
      ))}
    </BentoGrid>
  );
}

const allProjects = getProjects();

const items = [
  {
    problem: "Facing tech confusion?",
    solution: "We provide clarity with modern, reliable solutions. We'll guide you through choosing and implementing the right technology, like Next.js for blazing-fast performance and a headless CMS for easy content management, ensuring your site is built on a solid, future-proof foundation. Our process involves a deep-dive discovery session, clear documentation, and transparent communication every step of the way. You'll never feel lost in jargon again. We empower you to understand your technology, not just use it.",
    desktopClassName: "md:col-span-3",
    mobileClassName: "col-span-2",
    icon: <Lightbulb className="h-4 w-4 text-neutral-500" />,
    imageUrl: "https://picsum.photos/seed/tech-clarity/800/400",
    imageHint: "code dashboard",
    projectSlug: allProjects[0]?.slug ?? "nova-financial-website",
  },
  {
    problem: "Struggling with online invisibility?",
    solution: "We elevate your brand's presence with targeted SEO strategies. By optimizing your site's structure, content, and authority, we drive relevant organic traffic to your digital doorstep, turning searchers into valuable leads and customers.",
    desktopClassName: "md:col-span-2",
    mobileClassName: "col-span-1",
    icon: <BarChart3 className="h-4 w-4 text-neutral-500" />,
    imageUrl: "https://picsum.photos/seed/seo-growth/400/400",
    imageHint: "chart graph",
    projectSlug: allProjects[4]?.slug ?? "workflow-automation-tool",
  },
  {
    problem: "Need a stunning brand identity?",
    solution: "We craft memorable brand identities that tell your unique story. From logos and color palettes to voice and messaging, we build a cohesive and compelling brand that resonates with your audience and sets you apart from the competition.",
    desktopClassName: "md:col-span-2",
    mobileClassName: "col-span-1",
    icon: <Rocket className="h-4 w-4 text-neutral-500" />,
    imageUrl: "https://picsum.photos/seed/branding-rocket/400/400",
    imageHint: "brand design",
    projectSlug: allProjects[1]?.slug ?? "helia-skincare-branding",
  },
  {
    problem: "Can't keep up with growth?",
    solution:
      "We build scalable solutions that grow with your business. From high-performance websites that handle traffic spikes to custom app integrations, we provide the robust infrastructure you need to expand without technical limitations. Our architecture is designed for scalability from day one, using cloud services and efficient code to ensure your platform remains fast and reliable as your user base grows.",
    desktopClassName: "md:col-span-3",
    mobileClassName: "col-span-2",
    icon: <Scaling className="h-4 w-4 text-neutral-500" />,
    imageUrl: "https://picsum.photos/seed/scaling-up/800/400",
    imageHint: "abstract architecture",
    projectSlug: allProjects[0]?.slug ?? "nova-financial-website",
  },
  {
    problem: "Want to reach customers on mobile?",
    solution: "We design and develop intuitive mobile apps for iOS and Android. Our focus is on creating a seamless, engaging user experience that keeps your audience connected to your brand, wherever they are.",
    desktopClassName: "md:col-span-1",
    mobileClassName: "col-span-1",
    icon: <Smartphone className="h-4 w-4 text-neutral-500" />,
    imageUrl: "https://picsum.photos/seed/mobile-reach/400/400",
    imageHint: "mobile app",
    projectSlug: allProjects[2]?.slug ?? "traverse-travel-app",
  },
  {
    problem: "Looking to sell online effectively?",
    solution: "We create powerful e-commerce platforms using Shopify or custom solutions. We focus on a frictionless shopping experience, from beautiful product displays to secure, one-click checkouts, all designed to maximize conversions.",
    desktopClassName: "md:col-span-2",
    mobileClassName: "col-span-1",
    icon: <ShoppingCart className="h-4 w-4 text-neutral-500" />,
    imageUrl: "https://picsum.photos/seed/ecommerce-cart/400/400",
    imageHint: "shopping cart",
    projectSlug: allProjects[3]?.slug ?? "artisan-coffee-ecommerce",
  },
  {
    problem: "Wasting time on repetitive tasks?",
    solution: "We build custom automations that streamline your operations. By integrating your systems and automating manual workflows, we free up your team to focus on high-value activities that drive growth.",
    desktopClassName: "md:col-span-2",
    mobileClassName: "col-span-2",
    icon: <Clock className="h-4 w-4 text-neutral-500" />,
    imageUrl: "https://picsum.photos/seed/automation-gears/400/400",
    imageHint: "gears clock",
    projectSlug: allProjects[4]?.slug ?? "workflow-automation-tool",
  },
];
