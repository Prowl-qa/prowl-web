import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Prowl Code Review — BYOK AI code review for pull requests";

export default function Image() {
  return renderOgImage({
    eyebrow: "Prowl Code Review",
    headline: "BYOK AI code review for every pull request.",
  });
}
