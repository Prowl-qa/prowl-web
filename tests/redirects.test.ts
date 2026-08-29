import assert from "node:assert/strict";
import { describe, it } from "node:test";

import nextConfig from "../next.config.ts";

type Redirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

const loadRedirects = async () => {
  const { redirects } = nextConfig as { redirects?: () => Redirect[] | Promise<Redirect[]> };

  // `assert.ok` narrows the type; `assert.equal(typeof …)` does not, which tsc flags.
  assert.ok(typeof redirects === "function", "next.config.ts exports a redirects() function");
  return await redirects();
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
