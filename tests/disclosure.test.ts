import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  disclosureReducer,
  isDismissKey,
  shouldCloseOnFocusOut,
} from '../src/lib/disclosure.ts';

test('toggle flips the open state', () => {
  assert.equal(disclosureReducer(false, { type: 'toggle' }), true);
  assert.equal(disclosureReducer(true, { type: 'toggle' }), false);
});

test('open and close are idempotent', () => {
  assert.equal(disclosureReducer(false, { type: 'open' }), true);
  assert.equal(disclosureReducer(true, { type: 'open' }), true);
  assert.equal(disclosureReducer(true, { type: 'close' }), false);
  assert.equal(disclosureReducer(false, { type: 'close' }), false);
});

test('Escape (and legacy Esc) are dismiss keys; other keys are not', () => {
  assert.equal(isDismissKey('Escape'), true);
  assert.equal(isDismissKey('Esc'), true);
  assert.equal(isDismissKey('Enter'), false);
  assert.equal(isDismissKey(' '), false);
  assert.equal(isDismissKey('Tab'), false);
});

test('focus-out closes when the next target is outside the container', () => {
  const inside = { id: 'inside' };
  const outside = { id: 'outside' };
  const contains = (node: unknown) => node === inside;

  // Focus moved to an element within the disclosure — stay open.
  assert.equal(shouldCloseOnFocusOut(inside, contains), false);
  // Focus moved to an element outside the disclosure — close.
  assert.equal(shouldCloseOnFocusOut(outside, contains), true);
});

test('focus-out with no relatedTarget closes (focus left the document/blur to null)', () => {
  assert.equal(shouldCloseOnFocusOut(null, () => false), true);
});
