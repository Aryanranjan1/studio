import { HeroSvg } from '@/components/hero-svg';

export default function Home() {
  return (
    <main className="flex flex-col items-stretch justify-start bg-background p-0 lg:h-screen lg:flex-row">
      <div className="flex w-full flex-col lg:w-[75%]">
        {/* SVG Container (grows to fill space) */}
        <div className="flex-1 overflow-hidden lg:-mt-[100px] mb-2">
          <HeroSvg />
        </div>

        {/* Mid Section */}
        <div
          id="mid-section"
          className="mr-2 flex items-stretch pl-7 pr-2 pb-2 lg:mr-0 lg:pl-0"
        >
          <div className="h-32 w-[30%] rounded-lg bg-card">
            {/* Content for the first element */}
          </div>
          <div className="ml-2 h-32 flex-1 rounded-lg bg-card">
            {/* Content for the second element */}
          </div>
        </div>
      </div>
      <div className="relative w-full lg:w-[25%]">
        <div className="absolute inset-0 m-2 mt-4 rounded-lg bg-purple-500 lg:m-0 lg:rounded-l-xl lg:rounded-r-none">
          {/* Content for the right side div goes here */}
        </div>
      </div>
    </main>
  );
}
