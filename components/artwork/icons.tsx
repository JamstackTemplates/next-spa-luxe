/**
 * Bespoke 24px line-art icon set for The Velvet Hour Day Spa.
 * Shared style: 1.35px rounded strokes, zero stock icons or emoji.
 */
export type SpaIconName =
  | 'facial'
  | 'massage'
  | 'hot-stone'
  | 'body-polish'
  | 'cocoon'
  | 'scalp'
  | 'eye'
  | 'hand-balm'
  | 'couples'
  | 'gift'
  | 'clock'
  | 'pin'
  | 'phone'
  | 'envelope'
  | 'champagne'
  | 'tea'
  | 'pregnancy-safe'
  | 'sensitive-skin'
  | 'robe'
  | 'slippers'
  | 'lounge'
  | 'seasonal'
  | 'menu'
  | 'close'
  | 'arrow-right';

export function SpaIcon({
  name,
  size = 20,
  className = '',
}: {
  name: SpaIconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      {name === 'facial' && (
        <>
          {/* Serene profile with botanical leaf */}
          <path d="M9 4.5c3.5 0 6 2.6 6 6.2 0 1.3.7 2.4 1.2 3.1-.7.6-1.2 1-1.3 1.9-.2 1.8-1.6 3.3-4.1 3.8" />
          <path d="M12.5 11.2c.6.2 1.2.1 1.6-.2" />
          <path d="M4.5 19.5c.8-4.2 3.5-7 7.2-8.2-1.2 3.7-3.6 6.7-7.2 8.2Z" />
          <path d="M4.5 19.5c2.2-2.2 4.3-4.3 6.2-6.2" />
        </>
      )}
      {name === 'massage' && (
        <>
          {/* Two gentle open hands */}
          <path d="M4 14.5c1.8-2.4 4.2-3.3 7-2.8 1.6.3 3.2.2 4.6-.5" />
          <path d="M6.5 10.5c1.8-1.8 4.4-2.5 7.2-1.8 1.7.4 3.4.3 5-.6" />
          <path d="M5.5 18.2c2.5-1.2 5.4-1.4 8.5-.7 2 .4 4 .1 5.8-.9" />
          <circle cx="18.5" cy="6.2" r="1.4" />
        </>
      )}
      {name === 'hot-stone' && (
        <>
          {/* Three stacked basalt stones */}
          <ellipse cx="12" cy="17.8" rx="7.5" ry="2.6" />
          <ellipse cx="12" cy="12.6" rx="5.5" ry="2.2" />
          <ellipse cx="12" cy="8.1" rx="3.4" ry="1.8" />
          <path d="M12 4.8c0-1 .7-1.6.7-2.3" />
        </>
      )}
      {name === 'body-polish' && (
        <>
          {/* Apothecary salt polish jar & wooden spoon */}
          <rect x="6" y="9" width="12" height="10.5" rx="2.5" />
          <path d="M5 9h14" />
          <path d="M7.5 6.5h9v2.5h-9z" />
          <path d="M9.5 14.2h5" />
          <circle cx="12" cy="16.5" r="0.6" fill="currentColor" />
        </>
      )}
      {name === 'cocoon' && (
        <>
          {/* Draped cocoon wrap & botanical stem */}
          <path d="M7 19.5c-1.8-3.8-1.5-9.5 2-13.5 1.8-2 4.2-2 6 0 3.5 4 3.8 9.7 2 13.5Z" />
          <path d="M8.5 14c2.4-1.2 4.6-1.2 7 0" />
          <path d="M9.5 10c1.8-.9 3.2-.9 5 0" />
        </>
      )}
      {name === 'scalp' && (
        <>
          {/* Warm oil drop and gentle crown waves */}
          <path d="M12 3.8c2.2 3.2 4 5.4 4 7.7a4 4 0 1 1-8 0c0-2.3 1.8-4.5 4-7.7Z" />
          <path d="M5.5 19c2-1.3 4.2-1.3 6.5 0s4.5 1.3 6.5 0" />
        </>
      )}
      {name === 'eye' && (
        <>
          {/* Resting closed eye with cooling globe arc */}
          <path d="M3.5 12c2.2 3 5.2 4.5 8.5 4.5s6.3-1.5 8.5-4.5" />
          <path d="M7.5 15.2 6 17.5M12 16.5v2.7M16.5 15.2 18 17.5" />
          <path d="M6.5 8.5c1.7-1.2 3.6-1.8 5.5-1.8s3.8.6 5.5 1.8" />
        </>
      )}
      {name === 'hand-balm' && (
        <>
          {/* Warm balm dish and botanical leaf */}
          <path d="M4.5 14.5h15a6.5 6.5 0 0 1-6.5 5.5h-2a6.5 6.5 0 0 1-6.5-5.5Z" />
          <path d="M9 11.2c.5-2.5 2.4-4.2 5.2-5-.6 2.5-2.1 4.4-5.2 5Z" />
          <path d="M12 11.2v3.3" />
        </>
      )}
      {name === 'couples' && (
        <>
          {/* Two robes hanging on brass hooks */}
          <circle cx="8" cy="5.5" r="1.3" />
          <circle cx="16" cy="5.5" r="1.3" />
          <path d="M8 7v1.5L5.2 11l1.2 8.5h3.2L10.8 11 8 8.5" />
          <path d="M16 7v1.5L13.2 11l1.2 8.5h3.2L18.8 11 16 8.5" />
          <path d="M6.3 14.5h3.4M14.3 14.5h3.4" />
        </>
      )}
      {name === 'gift' && (
        <>
          {/* Gift box with velvet bow */}
          <rect x="4" y="10" width="16" height="10" rx="1.2" />
          <path d="M3 7h18v3H3z" />
          <path d="M12 7v13" />
          <path d="M12 7C10.5 4.2 7.5 3.6 7.5 5.6c0 1.4 2.2 1.4 4.5 1.4 2.3 0 4.5 0 4.5-1.4 0-2-3-1.4-4.5 1.4Z" />
        </>
      )}
      {name === 'clock' && (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v5l3.2 2" />
          <path d="M12 3.5v1.2M20.5 12h-1.2M12 20.5v-1.2M3.5 12h1.2" />
        </>
      )}
      {name === 'pin' && (
        <>
          <path d="M12 20.5s6.5-5.6 6.5-10.8a6.5 6.5 0 1 0-13 0c0 5.2 6.5 10.8 6.5 10.8Z" />
          <circle cx="12" cy="9.8" r="2.3" />
        </>
      )}
      {name === 'phone' && (
        <path d="M6.8 4.2h2.7l1.3 3.6-1.8 1.4a11.2 11.2 0 0 0 5.8 5.8l1.4-1.8 3.6 1.3v2.7a1.8 1.8 0 0 1-2 1.8A14.2 14.2 0 0 1 5 6.2a1.8 1.8 0 0 1 1.8-2Z" />
      )}
      {name === 'envelope' && (
        <>
          <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
          <path d="M4.2 6.5 12 12.6l7.8-6.1" />
        </>
      )}
      {name === 'champagne' && (
        <>
          {/* Wide champagne coupe */}
          <path d="M5 7h14c0 3.8-3 6-7 6s-7-2.2-7-6Z" />
          <path d="M12 13v7" />
          <path d="M8.5 20h7" />
          <path d="M9.5 4.2c.3-.5.6-.8.6-1.2M13.5 4.5c.3-.5.6-.8.6-1.2" />
        </>
      )}
      {name === 'tea' && (
        <>
          <path d="M5 10h11v4.5a5.5 5.5 0 0 1-11 0V10Z" />
          <path d="M16 11h2a2 2 0 0 1 0 4h-2" />
          <path d="M4 20h13" />
          <path d="M8.5 7c0-1 .8-1.4.8-2.4M12 7c0-1 .8-1.4.8-2.4" />
        </>
      )}
      {name === 'pregnancy-safe' && (
        <>
          {/* Crescent moon and tender leaf */}
          <path d="M14.5 4.5a7.2 7.2 0 1 0 5.2 12.1 5.6 5.6 0 0 1-5.2-12.1Z" />
          <path d="M15 11.5c1.8-.3 3.4-1.3 4.3-2.8-1.8-.3-3.5.4-4.3 2.8Z" />
        </>
      )}
      {name === 'sensitive-skin' && (
        <>
          {/* Delicate feather */}
          <path d="M19.2 4.8C13.5 5.2 8.6 9.3 6.2 15.8L4.8 19.2l3.4-1.4C14.7 15.4 18.8 10.5 19.2 4.8Z" />
          <path d="M4.8 19.2 15.5 8.5" />
          <path d="M10.5 13.5H7.8M13.5 10.5h-2.5" />
        </>
      )}
      {name === 'seasonal' && (
        <>
          {/* Four-point champagne star / seasonal blossom */}
          <path d="M12 3.5 14 10l6.5 2-6.5 2-2 6.5-2-6.5L3.5 12 10 10l2-6.5Z" />
        </>
      )}
      {name === 'robe' && (
        <>
          <path d="M9 4.5 12 8.5l3-4 4.5 3-1.8 4-2-1v9.5H8.3V10.5l-2 1-1.8-4L9 4.5Z" />
          <path d="M8.3 13.5h7.4" />
          <path d="M12 13.5v6.5" />
        </>
      )}
      {name === 'slippers' && (
        <>
          <path d="M7.5 5.5c2 0 3.3 2.2 3.3 6.5S9.5 19 7.5 19s-3.3-2.5-3.3-7 1.3-6.5 3.3-6.5Z" />
          <path d="M4.4 12.2c1.6-1.2 4.6-1.2 6.2 0" />
          <path d="M16.5 6.5c2 0 3.3 2.2 3.3 6.2s-1.3 6.8-3.3 6.8-3.3-2.4-3.3-6.8 1.3-6.2 3.3-6.2Z" />
          <path d="M13.4 13c1.6-1.2 4.6-1.2 6.2 0" />
        </>
      )}
      {name === 'lounge' && (
        <>
          {/* Arched lounge chair & park window */}
          <path d="M6 19.5V10a6 6 0 1 1 12 0v9.5" />
          <path d="M4 19.5h16" />
          <path d="M8.5 14.5h7M12 4v15.5" />
        </>
      )}
      {name === 'menu' && (
        <>
          <path d="M4 7.5h16M4 12h16M4 16.5h11" />
        </>
      )}
      {name === 'close' && (
        <>
          <path d="M6 6l12 12M18 6 6 18" />
        </>
      )}
      {name === 'arrow-right' && (
        <>
          <path d="M4.5 12h14.5M13.5 6.8 19 12l-5.5 5.2" />
        </>
      )}
    </svg>
  );
}
