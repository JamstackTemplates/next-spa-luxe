'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { Monogram } from './artwork/monogram';
import { SpaIcon } from './artwork/icons';
import { SiteLink } from './site-link';

const NAV_LINKS = [
  { href: '/treatments/', label: 'Treatments' },
  { href: '/packages/', label: 'Packages' },
  { href: '/gift-cards/', label: 'Gift cards' },
  { href: '/contact/', label: 'Visit & enquire' },
] as const;

const wordmarkWords = business.wordmark.split(' ');
const wordmarkLast = wordmarkWords.pop() ?? '';
const wordmarkLead = wordmarkWords.join(' ');

export function SiteHeader() {
  const drawerId = useId();
  const drawerRef = useRef<HTMLDialogElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const drawer = drawerRef.current;
    const scroller = scrollerRef.current;
    const sheet = sheetRef.current;
    if (!drawer || !scroller || !sheet) return;

    const threshold = Math.max(0.01, 1 / Math.max(window.innerWidth, 320));
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.at(-1);
        if (!entry) return;
        if (entry.intersectionRatio < threshold && drawer.open) {
          drawer.close();
          setOpen(false);
        } else if (entry.intersectionRatio >= 0.99 && drawer.open) {
          setOpen(true);
        }
      },
      { root: drawer, threshold: [threshold, 0.99] },
    );
    observer.observe(sheet);

    const onScroll = () => {
      if (!sheet.offsetWidth) return;
      const ratio = Math.min(1, Math.max(0, scroller.scrollLeft / sheet.offsetWidth));
      drawer.style.setProperty('--drawer-backdrop', String(ratio));
    };

    const supportsScrollTimeline =
      typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline: scroll()');
    if (!supportsScrollTimeline) {
      scroller.addEventListener('scroll', onScroll, { passive: true });
    }

    const onCancel = (event: Event) => {
      if (event.cancelable) {
        event.preventDefault();
        scroller.scrollTo({ left: 0, behavior: 'auto' });
      } else {
        setOpen(false);
      }
    };
    drawer.addEventListener('cancel', onCancel);

    return () => {
      observer.disconnect();
      scroller.removeEventListener('scroll', onScroll);
      drawer.removeEventListener('cancel', onCancel);
    };
  }, []);

  async function openDrawer() {
    const drawer = drawerRef.current;
    const scroller = scrollerRef.current;
    const sheet = sheetRef.current;
    if (!drawer || !scroller || !sheet) return;

    drawer.showModal();
    setOpen(true);

    const supportsInitialTarget =
      typeof CSS !== 'undefined' && CSS.supports && CSS.supports('scroll-initial-target', 'nearest');
    if (!supportsInitialTarget) {
      scroller.scrollTo({ left: 0, behavior: 'instant' as ScrollBehavior });
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      );
    }

    scroller.scrollTo({ left: scroller.scrollWidth, behavior: 'auto' });
  }

  function closeDrawer() {
    const drawer = drawerRef.current;
    const scroller = scrollerRef.current;
    if (!drawer || !scroller) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      drawer.close();
      setOpen(false);
      return;
    }
    scroller.scrollTo({ left: 0, behavior: 'auto' });
  }

  return (
    <header className="sticky top-0 z-40 bg-bg/92 backdrop-blur-md">
      {/* The dial unrolled beneath the header: sixty gilt minutes */}
      <div aria-hidden="true" className="tick-rule pointer-events-none absolute inset-x-0 bottom-0 opacity-70" />
      <div className="wrap flex min-h-18 items-center justify-between gap-2 py-2 sm:min-h-20 sm:gap-4">
        {/* Monogram + Italiana Wordmark */}
        <SiteLink
          href="/"
          className="group flex shrink-0 items-center gap-2.5 no-underline hover:no-underline sm:gap-3"
          aria-label={`${business.name} — Home`}
        >
          <Monogram size={38} className="transition-transform duration-300 group-hover:scale-[1.03]" />
          <span className="flex flex-col">
            <span className="font-display text-[1.02rem] leading-[0.95] tracking-tight text-ink sm:text-[1.45rem] sm:leading-none">
              {/* Stacked on phones so the appointment button keeps its place */}
              {wordmarkLead}
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
              {wordmarkLast}
            </span>
            <span className="mt-0.5 hidden font-sans text-[0.62rem] font-medium tracking-[0.22em] text-muted uppercase sm:block">
              Day Spa · Savannah
            </span>
          </span>
        </SiteLink>

        {/* Desktop Navigation */}
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((item) => (
            <SiteLink
              key={item.href}
              href={item.href}
              markCurrent="page"
              className="font-sans text-[0.74rem] font-medium tracking-[0.18em] text-ink uppercase no-underline transition-colors hover:text-champagne-ink"
            >
              {item.label}
            </SiteLink>
          ))}
        </nav>

        {/* Actions: Request an appointment + DarkModeToggle + Mobile menu button */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <SiteLink
            href="/contact/"
            className="button min-h-10 px-2.5 py-2 text-[0.63rem] tracking-[0.09em] whitespace-nowrap sm:min-h-11 sm:px-4 sm:text-[0.73rem] sm:tracking-[0.14em]"
          >
            Request an appointment
          </SiteLink>

          <div className="hidden sm:block">
            <DarkModeToggle />
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-gilt-line bg-surface text-ink transition-colors hover:border-champagne lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls={drawerId}
            onClick={openDrawer}
          >
            <SpaIcon name="menu" size={20} />
          </button>
        </div>
      </div>

      {/* Full-height linen mobile navigation drawer (<dialog>) */}
      <dialog
        id={drawerId}
        ref={drawerRef}
        className="spa-drawer lg:hidden"
        aria-label="Site navigation"
        onClick={(event) => {
          if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
            closeDrawer();
          }
        }}
      >
        <div ref={scrollerRef} className="spa-drawer-scroller">
          <nav ref={sheetRef} className="spa-drawer-sheet p-7" aria-label="Mobile navigation">
            <div>
              <div className="flex items-center justify-between border-b border-gilt-line pb-5">
                <div className="flex items-center gap-2.5">
                  <Monogram size={34} />
                  <span className="font-display text-xl text-ink">{business.wordmark}</span>
                </div>
                <div className="flex items-center gap-2">
                <div className="sm:hidden">
                  <DarkModeToggle />
                </div>
                <button
                  type="button"
                  autoFocus
                  onClick={closeDrawer}
                  aria-label="Close menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-gilt-line bg-surface text-ink"
                >
                  <SpaIcon name="close" size={20} />
                </button>
                </div>
              </div>

              <ul className="mt-8 space-y-5">
                <li>
                  <SiteLink
                    href="/"
                    markCurrent="page"
                    onClick={closeDrawer}
                    className="block font-display text-4xl text-ink no-underline hover:text-champagne-ink"
                  >
                    Home
                  </SiteLink>
                </li>
                {NAV_LINKS.map((item) => (
                  <li key={item.href}>
                    <SiteLink
                      href={item.href}
                      markCurrent="page"
                      onClick={closeDrawer}
                      className="block font-display text-4xl text-ink no-underline hover:text-champagne-ink"
                    >
                      {item.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 border-t border-gilt-line pt-6 text-sm text-muted">
              <p className="eyebrow text-champagne-ink">Visit the townhouse</p>
              <p className="mt-2 text-ink">{business.address.formatted}</p>
              <p className="mt-1">{business.address.landmark}</p>
              <p className="mt-3">
                <a className="text-link" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
              </p>
              <p className="mt-1">
                <a className="text-link" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>
                  {business.phone}
                </a>
              </p>
            </div>
          </nav>
        </div>
      </dialog>
    </header>
  );
}
