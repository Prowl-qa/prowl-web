import { getAllPosts } from "@/lib/blog";
import { buildBlogFeed } from "@/lib/rss";

// This route is statically generated at build time (PQW-009). `lastBuildDate`
// is therefore the build timestamp, which is the intended behavior: the site
// redeploys whenever blog content changes, regenerating the feed with a fresh
// timestamp. `force-static` makes that contract explicit — do NOT make this
// route dynamic just to move the timestamp.
export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();
  const siteUrl = "https://prowl.tools";
  const feed = buildBlogFeed(posts, siteUrl, new Date());

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
