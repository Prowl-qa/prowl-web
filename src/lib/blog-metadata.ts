import type { Metadata } from "next";
import type { BlogPost } from "@/lib/blog";
// Relative, extension-ful import (not the "@/" alias) so the node --test
// runner — which strips types but resolves neither tsconfig path aliases nor
// extensionless ESM specifiers — can load this value import when tests import
// blog-metadata. `allowImportingTsExtensions` keeps tsc/Next happy.
import { rssAlternateTypes } from "./rss.ts";

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
    // Per-post canonical to its own URL (PQW-010), resolved against
    // metadataBase. `types` re-included so RSS autodiscovery survives Next's
    // shallow alternates merge on this self-defined metadata object.
    alternates: {
      canonical: `/blog/${post.slug}`,
      types: rssAlternateTypes,
    },
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
