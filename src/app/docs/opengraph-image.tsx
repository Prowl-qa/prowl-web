import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Prowl docs — documentation for the whole suite";

export default function Image() {
  return renderOgImage({
    eyebrow: "Prowl docs",
    headline: "Documentation for the whole Prowl suite.",
  });
}
