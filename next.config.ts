import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      // One product, one page: the former /cli product page is now the homepage
      // and the /docs hub is replaced by the docs site itself (PQW-025).
      { source: "/cli", destination: "/", permanent: true },
      { source: "/docs", destination: "https://docs.prowl.tools", permanent: true },
      // Prowl Hub and Prowl Infra Hub were retired in 2026-08; their satellite
      // sites are gone, so the old marketing URLs land on the homepage.
      { source: "/hub", destination: "/", permanent: true },
      { source: "/infra", destination: "/", permanent: true },
    ];
  },
};

// remark-frontmatter makes the MDX compiler strip the YAML frontmatter block
// from the rendered body. Without it, @next/mdx renders the frontmatter as
// content (the closing --- turns the block into a bold setext heading) — the
// metadata itself is parsed separately by gray-matter in src/lib/blog.ts.
const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-frontmatter"]],
  },
});

export default withMDX(nextConfig);
