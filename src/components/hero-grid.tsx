import { cn } from '@/lib/utils';

const BentoCard = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => (
  <div
    className={cn(
      'rounded-2xl border border-border/20 bg-card p-4 shadow-inner flex items-center justify-center',
      className
    )}
  >
    {children}
  </div>
);

export function HeroGrid() {
  return (
    <div
      className="grid h-[1200px] grid-cols-4 grid-rows-[repeat(26,minmax(0,1fr))] gap-2 
    md:h-[900px] md:grid-cols-8 md:grid-rows-10 
    lg:h-[600px] lg:grid-cols-12 lg:grid-rows-6"
    >
      {/* div1 */}
      <BentoCard
        className="col-span-4 row-span-7 
      md:col-span-5 md:row-span-5 
      lg:col-span-6 lg:row-span-4"
      >
        <h1 className="text-4xl font-bold">div1</h1>
      </BentoCard>
      {/* div2 */}
      <BentoCard
        className="col-span-2 row-span-3 row-start-8 
      md:col-start-1 md:col-span-3 md:row-start-6 md:row-span-3
      lg:col-start-1 lg:col-span-3 lg:row-start-5 lg:row-span-2"
      >
        div2
      </BentoCard>
      {/* div3 */}
      <BentoCard
        className="col-start-3 col-span-2 row-span-3 row-start-8 
      md:col-start-4 md:col-span-2 md:row-start-6 md:row-span-3 
      lg:col-start-4 lg:col-span-3 lg:row-start-5 lg:row-span-2"
      >
        div3
      </BentoCard>
      {/* div4 */}
      <BentoCard
        className="col-span-4 row-span-5 row-start-11 
      md:col-start-6 md:col-span-3 md:row-start-1 md:row-span-3 
      lg:col-start-7 lg:col-span-4 lg:row-start-1 lg:row-span-3"
      >
        div4
      </BentoCard>
      {/* div5 */}
      <BentoCard
        className="col-span-4 row-span-7 row-start-16 
      md:col-start-6 md:col-span-3 md:row-start-4 md:row-span-5 
      lg:col-start-7 lg:col-span-4 lg:row-start-4 lg:row-span-3"
      >
        div5
      </BentoCard>
      {/* div6 */}
      <BentoCard
        className="col-span-1 row-start-23 row-span-4
      md:col-start-1 md:col-span-2 md:row-start-9 md:row-span-2 
      lg:col-start-11 lg:col-span-2 lg:row-start-1 lg:row-span-5"
      >
        div6
      </BentoCard>
      {/* div7 */}
      <BentoCard
        className="col-span-3 row-start-23 row-span-4
      md:col-start-3 md:col-span-6 md:row-start-9 md:row-span-2 
      lg:col-start-11 lg:col-span-2 lg:row-start-6"
      >
        div7
      </BentoCard>
    </div>
  );
}
