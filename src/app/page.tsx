import { HeroSvg } from '@/components/hero-svg';

export default function Home() {
  return (
    // Base: Mobile layout (flex-col)
    // Medium screens (md) and up: Horizontal layout (flex-row)
    <main className="flex flex-col bg-background p-0 md:h-screen md:flex-row">
      
      {/* --- Left Column (Full width on mobile, 75% on desktop) --- */}
      <div className="flex w-full flex-col md:w-[75%]">
        
        {/* 
          SVG Container
          - Base (Mobile): Pushed up by 75px.
          - Large screens (lg): Margin is reset to 0 for desktop.
        */}
        <div className="flex-1 -mt-[75px] lg:mt-0">
          <HeroSvg />
        </div>

        {/* 
          Mid Section
          - Base (Mobile/Tablet): Has a 15px left margin.
        */}
        <div
          id="mid-section"
          className="flex items-stretch pb-2 ml-[15px]"
        >
          <div className="h-32 w-[30%] rounded-lg bg-card">
            {/* Content for the first element */}
          </div>
          <div className="ml-2 h-32 flex-1 rounded-lg bg-card">
            {/* Content for the second element */}
          </div>
        </div>
      </div>

      {/* --- Right Column (Full width on mobile, 25% on desktop) --- */}
      {/* 
        - Base (Mobile): Full width, margin on top.
        - Medium screens (md) and up: Takes 25% width, fills height.
      */}
      <div className="relative w-full h-48 md:h-auto md:w-[25%]">
        {/* 
          Purple Box
          - Base (Mobile): Inset with margin.
          - Medium screens (md): Inset with margin.
          - Large screens (lg): Margin removed, specific corner rounding applied.
        */}
        <div className="absolute inset-0 m-2 mt-4 rounded-lg bg-purple-500 md:m-2 lg:m-0 lg:mt-0 lg:rounded-l-xl lg:rounded-r-none">
          {/* Content for the right side div goes here */}
        </div>
      </div>
    </main>
  );
}
