import type { Metadata } from 'next';
import {
  CouplesTeaser,
  DuskTransition,
  EtiquetteCard,
  Evening,
  FeaturedMenuSheet,
  GiftCardBand,
  HomeHero,
  SignatureBand,
  ThreeWays,
  VisitBand,
} from '../components/home-sections';
import { business } from '../content/business';
import { resolvedCouplesTreatments } from '../content/couples';
import { resolvedPackages } from '../content/packages';
import { featuredTreatments } from '../content/treatments';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  const allPackages = resolvedPackages();
  const signature = allPackages.find((pkg) => pkg.signature) ?? allPackages[0];
  const featured = featuredTreatments();
  const couplesPreview = resolvedCouplesTreatments().slice(0, 2);

  return (
    <>
      {/* 1. Hero */}
      <HomeHero>
        <HomeHero.Wordmark>{business.name}</HomeHero.Wordmark>
        <HomeHero.Lead>
          Take the long way
          <br />
          to <HomeHero.Gilt>an hour.</HomeHero.Gilt>
        </HomeHero.Lead>
        <HomeHero.Introduction>
          Facials, massage and body rituals in a quiet townhouse on Forsyth Park — with the robe
          warmed, the tea poured and nowhere else to be.
        </HomeHero.Introduction>
        <HomeHero.Actions
          primaryLabel="Request an appointment"
          secondaryLabel="Give a gift card"
        />
        <HomeHero.HoursBadge />
      </HomeHero>

      {/* 2. Three ways to spend the hour */}
      <ThreeWays>
        <ThreeWays.Header
          eyebrow="At 22 West Gaston Street"
          heading="Three ways to spend the hour"
        />
        <ThreeWays.Row>
          <ThreeWays.Doorway
            numeral="I"
            icons={['facial', 'massage']}
            title="Treatments"
            href="/treatments/"
            linkLabel="Read the menu"
          >
            Sculpting facials, unhurried full-body massage, mineral wraps and fifteen-minute
            finishing touches.
          </ThreeWays.Doorway>

          <ThreeWays.Doorway
            numeral="II"
            icons={['clock', 'tea']}
            title="Packages"
            href="/packages/"
            linkLabel="See the itineraries"
          >
            Multi-treatment afternoons mapped around our Hour Dial, with tea lounge time built in.
          </ThreeWays.Doorway>

          <ThreeWays.Doorway
            numeral="III"
            icons={['couples', 'champagne']}
            title="Couples"
            href="/packages/#couples"
            linkLabel="Step into the Magnolia Suite"
          >
            Side-by-side massage, twin robes on brass hooks and private soaking-tub rituals for two.
          </ThreeWays.Doorway>
        </ThreeWays.Row>
      </ThreeWays>

      {/* 3. Signature package */}
      <SignatureBand
        eyebrow="Signature itinerary"
        heading="The Velvet Hour"
        intro="Two and a half unhurried hours tracing three rings of the dial — warm oil massage, our silk-peptide facial and camellia scalp ritual, with a warmed waffle robe waiting in the tea lounge."
        pkg={signature}
        ctaLabel="Request The Velvet Hour"
      />

      {/* 4. From the menu (four owner-chosen featured treatments) */}
      <FeaturedMenuSheet
        eyebrow="From the menu"
        heading="Four quiet favourites"
        note="Every treatment begins in the tea lounge and is paced by the minute on our townhouse dial."
        items={featured}
        footerLinkLabel="See the full menu"
      />

      {/* The light goes: the dial sets behind Forsyth Park and the page passes into evening */}
      <DuskTransition />

      <Evening>
      {/* 5. Couples' suite teaser */}
      <CouplesTeaser
        eyebrow="The Magnolia Suite"
        heading="Two robes, one quiet room"
        description="Upstairs overlooking the live oaks, our private suite holds twin draped tables, a petal-strewn soaking tub and candlelit quiet for anniversaries, birthdays or an unhurried afternoon together."
        featuredCouples={couplesPreview}
        ctaLabel="Explore packages & couples"
      />

      {/* 6. Gift card band (always-velvet evening contrast band) */}
      <GiftCardBand
        eyebrow="Gift cards"
        heading="Give an unhurried afternoon"
        pitch="Choose champagne foil, woven taupe linen or a plum-velvet ribbon keepsake box — for a dollar amount or a named experience. Paid and prepared only once we reply."
        ctaLabel="Give a gift card"
      />

      {/* 7. Before you arrive (house etiquette card) */}
      <EtiquetteCard
        eyebrow="House etiquette"
        heading="Before you arrive"
        intro="A few small courtesies that keep the townhouse calm for every guest."
      />

      {/* 8. Visit */}
      <VisitBand
        eyebrow="Find the dark green door"
        heading="Opposite Forsyth Park"
        ctaLabel="Request an appointment"
      />
      </Evening>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
