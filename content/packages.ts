import { treatments, type Treatment } from './treatments.ts';

/**
 * Multi-treatment packages.
 * Total minutes and savings versus individual treatment prices are always computed — never typed.
 */
export interface PackageStep {
  /** Must match an existing, available treatment ID in content/treatments.ts. */
  treatmentId: string;
  /** Must match one of that treatment's option durations. */
  minutes: number;
}

export interface SpaPackage {
  /** Stable, URL-safe unique identifier. */
  id: string;
  /** Display title. */
  name: string;
  /** Short editorial description. */
  tagline: string;
  /** Ordered sequence of treatments shown on the package Hour Dial. */
  includes: readonly PackageStep[];
  /** Whole USD package price — must be strictly less than the sum of its included treatments. */
  priceUsd: number;
  /** Lounge or refreshment inclusions for this package. */
  extras: readonly string[];
  /** Marks the house's featured signature package shown on Home and with the wax seal. */
  signature?: boolean;
  /** False hides the package from active listings. */
  available: boolean;
}

export interface ResolvedPackageStep extends PackageStep {
  treatment: Treatment;
  separatePriceUsd: number;
}

export interface ResolvedPackage extends SpaPackage {
  steps: readonly ResolvedPackageStep[];
  totalMinutes: number;
  separateTotalUsd: number;
  savingsUsd: number;
}

export const packages: readonly SpaPackage[] = [
  {
    id: 'first-light',
    name: 'First Light',
    tagline: 'A morning reset pairing our flowing massage with a brisk brightening facial.',
    includes: [
      { treatmentId: 'express-lift-facial', minutes: 30 },
      { treatmentId: 'velvet-hour-massage', minutes: 60 },
    ],
    priceUsd: 210,
    extras: ['Tea lounge'],
    available: true,
  },
  {
    id: 'the-velvet-hour',
    name: 'The Velvet Hour',
    tagline:
      'Our house signature — an unhurried progression from warm oil massage to silk-peptide facial and camellia scalp ritual.',
    includes: [
      { treatmentId: 'velvet-hour-massage', minutes: 60 },
      { treatmentId: 'velvet-signature-facial', minutes: 75 },
      { treatmentId: 'scalp-ritual', minutes: 15 },
    ],
    priceUsd: 345,
    extras: ['Tea lounge', 'Warmed waffle robe'],
    signature: true,
    available: true,
  },
  {
    id: 'champagne-afternoon',
    name: 'Champagne Afternoon',
    tagline: 'Magnolia salt polish, radiant grape-enzyme facial and warm linen mitts for late afternoon.',
    includes: [
      { treatmentId: 'sea-salt-body-polish', minutes: 45 },
      { treatmentId: 'champagne-glow-facial', minutes: 60 },
      { treatmentId: 'hand-foot-balm', minutes: 15 },
    ],
    priceUsd: 280,
    extras: ['A glass of champagne (21+) or sparkling hibiscus tea'],
    available: true,
  },
  {
    id: 'stillwater-half-day',
    name: 'Stillwater Half Day',
    tagline: 'Four hours tucked above the park: basalt stones, sculpting facial, mineral clay cocoon and quiet lunch.',
    includes: [
      { treatmentId: 'hot-stone-ritual', minutes: 90 },
      { treatmentId: 'velvet-signature-facial', minutes: 75 },
      { treatmentId: 'cocoon-body-wrap', minutes: 60 },
      { treatmentId: 'eye-revival', minutes: 15 },
    ],
    priceUsd: 540,
    extras: ['Light lunch in the lounge'],
    available: true,
  },
];

export const packageInclusions: readonly { id: 'robe' | 'tea' | 'lounge' | 'slippers'; label: string }[] = [
  { id: 'robe', label: 'Warmed waffle robe' },
  { id: 'tea', label: 'Botanical tea service' },
  { id: 'lounge', label: 'Quiet Forsyth Park lounge' },
  { id: 'slippers', label: 'Linen slippers & refreshments' },
];

export function resolvePackage(
  pkg: SpaPackage,
  allTreatments: readonly Treatment[] = treatments,
): ResolvedPackage {
  const byId = new Map(allTreatments.map((item) => [item.id, item]));
  const steps: ResolvedPackageStep[] = pkg.includes.map((step) => {
    const treatment = byId.get(step.treatmentId);
    if (!treatment) {
      throw new Error(`package "${pkg.id}": references missing treatment "${step.treatmentId}"`);
    }
    const option = treatment.options.find((opt) => opt.minutes === step.minutes);
    if (!option) {
      throw new Error(
        `package "${pkg.id}": treatment "${step.treatmentId}" has no ${step.minutes}-minute option`,
      );
    }
    return {
      ...step,
      treatment,
      separatePriceUsd: option.priceUsd,
    };
  });
  const totalMinutes = steps.reduce((sum, step) => sum + step.minutes, 0);
  const separateTotalUsd = steps.reduce((sum, step) => sum + step.separatePriceUsd, 0);
  return {
    ...pkg,
    steps,
    totalMinutes,
    separateTotalUsd,
    savingsUsd: separateTotalUsd - pkg.priceUsd,
  };
}

export function resolvedPackages(
  allPackages: readonly SpaPackage[] = packages,
  allTreatments: readonly Treatment[] = treatments,
): ResolvedPackage[] {
  return allPackages
    .filter((pkg) => pkg.available)
    .map((pkg) => resolvePackage(pkg, allTreatments));
}
