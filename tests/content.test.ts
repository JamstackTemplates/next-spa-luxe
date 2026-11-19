import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { couplesTreatments, resolvedCouplesTreatments } from '../content/couples.ts';
import {
  giftCardExperiences,
  giftCardTerms,
  resolvedGiftExperiences,
} from '../content/gift-cards.ts';
import { packages, resolvedPackages } from '../content/packages.ts';
import { featuredTreatments, treatments } from '../content/treatments.ts';
import {
  validateAllContent,
  validateCouples,
  validateGiftCards,
  validatePackages,
  validateTreatments,
} from '../content/validate.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

test('business content has actionable required fields', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.address.formatted.includes('22 West Gaston Street'), 'address required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length >= 4, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) {
    assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  }
});

test('all spa collections pass validation with globally unique URL-safe IDs', () => {
  assert.doesNotThrow(() => validateAllContent());
  assert.equal(featuredTreatments().length, 4, 'Home must have exactly 4 featured available treatments');

  // Verify computed package totals and positive savings
  const resolved = resolvedPackages();
  assert.equal(resolved.length, 4);
  for (const pkg of resolved) {
    assert.ok(pkg.totalMinutes > 0, `package ${pkg.id}: totalMinutes > 0`);
    assert.ok(pkg.savingsUsd > 0, `package ${pkg.id}: must save money vs individual treatments`);
  }

  // Verify couples' resolved durations and per-couple prices
  const couples = resolvedCouplesTreatments();
  assert.equal(couples.length, 4);
  for (const item of couples) {
    assert.ok(item.totalMinutes >= item.treatmentMinutes);
    assert.ok(item.pricePerCoupleUsd > 0);
  }

  // Verify gift experiences resolve to live package/couples prices
  const giftExps = resolvedGiftExperiences();
  assert.equal(giftExps.length, 3);
  const velvetGift = giftExps.find((g) => g.referenceId === 'the-velvet-hour');
  assert.equal(velvetGift?.priceUsd, 345);
  const couplesGift = giftExps.find((g) => g.referenceId === 'side-by-side-hour');
  assert.equal(couplesGift?.priceUsd, 290);
  assert.equal(couplesGift?.priceSuffix, ' per couple');
});

test('treatment validation rejects bad minutes, out-of-range prices, duplicate IDs and wrong featured count', () => {
  assert.throws(
    () =>
      validateTreatments(
        treatments.map((t) =>
          t.id === 'calm-skin-facial' ? { ...t, options: [{ minutes: 20, priceUsd: 150 }] } : t,
        ),
      ),
    /calm-skin-facial/,
  );

  assert.throws(
    () =>
      validateTreatments(
        treatments.map((t) =>
          t.id === 'eye-revival' ? { ...t, options: [{ minutes: 15, priceUsd: 19.5 }] } : t,
        ),
      ),
    /eye-revival/,
  );

  assert.throws(
    () => validateTreatments([...treatments, { ...treatments[0] }]),
    /velvet-signature-facial/,
  );
});

test('package and couples validation enforces savings, treatment references and couples-available tag', () => {
  assert.throws(
    () =>
      validatePackages(
        packages.map((p) => (p.id === 'first-light' ? { ...p, priceUsd: 250 } : p)),
        treatments,
      ),
    /first-light/,
  );

  assert.throws(
    () =>
      validatePackages(
        packages.map((p) =>
          p.id === 'first-light'
            ? { ...p, includes: [{ treatmentId: 'missing-treatment', minutes: 60 }] }
            : p,
        ),
        treatments,
      ),
    /first-light.*missing-treatment/,
  );

  assert.throws(
    () =>
      validateCouples(
        couplesTreatments.map((c) =>
          c.id === 'side-by-side-hour'
            ? { ...c, includes: [{ treatmentId: 'calm-skin-facial', minutes: 60 }] }
            : c,
        ),
        treatments,
      ),
    /side-by-side-hour.*calm-skin-facial.*couples-available/,
  );
});

test('owner edit end-to-end: pausing champagne-glow-facial removes it from featured and flags champagne-afternoon', () => {
  const mutated = treatments.map((t) =>
    t.id === 'champagne-glow-facial' ? { ...t, available: false } : t,
  );

  // Removed from active featured list (drops to 3, so validateTreatments asks for a replacement)
  const activeFeatured = featuredTreatments(mutated);
  assert.equal(activeFeatured.length, 3);
  assert.ok(!activeFeatured.some((t) => t.id === 'champagne-glow-facial'));
  assert.throws(() => validateTreatments(mutated), /exactly 4 featured available/);

  // Package referencing it fails validation naming BOTH package and treatment
  assert.throws(
    () => validatePackages(packages, mutated),
    /champagne-afternoon.*champagne-glow-facial/,
  );

  // Gift experience referencing an unavailable package fails naming the gift experience and package
  const pausedPackages = packages.map((p) =>
    p.id === 'champagne-afternoon' ? { ...p, available: false } : p,
  );
  assert.throws(
    () => validateGiftCards(giftCardExperiences, pausedPackages, couplesTreatments),
    /gift-champagne-afternoon.*champagne-afternoon/,
  );
});

test('wording rules: enquiry phrasing, 21+ alcohol-free champagne notices, and five-year gift card validity', () => {
  const filesToCheck = [
    '../content/business.ts',
    '../content/treatments.ts',
    '../content/packages.ts',
    '../content/couples.ts',
    '../content/gift-cards.ts',
    '../app/page.tsx',
    '../app/treatments/page.tsx',
    '../app/packages/page.tsx',
    '../app/gift-cards/page.tsx',
    '../app/contact/page.tsx',
    '../components/home-sections.tsx',
    '../components/inner-sections.tsx',
    '../components/gift-card-designer.tsx',
  ];

  const forbidden = /\b(book now|buy now|reserve now|add to cart|checkout)\b/i;
  for (const rel of filesToCheck) {
    const src = readFileSync(new URL(rel, import.meta.url), 'utf8');
    assert.doesNotMatch(src, forbidden, `${rel} must not contain booking/checkout wording`);
  }

  // Contact & Gift cards state nothing is booked/paid until spa replies
  assert.match(business.enquiries.introduction, /nothing is booked until we confirm/i);
  assert.ok(
    giftCardTerms.some((t) => /valid five years/i.test(t)),
    'gift card terms must state five-year validity',
  );
  assert.ok(
    giftCardTerms.some((t) => /no payment is taken|paid for.*after we reply/i.test(t)),
    'gift card terms must clarify no online payment',
  );

  // Every champagne serving mentions 21+ and an alcohol-free alternative
  const champagneExtras = [
    ...packages.flatMap((p) => p.extras),
    ...couplesTreatments.map((c) => c.note ?? ''),
    ...giftCardExperiences.map((g) => g.occasion),
  ].filter((line) => /champagne/i.test(line));
  assert.ok(champagneExtras.length >= 3);
  for (const line of champagneExtras) {
    assert.match(line, /21\+/, `champagne line must include 21+: ${line}`);
    assert.match(line, /sparkling.*tea/i, `champagne line must include alcohol-free alternative: ${line}`);
  }
});

test('schema.org structured data emits DaySpa derived from business content and escapes inline JSON-LD', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'DaySpa');
  assert.equal(schema.name, business.name);
  assert.equal(schema.email, business.email);
  assert.equal(schema.telephone, business.phone);
  assert.equal(schema.priceRange, '$$$');
  assert.equal(schema.address.streetAddress, '22 West Gaston Street');
  assert.equal(schema.address.addressLocality, 'Savannah');
  assert.equal(schema.address.addressRegion, 'GA');
  assert.equal(schema.openingHoursSpecification.length, 6, 'Monday closed; 6 open days');
  assert.ok(!schema.openingHoursSpecification.some((d) => d.dayOfWeek === 'Monday'));

  const friday = schema.openingHoursSpecification.find((d) => d.dayOfWeek === 'Friday');
  assert.deepEqual(friday, {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: 'Friday',
    opens: '10:00',
    closes: '20:00',
  });

  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
