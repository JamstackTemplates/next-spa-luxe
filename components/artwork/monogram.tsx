import { useId } from 'react';

/**
 * The Velvet Hour monogram: "VH" set in Italiana inside a small gilt Hour Dial ring.
 */
export function Monogram({
  size = 40,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id={`vh-gilt-${uid}`} x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--champagne-light)" />
          <stop offset="100%" stopColor="var(--champagne-deep)" />
        </linearGradient>
      </defs>
      <circle
        cx="32"
        cy="32"
        r="29"
        fill="var(--surface)"
        fillOpacity="0.65"
        stroke="var(--champagne)"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      <circle
        cx="32"
        cy="32"
        r="25"
        fill="none"
        stroke={`url(#vh-gilt-${uid})`}
        strokeWidth="1.75"
        strokeDasharray="118 39"
        transform="rotate(-90 32 32)"
        strokeLinecap="round"
      />
      {/* 12 cardinal ticks */}
      <line x1="32" y1="3" x2="32" y2="7" stroke="var(--champagne)" strokeWidth="1.2" />
      <line x1="61" y1="32" x2="57" y2="32" stroke="var(--champagne)" strokeWidth="1.2" />
      <line x1="32" y1="61" x2="32" y2="57" stroke="var(--champagne)" strokeWidth="1.2" />
      <line x1="3" y1="32" x2="7" y2="32" stroke="var(--champagne)" strokeWidth="1.2" />
      <text
        x="32"
        y="38.5"
        textAnchor="middle"
        fill="var(--text)"
        fontFamily="var(--font-display)"
        fontSize="21"
        letterSpacing="1"
      >
        VH
      </text>
    </svg>
  );
}

/**
 * Embossed velvet wax seal stamped with the VH monogram (used on The Velvet Hour signature package
 * and stationery vignettes).
 */
export function WaxSeal({
  label = 'Signature',
  className = '',
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 56 56" width="38" height="38" aria-hidden="true" className="shrink-0">
        <path
          d="M28 3 C34 2, 41 5, 46 10 C51 15, 54 22, 53 29 C52 36, 49 43, 43 48 C37 52, 30 54, 23 52 C16 51, 9 47, 6 40 C3 33, 3 25, 6 18 C9 11, 16 5, 23 4 Z"
          fill="var(--velvet)"
        />
        <circle
          cx="28"
          cy="28"
          r="19"
          fill="none"
          stroke="var(--champagne-light)"
          strokeOpacity="0.7"
          strokeWidth="1.1"
        />
        <circle
          cx="28"
          cy="28"
          r="16"
          fill="none"
          stroke="var(--champagne-light)"
          strokeOpacity="0.4"
          strokeWidth="0.7"
          strokeDasharray="2 2.5"
        />
        <text
          x="28"
          y="33"
          textAnchor="middle"
          fill="#F7EFE4"
          fontFamily="var(--font-display)"
          fontSize="14.5"
          letterSpacing="0.8"
        >
          VH
        </text>
      </svg>
      <span className="eyebrow text-velvet">{label}</span>
    </span>
  );
}
