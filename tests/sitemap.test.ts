import assert from 'node:assert/strict';
import { test } from 'node:test';

import sitemap from '../src/app/sitemap.ts';
import { getAllPosts } from '../src/lib/blog.ts';

const SITE_URL = 'https://prowl.tools';

test('sitemap keeps the hidden blog out while preserving the homepage', () => {
  const urls = sitemap().map((entry) => entry.url);
  const hiddenBlogUrls = [
    `${SITE_URL}/blog`,
    `${SITE_URL}/blog/feed.xml`,
    ...getAllPosts().map((post) => `${SITE_URL}/blog/${post.slug}`),
  ];

  assert.deepEqual(urls, [SITE_URL]);
  assert.deepEqual(hiddenBlogUrls.filter((url) => urls.includes(url)), []);
});
