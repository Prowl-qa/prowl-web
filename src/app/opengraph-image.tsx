import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Prowl — E2E tests for native macOS and web apps from one YAML file";

export default function Image() {
  return renderOgImage({
    eyebrow: "Prowl CLI",
    headline: "E2E tests for native macOS and web apps, from one YAML file.",
  });
}
