import type { Metadata } from 'next';
import { ContactWorkspace } from '../../components/inner-sections';
import { PageHead } from '../../components/page-head';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Visit & enquire',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <>
      <PageHead
        eyebrow="Visit & enquire"
        title={business.enquiries.title}
        vignette="contact"
      >
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <ContactWorkspace
        hosted={hosted}
        siteId={site.jamstacksSite}
        embedUrl={site.jamstacksEmbedUrl}
        formHeading="Send an enquiry"
        fallbackHeading="Write to the desk directly"
        fallbackBody="The hosted enquiry form is not connected on this preview. Send your request directly by email or telephone — we reply within a day to offer available times."
        tipsHeading="Useful to include in your message"
        mapCaption="22 West Gaston Street, Savannah, GA 31401 — opposite the fountain end of Forsyth Park. Look for the dark green door under the gilt lamp."
      />
    </>
  );
}
