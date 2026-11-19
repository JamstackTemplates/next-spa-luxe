import { useId } from 'react';
import type { GiftCardFinishId } from '../../content/gift-cards';

/**
 * Wide editorial illustration of the private Magnolia Couples' Suite:
 * two waffle robes on brass hooks above twin draped tables, a soaking tub strewn with petals,
 * and a pair of lit taper candles.
 */
export function CouplesSuiteScene({ className = '' }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg
      viewBox="0 0 680 440"
      className={`block h-auto w-full ${className}`}
      role="img"
      aria-label="Illustration of the Magnolia Couples Suite showing two robes hanging on brass hooks, twin draped treatment tables, a petal-strewn soaking tub, and lit taper candles"
    >
      <defs>
        <linearGradient id={`suite-wall-${uid}`} x1="0" y1="0" x2="0" y2="440" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--surface-soft)" />
          <stop offset="100%" stopColor="var(--surface)" />
        </linearGradient>
        <radialGradient id={`candle-glow-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--champagne-light)" stopOpacity="0.48" />
          <stop offset="100%" stopColor="var(--champagne)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Architectural room backdrop with twin arched niches */}
      <rect x="0" y="0" width="680" height="440" fill={`url(#suite-wall-${uid})`} />
      {/* Wainscot line & floor */}
      <rect x="0" y="316" width="680" height="124" fill="var(--bg)" fillOpacity="0.72" />
      <line x1="0" y1="316" x2="680" y2="316" stroke="var(--champagne)" strokeOpacity="0.5" strokeWidth="1.2" />

      {/* Left arched niche */}
      <path
        d="M 52 316 L 52 138 A 104 98 0 0 1 260 138 L 260 316 Z"
        fill="var(--bg)"
        fillOpacity="0.52"
        stroke="var(--champagne)"
        strokeOpacity="0.55"
        strokeWidth="1.25"
      />
      {/* Right arched niche */}
      <path
        d="M 420 316 L 420 138 A 104 98 0 0 1 628 138 L 628 316 Z"
        fill="var(--bg)"
        fillOpacity="0.52"
        stroke="var(--champagne)"
        strokeOpacity="0.55"
        strokeWidth="1.25"
      />

      {/* Brass robe hooks & two hanging waffle robes in the center pier */}
      <g transform="translate(340, 86)">
        <line x1="-54" y1="0" x2="54" y2="0" stroke="var(--champagne)" strokeWidth="1.4" />
        {/* Left robe */}
        <g transform="translate(-30, 0)">
          <circle cx="0" cy="0" r="3.2" fill="var(--champagne)" />
          <path
            d="M 0 6 L -20 26 L -24 146 C -12 152, 12 152, 24 146 L 20 26 Z"
            fill="var(--surface)"
            stroke="var(--taupe)"
            strokeWidth="1.35"
          />
          <path d="M 0 6 L -6 46 L 0 148" fill="none" stroke="var(--taupe)" strokeOpacity="0.55" strokeWidth="1.1" />
          <path d="M -21 76 Q 0 82 21 76" fill="none" stroke="var(--velvet)" strokeWidth="3.2" strokeLinecap="round" />
        </g>
        {/* Right robe */}
        <g transform="translate(30, 0)">
          <circle cx="0" cy="0" r="3.2" fill="var(--champagne)" />
          <path
            d="M 0 6 L -20 26 L -24 146 C -12 152, 12 152, 24 146 L 20 26 Z"
            fill="var(--surface)"
            stroke="var(--taupe)"
            strokeWidth="1.35"
          />
          <path d="M 0 6 L 6 46 L 0 148" fill="none" stroke="var(--taupe)" strokeOpacity="0.55" strokeWidth="1.1" />
          <path d="M -21 76 Q 0 82 21 76" fill="none" stroke="var(--velvet)" strokeWidth="3.2" strokeLinecap="round" />
        </g>
      </g>

      {/* Twin draped massage tables beneath the arches */}
      {[156, 524].map((tx, idx) => (
        <g key={tx} transform={`translate(${tx}, 268)`}>
          {/* Table legs */}
          <line x1="-70" y1="36" x2="-70" y2="76" stroke="var(--taupe)" strokeWidth="2.2" />
          <line x1="70" y1="36" x2="70" y2="76" stroke="var(--taupe)" strokeWidth="2.2" />
          {/* Linen drape */}
          <path
            d="M -82 14 L 82 14 L 86 58 Q 0 64 -86 58 Z"
            fill="var(--surface)"
            stroke="var(--taupe)"
            strokeWidth="1.35"
          />
          {/* Velvet throw runner */}
          <rect x="-26" y="14" width="52" height="44" fill="var(--velvet)" fillOpacity="0.22" stroke="var(--champagne)" strokeOpacity="0.55" strokeWidth="1" />
          {/* Bolster pillow */}
          <ellipse cx={idx === 0 ? -52 : 52} cy="10" rx="18" ry="8" fill="var(--surface-soft)" stroke="var(--taupe)" strokeWidth="1.25" />
          {/* Folded linen towel */}
          <rect x="-14" y="2" width="28" height="10" rx="3" fill="var(--surface-soft)" stroke="var(--champagne)" strokeWidth="1.1" />
        </g>
      ))}

      {/* Freestanding deep soaking tub with floating magnolia petals & gentle steam (center foreground) */}
      <g transform="translate(340, 326)">
        {/* Rising steam */}
        <path className="spa-steam" d="M -32 -14 C -38 -28, -24 -40, -30 -54" fill="none" stroke="var(--champagne)" strokeOpacity="0.65" strokeWidth="1.25" strokeLinecap="round" />
        <path className="spa-steam-2" d="M 6 -16 C -2 -32, 14 -44, 6 -60" fill="none" stroke="var(--champagne)" strokeOpacity="0.7" strokeWidth="1.35" strokeLinecap="round" />
        <path className="spa-steam-3" d="M 38 -12 C 32 -24, 44 -34, 38 -48" fill="none" stroke="var(--champagne)" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" />
        {/* Brass floor filler */}
        <path d="M 108 66 L 108 -18 C 108 -30, 92 -30, 92 -18" fill="none" stroke="var(--champagne)" strokeWidth="2.2" strokeLinecap="round" />
        {/* Tub rim & water */}
        <ellipse cx="0" cy="0" rx="108" ry="16" fill="var(--surface)" stroke="var(--champagne)" strokeWidth="1.4" />
        <ellipse cx="0" cy="2" rx="94" ry="10" fill="var(--taupe)" fillOpacity="0.18" />
        {/* Floating magnolia petals */}
        <ellipse cx="-38" cy="2" rx="8" ry="3.5" transform="rotate(-12 -38 2)" fill="var(--velvet)" fillOpacity="0.55" />
        <ellipse cx="14" cy="4" rx="7" ry="3" transform="rotate(18 14 4)" fill="var(--velvet)" fillOpacity="0.45" />
        <ellipse cx="48" cy="0" rx="6.5" ry="2.8" transform="rotate(-8 48 0)" fill="var(--champagne)" fillOpacity="0.65" />
        <ellipse cx="-8" cy="-1" rx="6" ry="2.6" transform="rotate(10 -8 -1)" fill="var(--surface)" stroke="var(--velvet)" strokeOpacity="0.6" strokeWidth="0.9" />
        {/* Tub basin */}
        <path
          d="M -108 0 C -106 54, -84 72, -48 74 L 48 74 C 84 72, 106 54, 108 0"
          fill="var(--surface)"
          stroke="var(--taupe)"
          strokeWidth="1.5"
        />
        <line x1="-58" y1="74" x2="58" y2="74" stroke="var(--champagne)" strokeWidth="1.6" />
      </g>

      {/* Pair of lit taper candles in brass holders on foreground left stool */}
      <g transform="translate(96, 356)">
        <circle cx="-12" cy="-24" r="24" fill={`url(#candle-glow-${uid})`} />
        <circle cx="14" cy="-34" r="28" fill={`url(#candle-glow-${uid})`} />
        {/* Shorter candle */}
        <rect x="-16" y="-12" width="8" height="44" rx="1" fill="var(--surface)" stroke="var(--champagne)" strokeWidth="1.1" />
        <path d="M -12 -24 C -15 -19, -15 -14, -12 -14 C -9 -14, -9 -19, -12 -24 Z" fill="var(--champagne-light)" />
        <path d="M -22 32 L -2 32" stroke="var(--champagne)" strokeWidth="1.6" strokeLinecap="round" />
        {/* Taller candle */}
        <rect x="10" y="-22" width="8" height="54" rx="1" fill="var(--surface)" stroke="var(--champagne)" strokeWidth="1.1" />
        <path d="M 14 -34 C 11 -29, 11 -24, 14 -24 C 17 -24, 17 -29, 14 -34 Z" fill="var(--champagne-light)" />
        <path d="M 4 32 L 24 32" stroke="var(--champagne)" strokeWidth="1.6" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/**
 * Three bespoke gift card faces rendered as layered SVG artwork:
 * - champagne-foil: gilt fan rays and VH monogram on warm cream stock
 * - taupe-linen: woven linen texture, debossed monogram, gilt bevelled edge
 * - velvet-ribbon-box: overhead lidded keepsake box crossed with plum-velvet ribbon and gift tag
 */
export function GiftCardArt({
  finish,
  valueLabel = '$150',
  subtitle = 'The Velvet Hour',
  recipientLine = 'For —',
  className = '',
}: {
  finish: GiftCardFinishId;
  valueLabel?: string;
  subtitle?: string;
  recipientLine?: string;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');

  if (finish === 'champagne-foil') {
    const rays = Array.from({ length: 19 }, (_, i) => {
      const angle = ((-170 + i * 9.5) * Math.PI) / 180;
      const x2 = 210 + 190 * Math.cos(angle);
      const y2 = 264 + 190 * Math.sin(angle);
      return (
        <line
          key={i}
          x1="210"
          y1="264"
          x2={x2.toFixed(1)}
          y2={y2.toFixed(1)}
          stroke={`url(#foil-${uid})`}
          strokeOpacity={i % 2 === 0 ? 0.32 : 0.16}
          strokeWidth="1"
        />
      );
    });

    return (
      <svg
        viewBox="0 0 420 264"
        className={`block h-auto w-full ${className}`}
        role="img"
        aria-label={`Champagne foil gift card showing ${valueLabel}`}
      >
        <defs>
          <linearGradient id={`foil-${uid}`} x1="20" y1="16" x2="400" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E6CC90" />
            <stop offset="50%" stopColor="#C8A96A" />
            <stop offset="100%" stopColor="#9B793A" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="416" height="260" rx="6" fill="#FBF6EE" stroke={`url(#foil-${uid})`} strokeWidth="1.6" />
        <rect x="12" y="12" width="396" height="240" rx="3" fill="none" stroke={`url(#foil-${uid})`} strokeOpacity="0.65" strokeWidth="0.9" />
        {/* Sunburst champagne fan rays */}
        <g>{rays}</g>
        {/* Decorative arch crest */}
        <path d="M 150 252 A 60 60 0 0 1 270 252" fill="none" stroke={`url(#foil-${uid})`} strokeOpacity="0.55" strokeWidth="1" />
        {/* VH Monogram */}
        <circle cx="62" cy="58" r="24" fill="none" stroke={`url(#foil-${uid})`} strokeWidth="1.35" />
        <circle cx="62" cy="58" r="19" fill="none" stroke={`url(#foil-${uid})`} strokeOpacity="0.5" strokeWidth="0.8" strokeDasharray="3 3" />
        <text x="62" y="64" textAnchor="middle" fill="#8A6A2E" fontFamily="var(--font-display)" fontSize="18">
          VH
        </text>
        {/* Spa wordmark & value */}
        <text x="386" y="54" textAnchor="end" fill="#6B5D52" fontFamily="var(--font-sans)" fontSize="9.5" letterSpacing="2.6">
          DAY SPA · FORSYTH PARK
        </text>
        <text x="210" y="138" textAnchor="middle" fill="#2E2621" fontFamily="var(--font-display)" fontSize={valueLabel.length > 10 ? '30' : '48'}>
          {valueLabel}
        </text>
        <text x="210" y="164" textAnchor="middle" fill="#8A6A2E" fontFamily="var(--font-sans)" fontSize="10.5" letterSpacing="2.4">
          {subtitle.toUpperCase()}
        </text>
        <text x="38" y="226" fill="#6B5D52" fontFamily="var(--font-display)" fontSize="16">
          {recipientLine}
        </text>
        <line x1="90" y1="228" x2="246" y2="228" stroke={`url(#foil-${uid})`} strokeOpacity="0.7" strokeWidth="0.9" />
      </svg>
    );
  }

  if (finish === 'taupe-linen') {
    return (
      <svg
        viewBox="0 0 420 264"
        className={`block h-auto w-full ${className}`}
        role="img"
        aria-label={`Taupe linen gift card showing ${valueLabel}`}
      >
        <defs>
          <pattern id={`weave-${uid}`} width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M0 5h10M5 0v10" stroke="#2E2621" strokeOpacity="0.065" strokeWidth="0.8" />
            <path d="M0 2h10M2 0v10" stroke="#FFFFFF" strokeOpacity="0.09" strokeWidth="0.5" />
          </pattern>
          <linearGradient id={`edge-${uid}`} x1="0" y1="0" x2="420" y2="264" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E6CC90" />
            <stop offset="100%" stopColor="#B38E48" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="416" height="260" rx="6" fill="#C9BAAB" stroke={`url(#edge-${uid})`} strokeWidth="2.4" />
        <rect x="2" y="2" width="416" height="260" rx="6" fill={`url(#weave-${uid})`} />
        <rect x="14" y="14" width="392" height="236" rx="2" fill="none" stroke="#FBF7F1" strokeOpacity="0.45" strokeWidth="1" />
        {/* Debossed central monogram medallion */}
        <circle cx="210" cy="70" r="28" fill="#B5A392" fillOpacity="0.42" stroke="#FBF7F1" strokeOpacity="0.5" strokeWidth="1" />
        <text x="210" y="77" textAnchor="middle" fill="#2E2621" fillOpacity="0.78" fontFamily="var(--font-display)" fontSize="22">
          VH
        </text>
        <text x="210" y="146" textAnchor="middle" fill="#2E2621" fontFamily="var(--font-display)" fontSize={valueLabel.length > 10 ? '29' : '46'}>
          {valueLabel}
        </text>
        <text x="210" y="172" textAnchor="middle" fill="#4A3D34" fontFamily="var(--font-sans)" fontSize="10" letterSpacing="2.6">
          {subtitle.toUpperCase()}
        </text>
        <text x="36" y="226" fill="#3D3129" fontFamily="var(--font-display)" fontSize="16">
          {recipientLine}
        </text>
        <line x1="88" y1="228" x2="238" y2="228" stroke="#6E5646" strokeOpacity="0.55" strokeWidth="0.9" />
        <text x="384" y="226" textAnchor="end" fill="#4A3D34" fontFamily="var(--font-sans)" fontSize="8.5" letterSpacing="2">
          SAVANNAH
        </text>
      </svg>
    );
  }

  // velvet-ribbon-box
  return (
    <svg
      viewBox="0 0 420 264"
      className={`block h-auto w-full ${className}`}
      role="img"
      aria-label={`Velvet ribbon box gift presentation showing ${valueLabel}`}
    >
      <defs>
        <linearGradient id={`box-gilt-${uid}`} x1="0" y1="0" x2="420" y2="264" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EAD298" />
          <stop offset="100%" stopColor="#B8944F" />
        </linearGradient>
      </defs>
      {/* Overhead keepsake box lid */}
      <rect x="2" y="2" width="416" height="260" rx="8" fill="#322824" stroke={`url(#box-gilt-${uid})`} strokeWidth="1.6" />
      <rect x="14" y="14" width="392" height="236" rx="4" fill="#3B2F2B" stroke={`url(#box-gilt-${uid})`} strokeOpacity="0.32" strokeWidth="0.9" />

      {/* Crossing plum-velvet ribbons */}
      <rect x="114" y="2" width="28" height="260" fill="#7A5560" />
      <line x1="115" y1="2" x2="115" y2="262" stroke="#DFC488" strokeOpacity="0.55" strokeWidth="0.8" />
      <line x1="141" y1="2" x2="141" y2="262" stroke="#DFC488" strokeOpacity="0.55" strokeWidth="0.8" />

      <rect x="2" y="118" width="416" height="28" fill="#7A5560" />
      <line x1="2" y1="119" x2="418" y2="119" stroke="#DFC488" strokeOpacity="0.55" strokeWidth="0.8" />
      <line x1="2" y1="145" x2="418" y2="145" stroke="#DFC488" strokeOpacity="0.55" strokeWidth="0.8" />

      {/* Tied velvet bow at ribbon intersection */}
      <g transform="translate(128, 132)">
        <path d="M 0 0 C -26 -30, -60 -20, -48 2 C -38 18, -14 10, 0 0 Z" fill="#8E6471" stroke="#DFC488" strokeWidth="1" />
        <path d="M 0 0 C 26 -30, 60 -20, 48 2 C 38 18, 14 10, 0 0 Z" fill="#8E6471" stroke="#DFC488" strokeWidth="1" />
        <path d="M -4 4 C -16 26, -24 44, -40 58" fill="none" stroke="#8E6471" strokeWidth="9" strokeLinecap="round" />
        <path d="M 4 4 C 14 28, 22 44, 34 60" fill="none" stroke="#8E6471" strokeWidth="8.5" strokeLinecap="round" />
        <circle cx="0" cy="0" r="8.5" fill="#7A5560" stroke="#DFC488" strokeWidth="1.2" />
      </g>

      {/* Hanging linen gift tag tucked under the bow */}
      <g transform="translate(194, 50) rotate(-3)">
        <path d="M 0 82 C -26 84, -46 82, -62 82" fill="none" stroke="#DFC488" strokeWidth="1.1" />
        <path d="M 0 16 L 18 0 L 182 0 L 182 146 L 18 146 L 0 130 Z" fill="#FBF6EE" stroke={`url(#box-gilt-${uid})`} strokeWidth="1.3" />
        <circle cx="16" cy="73" r="4" fill="#3B2F2B" stroke="#C8A96A" strokeWidth="1" />
        <text x="100" y="34" textAnchor="middle" fill="#6B5D52" fontFamily="var(--font-sans)" fontSize="8.5" letterSpacing="2">
          THE VELVET HOUR
        </text>
        <text x="100" y="84" textAnchor="middle" fill="#2E2621" fontFamily="var(--font-display)" fontSize={valueLabel.length > 10 ? '21' : '36'}>
          {valueLabel}
        </text>
        <text x="100" y="106" textAnchor="middle" fill="#8A6A2E" fontFamily="var(--font-sans)" fontSize="8.5" letterSpacing="1.8">
          {subtitle.toUpperCase()}
        </text>
        <text x="30" y="130" fill="#6B5D52" fontFamily="var(--font-display)" fontSize="13">
          {recipientLine}
        </text>
      </g>
    </svg>
  );
}

/**
 * Arched vignette artwork for inner PageHead components.
 */
export function PageHeadVignette({
  variant,
  className = '',
}: {
  variant: 'treatments' | 'packages' | 'gift-cards' | 'contact';
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 300"
      className={`block h-full w-full ${className}`}
      aria-hidden="true"
    >
      {/* Arched linen card interior */}
      <path
        d="M 10 296 L 10 130 A 120 120 0 0 1 250 130 L 250 296 Z"
        fill="var(--surface)"
        stroke="var(--champagne)"
        strokeOpacity="0.65"
        strokeWidth="1.25"
      />
      <path
        d="M 20 288 L 20 132 A 110 110 0 0 1 240 132 L 240 288"
        fill="none"
        stroke="var(--line)"
        strokeWidth="0.9"
      />

      {variant === 'treatments' && (
        <g transform="translate(130, 178)">
          {/* Steaming copper bowl & balanced basalt stones */}
          <path className="spa-steam" d="M -22 -64 C -28 -80, -14 -92, -20 -108" fill="none" stroke="var(--champagne)" strokeWidth="1.35" strokeLinecap="round" />
          <path className="spa-steam-2" d="M 0 -68 C -8 -86, 10 -98, 2 -118" fill="none" stroke="var(--champagne)" strokeWidth="1.5" strokeLinecap="round" />
          <path className="spa-steam-3" d="M 22 -64 C 16 -78, 28 -90, 22 -104" fill="none" stroke="var(--champagne)" strokeWidth="1.3" strokeLinecap="round" />
          {/* Copper bowl */}
          <path d="M -52 -46 L 52 -46 C 46 -12, 26 2, 0 2 C -26 2, -46 -12, -52 -46 Z" fill="var(--champagne)" fillOpacity="0.24" stroke="var(--champagne)" strokeWidth="1.4" />
          <ellipse cx="0" cy="-46" rx="52" ry="8" fill="var(--surface-soft)" stroke="var(--champagne)" strokeWidth="1.3" />
          {/* Basalt stone stack below */}
          <ellipse cx="0" cy="64" rx="56" ry="15" fill="var(--taupe)" fillOpacity="0.26" stroke="var(--text)" strokeOpacity="0.55" strokeWidth="1.3" />
          <ellipse cx="-2" cy="40" rx="38" ry="12" fill="var(--taupe)" fillOpacity="0.34" stroke="var(--text)" strokeOpacity="0.55" strokeWidth="1.3" />
          <ellipse cx="2" cy="20" rx="22" ry="9" fill="var(--velvet)" fillOpacity="0.3" stroke="var(--champagne)" strokeWidth="1.25" />
        </g>
      )}

      {variant === 'packages' && (
        <g transform="translate(130, 168)">
          {/* Decorative gilt halo */}
          <circle cx="0" cy="-42" r="56" fill="var(--champagne)" fillOpacity="0.09" stroke="var(--champagne)" strokeOpacity="0.45" strokeWidth="1" strokeDasharray="3 4" />
          {/* Left champagne coupe */}
          <g transform="translate(-34, 8) rotate(-8)">
            <path d="M -28 -26 L 28 -26 C 24 -4, 14 8, 0 8 C -14 8, -24 -4, -28 -26 Z" fill="var(--surface-soft)" stroke="var(--champagne)" strokeWidth="1.4" />
            <path d="M -22 -16 L 22 -16 C 18 -2, 10 7, 0 7 C -10 7, -18 -2, -22 -16 Z" fill="var(--champagne)" fillOpacity="0.3" />
            <line x1="0" y1="8" x2="0" y2="66" stroke="var(--champagne)" strokeWidth="1.4" />
            <ellipse cx="0" cy="68" rx="18" ry="4" fill="none" stroke="var(--champagne)" strokeWidth="1.3" />
          </g>
          {/* Right champagne coupe */}
          <g transform="translate(34, 16) rotate(8)">
            <path d="M -28 -26 L 28 -26 C 24 -4, 14 8, 0 8 C -14 8, -24 -4, -28 -26 Z" fill="var(--surface-soft)" stroke="var(--champagne)" strokeWidth="1.4" />
            <path d="M -22 -16 L 22 -16 C 18 -2, 10 7, 0 7 C -10 7, -18 -2, -22 -16 Z" fill="var(--velvet)" fillOpacity="0.28" />
            <line x1="0" y1="8" x2="0" y2="66" stroke="var(--champagne)" strokeWidth="1.4" />
            <ellipse cx="0" cy="68" rx="18" ry="4" fill="none" stroke="var(--champagne)" strokeWidth="1.3" />
          </g>
          {/* Rising sparkles */}
          <circle cx="0" cy="-58" r="2.2" fill="var(--champagne)" />
          <circle cx="-14" cy="-42" r="1.5" fill="var(--champagne)" />
          <circle cx="16" cy="-46" r="1.5" fill="var(--champagne)" />
        </g>
      )}

      {variant === 'gift-cards' && (
        <g transform="translate(130, 174)">
          {/* Ribbon-tied keepsake box */}
          <rect x="-66" y="-22" width="132" height="94" rx="4" fill="var(--surface-soft)" stroke="var(--champagne)" strokeWidth="1.4" />
          <rect x="-72" y="-42" width="144" height="22" rx="3" fill="var(--surface)" stroke="var(--champagne)" strokeWidth="1.4" />
          <rect x="-11" y="-42" width="22" height="114" fill="var(--velvet)" fillOpacity="0.82" />
          <line x1="-11" y1="-42" x2="-11" y2="72" stroke="var(--champagne)" strokeWidth="0.9" />
          <line x1="11" y1="-42" x2="11" y2="72" stroke="var(--champagne)" strokeWidth="0.9" />
          {/* Velvet bow atop lid */}
          <path d="M 0 -42 C -26 -78, -58 -60, -40 -42 C -26 -30, -10 -36, 0 -42 Z" fill="var(--velvet)" fillOpacity="0.88" stroke="var(--champagne)" strokeWidth="1.1" />
          <path d="M 0 -42 C 26 -78, 58 -60, 40 -42 C 26 -30, 10 -36, 0 -42 Z" fill="var(--velvet)" fillOpacity="0.84" stroke="var(--champagne)" strokeWidth="1.1" />
          <circle cx="0" cy="-42" r="6" fill="var(--velvet)" stroke="var(--champagne)" strokeWidth="1.2" />
          {/* Foil gift tag */}
          <g transform="translate(26, -12) rotate(12)">
            <rect x="0" y="0" width="38" height="52" rx="2" fill="var(--surface)" stroke="var(--champagne)" strokeWidth="1.15" />
            <text x="19" y="31" textAnchor="middle" fill="var(--champagne-ink)" fontFamily="var(--font-display)" fontSize="14">VH</text>
          </g>
        </g>
      )}

      {variant === 'contact' && (
        <g transform="translate(130, 174)">
          {/* Eucalyptus sprig tucked behind envelope */}
          <path d="M -54 -68 C -26 -42, 6 -12, 54 48" fill="none" stroke="var(--champagne)" strokeWidth="1.25" />
          <ellipse cx="-42" cy="-54" rx="11" ry="6.5" transform="rotate(-30 -42 -54)" fill="var(--taupe)" fillOpacity="0.28" stroke="var(--champagne)" strokeWidth="1.1" />
          <ellipse cx="-24" cy="-68" rx="10" ry="6" transform="rotate(14 -24 -68)" fill="var(--taupe)" fillOpacity="0.24" stroke="var(--champagne)" strokeWidth="1.1" />
          <ellipse cx="-12" cy="-42" rx="9" ry="5.5" transform="rotate(-24 -12 -42)" fill="var(--taupe)" fillOpacity="0.22" stroke="var(--champagne)" strokeWidth="1.1" />

          {/* Appointment card peeking from linen envelope */}
          <rect x="-56" y="-44" width="112" height="72" rx="2" fill="var(--surface)" stroke="var(--champagne)" strokeWidth="1.2" />
          <line x1="-38" y1="-26" x2="38" y2="-26" stroke="var(--taupe)" strokeOpacity="0.55" strokeWidth="1" />
          <line x1="-26" y1="-14" x2="26" y2="-14" stroke="var(--taupe)" strokeOpacity="0.4" strokeWidth="1" />

          {/* Envelope body */}
          <rect x="-74" y="-8" width="148" height="92" rx="3" fill="var(--surface-soft)" stroke="var(--champagne)" strokeWidth="1.35" />
          <path d="M -74 -8 L 0 42 L 74 -8" fill="none" stroke="var(--champagne)" strokeWidth="1.3" />
          <path d="M -74 84 L -20 34 M 74 84 L 20 34" stroke="var(--taupe)" strokeOpacity="0.45" strokeWidth="1" />

          {/* Velvet VH wax seal */}
          <circle cx="0" cy="40" r="17" fill="var(--velvet)" stroke="var(--champagne)" strokeWidth="1.2" />
          <text x="0" y="45" textAnchor="middle" fill="#FBF7F1" fontFamily="var(--font-display)" fontSize="13">
            VH
          </text>

          {/* Slender fountain pen resting diagonally below */}
          <g transform="translate(24, 96) rotate(-14)">
            <rect x="-64" y="-3.5" width="96" height="7" rx="3.5" fill="var(--surface)" stroke="var(--taupe)" strokeWidth="1.2" />
            <polygon points="32,-3.5 48,0 32,3.5" fill="var(--champagne)" />
            <line x1="-18" y1="-3.5" x2="-18" y2="3.5" stroke="var(--champagne)" strokeWidth="2" />
          </g>
        </g>
      )}
    </svg>
  );
}

/**
 * Slender margin illustrations for the Treatments page (Facials right margin, Body left margin).
 */
export function TreatmentMarginArt({
  variant,
  className = '',
}: {
  variant: 'facials' | 'body';
  className?: string;
}) {
  return (
    <svg viewBox="0 0 220 360" className={`block h-auto w-full ${className}`} aria-hidden="true">
      <path
        d="M 16 350 L 16 112 A 94 94 0 0 1 204 112 L 204 350 Z"
        fill="var(--surface)"
        fillOpacity="0.6"
        stroke="var(--champagne)"
        strokeOpacity="0.45"
        strokeWidth="1.1"
      />
      {variant === 'facials' ? (
        <g transform="translate(110, 190)">
          {/* Tall botanical eucalyptus & ceramic serum dropper */}
          <path d="M -16 116 C -18 46, -6 -22, 16 -108" fill="none" stroke="var(--champagne)" strokeWidth="1.35" strokeLinecap="round" />
          <ellipse cx="-24" cy="36" rx="16" ry="9" transform="rotate(-24 -24 36)" fill="var(--taupe)" fillOpacity="0.22" stroke="var(--champagne)" strokeWidth="1.15" />
          <ellipse cx="14" cy="18" rx="15" ry="8.5" transform="rotate(24 14 18)" fill="var(--taupe)" fillOpacity="0.2" stroke="var(--champagne)" strokeWidth="1.15" />
          <ellipse cx="-16" cy="-22" rx="14" ry="8" transform="rotate(-26 -16 -22)" fill="var(--taupe)" fillOpacity="0.26" stroke="var(--champagne)" strokeWidth="1.15" />
          <ellipse cx="20" cy="-42" rx="13" ry="7.5" transform="rotate(22 20 -42)" fill="var(--taupe)" fillOpacity="0.22" stroke="var(--champagne)" strokeWidth="1.15" />
          <ellipse cx="-2" cy="-78" rx="11" ry="6.5" transform="rotate(-18 -2 -78)" fill="var(--taupe)" fillOpacity="0.28" stroke="var(--champagne)" strokeWidth="1.1" />
          {/* Silk mask bowl at base */}
          <path d="M -42 98 L 42 98 C 36 122, 20 132, 0 132 C -20 132, -36 122, -42 98 Z" fill="var(--surface-soft)" stroke="var(--champagne)" strokeWidth="1.3" />
          <path d="M -46 92 L 32 76" stroke="var(--taupe)" strokeWidth="2" strokeLinecap="round" />
        </g>
      ) : (
        <g transform="translate(110, 194)">
          {/* Rising oil aroma */}
          <path className="spa-steam" d="M 14 -64 C 8 -80, 22 -92, 16 -110" fill="none" stroke="var(--champagne)" strokeWidth="1.3" strokeLinecap="round" />
          {/* Warm oil pitcher */}
          <path d="M -4 -36 L 34 -36 L 44 48 C 44 64, 28 74, 14 74 C -2 74, -14 64, -14 48 Z" fill="var(--surface-soft)" stroke="var(--champagne)" strokeWidth="1.35" />
          <path d="M 34 -22 C 54 -16, 54 20, 40 28" fill="none" stroke="var(--champagne)" strokeWidth="1.35" />
          {/* Balanced basalt stone stack */}
          <ellipse cx="-18" cy="116" rx="46" ry="13" fill="var(--taupe)" fillOpacity="0.26" stroke="var(--text)" strokeOpacity="0.55" strokeWidth="1.3" />
          <ellipse cx="-20" cy="94" rx="33" ry="10.5" fill="var(--taupe)" fillOpacity="0.34" stroke="var(--text)" strokeOpacity="0.55" strokeWidth="1.3" />
          <ellipse cx="-17" cy="76" rx="20" ry="8" fill="var(--velvet)" fillOpacity="0.3" stroke="var(--champagne)" strokeWidth="1.25" />
        </g>
      )}
    </svg>
  );
}

/**
 * 404 illustration: "Between appointments".
 * An empty draped treatment table with a neatly folded towel, a single basalt stone resting on
 * the floor, and the Hour Dial with no arc and stopped hands.
 */
export function BetweenAppointmentsArt({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 460 320"
      className={`block h-auto w-full ${className}`}
      role="img"
      aria-label="Quiet treatment room with an empty draped table, folded towel, single stone on the floor, and a stopped Hour Dial"
    >
      {/* Arched quiet room alcove */}
      <path
        d="M 60 292 L 60 156 A 170 144 0 0 1 400 156 L 400 292 Z"
        fill="var(--surface)"
        stroke="var(--champagne)"
        strokeOpacity="0.55"
        strokeWidth="1.25"
      />
      <line x1="20" y1="292" x2="440" y2="292" stroke="var(--champagne)" strokeOpacity="0.5" strokeWidth="1.2" />

      {/* Wall-mounted Hour Dial with no arc and stopped hands */}
      <g transform="translate(230, 108)">
        <circle cx="0" cy="0" r="46" fill="var(--bg)" stroke="var(--champagne)" strokeWidth="1.3" />
        <circle cx="0" cy="0" r="38" fill="none" stroke="var(--taupe)" strokeOpacity="0.32" strokeWidth="0.9" strokeDasharray="2 3" />
        <line x1="0" y1="-44" x2="0" y2="-38" stroke="var(--champagne)" strokeWidth="1.3" />
        <line x1="44" y1="0" x2="38" y2="0" stroke="var(--champagne)" strokeWidth="1.3" />
        <line x1="0" y1="44" x2="0" y2="38" stroke="var(--champagne)" strokeWidth="1.3" />
        <line x1="-44" y1="0" x2="-38" y2="0" stroke="var(--champagne)" strokeWidth="1.3" />
        {/* Stopped hands */}
        <line x1="0" y1="0" x2="0" y2="-24" stroke="var(--taupe)" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="0" y1="0" x2="18" y2="9" stroke="var(--taupe)" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="0" cy="0" r="3" fill="var(--champagne)" />
      </g>

      {/* Empty draped treatment table */}
      <g transform="translate(230, 214)">
        <line x1="-96" y1="26" x2="-96" y2="78" stroke="var(--taupe)" strokeWidth="2.4" />
        <line x1="96" y1="26" x2="96" y2="78" stroke="var(--taupe)" strokeWidth="2.4" />
        <path d="M -112 4 L 112 4 L 116 54 Q 0 60 -116 54 Z" fill="var(--surface-soft)" stroke="var(--taupe)" strokeWidth="1.35" />
        {/* Neatly folded towel at center */}
        <rect x="-28" y="-12" width="56" height="16" rx="4" fill="var(--surface)" stroke="var(--champagne)" strokeWidth="1.25" />
        <line x1="-22" y1="-4" x2="22" y2="-4" stroke="var(--velvet)" strokeOpacity="0.65" strokeWidth="2.2" />
      </g>

      {/* Single basalt stone resting on the floor */}
      <ellipse cx="322" cy="285" rx="18" ry="6.5" fill="var(--taupe)" fillOpacity="0.4" stroke="var(--text)" strokeOpacity="0.6" strokeWidth="1.25" />
      <path d="M 314 283 Q 322 281 330 283" fill="none" stroke="var(--champagne)" strokeOpacity="0.65" strokeWidth="1" />
    </svg>
  );
}
