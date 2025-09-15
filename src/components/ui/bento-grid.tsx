import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  problem,
  solution,
  icon,
  imageUrl,
  imageHint,
}: {
  className?: string;
  problem?: string | React.ReactNode;
  solution?: string | React.ReactNode;
  icon?: React.ReactNode;
  imageUrl?: string;
  imageHint?: string;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-2xl group/bento overflow-hidden relative transition duration-200 shadow-input dark:shadow-none bg-background justify-between flex flex-col space-y-4 border border-white/10",
        className
      )}
    >
      {imageUrl && (
        <Image
            src={imageUrl}
            alt={typeof problem === 'string' ? problem : 'background'}
            fill
            className="object-cover w-full h-full opacity-20 group-hover/bento:opacity-30 transition-opacity duration-300"
            data-ai-hint={imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />

      <div className="relative z-20 flex flex-col h-full justify-end p-6">
        <motion.div
            className="group-hover/bento:translate-x-2 transition duration-200"
        >
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                {icon}
                <div className="font-headline font-bold text-foreground text-lg">
                    {problem}
                </div>
            </div>
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-sans font-normal text-muted-foreground text-sm transition-all duration-300 opacity-0 group-hover/bento:opacity-100 max-h-0 group-hover/bento:max-h-40"
            >
                {solution}
            </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
