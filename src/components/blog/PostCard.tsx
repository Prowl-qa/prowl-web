import Link from "next/link";
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
  const formatted = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-cyan/40 hover:bg-surface-elevated">
      <Link href={`/blog/${slug}`} className="block">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
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
