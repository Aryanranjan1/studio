import { HeroSvg } from '@/components/hero-svg';

export default function Home() {
  return (
    // Base: Mobile and Tablet layout (flex-col)
    // Large screens (lg) and up: Horizontal layout (flex-row)
    <main className="flex flex-col bg-background p-0 lg:h-screen lg:flex-row">
      
      {/* --- Left Column (Contains SVG group and Mid group) --- */}
      {/* Base: Full width. Desktop: 75% width */}
      <div className="flex w-full flex-col lg:w-[75%]">
        
        {/* --- SVG Container (SVG Group)--- */}
        {/* Mobile/Tablet: Pushed up by 75px. Margin bottom 16px */}
        {/* Desktop: Pushed up by 120px. Margin bottom 8px */}
        <div className="mb-4 lg:mb-2">
          <div className="lg:-mt-[100px]">
            <HeroSvg />
          </div>
        </div>

        {/* --- Mid Section --- */}
        {/* Base (Mobile/Tablet): Has a 15px left margin. */}
        <div
          id="mid-section"
          className="flex items-stretch pb-2 ml-[15px]"
        >
          <div className="h-32 w-[30%] rounded-lg bg-[#f8f9f9]">
            {/* Content for the first element */}
          </div>
          <div className="ml-2 h-32 flex-1 rounded-lg bg-[#f8f9f9]">
            {/* Content for the second element */}
          </div>
        </div>
      </div>

      {/* --- Right Column (Right div) --- */}
      {/* Base: Full width, specific height. */}
      {/* Desktop: 25% width, fills height. */}
      <div className="relative w-full h-48 lg:h-auto lg:w-[25%]">
        
        {/* --- Purple Box --- */}
        {/* Base (Mobile/Tablet): Inset with vertical margin and rounded corners. */}
        {/* Desktop: Margin removed, specific corner rounding applied. */}
        <div className="absolute inset-0 my-4 rounded-lg bg-purple-500 lg:my-0 lg:mx-0 lg:rounded-l-xl lg:rounded-r-none">
          {/* Content for the right side div goes here */}
        </div>
      </div>
    </main>
  );
}
