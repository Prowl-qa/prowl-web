import Link from "next/link";
import { formatBlogDate } from "@/lib/blog-format";
import TagBadge from "./TagBadge";

type PostCardProps = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
};

export default function PostCard({
  slug,
  title,
  description,
  date,
  readingTime,
  tags,
}: PostCardProps) {
  const formatted = formatBlogDate(date);

  return (
    <article className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-cyan/40 hover:bg-surface-elevated">
      <div className="mb-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
      <Link
        href={`/blog/${slug}`}
        className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
      >
        <h2 className="text-xl font-semibold mb-2 group-hover:text-cyan transition-colors">
          {title}
        </h2>
        <p className="text-muted text-sm leading-relaxed mb-4">
          {description}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted">
          <time dateTime={date}>{formatted}</time>
          <span aria-hidden="true">&middot;</span>
          <span>{readingTime}</span>
        </div>
      </Link>
    </article>
  );
}
