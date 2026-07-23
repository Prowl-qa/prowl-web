import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      // Hub and Infra live on their own satellite sites; keep old marketing URLs working.
      { source: "/hub", destination: "https://hub.prowl.tools", permanent: true },
      { source: "/infra", destination: "https://infra.prowl.tools", permanent: true },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
