import { useId } from 'react';

/**
 * Hero illustration: "The suite at the velvet hour".
 * A tall arched sash window overlooking the Forsyth Park fountain and moss-draped live oaks,
 * with sheer drapery, the large Hour Dial (60-min gilt arc) glowing in the arch like a low sun
 * or moon, a stool with folded waffle robe & trailing velvet ribbon, three basalt stones,
 * a copper bowl with rising steam, eucalyptus in a bud vase, and a champagne coupe.
 */
export function HeroScene({ className = '' }: { className?: string }) {
  const uid = useId().replace(/:/g, '');

  // Generate 60 radial ticks for the large hanging Hour Dial centered at (300, 178)
  const dialCx = 300;
  const dialCy = 178;
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const angle = ((i * 6 - 90) * Math.PI) / 180;
    const cardinal = i % 15 === 0;
    const major = i % 5 === 0;
    const rOut = 88;
    const rIn = cardinal ? 78 : major ? 81.5 : 84.5;
    return (
      <line
        key={i}
        x1={(dialCx + rOut * Math.cos(angle)).toFixed(2)}
        y1={(dialCy + rOut * Math.sin(angle)).toFixed(2)}
        x2={(dialCx + rIn * Math.cos(angle)).toFixed(2)}
        y2={(dialCy + rIn * Math.sin(angle)).toFixed(2)}
        stroke="var(--champagne)"
        strokeOpacity={cardinal ? 0.95 : major ? 0.65 : 0.35}
        strokeWidth={cardinal ? 1.6 : major ? 1.1 : 0.7}
        strokeLinecap="round"
      />
    );
  });

  return (
    <svg
      viewBox="0 0 600 720"
      className={`block h-full w-full ${className}`}
      role="img"
      aria-label="Illustrated arched townhouse window overlooking Forsyth Park fountain and live oaks, with a gilt Hour Dial, folded waffle robe draped with a velvet ribbon, basalt stones, steaming copper bowl, eucalyptus in a bud vase, and a champagne coupe"
      data-hour-dial="true"
      data-minutes="60"
    >
      <defs>
        <clipPath id={`arch-clip-${uid}`}>
          <path d="M 38 720 L 38 258 A 262 250 0 0 1 562 258 L 562 720 Z" />
        </clipPath>
        <linearGradient id={`sky-grad-${uid}`} x1="300" y1="20" x2="300" y2="520" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--surface-soft)" />
          <stop offset="52%" stopColor="var(--surface)" />
          <stop offset="100%" stopColor="var(--bg)" />
        </linearGradient>
        <radialGradient id={`dial-halo-${uid}`} cx="50%" cy="48%" r="50%">
          <stop offset="0%" stopColor="var(--champagne-light)" stopOpacity="0.6" />
          <stop offset="58%" stopColor="var(--champagne)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--champagne)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`gilt-arc-${uid}`} x1="210" y1="88" x2="390" y2="268" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--champagne-light)" />
          <stop offset="100%" stopColor="var(--champagne-deep)" />
        </linearGradient>
        <linearGradient id={`curtain-left-${uid}`} x1="38" y1="0" x2="188" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--surface)" stopOpacity="0.94" />
          <stop offset="72%" stopColor="var(--surface)" stopOpacity="0.62" />
          <stop offset="100%" stopColor="var(--surface)" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id={`curtain-right-${uid}`} x1="562" y1="0" x2="412" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--surface)" stopOpacity="0.94" />
          <stop offset="72%" stopColor="var(--surface)" stopOpacity="0.62" />
          <stop offset="100%" stopColor="var(--surface)" stopOpacity="0.06" />
        </linearGradient>
        <pattern id={`linen-grain-${uid}`} width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 6h12M6 0v12" stroke="var(--text)" strokeOpacity="0.045" strokeWidth="0.6" />
        </pattern>
      </defs>

      {/* Outer arched wall surround */}
      <path
        d="M 24 720 L 24 256 A 276 262 0 0 1 576 256 L 576 720"
        fill="none"
        stroke="var(--champagne)"
        strokeOpacity="0.48"
        strokeWidth="1.2"
      />

      {/* Clipped interior of the tall arched townhouse window */}
      <g clipPath={`url(#arch-clip-${uid})`}>
        {/* Warm sky / twilight evening atmosphere */}
        <rect x="38" y="0" width="524" height="720" fill={`url(#sky-grad-${uid})`} />
        <rect x="38" y="0" width="524" height="720" fill={`url(#linen-grain-${uid})`} />

        {/* Soft luminous halo behind the Hour Dial */}
        <circle cx={dialCx} cy={dialCy} r="230" fill={`url(#dial-halo-${uid})`} />

        {/* Distant Forsyth Park live oaks & hanging Spanish moss */}
        <g className="spa-drift-delayed" opacity="0.9">
          {/* Left live oak canopy */}
          <path
            d="M 30 390 C 56 324, 118 296, 178 312 C 216 322, 236 350, 232 396 L 30 396 Z"
            fill="var(--taupe)"
            fillOpacity="0.22"
          />
          {/* Right live oak canopy */}
          <path
            d="M 570 392 C 538 318, 476 292, 414 314 C 380 326, 362 354, 368 396 L 570 396 Z"
            fill="var(--taupe)"
            fillOpacity="0.22"
          />
          {/* Spanish moss strands */}
          <g fill="none" stroke="var(--taupe)" strokeOpacity="0.48" strokeWidth="1.15" strokeLinecap="round">
            <path d="M 106 322 C 102 342, 108 358, 103 374" />
            <path d="M 124 316 C 128 336, 122 352, 126 368" />
            <path d="M 152 320 C 148 340, 154 352, 150 366" />
            <path d="M 454 318 C 450 338, 456 352, 452 368" />
            <path d="M 480 320 C 484 342, 478 358, 482 376" />
            <path d="M 502 328 C 498 346, 504 360, 500 374" />
          </g>
        </g>

        {/* Forsyth Park fountain silhouette in the middle distance */}
        <g transform="translate(300, 355)" fill="var(--taupe)" fillOpacity="0.28" stroke="var(--taupe)" strokeOpacity="0.62" strokeWidth="1.15">
          {/* Water plumes */}
          <path d="M 0 -58 C -10 -78, -28 -74, -32 -52" fill="none" stroke="var(--champagne)" strokeOpacity="0.65" />
          <path d="M 0 -58 C 10 -78, 28 -74, 32 -52" fill="none" stroke="var(--champagne)" strokeOpacity="0.65" />
          <line x1="0" y1="-58" x2="0" y2="-82" stroke="var(--champagne)" strokeOpacity="0.7" />
          {/* Top finial & upper basin */}
          <path d="M -22 -48 Q 0 -38 22 -48 L 16 -42 Q 0 -34 -16 -42 Z" />
          <rect x="-4" y="-42" width="8" height="24" rx="2" />
          {/* Middle tiered bowl */}
          <path d="M -46 -18 Q 0 -2 46 -18 L 36 -8 Q 0 4 -36 -8 Z" />
          <rect x="-8" y="-8" width="16" height="30" rx="2" />
          {/* Wide lower basin */}
          <path d="M -78 22 L 78 22 L 68 38 L -68 38 Z" />
          {/* Park lawn horizon */}
          <line x1="-260" y1="38" x2="260" y2="38" stroke="var(--champagne)" strokeOpacity="0.35" strokeWidth="1" />
        </g>

        {/* Tall sash window mullions */}
        <g stroke="var(--taupe)" strokeOpacity="0.36" strokeWidth="1.35">
          <line x1="300" y1="8" x2="300" y2="478" />
          <line x1="176" y1="54" x2="176" y2="478" />
          <line x1="424" y1="54" x2="424" y2="478" />
          <line x1="38" y1="264" x2="562" y2="264" />
          <line x1="38" y1="394" x2="562" y2="394" />
        </g>

        {/* Hanging Hour Dial suspended inside the arch like a low sun / moon */}
        <g>
          {/* Gilt brass chain from top of arch */}
          <line x1={dialCx} y1="8" x2={dialCx} y2="86" stroke="var(--champagne)" strokeOpacity="0.72" strokeWidth="1.25" />
          <circle cx={dialCx} cy="86" r="3" fill="var(--champagne)" />
          {/* Dial plate */}
          <circle cx={dialCx} cy={dialCy} r="94" fill="var(--surface)" fillOpacity="0.76" stroke="var(--champagne)" strokeWidth="1.25" />
          <circle cx={dialCx} cy={dialCy} r="75" fill="none" stroke="var(--champagne)" strokeOpacity="0.28" strokeWidth="0.9" />
          <circle cx={dialCx} cy={dialCy} r="62" fill="none" stroke="var(--taupe)" strokeOpacity="0.26" strokeWidth="0.8" strokeDasharray="2 3" />
          {/* 60 ticks */}
          <g>{ticks}</g>
          {/* Full 60-minute champagne gilt arc sweeping clockwise from 12 o'clock */}
          <circle
            cx={dialCx}
            cy={dialCy}
            r="75"
            fill="none"
            stroke={`url(#gilt-arc-${uid})`}
            strokeWidth="4.8"
            strokeLinecap="round"
            transform={`rotate(-90 ${dialCx} ${dialCy})`}
            className="spa-arc-draw"
            style={{ '--arc-len': '476' } as React.CSSProperties}
          />
          <circle cx={dialCx} cy={dialCy - 75} r="3.2" fill="var(--champagne-light)" stroke="var(--champagne-deep)" strokeWidth="0.9" />
          {/* Delicate cardinal numerals */}
          <g fill="var(--muted)" fontFamily="var(--font-display)" fontSize="12" textAnchor="middle">
            <text x={dialCx} y={dialCy - 45}>XII</text>
            <text x={dialCx + 50} y={dialCy + 4}>III</text>
            <text x={dialCx} y={dialCy + 54}>VI</text>
            <text x={dialCx - 50} y={dialCy + 4}>IX</text>
          </g>
          {/* Quiet center mark */}
          <text x={dialCx} y={dialCy + 6} textAnchor="middle" fill="var(--text)" fontFamily="var(--font-display)" fontSize="20" letterSpacing="1.5">
            60
          </text>
          <text x={dialCx} y={dialCy + 20} textAnchor="middle" fill="var(--muted)" fontFamily="var(--font-sans)" fontSize="7.5" letterSpacing="2.4">
            MINUTES
          </text>
        </g>

        {/* Sheer billowing linen drapery flanking the arched window */}
        <g className="spa-drift">
          <path
            d="M 38 60 C 138 78, 178 168, 152 292 C 132 384, 154 440, 128 500 L 38 500 Z"
            fill={`url(#curtain-left-${uid})`}
            stroke="var(--champagne)"
            strokeOpacity="0.34"
            strokeWidth="1"
          />
          <path
            d="M 68 82 C 118 148, 128 242, 108 342 C 96 400, 104 446, 86 496"
            fill="none"
            stroke="var(--taupe)"
            strokeOpacity="0.28"
            strokeWidth="1"
          />
          <path
            d="M 562 60 C 462 78, 422 168, 448 292 C 468 384, 446 440, 472 500 L 562 500 Z"
            fill={`url(#curtain-right-${uid})`}
            stroke="var(--champagne)"
            strokeOpacity="0.34"
            strokeWidth="1"
          />
          <path
            d="M 532 82 C 482 148, 472 242, 492 342 C 504 400, 496 446, 514 496"
            fill="none"
            stroke="var(--taupe)"
            strokeOpacity="0.28"
            strokeWidth="1"
          />
        </g>

        {/* Interior sill & townhouse floor plane */}
        <rect x="38" y="476" width="524" height="244" fill="var(--bg)" />
        <rect x="38" y="476" width="524" height="14" fill="var(--surface-soft)" stroke="var(--champagne)" strokeOpacity="0.45" strokeWidth="1" />
        <line x1="38" y1="646" x2="562" y2="646" stroke="var(--line)" strokeWidth="1" />

        {/* === FOREGROUND STILL LIFE === */}

        {/* 1. Turned wooden stool (left-center) with folded waffle robe & trailing velvet ribbon */}
        <g transform="translate(106, 514)">
          {/* Stool legs */}
          <path d="M 28 74 L 18 168 M 142 74 L 152 168 M 52 74 L 46 154 M 118 74 L 124 154" stroke="var(--taupe)" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="25" y1="132" x2="145" y2="132" stroke="var(--taupe)" strokeOpacity="0.7" strokeWidth="1.5" />
          {/* Stool seat */}
          <rect x="14" y="64" width="142" height="12" rx="4" fill="var(--surface-soft)" stroke="var(--taupe)" strokeWidth="1.4" />
          {/* Folded waffle robe layers */}
          <rect x="26" y="42" width="118" height="22" rx="8" fill="var(--surface)" stroke="var(--taupe)" strokeWidth="1.35" />
          <rect x="32" y="20" width="106" height="24" rx="8" fill="var(--surface)" stroke="var(--taupe)" strokeWidth="1.35" />
          {/* Waffle texture stitching */}
          <path
            d="M 42 28 h86 M 42 36 h86 M 38 50 h94 M 38 57 h94"
            stroke="var(--taupe)"
            strokeOpacity="0.34"
            strokeWidth="0.9"
            strokeDasharray="4 4"
          />
          {/* Plum-velvet ribbon wrapping the robe and trailing gracefully to the floor */}
          <path
            d="M 76 19 L 76 66 C 76 92, 62 114, 72 138 C 82 162, 60 176, 40 184"
            fill="none"
            stroke="var(--velvet)"
            strokeWidth="7.5"
            strokeLinecap="round"
          />
          <path
            d="M 76 19 L 76 66 C 76 92, 62 114, 72 138 C 82 162, 60 176, 40 184"
            fill="none"
            stroke="var(--champagne)"
            strokeOpacity="0.65"
            strokeWidth="0.9"
          />
          {/* Soft ribbon knot atop robe */}
          <path
            d="M 76 20 C 60 4, 44 10, 52 21 C 59 27, 70 23, 76 20 C 92 4, 108 10, 100 21 C 93 27, 82 23, 76 20 Z"
            fill="var(--velvet)"
            stroke="var(--champagne)"
            strokeWidth="0.9"
          />
        </g>

        {/* 2. Stack of three smooth basalt stones (center floor/low plinth) */}
        <g transform="translate(306, 616)">
          <ellipse cx="0" cy="40" rx="44" ry="11" fill="var(--taupe)" fillOpacity="0.16" />
          <ellipse cx="0" cy="30" rx="35" ry="11.5" fill="var(--text)" fillOpacity="0.18" stroke="var(--text)" strokeOpacity="0.6" strokeWidth="1.35" />
          <ellipse cx="-2" cy="14" rx="25" ry="9.2" fill="var(--text)" fillOpacity="0.24" stroke="var(--text)" strokeOpacity="0.6" strokeWidth="1.35" />
          <ellipse cx="1" cy="0" rx="15" ry="6.8" fill="var(--velvet)" fillOpacity="0.32" stroke="var(--champagne)" strokeWidth="1.3" />
          {/* Gentle specular highlights on stones */}
          <path d="M -18 26 Q -4 23 12 26" fill="none" stroke="var(--champagne)" strokeOpacity="0.55" strokeWidth="1" strokeLinecap="round" />
          <path d="M -11 11 Q 0 9 9 11" fill="none" stroke="var(--champagne)" strokeOpacity="0.55" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* 3. Hammered copper bowl with rising steam curls (on sill, center-right) */}
        <g transform="translate(356, 448)">
          {/* Rising steam curls */}
          <path
            className="spa-steam"
            d="M -12 -6 C -18 -20, -4 -30, -10 -44 C -13 -51, -8 -58, -5 -62"
            fill="none"
            stroke="var(--champagne)"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
          <path
            className="spa-steam-2"
            d="M 4 -8 C -4 -24, 12 -36, 4 -54 C 1 -62, 6 -70, 9 -74"
            fill="none"
            stroke="var(--champagne)"
            strokeWidth="1.45"
            strokeLinecap="round"
          />
          <path
            className="spa-steam-3"
            d="M 20 -6 C 14 -18, 26 -28, 20 -42"
            fill="none"
            stroke="var(--champagne)"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          {/* Copper bowl body */}
          <path
            d="M -38 2 L 38 2 C 35 24, 20 36, 0 36 C -20 36, -35 24, -38 2 Z"
            fill="var(--champagne)"
            fillOpacity="0.28"
            stroke="var(--champagne)"
            strokeWidth="1.45"
          />
          <ellipse cx="0" cy="2" rx="38" ry="6" fill="var(--surface)" stroke="var(--champagne)" strokeWidth="1.3" />
          <path d="M -18 36 L 18 36" stroke="var(--champagne)" strokeWidth="1.6" strokeLinecap="round" />
        </g>

        {/* 4. Slender bud vase with eucalyptus sprig (right side on sill) */}
        <g transform="translate(454, 412)">
          {/* Eucalyptus stems & leaves */}
          <path d="M 0 28 C -8 6, -14 -20, -24 -48" fill="none" stroke="var(--champagne)" strokeWidth="1.25" strokeLinecap="round" />
          <path d="M 2 28 C 12 4, 20 -18, 30 -40" fill="none" stroke="var(--champagne)" strokeWidth="1.2" strokeLinecap="round" />
          <ellipse cx="-16" cy="-6" rx="9" ry="5.5" transform="rotate(-32 -16 -6)" fill="var(--taupe)" fillOpacity="0.34" stroke="var(--champagne)" strokeWidth="1.1" />
          <ellipse cx="-24" cy="-24" rx="8.5" ry="5" transform="rotate(-24 -24 -24)" fill="var(--taupe)" fillOpacity="0.28" stroke="var(--champagne)" strokeWidth="1.1" />
          <ellipse cx="-12" cy="-38" rx="7.5" ry="4.6" transform="rotate(18 -12 -38)" fill="var(--taupe)" fillOpacity="0.24" stroke="var(--champagne)" strokeWidth="1.1" />
          <ellipse cx="16" cy="-4" rx="8.5" ry="5" transform="rotate(26 16 -4)" fill="var(--taupe)" fillOpacity="0.3" stroke="var(--champagne)" strokeWidth="1.1" />
          <ellipse cx="26" cy="-22" rx="7.5" ry="4.6" transform="rotate(34 26 -22)" fill="var(--taupe)" fillOpacity="0.24" stroke="var(--champagne)" strokeWidth="1.1" />
          {/* Slender ceramic bud vase */}
          <path
            d="M -6 24 L 6 24 L 8 44 C 16 52, 16 66, 8 72 L -8 72 C -16 66, -16 52, -8 44 Z"
            fill="var(--surface)"
            stroke="var(--taupe)"
            strokeWidth="1.35"
          />
          <line x1="-10" y1="56" x2="10" y2="56" stroke="var(--champagne)" strokeOpacity="0.6" strokeWidth="1" />
        </g>

        {/* 5. Crystal champagne coupe (foreground right plinth) */}
        <g transform="translate(466, 558)">
          {/* Side table top */}
          <line x1="-54" y1="78" x2="66" y2="78" stroke="var(--champagne)" strokeOpacity="0.6" strokeWidth="1.35" />
          <line x1="4" y1="78" x2="4" y2="162" stroke="var(--taupe)" strokeWidth="1.5" />
          {/* Coupe bowl */}
          <path
            d="M -26 6 L 26 6 C 24 24, 14 34, 0 34 C -14 34, -24 24, -26 6 Z"
            fill="var(--surface)"
            fillOpacity="0.72"
            stroke="var(--champagne)"
            strokeWidth="1.35"
          />
          {/* Golden champagne level inside coupe */}
          <path
            d="M -21 15 L 21 15 C 18 27, 10 33, 0 33 C -10 33, -18 27, -21 15 Z"
            fill="var(--champagne)"
            fillOpacity="0.32"
          />
          {/* Fine effervescent bubbles */}
          <circle cx="-4" cy="23" r="1.2" fill="var(--champagne-light)" />
          <circle cx="5" cy="19" r="1" fill="var(--champagne-light)" />
          <circle cx="1" cy="10" r="1" fill="var(--champagne)" />
          {/* Slender stem & foot */}
          <line x1="0" y1="34" x2="0" y2="74" stroke="var(--champagne)" strokeWidth="1.35" />
          <ellipse cx="0" cy="75" rx="16" ry="3.2" fill="none" stroke="var(--champagne)" strokeWidth="1.3" />
        </g>
      </g>

      {/* Main gilt arched window border */}
      <path
        d="M 38 720 L 38 258 A 262 250 0 0 1 562 258 L 562 720"
        fill="none"
        stroke="var(--champagne)"
        strokeWidth="1.6"
      />
    </svg>
  );
}
