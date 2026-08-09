import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Prowl CLI — deterministic E2E testing with YAML hunts";

export default function Image() {
  return renderOgImage({
    eyebrow: "Prowl CLI",
    headline: "Deterministic E2E testing with YAML hunts.",
  });
}
