import { business } from '../content/business';
import { VelvetRibbonDivider } from './artwork/dividers';
import { HourRings } from './artwork/hour-rings';
import { Monogram } from './artwork/monogram';
import { FooterHours } from './open-badge';
import { SiteLink } from './site-link';

export function SiteFooter() {
  return (
    <>
    {/* Every page ends at dusk: the afternoon fades into velvet evening above the footer */}
    <div
      aria-hidden="true"
      className="footer-dusk h-40 bg-[linear-gradient(180deg,transparent,var(--dusk-b)_45%,var(--dusk-c)_75%,var(--dusk-d))] sm:h-56"
    />
    <footer className="hour-evening sky-night relative overflow-hidden text-ink">
      <VelvetRibbonDivider className="-mt-1" />

      {/* The hour, complete: the wordmark set as large as the page allows */}
      <div className="wrap relative z-10 pt-10 sm:pt-14">
        <p aria-hidden="true" className="gilt-text font-display text-[clamp(3.3rem,11.6vw,10.6rem)] leading-[0.9] tracking-[-0.03em] whitespace-nowrap">
          {business.wordmark}
        </p>
        <div className="tick-rule mt-6" aria-hidden="true" />
      </div>

      <div className="wrap relative z-10 py-14 sm:py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Column 1: Wordmark + Address + Forsyth Park landmark */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <Monogram size={42} />
              <div>
                <p className="font-display text-2xl leading-none text-ink">{business.wordmark}</p>
                <p className="mt-1 eyebrow">{business.subtitle}</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[0.95rem] text-muted">
              {business.address.formatted}
              <br />
              {business.address.landmark}.
            </p>
            <p className="mt-3 max-w-sm text-sm text-muted italic">
              {business.address.directions}
            </p>
          </div>

          {/* Column 2: Opening hours derived from content/business.ts */}
          <div className="md:col-span-4">
            <h2 className="eyebrow text-ink">Hours</h2>
            <FooterHours hours={business.hours} className="mt-4" />
          </div>

          {/* Column 3: Navigation, email, phone */}
          <div className="md:col-span-3">
            <h2 className="eyebrow text-ink">Explore &amp; enquire</h2>
            <nav aria-label="Footer" className="mt-4 flex flex-col gap-2.5 text-sm">
              <SiteLink href="/treatments/" className="w-fit text-ink no-underline hover:text-champagne-ink hover:underline">
                Treatments
              </SiteLink>
              <SiteLink href="/packages/" className="w-fit text-ink no-underline hover:text-champagne-ink hover:underline">
                Packages &amp; couples
              </SiteLink>
              <SiteLink href="/gift-cards/" className="w-fit text-ink no-underline hover:text-champagne-ink hover:underline">
                Gift cards
              </SiteLink>
              <SiteLink href="/contact/" className="w-fit text-ink no-underline hover:text-champagne-ink hover:underline">
                Visit &amp; enquire
              </SiteLink>
            </nav>

            <div className="mt-6 space-y-1.5 border-t border-gilt-line pt-4 text-sm">
              <p>
                <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
              </p>
              {business.phone ? (
                <p>
                  <a className="text-link" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>
                    {business.phone}
                  </a>
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-gilt-line pt-6 text-xs text-muted">
          <p>{business.name} · Enquiries answered by email or phone.</p>
          <span title="Made with love by jamstacks.net">
            with <span role="img" aria-label="love">❤️</span>{' '}
            <a className="no-underline hover:text-champagne-ink hover:underline" href="https://jamstacks.net">
              jamstacks.net
            </a>
          </span>
        </div>
      </div>

      {/* The full sixty-minute arc: the hour has been spent */}
      <HourRings
        arcMinutes={60}
        numerals={false}
        className="absolute -top-60 -right-80 w-[36rem] opacity-25 sm:w-[40rem]"
      />
    </footer>
    </>
  );
}
