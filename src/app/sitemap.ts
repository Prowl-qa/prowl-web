import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { BLOG_FEED_PATH } from "@/lib/rss";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestBlogPostDate = posts.reduce<Date | null>((latest, post) => {
    const publishedAt = new Date(post.date);

    if (!latest || publishedAt > latest) {
      return publishedAt;
    }

    return latest;
  }, null);

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://prowl.tools/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: "https://prowl.tools",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...["cli", "code-review"].map((slug) => ({
      url: `https://prowl.tools/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    {
      url: "https://prowl.tools/docs",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://prowl.tools/blog",
      lastModified: latestBlogPostDate ?? new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      // Blog RSS feed (PQW-009). Included so the feed is a discoverable,
      // crawlable resource alongside the HTML pages; low priority since it is
      // a machine-readable mirror of /blog rather than a landing page.
      url: `https://prowl.tools${BLOG_FEED_PATH}`,
      lastModified: latestBlogPostDate ?? new Date(),
      changeFrequency: "weekly",
      priority: 0.4,
    },
    ...blogEntries,
  ];
}
