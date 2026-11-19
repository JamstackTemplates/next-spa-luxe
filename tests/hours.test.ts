import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const sampleHours: OpeningHours[] = DAYS.map((day) =>
  day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' },
);
const atSample = (date: string, zone = 'America/New_York') =>
  openingLabel(sampleHours, zone, new Date(date));
const atSpa = (date: string, zone = 'America/New_York') =>
  openingLabel(business.hours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(atSample('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atSample('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(atSample('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(atSample('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('The Velvet Hour schedule boundaries: Monday closed, Friday 19:59/20:00, Saturday 08:59/09:00', () => {
  assert.doesNotThrow(() => validateHours(business.hours));

  // Monday 2026-11-16 14:00 EST (19:00Z) -> closed all Monday, opens Tuesday at 10:00
  assert.equal(atSpa('2026-11-16T19:00:00Z'), 'Closed · opens Tuesday at 10:00');

  // Friday 2026-11-20 EST (UTC-5): 19:59 EST = 00:59Z on Nov 21; 20:00 EST = 01:00Z on Nov 21
  assert.equal(atSpa('2026-11-21T00:59:00Z'), 'Open now · until 20:00');
  assert.equal(atSpa('2026-11-21T01:00:00Z'), 'Closed · opens Saturday at 09:00');

  // Saturday 2026-11-21 EST (UTC-5): 08:59 EST = 13:59Z; 09:00 EST = 14:00Z
  assert.equal(atSpa('2026-11-21T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atSpa('2026-11-21T14:00:00Z'), 'Open now · until 19:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(atSample('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(atSample('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map((day) => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral and DST changes in March and November preserve local spa hours', () => {
  assert.equal(atSpa('2026-11-17T15:00:00Z', ''), 'See opening hours');
  assert.equal(atSpa('2026-11-17T15:00:00Z', 'Mars/Base'), 'See opening hours');

  // Spring forward: Sunday 2026-03-08 (EDT UTC-4 after 02:00 local). Sunday opens 10:00 EDT = 14:00Z
  assert.equal(atSpa('2026-03-08T13:59:00Z'), 'Closed · opens today at 10:00');
  assert.equal(atSpa('2026-03-08T14:00:00Z'), 'Open now · until 17:00');

  // Fall back: Sunday 2026-11-01 (EST UTC-5 after 02:00 local). Sunday opens 10:00 EST = 15:00Z
  assert.equal(atSpa('2026-11-01T14:59:00Z'), 'Closed · opens today at 10:00');
  assert.equal(atSpa('2026-11-01T15:00:00Z'), 'Open now · until 17:00');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(sampleHours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(
      () => validateHours(sampleHours.map((x) => (x.day === 'Tuesday' ? { ...x, opens } : x))),
      /Tuesday/,
    );
  }
  assert.throws(() => validateHours(sampleHours.slice(1)), /Monday/);
  assert.throws(
    () => validateHours(sampleHours.map((x) => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))),
    /Tuesday/,
  );
  // Explicit overnight interval check (e.g. Friday 20:00 to 02:00)
  assert.throws(
    () =>
      validateHours(
        business.hours.map((x) =>
          x.day === 'Friday' ? { day: 'Friday', opens: '20:00', closes: '02:00' } : x,
        ),
      ),
    /Friday.*overnight/i,
  );
});
