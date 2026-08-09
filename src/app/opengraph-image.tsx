import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Prowl — the testing suite made for agents, controlled by humans";

export default function Image() {
  return renderOgImage({
    eyebrow: "The Prowl suite",
    headline: "The testing suite made for agents, controlled by humans.",
  });
}
