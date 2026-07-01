import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

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
    ...["cli", "code-review", "hub", "infra"].map((slug) => ({
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
    ...blogEntries,
  ];
}
