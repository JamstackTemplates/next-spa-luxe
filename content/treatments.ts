/**
 * Full facials, body and finishing touches menu for The Velvet Hour Day Spa.
 *
 * Owner editing notes:
 * - Change a price by updating `options[].priceUsd` (whole USD dollars, 25–400).
 * - Pause a seasonal treatment by setting `available: false`; it moves out of filters into
 *   "Resting this season". If it was `featured`, mark another available treatment `featured: true`
 *   so Home always shows four featured items, and check any package referencing it.
 * - `minutes` must be in 15-minute steps between 15 and 120.
 */
export type TreatmentCategory = 'facials' | 'body' | 'finishing';

export type TreatmentTag =
  | 'sensitive-skin'
  | 'pregnancy-safe'
  | 'couples-available'
  | 'seasonal';

export interface TreatmentOption {
  /** Duration in 15-minute steps (15–120). */
  minutes: number;
  /** Whole USD dollars (25–400). */
  priceUsd: number;
}

export interface Treatment {
  /** Stable, URL-safe unique identifier. */
  id: string;
  /** Menu section. Finishing touches are added alongside another treatment. */
  category: TreatmentCategory;
  /** Display title. */
  name: string;
  /** Concise description (max 180 characters). */
  description: string;
  /** Available durations and whole-dollar prices. At least one required. */
  options: readonly TreatmentOption[];
  /** Filterable attributes and seasonal markers. */
  tags: readonly TreatmentTag[];
  /** False hides the item from filters and lists it under "Resting this season". */
  available: boolean;
  /** True includes the item in the Home "From the menu" sheet (exactly 4 available items). */
  featured: boolean;
}

export const TREATMENT_CATEGORIES: readonly {
  id: TreatmentCategory;
  label: string;
  note?: string;
}[] = [
  { id: 'facials', label: 'Facials' },
  { id: 'body', label: 'Body', note: 'Massage, polish and mineral wraps.' },
  { id: 'finishing', label: 'Finishing touches', note: 'Added to any treatment.' },
];

export const TAG_LABELS: Record<TreatmentTag, string> = {
  'sensitive-skin': 'Sensitive skin',
  'pregnancy-safe': 'Pregnancy-safe',
  'couples-available': 'Couples available',
  seasonal: 'Seasonal',
};

export const treatments: readonly Treatment[] = [
  {
    id: 'velvet-signature-facial',
    category: 'facials',
    name: 'The Velvet Signature Facial',
    description: 'Double cleanse, lymphatic sculpting massage and a silk-peptide mask.',
    options: [{ minutes: 75, priceUsd: 185 }],
    tags: [],
    available: true,
    featured: true,
  },
  {
    id: 'champagne-glow-facial',
    category: 'facials',
    name: 'Champagne Glow Facial',
    description: 'Grape-enzyme peel and vitamin C brightening for winter-dull skin.',
    options: [{ minutes: 60, priceUsd: 160 }],
    tags: ['seasonal'],
    available: true,
    featured: true,
  },
  {
    id: 'calm-skin-facial',
    category: 'facials',
    name: 'Calm Skin Facial',
    description: 'Colloidal oat, chamomile compress and cool marble stones for reactive skin.',
    options: [{ minutes: 60, priceUsd: 150 }],
    tags: ['sensitive-skin'],
    available: true,
    featured: false,
  },
  {
    id: 'groomed-facial',
    category: 'facials',
    name: 'The Groomed Facial',
    description: 'Deep botanical cleanse, warm eucalyptus steam and a beard-friendly finish.',
    options: [{ minutes: 45, priceUsd: 135 }],
    tags: [],
    available: true,
    featured: false,
  },
  {
    id: 'express-lift-facial',
    category: 'facials',
    name: 'Express Lift',
    description: 'A quick brightening facial and brisk facial massage for before dinner.',
    options: [{ minutes: 30, priceUsd: 85 }],
    tags: ['couples-available'],
    available: true,
    featured: false,
  },
  {
    id: 'velvet-hour-massage',
    category: 'body',
    name: 'The Velvet Hour Massage',
    description: 'Slow, flowing full-body massage with warmed camellia and bergamot oil.',
    options: [
      { minutes: 60, priceUsd: 150 },
      { minutes: 90, priceUsd: 210 },
    ],
    tags: ['couples-available'],
    available: true,
    featured: true,
  },
  {
    id: 'deep-tissue-massage',
    category: 'body',
    name: 'Deep Tissue Massage',
    description: 'Focused, unhurried pressure along shoulders, back and tired walking legs.',
    options: [
      { minutes: 60, priceUsd: 165 },
      { minutes: 90, priceUsd: 225 },
    ],
    tags: ['couples-available'],
    available: true,
    featured: false,
  },
  {
    id: 'hot-stone-ritual',
    category: 'body',
    name: 'Hot Stone Ritual',
    description: 'Heated basalt stones and long sweeping strokes to melt deeply held tension.',
    options: [{ minutes: 90, priceUsd: 235 }],
    tags: [],
    available: true,
    featured: true,
  },
  {
    id: 'sea-salt-body-polish',
    category: 'body',
    name: 'Sea Salt Body Polish',
    description: 'Magnolia sea-salt scrub followed by a warm rainfall shower and body oil.',
    options: [{ minutes: 45, priceUsd: 120 }],
    tags: ['couples-available'],
    available: true,
    featured: false,
  },
  {
    id: 'cocoon-body-wrap',
    category: 'body',
    name: 'Clay & Honey Cocoon',
    description: 'Warm mineral clay wrap with a soothing scalp massage while you rest.',
    options: [{ minutes: 60, priceUsd: 155 }],
    tags: [],
    available: true,
    featured: false,
  },
  {
    id: 'prenatal-massage',
    category: 'body',
    name: 'Prenatal Massage',
    description: 'Gentle side-lying, softly bolstered massage offered from the second trimester.',
    options: [{ minutes: 60, priceUsd: 155 }],
    tags: ['pregnancy-safe'],
    available: true,
    featured: false,
  },
  {
    id: 'scalp-ritual',
    category: 'finishing',
    name: 'Scalp Ritual',
    description: 'Warm camellia oil and slow pressure-point massage along crown and temples.',
    options: [{ minutes: 15, priceUsd: 40 }],
    tags: [],
    available: true,
    featured: false,
  },
  {
    id: 'eye-revival',
    category: 'finishing',
    name: 'Eye Revival',
    description: 'Chilled glass globes and a botanical caffeine eye mask to brighten tired eyes.',
    options: [{ minutes: 15, priceUsd: 30 }],
    tags: [],
    available: true,
    featured: false,
  },
  {
    id: 'hand-foot-balm',
    category: 'finishing',
    name: 'Hand & Foot Balm',
    description: 'Whipped shea balm, warmed linen mitts and an unhurried tidy-up.',
    options: [{ minutes: 15, priceUsd: 30 }],
    tags: [],
    available: true,
    featured: false,
  },
];

export function featuredTreatments(items: readonly Treatment[] = treatments): Treatment[] {
  return items.filter((item) => item.available && item.featured);
}

export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}

export function formatMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return hours === 1 ? '1 hr' : `${hours} hrs`;
  return `${hours} hr ${mins} min`;
}
