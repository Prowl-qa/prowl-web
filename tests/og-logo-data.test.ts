import assert from 'node:assert/strict';
import { test } from 'node:test';

import { OG_LOGO_DATA_URI } from '../src/lib/og-logo-data.ts';

test('embeds an optimized PNG data URI for OG image rendering', () => {
  const prefix = 'data:image/png;base64,';

  assert.equal(OG_LOGO_DATA_URI.startsWith(prefix), true);

  const bytes = Buffer.from(OG_LOGO_DATA_URI.slice(prefix.length), 'base64');

  assert.deepEqual(
    [...bytes.subarray(0, 8)],
    [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  );
  assert.ok(bytes.length < 70_000);
});
