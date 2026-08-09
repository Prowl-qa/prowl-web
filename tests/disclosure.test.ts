import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  isHoverPointer,
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

test('hover disclosure behavior is only enabled for mouse pointers', () => {
  assert.equal(isHoverPointer('mouse'), true);
  assert.equal(isHoverPointer('touch'), false);
  assert.equal(isHoverPointer('pen'), false);
  assert.equal(isHoverPointer(''), false);
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

test('focus-out with no relatedTarget stays open (Safari blurs to null on link clicks)', () => {
  // Safari does not focus links/buttons on click, so clicking a menu item
  // blurs the trigger with relatedTarget null — closing here would hide the
  // menu before mouseup and swallow the click. Outside interactions are
  // handled by the document-level pointerdown listener instead.
  assert.equal(shouldCloseOnFocusOut(null, () => false), false);
});
