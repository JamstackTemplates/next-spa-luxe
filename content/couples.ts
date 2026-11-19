import { treatments, type Treatment } from './treatments.ts';

/**
 * Couples' treatments hosted in the private Magnolia Suite.
 * Every included treatment must carry the `couples-available` tag in content/treatments.ts.
 * Prices are always displayed "per couple".
 */
export interface CouplesStep {
  /** Must match an available treatment carrying the `couples-available` tag. */
  treatmentId: string;
  /** Must match one of that treatment's option durations. */
  minutes: number;
}

export interface CouplesTreatment {
  /** Stable, URL-safe unique identifier. */
  id: string;
  /** Display title. */
  name: string;
  /** Concise description of the shared experience. */
  description: string;
  /** Included side-by-side treatments. */
  includes: readonly CouplesStep[];
  /** Private soaking-tub time in the Magnolia Suite (0–60 minutes). */
  suiteMinutes: number;
  /** Whole USD price per couple. */
  pricePerCoupleUsd: number;
  /** Optional suite refreshment note (champagne lines always include 21+ and alcohol-free option). */
  note?: string;
  /** False hides the item from active listings. */
  available: boolean;
}

export interface ResolvedCouplesTreatment extends CouplesTreatment {
  steps: readonly { treatmentId: string; minutes: number; treatment: Treatment }[];
  treatmentMinutes: number;
  totalMinutes: number;
}

export const couplesSuite = {
  name: 'The Magnolia Suite',
  summary:
    'Twin draped tables beneath the townhouse’s second-floor arch, two warmed robes on brass hooks, a deep soaking tub strewn with magnolia petals and candlelit stillness for two.',
};

export const couplesTreatments: readonly CouplesTreatment[] = [
  {
    id: 'side-by-side-hour',
    name: 'Side-by-Side Velvet Hour',
    description: 'Our flowing full-body warm oil massage performed simultaneously in the private suite.',
    includes: [{ treatmentId: 'velvet-hour-massage', minutes: 60 }],
    suiteMinutes: 0,
    pricePerCoupleUsd: 290,
    available: true,
  },
  {
    id: 'side-by-side-long-hour',
    name: 'The Long Hour for Two',
    description: 'Ninety unhurried minutes of full-body warm oil massage side by side.',
    includes: [{ treatmentId: 'velvet-hour-massage', minutes: 90 }],
    suiteMinutes: 0,
    pricePerCoupleUsd: 410,
    available: true,
  },
  {
    id: 'anniversary-ritual',
    name: 'Anniversary Ritual',
    description:
      'Magnolia sea-salt body polish and full-body massage, followed by thirty private minutes in the soaking tub.',
    includes: [
      { treatmentId: 'sea-salt-body-polish', minutes: 45 },
      { treatmentId: 'velvet-hour-massage', minutes: 60 },
    ],
    suiteMinutes: 30,
    pricePerCoupleUsd: 560,
    available: true,
  },
  {
    id: 'champagne-suite',
    name: 'Champagne Suite for Two',
    description:
      'Ninety-minute deep tissue massage and express brightening facial, closing with thirty private minutes by the tub.',
    includes: [
      { treatmentId: 'deep-tissue-massage', minutes: 90 },
      { treatmentId: 'express-lift-facial', minutes: 30 },
    ],
    suiteMinutes: 30,
    pricePerCoupleUsd: 640,
    note: 'Includes two glasses of champagne (21+) or sparkling hibiscus tea.',
    available: true,
  },
];

export function resolveCouplesTreatment(
  item: CouplesTreatment,
  allTreatments: readonly Treatment[] = treatments,
): ResolvedCouplesTreatment {
  const byId = new Map(allTreatments.map((t) => [t.id, t]));
  const steps = item.includes.map((step) => {
    const treatment = byId.get(step.treatmentId);
    if (!treatment) {
      throw new Error(`couples "${item.id}": references missing treatment "${step.treatmentId}"`);
    }
    return { ...step, treatment };
  });
  const treatmentMinutes = steps.reduce((sum, step) => sum + step.minutes, 0);
  return {
    ...item,
    steps,
    treatmentMinutes,
    totalMinutes: treatmentMinutes + item.suiteMinutes,
  };
}

export function resolvedCouplesTreatments(
  items: readonly CouplesTreatment[] = couplesTreatments,
  allTreatments: readonly Treatment[] = treatments,
): ResolvedCouplesTreatment[] {
  return items
    .filter((item) => item.available)
    .map((item) => resolveCouplesTreatment(item, allTreatments));
}
