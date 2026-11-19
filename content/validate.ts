import { validateHours } from '../lib/hours.ts';
import { business, type Business } from './business.ts';
import { couplesTreatments, type CouplesTreatment } from './couples.ts';
import {
  giftCardAmounts,
  giftCardCustomRange,
  giftCardExperiences,
  giftCardFinishes,
  giftCardTerms,
  type GiftExperience,
} from './gift-cards.ts';
import { packages, type SpaPackage } from './packages.ts';
import {
  treatments,
  type Treatment,
  type TreatmentCategory,
  type TreatmentTag,
} from './treatments.ts';

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VALID_CATEGORIES = new Set<TreatmentCategory>(['facials', 'body', 'finishing']);
const VALID_TAGS = new Set<TreatmentTag>([
  'sensitive-skin',
  'pregnancy-safe',
  'couples-available',
  'seasonal',
]);

export interface ContentBundle {
  business: Business;
  treatments: readonly Treatment[];
  packages: readonly SpaPackage[];
  couples: readonly CouplesTreatment[];
  giftExperiences: readonly GiftExperience[];
}

export function validateTreatments(items: readonly Treatment[] = treatments): void {
  const seen = new Set<string>();
  let featuredAvailableCount = 0;

  for (const item of items) {
    if (!URL_SAFE_ID.test(item.id)) {
      throw new Error(`treatment "${item.id}": id must be lowercase URL-safe kebab-case`);
    }
    if (seen.has(item.id)) {
      throw new Error(`treatment "${item.id}": duplicate id`);
    }
    seen.add(item.id);

    if (!VALID_CATEGORIES.has(item.category)) {
      throw new Error(`treatment "${item.id}": unknown category "${item.category}"`);
    }
    if (!item.name.trim()) {
      throw new Error(`treatment "${item.id}": name is required`);
    }
    if (!item.description.trim() || item.description.length > 180) {
      throw new Error(
        `treatment "${item.id}": description is required and must be 180 characters or fewer (got ${item.description.length})`,
      );
    }
    if (!item.options.length) {
      throw new Error(`treatment "${item.id}": must have at least one duration/price option`);
    }

    const seenMinutes = new Set<number>();
    for (const opt of item.options) {
      if (
        !Number.isInteger(opt.minutes) ||
        opt.minutes < 15 ||
        opt.minutes > 120 ||
        opt.minutes % 15 !== 0
      ) {
        throw new Error(
          `treatment "${item.id}": option duration ${opt.minutes} must be a whole 15-minute step between 15 and 120`,
        );
      }
      if (seenMinutes.has(opt.minutes)) {
        throw new Error(`treatment "${item.id}": duplicate ${opt.minutes}-minute option`);
      }
      seenMinutes.add(opt.minutes);

      if (!Number.isInteger(opt.priceUsd) || opt.priceUsd < 25 || opt.priceUsd > 400) {
        throw new Error(
          `treatment "${item.id}": price $${opt.priceUsd} must be a whole dollar amount between 25 and 400`,
        );
      }
    }

    for (const tag of item.tags) {
      if (!VALID_TAGS.has(tag)) {
        throw new Error(`treatment "${item.id}": invalid tag "${tag}"`);
      }
    }

    if (item.available && item.featured) {
      featuredAvailableCount += 1;
    }
  }

  if (featuredAvailableCount !== 4) {
    throw new Error(
      `treatments: Home requires exactly 4 featured available treatments (found ${featuredAvailableCount})`,
    );
  }
}

export function validatePackages(
  allPackages: readonly SpaPackage[] = packages,
  allTreatments: readonly Treatment[] = treatments,
): void {
  const treatmentsById = new Map(allTreatments.map((t) => [t.id, t]));
  const seen = new Set<string>();

  for (const pkg of allPackages) {
    if (!URL_SAFE_ID.test(pkg.id)) {
      throw new Error(`package "${pkg.id}": id must be lowercase URL-safe kebab-case`);
    }
    if (seen.has(pkg.id)) {
      throw new Error(`package "${pkg.id}": duplicate id`);
    }
    seen.add(pkg.id);

    if (!pkg.name.trim() || !pkg.tagline.trim()) {
      throw new Error(`package "${pkg.id}": name and tagline are required`);
    }
    if (!pkg.includes.length) {
      throw new Error(`package "${pkg.id}": must include at least one treatment`);
    }
    if (!Number.isInteger(pkg.priceUsd) || pkg.priceUsd <= 0) {
      throw new Error(`package "${pkg.id}": priceUsd must be a positive whole dollar amount`);
    }

    let separateTotal = 0;
    for (const step of pkg.includes) {
      const treatment = treatmentsById.get(step.treatmentId);
      if (!treatment) {
        throw new Error(`package "${pkg.id}": references missing treatment "${step.treatmentId}"`);
      }
      if (pkg.available && !treatment.available) {
        throw new Error(
          `package "${pkg.id}": references unavailable treatment "${step.treatmentId}"`,
        );
      }
      const option = treatment.options.find((opt) => opt.minutes === step.minutes);
      if (!option) {
        throw new Error(
          `package "${pkg.id}": treatment "${step.treatmentId}" does not offer a ${step.minutes}-minute option`,
        );
      }
      separateTotal += option.priceUsd;
    }

    if (pkg.priceUsd >= separateTotal) {
      throw new Error(
        `package "${pkg.id}": price $${pkg.priceUsd} must be less than the sum of its parts ($${separateTotal})`,
      );
    }
  }
}

export function validateCouples(
  allCouples: readonly CouplesTreatment[] = couplesTreatments,
  allTreatments: readonly Treatment[] = treatments,
): void {
  const treatmentsById = new Map(allTreatments.map((t) => [t.id, t]));
  const seen = new Set<string>();

  for (const item of allCouples) {
    if (!URL_SAFE_ID.test(item.id)) {
      throw new Error(`couples "${item.id}": id must be lowercase URL-safe kebab-case`);
    }
    if (seen.has(item.id)) {
      throw new Error(`couples "${item.id}": duplicate id`);
    }
    seen.add(item.id);

    if (!item.name.trim() || !item.description.trim()) {
      throw new Error(`couples "${item.id}": name and description are required`);
    }
    if (!item.includes.length) {
      throw new Error(`couples "${item.id}": must include at least one treatment`);
    }
    if (
      !Number.isInteger(item.suiteMinutes) ||
      item.suiteMinutes < 0 ||
      item.suiteMinutes > 60 ||
      item.suiteMinutes % 15 !== 0
    ) {
      throw new Error(
        `couples "${item.id}": suiteMinutes (${item.suiteMinutes}) must be a 15-minute step between 0 and 60`,
      );
    }
    if (!Number.isInteger(item.pricePerCoupleUsd) || item.pricePerCoupleUsd <= 0) {
      throw new Error(`couples "${item.id}": pricePerCoupleUsd must be a positive whole dollar amount`);
    }

    for (const step of item.includes) {
      const treatment = treatmentsById.get(step.treatmentId);
      if (!treatment) {
        throw new Error(`couples "${item.id}": references missing treatment "${step.treatmentId}"`);
      }
      if (item.available && !treatment.available) {
        throw new Error(
          `couples "${item.id}": references unavailable treatment "${step.treatmentId}"`,
        );
      }
      if (!treatment.tags.includes('couples-available')) {
        throw new Error(
          `couples "${item.id}": treatment "${step.treatmentId}" must carry the "couples-available" tag`,
        );
      }
      const option = treatment.options.find((opt) => opt.minutes === step.minutes);
      if (!option) {
        throw new Error(
          `couples "${item.id}": treatment "${step.treatmentId}" does not offer a ${step.minutes}-minute option`,
        );
      }
    }
  }
}

export function validateGiftCards(
  exps: readonly GiftExperience[] = giftCardExperiences,
  allPackages: readonly SpaPackage[] = packages,
  allCouples: readonly CouplesTreatment[] = couplesTreatments,
): void {
  if (giftCardFinishes.length !== 3) {
    throw new Error('gift-cards: expected 3 card finishes');
  }
  for (const amount of giftCardAmounts) {
    if (
      !Number.isInteger(amount) ||
      amount < giftCardCustomRange.min ||
      amount > giftCardCustomRange.max ||
      amount % giftCardCustomRange.step !== 0
    ) {
      throw new Error(`gift-cards: amount $${amount} is outside custom range/step`);
    }
  }
  if (!giftCardTerms.some((term) => /five years/i.test(term))) {
    throw new Error('gift-cards: terms must state validity of five years');
  }

  const packagesById = new Map(allPackages.map((p) => [p.id, p]));
  const couplesById = new Map(allCouples.map((c) => [c.id, c]));
  const seen = new Set<string>();

  for (const exp of exps) {
    if (!URL_SAFE_ID.test(exp.id)) {
      throw new Error(`gift experience "${exp.id}": id must be lowercase URL-safe kebab-case`);
    }
    if (seen.has(exp.id)) {
      throw new Error(`gift experience "${exp.id}": duplicate id`);
    }
    seen.add(exp.id);

    if (exp.referenceType === 'package') {
      const target = packagesById.get(exp.referenceId);
      if (!target) {
        throw new Error(
          `gift experience "${exp.id}": references missing package "${exp.referenceId}"`,
        );
      }
      if (!target.available) {
        throw new Error(
          `gift experience "${exp.id}": references unavailable package "${exp.referenceId}"`,
        );
      }
    } else if (exp.referenceType === 'couples') {
      const target = couplesById.get(exp.referenceId);
      if (!target) {
        throw new Error(
          `gift experience "${exp.id}": references missing couples item "${exp.referenceId}"`,
        );
      }
      if (!target.available) {
        throw new Error(
          `gift experience "${exp.id}": references unavailable couples item "${exp.referenceId}"`,
        );
      }
    } else {
      throw new Error(`gift experience "${exp.id}": invalid referenceType`);
    }
  }
}

export function validateAllContent(
  bundle: ContentBundle = {
    business,
    treatments,
    packages,
    couples: couplesTreatments,
    giftExperiences: giftCardExperiences,
  },
): void {
  validateHours(bundle.business.hours);
  validateTreatments(bundle.treatments);
  validatePackages(bundle.packages, bundle.treatments);
  validateCouples(bundle.couples, bundle.treatments);
  validateGiftCards(bundle.giftExperiences, bundle.packages, bundle.couples);

  // Enforce global uniqueness across all four collections.
  const globalIds = new Map<string, string>();
  const register = (kind: string, id: string) => {
    const existing = globalIds.get(id);
    if (existing) {
      throw new Error(`content id "${id}": collides between ${existing} and ${kind}`);
    }
    globalIds.set(id, kind);
  };
  for (const t of bundle.treatments) register('treatment', t.id);
  for (const p of bundle.packages) register('package', p.id);
  for (const c of bundle.couples) register('couples', c.id);
  for (const g of bundle.giftExperiences) register('gift-experience', g.id);
}
