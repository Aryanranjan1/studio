export function HeroSvg() {
  return (
    <svg
      className="h-full w-full animate-spin [animation-duration:10s]"
      viewBox="0 0 100 100"
    >
      <defs>
        <path
          id="circle"
          d="
            M 50, 50
            m -37, 0
            a 37,37 0 1,1 74,0
            a 37,37 0 1,1 -74,0"
        />
      </defs>
      <text fill="white" fontSize="8" className="uppercase tracking-wider">
        <textPath xlinkHref="#circle">
          explore more about us by clicking here
        </textPath>
      </text>
    </svg>
  );
}
