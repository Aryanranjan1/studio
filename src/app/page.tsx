
import { HeroSvg } from "@/components/hero-svg";

export default function Home() {
  return (
    <main className="relative flex h-[calc(100vh-3.5rem)] w-full flex-col items-start justify-start bg-background p-0 overflow-hidden">
      <div className="absolute left-0 top-0 w-full lg:w-[70%] lg:h-[75vh] lg:-mt-[10vh]">
        <HeroSvg />
      </div>
      <div className="absolute right-0 top-0 h-full w-[30%] bg-purple-500 rounded-l-xl"></div>
    </main>
  );
}
