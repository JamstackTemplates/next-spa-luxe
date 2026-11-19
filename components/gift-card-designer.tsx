'use client';

import { useState } from 'react';
import {
  giftCardAmounts,
  giftCardCustomRange,
  giftCardFinishes,
  type GiftCardFinishId,
  type ResolvedGiftExperience,
} from '../content/gift-cards';
import { formatUsd } from '../content/treatments';
import { GiftCardArt } from './artwork/illustrations';
import { SiteLink } from './site-link';

type Selection =
  | { kind: 'amount'; amount: number }
  | { kind: 'experience'; experience: ResolvedGiftExperience };

/**
 * Interactive Gift Card preview designer.
 * Purely a visual preview — no form fields, no payment step, no prefilling.
 */
export function GiftCardDesigner({
  experiences,
}: {
  experiences: readonly ResolvedGiftExperience[];
}) {
  const [finishId, setFinishId] = useState<GiftCardFinishId>('champagne-foil');
  const [selection, setSelection] = useState<Selection>({ kind: 'amount', amount: 150 });

  const activeFinish = giftCardFinishes.find((f) => f.id === finishId) ?? giftCardFinishes[0];
  const valueLabel =
    selection.kind === 'amount'
      ? formatUsd(selection.amount)
      : formatUsd(selection.experience.priceUsd);
  const subtitle =
    selection.kind === 'amount'
      ? 'The Velvet Hour'
      : selection.experience.name;

  return (
    <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Large live preview card */}
      <div className="lg:col-span-7">
        <div className="printed-sheet p-6 sm:p-10">
          <div className="mx-auto max-w-lg">
            <GiftCardArt
              finish={finishId}
              valueLabel={valueLabel}
              subtitle={subtitle}
              recipientLine="For —"
              className="drop-shadow-md"
            />
          </div>
          <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2 border-t border-gilt-line pt-4 text-sm">
            <div>
              <p className="eyebrow text-champagne-ink">{activeFinish.name}</p>
              <p className="mt-1 text-muted">{activeFinish.description}</p>
            </div>
            <p className="font-display text-2xl text-ink tabular-nums">
              {selection.kind === 'amount'
                ? formatUsd(selection.amount)
                : `${formatUsd(selection.experience.priceUsd)}${selection.experience.priceSuffix}`}
            </p>
          </div>
        </div>
      </div>

      {/* Swatches & amount/experience choices */}
      <div className="space-y-8 lg:col-span-5">
        {/* Finish selection */}
        <div>
          <p className="eyebrow text-ink">1 · Choose a finish</p>
          <div className="mt-3 grid gap-2.5" role="group" aria-label="Gift card finish">
            {giftCardFinishes.map((finish) => {
              const selected = finish.id === finishId;
              return (
                <button
                  key={finish.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFinishId(finish.id)}
                  className={`flex items-start justify-between gap-3 rounded-sm border px-4 py-3 text-left transition-colors ${
                    selected
                      ? 'border-champagne bg-surface shadow-xs'
                      : 'border-line bg-bg/50 hover:border-gilt-line hover:bg-surface/70'
                  }`}
                >
                  <div>
                    <span className="block font-display text-xl text-ink">{finish.name}</span>
                    <span className="mt-0.5 block text-xs text-muted">{finish.description}</span>
                  </div>
                  <span
                    aria-hidden="true"
                    className={`mt-1 h-5 w-5 shrink-0 rounded-full border ${
                      finish.id === 'champagne-foil'
                        ? 'border-champagne bg-[#FBF6EE]'
                        : finish.id === 'taupe-linen'
                          ? 'border-champagne bg-[#C9BAAB]'
                          : 'border-champagne bg-[#7A5560]'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Amount selection */}
        <div>
          <p className="eyebrow text-ink">2 · Preview a value or experience</p>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Gift card dollar amounts">
            {giftCardAmounts.map((amount) => {
              const selected = selection.kind === 'amount' && selection.amount === amount;
              return (
                <button
                  key={amount}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setSelection({ kind: 'amount', amount })}
                  className={`min-w-20 rounded-sm border px-4 py-2.5 font-display text-2xl tabular-nums transition-colors ${
                    selected
                      ? 'border-primary bg-primary text-on-primary'
                      : 'border-gilt-line bg-surface text-ink hover:border-champagne'
                  }`}
                >
                  {formatUsd(amount)}
                </button>
              );
            })}
          </div>
          <p className="mt-2.5 text-xs text-muted">
            Custom amounts available from {formatUsd(giftCardCustomRange.min)} to{' '}
            {formatUsd(giftCardCustomRange.max)} in {formatUsd(giftCardCustomRange.step)} steps.
          </p>

          <div className="mt-4 space-y-2" role="group" aria-label="Gift card named experiences">
            {experiences.map((exp) => {
              const selected =
                selection.kind === 'experience' && selection.experience.id === exp.id;
              return (
                <button
                  key={exp.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setSelection({ kind: 'experience', experience: exp })}
                  className={`flex w-full items-baseline justify-between gap-3 rounded-sm border px-4 py-2.5 text-left transition-colors ${
                    selected
                      ? 'border-champagne bg-surface font-medium text-ink'
                      : 'border-line bg-bg/50 text-ink hover:border-gilt-line hover:bg-surface/70'
                  }`}
                >
                  <span className="font-display text-lg">{exp.name}</span>
                  <span className="price-label shrink-0 text-xs">
                    {formatUsd(exp.priceUsd)}
                    {exp.priceSuffix}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gentle enquiry reminder & CTA */}
        <div className="border-t border-gilt-line pt-5">
          <p className="text-sm text-muted">
            This preview helps you decide. Mention your chosen finish (
            <span className="text-ink">{activeFinish.name}</span>), value or experience (
            <span className="text-ink">
              {selection.kind === 'amount' ? valueLabel : `${subtitle} (${valueLabel})`}
            </span>
            ), recipient’s name and delivery preference in your enquiry — nothing is paid until we
            reply.
          </p>
          <div className="mt-4">
            <SiteLink href="/contact/" className="button">
              Enquire about a gift card
            </SiteLink>
          </div>
        </div>
      </div>
    </div>
  );
}
