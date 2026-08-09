import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

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

const LOGO_PATH = path.join(
  process.cwd(),
  "public",
  "static",
  "img",
  "prowl-logo.png"
);

let cachedLogo: string | null = null;

async function getLogoDataUri(): Promise<string> {
  if (cachedLogo) return cachedLogo;
  const bytes = await readFile(LOGO_PATH);
  cachedLogo = `data:image/png;base64,${bytes.toString("base64")}`;
  return cachedLogo;
}

export type OgImageOptions = {
  /** Small uppercase label above the headline, e.g. "PROWL CLI". */
  eyebrow: string;
  /** One-line headline; the main message, kept short for thumbnail legibility. */
  headline: string;
};

export async function renderOgImage({
  eyebrow,
  headline,
}: OgImageOptions): Promise<ImageResponse> {
  const logoSrc = await getLogoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(1100px circle at 18% -10%, rgba(34,211,238,0.20), transparent 45%), radial-gradient(1000px circle at 108% 118%, rgba(74,222,128,0.18), transparent 45%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row: mascot logo + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={132} height={132} alt="" />
          <span
            style={{
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#fafafa",
            }}
          >
            Prowl
          </span>
        </div>

        {/* Message block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{
              fontSize: 28,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#22d3ee",
            }}
          >
            {eyebrow}
          </span>
          <span
            style={{
              fontSize: 58,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#fafafa",
              // clamp very long headlines so they stay on ~3 lines max
              display: "flex",
              maxWidth: 1000,
            }}
          >
            {headline}
          </span>
        </div>

        {/* Footer: accent bar + domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: 220,
              height: 12,
              borderRadius: 999,
              backgroundImage: "linear-gradient(90deg, #22d3ee, #4ade80)",
            }}
          />
          <span style={{ fontSize: 30, color: "#a1a1aa" }}>prowl.tools</span>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
