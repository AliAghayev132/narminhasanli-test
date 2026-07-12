/**
 * The decorative breathing-circle + rotating globe graphic behind the hero
 * headline. Purely ornamental (aria-hidden), ported 1:1 from the static
 * export's inline SVG.
 */
export const HeroGlobe = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[min(620px,92vw)] w-[min(620px,92vw)] -translate-x-1/2 -translate-y-1/2"
    >
      <div className="animate-nh-breathe absolute inset-0 rounded-full border border-gold/28" />
      <div
        className="animate-nh-breathe absolute inset-[11%] rounded-full border border-gold/22"
        style={{ animationDelay: '-2.3s' }}
      />
      <div
        className="animate-nh-breathe absolute inset-[23%] rounded-full border border-[rgba(216,170,210,.18)]"
        style={{ animationDelay: '-4.6s' }}
      />
      <svg
        viewBox="0 0 400 400"
        className="animate-nh-float-up absolute inset-[6%] h-[88%] w-[88%] opacity-90"
      >
        <defs>
          <radialGradient id="nhGlobeL" cx="38%" cy="34%" r="75%">
            <stop offset="0%" stopColor="rgba(216,170,210,.24)" />
            <stop offset="55%" stopColor="rgba(160,120,56,.06)" />
            <stop offset="100%" stopColor="rgba(160,120,56,0)" />
          </radialGradient>
          <radialGradient id="nhShadeL" cx="70%" cy="74%" r="82%">
            <stop offset="0%" stopColor="rgba(108,78,42,.22)" />
            <stop offset="55%" stopColor="rgba(108,78,42,.05)" />
            <stop offset="100%" stopColor="rgba(108,78,42,0)" />
          </radialGradient>
          <radialGradient id="nhAtmL" cx="50%" cy="50%" r="50%">
            <stop offset="80%" stopColor="rgba(216,170,210,0)" />
            <stop offset="94%" stopColor="rgba(216,170,210,.18)" />
            <stop offset="100%" stopColor="rgba(216,170,210,0)" />
          </radialGradient>
          <clipPath id="nhClipL">
            <circle cx="200" cy="200" r="185" />
          </clipPath>
        </defs>
        <g transform="rotate(-12 200 200)">
          <circle cx="200" cy="200" r="186" fill="url(#nhGlobeL)" stroke="rgba(160,120,56,.45)" strokeWidth="1.2" />
          <circle cx="200" cy="200" r="186" fill="url(#nhShadeL)" />
          <circle cx="200" cy="200" r="198" fill="url(#nhAtmL)" />
          <ellipse cx="200" cy="200" rx="186" ry="27" fill="none" stroke="rgba(160,120,56,.30)" strokeWidth="1" />
          <ellipse cx="200" cy="138" rx="175" ry="24" fill="none" stroke="rgba(160,120,56,.22)" strokeWidth="1" />
          <ellipse cx="200" cy="262" rx="175" ry="24" fill="none" stroke="rgba(160,120,56,.22)" strokeWidth="1" />
          <ellipse cx="200" cy="80" rx="142" ry="19" fill="none" stroke="rgba(160,120,56,.18)" strokeWidth="1" />
          <ellipse cx="200" cy="320" rx="142" ry="19" fill="none" stroke="rgba(160,120,56,.18)" strokeWidth="1" />
          <ellipse cx="200" cy="40" rx="95" ry="13" fill="none" stroke="rgba(216,170,210,.22)" strokeWidth="1" />
          <ellipse cx="200" cy="360" rx="95" ry="13" fill="none" stroke="rgba(216,170,210,.22)" strokeWidth="1" />
          <ellipse cx="200" cy="200" ry="186" rx="0" fill="none" stroke="rgba(160,120,56,.32)" strokeWidth="1">
            <animate attributeName="rx" values="0;186;0" keyTimes="0;0.5;1" dur="11s" begin="0s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="200" cy="200" ry="186" rx="0" fill="none" stroke="rgba(160,120,56,.24)" strokeWidth="1">
            <animate attributeName="rx" values="0;186;0" keyTimes="0;0.5;1" dur="11s" begin="-2.2s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="200" cy="200" ry="186" rx="0" fill="none" stroke="rgba(216,170,210,.28)" strokeWidth="1">
            <animate attributeName="rx" values="0;186;0" keyTimes="0;0.5;1" dur="11s" begin="-4.4s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="200" cy="200" ry="186" rx="0" fill="none" stroke="rgba(160,120,56,.24)" strokeWidth="1">
            <animate attributeName="rx" values="0;186;0" keyTimes="0;0.5;1" dur="11s" begin="-6.6s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="200" cy="200" ry="186" rx="0" fill="none" stroke="rgba(160,120,56,.20)" strokeWidth="1">
            <animate attributeName="rx" values="0;186;0" keyTimes="0;0.5;1" dur="11s" begin="-8.8s" repeatCount="indefinite" />
          </ellipse>
          <circle cx="200" cy="14" r="2.6" fill="rgba(160,120,56,.7)" />
          <circle cx="200" cy="386" r="2.6" fill="rgba(160,120,56,.7)" />
        </g>
        <g className="animate-nh-spin" style={{ transformOrigin: '200px 200px' }}>
          <circle cx="200" cy="8" r="3" fill="rgba(160,120,56,.85)" />
        </g>
      </svg>
    </div>
  )
}
