import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { rssAlternateTypes } from "@/lib/rss";
import PostCard from "@/components/blog/PostCard";

export const metadata: Metadata = {
  title: "Blog - Prowl",
  description:
    "Articles on AI-powered testing, QA automation, and building with agents. From the team behind Prowl.",
  // Canonical to /blog (PQW-010). This also collapses `?tag=` filter URLs onto
  // /blog, removing the duplicate-content risk from tag-filtered views.
  // `types` re-included so autodiscovery survives Next's shallow alternates merge.
  alternates: {
    canonical: "/blog",
    types: rssAlternateTypes,
  },
  openGraph: {
    title: "Blog - Prowl",
    description:
      "Articles on AI-powered testing, QA automation, and building with agents.",
    url: "https://prowl.tools/blog",
    // Root opengraph-image applies to descendants, but this segment replaces
    // the parent openGraph object through shallow metadata merging.
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Prowl",
    description:
      "Articles on AI-powered testing, QA automation, and building with agents.",
    creator: "@prowltools",
    images: ["/opengraph-image"],
  },
};

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  return <BlogContent searchParams={searchParams} />;
}

async function BlogContent({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const params = await searchParams;
  const activeTag = params.tag;
  const allPosts = getAllPosts();
  const posts = activeTag
    ? allPosts.filter((post) => post.tags.includes(activeTag))
    : allPosts;

  return (
    <>
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Blog
        </h1>
        <p className="text-muted text-lg">
          Insights on AI-powered testing, QA automation, and building with
          agents.
        </p>
        {activeTag && (
          <p className="mt-3 text-sm text-muted">
            Showing posts tagged{" "}
            <span className="text-cyan font-medium">{activeTag}</span>
            {" \u2014 "}
            <Link href="/blog" className="text-cyan hover:underline">
              clear filter
            </Link>
          </p>
        )}
      </header>

      {posts.length === 0 ? (
        <p className="text-muted">No posts yet. Check back soon.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              description={post.description}
              date={post.date}
              readingTime={post.readingTime}
              tags={post.tags}
            />
          ))}
        </div>
      )}
    </>
  );
}
