import type { CSSProperties, ReactNode } from 'react';
import { business } from '../content/business';
import type { ResolvedCouplesTreatment } from '../content/couples';
import type { ResolvedPackage } from '../content/packages';
import { formatUsd, type Treatment } from '../content/treatments';
import { asset } from '../lib/paths';
import {
  EucalyptusCorner,
  StoneStackBullet,
  StreetCornerSketch,
  VelvetRibbonDivider,
} from './artwork/dividers';
import { HourDial } from './artwork/hour-dial';
import { DuskHorizon, HourRings } from './artwork/hour-rings';
import { SpaIcon, type SpaIconName } from './artwork/icons';
import { CouplesSuiteScene, GiftCardArt } from './artwork/illustrations';
import { WaxSeal } from './artwork/monogram';
import { HoursTable, OpenBadge } from './open-badge';
import { PackageDialCard } from './package-dial-card';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

/*
 * Home is one passing hour. Each section is stamped with its minute on the house dial,
 * and the light moves from afternoon linen, through golden hour and a dusk horizon over
 * Forsyth Park, into velvet evening. Copy lives in app/page.tsx; these components own
 * the composition, art direction and semantics.
 */

type ContentProps = { children: ReactNode };

/** Giant gilt minute stamp: the section's place in the hour (decorative). */
export function MinuteStamp({ minute, className = '' }: { minute: string; className?: string }) {
  return (
    <span aria-hidden="true" className={`minute-stamp gilt-text ${className}`}>
      {minute}
    </span>
  );
}

const sectionLink =
  'inline-flex items-center gap-2 font-sans text-xs font-medium tracking-[0.2em] text-champagne-ink uppercase underline decoration-gilt-line underline-offset-[0.5em] transition-colors hover:decoration-champagne-ink';

const heroImages = {
  '--hero-light': `url("${asset('/spa-light.webp')}")`,
  '--hero-dark': `url("${asset('/spa-dark.webp')}")`,
} as CSSProperties;

/* ============================================================================
   :00 — Hero. Afternoon light; the hall clock hangs in the arch like a low sun,
   its rings spreading across the whole first screen. The headline crosses the arch.
   ============================================================================ */
function HomeHeroRoot({ children }: ContentProps) {
  return (
    <section aria-label="Introduction" className="sky-afternoon relative isolate overflow-hidden">
      <div className="wrap relative grid lg:min-h-[calc(100svh-5rem)] lg:grid-cols-12">
        <div className="spa-no-print relative -mx-3 sm:mx-0 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:mt-2">
          {/* Clock rings centred on the dial inside the arch */}
          <HourRings
            turning
            numerals={false}
            arcMinutes={60}
            arcWidth={2}
            className="absolute top-[24.5%] left-1/2 -z-10 aspect-square w-[260%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-35 sm:w-[190%] sm:opacity-60 lg:w-[175%] lg:opacity-80"
          />
          <div
            role="img"
            aria-label="A gilt clock in an arched window overlooking Forsyth Park, with a folded spa robe and a steaming copper basin in the foreground"
            className="hero-art mx-auto h-[min(40svh,22rem)] max-w-[30rem] rounded-t-[50%_22%] bg-cover bg-top sm:h-[30rem] lg:mr-0 lg:aspect-[1792/2400] lg:h-[clamp(30rem,calc(100svh-9rem),53rem)] lg:max-w-full lg:rounded-t-[50%_20%]"
            style={heroImages}
          />
        </div>

        {/* Copy column: crosses into the arch at desktop */}
        <div className="relative z-10 pt-5 pb-12 sm:pt-8 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:self-center lg:bg-[radial-gradient(ellipse_62%_58%_at_28%_62%,var(--bg)_58%,transparent)] lg:py-20">
          {children}
        </div>
      </div>

      {/* The dial unrolled into a horizon: :00 to :60 */}
      <div className="wrap relative pb-6" aria-hidden="true">
        <div className="tick-rule" />
        <div className="mt-2 flex justify-between font-sans text-[0.65rem] tracking-[0.24em] text-muted tabular-nums">
          <span>:00</span>
          <span>:15</span>
          <span>:30</span>
          <span>:45</span>
          <span>:60</span>
        </div>
      </div>
    </section>
  );
}

function HeroWordmark({ children }: ContentProps) {
  return (
    <p className="flex items-center gap-3 eyebrow text-champagne-ink">
      <span aria-hidden="true" className="h-px w-10 bg-champagne" />
      {children}
    </p>
  );
}

function HeroLead({ children }: ContentProps) {
  return (
    <h1 className="mt-4 font-display text-[clamp(2.9rem,7.4vw,7.6rem)] leading-[0.94] tracking-[-0.025em] text-ink sm:mt-6 lg:whitespace-nowrap">
      {children}
    </h1>
  );
}

/** Gilt-foil words inside the lead. */
function HeroGilt({ children }: ContentProps) {
  return <span className="gilt-text">{children}</span>;
}

function HeroIntroduction({ children }: ContentProps) {
  return (
    <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-muted sm:mt-7 sm:text-[1.12rem] lg:max-w-[26rem]">
      {children}
    </p>
  );
}

function HeroActions({
  primaryLabel,
  secondaryLabel,
}: {
  primaryLabel: string;
  secondaryLabel: string;
}) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-8">
      <SiteLink href="/contact/" className="button">
        {primaryLabel}
      </SiteLink>
      <SiteLink href="/gift-cards/" className="button button-quiet">
        {secondaryLabel}
      </SiteLink>
    </div>
  );
}

function HeroHoursBadge() {
  return (
    <div className="mt-5 sm:mt-8">
      <OpenBadge hours={business.hours} />
    </div>
  );
}

export const HomeHero = Object.assign(HomeHeroRoot, {
  Wordmark: HeroWordmark,
  Lead: HeroLead,
  Gilt: HeroGilt,
  Introduction: HeroIntroduction,
  Actions: HeroActions,
  HoursBadge: HeroHoursBadge,
});

/* ============================================================================
   :05 — Three ways in. Three doorways of a townhouse hall, stepping down like
   a staircase: the long way through the house. Not a card grid.
   ============================================================================ */
function ThreeWaysRoot({ children }: ContentProps) {
  return (
    <section aria-labelledby="three-ways-heading" className="sky-linen relative overflow-hidden py-20 sm:py-28">
      <div className="wrap">{children}</div>
    </section>
  );
}

function ThreeWaysHeader({ eyebrow, heading, minute = ':05' }: { eyebrow: string; heading: string; minute?: string }) {
  return (
    <div className="grid items-end gap-4 md:grid-cols-12 md:gap-8">
      <MinuteStamp minute={minute} className="md:col-span-4" />
      <div className="md:col-span-8 md:pb-3">
        <p className="eyebrow text-champagne-ink">{eyebrow}</p>
        <h2 id="three-ways-heading" className="mt-3 max-w-[16ch] font-display text-[clamp(2.4rem,5.4vw,4.8rem)] leading-[0.98] text-ink">
          {heading}
        </h2>
      </div>
    </div>
  );
}

function ThreeWaysRow({ children }: ContentProps) {
  return (
    <div className="relative mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-12 [&>*:nth-child(2)]:md:mt-20 [&>*:nth-child(3)]:md:mt-40">
      {/* A gilt hairline the doorways step down along */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-24 left-0 hidden h-px w-full origin-left rotate-[6deg] bg-gilt-line md:block"
      />
      {children}
    </div>
  );
}

function ThreeWaysDoorway({
  numeral,
  icons,
  title,
  href,
  linkLabel,
  children,
}: {
  numeral: string;
  icons: readonly SpaIconName[];
  title: string;
  href: string;
  linkLabel: string;
  children: ReactNode;
}) {
  return (
    <article className="arch-frame group relative flex flex-col items-center bg-[linear-gradient(180deg,var(--surface-soft),var(--bg)_58%)] px-7 pt-10 pb-10 text-center transition-[transform,box-shadow] md:min-h-[32rem] duration-500 hover:-translate-y-1.5 hover:shadow-[var(--sheet-shadow)]">
      {/* Inner arch hairline */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-t-full border border-line" />
      <span aria-hidden="true" className="gilt-text relative font-display text-[clamp(5rem,9vw,8rem)] leading-[0.9]">
        {numeral}
      </span>

      <div className="relative mt-5 flex items-center gap-3 text-champagne-ink" aria-hidden="true">
        {icons.map((icon) => (
          <span key={icon} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gilt-line bg-surface">
            <SpaIcon name={icon} size={20} />
          </span>
        ))}
      </div>

      <h3 className="relative mt-6 font-display md:mt-auto md:pt-8 text-[2.4rem] leading-none text-ink">{title}</h3>
      <p className="relative mt-4 max-w-xs text-[0.97rem] text-muted">{children}</p>

      <SiteLink href={href} className={`relative mt-7 ${sectionLink}`}>
        <span>{linkLabel}</span>
        <SpaIcon name="arrow-right" size={14} />
      </SiteLink>
    </article>
  );
}

export const ThreeWays = Object.assign(ThreeWaysRoot, {
  Header: ThreeWaysHeader,
  Row: ThreeWaysRow,
  Doorway: ThreeWaysDoorway,
});

/* ============================================================================
   :15 — Signature itinerary. Taupe band; the package dial at hall-clock scale,
   wrapped in the house rings, beside the printed itinerary.
   ============================================================================ */
export function SignatureBand({
  eyebrow,
  heading,
  intro,
  pkg,
  ctaLabel,
  minute = ':15',
}: {
  eyebrow: string;
  heading: string;
  intro: string;
  pkg: ResolvedPackage;
  ctaLabel: string;
  minute?: string;
}) {
  return (
    <section aria-labelledby="signature-package-heading" className="sky-taupe relative overflow-hidden py-20 sm:py-28">
      <div className="wrap">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow text-velvet">{eyebrow}</p>
            <h2
              id="signature-package-heading"
              className="mt-3 font-display text-[clamp(3.2rem,9vw,8.6rem)] leading-[0.9] tracking-[-0.02em] text-ink"
            >
              {heading}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <MinuteStamp minute={minute} className="hidden text-right lg:block" />
            <p className="mt-4 max-w-md text-[1.02rem] text-muted">{intro}</p>
          </div>
        </div>

        <div className="mt-14 sm:mt-20">
          <PackageDialCard pkg={pkg} ctaLabel={ctaLabel} ctaHref="/contact/" dialScale="hero" />
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   :30 — From the menu. Golden hour; two printed sheets stacked on the linen,
   the front one slightly turned, with the minute stamp in the margin.
   ============================================================================ */
export function FeaturedMenuSheet({
  eyebrow,
  heading,
  note,
  items,
  footerLinkLabel,
  minute = ':30',
}: {
  eyebrow: string;
  heading: string;
  note: string;
  items: readonly Treatment[];
  footerLinkLabel: string;
  minute?: string;
}) {
  return (
    <section aria-labelledby="featured-menu-heading" className="sky-golden relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div className="wrap grid items-start gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3 lg:pt-10">
          <MinuteStamp minute={minute} />
          <p className="mt-6 eyebrow text-champagne-ink">{eyebrow}</p>
          <p className="mt-3 max-w-xs text-sm text-muted">{note}</p>
        </div>

        <div className="relative lg:col-span-8 lg:col-start-5">
          {/* The sheet underneath */}
          <div aria-hidden="true" className="printed-sheet absolute inset-0 hidden translate-x-5 translate-y-4 rotate-[2.4deg] md:block" />
          <div className="printed-sheet relative p-8 sm:p-14 md:-rotate-[1.1deg] md:transition-transform md:duration-700 md:hover:rotate-0">
            <EucalyptusCorner className="absolute -top-4 -right-6 rotate-90 opacity-80" />
            <div className="text-center">
              <WaxSeal label="The house menu" className="mx-auto" />
              <h2 id="featured-menu-heading" className="mt-4 font-display text-[clamp(2.5rem,5.2vw,4.4rem)] leading-none text-ink">
                {heading}
              </h2>
            </div>

            <ul className="mt-12 space-y-9">
              {items.map((item) => {
                const first = item.options[0];
                const extraOption = item.options[1];
                return (
                  <li key={item.id}>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                      <h3 className="font-display text-[1.75rem] leading-tight text-ink sm:text-[2rem]">{item.name}</h3>
                      <span className="menu-leader hidden sm:block" aria-hidden="true" />
                      <div className="flex items-center gap-2.5">
                        <HourDial minutes={first.minutes} size="sm" decorative />
                        <span className="font-sans text-xs tracking-[0.12em] text-muted uppercase tabular-nums">
                          {first.minutes} min
                        </span>
                        <span className="price-label">{formatUsd(first.priceUsd)}</span>
                        {extraOption ? (
                          <span className="font-sans text-xs text-muted tabular-nums">
                            · {extraOption.minutes} min {formatUsd(extraOption.priceUsd)}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <p className="mt-1.5 max-w-lg text-[0.95rem] text-muted">{item.description}</p>
                  </li>
                );
              })}
            </ul>

            <div className="mt-12 border-t border-gilt-line pt-7 text-center">
              <SiteLink href="/treatments/" className={sectionLink}>
                <span>{footerLinkLabel}</span>
                <SpaIcon name="arrow-right" size={14} />
              </SiteLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   :35 — Dusk. The hinge of the page: the dial sets behind the park's live oaks.
   ============================================================================ */
export function DuskTransition() {
  return <DuskHorizon className="-mt-px" />;
}

/** Everything inside passes into velvet evening, in either colour scheme. */
export function Evening({ children }: ContentProps) {
  return (
    <div className="hour-evening" data-ends-evening>
      {children}
    </div>
  );
}

/* ============================================================================
   :40 — The Magnolia Suite by candlelight: the suite bleeds off the left edge.
   ============================================================================ */
export function CouplesTeaser({
  eyebrow,
  heading,
  description,
  featuredCouples,
  ctaLabel,
  minute = ':40',
}: {
  eyebrow: string;
  heading: string;
  description: string;
  featuredCouples: readonly ResolvedCouplesTreatment[];
  ctaLabel: string;
  minute?: string;
}) {
  return (
    <section aria-labelledby="couples-teaser-heading" className="sky-candle relative overflow-hidden pt-10 pb-20 sm:pb-28">
      <div className="mx-auto grid max-w-[96rem] items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <div className="arch-frame overflow-hidden rounded-tl-none! rounded-tr-[999px]! border-l-0 bg-bg">
            <CouplesSuiteScene />
          </div>
        </div>

        <div className="px-5 sm:px-10 lg:col-span-5 lg:pr-14">
          <MinuteStamp minute={minute} />
          <p className="mt-6 eyebrow text-velvet">{eyebrow}</p>
          <h2 id="couples-teaser-heading" className="mt-3 font-display text-[clamp(2.6rem,5.2vw,4.6rem)] leading-[0.98] text-ink">
            {heading}
          </h2>
          <p className="mt-5 max-w-md text-muted">{description}</p>

          <dl className="mt-8 divide-y divide-line border-y border-gilt-line">
            {featuredCouples.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 py-4">
                <dt className="flex items-center gap-3.5">
                  <HourDial minutes={item.totalMinutes} size="sm" decorative />
                  <div>
                    <span className="block font-display text-[1.45rem] leading-tight text-ink">{item.name}</span>
                    <span className="block text-xs text-muted">
                      {item.totalMinutes} min
                      {item.suiteMinutes > 0 ? ` · includes ${item.suiteMinutes} min soaking tub` : ''}
                    </span>
                  </div>
                </dt>
                <dd className="shrink-0 text-right">
                  <span className="price-label block">{formatUsd(item.pricePerCoupleUsd)}</span>
                  <span className="block font-sans text-[0.68rem] tracking-[0.12em] text-muted uppercase">per couple</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <SiteLink href="/packages/#couples" className="button button-quiet">
              {ctaLabel}
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   :45 — Gift cards on plum velvet, fanned wide like a hand of cards.
   ============================================================================ */
export function GiftCardBand({
  eyebrow,
  heading,
  pitch,
  ctaLabel,
  minute = ':45',
}: {
  eyebrow: string;
  heading: string;
  pitch: string;
  ctaLabel: string;
  minute?: string;
}) {
  return (
    <section aria-labelledby="gift-card-band-heading" className="sky-plum relative overflow-hidden pb-24 sm:pb-32">
      <VelvetRibbonDivider className="mb-10 sm:mb-16" />

      <div className="wrap grid items-center gap-14 lg:grid-cols-12">
        <div className="relative mx-auto w-full max-w-2xl lg:col-span-7">
          <MinuteStamp minute={minute} className="absolute -top-10 -left-2 opacity-35 sm:-top-16" />
          <div className="relative h-[17rem] sm:h-[24rem] lg:h-[27rem]">
            <div className="absolute top-12 left-0 w-[62%] origin-bottom-right -rotate-[11deg] drop-shadow-2xl transition-transform duration-700 hover:-rotate-[14deg]">
              <GiftCardArt finish="taupe-linen" valueLabel="$150" subtitle="The Velvet Hour" />
            </div>
            <div className="absolute top-14 right-0 w-[62%] origin-bottom-left rotate-[10deg] drop-shadow-2xl transition-transform duration-700 hover:rotate-[13deg]">
              <GiftCardArt finish="velvet-ribbon-box" valueLabel="$250" subtitle="Gift Presentation" />
            </div>
            <div className="absolute top-0 left-[17%] z-10 w-[66%] drop-shadow-2xl transition-transform duration-700 hover:-translate-y-2">
              <GiftCardArt finish="champagne-foil" valueLabel="$345" subtitle="The Velvet Hour" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <p className="eyebrow text-champagne-ink">{eyebrow}</p>
          <h2 id="gift-card-band-heading" className="mt-3 font-display text-[clamp(2.6rem,5.4vw,4.8rem)] leading-[0.98] text-ink">
            {heading}
          </h2>
          <p className="mt-5 max-w-md text-[1.04rem] text-muted">{pitch}</p>
          <div className="mt-9">
            <SiteLink href="/gift-cards/" className="button button-on-velvet">
              {ctaLabel}
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   :50 — Before you arrive. A tall arch-topped hotel card under the lamp.
   ============================================================================ */
export function EtiquetteCard({
  eyebrow,
  heading,
  intro,
  minute = ':50',
}: {
  eyebrow: string;
  heading: string;
  intro: string;
  minute?: string;
}) {
  return (
    <section aria-labelledby="etiquette-heading" className="sky-lamp relative overflow-hidden py-20 sm:py-28">
      <MinuteStamp
        minute={minute}
        className="pointer-events-none absolute top-1/2 left-[4%] hidden -translate-y-1/2 text-[clamp(10rem,22vw,20rem)]! opacity-25 lg:block"
      />
      <div className="wrap">
        <div className="printed-sheet printed-arch relative mx-auto max-w-2xl bg-bg! px-8 pt-28 pb-14 sm:px-16 sm:pt-36 sm:pb-16">
          <div className="text-center">
            <p className="eyebrow text-champagne-ink">{eyebrow}</p>
            <h2 id="etiquette-heading" className="mt-3 font-display text-[clamp(2.5rem,5vw,4.2rem)] leading-none text-ink">
              {heading}
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-sm text-muted">{intro}</p>
          </div>

          <ul className="mt-12 space-y-7 border-t border-gilt-line pt-10">
            {business.arrivalNotes.map((note) => (
              <li key={note.id} className="flex items-start gap-5">
                <StoneStackBullet className="mt-1.5" />
                <div>
                  <h3 className="font-display text-[1.5rem] leading-tight text-ink">{note.title}</h3>
                  <p className="mt-1 text-[0.93rem] leading-relaxed text-muted">{note.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   :55 — Visit. The dark green door under the gilt lamp, and the hours.
   ============================================================================ */
export function VisitBand({
  eyebrow,
  heading,
  ctaLabel,
  minute = ':55',
}: {
  eyebrow: string;
  heading: string;
  ctaLabel: string;
  minute?: string;
}) {
  return (
    <section aria-labelledby="visit-band-heading" className="relative overflow-hidden py-20 sm:py-28">
      <div className="wrap grid items-start gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <MinuteStamp minute={minute} />
          <p className="mt-6 eyebrow text-velvet">{eyebrow}</p>
          <h2 id="visit-band-heading" className="mt-3 font-display text-[clamp(2.6rem,5.4vw,4.8rem)] leading-[0.98] text-ink">
            {heading}
          </h2>
          <p className="mt-5 text-lg text-ink">{business.address.formatted}</p>
          <p className="mt-1 text-muted">{business.address.landmark}.</p>
          <p className="mt-2 text-sm text-muted italic">{business.address.directions}</p>

          <div className="mt-8 max-w-lg">
            <StreetCornerSketch />
          </div>
        </div>

        <div className="printed-sheet p-7 sm:p-10 lg:col-span-6 lg:mt-24">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5">
            <h3 className="font-display text-[2.2rem] leading-none text-ink">Townhouse hours</h3>
            <OpenBadge hours={business.hours} />
          </div>

          <HoursTable hours={business.hours} />
          <TimeZoneNote />

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-gilt-line pt-6">
            <div className="text-sm">
              <a className="text-link block wrap-anywhere" href={`mailto:${business.email}`}>
                {business.email}
              </a>
              <a className="text-link mt-1 block" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>
                {business.phone}
              </a>
            </div>
            <SiteLink href="/contact/" className="button">
              {ctaLabel}
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}
