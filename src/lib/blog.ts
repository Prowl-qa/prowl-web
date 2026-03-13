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
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => {
      if (!entry.isDirectory()) return false;
      const indexPath = path.join(CONTENT_DIR, entry.name, "index.mdx");
      return fs.existsSync(indexPath);
    })
    .map((entry) => entry.name);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, slug, "index.mdx");
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  const frontmatter = parseFrontmatter(data as Record<string, unknown>, slug);

  return {
    slug,
    ...frontmatter,
    readingTime: stats.text,
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}
