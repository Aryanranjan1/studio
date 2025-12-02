import { HeroSvg } from '@/components/hero-svg';

export default function Home() {
  return (
    // Base: Mobile layout (flex-col)
    // Medium screens (md) and up: Horizontal layout (flex-row)
    <main className="flex flex-col bg-background p-0 md:h-screen lg:flex-row">
      
      {/* --- Left Column --- */}
      {/* Base: Full width. Tablet/Desktop: 75% width */}
      <div className="flex w-full flex-col lg:w-[75%]">
        
        {/* --- SVG Container --- */}
        {/* Mobile/Tablet: Pushed up by 75px. Margin bottom 16px */}
        {/* Desktop: Pushed up by 100px. Margin bottom 8px */}
        <div className="flex-1 -mt-[75px] mb-4 lg:-mt-[100px] lg:mb-2">
          <HeroSvg />
        </div>

        {/* --- Mid Section --- */}
        {/* Base (Mobile/Tablet): Has a 15px left margin. */}
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

      {/* --- Right Column --- */}
      {/* Base: Full width, specific height. */}
      {/* Tablet/Desktop: 25% width, fills height. */}
      <div className="relative w-full h-48 md:h-auto lg:w-[25%]">
        
        {/* --- Purple Box --- */}
        {/* Base (Mobile): Inset with margin and rounded corners. */}
        {/* Tablet: Same inset and rounding. */}
        {/* Desktop: Margin removed, specific corner rounding applied. */}
        <div className="absolute inset-0 m-2 mt-4 rounded-lg bg-purple-500 md:my-2 md:mx-0 lg:m-0 lg:mt-0 lg:rounded-l-xl lg:rounded-r-none">
          {/* Content for the right side div goes here */}
        </div>
      </div>
    </main>
  );
}
