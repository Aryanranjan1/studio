import { cn } from "@/lib/utils"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

function PageHeader({ className, as: Comp = "section", ...props }: PageHeaderProps) {
  return (
    <Comp className={cn("grid gap-1", className)} {...props} />
  )
}

function PageHeaderHeading({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={cn("font-headline text-3xl font-bold tracking-tight md:text-4xl", className)} {...props} />
  )
}

function PageHeaderDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("max-w-[750px] text-lg text-muted-foreground sm:text-xl", className)} {...props} />
  )
}

export { PageHeader, PageHeaderHeading, PageHeaderDescription }
