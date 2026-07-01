import type { JSX } from 'react';

/**
 * Line icons for the four Prowl products — 24×24, stroke-width 2, round caps,
 * flat cyan→green gradient stroke (#2dd4ee → #34d399), no fill/background.
 * Each icon defines its own `prowlGrad` gradient; the ids are identical and
 * visually interchangeable, so repeating them across a page is harmless.
 */

const PATHS: Record<string, JSX.Element> = {
  cli: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <polyline points="7 9 10.5 12 7 15" />
      <line x1="12.5" y1="15" x2="16.5" y2="15" />
    </>
  ),
  'code-review': (
    <>
      <rect x="2.5" y="4" width="19" height="13" rx="2.5" />
      <path d="M7.5 17 L7.5 20.5 L11 17" />
      <polyline points="9.5 8.5 7.5 10.5 9.5 12.5" />
      <polyline points="14.5 8.5 16.5 10.5 14.5 12.5" />
    </>
  ),
  hub: (
    <>
      <polygon points="12 2.5 21 7 12 11.5 3 7" />
      <polyline points="3 12 12 16.5 21 12" />
      <polyline points="3 17 12 21.5 21 17" />
    </>
  ),
  infra: (
    <>
      <rect x="2.5" y="3" width="19" height="7.5" rx="2" />
      <rect x="2.5" y="13.5" width="19" height="7.5" rx="2" />
      <line x1="6.5" y1="6.75" x2="6.51" y2="6.75" />
      <line x1="6.5" y1="17.25" x2="6.51" y2="17.25" />
    </>
  ),
};

export default function ProductIcon({
  slug,
  size = 24,
  className,
}: {
  slug: string;
  size?: number;
  className?: string;
}) {
  const paths = PATHS[slug];
  if (!paths) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="prowlGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2dd4ee" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
      </defs>
      <g stroke="url(#prowlGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {paths}
      </g>
    </svg>
  );
}
