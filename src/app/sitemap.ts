import type { MetadataRoute } from "next";

// The blog is hidden while it has no real content (owner decision, 2026-08-29):
// its nav/footer links are gone and it is left out of the sitemap. The /blog
// routes and the RSS feed stay live at their URLs so nothing that already
// linked to them breaks, and un-hiding is a matter of restoring the links
// and the entries below (see git history for the blog/feed sitemap entries).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://prowl.tools",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
