import { ImageResponse } from "next/og";
import {
  createOgImageContent,
  type OgImageOptions,
} from "@/lib/og-image-content";
import { OG_LOGO_DATA_URI } from "@/lib/og-logo-data";

/**
 * Shared Open Graph / Twitter card generator for the Prowl marketing site.
 *
 * Every social card is a 1200x630 dark, brand-coloured image with the Prowl
 * mascot logo, the "Prowl" wordmark, a section eyebrow, a one-line headline,
 * and the prowl.tools domain — legible at thumbnail size. Section routes
 * (`/cli`, `/docs`) reuse this via the `opengraph-image` /
 * `twitter-image` file conventions with their own eyebrow + headline.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

/**
 * Render a branded social preview image for a page or section.
 */
export function renderOgImage({
  eyebrow,
  headline,
}: OgImageOptions): ImageResponse {
  return new ImageResponse(
    createOgImageContent({ eyebrow, headline, logoDataUri: OG_LOGO_DATA_URI }),
    { ...OG_SIZE }
  );
}
