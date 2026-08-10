import assert from 'node:assert/strict';
import { test } from 'node:test';

import type { BlogPost } from '../src/lib/blog.ts';
import {
  createBlogPostMetadata,
  SITE_OG_IMAGE,
} from '../src/lib/blog-metadata.ts';

const basePost: BlogPost = {
  slug: 'metadata-test',
  title: 'Metadata Test',
  description: 'A focused metadata fixture.',
  date: '2026-08-09',
  author: 'Prowl',
  tags: ['metadata', 'social'],
  readingTime: '1 min read',
  content: '',
};

function socialImagesFor(post: BlogPost) {
  const metadata = createBlogPostMetadata(post);
  const openGraph = metadata.openGraph as { images?: unknown };
  const twitter = metadata.twitter as { images?: unknown };

  return {
    openGraph: openGraph.images,
    twitter: twitter.images,
  };
}

test('uses post image frontmatter for blog post social images', () => {
  const images = socialImagesFor({
    ...basePost,
    image: '/static/img/blog/custom-card.png',
  });

  assert.deepEqual(images, {
    openGraph: ['/static/img/blog/custom-card.png'],
    twitter: ['/static/img/blog/custom-card.png'],
  });
});

test('falls back to the site-wide social card when a post has no image', () => {
  assert.deepEqual(socialImagesFor(basePost), {
    openGraph: [SITE_OG_IMAGE],
    twitter: [SITE_OG_IMAGE],
  });
});

test('sets a per-post canonical to the post URL (PQW-010)', () => {
  const metadata = createBlogPostMetadata(basePost);
  assert.equal(metadata.alternates?.canonical, `/blog/${basePost.slug}`);
});

test('keeps RSS autodiscovery alongside the per-post canonical', () => {
  const metadata = createBlogPostMetadata(basePost);
  assert.deepEqual(metadata.alternates?.types, {
    'application/rss+xml': [{ url: '/blog/feed.xml', title: 'Prowl Blog' }],
  });
});
