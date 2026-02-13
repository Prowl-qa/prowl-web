'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-lg transition-colors ${
        scrolled
          ? 'bg-background/80 border-b border-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm">
          <Image
            src="/static/img/prowl-logo.png"
            alt="Prowl logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-xl font-bold tracking-tight">Prowl</span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <a
            href="https://docs.prowlqa.dev"
            className="hover:text-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm"
          >
            Docs
          </a>
          <a
            href="https://github.com/Prowl-qa/prowl"
            className="hover:text-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/prowlai"
            className="hidden sm:inline hover:text-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm"
          >
            npm
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
