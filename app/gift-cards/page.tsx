import type { Metadata } from 'next';
import { GiftCardDesigner } from '../../components/gift-card-designer';
import {
  GiftExperienceRail,
  GiftFinishesStaticStrip,
  GiftHowItWorksLetter,
} from '../../components/inner-sections';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { resolvedGiftExperiences } from '../../content/gift-cards';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Gift cards',
  description:
    'Champagne foil, taupe linen and velvet-ribbon keepsake gift cards for The Velvet Hour Day Spa on Forsyth Park, Savannah.',
  alternates: { canonical: absoluteUrl('/gift-cards/') },
};

export default function GiftCardsPage() {
  const experiences = resolvedGiftExperiences();

  return (
    <>
      <PageHead
        eyebrow="Give the spa"
        title="A gilt card, tied in velvet"
        vignette="gift-cards"
        actions={
          <SiteLink href="/contact/" className="button">
            Enquire about a gift card
          </SiteLink>
        }
      >
        <p>
          Preview our three physical finishes with a dollar amount or a named townhouse experience.
          No payment is taken online — tell us what you’d like and we’ll reply with payment and
          delivery details.
        </p>
      </PageHead>

      <section aria-labelledby="designer-heading" className="wrap py-14 sm:py-18">
        <div className="mb-8 max-w-2xl">
          <p className="eyebrow text-champagne-ink">Card preview</p>
          <h2 id="designer-heading" className="mt-2 font-display text-4xl text-ink sm:text-5xl">
            Choose a finish &amp; value
          </h2>
        </div>
        <GiftCardDesigner experiences={experiences} />
      </section>

      <GiftFinishesStaticStrip />

      <GiftExperienceRail
        eyebrow="Experience cards"
        heading="Give a named afternoon"
        intro="Experience cards display the live menu price and honour the named package or couples’ ritual even if menu prices change later."
        experiences={experiences}
      />

      <GiftHowItWorksLetter
        eyebrow="How it works"
        heading="Arranged personally by the desk"
        steps={[
          {
            title: 'Send your gift card enquiry',
            detail:
              'Write to us via Contact or email with the value or named experience, your preferred finish, the recipient’s name and how you’d like it delivered.',
          },
          {
            title: 'We reply with payment & delivery details',
            detail:
              'Within a day, the desk answers by email or phone to arrange payment and confirm timing — nothing is charged or issued until you confirm with us.',
          },
          {
            title: 'Posted, collected or emailed',
            detail:
              'Your card is posted in a wax-sealed envelope, held ribbon-tied at reception on West Gaston Street, or emailed as a printable certificate.',
          },
        ]}
        ctaLabel="Enquire about a gift card"
      />
    </>
  );
}
