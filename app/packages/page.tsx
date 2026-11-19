import type { Metadata } from 'next';
import {
  CouplesSuiteSection,
  PackageInclusionsStrip,
  PackagesListSection,
} from '../../components/inner-sections';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { couplesSuite, resolvedCouplesTreatments } from '../../content/couples';
import { resolvedPackages } from '../../content/packages';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Packages & couples',
  description:
    'Multi-treatment spa packages mapped on our Hour Dial and private couples’ rituals in the Magnolia Suite at The Velvet Hour Day Spa, Savannah.',
  alternates: { canonical: absoluteUrl('/packages/') },
};

export default function PackagesPage() {
  const activePackages = resolvedPackages();
  const activeCouples = resolvedCouplesTreatments();

  return (
    <>
      <PageHead
        eyebrow="Packages & couples’ suite"
        title="Hours worth lingering over"
        vignette="packages"
        actions={
          <>
            <SiteLink href="/contact/" className="button">
              Request a package
            </SiteLink>
            <a href="#couples" className="button button-quiet">
              Jump to couples’ suite
            </a>
          </>
        }
      >
        <p>
          Multi-treatment itineraries set out ring by ring on the Hour Dial — plus private
          side-by-side rituals in our upstairs Magnolia Suite. Every package costs less than its
          individual treatments.
        </p>
      </PageHead>

      <PackagesListSection items={activePackages} />

      <CouplesSuiteSection
        eyebrow="Couples’ treatments"
        heading={couplesSuite.name}
        intro={couplesSuite.summary}
        items={activeCouples}
        ctaLabel="Enquire about the Magnolia Suite"
      />

      <PackageInclusionsStrip heading="Included in every package" />
    </>
  );
}
