import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  createRevealHydrationStore,
  getScrollRevealProps,
  revealVisible,
} from '../src/lib/reveal.ts';

test('keeps reveal content visible before hydration', () => {
  assert.strictEqual(
    getScrollRevealProps({ hydrated: false, reducedMotion: false }),
    revealVisible,
  );
});

test('keeps reveal content visible when reduced motion is preferred', () => {
  assert.strictEqual(
    getScrollRevealProps({ hydrated: true, reducedMotion: true }),
    revealVisible,
  );
});

test('returns remounting viewport reveal props after hydration', () => {
  assert.deepStrictEqual(
    getScrollRevealProps({ hydrated: true, reducedMotion: false, margin: '-120px' }),
    {
      key: 'scroll-reveal:-120px',
      initial: 'hidden',
      whileInView: 'visible',
      viewport: { once: true, margin: '-120px' },
    },
  );
});

test('does not queue hydration work on the server', () => {
  let scheduled = 0;
  const store = createRevealHydrationStore({
    hasWindow: () => false,
    schedule: () => {
      scheduled += 1;
    },
  });

  const unsubscribe = store.subscribe(() => {});

  assert.equal(scheduled, 0);
  assert.equal(store.getSnapshot(), false);
  assert.equal(store.getServerSnapshot(), false);

  unsubscribe();
});

test('queues one client hydration signal and notifies active subscribers once', () => {
  const scheduled = [];
  const store = createRevealHydrationStore({
    hasWindow: () => true,
    schedule: (callback) => {
      scheduled.push(callback);
    },
  });
  let firstListenerCalls = 0;
  let secondListenerCalls = 0;

  const unsubscribeFirst = store.subscribe(() => {
    firstListenerCalls += 1;
  });
  const unsubscribeSecond = store.subscribe(() => {
    secondListenerCalls += 1;
  });

  assert.equal(scheduled.length, 1);
  assert.equal(store.getSnapshot(), false);

  unsubscribeFirst();
  scheduled[0]();

  assert.equal(firstListenerCalls, 0);
  assert.equal(secondListenerCalls, 1);
  assert.equal(store.getSnapshot(), true);

  scheduled[0]();
  assert.equal(secondListenerCalls, 1);

  const unsubscribeLate = store.subscribe(() => {
    throw new Error('already-hydrated subscriptions should not be notified again');
  });

  assert.equal(store.getSnapshot(), true);
  assert.equal(scheduled.length, 1);

  unsubscribeSecond();
  unsubscribeLate();
});
