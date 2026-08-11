import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

import {
  assertNoBodyH1,
  getAllPosts,
  getPostBySlug,
} from '../src/lib/blog.ts';

test('allows blog body headings that start at h2', () => {
  assert.doesNotThrow(() => {
    assertNoBodyH1('## Section\n\n### Detail', 'fixture');
  });
});

test('rejects markdown h1 body headings', () => {
  assert.throws(
    () => assertNoBodyH1('# Duplicate title', 'fixture'),
    /body headings must start at "##".*markdown "#" heading on line 1/,
  );
});

test('rejects setext h1 body headings', () => {
  assert.throws(
    () => assertNoBodyH1('Duplicate title\n===============', 'fixture'),
    /body headings must start at "##".*setext h1 underline on line 2/,
  );
});

test('rejects raw h1 elements in MDX body content', () => {
  assert.throws(
    () => assertNoBodyH1('<h1>Duplicate title</h1>', 'fixture'),
    /body content must not render its own <h1>.*Found <h1> on line 1/,
  );
});

test('ignores h1 examples inside fenced code blocks', () => {
  assert.doesNotThrow(() => {
    assertNoBodyH1('```md\n# Example\n```\n\n## Real section', 'fixture');
  });
});

test('current blog posts satisfy the body h1 guard', () => {
  const posts = getAllPosts();

  assert.ok(posts.length > 0);
  assert.ok(posts.some((post) => post.slug === 'introducing-prowl-qa-blog'));
});

test('rejects unsafe blog slugs before file access', () => {
  assert.equal(getPostBySlug('../introducing-prowl-qa-blog'), null);
  assert.equal(getPostBySlug('introducing/prowl'), null);
  assert.equal(getPostBySlug('introducing\\prowl'), null);
  assert.equal(getPostBySlug('Introducing-Prowl'), null);
});

test('returns null for valid slugs without a matching post file', () => {
  assert.equal(getPostBySlug(`missing-blog-post-${process.pid}`), null);
});

test('skips malformed blog posts instead of failing the full post list', () => {
  const slug = `invalid-body-h1-${randomUUID()}`;
  const fixtureDir = path.join(process.cwd(), 'content', 'blog', slug);
  const fixturePath = path.join(fixtureDir, 'index.mdx');
  const originalError = console.error;
  let loggedError = false;

  try {
    fs.rmSync(fixtureDir, { recursive: true, force: true });
    fs.mkdirSync(fixtureDir, { recursive: true });
    fs.writeFileSync(
      fixturePath,
      [
        '---',
        'title: Invalid fixture',
        'description: Invalid body heading fixture',
        'date: 2026-08-11',
        'author: Prowl',
        '---',
        '',
        '# Invalid duplicate heading',
        '',
      ].join('\n'),
    );

    console.error = () => {
      loggedError = true;
    };

    assert.equal(getPostBySlug(slug), null);
    assert.equal(getAllPosts().some((post) => post.slug === slug), false);
    assert.equal(loggedError, true);
  } finally {
    console.error = originalError;
    assert.doesNotThrow(() => {
      fs.rmSync(fixtureDir, { recursive: true, force: true });
    });
    assert.equal(fs.existsSync(fixtureDir), false);
  }
});
