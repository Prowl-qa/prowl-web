'use client';

import { createContext, useContext, useState, useCallback, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
  mounted: false,
});

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Track hydration without effect-based setState
const subscribers = new Set<() => void>();
let hydrated = false;

function subscribeToHydration(cb: () => void) {
  subscribers.add(cb);
  return () => subscribers.delete(cb);
}

function getHydrated() {
  return hydrated;
}

function getServerHydrated() {
  return false;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isMounted = useSyncExternalStore(subscribeToHydration, getHydrated, getServerHydrated);

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const initial = getInitialTheme();
    document.documentElement.classList.toggle('dark', initial === 'dark');
    if (!hydrated) {
      hydrated = true;
      queueMicrotask(() => subscribers.forEach((cb) => cb()));
    }
    return initial;
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', next === 'dark');
      localStorage.setItem('theme', next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted: isMounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
