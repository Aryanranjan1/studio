import { HeroSvg } from "@/components/hero-svg";

export default function Home() {
  return (
    <main className="relative flex h-[calc(100vh-3.5rem)] w-full flex-row items-start justify-start bg-background p-0 overflow-hidden">
      <div className="h-full w-[75%] flex flex-col">
        <div style={{ marginTop: '-120px' }}>
          <HeroSvg />
        </div>

        {/* Mid Section */}
        <div id="mid-section" className="flex-grow flex items-stretch p-4 h-64">
            <div className="w-[30%] bg-card rounded-lg">
                {/* Content for the first element */}
            </div>
            <div className="flex-1 ml-2 bg-card rounded-lg">
                {/* Content for the second element */}
            </div>
        </div>

      </div>
      <div className="h-full w-[25%] bg-purple-500 rounded-l-xl">
        {/* Content for the right side div goes here */}
      </div>
    </main>
  );
}
