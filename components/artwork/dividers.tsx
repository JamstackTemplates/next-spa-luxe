/**
 * Section motifs and editorial dividers for The Velvet Hour Day Spa:
 * - VelvetRibbonDivider: full-width velvet ribbon folding once and tied in a loose bow
 * - SteamDivider: three rising steam curls over a gilt hairline
 * - EucalyptusCorner: delicate botanical sprig curling into page-head corners
 * - StoneStackBullet: balanced basalt stones for the "Before you arrive" etiquette card
 * - StreetCornerSketch: engraved street-corner map of Gaston & Whitaker beside Forsyth Park
 */

export function VelvetRibbonDivider({
  className = '',
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const ribbonColor = onDark ? '#A47A86' : 'var(--velvet)';
  const giltColor = onDark ? '#DFC488' : 'var(--champagne)';
  return (
    <div className={`spa-ribbon-divider w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 72" className="h-auto w-full" preserveAspectRatio="xMidYMid slice">
        {/* Hairline gilt edge */}
        <line x1="0" y1="36" x2="1200" y2="36" stroke={giltColor} strokeOpacity="0.45" strokeWidth="1" />
        {/* Flowing velvet ribbon band with gentle fold */}
        <path
          d="M 0 36 C 210 34, 340 44, 520 35 C 640 29, 770 40, 930 35 C 1020 32, 1110 35, 1200 36"
          fill="none"
          stroke={ribbonColor}
          strokeWidth="7"
          strokeOpacity="0.88"
        />
        <path
          d="M 0 36 C 210 34, 340 44, 520 35 C 640 29, 770 40, 930 35 C 1020 32, 1110 35, 1200 36"
          fill="none"
          stroke={giltColor}
          strokeWidth="0.9"
          strokeOpacity="0.7"
        />
        {/* Single soft ribbon fold */}
        <path
          d="M 488 35 C 506 27, 524 27, 540 35 C 524 41, 506 41, 488 35 Z"
          fill={ribbonColor}
          fillOpacity="0.32"
          stroke={giltColor}
          strokeWidth="0.8"
          strokeOpacity="0.55"
        />
        {/* Loose bow tied toward the right */}
        <g className="spa-ribbon-bow" transform="translate(932, 35)">
          {/* Left bow loop */}
          <path
            d="M 0 0 C -18 -20, -48 -18, -44 -2 C -40 12, -16 8, 0 0 Z"
            fill={ribbonColor}
            fillOpacity="0.9"
            stroke={giltColor}
            strokeWidth="1"
          />
          {/* Right bow loop */}
          <path
            d="M 0 0 C 18 -19, 46 -17, 42 -1 C 38 12, 15 8, 0 0 Z"
            fill={ribbonColor}
            fillOpacity="0.85"
            stroke={giltColor}
            strokeWidth="1"
          />
          {/* Trailing tails */}
          <path
            d="M -3 3 C -14 14, -22 24, -36 30"
            fill="none"
            stroke={ribbonColor}
            strokeWidth="5.2"
            strokeLinecap="round"
          />
          <path
            d="M 3 3 C 12 16, 20 26, 30 32"
            fill="none"
            stroke={ribbonColor}
            strokeWidth="4.6"
            strokeLinecap="round"
          />
          {/* Center knot */}
          <circle cx="0" cy="0" r="5.5" fill={ribbonColor} stroke={giltColor} strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}

export function SteamDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-gilt-line/70" />
      <svg viewBox="0 0 84 40" width="64" height="30" className="shrink-0 text-champagne">
        <path
          className="spa-steam"
          d="M 24 34 C 19 26, 29 20, 24 11 C 21 7, 25 4, 27 2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          className="spa-steam-2"
          d="M 42 36 C 36 27, 48 19, 41 10 C 38 6, 42 3, 44 1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          className="spa-steam-3"
          d="M 60 34 C 55 26, 65 20, 60 11 C 57 7, 61 4, 63 2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <line x1="10" y1="38" x2="74" y2="38" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1" />
      </svg>
      <span className="h-px flex-1 bg-gilt-line/70" />
    </div>
  );
}

export function EucalyptusCorner({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 120"
      width="150"
      height="100"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Graceful arching stem */}
      <path
        d="M 8 106 C 42 84, 88 54, 166 14"
        fill="none"
        stroke="var(--champagne)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {/* Paired rounded eucalyptus leaves */}
      <ellipse cx="44" cy="74" rx="14" ry="8.5" transform="rotate(-24 44 74)" fill="var(--taupe)" fillOpacity="0.22" stroke="var(--champagne)" strokeWidth="1.15" />
      <ellipse cx="56" cy="92" rx="13" ry="8" transform="rotate(14 56 92)" fill="var(--taupe)" fillOpacity="0.18" stroke="var(--champagne)" strokeWidth="1.15" />
      <ellipse cx="80" cy="52" rx="13" ry="8" transform="rotate(-32 80 52)" fill="var(--taupe)" fillOpacity="0.25" stroke="var(--champagne)" strokeWidth="1.15" />
      <ellipse cx="96" cy="68" rx="12" ry="7.5" transform="rotate(10 96 68)" fill="var(--taupe)" fillOpacity="0.16" stroke="var(--champagne)" strokeWidth="1.15" />
      <ellipse cx="118" cy="34" rx="11" ry="6.8" transform="rotate(-28 118 34)" fill="var(--taupe)" fillOpacity="0.2" stroke="var(--champagne)" strokeWidth="1.15" />
      <ellipse cx="134" cy="46" rx="10" ry="6.2" transform="rotate(8 134 46)" fill="var(--taupe)" fillOpacity="0.18" stroke="var(--champagne)" strokeWidth="1.15" />
      <ellipse cx="154" cy="18" rx="8.5" ry="5.2" transform="rotate(-22 154 18)" fill="var(--taupe)" fillOpacity="0.24" stroke="var(--champagne)" strokeWidth="1.1" />
    </svg>
  );
}

export function StoneStackBullet({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 24" width="24" height="20" aria-hidden="true" className={`shrink-0 ${className}`}>
      <ellipse cx="14" cy="19" rx="10.5" ry="3.2" fill="var(--taupe)" fillOpacity="0.26" stroke="var(--champagne)" strokeWidth="1.2" />
      <ellipse cx="14" cy="13" rx="7.6" ry="2.8" fill="var(--taupe)" fillOpacity="0.34" stroke="var(--champagne)" strokeWidth="1.2" />
      <ellipse cx="14" cy="7.6" rx="4.8" ry="2.3" fill="var(--velvet)" fillOpacity="0.28" stroke="var(--champagne)" strokeWidth="1.2" />
    </svg>
  );
}

export function StreetCornerSketch({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 230"
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label="Engraved street sketch showing 22 West Gaston Street at the corner of Whitaker Street, opposite the fountain end of Forsyth Park"
    >
      {/* Parchment background */}
      <rect x="1" y="1" width="418" height="228" fill="var(--surface)" stroke="var(--champagne)" strokeOpacity="0.55" strokeWidth="1" />
      <rect x="7" y="7" width="406" height="216" fill="none" stroke="var(--line)" strokeWidth="0.75" />

      {/* Forsyth Park expanse (bottom half) */}
      <rect x="20" y="120" width="380" height="94" fill="var(--taupe)" fillOpacity="0.16" />
      {/* Park diagonal walking paths */}
      <path d="M 20 120 L 210 176 L 400 120" fill="none" stroke="var(--champagne)" strokeOpacity="0.55" strokeWidth="1.1" strokeDasharray="3 3" />
      <path d="M 210 120 L 210 214" fill="none" stroke="var(--champagne)" strokeOpacity="0.55" strokeWidth="1.1" />
      {/* Fountain basin silhouette */}
      <circle cx="210" cy="174" r="18" fill="var(--surface)" stroke="var(--champagne)" strokeWidth="1.3" />
      <circle cx="210" cy="174" r="10" fill="var(--taupe)" fillOpacity="0.22" stroke="var(--champagne)" strokeWidth="1" />
      <circle cx="210" cy="174" r="2.5" fill="var(--champagne)" />
      {/* Live oak crowns */}
      <g fill="var(--taupe)" fillOpacity="0.22" stroke="var(--taupe)" strokeOpacity="0.5" strokeWidth="1">
        <circle cx="64" cy="158" r="14" />
        <circle cx="80" cy="166" r="10" />
        <circle cx="348" cy="164" r="15" />
        <circle cx="332" cy="176" r="10" />
      </g>

      {/* Streets: W. Gaston St (horizontal) and Whitaker St (vertical) */}
      <line x1="18" y1="92" x2="402" y2="92" stroke="var(--text)" strokeOpacity="0.35" strokeWidth="1.2" />
      <line x1="18" y1="118" x2="402" y2="118" stroke="var(--text)" strokeOpacity="0.35" strokeWidth="1.2" />
      <line x1="292" y1="14" x2="292" y2="216" stroke="var(--text)" strokeOpacity="0.32" strokeWidth="1.2" />
      <line x1="316" y1="14" x2="316" y2="216" stroke="var(--text)" strokeOpacity="0.32" strokeWidth="1.2" />

      {/* Townhouse row along W. Gaston St */}
      <rect x="64" y="42" width="46" height="44" fill="var(--surface-soft)" stroke="var(--taupe)" strokeWidth="1" />
      <rect x="114" y="42" width="46" height="44" fill="var(--surface-soft)" stroke="var(--taupe)" strokeWidth="1" />
      {/* Highlighted #22 townhouse */}
      <rect x="164" y="34" width="60" height="52" fill="var(--velvet)" fillOpacity="0.18" stroke="var(--champagne)" strokeWidth="1.5" />
      <path d="M 186 86 L 186 70 A 8 8 0 0 1 202 70 L 202 86" fill="var(--velvet)" fillOpacity="0.5" stroke="var(--champagne)" strokeWidth="1.1" />
      {/* Gilt lamp marker */}
      <circle cx="194" cy="54" r="5" fill="var(--champagne)" />
      <circle cx="194" cy="54" r="9.5" fill="none" stroke="var(--champagne)" strokeOpacity="0.55" strokeWidth="1" />
      <rect x="228" y="42" width="46" height="44" fill="var(--surface-soft)" stroke="var(--taupe)" strokeWidth="1" />

      {/* Street & landmark typography */}
      <text x="194" y="25" textAnchor="middle" fill="var(--text)" fontFamily="var(--font-display)" fontSize="13">
        22 W. Gaston St · The Velvet Hour
      </text>
      <text x="148" y="109" textAnchor="middle" fill="var(--muted)" fontFamily="var(--font-sans)" fontSize="9.5" letterSpacing="2.4">
        WEST GASTON STREET
      </text>
      <text
        x="307"
        y="64"
        textAnchor="middle"
        fill="var(--muted)"
        fontFamily="var(--font-sans)"
        fontSize="8.5"
        letterSpacing="1.8"
        transform="rotate(90 307 64)"
      >
        WHITAKER ST
      </text>
      <text x="210" y="206" textAnchor="middle" fill="var(--muted)" fontFamily="var(--font-sans)" fontSize="9" letterSpacing="2.6">
        FORSYTH PARK FOUNTAIN
      </text>

      {/* Small engraved compass rose */}
      <g transform="translate(366, 48)" stroke="var(--champagne)" strokeWidth="1">
        <circle cx="0" cy="0" r="14" fill="none" strokeOpacity="0.45" />
        <line x1="0" y1="-11" x2="0" y2="11" />
        <line x1="-11" y1="0" x2="11" y2="0" />
        <polygon points="0,-11 -2.5,-3 2.5,-3" fill="var(--champagne)" />
        <text x="0" y="-17" textAnchor="middle" fill="var(--muted)" stroke="none" fontFamily="var(--font-sans)" fontSize="7.5" letterSpacing="1">
          N
        </text>
      </g>
    </svg>
  );
}
