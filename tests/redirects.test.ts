import assert from "node:assert/strict";
import { describe, it } from "node:test";

import nextConfig from "../next.config.ts";

type Redirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

const loadRedirects = async () => {
  const config = nextConfig as { redirects?: () => Redirect[] | Promise<Redirect[]> };

  assert.equal(typeof config.redirects, "function");
  return await config.redirects();
};

describe("redirects", () => {
  it("permanently sends retired product routes to the homepage", async () => {
    const redirects = await loadRedirects();
    const redirectsBySource = new Map(redirects.map((redirect) => [redirect.source, redirect]));

    for (const source of ["/cli", "/hub", "/infra"]) {
      assert.deepEqual(redirectsBySource.get(source), {
        source,
        destination: "/",
        permanent: true,
      });
    }
  });

  it("permanently sends the deleted docs route to the external docs site", async () => {
    const redirects = await loadRedirects();
    const docsRedirect = redirects.find((redirect) => redirect.source === "/docs");

    assert.deepEqual(docsRedirect, {
      source: "/docs",
      destination: "https://docs.prowl.tools",
      permanent: true,
    });
  });
});
