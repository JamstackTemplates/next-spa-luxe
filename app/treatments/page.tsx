import type { Metadata } from 'next';
import { TreatmentsPromptBand } from '../../components/inner-sections';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { TreatmentMenu } from '../../components/treatment-menu';
import { treatments } from '../../content/treatments';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Treatments',
  description:
    'Facials, full-body massage, mineral wraps, salt polish and finishing touches at The Velvet Hour Day Spa on Forsyth Park, Savannah.',
  alternates: { canonical: absoluteUrl('/treatments/') },
};

export default function TreatmentsPage() {
  return (
    <>
      <PageHead
        eyebrow="The treatment menu"
        title="Facials, massage & body rituals"
        vignette="treatments"
        actions={
          <SiteLink href="/contact/" className="button">
            Request an appointment
          </SiteLink>
        }
      >
        <p>
          Every treatment is measured on our Hour Dial and paced unhurriedly. Filter by category,
          length or guest needs, then write to us with the times that suit you.
        </p>
      </PageHead>

      <TreatmentMenu items={treatments} />

      <TreatmentsPromptBand
        eyebrow="Unhurried guidance"
        heading="Not sure what to choose?"
        body="Tell us how you’d like to feel, how long you have, or any skin sensitivities or pregnancy notes. We’ll suggest a pairing and offer times by email or phone."
        ctaLabel="Ask the desk"
      />
    </>
  );
}
