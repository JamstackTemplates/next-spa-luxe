'use client';

import { useState } from 'react';
import type { ResolvedPackage } from '../content/packages';
import { formatMinutes, formatUsd } from '../content/treatments';
import { HourDial, type DialSegment } from './artwork/hour-dial';
import { HourRings } from './artwork/hour-rings';
import { WaxSeal } from './artwork/monogram';
import { SiteLink } from './site-link';

const SEGMENT_TONES: readonly NonNullable<DialSegment['tone']>[] = [
  'champagne',
  'velvet',
  'taupe',
  'bronze',
];

const SWATCH_CLASS: Record<NonNullable<DialSegment['tone']>, string> = {
  champagne: 'bg-champagne',
  velvet: 'bg-velvet',
  taupe: 'bg-taupe',
  bronze: 'bg-primary',
};

function formatOffset(minutesFromStart: number): string {
  const h = Math.floor(minutesFromStart / 60);
  const m = minutesFromStart % 60;
  return `${h}:${String(m).padStart(2, '0')}`;
}

export function PackageDialCard({
  pkg,
  reverse = false,
  ctaLabel = 'Request this package',
  ctaHref = '/contact/',
  showCta = true,
  dialScale = 'standard',
}: {
  pkg: ResolvedPackage;
  reverse?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  showCta?: boolean;
  /** 'hero' renders the dial at hall-clock scale inside the house rings. */
  dialScale?: 'standard' | 'hero';
}) {
  const hero = dialScale === 'hero';
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const segments: DialSegment[] = pkg.steps.map((step, index) => ({
    label: step.treatment.name,
    minutes: step.minutes,
    tone: SEGMENT_TONES[index % SEGMENT_TONES.length],
  }));

  let elapsed = 0;
  const timelineRows = pkg.steps.map((step, index) => {
    const startOffset = elapsed;
    elapsed += step.minutes;
    return {
      step,
      index,
      startOffset,
      tone: SEGMENT_TONES[index % SEGMENT_TONES.length],
    };
  });

  return (
    <article
      className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
      aria-labelledby={`pkg-${pkg.id}`}
    >
      {/* Interactive Hour Dial column */}
      <div
        className={`flex flex-col items-center justify-center lg:col-span-5 ${
          reverse ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        <div className="relative isolate flex items-center justify-center p-2">
          <HourRings
            className={`absolute top-1/2 left-1/2 -z-10 aspect-square max-w-none -translate-x-1/2 -translate-y-1/2 ${
              hero ? 'w-[150%] opacity-80' : 'w-[128%] opacity-45'
            }`}
            numerals={hero}
          />
          <HourDial
            className={hero ? 'h-auto w-[min(76vw,27rem)]' : 'h-auto w-[min(70vw,18rem)]'}
            segments={segments}
            size="xl"
            centerLabel={formatMinutes(pkg.totalMinutes)}
            centerSublabel="Itinerary"
            activeSegmentIndex={activeIndex}
            onSegmentFocus={setActiveIndex}
            animate
            decorative={false}
            ariaLabel={`${pkg.name} Hour Dial: ${formatMinutes(pkg.totalMinutes)} across ${pkg.steps.length} treatments`}
          />
        </div>
        <p className="mt-2 text-center font-sans text-[0.72rem] tracking-[0.16em] text-muted uppercase">
          Hover or focus a step to trace its arc
        </p>
        {/* Accessible breakdown always available to screen readers without hover */}
        <ul className="sr-only">
          {timelineRows.map(({ step, index }) => (
            <li key={`${pkg.id}-sr-${step.treatmentId}-${index}`}>
              Step {index + 1}: {step.treatment.name}, {step.minutes} minutes
            </li>
          ))}
        </ul>
      </div>

      {/* Printed appointment itinerary card */}
      <div
        className={`printed-sheet p-7 sm:p-10 lg:col-span-7 ${
          reverse ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gilt-line pb-5">
          <div>
            {pkg.signature ? <WaxSeal label="House Signature" className="mb-3" /> : null}
            <h3 id={`pkg-${pkg.id}`} className="font-display text-3xl text-ink sm:text-4xl">
              {pkg.name}
            </h3>
            <p className="mt-2 max-w-xl text-[0.98rem] text-muted">{pkg.tagline}</p>
          </div>

          <div className="text-left sm:text-right">
            <p className="font-display text-4xl leading-none text-ink tabular-nums">
              {formatUsd(pkg.priceUsd)}
            </p>
            <p className="mt-1.5 font-sans text-xs font-medium tracking-[0.14em] text-champagne-ink uppercase">
              Saving {formatUsd(pkg.savingsUsd)} vs. individual treatments
            </p>
          </div>
        </div>

        {/* Ordered itinerary steps paired to dial arcs */}
        <ol className="mt-6 divide-y divide-line/60">
          {timelineRows.map(({ step, index, startOffset, tone }) => {
            const highlighted = activeIndex === index;
            return (
              <li key={`${pkg.id}-${step.treatmentId}-${index}`}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onFocus={() => setActiveIndex(index)}
                  onBlur={() => setActiveIndex(null)}
                  className={`flex w-full items-baseline justify-between gap-3 px-2.5 py-3 text-left transition-colors ${
                    highlighted ? 'bg-champagne/14' : 'hover:bg-surface-soft/50'
                  }`}
                >
                  <span className="flex items-baseline gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full ${SWATCH_CLASS[tone]}`}
                    />
                    <span className="font-sans text-xs tracking-[0.12em] text-muted tabular-nums">
                      +{formatOffset(startOffset)}
                    </span>
                    <span className="font-display text-xl text-ink">{step.treatment.name}</span>
                  </span>
                  <span className="shrink-0 font-sans text-xs font-medium tracking-[0.14em] text-muted uppercase tabular-nums">
                    {step.minutes} min
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Extras & enquiry CTA */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gilt-line pt-5">
          <div className="text-sm text-muted">
            <span className="eyebrow mr-2 text-ink">Includes:</span>
            {pkg.extras.join(' · ')}
          </div>
          {showCta ? (
            <SiteLink href={ctaHref} className="button">
              {ctaLabel}
            </SiteLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}
