
import { HeroSvg } from "@/components/hero-svg";

export default function Home() {
  return (
    <main className="flex h-[calc(100vh-3.5rem)] w-full flex-row items-start justify-start bg-background p-0 overflow-hidden">
      <div className="h-full w-[70%]" style={{ marginTop: '-120px' }}>
        <HeroSvg />
      </div>
      <div className="h-full w-[30%] bg-purple-500 rounded-l-xl">
        {/* Content for the right side div goes here */}
      </div>
    </main>
  );
}
