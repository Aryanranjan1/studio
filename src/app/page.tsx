import { HeroSvg } from '@/components/hero-svg';

export default function Home() {
  return (
    // Base: Mobile layout (flex-col)
    // Large screens (lg): Desktop layout (flex-row, full height)
    <main className="flex flex-col bg-background p-0 lg:h-screen lg:flex-row">
      
      {/* --- Left Column (75% on Desktop) --- */}
      <div className="flex w-full flex-col lg:w-[75%]">
        
        {/* 
          SVG Container
          - Base (Mobile): No negative margin.
          - Medium screens (md): Pushed up by 100px for tablets.
          - Large screens (lg): Pushed up by 100px for desktop.
        */}
        <div className="flex-1 mb-2 md:-mt-[100px] lg:-mt-[100px]">
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

      {/* --- Right Column (25% on Desktop) --- */}
      {/* 
        - Base (Mobile/Tablet): Full width, margin on top.
        - Large screens (lg): Takes 25% width, no top margin, fills height.
      */}
      <div className="relative w-full lg:w-[25%]">
        {/* 
          Purple Box
          - Base (Mobile/Tablet): Inset with margin.
          - Large screens (lg): Margin removed, specific corner rounding applied.
        */}
        <div className="absolute inset-0 m-2 mt-4 rounded-lg bg-purple-500 lg:m-0 lg:mt-0 lg:rounded-l-xl lg:rounded-r-none">
          {/* Content for the right side div goes here */}
        </div>
      </div>
    </main>
  );
}
