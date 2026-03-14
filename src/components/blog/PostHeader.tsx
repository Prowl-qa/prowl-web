import { formatBlogDate } from "@/lib/blog-format";
import TagBadge from "./TagBadge";

type PostHeaderProps = {
  title: string;
  date: string;
  author: string;
  readingTime: string;
  tags: string[];
};

export default function PostHeader({
  title,
  date,
  author,
  readingTime,
  tags,
}: PostHeaderProps) {
  const formatted = formatBlogDate(date);

  return (
    <header className="mb-10">
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
        {title}
      </h1>
      <div className="flex items-center gap-3 text-sm text-muted">
        <span>{author}</span>
        <span aria-hidden="true">&middot;</span>
        <time dateTime={date}>{formatted}</time>
        <span aria-hidden="true">&middot;</span>
        <span>{readingTime}</span>
      </div>
    </header>
  );
}
