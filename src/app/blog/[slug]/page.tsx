import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import PostHeader from "@/components/blog/PostHeader";
import PostFooter from "@/components/blog/PostFooter";

type Params = { slug: string };

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
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@prowltools",
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
