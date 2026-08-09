'use client';

import { createContext, createElement, useContext, useSyncExternalStore, type ReactNode } from 'react';
import { useReducedMotion, type MotionProps } from 'motion/react';

export type RevealMotionProps = Pick<MotionProps, 'initial' | 'animate' | 'whileInView' | 'viewport'> & {
  key?: string;
};

/**
 * Renders an element at its `visible` variant with no hidden initial state and no
 * entrance animation. This is the SSR / no-JS / reduced-motion baseline: content
 * ships in the HTML fully visible instead of behind an inline `opacity:0`.
 *
 * Use for above-the-fold content — heroes and the LCP element. The entrance
 * animation is intentionally skipped there: hiding the LCP element and then
 * fading it in on hydration would flash content and regress LCP/FCP. The
 * trade-off is that heroes appear on the first server-rendered paint rather than
 * animating in, which is the correct call for the largest contentful paint.
 */
export const revealVisible: RevealMotionProps = { initial: false, animate: 'visible' };

const noopSubscribe = () => () => {};
const getHydratedSnapshot = () => true;
const getServerHydratedSnapshot = () => false;
const RevealHydrationContext = createContext(false);

/**
 * Provides the one post-hydration signal shared by every reveal consumer on the
 * page. Keeping the store subscription here avoids repeating it for each section
 * while still preserving an SSR-safe first client render.
 */
export function RevealHydrationProvider({ children }: { children: ReactNode }) {
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    getHydratedSnapshot,
    getServerHydratedSnapshot,
  );

  return createElement(RevealHydrationContext.Provider, { value: hydrated }, children);
}

/**
 * Returns `false` on the server and on the first client render (so hydration
 * matches the server markup), then `true` once hydration has completed.
 */
function useHydrated(): boolean {
  return useContext(RevealHydrationContext);
}

/**
 * Progressive-enhancement scroll reveal for below-the-fold sections.
 *
 * On the server, on the first client render (pre-hydration), for no-JS visitors,
 * and when `prefers-reduced-motion` is set, it returns {@link revealVisible} so
 * the content is always visible — nothing ships as `opacity:0`. Only once the
 * component has hydrated with motion allowed does it enable the `hidden` ->
 * `visible` scroll-triggered entrance. The returned `key` intentionally remounts
 * the Motion element at that point, because Motion only applies `initial` on
 * mount; changing `initial` after the SSR-visible mount would leave the element
 * visible and skip the reveal. Because these sections are off-screen at the
 * moment hydration runs, the remount is not visible to users; if a section
 * happens to be in view, motion's viewport observer fires immediately and it
 * simply plays its entrance rather than getting stuck.
 *
 * @param margin IntersectionObserver root margin passed through to motion's
 *   `viewport.margin` (e.g. `'-80px'` to trigger slightly before fully in view).
 */
export function useScrollReveal(margin = '-80px'): RevealMotionProps {
  const hydrated = useHydrated();
  const reducedMotion = useReducedMotion();

  if (!hydrated || reducedMotion) {
    return revealVisible;
  }

  return {
    key: `scroll-reveal:${margin}`,
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, margin },
  };
}
