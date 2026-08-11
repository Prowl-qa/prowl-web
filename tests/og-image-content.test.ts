import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isValidElement } from 'react';

import { createOgImageContent } from '../src/lib/og-image-content.ts';

type ElementLike = {
  type: string;
  props: Record<string, unknown>;
};

function element(value: unknown, type: string): ElementLike {
  assert.equal(isValidElement(value), true);

  const candidate = value as ElementLike;
  assert.equal(candidate.type, type);

  return candidate;
}

function childrenOf(value: ElementLike): unknown[] {
  const { children } = value.props;
  return Array.isArray(children) ? children : [children];
}

function backgroundImageOf(value: ElementLike): string {
  const style = value.props.style as { backgroundImage?: unknown } | undefined;
  const backgroundImage = style?.backgroundImage;

  assert.ok(
    typeof backgroundImage === 'string',
    'expected style.backgroundImage to be a string',
  );

  return backgroundImage;
}

test('builds stable OG image content for ImageResponse', () => {
  const logoDataUri = 'data:image/png;base64,test-logo';
  const root = element(
    createOgImageContent({
      eyebrow: 'PROWL CLI',
      headline: 'Ship safer changes',
      logoDataUri,
    }),
    'div',
  );

  assert.equal(
    root.props.tw,
    'w-full h-full flex flex-col justify-between px-20 py-[72px] bg-[#09090b] text-[#fafafa] font-sans',
  );
  assert.match(backgroundImageOf(root), /radial-gradient/);

  const [brand, message, footer] = childrenOf(root);
  const [logo, wordmark] = childrenOf(element(brand, 'div'));
  const [eyebrow, headline] = childrenOf(element(message, 'div'));
  const [accent, domain] = childrenOf(element(footer, 'div'));

  assert.deepEqual(element(logo, 'img').props, {
    src: logoDataUri,
    width: 132,
    height: 132,
    alt: '',
  });
  assert.equal(element(wordmark, 'span').props.children, 'Prowl');
  assert.equal(element(eyebrow, 'span').props.children, 'PROWL CLI');
  assert.equal(element(headline, 'span').props.children, 'Ship safer changes');
  assert.match(backgroundImageOf(element(accent, 'div')), /linear-gradient/);
  assert.equal(element(domain, 'span').props.children, 'prowl.tools');
});
