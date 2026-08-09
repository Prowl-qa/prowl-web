'use client';

import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ProductIcon from '@/components/icons/ProductIcon';
import { isExternalHref, suiteProducts } from '@/lib/products';
import {
  disclosureReducer,
  isDismissKey,
  isHoverPointer,
  shouldCloseOnFocusOut,
  type DisclosureAction,
} from '@/lib/disclosure';

const linkClass =
  'hover:text-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm';

const PRODUCTS_TRIGGER_ID = 'nav-products-trigger';
const PRODUCTS_MENU_ID = 'nav-products-menu';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Products menu: a JS-controlled disclosure (WAI-ARIA APG disclosure pattern).
  // State drives visibility so the menu is keyboard-operable and screen-reader
  // announced, while hover still opens it for mouse users.
  const [productsOpen, dispatchProductsState] = useReducer(disclosureReducer, false);
  const productsOpenRef = useRef(productsOpen);
  const productsRef = useRef<HTMLDivElement>(null);
  const productsTriggerRef = useRef<HTMLButtonElement>(null);

  const dispatchProducts = useCallback((action: DisclosureAction) => {
    productsOpenRef.current = disclosureReducer(productsOpenRef.current, action);
    dispatchProductsState(action);
  }, []);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 16);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Dismiss on Escape (returning focus to the trigger) and on an outside pointer
  // press — both required to keep the disclosure dismissible (WCAG 2.1 SC
  // 1.4.13). The listener lifecycle stays stable and handlers bail while closed.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!productsOpenRef.current || !isDismissKey(event.key)) return;
      dispatchProducts({ type: 'close' });
      productsTriggerRef.current?.focus();
    }

    function onPointerDown(event: PointerEvent) {
      if (!productsOpenRef.current) return;
      const container = productsRef.current;
      if (container && !container.contains(event.target as Node)) {
        dispatchProducts({ type: 'close' });
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [dispatchProducts]);

  const handleProductsBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    const container = productsRef.current;
    const closes = shouldCloseOnFocusOut(
      event.relatedTarget,
      (node) => !!container && container.contains(node as Node),
    );
    if (closes) {
      dispatchProducts({ type: 'close' });
    }
  }, [dispatchProducts]);

  const handleProductsPointerEnter = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (isHoverPointer(event.pointerType)) {
      dispatchProducts({ type: 'open' });
    }
  }, [dispatchProducts]);

  const handleProductsPointerLeave = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (isHoverPointer(event.pointerType)) {
      dispatchProducts({ type: 'close' });
    }
  }, [dispatchProducts]);

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-lg transition-colors ${
        scrolled ? 'bg-background/80 border-b border-border' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm">
          <Image src="/static/img/prowl-logo.png" alt="Prowl logo" width={32} height={32} className="h-8 w-8" />
          <span className="text-xl font-bold tracking-tight">Prowl</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-6 text-sm">
          {/* Products menu: JS-controlled disclosure (WAI-ARIA APG disclosure pattern).
              Hover opens it for mouse users; click/Enter/Space toggle it; Escape and
              outside-click dismiss it. Visibility is driven by `productsOpen` so the
              menu links are only in the tab order while the menu is open. */}
          <div
            ref={productsRef}
            className="relative"
            onPointerEnter={handleProductsPointerEnter}
            onPointerLeave={handleProductsPointerLeave}
            onBlur={handleProductsBlur}
          >
            <button
              ref={productsTriggerRef}
              type="button"
              id={PRODUCTS_TRIGGER_ID}
              aria-expanded={productsOpen}
              aria-controls={PRODUCTS_MENU_ID}
              onClick={() => dispatchProducts({ type: 'toggle' })}
              className={`${linkClass} inline-flex items-center gap-1`}
            >
              Products <span aria-hidden="true" className="text-xs">▾</span>
            </button>
            <div
              id={PRODUCTS_MENU_ID}
              className={`absolute left-0 top-full z-50 min-w-[16rem] pt-3 transition-opacity ${
                productsOpen ? 'visible opacity-100' : 'invisible opacity-0'
              }`}
            >
              <div className="rounded-xl border border-border bg-surface-elevated p-2 shadow-lg">
                {suiteProducts.map((p) => {
                  const itemClass =
                    'flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan';
                  const content = (
                    <>
                      <ProductIcon slug={p.slug} size={20} className="mt-0.5 shrink-0" />
                      <span>
                        <span className="block font-semibold">{p.name}</span>
                        <span className="block text-xs text-muted">{p.tagline}</span>
                      </span>
                    </>
                  );
                  return isExternalHref(p.href) ? (
                    <a
                      key={p.slug}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={itemClass}
                      onClick={() => dispatchProducts({ type: 'close' })}
                    >
                      {content}
                    </a>
                  ) : (
                    <Link
                      key={p.slug}
                      href={p.href}
                      className={itemClass}
                      onClick={() => dispatchProducts({ type: 'close' })}
                    >
                      {content}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <Link href="/docs" className={linkClass}>Docs</Link>
          <Link href="/blog" className={linkClass}>Blog</Link>
          <a href="https://github.com/prowl-tools/prowl" target="_blank" rel="noopener noreferrer" className={linkClass}>
            GitHub
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex sm:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="relative h-9 w-9 rounded-lg border border-border bg-surface hover:bg-surface-elevated transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan flex items-center justify-center"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-border bg-background/95 backdrop-blur-lg px-6 py-4 space-y-3 text-sm">
          <p className="text-xs uppercase tracking-wider text-muted">Products</p>
          {suiteProducts.map((p) =>
            isExternalHref(p.href) ? (
              <a key={p.slug} href={p.href} target="_blank" rel="noopener noreferrer" className={`block ${linkClass}`}>
                {p.name}
              </a>
            ) : (
              <Link key={p.slug} href={p.href} className={`block ${linkClass}`}>
                {p.name}
              </Link>
            )
          )}
          <div className="h-px bg-border" />
          <Link href="/docs" className={`block ${linkClass}`}>Docs</Link>
          <Link href="/blog" className={`block ${linkClass}`}>Blog</Link>
          <a href="https://github.com/prowl-tools/prowl" target="_blank" rel="noopener noreferrer" className={`block ${linkClass}`}>
            GitHub
          </a>
        </div>
      )}
    </nav>
  );
}
