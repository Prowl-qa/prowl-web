import type { Metadata } from "next";
import type { BlogPost } from "@/lib/blog";

// Site-wide social card (PQW-004) served by src/app/opengraph-image.tsx.
// Root file-convention images apply to descendant routes, but blog posts define
// their own shallow-merged metadata objects, so they restate this fallback.
// Resolved against metadataBase (https://prowl.tools/opengraph-image).
export const SITE_OG_IMAGE = "/opengraph-image";

export function createBlogPostMetadata(post: BlogPost): Metadata {
  // Per-post social image from `image` frontmatter (resolved against
  // metadataBase when relative), falling back to the site-wide card (PQW-004)
  // when a post declares none. More-specific images take precedence; the
  // fallback stays explicit because this route defines its own metadata objects.
  const images = [post.image ?? SITE_OG_IMAGE];

  return {
    title: `${post.title} - Prowl Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://prowl.tools/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@prowltools",
      images,
    },
  };
}
