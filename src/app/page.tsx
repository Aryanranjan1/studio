import { HeroSvg } from '@/components/hero-svg';

export default function Home() {
  return (
    <main className="flex w-full flex-col items-stretch justify-start bg-background p-0 lg:flex-row lg:h-screen">
      <div className="flex w-full flex-col lg:w-[75%]">
        {/* SVG Container (grows to fill space) */}
        <div className="flex-1 overflow-hidden -mt-[75px] lg:-mt-[100px]">
          <HeroSvg />
        </div>

        {/* Mid Section */}
        <div
          id="mid-section"
          className="mr-2 flex items-stretch pl-7 pr-2 pb-2"
        >
          <div className="h-32 w-[30%] rounded-lg bg-card">
            {/* Content for the first element */}
          </div>
          <div className="ml-2 h-32 flex-1 rounded-lg bg-card">
            {/* Content for the second element */}
          </div>
        </div>
      </div>
      <div className="mt-2 h-64 w-full rounded-lg bg-purple-500 lg:mt-0 lg:h-auto lg:w-[25%] lg:rounded-l-xl lg:rounded-r-none">
        {/* Content for the right side div goes here */}
      </div>
    </main>
  );
}
