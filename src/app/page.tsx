import { HeroSvg } from '@/components/hero-svg';

export default function Home() {
  return (
    <main className="flex w-full flex-col lg:flex-row items-stretch justify-start bg-background p-0 overflow-hidden lg:h-screen">
      <div className="w-full lg:w-[75%] flex flex-col">
        {/* SVG Container (grows to fill space) */}
        <div className="flex-1 overflow-hidden -mt-[100px] lg:mt-0">
          <HeroSvg />
        </div>

        {/* Mid Section */}
        <div
          id="mid-section"
          className="flex items-stretch pl-4 pr-4 lg:pl-7 lg:pr-2 pb-2 mt-2"
        >
          <div className="h-32 w-[30%] rounded-lg bg-card">
            {/* Content for the first element */}
          </div>
          <div className="ml-2 h-32 flex-1 rounded-lg bg-card">
            {/* Content for the second element */}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[25%] rounded-xl lg:rounded-l-xl lg:rounded-r-none bg-purple-500 h-64 lg:h-auto mt-2 lg:mt-0">
        {/* Content for the right side div goes here */}
      </div>
    </main>
  );
}
