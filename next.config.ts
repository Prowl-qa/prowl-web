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

const withMDX = createMDX({});

export default withMDX(nextConfig);
