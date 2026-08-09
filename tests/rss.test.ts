import assert from 'node:assert/strict';
import { test } from 'node:test';

import type { BlogPost } from '../src/lib/blog.ts';
import {
  BLOG_FEED_PATH,
  buildBlogFeed,
  escapeXml,
  rssAlternateTypes,
} from '../src/lib/rss.ts';

const SITE_URL = 'https://prowl.tools';

const basePost: BlogPost = {
  slug: 'hello-world',
  title: 'Hello World',
  description: 'A first post.',
  date: '2026-08-09',
  author: 'Prowl',
  tags: ['announcements'],
  readingTime: '1 min read',
  content: '',
};

test('escapeXml escapes all five XML metacharacters', () => {
  assert.equal(
    escapeXml(`Tom & Jerry <"'>`),
    'Tom &amp; Jerry &lt;&quot;&apos;&gt;',
  );
});

test('escapeXml coerces null/undefined to an empty string', () => {
  assert.equal(escapeXml(null), '');
  assert.equal(escapeXml(undefined), '');
});

test('buildBlogFeed escapes reserved characters in link and guid URLs', () => {
  const feed = buildBlogFeed(
    [{ ...basePost, slug: 'a&b' }],
    SITE_URL,
    new Date('2026-08-09T00:00:00Z'),
  );

  // The raw ampersand must never appear unescaped inside a URL element.
  assert.ok(feed.includes(`<link>${SITE_URL}/blog/a&amp;b</link>`));
  assert.ok(
    feed.includes(
      `<guid isPermaLink="true">${SITE_URL}/blog/a&amp;b</guid>`,
    ),
  );
  assert.ok(!feed.includes('/blog/a&b<'));
});

test('buildBlogFeed self link and channel link are escaped', () => {
  const feed = buildBlogFeed([basePost], SITE_URL, new Date(0));
  assert.ok(
    feed.includes(
      `<atom:link href="${SITE_URL}${BLOG_FEED_PATH}" rel="self" type="application/rss+xml" />`,
    ),
  );
  assert.ok(feed.includes(`<link>${SITE_URL}/blog</link>`));
});

test('buildBlogFeed uses the injected build date for lastBuildDate', () => {
  const buildDate = new Date('2026-08-09T12:00:00Z');
  const feed = buildBlogFeed([basePost], SITE_URL, buildDate);
  assert.ok(
    feed.includes(`<lastBuildDate>${buildDate.toUTCString()}</lastBuildDate>`),
  );
});

test('buildBlogFeed produces well-formed, parseable XML with one item per post', () => {
  const feed = buildBlogFeed(
    [basePost, { ...basePost, slug: 'second', title: 'Second' }],
    SITE_URL,
    new Date(0),
  );
  const itemCount = (feed.match(/<item>/g) ?? []).length;
  assert.equal(itemCount, 2);
  assert.ok(feed.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
});

test('rssAlternateTypes advertises the feed at its relative path', () => {
  assert.deepEqual(rssAlternateTypes, {
    'application/rss+xml': [{ url: BLOG_FEED_PATH, title: 'Prowl Blog' }],
  });
});
