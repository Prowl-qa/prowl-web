import Link from "next/link";

export default function PostFooter() {
  return (
    <footer className="mt-16 pt-8 border-t border-border">
      {/* Newsletter CTA */}
      <div className="rounded-xl border border-border bg-surface p-6 sm:p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Stay in the loop</h3>
        <p className="text-muted text-sm mb-5 max-w-md mx-auto">
          Get the latest on AI-powered testing, ProwlQA updates, and developer
          workflows. No spam, unsubscribe anytime.
        </p>
        <form
          action="https://buttondown.com/api/emails/embed-subscribe/prowlqa"
          method="post"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-cyan"
          />
          <button
            type="submit"
            className="rounded-lg bg-cyan px-5 py-2.5 text-sm font-medium text-white hover:bg-cyan-light transition-colors focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-background"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Back to blog */}
      <div className="mt-8 text-center">
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
