/** Shared edge-refraction filter used by shape-neutral liquid-glass surfaces. */
export function LiquidGlassFilter() {
  return (
    <svg aria-hidden="true" focusable="false" className="fixed h-0 w-0 pointer-events-none">
      <defs>
        <filter id="site-liquid-glass-edge" x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.035" numOctaves="1" seed="11" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G" result="bent" />
          <feMorphology in="SourceAlpha" operator="erode" radius="6" result="inner" />
          <feComposite in="SourceAlpha" in2="inner" operator="out" result="edge" />
          <feComposite in="bent" in2="edge" operator="in" result="bentEdge" />
          <feComposite in="SourceGraphic" in2="inner" operator="in" result="clearCenter" />
          <feMerge><feMergeNode in="clearCenter" /><feMergeNode in="bentEdge" /></feMerge>
        </filter>
      </defs>
    </svg>
  );
}
