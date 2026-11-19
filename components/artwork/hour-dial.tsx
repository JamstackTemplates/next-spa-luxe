import { useId } from 'react';
import { formatMinutes } from '../../content/treatments';

export interface DialSegment {
  label: string;
  minutes: number;
  tone?: 'champagne' | 'velvet' | 'taupe' | 'bronze';
}

interface ArcPiece {
  segmentIndex: number;
  ring: number;
  startAngle: number;
  sweepAngle: number;
  tone: NonNullable<DialSegment['tone']>;
  label: string;
  minutes: number;
}

/**
 * Pure geometry helper: breaks a total or segmented duration into clockwise 60-minute concentric rings.
 * Ring 0 = 0..60 min (outer), Ring 1 = 60..120 min, Ring 2 = 120..180 min, Ring 3 = 180..240 min.
 */
export function buildDialArcs(segments: readonly DialSegment[]): ArcPiece[] {
  const tones: NonNullable<DialSegment['tone']>[] = ['champagne', 'velvet', 'taupe', 'bronze'];
  const pieces: ArcPiece[] = [];
  let cursor = 0;

  segments.forEach((seg, segmentIndex) => {
    const tone = seg.tone ?? tones[segmentIndex % tones.length];
    let remaining = Math.max(0, seg.minutes);
    while (remaining > 0) {
      const ring = Math.floor(cursor / 60);
      const posInRing = cursor % 60;
      const roomInRing = 60 - posInRing;
      const chunk = Math.min(remaining, roomInRing);
      pieces.push({
        segmentIndex,
        ring,
        startAngle: (posInRing / 60) * 360,
        sweepAngle: (chunk / 60) * 360,
        tone,
        label: seg.label,
        minutes: seg.minutes,
      });
      cursor += chunk;
      remaining -= chunk;
    }
  });

  return pieces;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, sweepAngle: number): string {
  // SVG arcs collapse if start === end (360deg); split a full turn into two 180deg halves.
  if (sweepAngle >= 359.99) {
    const top = polarToCartesian(cx, cy, r, startAngle);
    const bottom = polarToCartesian(cx, cy, r, startAngle + 180);
    return `M ${top.x.toFixed(2)} ${top.y.toFixed(2)} A ${r} ${r} 0 1 1 ${bottom.x.toFixed(2)} ${bottom.y.toFixed(2)} A ${r} ${r} 0 1 1 ${top.x.toFixed(2)} ${top.y.toFixed(2)}`;
  }
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, startAngle + sweepAngle);
  const largeArcFlag = sweepAngle > 180 ? 1 : 0;
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

export interface HourDialProps {
  /** Single duration in minutes (used when `segments` is omitted). */
  minutes?: number;
  /** Multi-treatment segmented itinerary (each treatment takes a tonal step). */
  segments?: readonly DialSegment[];
  /** Visual scale preset. */
  size?: 'mini' | 'sm' | 'md' | 'lg' | 'xl';
  /** Stopped clock hands with no arc (used on 404). */
  stopped?: boolean;
  /** Optional center label override (defaults to formatted minutes for md/lg/xl). */
  centerLabel?: string;
  /** Sub-caption beneath the center label on large dials. */
  centerSublabel?: string;
  /** Highlighted segment index for interactive package itinerary pairing. */
  activeSegmentIndex?: number | null;
  /** Callback when hovering or focusing an arc segment. */
  onSegmentFocus?: (index: number | null) => void;
  /** Draw arcs smoothly on load (gated behind prefers-reduced-motion in CSS). */
  animate?: boolean;
  /** Additional CSS class on wrapper SVG. */
  className?: string;
  /** Decorative dials (when duration text is already adjacent) hide from AT; interactive dials announce. */
  decorative?: boolean;
  /** Accessible label for non-decorative dials. */
  ariaLabel?: string;
}

const SIZE_MAP: Record<NonNullable<HourDialProps['size']>, number> = {
  mini: 26,
  sm: 44,
  md: 112,
  lg: 224,
  xl: 280,
};

export function HourDial({
  minutes = 60,
  segments,
  size = 'md',
  stopped = false,
  centerLabel,
  centerSublabel,
  activeSegmentIndex = null,
  onSegmentFocus,
  animate = false,
  className = '',
  decorative = true,
  ariaLabel,
}: HourDialProps) {
  const uid = useId().replace(/:/g, '');
  const px = SIZE_MAP[size];
  const isMini = size === 'mini';
  const isSmall = size === 'mini' || size === 'sm';
  const isLarge = size === 'lg' || size === 'xl';

  const resolvedSegments: readonly DialSegment[] = stopped
    ? []
    : segments && segments.length > 0
      ? segments
      : [{ label: formatMinutes(minutes), minutes, tone: 'champagne' }];

  const totalMinutes = resolvedSegments.reduce((sum, s) => sum + s.minutes, 0);
  const arcs = buildDialArcs(resolvedSegments);

  const cx = 100;
  const cy = 100;
  const outerTickR = 90;
  const baseArcR = isMini ? 72 : 76;
  const ringStep = isMini ? 22 : arcs.some((a) => a.ring >= 3) ? 11 : 13.5;
  const arcStroke = isMini ? 13 : size === 'sm' ? 9 : arcs.some((a) => a.ring >= 3) ? 6.5 : 8;

  const toneStroke = (tone: NonNullable<DialSegment['tone']>) => {
    switch (tone) {
      case 'champagne':
        return `url(#dial-gilt-${uid})`;
      case 'velvet':
        return 'var(--velvet)';
      case 'taupe':
        return 'var(--taupe)';
      case 'bronze':
        return 'var(--primary)';
    }
  };

  const ticks = Array.from({ length: 60 }, (_, i) => {
    const major = i % 5 === 0;
    const cardinal = i % 15 === 0;
    if (isMini && !major) return null;
    const angle = i * 6;
    const rOut = outerTickR;
    const rIn = isMini
      ? cardinal
        ? 80
        : 84
      : cardinal
        ? 81
        : major
          ? 83.5
          : 86.5;
    const p1 = polarToCartesian(cx, cy, rOut, angle);
    const p2 = polarToCartesian(cx, cy, rIn, angle);
    return (
      <line
        key={i}
        x1={p1.x.toFixed(2)}
        y1={p1.y.toFixed(2)}
        x2={p2.x.toFixed(2)}
        y2={p2.y.toFixed(2)}
        stroke={cardinal ? 'var(--champagne)' : 'var(--taupe)'}
        strokeOpacity={cardinal ? 0.92 : major ? 0.6 : 0.35}
        strokeWidth={isMini ? (cardinal ? 4.5 : 2.5) : cardinal ? 1.7 : major ? 1.15 : 0.75}
        strokeLinecap="round"
      />
    );
  });

  const displayCenter =
    centerLabel !== undefined ? centerLabel : stopped ? '—' : formatMinutes(totalMinutes);

  return (
    <svg
      viewBox="0 0 200 200"
      width={px}
      height={px}
      className={`shrink-0 ${className}`}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : (ariaLabel ?? `Hour dial showing ${formatMinutes(totalMinutes)}`)}
      data-hour-dial="true"
      data-minutes={stopped ? 0 : totalMinutes}
    >
      <defs>
        <linearGradient id={`dial-gilt-${uid}`} x1="20" y1="12" x2="184" y2="188" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--champagne-light)" />
          <stop offset="100%" stopColor="var(--champagne-deep)" />
        </linearGradient>
      </defs>

      {/* Subtle face fill for larger dials */}
      {!isMini ? (
        <circle
          cx={cx}
          cy={cy}
          r="94"
          fill="var(--surface)"
          fillOpacity={isLarge ? 0.62 : 0.45}
          stroke="var(--champagne)"
          strokeOpacity="0.45"
          strokeWidth="1"
        />
      ) : (
        <circle
          cx={cx}
          cy={cy}
          r="92"
          fill="none"
          stroke="var(--champagne)"
          strokeOpacity="0.45"
          strokeWidth="3.5"
        />
      )}

      {/* 60 tick marks */}
      <g>{ticks}</g>

      {/* Inner hairline track rings */}
      <circle
        cx={cx}
        cy={cy}
        r={baseArcR}
        fill="none"
        stroke="var(--taupe)"
        strokeOpacity={isMini ? 0.25 : 0.22}
        strokeWidth={isMini ? 3 : 1}
      />
      {!isSmall && (
        <circle
          cx={cx}
          cy={cy}
          r={baseArcR - ringStep}
          fill="none"
          stroke="var(--champagne)"
          strokeOpacity="0.22"
          strokeWidth="0.9"
          strokeDasharray="2 3"
        />
      )}

      {/* Cardinal numerals on large dials */}
      {isLarge && (
        <g
          fill="var(--muted)"
          fontFamily="var(--font-display)"
          fontSize="10.5"
          textAnchor="middle"
          opacity="0.8"
        >
          <text x="100" y="24">XII</text>
          <text x="179" y="103.5">III</text>
          <text x="100" y="185">VI</text>
          <text x="21" y="103.5">IX</text>
        </g>
      )}

      {/* Duration / Itinerary arcs */}
      <g>
        {arcs.map((piece, idx) => {
          const r = Math.max(24, baseArcR - piece.ring * ringStep);
          const d = describeArc(cx, cy, r, piece.startAngle, piece.sweepAngle);
          const approxLen = (2 * Math.PI * r * piece.sweepAngle) / 360;
          const isHighlighted = activeSegmentIndex === piece.segmentIndex;
          const isDimmed = activeSegmentIndex !== null && !isHighlighted;
          const interactive = Boolean(onSegmentFocus);

          return (
            <path
              key={`${piece.segmentIndex}-${piece.ring}-${idx}`}
              d={d}
              fill="none"
              stroke={toneStroke(piece.tone)}
              strokeWidth={isHighlighted ? arcStroke + 2.5 : arcStroke}
              strokeLinecap="round"
              opacity={isDimmed ? 0.34 : 0.96}
              className={`${animate ? 'spa-arc-draw' : ''} ${interactive ? 'cursor-pointer transition-opacity duration-200' : ''}`}
              style={
                animate
                  ? ({ '--arc-len': `${Math.ceil(approxLen + 8)}` } as React.CSSProperties)
                  : undefined
              }
              onMouseEnter={interactive ? () => onSegmentFocus?.(piece.segmentIndex) : undefined}
              onMouseLeave={interactive ? () => onSegmentFocus?.(null) : undefined}
            />
          );
        })}
      </g>

      {/* 12 o'clock gilt jewel */}
      {!isMini && (
        <circle cx={cx} cy={cy - baseArcR} r={isLarge ? 2.6 : 2.2} fill="var(--champagne)" />
      )}

      {/* Stopped hands for 404 */}
      {stopped && (
        <g stroke="var(--taupe)" strokeLinecap="round">
          <line x1={cx} y1={cy} x2={cx} y2={cy - 44} strokeWidth="1.6" />
          <line x1={cx} y1={cy} x2={cx + 30} y2={cy + 14} strokeWidth="1.6" />
          <circle cx={cx} cy={cy} r="3.5" fill="var(--champagne)" stroke="none" />
        </g>
      )}

      {/* Center readout on medium/large dials */}
      {!isSmall && !stopped && (
        <g textAnchor="middle">
          <text
            x={cx}
            y={centerSublabel ? 98 : 105}
            fill="var(--text)"
            fontFamily="var(--font-display)"
            fontSize={displayCenter.length > 8 ? (isLarge ? '17' : '15') : isLarge ? '22' : '19'}
          >
            {displayCenter}
          </text>
          {centerSublabel && (
            <text
              x={cx}
              y="115"
              fill="var(--muted)"
              fontFamily="var(--font-sans)"
              fontSize="8.5"
              letterSpacing="1.8"
            >
              {centerSublabel.toUpperCase()}
            </text>
          )}
        </g>
      )}
    </svg>
  );
}
