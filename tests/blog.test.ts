import assert from 'node:assert/strict';
import { test } from 'node:test';

import { assertNoBodyH1, getAllPosts } from '../src/lib/blog.ts';

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
