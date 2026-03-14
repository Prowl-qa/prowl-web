import Link from "next/link";

export default function TagBadge({ tag }: { tag: string }) {
  return (
    <Link
      href={`/blog?tag=${encodeURIComponent(tag)}`}
      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan/10 text-cyan hover:bg-cyan/20 transition-colors"
    >
      {tag}
    </Link>
  );
}
