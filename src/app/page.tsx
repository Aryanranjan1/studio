import { HeroSvg } from '@/components/hero-svg';

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-row items-stretch justify-start bg-background p-0 overflow-hidden">
      <div className="flex h-full w-[75%] flex-col">
        <div className="flex-1 overflow-hidden">
          <HeroSvg />
        </div>

        {/* Mid Section */}
        <div
          id="mid-section"
          className="flex items-stretch pr-2 pb-2 mt-2"
        >
          <div className="h-32 w-[30%] rounded-lg bg-card">
            {/* Content for the first element */}
          </div>
          <div className="ml-2 h-32 flex-1 rounded-lg bg-card">
            {/* Content for the second element */}
          </div>
        </div>
      </div>
      <div className="w-[25%] rounded-l-xl bg-purple-500">
        {/* Content for the right side div goes here */}
      </div>
    </main>
  );
}
