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
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-2xl group/bento overflow-hidden relative transition duration-200 shadow-input dark:shadow-none bg-transparent justify-between flex flex-col space-y-4 border border-white/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
