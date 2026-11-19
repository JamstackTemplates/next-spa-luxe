import { packages, type SpaPackage } from './packages.ts';
import { couplesTreatments, type CouplesTreatment } from './couples.ts';

/**
 * Gift card finishes, dollar amounts, experience links, delivery choices and terms.
 * The site takes no payment; gift cards are arranged and paid for only after the spa replies.
 */
export type GiftCardFinishId = 'champagne-foil' | 'taupe-linen' | 'velvet-ribbon-box';

export interface GiftCardFinish {
  /** Stable, URL-safe unique identifier. */
  id: GiftCardFinishId;
  /** Display name. */
  name: string;
  /** Physical card presentation description. */
  description: string;
}

export interface GiftExperience {
  /** Unique URL-safe ID for the gift card listing (distinct from the target package/couples ID). */
  id: string;
  /** Whether this gift card points to a single-guest package or a couples' treatment. */
  referenceType: 'package' | 'couples';
  /** Target ID in content/packages.ts or content/couples.ts; must resolve to an available item. */
  referenceId: string;
  /** Short gift occasion note. */
  occasion: string;
}

export interface ResolvedGiftExperience extends GiftExperience {
  name: string;
  tagline: string;
  priceUsd: number;
  priceSuffix: string;
}

export const giftCardFinishes: readonly GiftCardFinish[] = [
  {
    id: 'champagne-foil',
    name: 'Champagne foil',
    description: 'Gilt fan rays and the VH monogram stamped onto heavy warm cream cotton stock.',
  },
  {
    id: 'taupe-linen',
    name: 'Taupe linen',
    description: 'Woven linen-textured card with debossed monogram and fine gilt-bevelled edges.',
  },
  {
    id: 'velvet-ribbon-box',
    name: 'Velvet ribbon box',
    description: 'A lidded keepsake box wrapped in plum-velvet ribbon with a hand-lettered gift tag.',
  },
];

export const giftCardAmounts: readonly number[] = [100, 150, 250, 500];

export const giftCardCustomRange = {
  min: 50,
  max: 1000,
  step: 25,
} as const;

export const giftCardExperiences: readonly GiftExperience[] = [
  {
    id: 'gift-the-velvet-hour',
    referenceType: 'package',
    referenceId: 'the-velvet-hour',
    occasion: 'Our signature two-and-a-half-hour townhouse ritual.',
  },
  {
    id: 'gift-champagne-afternoon',
    referenceType: 'package',
    referenceId: 'champagne-afternoon',
    occasion: 'Polish, glow facial, warm mitts and champagne (21+) or sparkling hibiscus tea.',
  },
  {
    id: 'gift-side-by-side-hour',
    referenceType: 'couples',
    referenceId: 'side-by-side-hour',
    occasion: 'An unhurried hour for two in the private Magnolia Suite.',
  },
];

export const giftCardDeliveryOptions: readonly { id: string; title: string; detail: string }[] = [
  {
    id: 'posted',
    title: 'Posted card',
    detail: 'Mailed in a wax-sealed linen outer envelope anywhere in the United States.',
  },
  {
    id: 'collected',
    title: 'Collected at reception',
    detail: 'Ready for pickup at 22 West Gaston Street during opening hours, ribbon-tied.',
  },
  {
    id: 'emailed',
    title: 'Emailed e-card',
    detail: 'A printable champagne-and-linen certificate sent directly to you or the recipient.',
  },
];

export const giftCardTerms: readonly string[] = [
  'Gift cards are valid five years from the date of issue.',
  'Gift cards are not exchangeable for cash and cannot be replaced if lost without proof of issue.',
  'Experience cards honour the named package or couples’ treatment at any later menu price.',
  'No payment is taken on this website; gift cards are paid for and issued only after we reply by email or phone.',
];

export function resolveGiftExperience(
  exp: GiftExperience,
  allPackages: readonly SpaPackage[] = packages,
  allCouples: readonly CouplesTreatment[] = couplesTreatments,
): ResolvedGiftExperience {
  if (exp.referenceType === 'package') {
    const found = allPackages.find((pkg) => pkg.id === exp.referenceId);
    if (!found) {
      throw new Error(`gift experience "${exp.id}": references missing package "${exp.referenceId}"`);
    }
    return {
      ...exp,
      name: found.name,
      tagline: found.tagline,
      priceUsd: found.priceUsd,
      priceSuffix: '',
    };
  }
  const found = allCouples.find((item) => item.id === exp.referenceId);
  if (!found) {
    throw new Error(`gift experience "${exp.id}": references missing couples item "${exp.referenceId}"`);
  }
  return {
    ...exp,
    name: found.name,
    tagline: found.description,
    priceUsd: found.pricePerCoupleUsd,
    priceSuffix: ' per couple',
  };
}

export function resolvedGiftExperiences(
  exps: readonly GiftExperience[] = giftCardExperiences,
  allPackages: readonly SpaPackage[] = packages,
  allCouples: readonly CouplesTreatment[] = couplesTreatments,
): ResolvedGiftExperience[] {
  return exps.map((exp) => resolveGiftExperience(exp, allPackages, allCouples));
}
