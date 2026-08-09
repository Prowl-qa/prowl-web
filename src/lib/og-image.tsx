import type { CSSProperties } from "react";
import { ImageResponse } from "next/og";
import { OG_LOGO_DATA_URI } from "@/lib/og-logo-data";

/**
 * Shared Open Graph / Twitter card generator for the Prowl marketing site.
 *
 * Every social card is a 1200x630 dark, brand-coloured image with the Prowl
 * mascot logo, the "Prowl" wordmark, a section eyebrow, a one-line headline,
 * and the prowl.tools domain — legible at thumbnail size. Section routes
 * (`/cli`, `/code-review`, `/docs`) reuse this via the `opengraph-image` /
 * `twitter-image` file conventions with their own eyebrow + headline.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

// @vercel/og's pinned Tailwind-to-Satori parser handles layout, spacing, color,
// and typography here, but logs gradient utilities as invalid. Keep only these
// generated-image gradients in scoped CSS properties so the visual card stays
// stable while avoiding broad inline style objects.
const CARD_BACKGROUND: CSSProperties = {
  backgroundImage:
    "radial-gradient(1100px circle at 18% -10%, rgba(34,211,238,0.20), transparent 45%), radial-gradient(1000px circle at 108% 118%, rgba(74,222,128,0.18), transparent 45%)",
};

const ACCENT_BACKGROUND: CSSProperties = {
  backgroundImage: "linear-gradient(90deg, #22d3ee, #4ade80)",
};

export type OgImageOptions = {
  /** Small uppercase label above the headline, e.g. "PROWL CLI". */
  eyebrow: string;
  /** One-line headline; the main message, kept short for thumbnail legibility. */
  headline: string;
};

/**
 * Render a branded social preview image for a page or section.
 */
export function renderOgImage({
  eyebrow,
  headline,
}: OgImageOptions): ImageResponse {
  return new ImageResponse(
    (
      <div
        tw="w-full h-full flex flex-col justify-between px-20 py-[72px] bg-[#09090b] text-[#fafafa] font-sans"
        style={CARD_BACKGROUND}
      >
        {/* Brand row: mascot logo + wordmark */}
        <div tw="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={OG_LOGO_DATA_URI} width={132} height={132} alt="" />
          <span tw="ml-6 text-[76px] font-bold tracking-tight text-[#fafafa]">
            Prowl
          </span>
        </div>

        {/* Message block */}
        <div tw="flex flex-col">
          <span tw="mb-5 text-[28px] tracking-widest uppercase text-[#22d3ee]">
            {eyebrow}
          </span>
          <span tw="flex max-w-[1000px] text-[58px] leading-[1.15] tracking-tight text-[#fafafa]">
            {headline}
          </span>
        </div>

        {/* Footer: accent bar + domain */}
        <div tw="flex items-center justify-between">
          <div tw="w-[220px] h-3 rounded-full" style={ACCENT_BACKGROUND} />
          <span tw="text-[30px] text-[#a1a1aa]">prowl.tools</span>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
