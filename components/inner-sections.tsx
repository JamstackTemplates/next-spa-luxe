import type { ReactNode } from 'react';
import { business } from '../content/business';
import type { ResolvedCouplesTreatment } from '../content/couples';
import {
  giftCardDeliveryOptions,
  giftCardFinishes,
  giftCardTerms,
  type ResolvedGiftExperience,
} from '../content/gift-cards';
import { packageInclusions, type ResolvedPackage } from '../content/packages';
import { formatUsd } from '../content/treatments';
import { SteamDivider, VelvetRibbonDivider } from './artwork/dividers';
import { HourDial } from './artwork/hour-dial';
import { HourRings } from './artwork/hour-rings';
import { SpaIcon } from './artwork/icons';
import {
  BetweenAppointmentsArt,
  CouplesSuiteScene,
  GiftCardArt,
} from './artwork/illustrations';
import { CopyEmail } from './copy-email';
import { GoogleMap } from './google-map';
import { JamstacksSupportForm } from './jamstacks-support-form';
import { HoursTable, OpenBadge } from './open-badge';
import { PackageDialCard } from './package-dial-card';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

/* ============================================================================
   Treatments page — Final ribbon prompt band
   ============================================================================ */
export function TreatmentsPromptBand({
  eyebrow,
  heading,
  body,
  ctaLabel,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel: string;
}) {
  return (
    <section aria-labelledby="treatments-prompt-heading" className="bg-surface-soft pb-18">
      <VelvetRibbonDivider className="mb-10" />
      <div className="wrap-narrow text-center">
        <p className="eyebrow text-velvet">{eyebrow}</p>
        <h2 id="treatments-prompt-heading" className="mt-3 font-display text-4xl text-ink sm:text-5xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">{body}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <SiteLink href="/contact/" className="button">
            {ctaLabel}
          </SiteLink>
          <SiteLink href="/packages/" className="button button-quiet">
            Explore packages
          </SiteLink>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   Packages & Couples page sections
   ============================================================================ */
export function PackagesListSection({
  items,
}: {
  items: readonly ResolvedPackage[];
}) {
  return (
    <section aria-label="Multi-treatment packages" className="wrap space-y-20 py-16 sm:py-22">
      {items.map((pkg, index) => (
        <div key={pkg.id}>
          {index > 0 ? <SteamDivider className="mb-16" /> : null}
          <PackageDialCard
            pkg={pkg}
            reverse={index % 2 === 1}
            ctaLabel={`Request ${pkg.name}`}
          />
        </div>
      ))}
    </section>
  );
}

export function CouplesSuiteSection({
  eyebrow,
  heading,
  intro,
  items,
  ctaLabel,
}: {
  eyebrow: string;
  heading: string;
  intro: string;
  items: readonly ResolvedCouplesTreatment[];
  ctaLabel: string;
}) {
  return (
    <section id="couples" aria-labelledby="couples-heading" className="border-t border-gilt-line bg-surface">
      {/* Full-bleed suite illustration band */}
      <div className="bg-surface-soft py-14 sm:py-18">
        <div className="wrap grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-velvet">{eyebrow}</p>
            <h2 id="couples-heading" className="mt-3 font-display text-[clamp(2.3rem,4.6vw,3.6rem)] text-ink">
              {heading}
            </h2>
            <p className="mt-4 text-muted">{intro}</p>
          </div>
          <div className="lg:col-span-7">
            <div className="overflow-hidden border border-gilt-line bg-bg">
              <CouplesSuiteScene />
            </div>
          </div>
        </div>
      </div>

      {/* Two-column wine-list style sheet for couples' treatments */}
      <div className="wrap py-16 sm:py-20">
        <div className="printed-sheet p-8 sm:p-12">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4 border-b border-gilt-line pb-5">
            <div>
              <p className="eyebrow text-champagne-ink">Magnolia Suite menu</p>
              <h3 className="mt-1 font-display text-3xl text-ink">Side-by-side &amp; soaking rituals</h3>
            </div>
            <p className="font-sans text-xs tracking-[0.16em] text-muted uppercase">
              All rates shown per couple
            </p>
          </div>

          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {items.map((item) => (
              <article key={item.id} className="flex flex-col justify-between border-b border-line/70 pb-8 md:last:border-b-0 md:[&:nth-last-child(2)]:border-b-0">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <HourDial minutes={item.totalMinutes} size="sm" decorative />
                      <div>
                        <h4 className="font-display text-2xl text-ink">{item.name}</h4>
                        <p className="font-sans text-xs tracking-[0.12em] text-muted uppercase tabular-nums">
                          {item.totalMinutes} min total
                          {item.suiteMinutes > 0 ? ` · ${item.suiteMinutes} min private tub` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-display text-3xl leading-none text-ink tabular-nums">
                        {formatUsd(item.pricePerCoupleUsd)}
                      </p>
                      <p className="mt-1 font-sans text-[0.68rem] font-medium tracking-[0.14em] text-champagne-ink uppercase">
                        per couple
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted">{item.description}</p>
                  <ul className="mt-3 space-y-1 text-xs text-muted">
                    {item.steps.map((step) => (
                      <li key={`${item.id}-${step.treatmentId}`}>
                        · {step.treatment.name} ({step.minutes} min each)
                      </li>
                    ))}
                  </ul>
                  {item.note ? (
                    <p className="mt-3 text-xs font-medium text-velvet">{item.note}</p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gilt-line pt-6">
            <p className="text-sm text-muted">
              Every Magnolia Suite visit is arranged by enquiry so we can prepare the tub and tea
              service ahead of your arrival.
            </p>
            <SiteLink href="/contact/" className="button">
              {ctaLabel}
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PackageInclusionsStrip({ heading }: { heading: string }) {
  return (
    <section aria-labelledby="inclusions-heading" className="border-t border-gilt-line bg-surface-soft py-12">
      <div className="wrap">
        <h2 id="inclusions-heading" className="eyebrow text-center text-ink">
          {heading}
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {packageInclusions.map((item) => (
            <li key={item.id} className="flex flex-col items-center gap-2.5 text-center">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gilt-line bg-surface text-champagne-ink">
                <SpaIcon name={item.id} size={20} />
              </span>
              <span className="font-display text-lg text-ink">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ============================================================================
   Gift Cards page sections — Hanging experience tags, folded letter, fine print
   ============================================================================ */
export function GiftExperienceRail({
  eyebrow,
  heading,
  intro,
  experiences,
}: {
  eyebrow: string;
  heading: string;
  intro: string;
  experiences: readonly ResolvedGiftExperience[];
}) {
  return (
    <section aria-labelledby="gift-experiences-heading" className="border-y border-gilt-line bg-surface-soft py-18 sm:py-22">
      <div className="wrap">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-velvet">{eyebrow}</p>
          <h2 id="gift-experiences-heading" className="mt-3 font-display text-[clamp(2.2rem,4.4vw,3.3rem)] text-ink">
            {heading}
          </h2>
          <p className="mt-3 text-muted">{intro}</p>
        </div>

        {/* Brass rail with hanging ribbon gift tags */}
        <div className="relative mt-12">
          <div aria-hidden="true" className="h-[2px] w-full bg-champagne/75" />
          <div className="grid gap-8 md:grid-cols-3">
            {experiences.map((exp, idx) => (
              <article key={exp.id} className="flex flex-col items-center">
                {/* Hanging velvet ribbon */}
                <div aria-hidden="true" className="flex flex-col items-center">
                  <span className="h-3 w-3 -mt-1.5 rounded-full border border-champagne bg-velvet" />
                  <span className="h-9 w-2 bg-velvet/85" />
                </div>
                {/* Hanging linen gift tag */}
                <div
                  className={`printed-sheet flex h-full w-full flex-col justify-between p-7 text-center ${
                    idx === 1 ? 'md:mt-3' : ''
                  }`}
                >
                  <div>
                    <span
                      aria-hidden="true"
                      className="mx-auto mb-4 block h-3 w-3 rounded-full border border-champagne bg-bg"
                    />
                    <p className="eyebrow text-champagne-ink">
                      {exp.referenceType === 'couples' ? 'Couples’ experience' : 'Signature package'}
                    </p>
                    <h3 className="mt-2 font-display text-3xl text-ink">{exp.name}</h3>
                    <p className="mt-2.5 text-sm text-muted">{exp.occasion}</p>
                  </div>
                  <div className="mt-6 border-t border-gilt-line pt-4">
                    <p className="font-display text-3xl text-ink tabular-nums">
                      {formatUsd(exp.priceUsd)}
                    </p>
                    {exp.priceSuffix ? (
                      <p className="font-sans text-[0.7rem] tracking-[0.14em] text-muted uppercase">
                        {exp.priceSuffix.trim()}
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function GiftFinishesStaticStrip() {
  return (
    <noscript>
      <section aria-label="All three gift card finishes" className="wrap py-10">
        <div className="grid gap-6 md:grid-cols-3">
          {giftCardFinishes.map((finish) => (
            <figure key={finish.id} className="printed-sheet p-5">
              <GiftCardArt finish={finish.id} valueLabel="$150" subtitle="The Velvet Hour" />
              <figcaption className="mt-4">
                <p className="font-display text-xl text-ink">{finish.name}</p>
                <p className="mt-1 text-xs text-muted">{finish.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </noscript>
  );
}

export function GiftHowItWorksLetter({
  eyebrow,
  heading,
  steps,
  ctaLabel,
}: {
  eyebrow: string;
  heading: string;
  steps: readonly { title: string; detail: string }[];
  ctaLabel: string;
}) {
  return (
    <section aria-labelledby="gift-how-heading" className="wrap-narrow py-18 sm:py-24">
      <div className="printed-sheet p-8 sm:p-14">
        <p className="eyebrow text-champagne-ink">{eyebrow}</p>
        <h2 id="gift-how-heading" className="mt-3 font-display text-4xl text-ink sm:text-5xl">
          {heading}
        </h2>

        <ol className="mt-9 space-y-7 border-t border-gilt-line pt-8">
          {steps.map((step, i) => (
            <li key={step.title} className="grid gap-3 sm:grid-cols-12 sm:items-baseline">
              <span className="font-display text-3xl text-champagne-ink sm:col-span-2">
                0{i + 1}
              </span>
              <div className="sm:col-span-10">
                <h3 className="font-display text-2xl text-ink">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Delivery choices */}
        <div className="mt-10 border-t border-gilt-line pt-8">
          <p className="eyebrow text-ink">Delivery choices</p>
          <dl className="mt-4 grid gap-5 sm:grid-cols-3">
            {giftCardDeliveryOptions.map((opt) => (
              <div key={opt.id}>
                <dt className="font-display text-xl text-ink">{opt.title}</dt>
                <dd className="mt-1 text-xs leading-relaxed text-muted">{opt.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-9">
          <SiteLink href="/contact/" className="button">
            {ctaLabel}
          </SiteLink>
        </div>

        {/* Gift card terms in fine print at the foot of the sheet */}
        <div className="mt-10 border-t border-line pt-6 text-xs text-muted">
          <h3 className="eyebrow mb-2.5 text-muted">Gift card terms</h3>
          <ul className="list-disc space-y-1.5 pl-4">
            {giftCardTerms.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   Contact page — Hosted form or fallback + stacked appointment card + full-width map
   ============================================================================ */
export function ContactWorkspace({
  hosted,
  siteId,
  embedUrl,
  formHeading,
  fallbackHeading,
  fallbackBody,
  tipsHeading,
  mapCaption,
}: {
  hosted: boolean;
  siteId: string;
  embedUrl: string;
  formHeading: string;
  fallbackHeading: string;
  fallbackBody: string;
  tipsHeading: string;
  mapCaption: string;
}) {
  return (
    <div className="wrap py-14 sm:py-18">
      <div className="grid items-start gap-10 lg:grid-cols-12">
        {/* Left (first at 390px): Hosted Jamstacks form OR email fallback on a surface sheet */}
        <section aria-label="Appointment enquiry form" className="space-y-8 lg:col-span-7">
          <div className="printed-sheet p-7 sm:p-10">
            <h2 className="font-display text-3xl text-ink">{hosted ? formHeading : fallbackHeading}</h2>
            <p className="mt-2.5 text-sm text-muted">
              We answer every enquiry personally by email or phone. Nothing is scheduled or paid for
              until we confirm a time with you.
            </p>

            <div className="mt-6">
              {hosted ? (
                <JamstacksSupportForm siteId={siteId} embedUrl={embedUrl} email={business.email} />
              ) : (
                <div className="rounded-sm border border-gilt-line bg-bg/70 p-6">
                  <p className="text-sm leading-relaxed text-ink">{fallbackBody}</p>
                  <p className="mt-4">
                    <a
                      className="font-display text-2xl text-champagne-ink underline decoration-gilt-line underline-offset-4 wrap-anywhere hover:decoration-champagne-ink"
                      href={`mailto:${business.email}`}
                    >
                      {business.email}
                    </a>
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <CopyEmail email={business.email} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Useful to include in your message */}
          <div className="border-t border-gilt-line pt-6">
            <h3 className="font-display text-2xl text-ink">{tipsHeading}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {business.enquiries.usefulToInclude.map((tip) => (
                <li key={tip} className="flex items-start gap-2.5">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Right: Stacked appointment card with direct email, phone, address, hours, arrival notes */}
        <aside aria-label="Spa contact details and hours" className="printed-sheet p-7 sm:p-9 lg:col-span-5">
          <p className="eyebrow text-champagne-ink">Direct desk</p>
          <h2 className="mt-2 font-display text-3xl text-ink">{business.wordmark}</h2>

          <div className="mt-5 space-y-3 border-b border-gilt-line pb-6 text-sm">
            <div className="flex items-start gap-3">
              <SpaIcon name="envelope" size={18} className="mt-0.5 text-champagne-ink" />
              <div>
                <a className="text-link font-medium wrap-anywhere" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
                <div className="mt-2 flex flex-wrap items-center gap-2.5">
                  <CopyEmail email={business.email} />
                </div>
              </div>
            </div>

            {business.phone ? (
              <div className="flex items-center gap-3 pt-1">
                <SpaIcon name="phone" size={18} className="text-champagne-ink" />
                <a className="text-link font-medium" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>
                  {business.phone}
                </a>
              </div>
            ) : null}

            <div className="flex items-start gap-3 pt-1">
              <SpaIcon name="pin" size={18} className="mt-0.5 text-champagne-ink" />
              <div>
                <p className="text-ink">{business.address.formatted}</p>
                <p className="text-muted">{business.address.landmark}</p>
                <p className="mt-1 text-xs text-muted italic">{business.address.directions}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-2xl text-ink">Hours</h3>
              <OpenBadge hours={business.hours} />
            </div>
            <HoursTable hours={business.hours} />
            <TimeZoneNote />
          </div>

          <div className="mt-6 border-t border-gilt-line pt-5 text-xs leading-relaxed text-muted">
            <p className="eyebrow mb-2 text-ink">Before you arrive</p>
            <p>
              Please arrive 15 minutes early; a warmed robe and slippers await in the quiet lounge.
              24 hours’ notice is kindly requested to change an appointment.
            </p>
          </div>
        </aside>
      </div>

      {/* Full-width Google Map below */}
      <section aria-label="Map of The Velvet Hour Day Spa" className="mt-14">
        <div className="overflow-hidden border border-gilt-line bg-surface p-2">
          <GoogleMap
            address={business.address.formatted}
            title={`Map showing ${business.name} at ${business.address.formatted}`}
          />
        </div>
        <p className="mt-3 text-center text-xs tracking-[0.08em] text-muted">{mapCaption}</p>
      </section>
    </div>
  );
}

/* ============================================================================
   404 — "Between appointments"
   ============================================================================ */
export function NotFoundRoom({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="sky-afternoon relative isolate overflow-hidden">
      <div className="wrap-narrow py-16 text-center sm:py-24">
      <div className="relative mx-auto max-w-md">
        {/* The hall clock, stopped: rings without an arc */}
        <HourRings className="absolute top-[30%] left-1/2 -z-10 aspect-square w-[240%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-60" />
        <BetweenAppointmentsArt />
      </div>
      <p className="eyebrow mt-8 text-champagne-ink">404</p>
      <h1 className="mt-3 font-display text-[clamp(2.8rem,7vw,5.6rem)] leading-[0.95] text-ink">{heading}</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">{children}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <SiteLink href="/" className="button">
          Return home
        </SiteLink>
        <SiteLink href="/treatments/" className="button button-quiet">
          Browse treatments
        </SiteLink>
        <SiteLink href="/contact/" className="button button-quiet">
          Visit &amp; enquire
        </SiteLink>
      </div>
      </div>
    </section>
  );
}
