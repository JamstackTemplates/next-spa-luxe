import type { OpeningHours } from '../lib/hours.ts';

/**
 * Shared business details, location, opening hours and house notes for The Velvet Hour Day Spa.
 * Edit this file to update the spa's contact details, holiday hours, or arrival guidance across
 * every page, structured data, and footer.
 */
export interface BusinessAddress {
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  /** Formatted one-line address for display and maps. */
  formatted: string;
  /** Public landmark context shown alongside the address. */
  landmark: string;
  /** Street-level directions note for first-time guests. */
  directions: string;
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short wordmark without "Day Spa" for display lockups. */
  wordmark: string;
  /** Subtitle paired with the wordmark. */
  subtitle: string;
  /** Short headline for the home page. */
  tagline: string;
  /** Plain-text introduction used by the page and fallback metadata. */
  introduction: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Public telephone number; blank hides it. */
  phone: string;
  /** Price range tier for schema.org DaySpa metadata. */
  priceRange: string;
  /** Physical townhouse address and Forsyth Park landmark directions. */
  address: BusinessAddress;
  /** Seven same-day OpeningHours records (Monday through Sunday). Overnight hours are unsupported. */
  hours: readonly OpeningHours[];
  /** Compact hours summary shown in the footer. */
  hoursSummary: string;
  /** Arrival and house etiquette notes shown on Home and Contact. */
  arrivalNotes: readonly {
    id: string;
    title: string;
    detail: string;
  }[];
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Clear enquiry wording — no booking, payment or delivery promises. */
    introduction: string;
    /** Suggestions for the message, not additional form inputs. */
    usefulToInclude: readonly string[];
  };
}

export const business: Business = {
  name: 'The Velvet Hour Day Spa',
  wordmark: 'The Velvet Hour',
  subtitle: 'Day Spa · Forsyth Park, Savannah',
  tagline: 'Take the long way to an hour.',
  introduction:
    'Facials, massage and body rituals in a quiet townhouse on Forsyth Park — with the robe warmed, the tea poured and nowhere else to be.',
  email: 'hello@thevelvethourspa.example',
  phone: '(912) 555-0186',
  priceRange: '$$$',
  address: {
    street: '22 West Gaston Street',
    city: 'Savannah',
    region: 'GA',
    postalCode: '31401',
    country: 'US',
    formatted: '22 West Gaston Street, Savannah, GA 31401',
    landmark: 'Opposite the fountain end of Forsyth Park',
    directions:
      'Street parking on Gaston and Whitaker; the door is the dark green one under the gilt lamp.',
  },
  hours: [
    { day: 'Monday' },
    { day: 'Tuesday', opens: '10:00', closes: '19:00' },
    { day: 'Wednesday', opens: '10:00', closes: '19:00' },
    { day: 'Thursday', opens: '10:00', closes: '19:00' },
    { day: 'Friday', opens: '10:00', closes: '20:00' },
    { day: 'Saturday', opens: '09:00', closes: '19:00' },
    { day: 'Sunday', opens: '10:00', closes: '17:00' },
  ],
  hoursSummary: 'Tue–Thu 10–7 · Fri 10–8 · Sat 9–7 · Sun 10–5 · Mon Closed',
  arrivalNotes: [
    {
      id: 'arrival',
      title: 'Arrive fifteen minutes early',
      detail: 'Settle in the tea lounge before your treatment begins so your hour starts unhurried.',
    },
    {
      id: 'robe',
      title: 'Robe and slippers waiting',
      detail: 'A warmed waffle robe, slippers and lockers are ready for every guest; bring nothing.',
    },
    {
      id: 'phones',
      title: 'Phones rest in the lounge',
      detail: 'We keep the treatment rooms silent and screen-free so everyone hears only the park breeze.',
    },
    {
      id: 'guests',
      title: 'Age & refreshments',
      detail:
        'Guests 16+ (under 18 accompanied by a parent or guardian). Champagne is served only to guests 21+ with sparkling hibiscus tea always offered alongside.',
    },
    {
      id: 'changes',
      title: '24 hours’ notice to change',
      detail: 'Let us know at least 24 hours ahead by email or phone if your plans shift.',
    },
  ],
  enquiries: {
    title: 'Request an appointment',
    introduction:
      'Tell us what you’d like and when. We reply within a day to offer times — nothing is booked until we confirm by email or phone.',
    usefulToInclude: [
      'The treatment, package, couples’ session or gift card you’re interested in',
      'Two or three preferred dates and times',
      'How many guests will be visiting',
      'A phone number if you prefer a call back',
      'Anything we should know — pregnancy, allergies, skin sensitivities or access needs',
      'For gift cards: the value or experience, card finish, recipient’s name and delivery choice',
    ],
  },
};
