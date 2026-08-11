import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type BlogPostFrontmatter = {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
};

export type BlogPost = BlogPostFrontmatter & {
  slug: string;
  readingTime: string;
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const FENCE_PATTERN = /^ {0,3}(`{3,}|~{3,})(.*)$/;
const MARKDOWN_H1_PATTERN = /^ {0,3}#(?:\s|$)/;
const SETEXT_H1_PATTERN = /^ {0,3}=+\s*$/;
const RAW_H1_PATTERN = /^ {0,3}<h1(?:\s|>)/i;
let cachedPostSlugs: string[] | null = null;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function getRequiredString(
  value: unknown,
  fieldName: keyof BlogPostFrontmatter,
  slug: string
): string {
  if (!isNonEmptyString(value)) {
    throw new Error(
      `Invalid frontmatter in content/blog/${slug}/index.mdx: "${fieldName}" must be a non-empty string.`
    );
  }

  return value.trim();
}

function getDateString(value: unknown, slug: string): string {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      throw new Error(
        `Invalid frontmatter in content/blog/${slug}/index.mdx: "date" must be a valid date.`
      );
    }

    return value.toISOString();
  }

  if (!isNonEmptyString(value)) {
    throw new Error(
      `Invalid frontmatter in content/blog/${slug}/index.mdx: "date" must be a valid date string.`
    );
  }

  const normalized = value.trim();

  if (Number.isNaN(new Date(normalized).getTime())) {
    throw new Error(
      `Invalid frontmatter in content/blog/${slug}/index.mdx: "date" must be a valid date string.`
    );
  }

  return normalized;
}

function getTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value.filter(isNonEmptyString).map((tag) => tag.trim());
}

function isNotFoundError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown }).code === "ENOENT"
  );
}

export function assertNoBodyH1(content: string, slug: string): void {
  let inFence = false;
  let fenceMarker = "";
  let hasPreviousContentLine = false;

  // PostHeader owns the page h1, so body content must begin its outline at h2.
  content.split(/\r?\n/).forEach((line, index) => {
    const lineNumber = index + 1;
    const fenceMatch = line.match(FENCE_PATTERN);

    if (fenceMatch) {
      const marker = fenceMatch[1];
      const trailingText = fenceMatch[2] ?? "";

      if (!inFence) {
        inFence = true;
        fenceMarker = marker;
      } else if (
        marker[0] === fenceMarker[0] &&
        marker.length >= fenceMarker.length &&
        trailingText.trim().length === 0
      ) {
        inFence = false;
        fenceMarker = "";
      }

      hasPreviousContentLine = false;
      return;
    }

    if (inFence) return;

    const trimmed = line.trim();
    if (!trimmed) {
      hasPreviousContentLine = false;
      return;
    }

    if (MARKDOWN_H1_PATTERN.test(line)) {
      throw new Error(
        `Invalid blog content in content/blog/${slug}/index.mdx: body headings must start at "##" because PostHeader owns the page <h1>. Found markdown "#" heading on line ${lineNumber}.`
      );
    }

    if (SETEXT_H1_PATTERN.test(line) && hasPreviousContentLine) {
      throw new Error(
        `Invalid blog content in content/blog/${slug}/index.mdx: body headings must start at "##" because PostHeader owns the page <h1>. Found setext h1 underline on line ${lineNumber}.`
      );
    }

    if (RAW_H1_PATTERN.test(line)) {
      throw new Error(
        `Invalid blog content in content/blog/${slug}/index.mdx: body content must not render its own <h1> because PostHeader owns the page <h1>. Found <h1> on line ${lineNumber}.`
      );
    }

    hasPreviousContentLine = true;
  });
}

function parseFrontmatter(
  data: Record<string, unknown>,
  slug: string
): BlogPostFrontmatter {
  return {
    title: getRequiredString(data.title, "title", slug),
    description: getRequiredString(data.description, "description", slug),
    date: getDateString(data.date, slug),
    author: getRequiredString(data.author, "author", slug),
    tags: getTags(data.tags),
    image: isNonEmptyString(data.image) ? data.image.trim() : undefined,
  };
}

function getPostSlugs(): string[] {
  if (cachedPostSlugs !== null) return cachedPostSlugs;

  try {
    cachedPostSlugs = fs
      .readdirSync(CONTENT_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    return cachedPostSlugs;
  } catch (error) {
    if (isNotFoundError(error)) {
      cachedPostSlugs = [];
      return cachedPostSlugs;
    }

    console.error("Error reading blog content directory:", error);
    cachedPostSlugs = [];
    return cachedPostSlugs;
  }
}

export function clearBlogPostSlugCache(): void {
  cachedPostSlugs = null;
}

export function getPostBySlug(
  slug: string,
  availableSlugs: string[] = getPostSlugs()
): BlogPost | null {
  if (!availableSlugs.includes(slug)) return null;

  return readPostBySlug(slug);
}

function readPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, slug, "index.mdx");

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    assertNoBodyH1(content, slug);

    const stats = readingTime(content);
    const frontmatter = parseFrontmatter(data as Record<string, unknown>, slug);

    return {
      slug,
      ...frontmatter,
      readingTime: stats.text,
      content,
    };
  } catch (error) {
    if (isNotFoundError(error)) return null;

    console.error(`Error processing blog post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();

  return slugs
    .map((slug) => getPostBySlug(slug, slugs))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
