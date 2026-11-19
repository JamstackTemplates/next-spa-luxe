'use client';

import { useEffect, useState } from 'react';
import {
  currentDayInZone,
  isOpenNow,
  openingLabel,
  type Day,
  type OpeningHours,
} from '../lib/hours';
import { site } from '../lib/site';

/**
 * Browser-only live open/closed badge.
 * Static/SSR/no-JS output stays strictly neutral ("See opening hours");
 * in the browser it computes in the business's IANA time zone and refreshes every minute.
 */
export function OpenBadge({
  hours,
  className = '',
}: {
  hours: readonly OpeningHours[];
  className?: string;
}) {
  const [label, setLabel] = useState('See opening hours');
  const [openState, setOpenState] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setLabel(openingLabel(hours, site.timeZone, now));
      setOpenState(isOpenNow(hours, site.timeZone, now));
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-gilt-line bg-surface px-3.5 py-1.5 font-sans text-xs font-medium tracking-[0.08em] text-ink ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${
          openState === true
            ? 'bg-champagne'
            : openState === false
              ? 'bg-velvet'
              : 'bg-taupe'
        }`}
      />
      <span>{label}</span>
    </span>
  );
}

function formatRange(entry: OpeningHours): string {
  if (!entry.opens || !entry.closes) return 'Closed';
  return `${entry.opens} – ${entry.closes}`;
}

/**
 * Neutral 7-day hours table. Static/no-JS HTML renders all seven days with zero "today/open" claims;
 * in the browser, the current weekday in the business time zone receives a subtle highlight.
 */
export function HoursTable({
  hours,
  className = '',
}: {
  hours: readonly OpeningHours[];
  className?: string;
}) {
  const [today, setToday] = useState<Day | null>(null);

  useEffect(() => {
    const update = () => setToday(currentDayInZone(site.timeZone, new Date()));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <dl className={`divide-y divide-line/70 border-y border-gilt-line text-sm ${className}`}>
      {hours.map((entry) => {
        const isToday = today === entry.day;
        return (
          <div
            key={entry.day}
            className={`flex items-baseline justify-between gap-4 px-2 py-2.5 ${
              isToday ? 'bg-champagne/12 font-medium text-ink' : 'text-ink'
            }`}
          >
            <dt className="flex items-center gap-2">
              <span>{entry.day}</span>
              {isToday ? (
                <span className="font-sans text-[0.65rem] font-medium tracking-[0.16em] text-champagne-ink uppercase">
                  Today
                </span>
              ) : null}
            </dt>
            <dd
              className={`tabular-nums ${
                entry.opens ? (isToday ? 'text-ink' : 'text-muted') : 'text-muted italic'
              }`}
            >
              {formatRange(entry)}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

/**
 * Compact 7-day hours list used in the site footer, highlighting today only in the browser.
 */
export function FooterHours({
  hours,
  className = '',
}: {
  hours: readonly OpeningHours[];
  className?: string;
}) {
  const [today, setToday] = useState<Day | null>(null);

  useEffect(() => {
    const update = () => setToday(currentDayInZone(site.timeZone, new Date()));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <dl className={`space-y-1.5 text-sm ${className}`}>
      {hours.map((entry) => {
        const isToday = today === entry.day;
        return (
          <div
            key={entry.day}
            className={`flex items-baseline justify-between gap-3 ${
              isToday ? 'font-medium text-ink' : 'text-muted'
            }`}
          >
            <dt className="flex items-center gap-1.5">
              {isToday ? <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-champagne" /> : null}
              <span>{entry.day}</span>
            </dt>
            <dd className="tabular-nums">{formatRange(entry)}</dd>
          </div>
        );
      })}
    </dl>
  );
}
