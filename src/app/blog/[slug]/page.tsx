import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { createBlogPostMetadata } from "@/lib/blog-metadata";
import PostHeader from "@/components/blog/PostHeader";
import PostFooter from "@/components/blog/PostFooter";

type Params = { slug: string };
type BlogPostModule = { default: ComponentType };

const blogPostModules = {
  "introducing-prowl-qa-blog": () =>
    import("../../../../content/blog/introducing-prowl-qa-blog/index.mdx"),
} satisfies Record<string, () => Promise<BlogPostModule>>;

function getBlogPostModule(slug: string) {
  return blogPostModules[slug as keyof typeof blogPostModules] ?? null;
}

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

  return createBlogPostMetadata(post);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const loadBlogPostModule = getBlogPostModule(post.slug);
  if (!loadBlogPostModule) notFound();

  const { default: MDXContent } = await loadBlogPostModule();

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
