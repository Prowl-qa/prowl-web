'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ProductIcon from '@/components/icons/ProductIcon';
import { suiteProducts } from '@/lib/products';

const linkClass =
  'hover:text-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 16);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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
          {/* Products dropdown (CSS hover/focus, no JS) */}
          <div className="group relative">
            <button className={`${linkClass} inline-flex items-center gap-1`} aria-haspopup="true">
              Products <span aria-hidden="true" className="text-xs">▾</span>
            </button>
            <div className="invisible absolute left-0 top-full z-50 min-w-[16rem] pt-3 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-xl border border-border bg-surface-elevated p-2 shadow-lg">
                {suiteProducts.map((p) => (
                  <Link
                    key={p.slug}
                    href={p.href}
                    className="flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                  >
                    <ProductIcon slug={p.slug} size={20} className="mt-0.5 shrink-0" />
                    <span>
                      <span className="block font-semibold">{p.name}</span>
                      <span className="block text-xs text-muted">{p.tagline}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/docs" className={linkClass}>Docs</Link>
          <Link href="/blog" className={linkClass}>Blog</Link>
          <a href="https://github.com/prowl-tools" target="_blank" rel="noopener noreferrer" className={linkClass}>
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
          {suiteProducts.map((p) => (
            <Link key={p.slug} href={p.href} className={`block ${linkClass}`}>
              {p.name}
            </Link>
          ))}
          <div className="h-px bg-border" />
          <Link href="/docs" className={`block ${linkClass}`}>Docs</Link>
          <Link href="/blog" className={`block ${linkClass}`}>Blog</Link>
          <a href="https://github.com/prowl-tools" target="_blank" rel="noopener noreferrer" className={`block ${linkClass}`}>
            GitHub
          </a>
        </div>
      )}
    </nav>
  );
}
