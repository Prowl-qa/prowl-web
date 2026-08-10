import Link from "next/link";

export default function PostFooter() {
  return (
    <footer className="mt-16 pt-8 border-t border-border">
      {/* Back to blog */}
      <div className="text-center">
        <Link
          href="/blog"
          className="text-sm text-muted hover:text-cyan transition-colors"
        >
          &larr; Back to all posts
        </Link>
      </div>
    </footer>
  );
}
