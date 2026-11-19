'use client';

import { useMemo, useState } from 'react';
import {
  formatUsd,
  TAG_LABELS,
  TREATMENT_CATEGORIES,
  type Treatment,
  type TreatmentCategory,
  type TreatmentTag,
} from '../content/treatments';
import { SteamDivider } from './artwork/dividers';
import { HourDial } from './artwork/hour-dial';
import { SpaIcon, type SpaIconName } from './artwork/icons';
import { TreatmentMarginArt } from './artwork/illustrations';

type LengthFilter = 'all' | 'short' | 'hour' | 'long';
type NeedFilter = 'sensitive-skin' | 'pregnancy-safe' | 'couples-available';

const LENGTH_OPTIONS: readonly { id: LengthFilter; label: string }[] = [
  { id: 'all', label: 'Any length' },
  { id: 'short', label: 'Up to 45 min' },
  { id: 'hour', label: 'About an hour' },
  { id: 'long', label: '75 min and longer' },
];

const NEED_OPTIONS: readonly { id: NeedFilter; label: string; icon: SpaIconName }[] = [
  { id: 'sensitive-skin', label: 'Sensitive skin', icon: 'sensitive-skin' },
  { id: 'pregnancy-safe', label: 'Pregnancy-safe', icon: 'pregnancy-safe' },
  { id: 'couples-available', label: 'Couples available', icon: 'couples' },
];

const CATEGORY_ICON: Record<TreatmentCategory, SpaIconName> = {
  facials: 'facial',
  body: 'massage',
  finishing: 'scalp',
};

const TAG_ICON: Record<TreatmentTag, SpaIconName> = {
  'sensitive-skin': 'sensitive-skin',
  'pregnancy-safe': 'pregnancy-safe',
  'couples-available': 'couples',
  seasonal: 'seasonal',
};

function matchesLength(item: Treatment, length: LengthFilter): boolean {
  if (length === 'all') return true;
  if (length === 'short') return item.options.some((opt) => opt.minutes <= 45);
  if (length === 'hour') return item.options.some((opt) => opt.minutes >= 50 && opt.minutes <= 65);
  return item.options.some((opt) => opt.minutes >= 75);
}

/**
 * Pure filter helper exported for tests (including owner-edit tests when an item is paused).
 */
export function filterTreatments(
  items: readonly Treatment[],
  {
    category = 'all',
    length = 'all',
    needs = [],
  }: {
    category?: 'all' | TreatmentCategory;
    length?: LengthFilter;
    needs?: readonly NeedFilter[];
  } = {},
): Treatment[] {
  return items.filter((item) => {
    if (!item.available) return false;
    if (category !== 'all' && item.category !== category) return false;
    if (!matchesLength(item, length)) return false;
    for (const need of needs) {
      if (!item.tags.includes(need)) return false;
    }
    return true;
  });
}

function TreatmentEntry({ item }: { item: Treatment }) {
  return (
    <li className="py-6 first:pt-2 last:pb-2">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-display text-2xl text-ink sm:text-[1.7rem]">{item.name}</h3>
          </div>
          <p className="mt-1.5 max-w-xl text-[0.95rem] text-muted">{item.description}</p>
          {item.tags.length > 0 ? (
            <ul className="mt-2.5 flex flex-wrap gap-2" aria-label="Treatment attributes">
              {item.tags.map((tag) => (
                <li
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/70 px-2.5 py-0.5 text-xs text-muted"
                >
                  <SpaIcon name={TAG_ICON[tag]} size={13} className="text-champagne-ink" />
                  <span>{TAG_LABELS[tag]}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Duration chips, each paired with a mini Hour Dial + price */}
        <div className="flex flex-wrap gap-2.5 sm:shrink-0 sm:justify-end">
          {item.options.map((opt) => (
            <div
              key={`${item.id}-${opt.minutes}`}
              className="inline-flex items-center gap-2.5 rounded-sm border border-gilt-line bg-bg/65 px-3 py-2"
            >
              <HourDial minutes={opt.minutes} size="mini" decorative />
              <div className="leading-tight">
                <span className="block font-sans text-[0.72rem] tracking-[0.14em] text-muted uppercase tabular-nums">
                  {opt.minutes} min
                </span>
                <span className="price-label block text-sm">{formatUsd(opt.priceUsd)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </li>
  );
}

export function TreatmentMenu({ items }: { items: readonly Treatment[] }) {
  const [category, setCategory] = useState<'all' | TreatmentCategory>('all');
  const [length, setLength] = useState<LengthFilter>('all');
  const [needs, setNeeds] = useState<NeedFilter[]>([]);

  const activeItems = useMemo(
    () => filterTreatments(items, { category, length, needs }),
    [items, category, length, needs],
  );

  const hasFilters = category !== 'all' || length !== 'all' || needs.length > 0;

  function toggleNeed(need: NeedFilter) {
    setNeeds((prev) =>
      prev.includes(need) ? prev.filter((item) => item !== need) : [...prev, need],
    );
  }

  function resetFilters() {
    setCategory('all');
    setLength('all');
    setNeeds([]);
  }

  const visibleCategories = TREATMENT_CATEGORIES.filter((cat) => {
    if (category !== 'all' && cat.id !== category) return false;
    const catActive = activeItems.filter((t) => t.category === cat.id);
    const catResting = items.filter((t) => !t.available && t.category === cat.id);
    return catActive.length > 0 || (!hasFilters && catResting.length > 0);
  });

  return (
    <div>
      {/* Sticky filter bar beneath header */}
      <div className="sticky top-[4.5rem] z-30 border-b border-gilt-line bg-bg/95 py-4 backdrop-blur-sm sm:top-20">
        <div className="wrap space-y-3">
          {/* Quick category links work even without JS; with JS they filter */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
              <button
                type="button"
                aria-pressed={category === 'all'}
                onClick={() => setCategory('all')}
                className={`rounded-full border px-3.5 py-1.5 font-sans text-xs font-medium tracking-[0.14em] uppercase transition-colors ${
                  category === 'all'
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-gilt-line bg-surface text-ink hover:border-champagne'
                }`}
              >
                All
              </button>
              {TREATMENT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={category === cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`rounded-full border px-3.5 py-1.5 font-sans text-xs font-medium tracking-[0.14em] uppercase transition-colors ${
                    category === cat.id
                      ? 'border-primary bg-primary text-on-primary'
                      : 'border-gilt-line bg-surface text-ink hover:border-champagne'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <p
                role="status"
                aria-live="polite"
                className="font-sans text-xs font-medium tracking-[0.14em] text-champagne-ink uppercase tabular-nums"
              >
                {activeItems.length} {activeItems.length === 1 ? 'treatment' : 'treatments'}
              </p>
              {hasFilters ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-link font-sans text-xs tracking-[0.12em] uppercase"
                >
                  Clear
                </button>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {/* Length filter */}
            <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by length">
              <span className="mr-1 font-sans text-[0.68rem] font-medium tracking-[0.16em] text-muted uppercase">
                Length:
              </span>
              {LENGTH_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={length === opt.id}
                  onClick={() => setLength(opt.id)}
                  className={`rounded-sm border px-2.5 py-1 text-xs transition-colors ${
                    length === opt.id
                      ? 'border-champagne bg-surface-soft font-medium text-ink'
                      : 'border-transparent text-muted hover:border-line hover:text-ink'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Needs filter */}
            <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by guest needs">
              <span className="mr-1 font-sans text-[0.68rem] font-medium tracking-[0.16em] text-muted uppercase">
                Needs:
              </span>
              {NEED_OPTIONS.map((opt) => {
                const pressed = needs.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => toggleNeed(opt.id)}
                    className={`inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-xs transition-colors ${
                      pressed
                        ? 'border-velvet bg-velvet/12 font-medium text-ink'
                        : 'border-line bg-surface/60 text-muted hover:border-champagne hover:text-ink'
                    }`}
                  >
                    <SpaIcon name={opt.icon} size={13} className="text-champagne-ink" />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* No-JS in-page category jump links */}
          <noscript>
            <nav aria-label="Jump to treatment category" className="flex flex-wrap gap-4 pt-1 text-xs">
              {TREATMENT_CATEGORIES.map((cat) => (
                <a key={cat.id} href={`#${cat.id}`} className="text-link uppercase tracking-[0.14em]">
                  {cat.label}
                </a>
              ))}
            </nav>
          </noscript>
        </div>
      </div>

      {/* Category Menu Sheets */}
      <div className="wrap space-y-20 py-14 sm:py-18">
        {visibleCategories.length === 0 ? (
          <div className="printed-sheet mx-auto max-w-xl p-10 text-center">
            <h2 className="font-display text-3xl text-ink">No treatments match every filter</h2>
            <p className="mt-3 text-muted">
              Try clearing one of the length or guest-need filters, or write to us and we’ll tailor
              an hour around what you need.
            </p>
            <button type="button" onClick={resetFilters} className="button mt-6">
              Show all treatments
            </button>
          </div>
        ) : (
          visibleCategories.map((cat) => {
            const catActive = activeItems.filter((t) => t.category === cat.id);
            const catResting = items.filter((t) => !t.available && t.category === cat.id);

            const header = (
              <div className="mb-8">
                <SteamDivider className="mb-6" />
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gilt-line bg-surface text-champagne-ink">
                      <SpaIcon name={CATEGORY_ICON[cat.id]} size={20} />
                    </span>
                    <div>
                      <h2 id={cat.id} className="font-display text-4xl text-ink sm:text-5xl">
                        {cat.label}
                      </h2>
                      {cat.note ? <p className="mt-1 text-sm text-muted">{cat.note}</p> : null}
                    </div>
                  </div>
                </div>
              </div>
            );

            const sheetContent = (
              <div className="printed-sheet p-7 sm:p-10">
                {catActive.length > 0 ? (
                  <ul className="divide-y divide-line/70">
                    {catActive.map((item) => (
                      <TreatmentEntry key={item.id} item={item} />
                    ))}
                  </ul>
                ) : null}

                {catResting.length > 0 && !hasFilters ? (
                  <div className="mt-8 border-t border-gilt-line pt-6">
                    <p className="eyebrow text-velvet">Resting this season</p>
                    <ul className="mt-3 space-y-2 text-sm text-muted">
                      {catResting.map((item) => (
                        <li key={item.id} className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="font-display text-lg text-ink/80">{item.name}</span>
                          <span className="italic">Currently resting — ask about its next return</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            );

            if (cat.id === 'facials') {
              return (
                <section key={cat.id} aria-labelledby={cat.id}>
                  {header}
                  <div className="grid items-start gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-9">{sheetContent}</div>
                    <aside className="hidden lg:col-span-3 lg:block lg:pt-6" aria-hidden="true">
                      <TreatmentMarginArt variant="facials" />
                    </aside>
                  </div>
                </section>
              );
            }

            if (cat.id === 'body') {
              return (
                <section key={cat.id} aria-labelledby={cat.id}>
                  {header}
                  <div className="grid items-start gap-10 lg:grid-cols-12">
                    <aside className="hidden lg:col-span-3 lg:block lg:pt-6" aria-hidden="true">
                      <TreatmentMarginArt variant="body" />
                    </aside>
                    <div className="lg:col-span-9">{sheetContent}</div>
                  </div>
                </section>
              );
            }

            // Finishing touches — narrow centred printed card
            return (
              <section key={cat.id} aria-labelledby={cat.id} className="mx-auto max-w-3xl">
                {header}
                {sheetContent}
              </section>
            );
          })
        )}
      </div>
    </div>
  );
}
