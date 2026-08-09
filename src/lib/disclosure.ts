/**
 * DOM-free state logic for a WAI-ARIA APG "disclosure" widget — a trigger button
 * that shows/hides an associated region (here, the nav Products menu). Keeping
 * the open/close decisions as pure functions lets them be unit-tested without a
 * browser; the Nav component wires these to real events, refs, and focus.
 *
 * Pattern: Disclosure (not the ARIA `menu` widget). The trigger carries
 * `aria-expanded` + `aria-controls`; the region is plain content with focusable
 * links reachable by Tab while open. This is the WAI-APG-recommended fit for a
 * simple show/hide nav grouping and avoids the full roving-tabindex menu model.
 */

export type DisclosureAction =
  | { type: 'toggle' }
  | { type: 'open' }
  | { type: 'close' };

/** Reducer for the disclosure's boolean open state. */
export function disclosureReducer(open: boolean, action: DisclosureAction): boolean {
  switch (action.type) {
    case 'toggle':
      return !open;
    case 'open':
      return true;
    case 'close':
      return false;
    default:
      return open;
  }
}

/**
 * Keys that dismiss an open disclosure. Escape closes the region and returns
 * focus to the trigger (WCAG 2.1 SC 1.4.13 — content dismissible). Older engines
 * report `'Esc'`.
 */
export function isDismissKey(key: string): boolean {
  return key === 'Escape' || key === 'Esc';
}

/**
 * Whether a focus-out to `next` should close the region: true when focus moved
 * outside the disclosure container (e.g. Tab past the last link), false when it
 * stayed within or the relatedTarget is unknown-but-inside. `contains` mirrors
 * `Node.contains` and is injected so this stays DOM-free and testable.
 */
export function shouldCloseOnFocusOut(
  next: unknown | null,
  contains: (node: unknown) => boolean,
): boolean {
  if (next == null) {
    return true;
  }
  return !contains(next);
}
