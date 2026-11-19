import type { ReactNode } from 'react';
import { EucalyptusCorner } from './artwork/dividers';
import { HourRings } from './artwork/hour-rings';
import { PageHeadVignette } from './artwork/illustrations';

/**
 * Inner-page header in the house's afternoon light: an oversized Italiana title and
 * one-line introduction left; a tall arch-topped vignette right, hung inside the hall
 * clock's rings like the dial in the Home arch. The dial unrolled forms the base line.
 */
export function PageHead({
  eyebrow,
  title,
  children,
  id,
  vignette,
  actions,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  vignette?: 'treatments' | 'packages' | 'gift-cards' | 'contact';
  actions?: ReactNode;
}) {
  return (
    <header className="sky-afternoon relative isolate overflow-hidden">
      <EucalyptusCorner className="absolute -top-3 -left-2 opacity-65 sm:opacity-80" />

      <div className="wrap relative grid items-center gap-8 pt-14 pb-12 sm:pt-20 sm:pb-16 md:grid-cols-12">
        <div className="relative z-10 md:col-span-8">
          <p className="flex items-center gap-3 eyebrow text-champagne-ink">
            <span aria-hidden="true" className="h-px w-10 bg-champagne" />
            {eyebrow}
          </p>
          <h1
            id={id}
            className="mt-5 max-w-[13ch] font-display text-[clamp(3.1rem,8vw,7.4rem)] leading-[0.92] tracking-[-0.025em] text-ink"
          >
            {title}
          </h1>
          {children ? (
            <div className="mt-6 max-w-(--measure) text-[1.06rem] leading-relaxed text-muted sm:text-[1.15rem]">
              {children}
            </div>
          ) : null}
          {actions ? <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div> : null}
        </div>

        {vignette ? (
          <div className="relative mx-auto w-48 sm:w-60 md:col-span-4 md:mr-0 md:ml-auto md:w-72">
            <HourRings
              turning
              numerals={false}
              className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[260%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-60"
            />
            <PageHeadVignette variant={vignette} />
          </div>
        ) : null}
      </div>

      <div className="wrap" aria-hidden="true">
        <div className="tick-rule" />
      </div>
    </header>
  );
}
