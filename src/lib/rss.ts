import type { Metadata } from "next";
import type { BlogPost } from "@/lib/blog";

/** Public path of the blog RSS feed (relative; resolved against metadataBase). */
export const BLOG_FEED_PATH = "/blog/feed.xml";
/** Title advertised for the feed in autodiscovery links and the channel. */
export const BLOG_FEED_TITLE = "Prowl Blog";

/**
 * Site-wide RSS autodiscovery descriptor for the single blog feed (PQW-009).
 * Spread into a route's `alternates.types` so browsers/readers can discover the
 * feed via `<link rel="alternate" type="application/rss+xml">`. The URL is
 * relative and Next resolves it against `metadataBase` at render time.
 *
 * Next.js shallow-merges the top-level `alternates` field across the
 * layout→page chain, so a page that sets its own `alternates.canonical`
 * replaces (rather than deep-merges) the layout's `alternates` and would drop
 * this `types` entry. Pages that set a canonical therefore re-include this
 * constant explicitly to keep autodiscovery present.
 */
export const rssAlternateTypes: NonNullable<
  NonNullable<Metadata["alternates"]>["types"]
> = {
  "application/rss+xml": [{ url: BLOG_FEED_PATH, title: BLOG_FEED_TITLE }],
};

/** XML-escape text/attribute content for safe interpolation into the feed. */
export function escapeXml(value: string | null | undefined): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/**
 * Build the RSS 2.0 feed document for the blog.
 *
 * Pure and deterministic given its inputs — `buildDate` is passed in (rather
 * than read from `new Date()` internally) so the statically generated route can
 * document the build-time timestamp choice and so this stays unit-testable.
 * `<link>`/`<guid>`/`<atom:link>` URLs are XML-escaped for correctness even
 * though today's slugs/siteUrl contain no reserved characters.
 */
export function buildBlogFeed(
  posts: BlogPost[],
  siteUrl: string,
  buildDate: Date,
): string {
  const items = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${escapeXml(postUrl)}</link>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("\n      ")}
      <author>info@prowl.tools (${escapeXml(post.author)})</author>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${BLOG_FEED_TITLE}</title>
    <description>Articles on AI-powered testing, QA automation, and building with agents.</description>
    <link>${escapeXml(`${siteUrl}/blog`)}</link>
    <atom:link href="${escapeXml(`${siteUrl}${BLOG_FEED_PATH}`)}" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${buildDate.toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;
}
