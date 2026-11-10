export default function ChocolateMeltDivider() {
  return (
    <div className="w-full relative overflow-hidden leading-none z-20 pointer-events-none -my-1">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-12 sm:h-16 text-[#FCE8EC]/50"
      >
        <path
          d="M0,0 C150,90 350,-40 500,45 C650,130 900,-20 1200,60 L1200,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

