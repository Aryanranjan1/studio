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
        "grid gap-4",
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
        "row-span-1 rounded-2xl group/bento overflow-hidden relative transition duration-200 shadow-input dark:shadow-none bg-transparent justify-between flex flex-col space-y-4 border border-white/10 h-48",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

    