
import { HeroSvg } from "@/components/hero-svg";

export default function Home() {
  return (
    <main className="flex h-[calc(100vh-3.5rem)] w-full flex-row items-start justify-start bg-background p-0 overflow-hidden">
      <div className="h-full w-[75%] flex flex-col" style={{ marginTop: '-120px' }}>
        <HeroSvg />

        {/* Mid Section */}
        <div id="mid-section" className="flex-grow flex items-center p-4">
            <div className="w-[25%] aspect-square bg-card rounded-lg">
                {/* Content for the first element */}
            </div>
            <div className="flex-1 h-full ml-2 bg-card rounded-lg" style={{ maxHeight: 'calc(25vw)' }}>
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
