import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import PostHeader from "@/components/blog/PostHeader";
import PostFooter from "@/components/blog/PostFooter";

type Params = { slug: string };

// Site-wide social card (PQW-004) served by src/app/opengraph-image.tsx.
// Root file-convention images apply to descendant routes, but blog posts define
// their own shallow-merged metadata objects, so they restate this fallback.
// Resolved against metadataBase (https://prowl.tools/opengraph-image).
const SITE_OG_IMAGE = "/opengraph-image";

export function generateStaticParams(): Params[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Dynamically import the MDX file
  const { default: MDXContent } = await import(
    `../../../../content/blog/${slug}/index.mdx`
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Prowl",
      url: "https://prowl.tools",
    },
    url: `https://prowl.tools/blog/${post.slug}`,
    keywords: post.tags,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <PostHeader
          title={post.title}
          date={post.date}
          author={post.author}
          readingTime={post.readingTime}
          tags={post.tags}
        />
        <div className="prose-prowl">
          <MDXContent />
        </div>
      </article>
      <PostFooter />
    </>
  );
}
