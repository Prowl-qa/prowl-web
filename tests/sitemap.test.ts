import assert from 'node:assert/strict';
import { test } from 'node:test';

import sitemap from '../src/app/sitemap.ts';
import { getAllPosts } from '../src/lib/blog.ts';

const SITE_URL = 'https://prowl.tools';

test('sitemap includes the homepage, the blog index, the RSS feed, and every post', () => {
  const urls = sitemap().map((entry) => entry.url);
  const blogPostUrls = getAllPosts().map((post) => `${SITE_URL}/blog/${post.slug}`);

  assert.ok(urls.includes(SITE_URL));
  assert.ok(urls.includes(`${SITE_URL}/blog`));
  assert.ok(urls.includes(`${SITE_URL}/blog/feed.xml`));

  for (const postUrl of blogPostUrls) {
    assert.ok(urls.includes(postUrl));
  }
});
