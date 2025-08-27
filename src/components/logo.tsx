import { cn } from "@/lib/utils";

export const AmpireLogo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("w-8 h-8", className)}
    {...props}
  >
    <path d="m2 16 4-12 4 12" />
    <path d="M6 16h8" />
    <path d="M12 16s-1.5-4.5-3-8" />
    <path d="M22 16h-5l-1-4-1 4h-5" />
  </svg>
);
