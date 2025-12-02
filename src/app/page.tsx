import { HeroSvg } from "@/components/hero-svg";

export default function Home() {
  return (
    <main className="relative flex h-screen w-full flex-row items-stretch justify-start bg-background p-0 overflow-hidden">
      <div className="relative w-[75%]">
        <div style={{ transform: 'translateY(-16%)' }} className="h-full">
          <HeroSvg />
        </div>

        {/* Mid Section */}
        <div id="mid-section" className="absolute bottom-0 left-0 right-0 flex items-stretch mr-2 h-32 mb-4">
            <div className="w-[30%] bg-card rounded-lg">
                {/* Content for the first element */}
            </div>
            <div className="flex-1 ml-2 bg-card rounded-lg">
                {/* Content for the second element */}
            </div>
        </div>

      </div>
      <div className="w-[25%] bg-purple-500 rounded-l-xl">
        {/* Content for the right side div goes here */}
      </div>
    </main>
  );
}
