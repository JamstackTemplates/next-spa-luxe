import { useId } from 'react';

/*
 * Art that makes the whole page read as one passing hour.
 *  - HourRings: the hall clock at architectural scale; concentric gilt rings, 60 ticks and
 *    Roman cardinals, an optional arc sweeping from twelve. Sits behind hero art and dials.
 *  - DuskHorizon: the hinge between afternoon and evening; the gilt dial sinks like a sun
 *    behind the Forsyth Park live oaks and fountain, and the sky deepens into velvet.
 *  - ScrollDial: a small fixed dial whose arc fills as the visitor scrolls (CSS only).
 * All three are decorative and hidden from assistive technology.
 */

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, minutes: number) {
  const sweep = Math.min(359.99, (minutes / 60) * 360);
  const a = polar(cx, cy, r, 0);
  const b = polar(cx, cy, r, sweep);
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}

export function HourRings({
  className = '',
  arcMinutes = 0,
  numerals = true,
  turning = false,
  arcWidth = 5,
}: {
  className?: string;
  /** Length of the gilt arc drawn on the outer track (0 = none). */
  arcMinutes?: number;
  numerals?: boolean;
  /** Very slow rotation of the tick ring (off under reduced motion). */
  turning?: boolean;
  arcWidth?: number;
}) {
  const uid = useId().replace(/:/g, '');
  const c = 500;
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const cardinal = i % 15 === 0;
    const major = i % 5 === 0;
    const p1 = polar(c, c, 492, i * 6);
    const p2 = polar(c, c, cardinal ? 446 : major ? 462 : 476, i * 6);
    return (
      <line
        key={i}
        x1={p1.x.toFixed(1)}
        y1={p1.y.toFixed(1)}
        x2={p2.x.toFixed(1)}
        y2={p2.y.toFixed(1)}
        stroke="var(--champagne)"
        strokeOpacity={cardinal ? 0.9 : major ? 0.6 : 0.34}
        strokeWidth={cardinal ? 2.4 : major ? 1.5 : 1}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
      />
    );
  });

  return (
    <svg
      viewBox="0 0 1000 1000"
      className={`hour-rings pointer-events-none select-none ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`rings-gilt-${uid}`} x1="120" y1="40" x2="880" y2="960" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--champagne-light)" />
          <stop offset="1" stopColor="var(--champagne-deep)" />
        </linearGradient>
      </defs>
      <g className={turning ? 'hour-rings-turn' : undefined}>
        <circle cx={c} cy={c} r="496" fill="none" stroke="var(--gilt-line)" vectorEffect="non-scaling-stroke" />
        {ticks}
      </g>
      <circle cx={c} cy={c} r="418" fill="none" stroke="var(--champagne)" strokeOpacity="0.32" strokeDasharray="2 7" vectorEffect="non-scaling-stroke" />
      <circle cx={c} cy={c} r="330" fill="none" stroke="var(--gilt-line)" strokeOpacity="0.7" vectorEffect="non-scaling-stroke" />
      <circle cx={c} cy={c} r="236" fill="none" stroke="var(--champagne)" strokeOpacity="0.2" vectorEffect="non-scaling-stroke" />
      {numerals ? (
        <g fill="var(--champagne)" fillOpacity="0.75" fontFamily="var(--font-display)" fontSize="34" textAnchor="middle">
          <text x={c} y="400" transform="translate(0 0)">XII</text>
          <text x="878" y={c + 12}>III</text>
          <text x={c} y="912">VI</text>
          <text x="122" y={c + 12}>IX</text>
        </g>
      ) : null}
      {arcMinutes > 0 ? (
        <path
          d={arcPath(c, c, 476, arcMinutes)}
          fill="none"
          stroke={`url(#rings-gilt-${uid})`}
          strokeWidth={arcWidth}
          strokeLinecap="round"
          className="spa-arc-draw"
          style={{ '--arc-len': `${Math.ceil((2 * Math.PI * 476 * arcMinutes) / 60)}` } as React.CSSProperties}
        />
      ) : null}
    </svg>
  );
}

/** Deterministic pseudo-random so server and client render identical trees. */
function seeded(seed: number) {
  let t = seed;
  return () => {
    t = (t * 9301 + 49297) % 233280;
    return t / 233280;
  };
}

/**
 * A Savannah live oak in silhouette: short trunk, limbs reaching out almost level,
 * a broad low canopy with a lacy edge, and Spanish moss hanging beneath.
 * (x, y) is the trunk foot on the horizon; w is the canopy spread, h its height.
 */
function LiveOak({ x, y, w, h, seed = 1 }: { x: number; y: number; w: number; h: number; seed?: number }) {
  const rand = seeded(seed);
  const fill = 'var(--dusk-tree)';
  const half = w / 2;
  const crownBase = y - h * 0.42;

  // Canopy: many small overlapping puffs along a flattened dome, for a lacy edge.
  const puffs: { cx: number; cy: number; r: number }[] = [];
  const count = Math.round(w / 9);
  for (let i = 0; i < count; i += 1) {
    const u = i / (count - 1); // 0..1 across the spread
    const dome = Math.sin(Math.PI * u) ** 0.6; // flat-topped dome
    const cx = x - half + u * w + (rand() - 0.5) * 10;
    const top = crownBase - h * 0.58 * dome;
    const depth = crownBase - top;
    // a column of puffs from the dome edge down to the crown base
    const layers = 2 + Math.round(dome * 3);
    for (let j = 0; j < layers; j += 1) {
      const v = j / Math.max(1, layers - 1);
      puffs.push({
        cx: cx + (rand() - 0.5) * 12,
        cy: top + v * depth + (rand() - 0.5) * 6,
        r: (j === 0 ? 7 : 10) + rand() * (6 + dome * 8),
      });
    }
  }

  // Limbs: thick, sweeping out almost level from a short trunk.
  const trunkTop = y - h * 0.3;
  const limbs = [
    `M ${x - 6} ${y} C ${x - 7} ${trunkTop + 10}, ${x - 30} ${trunkTop - 6}, ${x - half * 0.82} ${crownBase + 4}`,
    `M ${x + 6} ${y} C ${x + 8} ${trunkTop + 6}, ${x + 34} ${trunkTop - 10}, ${x + half * 0.86} ${crownBase + 2}`,
    `M ${x} ${trunkTop + 4} C ${x - 4} ${trunkTop - 20}, ${x - 16} ${crownBase - 8}, ${x - half * 0.3} ${crownBase - h * 0.2}`,
    `M ${x + 2} ${trunkTop} C ${x + 10} ${trunkTop - 24}, ${x + 24} ${crownBase - 10}, ${x + half * 0.4} ${crownBase - h * 0.18}`,
  ];

  // Spanish moss: fine strands of varying length hanging under the canopy.
  const moss = Array.from({ length: Math.round(w / 14) }, () => {
    const mx = x - half * 0.92 + rand() * w * 0.92;
    const edge = Math.abs(mx - x) / half;
    const my = crownBase + 2 - (1 - edge) * 4;
    const len = 10 + rand() * h * 0.38 * (1 - edge * 0.5);
    const sway = (rand() - 0.5) * 6;
    return `M ${mx.toFixed(1)} ${my.toFixed(1)} c ${sway} ${(len * 0.4).toFixed(1)}, ${-sway} ${(len * 0.7).toFixed(1)}, ${(sway * 0.4).toFixed(1)} ${len.toFixed(1)}`;
  });

  return (
    <g>
      <path d={`M ${x - 9} ${y} L ${x - 6} ${trunkTop} L ${x + 6} ${trunkTop} L ${x + 10} ${y} Z`} fill={fill} />
      <g fill="none" stroke={fill} strokeLinecap="round">
        {limbs.map((d, i) => (
          <path key={i} d={d} strokeWidth={i < 2 ? 7 : 5} />
        ))}
      </g>
      <g fill={fill}>
        {puffs.map((p, i) => (
          <circle key={i} cx={p.cx.toFixed(1)} cy={p.cy.toFixed(1)} r={p.r.toFixed(1)} />
        ))}
      </g>
      <g fill="none" stroke={fill} strokeWidth="1.3" strokeLinecap="round" opacity="0.8">
        {moss.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </g>
  );
}

export function DuskHorizon({ className = '' }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const horizon = 318;
  const sunX = 930;
  const sunR = 128;
  const sunTicks = Array.from({ length: 60 }, (_, i) => {
    const major = i % 5 === 0;
    const p1 = polar(sunX, horizon, sunR, i * 6);
    const p2 = polar(sunX, horizon, sunR - (major ? 12 : 6), i * 6);
    return (
      <line
        key={i}
        x1={p1.x.toFixed(1)}
        y1={p1.y.toFixed(1)}
        x2={p2.x.toFixed(1)}
        y2={p2.y.toFixed(1)}
        stroke="var(--champagne-deep)"
        strokeOpacity={major ? 0.85 : 0.45}
        strokeWidth={major ? 1.6 : 0.9}
      />
    );
  });

  return (
    <div className={`dusk-horizon relative overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 420"
        preserveAspectRatio="xMidYMax slice"
        className="block h-[clamp(15rem,34vw,30rem)] w-full"
        focusable="false"
      >
        <defs>
          <linearGradient id={`dusk-sky-${uid}`} x1="0" y1="0" x2="0" y2="420" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--dusk-a)" />
            <stop offset="0.42" stopColor="var(--dusk-b)" />
            <stop offset="0.74" stopColor="var(--dusk-c)" />
            <stop offset="1" stopColor="var(--dusk-d)" />
          </linearGradient>
          <radialGradient id={`dusk-glow-${uid}`} cx={sunX} cy={horizon} r="420" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--dusk-sun)" stopOpacity="0.75" />
            <stop offset="0.35" stopColor="var(--dusk-sun)" stopOpacity="0.22" />
            <stop offset="1" stopColor="var(--dusk-sun)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`dusk-gilt-${uid}`} x1={sunX - sunR} y1={horizon - sunR} x2={sunX + sunR} y2={horizon + sunR} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#F3DDA6" />
            <stop offset="1" stopColor="#B89855" />
          </linearGradient>
          <clipPath id={`dusk-above-${uid}`}>
            <rect x="0" y="0" width="1440" height={horizon} />
          </clipPath>
        </defs>

        <rect width="1440" height="420" fill={`url(#dusk-sky-${uid})`} />
        <rect width="1440" height={horizon + 40} fill={`url(#dusk-glow-${uid})`} />

        {/* The gilt dial setting like a sun; sinks further with scroll where supported */}
        <g clipPath={`url(#dusk-above-${uid})`}>
          <g className="dusk-sun">
            <circle cx={sunX} cy={horizon} r={sunR + 34} fill="none" stroke="#F3DDA6" strokeOpacity="0.35" strokeDasharray="2 6" />
            <circle cx={sunX} cy={horizon} r={sunR} fill="#F1DCA8" fillOpacity="0.55" stroke={`url(#dusk-gilt-${uid})`} strokeWidth="2" />
            {sunTicks}
            <path
              d={arcPath(sunX, horizon, sunR - 24, 45)}
              fill="none"
              stroke={`url(#dusk-gilt-${uid})`}
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* Forsyth Park: live oaks either side of the fountain */}
        <g opacity="0.97">
          <LiveOak x={150} y={horizon} w={420} h={170} seed={3} />
          <LiveOak x={420} y={horizon} w={260} h={112} seed={7} />
          <LiveOak x={1290} y={horizon} w={460} h={188} seed={11} />
          <LiveOak x={1100} y={horizon} w={200} h={88} seed={17} />
        </g>

        {/* The fountain, in silhouette, with gilt jets */}
        <g transform="translate(650 0)">
          <path d="M -70 318 L -58 300 L 58 300 L 70 318 Z" fill="var(--dusk-tree)" />
          <path d="M -8 300 L -6 262 L -40 254 L 40 254 L 6 262 L 8 300 Z" fill="var(--dusk-tree)" />
          <path d="M -4 254 L -3 222 L -20 218 L 20 218 L 3 222 L 4 254 Z" fill="var(--dusk-tree)" />
          <path d="M 0 218 L 0 196" stroke="var(--dusk-tree)" strokeWidth="4" strokeLinecap="round" />
          <circle cx="0" cy="192" r="5" fill="var(--dusk-tree)" />
          <g fill="none" stroke="#F1DCA8" strokeOpacity="0.7" strokeWidth="1.1" strokeLinecap="round">
            <path d="M 0 190 C -10 172, -28 176, -36 214" />
            <path d="M 0 190 C 10 172, 28 176, 36 214" />
            <path d="M -16 220 C -30 222, -40 236, -44 252" />
            <path d="M 16 220 C 30 222, 40 236, 44 252" />
          </g>
        </g>

        {/* Horizon: the unrolled dial */}
        <rect x="0" y={horizon} width="1440" height={420 - horizon} fill="var(--dusk-d)" />
        <line x1="0" y1={horizon + 0.5} x2="1440" y2={horizon + 0.5} stroke="#E8CF94" strokeOpacity="0.55" />
        <g stroke="#E8CF94" strokeOpacity="0.4">
          {Array.from({ length: 61 }, (_, i) => (
            <line key={i} x1={i * 24} y1={horizon} x2={i * 24} y2={horizon + (i % 15 === 0 ? 14 : i % 5 === 0 ? 8 : 4)} />
          ))}
        </g>
        {/* Reflection of the setting dial on the fountain pool */}
        <g stroke="#F1DCA8" strokeLinecap="round" strokeOpacity="0.45">
          <line x1={sunX - 90} y1={horizon + 30} x2={sunX + 90} y2={horizon + 30} />
          <line x1={sunX - 58} y1={horizon + 44} x2={sunX + 58} y2={horizon + 44} strokeOpacity="0.3" />
          <line x1={sunX - 30} y1={horizon + 56} x2={sunX + 30} y2={horizon + 56} strokeOpacity="0.18" />
        </g>
      </svg>
    </div>
  );
}

export function ScrollDial() {
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const p1 = polar(50, 50, 44, i * 30);
    const p2 = polar(50, 50, i % 3 === 0 ? 36 : 39, i * 30);
    return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="var(--taupe)" strokeWidth={i % 3 === 0 ? 2.4 : 1.3} strokeLinecap="round" />;
  });
  return (
    <div className="scroll-dial spa-no-print" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-full w-full" focusable="false">
        {ticks}
        <circle cx="50" cy="50" r="30" fill="none" stroke="var(--line)" strokeWidth="3" />
        <circle
          className="scroll-dial__arc"
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke="var(--champagne)"
          strokeWidth="5"
          strokeLinecap="round"
          pathLength={100}
          transform="rotate(-90 50 50)"
        />
        <line className="scroll-dial__hand" x1="50" y1="50" x2="50" y2="26" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="50" r="3" fill="var(--champagne)" />
      </svg>
    </div>
  );
}
